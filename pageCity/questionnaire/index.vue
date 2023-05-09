<template>
	<view class="questionnaire">
		<view class="top">
			<view class="title"> 问卷采集 </view>
			<view class="tip">
				请回答以下问卷，系统会根据你的回答结果定制专属的学习计划
			</view>
		</view>
		<view class="content">
			<u-form :model="user" ref="uForm" class="form">
				<view class="item">
					<view class=""> 1.国籍(Natianality) </view>
					<u-form-item borderBottom @click="toShowpicker">
						<u-input v-model="user.info.nation" class="input" type="select" placeholder="请选择地区"
							@click="pickerShow = true"></u-input>
						<u-picker :show="pickerShow" :columns="nations" @change="change" @cancel="cancelChoose"
							@confirm="sureChoose"></u-picker>
					</u-form-item>
				</view>
				<view class="item">
					<view class=""> 2.性别(Gender) </view>
					<u-form-item borderBottom ref="item2">
						<u-radio-group v-model="user.info.gender">
							<u-radio :customStyle="{ marginRight: '16px' }" v-for="(item, index) in sexlist"
								:key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</view>
				<view class="item">
					<view class=""> 3.年龄(Age) </view>
					<u-form-item borderBottom ref="item1">
						<u-input v-model="user.info.age" disabledColor="#ffffff" placeholder="请输入年龄"
							border="none"></u-input>
					</u-form-item>
				</view>
				<view class="item">
					<view class="">
						4.学过汉语吗? (Have you ever been learning Chinese?)
					</view>
					<u-form-item prop="value4" borderBottom ref="item2">
						<u-radio-group v-model="user.value4">
							<u-radio :customStyle="{ marginRight: '16px' }" v-for="(item, index) in whetherList"
								:key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</view>
				<view class="item">
					<view class="">
						5.你学了多长时间汉语? How long have you studied Chinese?
					</view>
					<u-form-item borderBottom ref="item2">
						<u-radio-group v-model="user.value5" placement="column">
							<u-radio :customStyle="{ marginRight: '16px', marginTop: '24rpx' }"
								v-for="(item, index) in timeList" :key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</view>
				<view class="item">
					<view class="">6.你通过什么方式学习汉语? How did you learn Chinese? (多选题) </view>
					<u-form-item borderBottom ref="item3">
						<u-checkbox-group placement="column" v-model="user.value6" shape="square" @change="change">
							<u-checkbox :customStyle="{ marginRight: '16px', marginTop: '24rpx' }"
								v-for="(item, index) in typeList" :key="index" :label="item.name" :name="item.name">
							</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
				</view>
				<view class="item">
					<view class="">
						7.参加过汉语水平考试吗? Have you ever participated in HSK?
					</view>
					<u-form-item borderBottom ref="item2">
						<u-radio-group v-model="user.value7">
							<u-radio :customStyle="{ marginRight: '16px' }" v-for="(item, index) in whetherList"
								:key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</view>
				<view class="item">
					<view class=""> 8.汉语水平是? Chinese Level? </view>
					<u-form-item borderBottom ref="item2">
						<u-radio-group v-model="user.value8" placement="column">
							<u-radio :customStyle="{ marginRight: '16px', marginTop: '24rpx' }"
								v-for="(item, index) in levelList" :key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</view>
				<!-- <view class="item">
            <view class=""> 9. 考试分数是多少? Test Score </view>
            <u-form-item prop="radiovalue1" borderBottom ref="item2">
              <u-radio-group v-model="model1.radiovalue1">
                <u-radio
                  :customStyle="{ marginRight: '16px' }"
                  v-for="(item, index) in radiolist1"
                  :key="index"
                  :label="item.name"
                  :name="item.name"
                >
                </u-radio>
              </u-radio-group> </u-form-item></view
          > -->
				<view class="item">
					<view class="">
						10.有没有参加汉语口语考试? Have you taken HSKK?
					</view>
					<u-form-item borderBottom ref="item2">
						<u-radio-group v-model="user.value10">
							<u-radio :customStyle="{ marginRight: '16px' }" v-for="(item, index) in whetherList"
								:key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</view>
				<view class="item">
					<view class=""> 11.口语水平是? Spoken Chinese level </view>
					<u-form-item prop="radiovalue1" borderBottom ref="item2">
						<u-radio-group v-model="user.value11" placement="column">
							<u-radio :customStyle="{ marginRight: '16px', marginTop: '24rpx' }"
								v-for="(item, index) in levelList2" :key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</view>
				<view class="item">
					<view class="">12.母语是? Your native language is? </view>
					<u-form-item borderBottom ref="item1">
						<u-input v-model="user.value12" border="none" placeholder="请输入"></u-input>
					</u-form-item>
				</view>
				<view class="item">
					<view class="">13.除了母语，还学习过什么语言? What languages did you learned
						besides your native language? (多选题)</view>
					<u-form-item borderBottom ref="item3">
						<u-checkbox-group placement="column" v-model="user.value13" shape="square"
							@change="change">
							<u-checkbox :customStyle="{ marginRight: '16px', marginTop: '24rpx' }"
								v-for="(item, index) in languageList" :key="index" :label="item.name" :name="item.name">
							</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
				</view>
				<view class="item">
					<view class="">14.你觉得学习汉语，最难学的是：What do you think is the most difficult part of learning Chinese?
					</view>
					<u-form-item borderBottom ref="item2">
						<u-radio-group v-model="user.value14" placement="column">
							<u-radio :customStyle="{ marginRight: '16px', marginTop: '24rpx' }"
								v-for="(item, index) in hardList" :key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</view>
				<view class="item">
					<view class="">15.你对中国的哪方面感兴趣?What are you interested in about China? (多选题)</view>
					<u-form-item borderBottom ref="item3">
						<u-checkbox-group placement="column" v-model="user.value15" shape="square"
							@change="change">
							<u-checkbox :customStyle="{ marginRight: '16px', marginTop: '24rpx' }"
								v-for="(item, index) in interestedList" :key="index" :label="item.name" :name="item.name">
							</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
				</view>
				<view class="item">
					<view class="">16.你想提高中文学习的哪方面能力?What would you like to improve in your Chinese study? (多选题)</view>
					<u-form-item borderBottom ref="item3">
						<u-checkbox-group placement="column" v-model="user.value16" shape="square"
							@change="change">
							<u-checkbox :customStyle="{ marginRight: '16px', marginTop: '24rpx' }"
								v-for="(item, index) in enhanceList" :key="index" :label="item.name" :name="item.name">
							</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
				</view>
				<view style="margin-top: 100rpx">
					<button type="primary" class="gui-button gui-bg-blue msgBtn" style="border-radius: 50rpx"
						@click="submit">
						<!-- formType="submit" -->
						提交问卷
					</button>
				</view>
			</u-form>
			<u-datetime-picker :show="showBirthday" :value="birthday" mode="date" closeOnClickOverlay
				@confirm="birthdayConfirm" @cancel="birthdayClose" @close="birthdayClose"></u-datetime-picker>
		</view>
	</view>
