<script setup lang="ts">
import Header from './components/Header/index.vue'
import ToolView from './components/ToolView/index.vue'
import { noticeHttp } from '@/01-kk-system/allHttp/userHall/notice'
import useUserStore from '@/store/modules/user'
import { useGameStore } from '@/store/modules/game'
import { translateTextBy } from '@/utils/i18n'
import { localImg } from '@/01-kk-system/allUtils/utils'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import type { IObject } from '@/01-kk-system/allHttp/types/common'
import useIframeOpenFunc from '@/04-kk-component-mobile/hooks/useIframeOpenFunc'
import SubgameCard from '@/pages/subgameLobby/components/SubgameCard.vue'
import useAppStore from '@/store/modules/app'

defineOptions({
  name: 'Home',
})

const banners = ref<string[]>([])

// const chatStore = useChatStore()
const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()
const appStore = useAppStore()
const designSettingStore = useDesignSettingStore()
const { onClickOuterGame, onClickOuterSubGame } = useIframeOpenFunc()

const noticeTitleList = ref<string[]>([])
const lotteryList = ref<Record<string, any>[]>([])
const activeMenu = ref<IObject>({
  name: 'slot',
})
const currentList = ref([])
const gameListDomStatus = ref(true)

const noticeColor = computed(() => {
  return designSettingStore.darkMode === 'dark'
    ? {
        background: '#232229',
        color: '#eeeeee',
      }
    : {
        background: '#ffffff',
        color: '#333333',
      }
})

const Menus = computed(() => {
  const groupList = gameStore.allGroups || []
  return [
    ...groupList,
    {
      title: translateTextBy('web.i18nFront.title.egame'),
      i18nTitle: 'egame',
      name: 'slot',
      subTitle: 'slots',
      cardBg: localImg('images/home/icon-text-slot.png'),
      cardImg: localImg('images/home/img_slot.png'),
      image: localImg('images/home/icon_egame.png'),
      type: 'outerGame',
      nameKey: 'outerGamerName',
      data: gameStore.allSubGameEntrance?.egame || [],
      click: (game: IObject) => {
        gameStore.currentEntrance = game
        router.push({ path: '/subgame-lobby', query: { outerGamerID: game.outerGamerID } })
      },
    },
    {
      title: translateTextBy('web.i18nFront.title.fish'),
      i18nTitle: 'fish',
      subTitle: 'fish',
      name: 'fish',
      cardBg: localImg('images/home/icon-text-fish.png'),
      cardImg: localImg('images/home/img_fish.png'),
      image: localImg('images/home/icon_fish.png'),
      type: 'outerGame',
      nameKey: 'outerGamerName',
      data: gameStore.allSubGameEntrance?.fish || [],
      click: (game: IObject) => {
        gameStore.currentEntrance = game
        router.push({ path: '/subgame-lobby', query: { outerGamerID: game.outerGamerID } })
      },
    },
    {
      title: translateTextBy('web.i18nFront.title.lottery'),
      i18nTitle: 'lottery',
      name: 'lottery',
      subTitle: 'Lottery',
      cardBg: localImg('images/home/icon-text-lottery.png'),
      cardImg: localImg('images/home/img_lottery.png'),
      image: localImg('images/home/icon-lottery.png'),
      showMore: true,
      type: 'lottery',
      data: lotteryList.value,
      click: (game?: IObject) => {
        gameStore.currentEntrance = game
        router.push({ path: '/game-lobby' })
      },
    },
    {
      title: translateTextBy('web.i18nFront.title.sports'),
      i18nTitle: 'sports',
      subTitle: 'sports',
      name: 'sports',
      cardBg: localImg('images/home/icon-text-sport.png'),
      cardImg: localImg('images/home/img_sport.png'),
      image: localImg('images/home/icon_sport.png'),
      type: 'outerGame',
      nameKey: 'outerGamerName',
      data: gameStore.sportGameList,
      click: onClickOuterGame,
    },
    {
      title: translateTextBy('web.i18nFront.title.realbet'),
      i18nTitle: 'realbet',
      subTitle: 'realbet',
      name: 'realbet',
      cardBg: localImg('images/home/icon-text-live.png'),
      cardImg: localImg('images/home/img_live.png'),
      image: localImg('images/home/icon_live.png'),
      type: 'outerGame',
      nameKey: 'outerGamerName',
      data: gameStore.liveGameList,
      click: onClickOuterGame,
    },
    {
      title: translateTextBy('web.i18nFront.title.chess'),
      i18nTitle: 'chess',
      subTitle: 'BOARD',
      name: 'chess',
      cardBg: localImg('images/home/icon-text-chess.png'),
      cardImg: localImg('images/home/img_chess.png'),
      image: localImg('images/home/icon_chess.png'),
      type: 'outerGame',
      nameKey: 'outerGamerName',
      data: gameStore.chessGameList,
      click: onClickOuterGame,
    },
  ]
})

