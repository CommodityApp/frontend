<script setup lang="ts">
import { DeleteIcon, EditIcon } from "../../../app/assets/svg";
const props = defineProps<{
  isLoading: boolean
  usersData: any
  deleteUser: any
  editUser: any
}>();

const deleteSingleUser = (id, name) => {
  window.confirm(`Вы действительно хотите удалить ${name} пользователь?`) ? props.deleteUser(id) : null
}
const editSingleUser = (id) => {
  props.editUser(id)
}
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div
      v-if="isLoading"
      class="flex items-center mt-1 justify-center w-full h-[70vh] bg-white"
    >
      <div
        class="px-3 py-1 text-sm font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse"
      >
        Загрузка данных...
      </div>
    </div>
    
    <div v-else>
      <table
        v-if="usersData"
        class="w-full text-sm text-left text-gray-500"
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">№</th>
            <th scope="col" class="px-6 py-3">Имя</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Дата создания</th>
            <th scope="col" class="px-6 py-3 text-end">Действия</th>
          </tr>
        </thead>

        <tbody>    
          <tr
            v-for="(user, index) in usersData"
            :key="index"
            @click="editSingleUser(user.id)"
            class="bg-white border-b cursor-pointer text-gray-900 hover:bg-gray-50"
          >
            <td class="px-6 py-4">{{user.id }}</td>
            <td class="px-6 py-4">{{ user.name }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">{{ user?.created_at.slice(0,10) }}</td>
            <td class="px-6 py-4 flex gap-x-4 justify-end">
              <!-- <EditIcon
                @click=""
                class="w-5 h-5 mr-2 text-[#7000FF] cursor-pointer"
              /> -->
              <DeleteIcon
                @click.stop="deleteSingleUser(user.id, user.name)"
                class="w-5 h-5 text-red-700 hover:outline hover:outline-red-200 rounded-[4px] cursor-pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="text-2xl text-center p-16 text-gray-300">
        Нет данных
      </div>
    </div>
  </div>
</template>
