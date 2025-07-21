<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { showToast } from 'vant'
import Header from './components/Header/index.vue'
import TitleCard from './components/TitleCard/index.vue'
import CellRow from './components/CellRow/index.vue'
import useUserStore from '@/store/modules/user'
import { localImg } from '@/01-kk-system/allUtils/utils'
import useIframeOpenFunc from '@/04-kk-component-mobile/hooks/useIframeOpenFunc'

defineOptions({
  name: 'Mine',
})

const userStore = useUserStore()
const router = useRouter()
const { t } = useI18n()
const { goToPayment } = useIframeOpenFunc()

const list = [
  {
    title: t('web.i18nFront.label.myPofile'),
    image: localImg('images/zl.png'),
    path: '/userInfo',
  },
  {
    title: t('web.i18nFront.label.myRewards'),
    image: localImg('images/fy.png'),
    path: '/my-rewards',
  },
  {
    title: t('web.i18nFront.label.reChargeWdR'),
    image: localImg('images/cqjl.png'),
    path: '',
  },
  {
    title: t('web.i18nFront.label.myReport'),
    image: localImg('images/grbb.png'),
    path: '/my-report-menu',
  },
  {
    title: t('web.i18nFront.label.accountDetail'),
    image: localImg('images/mx.png'),
    path: '/my-bill',
  },
  {
    title: t('web.i18nFront.label.agentShare'),
    image: localImg('images/tg.png'),
    path: '/open-account',
  },
  {
    title: t('web.i18nFront.label.agentReport'),
    image: localImg('images/dlbb.png'),
    path: '/team-report-menu',
  },
  {
    title: t('web.i18nFront.label.platNoti'),
    image: localImg('images/xx.png'),
    path: '/notice',
  },
  {
    title: t('web.i18nFront.label.helpCenter'),
    image: localImg('images/wm.png'),
    path: '/help-center',
  },
  {
    title: t('web.i18nFront.label.aboutUs'),
    image: localImg('images/wm.png'),
    path: '/about',
  },
]

function onClickItem(item: Record<string, any>) {
  const { path } = item || {}
  if (!path) {
    showToast(t('web.i18nFront.hint.noData'))
    return
  }
  if (path) {
    router.push({ path })
  }
}

function hasFundPwd() {
  userStore.checkFundPwdExist()
}

async function openPayCenter(type: 'withdraw' | 'deposit') {
  // const toast = showLoadingToast({
  //   message: `${t('web.i18nFront.hint.loading')}...`,
  //   duration: 0,
  //   forbidClick: true,
  // })
  // const hasPwd = await userStore.checkFundPwdExist()
  // toast.close()
  // if (!hasPwd) {
  //   showConfirmDialog({
  //     title: t('system.i18nSystem.label.hint'),
  //     message: t('web.i18nFront.hint.confirmFundPwd'),
  //     confirmButtonText: t('web.i18nFront.operation.goSet'),
  //     cancelButtonText: t('web.i18nFront.operation.cancel'),
  //   })
  //     .then(() => {
  //       router.push({ path: '/userInfo' })
  //     })
  //     .catch(() => {})
  //   return
  // }
  goToPayment(type)
}

onBeforeMount(() => {
  hasFundPwd()
})
</script>

<template>
  <div class="h-full flex flex-col overflow-auto">
    <Header @open-wallet="openPayCenter" />
    <div class="mx-4">
      <TitleCard class="mt-3" :title="$t('web.i18nFront.label.mainFunc')">
        <CellRow
          v-for="(item, i) in list"
          :key="i"
          :title="item.title"
          :icon="item.image"
          :show-bottom-line="i !== (list.length - 1)"
          @click="onClickItem(item)"
        />
      </TitleCard>

      <TitleCard class="mt-3" :title="$t('web.i18nFront.label.support')">
        <CellRow :title="$t('web.i18nFront.label.server')" :icon="localImg('images/kefu.png')" />
        <CellRow :show-bottom-line="false" :title="$t('web.i18nFront.label.help')">
          <template #left>
            <IconHelp />
          </template>
        </CellRow>
      </TitleCard>

      <TitleCard class="mt-3" :title="$t('web.i18nFront.label.systemSet')">
        <!-- <CellRow :title="$t('web.i18nFront.label.theme')" :icon="localImg('images/zl.png')">
          <template #right>
            <ThemeSwitch />
          </template>
        </CellRow> -->
        <LanguageSwitch type="custom-cell" :show-bottom-line="true" />
        <CellRow :show-bottom-line="false" :title="$t('web.i18nFront.label.clearCache')">
          <template #left>
            <IconClear />
          </template>
        </CellRow>
      </TitleCard>
    </div>
    <KKFooter />
  </div>
</template>
