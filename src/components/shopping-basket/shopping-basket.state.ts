import { atom, selector } from "recoil";
import { Item } from "../item-list/item.service";

export type GroupedItem = Omit<Item, "price"> & {
  unitPrice: number;
  quantity: number;
};

type ShoppingBasketCalculation = {
  groupedItems: GroupedItem[];
  totalCost: number;
};

export const shoppingBasketItemsState = atom({
  key: "shoppingBasketItemsState",
  default: [] as Item[],
});

export const shoppingBasketCalculationState = selector<ShoppingBasketCalculation>(
  {
    key: "shoppingBasketCalculationState",
    get: ({ get }) => {
      const itemsInBasket = get(shoppingBasketItemsState);

      const groupedItems = group(itemsInBasket);
      const totalCost = calculateTotalCostOf(groupedItems);

      return {
        groupedItems,
        totalCost,
      };
    },
  }
);

function group(itemsInBasket: Item[]): GroupedItem[] {
  const groupedItems = [] as GroupedItem[];

  itemsInBasket.forEach((item) => {
    const groupItemIndex = groupedItems.findIndex(
      (existingItemInTheSummary) => existingItemInTheSummary.id === item.id
    );

    if (groupItemIndex >= 0) {
      const existingGroupItem = groupedItems[groupItemIndex];
      groupedItems[groupItemIndex] = {
        ...existingGroupItem,
        quantity: existingGroupItem.quantity + 1,
      };
    } else {
      const { id, name, imageUrl } = item;

      groupedItems.push({
        id,
        name,
        imageUrl,
        unitPrice: item.price,
        quantity: 1,
      });
    }
  });

  return groupedItems;
}

function calculateTotalCostOf(groupedItems: GroupedItem[]): number {
  const totalCost = groupedItems.reduce(
    (ack, item) => ack + item.unitPrice * item.quantity,
    0
  );
  return totalCost;
}
