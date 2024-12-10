export interface Address {
  id_from: number;
  wishes: string;
  ozon_address: string;
  gender: string;
  wb_address: string;
}

export const ADDRESSES: Readonly<Address[]> = [
  {
    id_from: 489553,
    gender: "Дивчина",
    wishes: "https://ohmywishes.ru/users/5163bae65871745510307641",
    ozon_address: "Уфа. Левитана 38/3",
    wb_address: "Уфа. Левитана 38/3"
  },
  {
    id_from: 990640,
    gender: "МУЖИК",
    wishes: "Только не кружку, больше нет места для хранения",
    ozon_address: "Новосибирск, улица Кошурникова, 24/1",
    wb_address: "г Новосибирск, Улица Кошурникова, 29/3"
  },
  {
    id_from: 148870,
    gender: "МУЖИК",
    wishes: "",
    ozon_address: "Мурино. Шоссе в Лаврики 72к2 ",
    wb_address: "Шоссе в Лаврики 72к4"
  },
  {
    id_from: 206913,
    gender: "МУЖИК",
    wishes: "",
    ozon_address: "142117, обл. Московская, г. Подольск, ул. Высотная, д. 3в",
    wb_address: "142117, обл. Московская, г. Подольск, ул. Высотная ул., Д. 7"
  },
  {
    id_from: 395769,
    gender: "МУЖИК",
    wishes: "",
    ozon_address: "СТ. Брюховецкая, улица красная 226",
    wb_address: "СТ. Брюховецкая. улица пролетарская 257"
  },
  {
    id_from: 554197,
    gender: "Дивчина",
    wishes: "Дорогой Санта, подари мне что-то, что у меня могло бы ассоциироваться с тобой! (только не вагинатор или вибропулю и т.д.). Если затруднительно - просто лови мой вишлист: https://ohmywishes.com/users/semyonovna",
    ozon_address: "Смоленск, Краснинское шоссе, д. 30",
    wb_address: "Смоленск, Краснинское шоссе, д 18"
  },
  {
    id_from: 860130,
    gender: "МУЖИК",
    wishes: "",
    ozon_address: "Минск, проспект Дзержинского, 90",
    wb_address: "Минск, Минск, проспект Газеты Правда, 1"
  },
  {
    id_from: 897425,
    gender: "МУЖИК",
    wishes: "",
    ozon_address: "Московская область, г. Одинцово, ул. Можайское шоссе, д. 83А",
    wb_address: "Московская область, г. Одинцово, ул. Можайское шоссе, д. 38Г"
  },
  {
    id_from: 634193,
    gender: "МУЖИК",
    wishes: "",
    ozon_address: "Г. Самара, ул. Советской Армии 132",
    wb_address: "Самара. ул. Калинина 14"
  },
  {
    id_from: 536535,
    gender: "МУЖИК",
    wishes: "Хочу топчики с вами пилить на НГ",
    ozon_address: "Нет",
    wb_address: "Г. Владикавказ, улица Павленко 75"
  }
]