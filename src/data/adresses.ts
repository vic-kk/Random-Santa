export interface Address {
  id_from: number;
  wishes: string;
  ozon_address: string;
  wb_address: string;
}

export const ADDRESSES: Readonly<Address[]> = [
  {
    id_from: 936503,
    wishes: '',
    ozon_address: 'Новосибирск, улица Кошурникова, 24/1',
    wb_address: 'г Новосибирск, Улица Кошурникова 29/3',
  }
]