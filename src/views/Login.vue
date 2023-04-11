<template>
  <div>
    <div class="login">
      <div class="logo">
        <img src="@/assets/image/logo.19ca0be.png" alt="">
      </div>

      <div class="login-from">
          <form>
            <div class="item form-group">
              <input type="text" placeholder="手机号" maxlength="11" name="phone" v-model="obj.myPhone" @input="phoneChange" @keydown="phoneKeyDown">
              <div class="iconfont icon-quxiao1 cancel" v-show="obj.isCancelShow" @click="handCancel"></div>
              <div :class="!obj.isGetCodeClick?'disable':''" @click="handGetCode" v-show="obj.isGetCodeShow" class="getCode">获取验证码</div>
              <div v-show="!obj.isGetCodeShow" class="codeTime">{{obj.time}}  秒</div>
            </div>
            <div class="errTip" v-show="obj.isErrTipShow">{{ obj.errTip }}</div>
            <div class="item form-group">
              <input type="text" placeholder="验证码" name="code" v-model="obj.code">
            </div>
            <div class="item submit" @click="handSubmit">
              <van-button type="primary" color="#ff5f16" :block="true">登录</van-button>
            </div>
            
          </form>
      </div>
    </div>
  </div>
</template>

<script setup>
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import HTTP from '@/util/logoin'
    import {inject,onMounted,onUnmounted,reactive,onUpdated} from 'vue'
    import {useCookies} from 'vue3-cookies'
    import http from '@/util/http'
    const {cookies} = useCookies();

    const router=useRouter()
    const store=useStore()
    const isShow=inject('isTabbarShow')

    const obj = reactive({
      phone:'',
      code:'',
      isGetCodeClick:false,
      isSubmitShow:false,
      isErrTipShow:false,
      isGetCodeShow:true,
      time:60,
      errTip:"",
      isCancelShow:false,
      myPhone:"",
      Mycode:"",
      timer:null
    })

    /* 电话文本框变化 */
    const phoneChange=()=>{
      /* 取消按钮是否显示 */
      obj.myPhone?obj.isCancelShow=true:obj.isCancelShow=false;
      /* 获取验证码是否禁用 */
      if(obj.myPhone.length==11&&isPhone(obj.myPhone)){
        obj.isGetCodeClick=true
      }else{
        obj.isGetCodeClick=false
      }
    }

    const phoneKeyDown=()=>{
      /* 错误文本隐藏 */
      obj.isErrTipShow=false
      obj.errTip=''
    }

    /* 点击取消按钮 */
    const handCancel=()=>{
      /* 恢复电话文本框默认 */
      obj.myPhone=""
      obj.isCancelShow=false
      obj.errTip=""
      obj.isErrTipShow=false
      obj.isGetCodeClick=false
    }

    /* 获取验证码存到localStorage并设置验证码过期时间 */
    const createGetCode=(myCode)=>{
      let data={'time':Date.now(),'code':myCode}
      localStorage.setItem('code',JSON.stringify(data))
    }

    /* 只有第一次获取验证码才会调用方法创建本地localStorage */
    const isLocalStorage=(value)=>{
        const code=localStorage.getItem('code')
        if(!code){
          createGetCode(value)
        }
    }

    /* 获取验证码 */
    const handGetCode=()=>{
      if(checkPhone(obj.myPhone)){
        /* 发送验证码 */
        HTTP({
          url:`/code`,
          data:{
            myPhone:obj.myPhone
          },
          headers:{
            'Content-Type':'application/json;charset=utf-8',
          },
          method:'post'
        }).then((res)=>{
          /* 成功发送验证码 */
          if(res.data.code==0){
            isLocalStorage(res.data.sms)
            console.log(res.data)
          }
          /* 短时间重发发送验证码 */
          else if(res.data.code==1){
            console.log(res.data)
            /* 判断返回值是否包含Permits*/
            if(res.data.msg.includes('Permits'))
            obj.isErrTipShow=true
            obj.errTip='发送短信验证码过于频繁'
          }
        })
      }else{
        obj.isErrTipShow=true
        obj.errTip='电话格式错误'
      }
      /* 开启验证码倒计时 */
      if(isPhone(obj.myPhone)){
        setTimeout(()=>{
          obj.isGetCodeShow=false
          obj.timer=setInterval(()=>{
            if(obj.time!=1){
              obj.time--
            }else{
              obj.isGetCodeShow=true
              obj.time=60
              clearInterval(obj.timer)
            }
          },1000)
        },1000)
      }
    }


    /* 电话格式正则条件判断 */
    const checkPhone=(str)=>{
      let re =/^1[3-9]{1}\d{9}$/
      return re.test(str)
    }

     /* 电话是否为数字判断 */
     const isPhone=(str)=>{
      let re =/^1[0-9]{10}$/
      return re.test(str)
    }

    /* 提交校验 */
   const handSubmit=async ()=>{
    if(obj.myPhone==''){
      obj.isErrTipShow=true
      obj.errTip='请输入正确的手机号'
    }else if(!isPhone(obj.myPhone)){
      obj.isErrTipShow=true
      obj.errTip='请输入11位正确的手机号'
    }else{
      let myCode= localStorage.getItem('code')
      if(myCode){
        if(Date.now()-JSON.parse(myCode).time>1000*300==true){
          localStorage.removeItem('code')
       }
      }

       if(myCode&&obj.code==JSON.parse(myCode).code){
       await HTTP({
          url:'/login',
          method:'post',
          data:{
            phone:obj.myPhone
          },
          headers:{
            'Content-Type':'application/json;charset=utf-8',
          },
        }).then(res=>{
          localStorage.setItem('token',`${res.data.token}`)
          store.commit('changeLogin',true)
          store.commit('changeUserPhone',`${res.data.phone}`)
        
        })

      /* 登录成功后查询是否数据库是否创建相关表 */
       HTTP({
          url:`/users/?UserPhone=${store.state.myPhone}`,
        }).then(res=>{
          if(!res.data.users[0]){
            HTTP({
              url:'users/add',
              method:'post',
              headers:{
                'Content-Type':'application/json;charset=utf-8',
              },
              data:{
                UserName:'',
                UserPhone:store.state.myPhone,
                UserAvatar:''
              }
            })
          }

          setTimeout(function () {
             window.location.reload();
          },10);

          router.push('/center')
        })

       }else if(obj.isErrTipShow){
        return
       }
       else if(!myCode){
        console.log('验证码已经失效,请重新获取')
       }
       else{
        console.log('验证码错误')
       }
    }
    }
    /* 216f3ae9aa17438c85a3971395c3dcc9 */

    onMounted(() => {
      isShow.value=false
      let myCode= localStorage.getItem('code')
      if(myCode){
        if(Date.now()-JSON.parse(myCode).time>1000*300==true){
          localStorage.removeItem('code')
       }
      }
      })

    onUnmounted(() => {
      isShow.value=true;
    })