watch(() => activeMenu.value.name, (oldVal, newVal) => {
  console.log(newVal, oldVal)
  if (newVal !== oldVal) {
    gameListDomStatus.value = false
    setTimeout(() => {
      gameListDomStatus.value = true
    }, 0)
  }
})

async function getNoticeList() {
  const res = await noticeHttp.getAllList('3').catch(() => null)
  const { code, data } = res || {}
  if (code === '0') {
    const list = [];
    (data || []).forEach((item) => {
      list.push(item.title)
    })
    noticeTitleList.value = list
  }
}

async function getFullGames() {
  const list = (await gameStore.getFullSeries()) as unknown as Record<
    string,
    any
  >[]
  lotteryList.value = list.map((game) => {
    const { lottoClassify, country } = game
    const cty = country?.toLowerCase()
    if (lottoClassify && cty) {
      game.icon = localImg(`custom-images/lottery-icon/${cty}-${lottoClassify}.png`)
    }
    return game
  })
}

function getGameImg(game: IObject) {
  if (game?.lottoClassify) {
    const { lottoClassify, country } = game
    const cty = country?.toLowerCase()
    if (lottoClassify && cty) {
      return localImg(`custom-images/lottery-icon/${cty}-${lottoClassify}.png`)
    }
    else {
      return localImg('images/home/img_lottery.png')
    }
  }
  else {
    const { contentCategory, outerGamerID } = game
    if (contentCategory && outerGamerID) {
      return localImg(`custom-images/outer-g-icon/${contentCategory}-${outerGamerID}.png`)
    }
  }
}

function onClickMenu(item: any) {
  activeMenu.value = item
  currentList.value = item.data
}

async function init() {
  getNoticeList()
  getFullGames()
  userStore.getUserBanlance()
  await Promise.allSettled([gameStore.getAvailableOuterGames(), gameStore.getAvailableOuterSubGamesEntry()])
  onClickMenu(Menus.value[0])
}

function onClickGameCard(game: IObject) {
  if (activeMenu.value?.click) {
    activeMenu.value?.click(game)
  }
  else {
    console.log('--0--', game)
  }
}

function initBanner() {
  appStore.getAppBanners().then((res) => {
    banners.value = res
  })
}

onBeforeMount(() => {
  initBanner()
  init()
})
</script>

