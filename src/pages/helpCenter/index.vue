<script setup lang="ts">
import { useHelpCenter } from '@/04-kk-component-mobile/hooks/useHelpCenter'

defineOptions({
  name: 'HelpCenter',
})

const { groupedList, DetailData, showDetail, onClickRow } = useHelpCenter()
</script>

<template>
  <Container :title="$t('web.i18nFront.label.helpCenter')">
    <div class="kk-announcement-cell-group mx-3 h-full overflow-auto">
      <div v-for="(item, i) in groupedList" :key="i">
        <div class="mt-5 text-16px text-black font-bold">
          {{ item.title }}
        </div>
        <van-cell-group v-for="(child, j) in item.children" :key="j" class="mt-5 overflow-hidden rounded-lg">
          <van-cell
            icon="bullhorn-o"
            is-link
            class="kk-announcement-cell"
            center
            :title="child.title"
            :label="child.createTime"
            @click="onClickRow(child)"
          >
            <template #icon>
              <van-icon name="question-o" size="20" color="#1e283f" class="mr-2" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="h-10" />
    </div>
    <van-popup v-model:show="showDetail" style="--van-popup-background: #1e283f; height: 80%" round position="bottom">
      <div class="px-4 py-5">
        <div class="pb-4 text-16px text-white font-bold">
          {{ DetailData.title }}
        </div>
        <SafeRichText class="text-14px text-[#babfca] leading-loose" :content="DetailData.content" />
      </div>
    </van-popup>
  </Container>
</template>
