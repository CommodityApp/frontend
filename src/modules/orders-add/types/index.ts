export interface IClients {
    id: number,
    name: string
}

export interface IReceipts {
    id: number,
    name: string,
    rate?: string,
    code?: string,
    unit?: string
}

interface TAnimalSubClass {
    id: number,
    name: string,
    parent_id?: number,
    animal_level_id?: number
}
export interface IAnimalTypes {
    id: number,
    name: string,
    children: TAnimalSubClass[]
}

export interface IState {
    client_id: number | string,
    receipt: any,
    animal_type_id: number,
    date: string,
    amount: number
  }