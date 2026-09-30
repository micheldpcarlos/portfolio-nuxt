<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Levioso, Stars } from '@tresjs/cientos'
import { onMounted, ref } from 'vue'
import Island from './Island.vue'
import Clouds from './Clouds.vue'
import CameraRig from './CameraRig.vue'

defineProps<{ contentPath: string }>()

// Respect the OS "reduce motion" setting: the scene still renders, it just holds still.
const animate = ref(true)
onMounted(() => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  animate.value = !query.matches
  query.addEventListener('change', e => (animate.value = !e.matches))
})
</script>

<template>
  <TresCanvas clear-color="#120a3a" :dpr="[1, 1.5]" shadows>
    <CameraRig :content-path="contentPath" :animate="animate" />

    <TresAmbientLight :intensity="0.9" color="#c9d6ff" />
    <TresDirectionalLight :position="[6, 12, 6]" :intensity="2.2" color="#fff4d6" cast-shadow />
    <TresPointLight :position="[-6, 3, -4]" :intensity="40" color="#b04fe6" />
    <TresPointLight :position="[6, -2, 4]" :intensity="30" color="#3fa9f5" />

    <Stars :radius="70" :depth="30" :count="1800" :size="0.4" :size-attenuation="true" />

    <Levioso :speed="animate ? 0.7 : 0" :float-factor="0.5" :rotation-factor="0.15" :range="[-0.2, 0.2]">
      <Island />
    </Levioso>

    <Clouds :animate="animate" />
  </TresCanvas>
</template>
