<script setup lang="ts">
import { watch, ref } from "vue";
import { DeleteIcon } from "../../../app/assets/svg";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps<{
  isLoading: boolean;
  animalTypesData: any;
  saveAnimalTypes: any;
  updateAnimalTypes: any;
  deleteChildAnimalTypes: any;
  addChildAnimal: any;
  editChildAnimal: any;
}>();
const name = ref("");
const ch_parent_id = ref();
const isEdit = ref<boolean>(false);

const saveAndEdit = () => {
  let newAnimalData: any = {
    name: name.value,
  };
  if (route.query.mode == "add") {
    isEdit.value = false;

    newAnimalData = {
      ...newAnimalData,
      parent_id: route.query.id,
    };
  } else if (route.query.mode == "edit") {
    isEdit.value = true;

    newAnimalData = {
      ...newAnimalData,
      parent_id: ch_parent_id.value,
    };
  }

  isEdit.value
    ? props.updateAnimalTypes(newAnimalData)
    : props.saveAnimalTypes(newAnimalData);
};

const addChild = () => {
  name.value = "";
  props.addChildAnimal();
};

const editChild = (child_id, child_parent_id, child_name) => {
  props.editChildAnimal(child_id);
  name.value = child_name;
  ch_parent_id.value = child_parent_id;
};
watch(
  () => {
    props.animalTypesData;
  },
  () => {
    props.animalTypesData.name
      ? ((name.value = props.animalTypesData.name), (isEdit.value = true))
      : (name.value = null);
  },
  {
    deep: true,
  }
);

const deleteChild = (id) => {
  window.confirm("Вы действительно хотите удалить?")
    ? props.deleteChildAnimalTypes(id)
    : null;
};
</script>

<template>
  <div class="flex flex-row justify-between py-2 w-full">
    <div class="self-center text-2xl font-bold leading-7">
      <span v-if="isEdit && $route.query.mode != 'add'">Редактирование </span>
      <span v-else>Создание </span>
      <span v-if="$route.query.mode != 'add'">вид</span>
      <span v-else>тип</span>
      животного
    </div>

    <div>
      <button
        :disabled="!!!name.length"
        @click="saveAndEdit()"
        class="flex flex-row bg-[#7000FF] disabled:bg-[#6f00ff41] cursor-pointer disabled:cursor-not-allowed text-white rounded-[1rem] py-[0.4rem] px-[0.9rem]"
      >
        <span v-if="isEdit && $route.query.mode != 'add'">Изменить</span>
        <span v-else>Сохранить</span>
      </button>
    </div>
  </div>

  <div
    class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6"
  >
    <form>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full group">
          <input
            v-focus
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

    <div v-if="animalTypesData?.children && !$route.query.mode">
      <div class="inline-flex items-center justify-center mt-4 w-full">
        <hr class="w-full h-px my-8 bg-gray-200 border-0" />
        <span
          class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-[10%]"
        >
          Типы животных
        </span>
      </div>

      <div class="flex flex-col gap-y-1 w-1/4 my-6">
        <div v-if="animalTypesData?.children.length">
          <div
            v-for="(childAnimal, index) in animalTypesData.children"
            :key="index"
            class="relative z-0 mb-2 w-full group"
          >
            <div class="flex flex-row gap-x-4">
              <div
                class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg"
              >
                <div
                  @click="
                    editChild(
                      childAnimal.id,
                      childAnimal.parent_id,
                      childAnimal.name
                    )
                  "
                  class="block w-full px-4 py-2 border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-[#7000FF] hover:rounded-lg focus:text-[#7000FF]"
                >
                  {{ childAnimal.name }}
                </div>
              </div>

              <DeleteIcon
                class="w-6 h-6 self-center cursor-pointer text-red-600"
                @click="deleteChild(childAnimal.id)"
              />
            </div>
          </div>
        </div>
        <div v-else>Список пуст</div>
      </div>

      <button
        @click="addChild()"
        class="mt-4 text-[#7000FF] hover:text-white hover:bg-[#7000FF] border border-[#7000FF] text-sm py-[0.5rem] px-[0.9rem] rounded-[0.8rem]"
      >
        Добавить
      </button>
    </div>
  </div>
</template>
