<template>
  <div class="main">
    <p class="p1">
      A better way<br/>
      to enjoy every day.
    </p>
    <p class="p2">
      Be the first to know when we lauch.
    </p>
    <button class="btn" @click="$refs.formPopup.show()">
      Request an invite
    </button>
    <my-popup
      ref="formPopup"
      @beforeClose="() => $refs.form.clearForm()">
      <template v-slot:title>
        <div class="popup-header">
          Request an invite
        </div>
      </template>
      <template v-slot:content>
        <div class="popup-content">
          <my-form
            ref="form"
            @afterSubmit="afterSubmit"
          />
        </div>
      </template>
    </my-popup>
    <my-popup
      ref="successPopup"
      class="successPopup">
      <template v-slot:title>
        <div class="popup-header">
          All done !
        </div>
      </template>
      <template v-slot:content>
        <div class="popup-content">
          You will be one of the first to experience Broccoli & Co. when we launch.
          <button class="btn" @click="confirm">
            OK
          </button>
        </div>
      </template>
    </my-popup>
  </div>
</template>
<script>
import MyPopup from '@/components/MyPopup'
import MyForm from '@/components/MyForm/index.vue'

export default {
  name: 'landing',
  components: {
    MyPopup,
    MyForm
  },
  methods: {
    afterSubmit () {
      this.$refs.formPopup.close()
      this.$refs.successPopup.show()
    },
    confirm () {
      this.$refs.successPopup.close()
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  .p1 {
    font-size: 50px;
    line-height: 1;
    margin-bottom: 20px;
  }
  .btn {
    display: block;
    width: 600px;
    line-height: 80px;
    border-radius: 70px;
    background: #56BACF;
    color: #fff;
    font-size: 30px;
    margin: 50px auto;
  }
}
.popup-content {
  padding-top: 20px;
  width: 80%;
}
.successPopup {
  .popup-content {
    padding-top: 50px;
    line-height: 1.5;
    font-size: 25px;
  }
  .btn {
    width: 100%;
    border-radius: 50px;
    margin: 80px auto 10px;
  }
}
</style>
