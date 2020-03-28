<template>
  <div class="form">
    <form @submit.prevent="submit">
      <input
        :class="{error: hasCheckedName === false}"
        v-model="name"
        name="name"
        placeholder="Full name"
        @input="emitCheck('Name', 'input')"
        @blur="emitCheck('Name')"
      />
      <input
        :class="{error: hasCheckedEmail === false}"
        v-model="email"
        name="email"
        placeholder="Email"
        @input="emitCheck('Email', 'input')"
        @blur="emitCheck('Email')"
      />
      <input
        :class="{error: hasCheckedConfirm === false}"
        v-model="confirmEmail"
        name="confirmEmail"
        placeholder="Confirm Email"
        @input="emitCheck('Confirm', 'input')"
        @blur="emitCheck('Confirm')"
      />
      <button type="submit" class="btn" :class="{disabled: isLoading}">{{isLoading ? 'Sending, please wait.' : 'Send'}}</button>
      <p class="error" v-show="error">{{error}}</p>
    </form>
  </div>
</template>
<script>
import { regEmail } from './rules'
import request from '@/service'

export default {
  name: 'MyForm',
  data () {
    return {
      name: null,
      email: null,
      confirmEmail: null,
      hasCheckedName: true,
      hasCheckedEmail: true,
      hasCheckedConfirm: true,
      error: null,
      isLoading: false
    }
  },
  methods: {
    submit () {
      let checked = true
      const arr = ['Name', 'Email', 'Confirm']
      arr.forEach(type => {
        const isChecked = this.emitCheck(type)
        checked = checked && isChecked
      })
      if (checked && (!this.isLoading)) {
        this.isLoading = true
        this.error = null
        request({
          name: this.name,
          email: this.email
        }).then(res => {
          this.$emit('afterSubmit')
        }).catch(error => (this.error = error)).finally(() => (this.isLoading = false))
      }
    },
    emitCheck (type = '', eventType = 'blur') {
      if (type) {
        const checked = this['check' + type]()
        if (eventType === 'blur') this['hasChecked' + type] = checked
        else if (checked === true) this['hasChecked' + type] = true
        return checked
      }
    },
    checkName () {
      const value = this.name
      return !!(value && (value.length >= 3))
    },
    checkEmail () {
      const value = this.email
      if (this.confirmEmail) {
        this.emitCheck('Confirm')
      }
      return !!(value && regEmail.test(value))
    },
    checkConfirm () {
      const value = this.confirmEmail
      return !!(value && (value === this.email))
    },
    clearForm () {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  input {
    -webkit-user-select:text !important;
    display: block;
    width: 100%;
    font-size: 30px;
    line-height: 1.5;
    padding-top: 50px;
    border: none;
    border-bottom: 1PX solid #000;
    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px #fff inset !important;
    }
    &::-webkit-input-placeholder {
        color: #bdcedb;
      }
    &.error {
      border-bottom-color: #d63449;
      &:-webkit-autofill {
        -webkit-text-fill-color: red;
      }
    }
  }
  .btn {
    display: block;
    width: 100%;
    line-height: 80px;
    border-radius: 50px;
    background: #56BACF;
    color: #fff;
    margin: 80px auto 10px;
    &.disabled {
      background-color: #ccc;
    }
  }
  .error {
    color: red;
  }
}
</style>
