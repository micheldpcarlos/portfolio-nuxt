<script setup lang="ts">
// A low-poly floating island. Everything is primitives with flat shading,
// so there are no assets to load and the whole scene is a few kilobytes.

const trees = [
  { position: [1.6, 0.2, 0.8], height: 1.4 },
  { position: [-1.9, 0.2, -0.4], height: 1.1 },
  { position: [0.9, 0.2, -1.7], height: 1.7 },
  { position: [-0.6, 0.2, 1.9], height: 1.0 },
  { position: [2.3, 0.2, -1.2], height: 0.9 },
] as const

const rocks = [
  { position: [-1.2, 0.05, 1.1], scale: 0.35 },
  { position: [1.0, 0.05, 1.6], scale: 0.25 },
  { position: [-2.4, 0.05, 0.9], scale: 0.3 },
] as const
</script>

<template>
  <TresGroup>
    <!-- Ground: grass disc on top of a chunky dirt base that tapers down. -->
    <TresMesh :position="[0, -1.2, 0]" receive-shadow>
      <TresCylinderGeometry :args="[3.4, 1.4, 2.4, 8]" />
      <TresMeshStandardMaterial color="#6b3f23" :flat-shading="true" />
    </TresMesh>
    <TresMesh :position="[0, 0, 0]" receive-shadow>
      <TresCylinderGeometry :args="[3.5, 3.4, 0.4, 8]" />
      <TresMeshStandardMaterial color="#5cc244" :flat-shading="true" />
    </TresMesh>

    <!-- Trees: trunk + two stacked cones. -->
    <TresGroup v-for="(tree, i) in trees" :key="i" :position="[tree.position[0], tree.position[1], tree.position[2]]">
      <TresMesh :position="[0, tree.height * 0.25, 0]" cast-shadow>
        <TresCylinderGeometry :args="[0.12, 0.16, tree.height * 0.5, 6]" />
        <TresMeshStandardMaterial color="#7a4a2a" :flat-shading="true" />
      </TresMesh>
      <TresMesh :position="[0, tree.height * 0.75, 0]" cast-shadow>
        <TresConeGeometry :args="[0.55, tree.height * 0.8, 6]" />
        <TresMeshStandardMaterial color="#2f9e44" :flat-shading="true" />
      </TresMesh>
      <TresMesh :position="[0, tree.height * 1.15, 0]" cast-shadow>
        <TresConeGeometry :args="[0.38, tree.height * 0.6, 6]" />
        <TresMeshStandardMaterial color="#3cbf55" :flat-shading="true" />
      </TresMesh>
    </TresGroup>

    <!-- Rocks -->
    <TresMesh v-for="(rock, i) in rocks" :key="`rock-${i}`" :position="[rock.position[0], rock.position[1], rock.position[2]]" :scale="rock.scale" cast-shadow>
      <TresDodecahedronGeometry :args="[1, 0]" />
      <TresMeshStandardMaterial color="#8d93a1" :flat-shading="true" />
    </TresMesh>

    <!-- A small cabin: box body, pyramid roof, glowing door. -->
    <TresGroup :position="[-0.4, 0.2, -0.2]">
      <TresMesh :position="[0, 0.5, 0]" cast-shadow receive-shadow>
        <TresBoxGeometry :args="[1.4, 1, 1.2]" />
        <TresMeshStandardMaterial color="#e8c9a0" :flat-shading="true" />
      </TresMesh>
      <TresMesh :position="[0, 1.35, 0]" :rotation="[0, Math.PI / 4, 0]" cast-shadow>
        <TresConeGeometry :args="[1.15, 0.7, 4]" />
        <TresMeshStandardMaterial color="#d9463e" :flat-shading="true" />
      </TresMesh>
      <TresMesh :position="[0, 0.35, 0.61]">
        <TresBoxGeometry :args="[0.3, 0.6, 0.02]" />
        <TresMeshStandardMaterial color="#ffd52b" :emissive="'#ffd52b'" :emissive-intensity="0.8" />
      </TresMesh>
    </TresGroup>

    <!-- Supply crate hanging from a balloon, drifting above the island. -->
    <TresGroup :position="[2.2, 3.6, 0.6]">
      <TresMesh :position="[0, 1.2, 0]">
        <TresSphereGeometry :args="[0.75, 12, 10]" />
        <TresMeshStandardMaterial color="#3fa9f5" :flat-shading="true" />
      </TresMesh>
      <TresMesh :position="[0, 0.3, 0]">
        <TresCylinderGeometry :args="[0.01, 0.01, 1.1, 3]" />
        <TresMeshStandardMaterial color="#ffffff" />
      </TresMesh>
      <TresMesh :position="[0, -0.45, 0]" :rotation="[0, 0.4, 0]" cast-shadow>
        <TresBoxGeometry :args="[0.7, 0.7, 0.7]" />
        <TresMeshStandardMaterial color="#b04fe6" :flat-shading="true" />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
