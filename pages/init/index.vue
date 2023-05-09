<template>
  <div class="init"></div>
</template>

<script>
export default {
  name: 'init',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    // 从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
    const value = uni.getStorageSync('launchFlag')
    if (value) {
      // 如何已经有，直接去home首页
      uni.switchTab({
        url: '/pages/index/index',
      })
    } else {
      // 没有值，跳到引导页，并存储，下次打开就不会进去引导页
      uni.setStorage({
        key: 'launchFlag',
        data: true,
      })
      uni.redirectTo({
        url: '/pageCity/guide/index',
      })
    }
  },
}
</script>

<style scoped></style>
