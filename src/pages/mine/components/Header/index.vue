<script setup lang="ts">
import TabItem from '../TabItem/index.vue'
import MyAvatar from '../MyAvatar/index.vue'
import { useDesignSetting } from '@/hooks/useDesignSetting'
import { useChatStore } from '@/store/modules/chat'
import useUserStore from '@/store/modules/user'

defineOptions({
  name: 'MineHeaderCp',
})

const emit = defineEmits<{ openWallet: [type: 'deposit' | 'withdraw'] }>()

const router = useRouter()
const userStore = useUserStore()
const chatStore = useChatStore()

const { isDark } = useDesignSetting()
const refreshLoading = ref(false)

const balance = computed(() => {
  const money = userStore?.balanceInfo?.balance
    ? userStore.balanceInfo.balance
    : '0.00'
  return money || '0.00'
})

async function onRefresh() {
  refreshLoading.value = true
  await userStore.getUserBanlance()
  refreshLoading.value = false
}

function onLogin() {
  userStore.setLoginModalState(true)
}

function openService() {
  chatStore.openChat()
}
</script>

<template>
  <div class="header w-full">
    <div class="flex items-center justify-between px-4 pt-5 text-14px">
      <h3>{{ $t('web.i18nFront.label.mineC') }}</h3>
      <div class="flex gap-4">
        <div class="icon-email h-30px w-30px flex-center rounded-full bg-#fff">
          <IconEmail :is-dark="isDark" size="18px" />
        </div>
        <div class="icon-email h-30px w-30px flex-center rounded-full bg-#fff" @click="openService">
          <img v-if="!isDark" class="w-18px object-contain" src="@/assets/images/icons/icon-kh.png" alt="">
          <img v-else class="w-18px object-contain" src="@/assets/images/icons/icon-kh2.png" alt="">
        </div>
      </div>
    </div>
    <div v-if="userStore.token" class="user-info mx-4 my-4 rounded-full p-3">
      <div class="flex items-center gap-2">
        <MyAvatar />
        <div class="flex flex-col">
          <p class="welcome text-base">
            {{ $t('web.i18nFront.hint.hello') }},
            {{ userStore?.userInfo?.userName }}
          </p>
          <div class="custom-btn flex-center">
            <WalletAndCurrencySelector padding="0 4px 0 0" min-h="20px" :show-label="false" />
            <span class="money ml-2 text-15px color-[var(--primary-color)]">{{ balance }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <van-button size="mini" icon="replay" :loading="refreshLoading" @click="onRefresh" />
      </div>
    </div>
    <div v-else class="mt-4 px-4">
      <div class="flex items-center">
        <div class="kk-button text-12px" @click="onLogin">
          {{ $t('system.i18nSystem.opration.login') }}
        </div>
      </div>
      <p class="pb-5 pt-2 text-12px color-[var(--text-gray-color)]">
        {{ $t('web.i18nFront.hint.loginFirst') }}
      </p>
    </div>
    <van-row>
      <van-col span="8">
        <TabItem
          :title="$t('web.i18nFront.label.recharge')" :show-rigth-line="false"
          @click="emit('openWallet', 'deposit')"
        >
          <IconWithdraw />
        </TabItem>
      </van-col>
      <van-col span="8">
        <TabItem
          :title="$t('web.i18nFront.label.withdraw')" :show-rigth-line="false"
          @click="emit('openWallet', 'withdraw')"
        >
          <IconTopup />
        </TabItem>
      </van-col>
      <!-- <van-col span="6">
        <TabItem :title="$t('web.i18nFront.label.transfor')" :show-rigth-line="false" @click="router.push('/transfor')">
          <IconWallet />
        </tabitem>
      </van-col> -->
      <van-col span="8">
        <TabItem :title="$t('web.i18nFront.label.swapShort')" :show-rigth-line="false" @click="router.push('/swap')">
          <IconWallet />
        </tabitem>
      </van-col>
    </van-row>
  </div>
</template>

<style lang="less" scoped>
.header {
  padding: 0;
  padding-bottom: 16px;
  box-sizing: border-box;
  background: url(@/assets/images/bg/img_uc_bg.png) no-repeat right 0 / cover;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.user-info {
  background: #ffffffcc;
  box-shadow: 0 0 4px 0 #00000012;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

html.dark .welcome {
  color: #d3b694;
}

html.dark .user-info {
  background: #302e38;
  box-shadow: 0 0 4px 0 #00000017;
}

html.dark .icon-email {
  background-color: #302e38;
}

html.dark .header {
  background: url(@/assets/images/bg/img_uc_bg2.png) no-repeat right 0 / cover;
}
</style>
