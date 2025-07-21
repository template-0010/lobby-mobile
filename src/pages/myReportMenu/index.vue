<script setup lang="ts">
defineOptions({
  name: 'MyReportMenu',
})
</script>

<template>
  <div class="h-screen flex flex-col">
    <TopNav :title="$t('web.i18nFront.label.accountDetail')" />
    <div class="flex-1 overflow-auto">
      <van-cell :title="$t('web.i18nFront.label.personCompReport')" is-link to="/my-report-all" />
      <!-- <van-cell :title="$t('web.i18nFront.label.personGameReport')" is-link to="/my-report-game" /> -->
      <!-- <van-cell :title="$t('web.i18nFront.label.personLotteryReport')" is-link to="/my-report-lottery" />
      <van-cell :title="$t('web.i18nFront.label.personChaseReport')" is-link to="/my-report-chase" />
      <van-cell :title="$t('web.i18nFront.label.personOuterpReport')" is-link to="/my-report-other" /> -->
    </div>
  </div>
</template>

<style lang="less" scoped></style>
