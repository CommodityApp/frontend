<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { DeleteIcon } from "../../../app/assets/svg";
import { useRoute } from 'vue-router';

const route = useRoute()
const props = defineProps<{
  isLoading: boolean
  singleAnimalType: any
  queryType: any
  editAnimalType: any
  deleteAnimalTypes: any
}>()

const emit = defineEmits<{
  saveAnimalTypes: [animalTypeData: any]
}>()

const visibleAlert = ref<boolean>()
const name = ref<string>()


const savePrice = () => {
  let newPrice:any = {
    name: name.value
  }
  if(props.singleAnimalType.parent_id || route.query.mode){
    newPrice = {
      ...newPrice,
      parent_id: props.singleAnimalType.parent_id || route.query.id 
  }
  }
  emit("saveAnimalTypes", newPrice)
}

watch(() => props.singleAnimalType, () => {
  if( props.singleAnimalType.name ){
    //props.queryType is a case when it is duplcating...
    name.value = props.queryType ? null : props.singleAnimalType.name
    
  }
}, {
  deep: true
})

const isEdit = computed(() => {
  return props.singleAnimalType?.name != null && !props.queryType ? true : false
})

const deleteAnimalType = (id) => {
  window.confirm('Вы действительно хотите удалить?') ? props.deleteAnimalTypes(id) : null
}

</script>
<template>
  <div class="flex flex-row justify-between py-2 w-full">
    <div class="self-center text-2xl font-bold leading-7">
      <span v-if="isEdit">Редактирование</span> 
      <span v-else-if="queryType">Дублирование</span>
      <span v-else>Создать новыю</span>
        вид животного
    </div>
    <div>
      <button
        :disabled="visibleAlert"
        @click="savePrice()"
        class="flex flex-row bg-[#7000FF] disabled:bg-[#6f00ff41] cursor-pointer disabled:cursor-not-allowed text-white rounded-[1rem] py-[0.4rem] px-[0.9rem]"
      >
      <span v-if="isEdit">Изменить</span>
      <span v-else-if="queryType">Дублировать</span>
      <span v-else>Сохранить</span>
    </button>
    </div>
  </div>

  <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6">
    <form>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="name"
            id="name"
            v-model="name"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="name"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Название</label
          >
        </div>

        

      </div>
    </form>
    <!-- <code>
      {{ $route.query.mode }}
    </code> -->

    
    <div v-if="!singleAnimalType.parent_id && !$route.query.mode">
      <div class="inline-flex items-center justify-center mt-4 w-full">
        <hr class="w-full h-px my-8 bg-gray-200 border-0">
        <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-[10%]">
          Типы животных
        </span>
      </div>


      <div class="flex flex-col gap-y-1 w-1/4 my-6">
        <div v-if="singleAnimalType?.children?.length">
        <div  
          v-for="animal, index in singleAnimalType.children"
          :key="index" 
          class="relative z-0 mb-2 w-full group"
        > 
          <div class="flex flex-row gap-x-4">
            <div class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              <div
                @click="editAnimalType('_', animal.id)" 
                class="block w-full px-4 py-2 border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-[#7000FF] hover:rounded-lg focus:text-[#7000FF]"
              >
                {{ animal.name }}
              </div>
            </div>

            <DeleteIcon 
              class="w-6 h-6 self-center cursor-pointer text-red-600"
              data-modal-target="popup-modal" 
              data-modal-toggle="popup-modal"
              @click="deleteAnimalType(animal.id)" 
            />
          </div>
        </div>
        </div>
        <div v-else>
          Список пуст
        </div>

      </div>

      <button
        @click="editAnimalType('add', $route.query.id)"  
        class="mt-4 text-[#7000FF] hover:text-white hover:bg-[#7000FF] border border-[#7000FF] text-sm py-[0.5rem] px-[0.9rem] rounded-[0.8rem]"
      >
        Добавить
      </button>
    </div>
    
  </div>
</template>
