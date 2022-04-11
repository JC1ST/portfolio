<template>
  <RegisterDefault
    v-if="props.registerType == RegisterType.DEFAULT"
    @showLoginModal="showLoginModal"
    @changeRegisterType="changeRegisterType"
  />
  <RegisterNormalForm
    v-else-if="props.registerType == RegisterType.NORMAL"
    @showLoginModal="showLoginModal"
    @changeRegisterType="changeRegisterType"
    @closeRegisterModal="closeRegisterModal"
  />
</template>

<script lang="ts" setup>
import RegisterDefault from '@/components/commons/auth/RegisterDefault.vue'
import RegisterNormalForm from '@/components/commons/auth/RegisterNormalForm.vue'
import { RegisterType } from '../../../types/enum'

const props = defineProps<{
  registerType: RegisterType
}>()

const emit = defineEmits<{
  (e: 'closeRegisterModal'): void
  (e: 'showLoginModal'): void
  (e: 'changeRegisterType', type: RegisterType): void
}>()

const changeRegisterType = (type: RegisterType) => {
  emit('changeRegisterType', type)
}

const showLoginModal = () => {
  emit('closeRegisterModal')
  emit('showLoginModal')
}

const closeRegisterModal = () => {
  emit('closeRegisterModal')
}
</script>

<style lang="scss" scoped>
@import '@/scss/main';
</style>
