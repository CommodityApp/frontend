<script setup lang="ts">
import useAuthStore from "../stores/AuthStore"
import {useRouter} from "vue-router"
import { ArrowDownIcon, LogOutIcon, MenuIcon, DashboardIcon } from "../../app/assets/svg/";
const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.clearCredentials()
  router.push('/login')
}
</script>
<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span class="sr-only">Open sidebar</span>
            <MenuIcon class="w-6 h-6" />
          </button>
          <RouterLink to="/" class="flex ml-2 md:mr-24">
            <DashboardIcon class="w-6 h-6 my-1 mx-2" />
            <span
              class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
              >Agro Premix</span
            >
          </RouterLink>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div>
              <button
                type="button"
                class="flex text-sm text-[#696969]"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <span class="sr-only">Open user menu</span>
                <span>
                  {{ authStore.userName }}
                </span>
                <ArrowDownIcon class="w-6 h-5 align-middle" />
              </button>
            </div>

            <div
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
              id="dropdown-user"
            >
              <ul class="py-1" role="none">
                <li>
                  <button
                    @click="logout"
                    class="flex flex-row p-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <LogOutIcon
                      class="flex-shrink-0 w-6 h-6 self-center mx-2 text-gray-900"
                    />
                    <span class="">Выйти</span>
                </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
