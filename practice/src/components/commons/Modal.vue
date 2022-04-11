<template>
  <div
    class="modal fade"
    :id="props.id"
    data-bs-backdrop="static"
    data-bs-keyboard="true"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="false"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: string
}>()
</script>

<style lang="scss" scoped>
@import '@/scss/main';

.modal {
  background-color: rgb(0, 0, 0, 0.3);
}
</style>
