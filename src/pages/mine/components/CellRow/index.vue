<script setup lang="ts">
defineOptions({
  name: 'CellRow',
})

defineProps({
  image: String,
  title: String,
  icon: String,
  showBottomLine: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="flex items-center gap-3 py-3 text-sm" :class="{ 'border-bottom': showBottomLine }">
    <div class="flex items-center">
      <img v-if="icon" class="w-5 object-contain" :src="icon" alt="">
      <slot name="left" />
      <span class="pl-3">{{ title }}</span>
    </div>
    <div class="flex flex-1 items-center justify-end">
      <slot name="right">
        <van-icon name="arrow" />
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.border-bottom {
  border-bottom: 1px dotted #e1e1e1c2;
}
html.dark .border-bottom {
  border-bottom: 1px dotted #ffffff1a;
}
</style>
