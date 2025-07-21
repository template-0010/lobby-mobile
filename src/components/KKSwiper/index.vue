<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import './kkSwiper.less'
import { Navigation } from 'swiper/modules'
import type { IObject } from '@/01-kk-system/allHttp/types/common'
import { translateTextBy } from '@/utils/i18n'

defineOptions({
  name: 'KKSwiper',
})

const props = withDefaults(defineProps<{
  swiperList: IObject[]
  title?: string
  description?: string
  swiperWidth?: string
  showNav?: boolean
  classKey?: string
}>(), {
  description: translateTextBy('web.i18nFront.label.seeMore'),
  swiperList: () => [],
  showNav: false,
  classKey: '01',
})

const emit = defineEmits<{
  onClickRight: [void]
}>()

const swiperDom = shallowRef<any>()
const navigation = ref({
  nextEl: `.swiper-btn-next-${props.classKey}`,
  prevEl: `.swiper-btn-prev-${props.classKey}`,
})

function onSwiper(swiper: any) {
  swiperDom.value = swiper
}

// function onNext() {
//   if (swiperDom.value) {
//     swiperDom.value?.sliderNext()
//   }
// }
// function onPre() {
//   if (swiperDom.value) {
//     swiperDom.value?.sliderPre()
//   }
// }
</script>

<template>
  <div class="kk-swiper-c">
    <div v-if="title" class="kk-swiper-title relative mx-2 flex items-center justify-between pl-2 color-[var(--kk-count-down-text-color)]">
      <div class="title py-2 text-base font-600">
        {{ title }}
      </div>
      <div class="title-right flex items-center gap-1 text-12px" @click="emit('onClickRight')">
        <span>{{ description }}</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="relative">
      <Swiper
        slides-per-view="auto"
        :modules="[Navigation]"
        :navigation="showNav ? navigation : undefined"
        :space-between="0"
        :class="`kkSwiper-${classKey}`"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="(game, index) in swiperList" :key="index" :style="{ width: swiperWidth }">
          <slot :item-data="game" :index="index" />
        </SwiperSlide>
      </Swiper>
      <div v-if="showNav" :class="`swiper-btn-next-${classKey} navigation-btns -right-18px`">
        <van-icon name="arrow" />
      </div>
      <div v-if="showNav" :class="`swiper-btn-prev-${classKey} navigation-btns -left-18px`">
        <van-icon name="arrow-left" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.kk-swiper-title::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 4px;
  height: 13px;
  background: var(--primary-color);
  border-radius: 4px;
}
.navigation-btns {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #000000;
}
html.dark .navigation-btns {
  color: #ffffff;
}
</style>
