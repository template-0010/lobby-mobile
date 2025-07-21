<script setup lang="ts">
import { showLoadingToast } from 'vant'
import SubgameCard from './components/SubgameCard.vue'
import useIframeOpenFunc from '@/04-kk-component-mobile/hooks/useIframeOpenFunc'
import { useGameStore } from '@/store/modules/game'
import type { IObject } from '@/01-kk-system/allHttp/types/common'
import { LOCAL_FAVORITE_GAMES } from '@/01-kk-system/allDefine/common/const'
import { outerGameHttp } from '@/01-kk-system/allHttp/userHall/games'

defineOptions({
  name: 'SubgameLobbyPage',
})

const router = useRouter()
const route = useRoute()
const gameStore = useGameStore()
const { onClickOuterSubGame } = useIframeOpenFunc()

const gameList = ref<Record<string, any>[]>([])
const currentEntrance = ref<IObject>({})
const activeName = ref('all')
const showSearch = ref(false)
const searchValue = ref('')
const searchGameList = ref<Record<string, any>[]>([])
const searchLoading = ref(false)

function useLocalCollection() {
  const favoriteGames = ref<IObject[]>([])

  const getLocalCollections = () => {
    const locals = localStorage.getItem(LOCAL_FAVORITE_GAMES)
    if (locals) {
      favoriteGames.value = JSON.parse(locals)
    }
  }

  const setLocalCollections = (game: any) => {
    if (favoriteGames.value.length <= 0) {
      getLocalCollections()
    }
    // const newGameKey = `${contentCategory}-${}-${contentCategory}`
    const isIn = favoriteGames.value.some(item => item.subgameCode === game.subgameCode)
    let newList: IObject[] = []
    if (isIn) {
      newList = favoriteGames.value.filter(item => item.subgameCode !== game.subgameCode)
    }
    else {
      newList = [game, ...favoriteGames.value]
    }
    favoriteGames.value = newList
    localStorage.setItem(LOCAL_FAVORITE_GAMES, JSON.stringify(newList))
  }

  return {
    getLocalCollections,
    setLocalCollections,
    favoriteGames,
  }
}

const { favoriteGames, getLocalCollections, setLocalCollections } = useLocalCollection()

const title = computed(() => currentEntrance.value.outerGamerName)

const collectGameCodeList = computed<string[]>(() => favoriteGames.value.map(game => game.subgameCode))

function onGoBack() {
  router.replace('/')
}

async function init() {
  const toast = showLoadingToast({
    duration: 0,
    forbidClick: true,
  })
  await onRefresh()
  toast.close()
}

onBeforeMount(() => {
  if (route.query?.outerGamerID === gameStore.currentEntrance?.outerGamerID) {
    currentEntrance.value = gameStore.currentEntrance
    init()
  }
  getLocalCollections()
})

const refreshing = ref(false)
const loading = ref(false)
const finished = ref(true)
const pageSize = 20
let currentPage = 1

async function onRefresh() {
  if (loading.value) {
    return false
  }
  currentPage = 1
  refreshing.value = true
  await onLoad()
}

function onSearch() {
  console.log('onSearch', searchValue.value)
  if (!searchValue.value) {
    return false
  }
  currentPage = 1
  onSearchGame()
}

function onCancel() {
  console.log('onCancel')
  searchValue.value = ''
}

function onCloseSearch() {
  showSearch.value = false
  searchGameList.value = []
}

