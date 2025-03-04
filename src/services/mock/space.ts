export const spaceListMock = Array.from({ length: 25 }, (_, index) => ({
    id: "id" + index,
    image: `https://alakt-photos-kr.kcdn.kz/webp/ef/ef331a98-b76d-45af-9e27-e270be950f13/1-750x470.webp`,
    title: `Помещение №${index + 1}`,
    price: 50000 + index * 2000,
    location: `Город: Москва, Район: Центральный, Улица: Ленина, ${index + 1}`,
  }));