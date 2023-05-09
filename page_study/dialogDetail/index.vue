<template>
	<view class="dialogDetail">
		<u-subsection :list="list" mode="button" :current="current" @change="change" activeColor="#53A5D9">
		</u-subsection>
		<view v-if="current == 0">
			<view class="table">
				<view class="tr">
					<view class="th">词</view>
					<view class="th">词性</view>
				</view>
				<view v-for="item in keyWords" :key="item.id" class="">
					<view class="tr">
						<view class="td">{{ item }}</view>
						<view class="td"> MCT_medical_word </view>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="!iscontent">
			<view class="theme" v-if="current == 1">
				<view class="title"> 对话主题 </view>
				<u-cell-group>
					<u-cell v-for="item,index in dialog" :key="item.id" isLink border-gap class="cell"
						@click="toDetail(index)">
						<view slot="title">
							<text class="lesson-num">{{ index }}</text>
						</view>
					</u-cell>
				</u-cell-group>
			</view>
		</view>
		<view class="" v-if="iscontent">
			<view class="nav">
				<view class="back">
					<u-icon name="arrow-left" class="" @click="goback"></u-icon>
				</view>

				<text class="title">
					{{ detailList[0].topic }}
				</text>
			</view>
			<view class="content">
				<view class="text" v-for="item in detailList" :key="item.id">
					<text>{{item.dialogue}}</text>
					<audioView :audioUrl="getFile(item.mp3)"></audioView>
				</view>

			</view>
			<view class="btn" v-if="type==1" @click="type = 2">
				进入跟读训练
			</view>
			<view class="btn" v-if="type ==2" @click="beginRead">
				开始跟读
			</view>
			<view class="record" v-if="type==3" @longpress="handleRecordStart" @touchmove="handleTouchMove"
				@touchend="handleRecordStop">
				<view class="">
					<u-icon name="mic" size="40"></u-icon>
				</view>
				{{btRecoding?'松开结束':'按住说话'}}
			</view>
			<view class="record" v-if="type==4" @longpress="handleRecordStart" @touchmove="handleTouchMove"
				@touchend="handleRecordStop">
				<view class="">
					<u-icon name="mic" size="40"></u-icon>
				</view>
				{{btRecoding?'松开结束':'再读一遍'}}
			</view>
			<view class="btn" v-if="type==5" @click="type = 6">
				查看朗读报告
			</view>
			<view class="evaluate" v-if="type == 6">
				<view class="title">
					本主题对话训练综合评分
				</view>
				<view class="">
					<view class="numb">
						{{score.score}}
					</view>
					综合总分
				</view>
				<view class="content">
					<view class="">
						<view class="num">
							{{score.fluency}}
						</view>
						流利度
					</view>
					<view class="">
						<view class="num">
							{{score.pronunciation}}
						</view>
						标准度
					</view>
					<view class="">
						<view class="num">
							{{score.integrity}}
						</view>
						完整度
					</view>
				</view>
			</view>
			<view class="shade" v-if="btRecoding" catchtouchmove="ture">
				<view class="blackBoxSpeak" v-if="is_clock">
					<view>
						<img src="https://gitee.com/sanghongxv/blogImage/raw/master/ic_record.gif" />
					</view>
					<view class="blackBoxSpeakConent">手指上划，取消录制</view>
				</view>
				<view class="blackBoxPause" v-else>
					<img src="https://gitee.com/sanghongxv/blogImage/raw/master/ic_release_to_cancel.png" />
					<view class="blackBoxSpeakConent" style="background:red">松开手指，取消录制</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		groupBy,
		trimAll
	} from '@/common/utils'
	import audioView from 'c/audioView'
	import {
		learn_information_MCTdialogue,
		query,
		point,
		updateUserAction
	} from '@/common/request.js'
	import {
		evaluateAudio
	} from '@/common/voice.js'
	const recorderManager = uni.getRecorderManager();

	export default {
		components: {
			audioView
		},
		data() {
			return {
				list: ['关键词', '对话'],
				current: 0,
				message: [],
				iscontent: false,
				btRecoding: false,
				is_clock: false,
				theme: '',
				audio_path: '',
				startPoint: '',
				audioContext: '',
				detail: '',
				nums: 0,
				type: 1,
				evaluates: [],
				detailList: []
			}
		},
		computed: {
			dialog() {
				let lesson = []
				if (this.message.length > 0) {
					this.message.sort(function(a, b) {
						return a.sub_sequence - b.sub_sequence
					})
					lesson = groupBy(this.message, 'topic')
					// console.log(lesson)
				}
				return lesson
			},
			score(){
				let sum_f = this.evaluates.reduce((prev, current) => {
				  return prev + current.fluency;
				}, 0)
				let sum_i = this.evaluates.reduce((prev, current) => {
				  return prev + current.integrity;
				}, 0)
				let sum_p = this.evaluates.reduce((prev, current) => {
				  return prev + current.pronunciation;
				}, 0)
				let sum_s = this.evaluates.reduce((prev, current) => {
					return prev + current.score;
				}, 0)
				let obj = {}
				obj.fluency = sum_f/this.evaluates.length
				obj.integrity = sum_i/this.evaluates.length
				obj.pronunciation = sum_p/this.evaluates.length
				obj.score = sum_s/this.evaluates.length
				console.log(obj);
				return obj
			},
			keyWords() {
				let keys = ''
				console.log(this.dialog);
				let key = Object.values(this.dialog)
				var str4 = [],
					str3 = {
						name: '',
						verb: ''
					}
				key.map(e => {
					str4.push(...e[0].keywords.match(/(?<=\.)(.+?)(?=（)/g))
				})
				return str4
				// }
			},
		},
		methods: {
			change(index) {
				this.current = index
				if (index == 0) this.iscontent = false
			},
			getFile(url) {
				return 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/' + url
			},
			goback() {
				this.iscontent = false
				this.type = 1
			},
			toDetail(e) {
				this.iscontent = true
				console.log(e);
				this.detailList = this.dialog[e]
			},
			beginRead() {
				this.type = 3
				this.palyAudio(this.detailList[this.nums].mp3)
			},
			palyAudio(url) {
				var innerAudioContext = (this.audioContext =
					uni.createInnerAudioContext())
				innerAudioContext.src = 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/' + url
				innerAudioContext.play(); //执行播放
				innerAudioContext.onPlay(() => {
					console.log('开始播放')
				})
			},
			async showD() {
				let res = await evaluateAudio(this.audio_path, this.detailList[this.nums + 1].sentence)
				let result = JSON.parse(res[1].data)
				console.log(result);
				if (this.type == 4) {
					this.evaluates.pop()
				}
				this.evaluates.push(result)
				console.log(this.nums);
				console.log(this.detailList.length);
				return result.score*1
			},
			handleRecordStart(e) {
				// this.blackBoxSpeak = true
				this.btRecoding = true
				this.is_clock = true //长按时应设置为true，为可发送状态
				this.startPoint = e.touches[0] //记录触摸点的坐标信息
				//设置录音参数
				const options = {
					duration: 10000,
					format: 'mp3'
				}
				//开始录音
				recorderManager.start(options);
				recorderManager.onStart(res => {
					console.log('开始录音');
				})
			},
			handleRecordStop: function(e) {
				recorderManager.stop() //结束录音
				this.btRecoding = false
				//此时先判断是否需要发送录音
				if (this.is_clock === true) {
					var that = this
					//对停止录音进行监控
				 recorderManager.onStop(async (res) => {
						//对录音时长进行判断，少于2s的不进行发送，并做出提示
						if (res.duration < 2000) {
							wx.showToast({
								title: '录音时间太短，请长按录音',
								icon: 'none',
								duration: 1000
							})
						} else {
							this.audio_path = res.tempFilePath
							let score = await this.showD()
							if ( score> 50 || this.type == 4) {
								this.type = 3
								this.nums += 2
								if(this.nums>=this.detailList.length-1){
									this.type = 5
								}
								this.palyAudio(this.detailList[this.nums].mp3)
							} else {
								this.type = 4
							}

						}
					})
				}
			},
			handleTouchMove: function(e) {
				//计算距离，当滑动的垂直距离大于25时，则取消发送语音
				if (Math.abs(e.touches[e.touches.length - 1].clientY - this.startPoint.clientY) > 25) {
					this.is_clock = false //设置为不发送语音
				} else {
					this.is_clock = true
				}
			},
			startRecord() {
				const options = {
					format: 'mp3'
				}
				recorder.start(options)
				recorder.onStart(() => {
					console.log('开始录音');
				})
			},
			stopRecord() {
				recorder.stop();
				recorder.onStop(res => {
					this.audio_path = res.tempFilePath
				})
			}
		},
		watch: {},

		// 页面周期函数--监听页面加载
		onLoad(e) {

			query.queryObject.$and = []
			query.contains('text_name', e.lesson)
			learn_information_MCTdialogue
				.setQuery(query)
				.limit(1000)
				.find()
				.then((res) => {
					this.message = res.data.objects
					// console.log(this.message)
				})

			uni.setNavigationBarTitle({
				title: e.lesson
			})
		},
		// 页面周期函数--监听页面初次渲染完成
		onReady() {},
		// 页面周期函数--监听页面显示(not-nvue)
		onShow() {

			updateUserAction('count_word', 1)

		},
		// 页面周期函数--监听页面隐藏
		onHide() {},
		// 页面周期函数--监听页面卸载
		onUnload() {
			updateUserAction('num_word', this.keyWords.length)
		},
	}
