export type Item = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export const itemList = (): Item[] => {
  return [
    {
      id: "1",
      name: "Face Mask",
      price: 2.5,
      imageUrl: "/images/face-mask.svg",
    },
    {
      id: "2",
      name: "Toilet Paper",
      price: 0.65,
      imageUrl: "/images/toilet-paper.svg",
    },
    {
      id: "3",
      name: "Hand Sanitizer",
      price: 19.99,
      imageUrl: "/images/hand-sanitizer.svg",
    },
  ];
};
