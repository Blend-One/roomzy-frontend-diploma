import { ISpace, ISpaceDetails, IViewSpace } from "../../types/space";

const paymentTypes = ["PER_DAY", "PER_MONTH", "PER_HOUR"] as const;

export const spaceListMock: ISpace[] = Array.from(
  { length: 25 },
  (_, index) => ({
    id: "id" + index,
    imageUrl: `https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp`,
    title: `Помещение №${index + 1}`,
    price: 50000 + index * 2000,
    priceUnit: paymentTypes[index % paymentTypes.length],
    street: "Ленина",
    building: `${index + 1}`,
    hasDeposit: Math.random() > 0.5,
    isCommercial: Math.random() > 0.5,
    square: Math.floor(Math.random() * 100) + 20,
    floors: Math.floor(Math.random() * 10) + 1,
  })
);

export const spaceMock: IViewSpace = {
  id: "1",
  images: [
    "https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp",
    "https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp",
    "https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp",
    "https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp",
    "https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp",
    "https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp",
    "https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp",
    "https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp",
    "https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp",
    "https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp",
  ],
  title: "Офис в центре города",
  price: 250000,
  paymentType: "PER_MONTH",
  street: "ул. Абая",
  building: "15A",
  isCommercial: true,
  square: 120,
  floors: 3,
  lat: "55.751574",
  long: "37.573856",
  hasDeposit: true,
};

export const spaceDetailsMock: ISpaceDetails[] = [
  {
    floor: 1,
    data: [
      {
        name: "Помещение",
        details: [
          { id: "location", name: "Локация" },
          { id: "area", name: "Площадь и планировка" },
          { id: "communications", name: "Коммуникации" },
        ],
      },
      {
        name: "Охрана",
        details: [
          { id: "condition", name: "Состояние и ремонт" },
          { id: "security", name: "Безопасность" },
          { id: "video_surveillance", name: "Система видеонаблюдения" },
        ],
      },
      {
        name: "Тип помещения",
        details: [
          { id: "access_control", name: "Охрана и контроль доступа" },
          { id: "fire_alarm", name: "Пожарная сигнализация" },
        ],
      },
    ],
  },
  {
    floor: 2,
    data: [
      {
        name: "Помещение",
        details: [
          { id: "location", name: "Локация" },
          { id: "area", name: "Площадь и планировка" },
          { id: "communications", name: "Коммуникации" },
        ],
      },
      {
        name: "Охрана",
        details: [
          { id: "condition", name: "Состояние и ремонт" },
          { id: "security", name: "Безопасность" },
          { id: "video_surveillance", name: "Система видеонаблюдения" },
        ],
      },
      {
        name: "Тип помещения",
        details: [
          { id: "access_control", name: "Охрана и контроль доступа" },
          { id: "fire_alarm", name: "Пожарная сигнализация" },
        ],
      },
    ],
  },
  {
    floor: 3,
    data: [
      {
        name: "Помещение",
        details: [
          { id: "location", name: "Локация" },
          { id: "area", name: "Площадь и планировка" },
          { id: "communications", name: "Коммуникации" },
        ],
      },
      {
        name: "Охрана",
        details: [
          { id: "condition", name: "Состояние и ремонт" },
          { id: "security", name: "Безопасность" },
          { id: "video_surveillance", name: "Система видеонаблюдения" },
        ],
      },
      {
        name: "Тип помещения",
        details: [
          { id: "access_control", name: "Охрана и контроль доступа" },
          { id: "fire_alarm", name: "Пожарная сигнализация" },
        ],
      },
    ],
  },
];
