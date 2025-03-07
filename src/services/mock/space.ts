import { ISpace } from "../../types/space";

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
