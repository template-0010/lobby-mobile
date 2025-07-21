<!-- setup 无法设置组件名称，组件名称keepAlive必须 -->
<script setup lang="ts">
defineOptions({
  name: 'PageDownload',
})

function downloadIos() {
  window.location.href = 'itms-services://?action=download-manifest&url=https://www.kkgaming.org/app/manifest-o.plist'
}
</script>

<template>
  <div class="max-600px mx-auto min-h-screen pt-30">
    <div class="flex flex-col items-center justify-center gap-3">
      <img class="h-20 w-20 overflow-hidden rounded-4" src="https://www.kkgaming.org/app/icon/512.png" alt="logo">
      <!-- <a class="rounded-2 bg-blue-500 px-4 py-2 text-4 text-white" href="itms-services://?action=download-manifest&url=https://www.kkgaming.org/app/KK_Game.plist">Ios 下载</a> -->
      <!-- <a class="rounded-2 bg-blue-500 px-4 py-2 text-4 text-white" href="itms-services://?action=download-manifest&url=">Ios 下载</a> -->
      <a class="rounded-2 bg-blue-500 px-4 py-2 text-4 text-white" @click="downloadIos">Ios 下载</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
