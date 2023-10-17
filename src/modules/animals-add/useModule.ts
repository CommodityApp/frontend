import {ref, onMounted, watch} from "vue";
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
            if(route.query.id && !queryType.value && !route.query.mode){
                console.log('edit')
                await ApiAnimalTypes.updateAnimalTypes(route.query.id, animalType).then(() => {
                    getSingleAnimalTypes(route.query.id)
                    notify({
                        type: "success",
                        title: "Успешно изминено!"
                    })
                })
            } else {
                console.log('add ',animalType)
                await ApiAnimalTypes.saveAnimalTypes(animalType).then(() => {
                    // getSingleAnimalTypes(route.query.id)
                    notify({
                        type: "success",
                        title: "Успешно добавлено!"
                    })
                    getSingleAnimalTypes(route.query.id)
                    // if(route.query.id){
                    //     location.reload()
                    // }else{
                    //     router.push('/animals')
                    // }
                    
                })
                
            }
            if(animalType.parent_id){
                router.go(-1) //go back when editing child animal type
            } else {
                router.replace("/animals")
            }
            
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
                console.log('get ', route.query.mode)
                singleAnimalType.value = data
                if(route.query.type) {
                    queryType.value = route.query.type
                }
            }
            

        }catch(error: any){
            console.log("error ", error)

        }finally{
            isLoading.value = false
        }
    }

    const editAnimalType = async(mode, id) => {
        if(mode == 'add'){
            console.log('mode ', singleAnimalType.value)
            router.push({
                name:'animals-add',
                query: {
                    mode,
                    id
                }
            }).then(() => {
                location.reload()
            })
        }else {
            router.push({
                name:'animals-add',
                query: {
                    id
                }
            })
        }
    }
    const deleteAnimalTypes = async (id) => {
        try {
          isLoading.value = true;
          await ApiAnimalTypes.deleteAnimalTypes(id).then(() => {
            location.reload()
          }).then(() => {
            notify({
                type: "success",
                title: "Успешно удалено!",
              });
          });
          
          
        } catch (error: any) {
          console.log('error in delete user api ', error)
        } finally {
            isLoading.value = false;
        }
      };

    watch(
        () => route.query.id, 
        () => {
            route.query.id ? getSingleAnimalTypes(route.query.id) : null
        }
    )
    onMounted(() => {
        if(route.query.id){
            getSingleAnimalTypes(route.query.id)
        }
    })

    return {
        isLoading,
        singleAnimalType,
        queryType,
        editAnimalType,
        deleteAnimalTypes,
        saveAnimalTypes
    }
}