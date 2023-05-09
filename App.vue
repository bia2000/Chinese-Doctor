<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>



<style lang="scss">
// 引入uView基础样式
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/pageCity/uni_modules/uview-ui/index.scss';
body {
  background-color: #f9f9f9;
}
</style>