async function onSearchGame() {
  try {
    searchLoading.value = true
    const { outerGamerAgentCode, outerGamerID, contentCategory } = currentEntrance.value || {}
    const params = {
      outerGamerAgentCode,
      outerGamerID,
      contentCategory,
      current: currentPage,
      size: 100,
    }
    const finalParams = searchValue.value ? { ...params, subgameDes: searchValue.value } : params
    const { code, data } = await outerGameHttp.fetchSubGamePage(finalParams)
    if (code === '0') {
      const { recordList } = data || {}
      searchGameList.value = recordList ?? []
    }
    else {
      finished.value = true
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    searchLoading.value = false
  }
}

async function onLoad() {
  try {
    loading.value = true
    const { outerGamerAgentCode, outerGamerID, contentCategory } = currentEntrance.value || {}
    const params = {
      outerGamerAgentCode,
      outerGamerID,
      contentCategory,
      current: currentPage,
      size: pageSize,
    }
    const { code, data } = await outerGameHttp.fetchSubGamePage(params)
    if (code === '0') {
      const { recordList, pages, current } = data || {}
      if (current < +pages) {
        currentPage++
        finished.value = false
      }
      else {
        finished.value = true
      }
      if (+current === 1) {
        gameList.value = recordList
      }
      else {
        gameList.value = [...gameList.value, ...recordList]
      }
    }
    else {
      finished.value = true
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    refreshing.value = false
    loading.value = false
  }
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <TopNav :title="title || $t('web.i18nFront.label.lobby')" @click-left="onGoBack">
      <template #right>
        <van-icon name="search" size="18" @click="showSearch = true" />
      </template>
    </TopNav>
    <van-tabs v-model:active="activeName">
      <van-tab class="h-full" title="全部" name="all">
        <div id="list-body-id" class="list-body h-full overflow-hidden overflow-y-scroll">
          <van-pull-refresh v-model="refreshing" class="h-full !overflow-y-scroll" @refresh="onRefresh">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              class="min-h-full"
              :finished-text="$t('web.i18nFront.hint.noMore')"
              @load="onLoad"
            >
              <template v-if="gameList.length <= 0 && !loading">
                <van-empty class="mx-auto" image-size="100" />
              </template>
              <template v-else>
                <div class="grid grid-cols-4 flex-wrap">
                  <SubgameCard v-for="(item, i) in gameList" :key="`${i}-subgame`" :collected-ids="collectGameCodeList" :game="item" @click-game="onClickOuterSubGame" @on-collect="setLocalCollections" />
                </div>
              </template>
            </van-list>
            <div class="h-22" />
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab class="h-full" :title="$t('web.i18nFront.label.collect')" name="collection">
        <div class="list-body h-full overflow-hidden overflow-y-scroll">
          <template v-if="favoriteGames.length <= 0 && !loading">
            <van-empty class="mx-auto" image-size="100" :description="$t('web.i18nFront.hint.noData')" />
          </template>
          <template v-else>
            <div class="grid grid-cols-4 flex-wrap">
              <SubgameCard v-for="(item, i) in favoriteGames" :key="`${i}-collected`" :collected-ids="collectGameCodeList" :game="item" @click-game="onClickOuterSubGame" @on-collect="setLocalCollections" />
            </div>
          </template>
        </div>
      </van-tab>
    </van-tabs>
    <van-popup
      v-model:show="showSearch"
      position="bottom"
      :style="{ height: '100%' }"
      safe-area-inset-top
      safe-area-inset-bottom
    >
      <div class="h-full flex flex-col">
        <van-search
          v-model="searchValue"
          show-action
          :placeholder="$t('system.i18nSystem.placeholder.inputGame')"
          @cancel="onCancel"
        >
          <template #action>
            <div @click="onSearch">
              {{ $t('system.i18nSystem.opration.search') }}
            </div>
          </template>
        </van-search>
        <div v-loading="searchLoading" class="mx-3 flex-1 overflow-x-hidden overflow-y-scroll">
          <div v-if="searchLoading" class="mt-10 flex-center">
            <van-loading type="spinner" />
          </div>
          <template v-if="searchGameList.length <= 0 && !searchLoading">
            <van-empty class="mx-auto" image-size="100" />
          </template>
          <template v-else>
            <div class="grid grid-cols-4 flex-wrap">
              <SubgameCard v-for="(item, i) in searchGameList" :key="`${i}-subgame`" :collected-ids="collectGameCodeList" :game="item" @click-game="onClickOuterSubGame" @on-collect="setLocalCollections" />
            </div>
          </template>
          <div class="h-6" />
        </div>
        <div class="mx-3 h-54px flex-center">
          <van-button round block size="small" type="primary" @click="onCloseSearch">
            {{ $t('system.i18nSystem.opration.cancel') }}
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style lang="less" scoped>
.list-body {
  padding: 0 3.589744vw 0;
}
:deep(.van-tabs__content) {
  height: calc(100vh - 90px);
}
</style>
