<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import type { PerspectiveCamera } from 'three'
import { useLoop } from '@tresjs/core'
import { SECTION_CAMERA, sectionOf } from './useSceneSection'

// The camera orbits the island slowly and swings to a new angle per section,
// so route changes animate the scene instead of remounting it.
const props = defineProps<{ contentPath: string, animate: boolean }>()

const camera = shallowRef<PerspectiveCamera>()

const current = { angle: 0, height: 3.2, distance: 13 }
let target = SECTION_CAMERA[sectionOf(props.contentPath)]
Object.assign(current, target)

watch(() => props.contentPath, (path) => {
  target = SECTION_CAMERA[sectionOf(path)]
  if (!props.animate) Object.assign(current, target)
}, { immediate: true })

function place(elapsed: number) {
  const cam = camera.value
  if (!cam) return
  const drift = props.animate ? Math.sin(elapsed * 0.15) * 0.25 : 0
  const angle = current.angle + drift
  cam.position.set(Math.sin(angle) * current.distance, current.height, Math.cos(angle) * current.distance)
  cam.lookAt(0, 0.6, 0)
}

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta, elapsed }) => {
  const k = props.animate ? Math.min(1, delta * 2.2) : 1
  current.angle += (target.angle - current.angle) * k
  current.height += (target.height - current.height) * k
  current.distance += (target.distance - current.distance) * k
  place(elapsed)
})
</script>

<template>
  <TresPerspectiveCamera ref="camera" :position="[0, 3.2, 13]" :fov="42" :near="0.1" :far="200" />
</template>