</template>

<script>
	import {
		TimestampToDate
	} from '@/common/utils'
	import {
		user_info,
		questionnaire
	} from '@/common/request'
	export default {
		name: 'questionnaire',
		components: {},
		props: {},
		data() {
			return {
				user: {
					info: {
						nation: '',
						gender: '',
						age: '',
					},
					value4: '',
					value5: '',
					value6: [],
					value7: '',
					value8: '',
					value9: '',
					value10: '',
					value11: '',
					value12: '',
					value13: [],
					value14: '',
					value15: [],
					value16: [],
				},
				showBirthday: false,
				birthday: Number(new Date()),
				nations: [
					['中国', '安哥拉', '阿富汗', '美国']
				],
				hardList: [{
						name: '发音 Pronunciation',
						disabled: false,
					},
					{
						name: '汉字 Chinese character',
						disabled: false,
					},
					{
						name: '词语 Words and expressions',
						disabled: false,
					},
					{
						name: '语法 Grammar',
						disabled: false,
					},
				],
				whetherList: [{
						name: '是',
						disabled: false,
					},
					{
						name: '否',
						disabled: false,
					},
				],
				enhanceList:[
					{
						name: '写作 Writing',
						disabled: false,
					},
					{
						name: '阅读 Reading',
						disabled: false,
					},
					{
						name: '口语 Oral communication',
						disabled: false,
					},
					{
						name: '听力 Listening',
						disabled: false,
					},
				],
				timeList: [{
						name: '1个月',
						disabled: false
					},
					{
						name: '3个月',
						disabled: false
					},
					{
						name: '半年',
						disabled: false
					},
					{
						name: '一年',
						disabled: false
					},
					{
						name: '一年以上',
						disabled: false
					},
				],
				typeList: [{
						name: '课堂教学classroom teaching',
						disabled: false
					},
					{
						name: '家庭教师home tutor',
						disabled: false
					},
					{
						name: '网络课堂online classroom',
						disabled: false
					},
					{
						name: '自学self-study',
						disabled: false
					},
					{
						name: '其他supplement',
						disabled: false
					},
				],
				levelList: [{
						name: 'HSK1级 HSK Level 1 ',
						disabled: false,
					},
					{
						name: 'HSK2级 HSK Level 2 ',
						disabled: false,
					},
					{
						name: 'HSK3级 HSK Level 3 ',
						disabled: false,
					},
					{
						name: 'HSK4级 HSK Level 4 ',
						disabled: false,
					},
					{
						name: 'HSK5级 HSK Level 5 ',
						disabled: false,
					},
					{
						name: 'HSK6级 HSK Level 6 ',
						disabled: false,
					},
				],
				levelList2: [{
						name: 'HSKK 初级HSKK elementary level',
						disabled: false,
					},
					{
						name: 'HSKK中级HSKK intermediate level',
						disabled: false,
					},
					{
						name: 'HSKK高级HSKK advanced level',
						disabled: false,
					},
				],
				interestedList: [{
						name: '历史 History',
						disabled: false,
					},
					{
						name: '影视剧 Drama series',
						disabled: false,
					},
					{
						name: '歌曲 Song',
						disabled: false,
					},
					{
						name: '现代生活 Modern life',
						disabled: false,
					},
					{
						name: '科技 Technology',
						disabled: false,
					},
				],
				languageList: [{
						name: '英语English',
						disabled: false,
					},
					{
						name: '日语Japanese ',
						disabled: false,
					},
					{
						name: '西班牙语Spanish',
						disabled: false,
					},
					{
						name: '法语French',
						disabled: false,
					},
					{
						name: '俄语Russian',
						disabled: false,
					},
					{
						name: '韩语Korean',
						disabled: false,
					},
					{
						name: '葡萄牙语Portuguese',
						disabled: false,
					},
					{
						name: '阿拉伯语Arabic',
						disabled: false,
					},
					{
						name: '其他Supplement',
						disabled: false,
					},
				],
				sexlist: [{
						name: '男',
						disabled: false,
					},
					{
						name: '女',
						disabled: false,
					},
				],
				pickerShow: false,
				// options: [
				//   {
				//     cateName: '安哥拉 Angola',
				//   },
				//   {
				//     cateName: '阿富汗 Afghanistan',
				//   },
				//   {
				//     cateName: '阿尔巴尼亚 Albania',
				//   },
				//   {
				//     cateName: '阿尔及利亚 Algeria',
				//   },
				//   {
				//     cateName: '安道尔共和国 Andorra',
				//   },
				//   {
				//     cateName: '安圭拉岛 Anguilla',
				//   },
				//   {
				//     cateName: '安提瓜和巴布达 Antigua and Barbuda',
				//   },
				//   {
				//     cateName: '阿根廷 Argentina',
				//   },
				//   {
				//     cateName: '亚美尼亚 Armenia',
				//   },
				//   {
				//     cateName: '阿森松 Ascension',
				//   },
				//   {
				//     name: '澳大利亚 Australia',
				//   },
				//   {
				//     name: '奥地利 Austria',
				//   },
				//   {
				//     name: '阿塞拜疆 Azerbaijan',
				//   },
				//   {
				//     name: '巴哈马 Bahamas',
				//   },
				//   {
				//     name: '巴林 Bahrain',
				//   },
				//   {
				//     name: '孟加拉国 Bangladesh',
				//   },
				//   {
				//     name: '巴巴多斯 Barbados',
				//   },
				//   {
				//     name: '白俄罗斯 Belarus',
				//   },
				//   {
				//     name: '比利时 Belgium',
				//   },
				//   {
				//     name: '伯利兹 Belize',
				//   },
				//   {
				//     name: '贝宁 Benin',
				//   },
				//   {
				//     name: '百慕大群岛 Bermuda Is',
				//   },
				//   {
				//     name: '玻利维亚 Bolivia',
				//   },
				//   {
				//     name: '博茨瓦纳 Botswana',
				//   },
				//   {
				//     name: '巴西 Brazil',
				//   },
				//   {
				//     name: '文莱 Brunei',
				//   },
				//   {
				//     name: '保加利亚 Bulgaria',
				//   },
				//   {
				//     name: '布基纳法索 Burkina Faso',
				//   },
				//   {
				//     name: '缅甸 Burma',
				//   },
				//   {
				//     name: '布隆迪 Burundi',
				//   },
				//   {
				//     name: '喀麦隆 Cameroon',
				//   },
				//   {
				//     name: '加拿大 Canada',
				//   },
				//   {
				//     name: '开曼群岛 Cayman Is',
				//   },
				//   {
				//     name: '中非共和国 Central African Republic',
				//   },
				//   {
				//     name: '乍得 Chad',
				//   },
				//   {
				//     name: '智利 Chile',
				//   },
				//   {
				//     name: '中国 China',
				//   },
				//   // { name: '哥伦比亚 Colombia' },
				//   // { name: '刚果 Congo' },
				//   // { name: '库克群岛 Cook Is' },
				//   // { name: '哥斯达黎加 Costa Rica' },
				//   // { name: '古巴 Cuba' },
				//   // { name: '塞浦路斯 Cyprus' },
				//   // { name: '捷克 Czech Republic' },
				//   // { name: '丹麦 Denmark' },
				//   // { name: '吉布提 Djibouti' },
				//   // { name: '多米尼加共和国 Dominica Rep' },
				//   // { name: '厄瓜多尔 Ecuador' },
				//   // { name: '埃及 Egypt' },
				//   // { name: '萨尔瓦多 EI Salvador' },
				//   // { name: '爱沙尼亚 Estonia' },
				//   // { name: '埃塞俄比亚 Ethiopia' },
				//   // {  'Fiji', label: '斐济' },
				//   // {  'Finland', label: '芬兰' },
				//   // {  'France', label: '法国' },
				//   // {  'French Guiana', label: '法属圭亚那' },
				//   // {  'French Polynesia', label: '法属玻利尼西亚' },
				//   // {  'Gabon', label: '加蓬' },
				//   // {  'Gambia', label: '冈比亚' },
				//   // {  'Georgia', label: '格鲁吉亚' },
				//   // {  'Germany', label: '德国' },
				//   // {  'Ghana', label: '加纳' },
				//   // {  'Gibraltar', label: '直布罗陀' },
				//   // {  'Greece', label: '希腊' },
				//   // {  'Grenada', label: '格林纳达' },
				//   // {  'Guam', label: '关岛' },
				//   // {  'Guatemala', label: '危地马拉' },
				//   // {  'Guinea', label: '几内亚' },
				//   // {  'Guyana', label: '圭亚那' },
				//   // {  'Haiti', label: '海地' },
				//   // {  'Honduras', label: '洪都拉斯' },
				//   // {  'Hungary', label: '匈牙利' },
				//   // {  'Iceland', label: '冰岛' },
				//   // {  'India', label: '印度' },
				//   // {  'Indonesia', label: '印度尼西亚' },
				//   // {  'Iran', label: '伊朗' },
				//   // {  'Iraq', label: '伊拉克' },
				//   // {  'Ireland', label: '爱尔兰' },
				//   // {  'Israel', label: '以色列' },
				//   // {  'Italy', label: '意大利' },
				//   // {  'Ivory Coast', label: '科特迪瓦' },
				//   // {  'Jamaica', label: '牙买加' },
				//   // {  'Japan', label: '日本' },
				//   // {  'Jordan', label: '约旦' },
				//   // {  'Kampuchea (Cambodia )', label: '柬埔寨' },
				//   // {  'Kazakstan', label: '哈萨克斯坦' },
				//   // {  'Kenya', label: '肯尼亚' },
				//   // {  'Korea', label: '韩国' },
				//   // {  'Kuwait', label: '科威特' },
				//   // {  'Kyrgyzstan', label: '吉尔吉斯坦' },
				//   // {  'Laos', label: '老挝' },
				//   // {  'Latvia', label: '拉脱维亚' },
				//   // {  'Lebanon', label: '黎巴嫩' },
				//   // {  'Lesotho', label: '莱索托' },
				//   // {  'Liberia', label: '利比里亚' },
				//   // {  'Libya', label: '利比亚' },
				//   // {  'Liechtenstein', label: '列支敦士登' },
				//   // {  'Lithuania', label: '立陶宛' },
				//   // {  'Luxembourg', label: '卢森堡' },
				//   // {  'Madagascar', label: '马达加斯加' },
				//   // {  'Malawi', label: '马拉维' },
				//   // {  'Malaysia', label: '马来西亚' },
				//   // {  'Maldives', label: '马尔代夫' },
				//   // {  'Mali', label: '马里' },
				//   // {  'Malta', label: '马耳他' },
				//   // {  'Mariana Is', label: '马里亚那群岛' },
				//   // {  'Martinique', label: '马提尼克' },
				//   // {  'Mauritius', label: '毛里求斯' },
				//   // {  'Mexico', label: '墨西哥' },
				//   // {  'Moldova', label: '摩尔多瓦' },
				//   // {  'Monaco', label: '摩纳哥' },
				//   // {  'Mongolia', label: '蒙古' },
				//   // {  'Montserrat Is', label: '蒙特塞拉特岛' },
				//   // {  'Morocco', label: '摩洛哥' },
				//   // {  'Mozambique', label: '莫桑比克' },
				//   // {  'Namibia', label: '纳米比亚' },
				//   // {  'Nauru', label: '瑙鲁' },
				//   // {  'Nepal', label: '尼泊尔' },
				//   // {  'Netheriands Antilles', label: '荷属安的列斯' },
				//   // {  'Netherlands', label: '荷兰' },
				//   // {  'New Zealand', label: '新西兰' },
				//   // {  'Nicaragua', label: '尼加拉瓜' },
				//   // {  'Niger', label: '尼日尔' },
				//   // {  'Nigeria', label: '尼日利亚' },
				//   // {  'North Korea', label: '朝鲜' },
				//   // {  'Norway', label: '挪威' },
				//   // {  'Oman', label: '阿曼' },
				//   // {  'Pakistan', label: '巴基斯坦' },
				//   // {  'Panama', label: '巴拿马' },
				//   // {  'Papua New Cuinea', label: '巴布亚新几内亚' },
				//   // {  'Paraguay', label: '巴拉圭' },
				//   // {  'Peru', label: '秘鲁' },
				//   // {  'Philippines', label: '菲律宾' },
				//   // {  'Poland', label: '波兰' },
				//   // {  'Portugal', label: '葡萄牙' },
				//   // {  'Puerto Rico', label: '波多黎各' },
				//   // {  'Qatar', label: '卡塔尔' },
				//   // {  'Reunion', label: '留尼旺' },
				//   // {  'Romania', label: '罗马尼亚' },
				//   // {  'Russia', label: '俄罗斯' },
				//   // {  'Saint Lueia', label: '圣卢西亚' },
				//   // {  'Saint Vincent', label: '圣文森特岛' },
				//   // {  'Samoa Eastern', label: '东萨摩亚(美)' },
				//   // {  'Samoa Western', label: '西萨摩亚' },
				//   // {  'San Marino', label: '圣马力诺' },
				//   // {  'Sao Tome and Principe', label: '圣多美和普林西比' },
				//   // {  'Saudi Arabia', label: '沙特阿拉伯' },
				//   // {  'Senegal', label: '塞内加尔' },
				//   // {  'Seychelles', label: '塞舌尔' },
				//   // {  'Sierra Leone', label: '塞拉利昂' },
				//   // {  'Singapore', label: '新加坡' },
				//   // {  'Slovakia', label: '斯洛伐克' },
				//   // {  'Slovenia', label: '斯洛文尼亚' },
				//   // {  'Solomon Is', label: '所罗门群岛' },
				//   // {  'Somali', label: '索马里' },
				//   // {  'South Africa', label: '南非' },
				//   // {  'Spain', label: '西班牙' },
				//   // {  'SriLanka', label: '斯里兰卡' },
				//   // {  'St.Lucia', label: '圣卢西亚' },
				//   // {  'St.Vincent', label: '圣文森特' },
				//   // {  'Sudan', label: '苏丹' },
				//   // {  'Suriname', label: '苏里南' },
				//   // {  'Swaziland', label: '斯威士兰' },
				//   // {  'Sweden', label: '瑞典' },
				//   // {  'Switzerland', label: '瑞士' },
				//   // {  'Syria', label: '叙利亚' },
				//   // {  'Tajikstan', label: '塔吉克斯坦' },
				//   // {  'Tanzania', label: '坦桑尼亚' },
				//   // {  'Thailand', label: '泰国' },
				//   // {  'Togo', label: '多哥' },
				//   // {  'Tonga', label: '汤加' },
				//   // {  'Trinidad and Tobago', label: '特立尼达和多巴哥' },
				//   // {  'Tunisia', label: '突尼斯' },
				//   // {  'Turkey', label: '土耳其' },
				//   // {  'Turkmenistan', label: '土库曼斯坦' },
				//   // {  'Uganda', label: '乌干达' },
				//   // {  'Ukraine', label: '乌克兰' },
				//   // {  'United Arab Emirates', label: '阿拉伯联合酋长国' },
				//   // {  'United Kiongdom', label: '英国' },
				//   // {  'United States of America', label: '美国' },
				//   // {  'Uruguay', label: '乌拉圭' },
				//   // {  'Uzbekistan', label: '乌兹别克斯坦' },
				//   // {  'Venezuela', label: '委内瑞拉' },
				//   // {  'Vietnam', label: '越南' },
				//   // {  'Yemen', label: '也门' },
				//   // {  'Yugoslavia', label: '南斯拉夫' },
				//   // {  'Zimbabwe', label: '津巴布韦' },
				//   // {  'Zaire', label: '扎伊尔' },
				//   // {  'Zambia', label: '赞比亚' },
				// ],
			}
		},

		computed: {},
		methods: {
			sureChoose(e) {
				this.pickerShow = false
				this.user.info.nation = e.value[0]
				console.log(e)
			},
			cancelChoose(e) {
				this.pickerShow = false
				console.log(e)
			},
			toShowpicker() {
				this.pickerShow = true
			},
			change() {},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			birthdayClose() {
				this.showBirthday = false
				// this.$refs.form1.validateField('userInfo.birthday')
			},
			birthdayConfirm(e) {
				this.showBirthday = false
				this.user.info.birthday = TimestampToDate(e.value)
				// this.$refs.form1.validateField('userInfo.birthday')
			},
			submit() {
				console.log(this.user)
				let userId = uni.getStorageSync('id')
				let MyRecord = questionnaire.create()
				MyRecord.set({
					'userId':userId,
					'nationality': this.user.info.nation,
					'gender':this.user.info.gender,
					'age':this.user.info.age,
					'everLearn':this.user.value4,
					'time_learn':this.user.value5,
					'type_learn':this.user.value6,
					'HSK':this.user.value7,
					'HSKLevel':this.user.value8,
					'HSKK':this.user.value10,
					'HSKKLevel':this.user.value11,
					'nativeLanguage':this.user.value12,
					'otherLanguage':this.user.value13,
					'difficultPart':this.user.value14,
					'interestedPart':this.user.value15,
					'enhancePart':this.user.value16
				})
				MyRecord.save()
				let product = user_info.getWithoutData(userId)
				product.set('isAnswer', '1')
				product.update()
				
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, 500)
				
			},
		},
		watch: {},

		// 页面周期函数--监听页面加载
		onLoad() {

		},
		// 页面周期函数--监听页面初次渲染完成
	}
</script>

<style lang="scss" scoped>
	.top {
		padding: 20rpx;

		.tip {
			font-size: 24rpx;
			color: #888;
		}

		.title {
			font-size: 50rpx;
			padding: 60rpx 0;
		}
	}

	.content {
		padding: 30rpx;
		background-color: #fff;

		.form {
			padding: 30rpx;

			.item {
				margin-top: 30rpx;
			}

			.input {
				margin-left: 50rpx;
				// width: 400rpx;
			}
		}
	}
</style>
