import { ApiAnimalTypes } from "@/shared/api";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
import {ref, onMounted, watch} from "vue";

export default function useModule() {
    const { notify } = useNotification()
    const router = useRouter()
    const route = useRoute()
    

    const isLoading = ref<boolean>(false)
    const animalTypesData = ref([])

    const saveAnimalTypes = async (data) => {
        console.log('success save')
        try {
            const response = await ApiAnimalTypes.saveAnimalTypes(data)
            router.replace({
                query: {
                    id: route.query.mode ? route.query.id : response.data.id,
                }
            }).then(() => {
                if(route.query.mode = 'add'){
                    getSingleAnimalTypes(route.query.id) 
                    route.query.mode = null
                }else{
                    getSingleAnimalTypes(response.data.id)
                    route.query.mode = null
                }
                     
                    
            })
            
        } catch(error: any){
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
        }finally {
            notify({
                type: "success",
                title: "Успешно добавлено!"
            })
        }
        
    }

    const updateAnimalTypes = async (data) => {
        try {
            console.log('data test ', data)
            await ApiAnimalTypes.updateAnimalTypes(route.query.id, data).then(()=>{
                getSingleAnimalTypes(data.parent_id)
                notify({
                    type: "success",
                    title: "Успешно изминено!"
                })
                router.replace({
                    query: {
                    id: data.parent_id,
                }})
            })
        } catch(error: any){
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
        }
    }

    const getSingleAnimalTypes = async (id) => {
        try {
            isLoading.value = true
            const { data } = await ApiAnimalTypes.getSingleAnimalTypes(id)
            animalTypesData.value = data
        }catch(error: any){
            console.log("error ", error)
        } finally {
            isLoading.value = false
        }
    }

    const deleteChildAnimalTypes = async (id) => {
        try {
          await ApiAnimalTypes.deleteAnimalTypes(id).then(()=>{
            getSingleAnimalTypes(route.query.id) 
          })
        } catch (error: any) {
          console.log('error in delete user api ', error)
        } finally {
            notify({
                type: "success",
                title: "Успешно удалено!",
              });
        }
    }

    const addChildAnimal = () => {
        router.replace({
            query: {
                id: route.query.id,
                mode: 'add'
            }
        })
    }
    const editChildAnimal = (child_id) => {
        console.log('child_id ',child_id)
        router.replace({
            query: {
                id: child_id,
                mode: 'edit'
            }
        })
    }
    
    

      onMounted(() => {
        if(route.query.id){
            getSingleAnimalTypes(route.query.id)
        }
    })





    return {
        isLoading,
        animalTypesData,
        saveAnimalTypes,
        updateAnimalTypes,
        addChildAnimal,
        editChildAnimal,
        deleteChildAnimalTypes
    }
}