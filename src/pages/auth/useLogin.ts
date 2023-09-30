import { ApiAuth } from "@/shared/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "../../app/stores/AuthStore";
import { useNotification } from "@kyvg/vue3-notification";

export default function useLogin() {
    const router = useRouter()
    const errorMsg = ref<string>()
    const authStore = useAuthStore()
    const { notify } = useNotification()

    const login = async (email, password) => {
        try {
            const data: any = await ApiAuth.Login(email, password)
            if(data.status == 200){
                errorMsg.value = null;
                
                authStore.saveCredentials(data.data.access_token, data.data.user.name)
                notify({
                    type: "success",
                    title: "Успешно авторизовано!"
                })   
                router.push('/orders')
            }
            
        } catch (e:any) {
            if(e.message){
                errorMsg.value = e.response.data.message;
                if(e.response.status == 422){
                    errorMsg.value = 'Внимание! Электронная почта или пароль введены неправильно.'
                    return
                }
            }
        } finally {
            // console.log('Done')
        }
    }

    return {
        login,
        errorMsg
    }
}