</script>

<style scoped lang="scss">
	.dialogDetail{
		margin-bottom: 60rpx
	}
	.table {
		text-align: center;
		margin: 40rpx auto;
		width: 700rpx;
		border-collapse: collapse;
		border-spacing: 0;
		border: 1px solid rgba(201, 201, 201, 1);

		.th {
			font-weight: bold;
			width: 400rpx;
			border: 1px solid rgba(201, 201, 201, 1);
			padding: 10rpx;
		}

		.tr {
			display: flex;
		}

		.td {
			width: 400rpx;
			border: 1px solid rgba(201, 201, 201, 1);
			padding: 10rpx;
		}
	}

	.btn {
		background-color: #53A5D9;
		width: 400rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		margin: 40rpx auto;
		color: #fff;
		border-radius: 10rpx;
	}

	.theme {
		padding-top: 80rpx;

		.title {
			font-size: 40rpx;
			margin: 15rpx;
		}

		.cell {
			// height: 60rpx;
			// line-height: 60rpx;
			margin: 15rpx;
			border: 2rpx solid #999;
			border-radius: 10rpx;
		}
	}

	.nav {
		// margin-top: 20rpx;
		background-color: #e7f4f2;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;

		.back {
			display: inline-block;
			float: left;
			margin: 20rpx;
			// align-items: center;
		}
	}

	.record {
		// text-align: center;
		// margin: 60rpx auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 40rpx;
		justify-content: center;
		align-items: center;
	}

	.content {
		margin: 20rpx 40rpx;

		.text {
			padding: 10rpx 20rpx;
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
		}
	}
.evaluate{
	text-align: center;
	.title{
		font-size: 40rpx;
		font-weight: bold;
	}
	.content{
		display: flex;
		justify-content: space-around;
	}
	.num{
		font-size: 60rpx;
	}
	.numb{
		font-size: 72rpx;
	}
}
	.shade {
		z-index: 998;
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;

		img {
			width: 60rpx;
			height: 60rpx;
		}

		.blackBoxSpeak,
		.blackBoxPause {
			width: 160rpx;
			height: 160rpx;
			border-radius: 24rpx;
			background-color: rgba($color: #000000, $alpha: 0.4);
			margin: auto;
			padding: 20rpx;
			position: relative;
			text-align: center;
			top: 288rpx;
		}

		.blackBoxSpeakConent {
			position: absolute;
			bottom: 24rpx;
			color: #fff;
			text-align: center;
			font-size: 30rpx;
			padding: 12rpx 0;
			width: 85%;
			margin: auto;
			border-radius: 16rpx;
		}
	}
</style>
