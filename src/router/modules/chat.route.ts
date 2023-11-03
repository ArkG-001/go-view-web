import { RouteRecordRaw } from 'vue-router'
import { ChartEnum, PageEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
  'PageEnum.BASE_CHAT': () => import('@/views/chat/index.vue'),
  'PageEnum.BASE_CHAT_ONLINE_NAME': () => import('@/views/chat/index.vue')
}

const chatRoutes: RouteRecordRaw = {
  path: PageEnum.BASE_CHAT,
  name: PageEnum.BASE_CHAT_NAME,
  component: importPath['PageEnum.BASE_CHAT'],
  redirect: PageEnum.BASE_CHAT_ONLINE,
  meta: {
    title: '好好说话',
    isRoot: true
  },
  children: [
    {
      path: PageEnum.BASE_CHAT_ONLINE,
      name: PageEnum.BASE_CHAT_ONLINE_NAME,
      component: importPath['PageEnum.BASE_CHAT_ONLINE_NAME'],
      meta: {
        title: '在线聊天'
      }
    }
  ]
}

export default chatRoutes
