<script setup lang="ts">
const time = ref('')
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  time.value = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date())
}
onMounted(() => {
  tick()
  timer = setInterval(tick, 15_000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <ClientOnly>
    <time class="tabular-nums">{{ time }}</time>
    <template #fallback><span aria-hidden="true">--:--</span></template>
  </ClientOnly>
</template>
