<script setup lang="ts">
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { toRefs } from 'vue'

const { userInfo } = toRefs(useSystemStore())

defineProps({
  item: {
    type: Object,
    required: true
  }
})

const handleFindHe = () => {
  console.log('找到他')
}
</script>

<template>
  <div class="message-avatar">
    <n-popover trigger="click" raw :show-arrow="false">
      <template #trigger>
        <img :src="item.avatar" alt="头像" />
      </template>
      <div class="message-avatar__info-card">
        <!-- 头像 -->
        <div class="card__avatar">
          <img :src="item.avatar" alt="头像" />
          <div class="card__avatar__name">
            <div>{{ userInfo.userName }}</div>
            <n-tag type="primary">在线</n-tag>
          </div>
        </div>
        <n-divider />
        <n-button type="primary" size="small" ghost @click="handleFindHe">找到他</n-button>
      </div>
    </n-popover>
  </div>
</template>

<style lang="scss" scoped>
.message-avatar {
  margin: 0 10px;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &__info-card {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    padding: 24px;
    background-color: #fff;
  }
}

.card__avatar {
  height: 60px;
  width: auto;
  display: flex;

  img {
    height: 100%;
    width: 60px;
    border-radius: 10px;
    margin-right: 20px;
  }

  &__name {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
