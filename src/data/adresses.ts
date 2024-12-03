export interface Address {
  id_from: number;
  wishes: string;
  ozon_address: string;
  gender: string;
  wb_address: string;
}

export const ADDRESSES: Readonly<Address[]> = [
  {
    id_from: 936503,
    wishes: 'просто по фиге',
    ozon_address: 'Новосибирск, улица Кошурникова, 24/1',
    wb_address: 'г Новосибирск, Улица Кошурникова 29/3',
    gender: 'МУЖИИИИИИИИИИИИИИИИИИК'
  }
]