</script>

<style lang="scss" scoped>
$getCodeWidth:20%;
body{
  background-color: white;
  .login{
    overflow: hidden;
    .logo{
      height:7.5rem;
      margin: 9.875rem auto 5rem;
      line-height: 7.5rem;
      text-align: center;
      img{
        width: 7.5rem;
      }
    }
  }

  .login-from{
    .item{
      margin: 0 3.125rem 0 3.125rem;
      height: 6.875rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      position: relative;
      input{
        width: 67%;
        height: 1.875rem;
        line-height: 1.875rem;
        padding: 2.5rem 0;
        font-size: 1.875rem;
        color: #191a1b;
        border: 0;
        outline-width: 0;
      }

      .cancel{
        width: 13%;
        color: grey;
      }

      .getCode{
        width: $getCodeWidth;
      }
      .disable{
        color: #bdc0c5
      }

      .codeTime{
        width: $getCodeWidth;
        text-align: right;
        color: #bdc0c5;
        font-size:1.625rem;
      }
    }

    .errTip{
        margin-top: .625rem;
        margin-left: 3.125rem;
        color: #ff5f16;
        font-size: 1rem;
      }

    .form-group::after{
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      color: #ededed;
      transform-origin: 0 0;
      border-bottom: 1px solid #ededed;
    }

    .submit{
      margin-top: 8.75rem;
    }
  }
}
</style>