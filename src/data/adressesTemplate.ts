export interface Address {
  time?: string,
  id?: number,
  gender: string,
  wishes: string,
  ozon_address: string,
  wb_address: string,
  id_from?: number;
}

export const ADDRESSES: Readonly<Address[]> = [
  {
    id_from: 936503,
    gender: 'МУЖИИИИИИИИИИИИИИИИИИК',
    wishes: 'просто по фиге',
    ozon_address: 'Новосибирск, улица Кошурникова, 24/1',
    wb_address: 'г Новосибирск, Улица Кошурникова 29/3',
  }
]