<template>
  <div>
    <input v-model="message" type="text" />
  </div>
</template>

<script lang="ts" setup>
// import { io } from 'socket.io-client'
import { ref } from 'vue'

const message = ref<string>('')

// const socket = io('http://localhost:3001')

// socket.on('connect', () => {
//   console.log('접속')
// })

// socket.on('received', (msg) => {
//   console.log(msg)
// })

// const sendMessage = () => {
//   socket.emit('message', message.value)
// }
</script>

<style lang="scss" scoped>
@import '@/scss/main';
</style>
