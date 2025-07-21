<script setup lang="ts">
import IconHistory from '@/components/Icons/IconHistory/index.vue'
import IconHome from '@/components/Icons/IconHome/index.vue'
import IconChat from '@/components/Icons/IconChat/index.vue'
import IconMine from '@/components/Icons/IconMine/index.vue'
import type { IObject } from '@/01-kk-system/allHttp/types/common'
import { useChatStore } from '@/store/modules/chat'

defineOptions({
  name: 'KKTabbar',
})

defineProps({
  activeName: String,
})

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const active = ref('home')
// const topBorderRef = ref()
// const { width } = useElementSize(topBorderRef)

const Tabbars = [
  {
    label: '首页',
    icon: IconHome,
    name: 'home',
    path: '/home',
  },
  {
    label: '优惠',
    icon: IconHistory,
    name: 'activity',
    path: '/activity',
  },
  {
    label: '客服',
    icon: IconChat,
    name: 'chat',
  },
  // {
  //   label: '体育',
  //   icon: IconSports,
  //   name: 'sport',
  //   path: '/recharge',
  // },
  {
    label: '我的',
    icon: IconMine,
    name: 'mine',
    path: '/mine',
  },
]

const currPath = computed(() => route.path)

watch(() => currPath.value, () => {
  const target = Tabbars.find(item => item.path === currPath.value)
  switchTab(target)
}, { immediate: true })

function onClickChat() {
  chatStore.openChat()
}
function onClickTab(name: any) {
  const target = Tabbars.find(item => item.name === name)
  switchTab(target)
}

function switchTab(target: IObject) {
  switch (target?.name) {
    case 'chat':
      onClickChat()
      break
    default:
      active.value = target?.name ?? ''
      if (target?.path) {
        router.push(target.path)
      }
      break
  }
}
</script>

<template>
  <van-tabbar v-model="active" class="kk-tabbar-class" @change="onClickTab">
    <van-tabbar-item v-for="(tabbar, i) in Tabbars" :key="i" :name="tabbar.name">
      <span>{{ tabbar.label }}</span>
      <template #icon="props">
        <component
          :is="tabbar.icon"
          :key="tabbar.name"
          :active="props.active"
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="less" scoped>
.kk-tabbar-class {
  --van-tabbar-background: #fafafa;
  --van-tabbar-item-active-background: #fafafa;
  --van-tabbar-item-text-color: #000000;
  --van-tabbar-item-active-color: #597ef7;
}

.tabbar-container {
  --duration: 0.7s;
  --tabbar-bg: #fafafa;
  box-shadow:
    0 -0.027rem 0.053rem 0 rgba(0, 0, 0, 0.05),
    inset 0 0.027rem 0.027rem 0 #fff;
  position: relative;
  background: var(--tabbar-bg);
}
.tabbar-container span {
  font-size: 12px;
}
.tabbar-item {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 1px;
  transition: transform var(--duration);
  z-index: 10;
}
.tabbar-icon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.tabbar-icon,
.tabbar-icon::before {
  transition:
    background-color var(--duration),
    transform var(--duration);
}
.tabbar-icon.active {
  transform: translate3d(0, -4px, 0);
}
.activecolor {
  color: #597ef7;
}
.tabbar_border {
  left: 0;
  bottom: 99%;
  width: calc(100vw / 5);
  height: 14px;
  position: absolute;
  clip-path: url(#menu);
  will-change: transform;
  background-color: var(--tabbar-bg);
  transition: transform var(--timeOut, var(--duration));
}
.svg-container {
  width: 0;
  height: 0;
}
html.dark .tabbar-container {
  --tabbar-bg: #31303a;
  box-shadow: inset 0 0.027rem 0 0 #413f4d;
}
</style>
