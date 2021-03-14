import { atom } from "recoil";
import { Item } from "../item-list/item.service";

export const shoppingBasketItemsState = atom({
  key: "shoppingBasketItemsState",
  default: [] as Item[],
});
