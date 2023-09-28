type TClient = {
  name: string;
};
type TRecipt = {
  name: string;
};
export interface IOrders {
  id?:number;
  client: TClient;
  date: string;
  amount: string;
  receipt: TRecipt;
}
