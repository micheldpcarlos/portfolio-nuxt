<script setup lang="ts">
// A themeable theme selector: <details> so it works before hydration, tokens
// for colours so it fits whichever theme it sits in. Themes pass their own
// classes for the trigger; the menu is styled with shared tokens only.
defineProps<{ triggerClass?: string, placement?: 'down' | 'up' }>()

const { options, current, remember } = useThemeOptions()
const details = ref<HTMLDetailsElement>()
const route = useRoute()

watch(() => route.fullPath, () => {
  if (details.value) details.value.open = false
})

function onDocumentClick(event: MouseEvent) {
  if (details.value?.open && !details.value.contains(event.target as Node)) details.value.open = false
}
onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <details ref="details" class="relative">
    <summary
      class="inline-flex cursor-pointer list-none items-center gap-1.5 select-none [&::-webkit-details-marker]:hidden"
      :class="triggerClass"
      :aria-label="`Theme: ${current.label}. Choose a theme`"
    >
      <Icon :name="current.icon" class="size-4" aria-hidden="true" />
      <span>{{ current.label }}</span>
      <Icon name="lucide:chevron-down" class="size-3.5 opacity-70" aria-hidden="true" />
    </summary>

    <div class="absolute right-0 z-30 w-72 overflow-hidden rounded-lg border border-line bg-bg-elevated text-fg shadow-xl" :class="placement === 'up' ? 'bottom-full mb-2' : 'mt-2'">
      <p class="border-b border-line px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-fg-muted">Theme</p>
      <ul role="list">
        <li v-for="option in options" :key="option.id">
          <NuxtLink
            :to="option.to || '/'"
            class="flex items-start gap-3 px-3 py-2.5 hover:bg-brand-soft"
            :class="option.active ? 'bg-brand-soft' : ''"
            :aria-current="option.active ? 'true' : undefined"
            @click="remember(option.id)"
          >
            <Icon :name="option.icon" class="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
            <span class="min-w-0 flex-1">
              <span class="block text-sm font-medium">{{ option.label }}</span>
              <span class="block text-xs text-fg-muted">{{ option.tagline }}</span>
            </span>
            <Icon v-if="option.active" name="lucide:check" class="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </details>
</template>
