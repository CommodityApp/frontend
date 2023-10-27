// import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { ApiOrders } from "@/shared/api";
import { useRouter } from "vue-router";
import useOrdersStore from "@/app/stores/OrdersStore";

export default function useModule() {
  const ordersStore = useOrdersStore();
  const router = useRouter();

  const isLoading = ref<boolean>(false);
  const orders = ref([]);
  const metaData = ref();

  const addNewOrder = () => {
    ordersStore.clearOrder();
    router.push("/orders/add");
  };

  const getOrders = async (page) => {
    try {
      isLoading.value = true;
      const data: any = await ApiOrders.getOrders(page);
      orders.value = data.data;
      metaData.value = data.meta;
    } catch (e: any) {
      console.log("Error in orders api: ", e);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(async () => {
    getOrders(1);
  });

  return {
    orders,
    isLoading,
    addNewOrder,
    getOrders,
    metaData,
  };
}