<template>
  <div class="h-full flex flex-col overflow-auto color-#ffffff">
    <div>
      <van-sticky>
        <Header />
      </van-sticky>
      <div class="swiper-container pb-3">
        <van-swipe :autoplay="30000" lazy-render class="mx-4 min-h-138px">
          <van-swipe-item v-for="banner in banners" :key="banner" class="rounded-2">
            <div class="h-138px overflow-hidden rounded-3">
              <img class="object-fit h-full w-full" :src="banner">
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div id="kk-tab-bar" class="w-full">
        <van-notice-bar :color="noticeColor.color" :background="noticeColor.background">
          <template #left-icon>
            <div class="w-10 flex-center">
              <van-icon color="var(--primary-color)" size="20" name="volume-o" />
            </div>
          </template>
          <div v-if="noticeTitleList.length > 0" class="flex items-center gap-5">
            <span
              v-for="(text, i) in noticeTitleList" :key="i" class="pr-20"
              :style="{ paddingRight: i === noticeTitleList.length - 1 ? '0' : '' }"
            >{{ text }}</span>
          </div>
        </van-notice-bar>
      </div>
      <ToolView />
    </div>
    <div class="h-0 flex flex-1 flex-col overflow-hidden">
      <div class="flex flex-1 overflow-hidden">
        <div class="h-full overflow-auto px-[3.589744vw] pt-1 text-[3.076923vw]">
          <div
            v-for="(menu, index) in Menus"
            :key="index"
            class="left-menu-card"
            :class="{ menuactive: activeMenu.name === menu.name }" @click="onClickMenu(menu)"
          >
            <img class="menu-card-item" :src="menu.image" alt="">
            <span>{{ menu.title }}</span>
          </div>
          <div class="h-6" />
        </div>
        <div class="h-full flex-1 overflow-auto">
          <div v-if="gameListDomStatus && currentList.length" class="game-list init-animation">
            <template v-if="activeMenu.isGrooup">
              <div class="grid grid-cols-3 h-full w-full flex-wrap color-black">
                <SubgameCard v-for="(item, i) in currentList" :key="`${i}-subgame`" :collected-ids="[]" :game="item" :show-collection="false" @click-game="onClickOuterSubGame" />
              </div>
            </template>
            <template v-else>
              <div
                v-for="(game, idx) in currentList" :key="`${idx}game`" class="game-list-card"
                @click="onClickGameCard(game)"
              >
                <img class="card-text-bg" :src="activeMenu.cardBg" alt="">
                <div
                  class="game-card-body"
                  :style="{ backgroundImage: `url(${getGameImg(game) || activeMenu.cardImg})` }"
                >
                  <div class="game-info">
                    <div class="title">
                      {{ game.outerGamerName || game.name }}
                    </div>
                    <div class="sub-title">
                      {{ activeMenu.subTitle }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <div class="h-6" />
          </div>
          <van-empty v-else image-size="100" :description="$t('web.i18nFront.hint.noData')" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@tabbar-height: 80px;
@banner-height: 200px;
@top-offset: 20px;

.box-content {
  position: absolute;
  top: @banner-height - @top-offset;
  bottom: @tabbar-height;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.swiper-container {
  background: #ffffff;
}

html.dark .swiper-container {
  background: #1a1a1a;
}

.fixed-class {
  position: fixed;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
}

:deep(.fixed-class .van-tabs) {
  height: 100%;
}

:deep(.van-tabs__content) {
  overflow-x: hidden;
}

:deep(.fixed-class .van-tabs__content) {
  height: calc(100% - 74px);
  overflow: auto;
}

:deep(.fixed-class .van-tab__panel) {
  height: 100%;
}

.tab-body {
  background: var(--van-gray-1);
}

html.dark .tab-body {
  background: #1a1a1a;
}

.left-menu-card {
  position: relative;
  align-items: center;
  background-size: 100% 100%;
  flex-shrink: 0;
  width: 9.871795vw;
  height: 13.076923vw;
  border-radius: 2.051282vw;
  background-repeat: no-repeat;
  color: #7981a4;
  width: 11.282051vw;
  height: 13.333333vw;
  margin-bottom: 1.538462vw;
  padding: 0.512821vw 1.794872vw 2.051282vw;
  background-image: url(@/assets/images/home/tab-bg.png);
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.left-menu-card span {
  font-weight: 400;
  font-size: 2.820513vw;
  line-height: 3.076923vw;
  text-align: center;
}

.menu-card-item {
  width: 7.692308vw;
  height: 7.692308vw;
  object-fit: contain;
}

.left-menu-card.menuactive {
  color: #ffffff;
  animation: menuactiveani 0.3s ease;
  background-image: url(@/assets/images/home/active-tab-bg.png);
}

@keyframes menuactiveani {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.game-list {
  margin: 4px 0 0 0;
}

.game-list-card {
  height: 28.717949vw;
  position: relative;
  background: #f7f9ff;
  margin-bottom: 3.076923vw;
  background-image: url(@/assets/images/home/game-list-card-bg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 12px;
  width: 78.487179vw;
  box-shadow: 0 1.025641vw 2.051282vw 0 rgba(50, 79, 129, 0.1);
  background-color: initial;
  padding-bottom: 0.512821vw;
  overflow: hidden;
}

.game-card-body {
  position: relative;
  width: 100%;
  height: 100%;
  background-position: 100% 0;
  background-size: 53.846154vw 40.512821vw;
  background-repeat: no-repeat;
  cursor: inherit;
}

.game-card-body .game-info {
  position: absolute;
  top: 3.076923vw;
  width: 38.461538vw;
  left: 5.128205vw;
  font-size: 3.076923vw;
}

.game-card-body .title {
  font-size: 4.102564vw;
  font-weight: 600;
  color: #303442;
  font-family: PingFang SC;
}

.game-card-body .sub-title {
  font-weight: 500;
  font-size: 2.051282vw;
  color: #949ab6;
  font-family: PingFang SC;
  width: 25.641026vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 26.153846vw;
  color: #7981a4;
  text-transform: uppercase;
}

.card-text-bg {
  position: absolute;
  bottom: 5.128205vw;
  left: 5.128205vw;
  width: 75.641026vw;
  height: 19.487179vw;
}

.init-animation {
  animation: initanimation 0.3s ease;
}

@keyframes initanimation {
  0% {
    transform: translate3d(0, 10%, 0);
  }

  100% {
    transform: translateZ(0);
  }
}
</style>
