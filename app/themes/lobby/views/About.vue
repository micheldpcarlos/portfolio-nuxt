<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import Panel from '../components/Panel.vue'
import Prose from '../components/Prose.vue'
import SectionTitle from '../components/SectionTitle.vue'

defineProps<ViewProps['About']>()
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <SectionTitle kicker="Player info" title="About" />
    <Panel>
      <Prose :body="page.body" />
    </Panel>
  </div>
</template>
