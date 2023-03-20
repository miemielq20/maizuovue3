//滑轮条自定义指令
const vScrollDirective = {
    mounted:(el,binding,vnode)=>{
      window.onscroll=()=>{
        if ((document.body.scrollTop || document.documentElement.scrollTop) > binding.value.time) {
          binding.value.getTrue()
        } else {
          binding.value.getFalse()
        }
      }
    },

    unbind:()=>{
      window.onscroll=null
    }
   }

   export default vScrollDirective