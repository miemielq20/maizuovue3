<template>
      <ul class="cinemas-list" v-if="isShow">
        <li v-for="data in props.list" :key="data.cinemaId" class="cinemas-list-item">
          <div class="info-lf">
            <div class="name">{{ data.name }}</div>
            <div class="address">{{ data.address }}</div>
          </div>
          <div class="info-rt">
            <div class="price">
              ￥ {{ Number(data.lowPrice) / 100 }} <span class="text">起</span>
            </div>
            <div class="far">距离未知</div>
          </div>
        </li>
      </ul>
</template>
<style lang="scss" scoped>
.cinemas-list {
    width: 100%;

    .cinemas-list-item {
      background: white;
      padding: 1.875rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .info-lf {
        width: 33.125rem;
        overflow: hidden;
        background: red($color: #000000);
        display: flex;
        flex-direction: column;
        padding-right: 1.875rem;

        .name {
          font-size: 1.875rem;
          padding-top: 0.625rem;
          height: 2.5rem;
          overflow: hidden;
        }

        .address {
          padding-top: 0.625rem;
          font-size: 1.5rem;
          color: #797d82;
          height: 1.7 rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .info-rt {
        width: 8.75rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .price {
          color: #ff5f16;
          font-size: 1.875rem;
          padding-top: 0.625rem;

          .text {
            font-size: 1.7rem;
          }
        }

        .far {
          font-size: 1.625rem;
          color: #797d82;
          padding-top: 0.625rem;
        }
      }
    }
  }
</style>

<script setup>
import {defineProps} from 'vue'

const props=defineProps({
  list: {
            type: Object
        },
  isShow: {
            type: Boolean,
            default: true
        }     
})
</script>
