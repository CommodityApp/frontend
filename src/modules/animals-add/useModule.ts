import {ref, onMounted} from "vue";
import { ApiAnimalTypes } from "@/shared/api";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";

export default function useModule() {
    const isLoading = ref<boolean>(false)
    const { notify } = useNotification()
    const router = useRouter()
    const route = useRoute()
    const singleAnimalType = ref([])
    const queryType = ref()


    const saveAnimalTypes = async (animalType) => {
        try {
            isLoading.value = true
            if(route.query.id && !queryType.value){
                await ApiAnimalTypes.updateAnimalTypes(route.query.id, animalType).then(() => {
                    notify({
                        type: "success",
                        title: "Успешно изминено!"
                    })
                })
            } else {
                await ApiAnimalTypes.saveAnimalTypes(animalType).then(() => {
                    notify({
                        type: "success",
                        title: "Успешно добавлено!"
                    })
                })
                
            }
            router.replace("/animals")
        } catch(error: any){
            isLoading.value = false
            const errors = error?.response?.data.errors
            
            Object.values(errors).forEach(item => {
                notify({
                    type: "error",
                    title: "Ошибка!",
                    text: item[0],
                    speed: 500,
                    duration: 3000,
                })
            })
            console.log('Error save animal types: ',error)
        } finally{
            isLoading.value = false
        }
    }



    const getSingleAnimalTypes = async(id) => {
        try{
            isLoading.value = true
            const {data} = await ApiAnimalTypes.getSingleAnimalTypes(id)
            if(data){
                singleAnimalType.value = data 
                if(route.query.type){
                    queryType.value = route.query.type
                }
            }
            

        }catch(error: any){
            console.log("error ", error)

        }finally{
            isLoading.value = false
        }
    }

    onMounted(() => {
        if(route.query.id){
            getSingleAnimalTypes(route.query.id)
        }
    })

    return {
        isLoading,
        singleAnimalType,
        queryType,
        saveAnimalTypes
    }
}