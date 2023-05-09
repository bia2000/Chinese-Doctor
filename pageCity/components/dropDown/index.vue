<template>
  <view class="select-container">
   <view class="input-container">
      <input
        class="input"
        v-model="searchValue"
        type="text"
        :placeholder="placeholder"
        :readonly="!isSearch"
        @focus="inputFocus"
        @blur="inputBlur"
      />
      <view v-if="!isSearch" class="input-icon">
        <u-icon name="arrow-down"></u-icon>
      </view>
    </view>
   <view class="select-content" :class="{ active: showSelect }">
      <view
        v-for="(item, index) in list"
        class="select-line"
        @click="select(item)"
        
      >
        <label>{{ item.label }}</label>
        <span v-if="value == item.value" class="selected"
          ><u-icon name="checkbox-mark"></u-icon
        ></span>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'dropDown',
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
    },
    isSearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSelect: false,
      searchValue: '',
    }
  },
  watch: {
    searchValue: {
      immediate: true,
      handler: function (newVal) {
        this.$emit('searchChange', newVal)
      },
    },
    value: {
      immediate: true,
      handler: function (newVal) {
        let item = this.list.find((it) => it.value == newVal)
        if (item) this.searchValue = item.label
      },
    },
  },
  mounted() {},
  methods: {
    inputFocus() {
      this.showSelect = true
    },
    inputBlur() {
      setTimeout(() => {
        this.showSelect = false
      }, 100)
    },
    select(item) {
      this.searchValue = item.label
      this.$emit('input', item.value)
    },
  },
}
</script>
<style lang="scss">
.select-container {
  width: 30%;
  height: 40px;
  line-height: 40px;
  background-color: #ffffff;
  border-radius: 6px;
  position: relative;
  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .input {
      flex: 1;
      border: 0;
      height: 100%;
      background-color: transparent;
      font-size: 24rpx;
      padding: 0px 10px;
      height: 40px;
      line-height: 40px;
    }
    .input-icon {
      width: 40rpx;
      height: 40rpx;
      text-align: center;
      font-size: 24rpx;
      .iconfont {
        font-size: 24rpx;
        color: #999999;
      }
    }
  }
  .select-content {
    position: absolute;
    width: 100%;
    top: 42px;
    left: 0;
    background-color: #ffffff;
    z-index: 999999;
    border-radius: 6px;
    max-height: 200px;
    overflow: auto;
    font-size: 18rpx;
    border: 1px solid #999;
    display: none;
    &.active {
      display: block;
      animation: selectanim 0.25s;
      -webkit-animation: selectanim 0.25s;
    }
    .select-line {
      width: 80%;
      line-height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 10rpx;
      border-bottom: 1px solid #999;
      &:last-child {
        border-bottom: 0;
      }
      .selected {
        flex-shrink: 0;
        .iconfont {
          font-size: 30rpx;
          color: var(--theme);
        }
      }
    }
    @keyframes selectanim {
      from {
        opacity: 0;
        top: 60px;
      }
      to {
        opacity: 1;
        top: 42px;
      }
    }
    @-webkit-keyframes selectanim {
      from {
        opacity: 0;
        top: 60px;
      }
      to {
        opacity: 1;
        top: 42px;
      }
    }
  }
}
</style>
