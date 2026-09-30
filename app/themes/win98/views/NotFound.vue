<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import Window from '../components/Window.vue'

const props = defineProps<ViewProps['NotFound']>()
const { link } = useTheme()
const is404 = computed(() => props.error.statusCode === 404)
</script>

<template>
  <div class="flex min-h-[60vh] items-center justify-center">
    <Window :title="is404 ? 'Page not found' : 'Error'" icon="lucide:circle-alert" content-class="p-4">
      <div class="flex items-start gap-4">
        <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#ff0000] text-lg font-bold text-white" aria-hidden="true">×</span>
        <div class="text-[12px]">
          <p class="font-bold">{{ is404 ? 'The page cannot be displayed.' : (error.statusMessage || 'An unexpected error occurred.') }}</p>
          <p class="mt-1">{{ is404 ? 'The page you are looking for is not on this computer. Error ' + error.statusCode : 'Error ' + error.statusCode }}</p>
        </div>
      </div>
      <div class="mt-5 flex justify-center">
        <NuxtLink :to="link('/')" class="w98-btn is-default text-center" @click="clearError()">OK</NuxtLink>
      </div>
    </Window>
  </div>
</template>
