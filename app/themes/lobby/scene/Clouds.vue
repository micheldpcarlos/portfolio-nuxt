<script setup lang="ts">
import { shallowRef } from 'vue'
import type { Group } from 'three'
import { useLoop } from '@tresjs/core'

const props = defineProps<{ animate: boolean }>()

type Vec3 = [number, number, number]

const clouds: { position: Vec3, scale: number, speed: number }[] = [
  { position: [-9, 2.5, -6], scale: 1.4, speed: 0.25 },
  { position: [7, 4, -9], scale: 1.9, speed: 0.18 },
  { position: [-4, 6, -12], scale: 2.4, speed: 0.12 },
  { position: [10, 1.5, -3], scale: 1.1, speed: 0.3 },
  { position: [-12, -1, -4], scale: 1.6, speed: 0.2 },
  { position: [4, -3, 2], scale: 1.2, speed: 0.22 },
]

const puffs: { position: Vec3, radius: number }[] = [
  { position: [0, 0, 0], radius: 1 },
  { position: [0.9, 0.15, 0.2], radius: 0.75 },
  { position: [-0.9, 0.1, -0.1], radius: 0.7 },
  { position: [0.3, 0.45, -0.3], radius: 0.6 },
  { position: [-0.4, 0.4, 0.3], radius: 0.55 },
]

const groups = shallowRef<Group[]>([])

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  if (!props.animate) return
  groups.value.forEach((group, i) => {
    const cloud = clouds[i]
    if (!group || !cloud) return
    group.position.x += cloud.speed * delta
    if (group.position.x > 16) group.position.x = -16
  })
})
</script>

<template>
  <TresGroup
    v-for="(cloud, i) in clouds"
    :key="i"
    :ref="(el: unknown) => { if (el) groups[i] = el as Group }"
    :position="cloud.position"
    :scale="cloud.scale"
  >
    <TresMesh v-for="(puff, j) in puffs" :key="j" :position="puff.position">
      <TresSphereGeometry :args="[puff.radius, 8, 6]" />
      <TresMeshStandardMaterial color="#ffffff" :flat-shading="true" :roughness="1" />
    </TresMesh>
  </TresGroup>
</template>
