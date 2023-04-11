<template>
  <div class="main">
    <div class="top">
      <div class="avatar">
        <img src="@/assets/image/avatar.png" alt="" v-show="!store.state.isLogin"/>
        <img :src="UserAvatar" alt=""  @click="handGetUserList" v-show="store.state.isLogin"/>
        <p @click="handLogin" v-show="!store.state.isLogin" >立即登录</p>
        <p v-show="store.state.isLogin" @click="handGetUserList">{{ UserName }}</p>
      </div>
    </div>

    <div class="tab">
      <div class="tab-item" @click="handGetCard"> 
        <p class="value" >0张</p>
        <p class="label">卖座劵</p>  
      </div>  
      <div class="tab-item" @click="handGetBalance">
        <p class="price">
          <i>￥</i>
          <span class="interge">0</span>
        </p>
        <p class="label">
          余额
        </p>
      </div>        
      </div>
  </div>

  <div class="card">
    <div class="card-item mycard" @click="handGetCinema">
        <img src="@/assets/image/cinema.png" alt="">
        <p>电影订单</p>
        <van-icon name="arrow" color="#d3d3d3"/>
    </div>

    <div class="card-item mycard" @click="handGetPacket">
      <img src="@/assets/image/envelope.png" alt="">
        <p>组合红包</p>
        <van-icon name="arrow" color="#d3d3d3"/>
    </div>

    <div class="card-item mycard" @click="handGetHelp">
      <img src="@/assets/image/help.a9203368.png" alt="">
        <p>帮助与客服</p>
        <van-icon name="arrow" color="#d3d3d3"/>
    </div>

    <div class="card-item " @click="handGetSet">
      <img src="@/assets/image/set.png" alt="">
        <p>设置</p>
        <van-icon name="arrow" color="#d3d3d3"/>
    </div>
  </div>
</template>
<script setup>
  import { useRouter } from 'vue-router';
  import HTTP from '@/util/logoin'
  import {onMounted,computed,ref} from 'vue'
  import {useStore} from 'vuex'
  const store =useStore()

  const UserName=ref('');
  const UserAvatar=ref('')

  const router=useRouter()
  const handLogin=()=>{
    router.push('./login')
  }

  const handGetUserList=()=>{
    router.push('./user/list')
  }

  const handGetCard=()=>{
    router.push('./user/card')
  }

  const handGetBalance=()=>{
    router.push('./user/balance')
  }

  const handGetCinema=()=>{
    router.push('./user/cinema')
  }

  const handGetPacket=()=>{
    router.push('./user/packet')
  }

  const handGetHelp=()=>{
    router.push('./help')
  }

  const handGetSet=()=>{
    router.push('./set')
  }

/* 如果是手机号给中间4位 */
  const computedPhone=()=>{
      return store.state.myPhone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2");
  }

  onMounted(() => {
    /* 根据用户登录手机号获取用户信息 */
    store.dispatch('getUserList').then(res=>{
      console.log(res.data)
    if( res.data.users[0].UserName){
      UserName.value=res.data.users[0].UserName
    }else{
      UserName.value=computedPhone(res.data.users[0].UserPhone)
    }
    UserAvatar.value=`http://localhost:3000${res.data.users[0].UserAvatar}`  
    store.commit('changeUserId',`${res.data.users[0].id}`)
    }).catch(err=>{
      console.log('请登录')
    })
  })
</script>

<style lang="scss" scoped>
.main,body{
  height: 100%;
  background: #f4f4f4;
}
  .top{
    width: 100%;
    height: 25rem;
    background-image:url(@/assets/image/bg.a5bdd690.png);
    background-size: cover;
    background-position: center;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    
    margin-top: -5.5rem;
    .avatar{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 8rem;
        img{
          width: 8.375rem;
          height: 8.375rem;
          border-radius: 100%;
          margin-right: 2.5rem;
          margin-left: 2.75rem;
        }
        p{
          font-size: 2rem;
          color: white;
        }
    }
  }

  .tab{
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: white;
    .tab-item{
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
     .value{
      font-size: 2.125rem;
      color: #191a1b;
     }
     .label{
      font-size: 1.625rem;
      color: #797d82;
     }
     .price{
      i{
        font-size: 2.125rem;
        font-style: normal;
      }
      .interge{
        font-size: 2.125rem;
      }
     }
    }
  }


  .card{
    margin-top: 1.25rem;
    .card-item{
      height: 6.125rem;
      background-color: white;
      padding-left: 1.875rem;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      img{
        width: 2.5rem;
        height: 2.5rem;
      }
      p{
        width: 83%;
        font-size:1.875rem;
        color: #191a1b;
        margin-left: 1.875rem;
      }
    }
    .mycard::after{
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #ebebeb;
      color: #ededed;
      left: 13px;       
    }
  }
</style>