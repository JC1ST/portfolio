<template>
  <div class="modal-header" id="modal-header">
    <div class="top">
      <div class="modal-logo">
        <img src="" width="125" height="50" alt="logo" />
      </div>
      <div class="modal-close">
        <img
          src="@/assets/modal/close.png"
          width="30"
          height="30"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
    </div>
    <div class="bottom">
      <div class="type">
        <div class="normal">{{ props.headerTitle }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  headerTitle: string
}>()
</script>

<style lang="scss" scoped>
@import '@/scss/main';

#modal-header {
  display: flex;
  flex-direction: column;
  padding: 0;
  align-items: unset;
  border: none;
  margin-bottom: 30px;

  .top {
    display: flex;
    margin-bottom: 25px;
    .modal-logo {
      flex-grow: 10;
      text-align: center;
      padding-left: 30px;
    }

    .modal-close {
      img {
        cursor: pointer;
      }
    }
  }

  .bottom {
    width: 320px;
    margin: auto;
    .type {
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      border-bottom: 1px #707070 solid;

      div {
        height: 33px;
        font-size: 20px;
        color: #353535;
      }
    }
  }
}
</style>
