import { ref, computed } from "vue";
import { defineStore } from "pinia";

const useAuthStore = defineStore("authStore", () => {
  const accessToken = ref<string>()
  const userName = ref<string>()

  const isAuthenticated = computed(() => accessToken.value != '')

  const saveCredentials = (token:string, username:string) => {
    accessToken.value = token
    userName.value = username
  }
  const clearCredentials = () => {
    accessToken.value = null
    userName.value = null
  }
  return { 
    saveCredentials,
    clearCredentials,
    accessToken, 
    userName,
    isAuthenticated
  }
},
{
	persist: {
		key: "authStore",
		storage: sessionStorage
	}
}
)

export default useAuthStore
