<script setup lang="ts">
const { definition } = useTheme()
</script>

<template>
  <component :is="definition.shell">
    <slot />
  </component>
</template>
