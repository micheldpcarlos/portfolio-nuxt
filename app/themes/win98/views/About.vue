<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import MenuBar from '../components/MenuBar.vue'
import Prose from '../components/Prose.vue'
import Window from '../components/Window.vue'

defineProps<ViewProps['About']>()
const { link } = useTheme()
</script>

<template>
  <Window title="About me - WordPad" icon="lucide:file-text" :status="['For Help, press F1']">
    <MenuBar :items="['File', 'Edit', 'View', 'Insert', 'Format', 'Help']" />
    <div class="w98-sunken p-4 sm:p-8">
      <Prose :body="page.body" />
      <div class="mt-6 flex justify-end">
        <NuxtLink :to="link('/')" class="w98-btn is-default text-center">OK</NuxtLink>
      </div>
    </div>
  </Window>
</template>
