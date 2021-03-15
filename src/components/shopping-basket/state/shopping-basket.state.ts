import { atom, selector } from "recoil";
import { Item } from "../../item-list/services/item.service";
import {
  applyDiscount as applyDiscountTo,
  Discount,
} from "../services/discount.service";

export type GroupedItem = Omit<Item, "price"> & {
  unitPrice: number;
  quantity: number;
};

type ShoppingBasketCalculation = {
  groupedItems: GroupedItem[];
  totalCost: string;
  discounts: Discount[];
  totalPay: string;
  totalDiscount: string;
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
      const discounts = applyDiscountTo(groupedItems);
      const totalDiscount = discounts.reduce(
        (ack, discount) => ack + discount.reducedPay,
        0
      );
      const totalPay = totalCost - totalDiscount;

      return {
        groupedItems,
        totalCost: totalCost.toFixed(2),
        discounts,
        totalPay: totalPay.toFixed(2),
        totalDiscount: totalDiscount.toFixed(2),
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
