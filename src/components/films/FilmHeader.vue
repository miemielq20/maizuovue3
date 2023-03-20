<template>
    <div style="width: 100%">
      <ul>
          <router-link to="/films/nowplaying" custom v-slot='{navigate,isActive}'>
            <li @click="navigate">
              <span :class="isActive?'hotActive':''" >正在热映</span>
            </li>
          </router-link>

          <router-link to="/films/comingsoon" custom v-slot='{navigate,isActive}'>
            <li @click="navigate">
              <span :class="isActive?'hotActive':''">即将上映</span>
              </li>
          </router-link>
      </ul>
    </div>
</template>
<style lang="scss" scoped>
  .hotActive{
    color: #ff5f16;
    border-bottom: 2px #ff5f16 solid;
  }
  ul{
    width: 100%;
    display: flex;
    height: 6.125rem;
    list-style:none;
    position: static;
    top: 0;
    z-index: 30000;
    background: white;
    li{
      flex: 1;
      text-align: center;
      line-height: 6.125rem;
      span{
        display:inline-block;
        height: 6.125rem;
        box-sizing: border-box;
      }
    }
  }
</style>
