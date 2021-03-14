export type Item = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export const itemList = (): Item[] | undefined => {
  return [
    {
      id: "1",
      name: "Face Mask",
      price: 2.5,
      imageUrl: "/placeholder.png",
    },
    {
      id: "2",
      name: "Toilet Paper",
      price: 0.65,
      imageUrl: "/placeholder.png",
    },
    {
      id: "3",
      name: "Hand Sanitizer",
      price: 19.99,
      imageUrl: "/placeholder.png",
    },
  ];
};
