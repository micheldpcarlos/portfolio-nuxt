<script setup lang="ts">
// Thin re-export so the shell can use <LazyLobbyScene> and keep Three.js in
// its own chunk, loaded only on the client and only inside the lobby theme.
import LobbyScene from '~/themes/lobby/scene/LobbyScene.vue'

defineProps<{ contentPath: string }>()
</script>

<template>
  <LobbyScene :content-path="contentPath" />
</template>
