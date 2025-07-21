<script setup lang="ts">
import type { IObject } from '@/01-kk-system/allHttp/types/common'
import { localImg } from '@/01-kk-system/allUtils/utils'
import collection from '@/assets/images/games/icon-collect.png'
import collected from '@/assets/images/games/icon-collected.png'

defineOptions({
  name: 'SubgameCard',
})

defineProps({
  game: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  collectedIds: {
    type: Array,
    required: true,
    default: () => ([]),
  },
  showCollection: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emit = defineEmits(['clickGame', 'onCollect'])

const contentCategoryObj = {
  1001: 'lottery',
  1002: 'chess',
  1003: 'slot',
  1004: 'fish',
  1005: 'live',
  1006: 'sport',
  1007: 'vSport',
  1008: 'eSport',
}

function getImage(game: IObject) {
  const { outerGamerID, subgameCode, contentCategory } = game || {}
  if (contentCategoryObj[contentCategory]) {
    const path = `${contentCategoryObj[contentCategory]}-subgame`
    const subCode = subgameCode?.toLowerCase()
    const imagepath = localImg(`custom-images/${path}/${outerGamerID}-${subCode}.jpg`)
    if (imagepath.includes('undefined')) {
      return localImg(`custom-images/${path}/${outerGamerID}-${subCode}.png`)
    }
    else {
      return imagepath
    }
  }
}
</script>

<template>
  <div class="keep-game-card" @click="emit('clickGame', game)">
    <div class="card-top bg-red">
      <img class="h-full w-full object-cover" :src="getImage(game)" alt="">
    </div>
    <div class="card-bottom">
      <span class="text-overflow text-12px">{{ game.subgameDes }}</span>
      <div v-if="showCollection" class="collection-idon flex-center" @click.stop="emit('onCollect', game)">
        <img class="h-[5vw] w-[5vw] object-contain" :src="collectedIds.includes(game.subgameCode) ? collected : collection" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@kk-card-width: calc((100vw - 4.051282vw - 3.589744vw * 2) / 4);

.keep-game-card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: @kk-card-width;
  height: calc(@kk-card-width + 12.820513vw);
  margin-top: 2.564103vw;
  border-radius: 2.051282vw;
  background-color: #fff;
  box-shadow: 0 0.512821vw 2.051282vw 0 rgba(110, 106, 102, 0.1);
  overflow: hidden;
}
.card-top {
  width: 100%;
  height: @kk-card-width;
  // height: 26.666667vw;
  position: relative;
}
.card-bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.025641vw 2.564103vw;
  height: 12.820513vw;
}
.collection-idon {
  width: min(8vw, 40px);
  height: min(8vw, 40px);
  background-size: cover;
}
</style>
