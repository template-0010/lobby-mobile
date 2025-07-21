<script setup lang="ts">
defineOptions({
  name: 'TeamReportMenu',
})
</script>

<template>
  <div class="h-screen flex flex-col">
    <TopNav :title="$t('web.i18nFront.label.accountDetail')" />
    <div class="flex-1 overflow-auto">
      <van-cell :title="$t('web.i18nFront.label.teamM')" is-link to="/team-manage" />
      <van-cell :title="$t('web.i18nFront.label.teamSta')" is-link to="/team-statistics" />
      <van-cell :title="$t('web.i18nFront.label.teamProfit')" is-link to="/team-profit-report" />
      <van-cell :title="$t('web.i18nFront.label.teamAc')" is-link to="/team-money-change" />
      <van-cell :title="$t('web.i18nFront.label.teamLottery')" is-link to="/team-report-lottery" />
      <van-cell :title="$t('web.i18nFront.label.teamLotteryChess')" is-link to="/team-report-chase" />
      <van-cell :title="$t('web.i18nFront.label.teamOther')" is-link to="/team-report-other" />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
