<script setup lang="ts">
// import Tabbar from './components/Tabbar/index.vue'
// import type { IObject } from '@/01-kk-system/allHttp/types/common'
// import { useChatStore } from '@/store/modules/chat'

defineOptions({
  name: 'Layout',
})
// const active = ref('home')

// const chatStore = useChatStore()
// const router = useRouter()

// function onClickChat() {
//   chatStore.openChat()
// }

// function onClickTab(tab: IObject) {
//   switch (tab.name) {
//     case 'chat':
//       onClickChat()
//       break
//     default:
//       active.value = tab.name
//       router.push(tab.path)
//       break
//   }
// }
</script>

<template>
  <!-- <div class="h-full flex flex-col"> -->
  <div class="flex-1 overflow-hidden bg-#eef2fe">
    <router-view v-slot="{ Component, route }">
      <transition name="zoom-fade" mode="out-in" appear>
        <component :is="Component" :key="route.name" />
      </transition>
    </router-view>
    <!-- </div> -->
    <!-- <div class="h-44px">
      <keep-alive>
        <Tabbar :active-name="active" @on-click-tab="onClickTab" />
      </keep-alive>
    </div> -->
  </div>
</template>

<style lang="scss" scoped></style>
