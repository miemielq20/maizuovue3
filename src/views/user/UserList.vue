<template>
    <div>
        <van-uploader :before-read="beforeRead" :after-read="afterRead"  /><br>
        <input type="text" v-model="name" style="padding: 2rem;">
        <van-button type="primary" @click="changeName">修改</van-button>
    </div>
</template>
<script setup>
    import { ref ,onMounted} from 'vue';
    import {showToast} from 'vant'

    import { useRouter } from 'vue-router';

    import {useStore} from 'vuex';
    import HTTP from '@/util/logoin';

    /* 图片格式转换 */
    import {base64ToBlob,blobToFile} from '@/util/getFile'
    /* 生成FormData */
    import getFormData from '@/util/getFormData'
    
    const avatar=ref('')
    const name=ref('')
    const userList=ref('')
    const store=useStore()
    const router =useRouter()
    
    /* 限制上传格式 */
    const beforeRead = (file) => {
      if (file.type !== 'image/jpeg') {
        showToast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    };

    const afterRead = async (file) => {
      // 此时可以自行将文件上传至服务器
      /* 修改头像 */
      console.log(file.file)
      userList.value.set("UserAvatar",file.file);
      userList.value.set("isAvatar",true);

      await HTTP({
        url:`/users/update/${store.state.userId}`,
        data:userList.value,
        method:'put',
        headers:{
          "Content-Type": "multipart/form-data"
        }
      }).then(res=>{
        avatar.value=`http://localhost:3000${res.data.url}`
      }).catch(error=>{
        console.log(error)
      })
      router.push('/center')
    }

    const changeName=async ()=>{
      /* 修改名字 */
      userList.value.set("UserName",name.value);
      await HTTP({
        url:`/users/update/${store.state.userId}`,
        data:userList.value,
        method:'put',
        headers:{
          "Content-Type": "multipart/form-data"
        }
      }).then(res=>{
        name.value=res.data.userList.UserName
        router.push('/center')
      }).catch(error=>{
        console.log(error)
      })
    }

    onMounted(() => {
      store.dispatch('getUserList').then(res=>{
      userList.value= getFormData(res.data.users[0])
      console.log(res.data.users[0])
      res.data.users[0].UserName?name.value= res.data.users[0].UserName:name.value= res.data.users[0].UserPhone
    })
    })

</script>