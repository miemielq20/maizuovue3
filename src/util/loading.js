import { showLoadingToast,allowMultipleToast,closeToast  } from 'vant';
allowMultipleToast()

function toast1 (){
    const toast1= showLoadingToast({
        message: '加载中...',
        loadingType :'spinner',
        forbidClick: true,
        duration: 0,
        teleport:'.list',
        className:'loading'
      })
      return toast1
}

function toast2(){
    const toast2= showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    
    return toast2
}

export {toast1,toast2}