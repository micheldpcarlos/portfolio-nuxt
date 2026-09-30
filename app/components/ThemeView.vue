<script setup lang="ts">
import type { ViewName } from '~/themes/types'

// Props for the view are passed through as attrs; see ViewProps for the contract.
defineOptions({ inheritAttrs: false })
const props = defineProps<{ name: ViewName }>()
const { definition } = useTheme()
const view = computed(() => definition.value.views[props.name])
</script>

<template>
  <component :is="view" v-bind="$attrs" />
</template>
