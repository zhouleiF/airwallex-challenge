<template>
  <div class="popup" @touchmove.prevent @click.self="close" v-show="visible">
    <div class="con">
      <div class="title">
        <slot name="title" />
        <div class="line"></div>
      </div>
      <div class="content">
        <slot name="content" />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyPopup',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    close () {
      this.$emit('beforeClose')
      this.visible = false
    },
    show () {
      this.visible = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .popup {
    box-sizing: content-box;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
    .con {
      width: 600px;
      min-height: 300px;
      background-color: #fff;
      border-radius: 10px;
      padding: 70px 0 40px;
      .title {
        font-size: 35px;
        color: #5C6C78;
        line-height: 1.2;
      }
      .line {
        width: 100px;
        height: 1PX;
        background-color: #000;
        margin: 20px auto 0;
      }
      .content {
        padding-bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      .footer {
        text-align: center;
        button {
          display: block;
          width: 550px;
          height: 90px;
          line-height: 90px;
          font-size: 42px;
          text-align: center;
          color: #56BACF;
          margin: 0 auto 50px;
          background-color: transparent;
          &:first-child {
            color: #fff;
            border-radius: 50px;
            background-color: #56BACF;
          }
          &:last-child {
            margin-bottom: 0
          }
        }
      }
    }
  }
</style>
