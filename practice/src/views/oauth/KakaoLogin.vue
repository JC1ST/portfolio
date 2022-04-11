<script lang="ts" setup>
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router'
import api from '@/config/axios.config'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
const { code, error_description } = route.query

const kakoLogin = async () => {
  const result = await api.get(`/oauth/kakao/callback?code=${code}&type=PC`)

  if (result.data.success) {
    const accessToken = result.data.accessToken
    const user = result.data.user

    localStorage.setItem('accessToken', accessToken)

    const userData = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    }

    const getFavorite = await api.get(`/favorite/${user.id}`)

    store.commit('favorite/updateState', {
      favorite: getFavorite.data.favorite,
    })

    store.commit('auth/updateState', {
      user: userData,
      isLogin: true,
    })

    window.close()
    opener.location.href = '/'
  } else {
    await api.get(`/oauth/delete?token=${result.data.oAuthToken}&type=KAKAO`)
    Swal.fire({
      icon: 'error',
      text: result.data.errorMessage,
      confirmButtonText: '확인',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        window.close()
      }
    })
  }
}

if (error_description) {
  Swal.fire({
    icon: 'error',
    text: error_description as string,
    confirmButtonText: '확인',
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      window.close()
    }
  })
} else {
  kakoLogin()
}
</script>
