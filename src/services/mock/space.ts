import { ISpace, IViewSpace } from "../../types/space";

const paymentTypes = ["DAY", "MONTH", "HOUR"] as const;

export const spaceListMock: ISpace[] = Array.from(
  { length: 25 },
  (_, index) => ({
    id: "id" + index,
    imageUrl: `https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp`,
    title: `Помещение №${index + 1}`,
    price: 50000 + index * 2000,
    paymentType: paymentTypes[index % paymentTypes.length],
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
  paymentType: "MONTH",
  street: "ул. Абая",
  building: "15A",
  isCommercial: true,
  square: 120,
  floors: 3,
  hasDeposit: true,
};
