import { snapshot_UNSTABLE } from "recoil";
import {
  shoppingBasketCalculationState,
  shoppingBasketItemsState,
} from "./shopping-basket.state";

describe("shopping basket state", () => {
  describe("shoppingBasketCalculateState", () => {
    it("should return defaults if there is no item", () => {
      const initialSnapshot = snapshot_UNSTABLE();

      expect(
        initialSnapshot
          .getLoadable(shoppingBasketCalculationState)
          .valueOrThrow()
      ).toEqual({
        groupedItems: [],
        totalCost: 0,
      });
    });

    it("should return calculation if there are items", () => {
      const initialSnapshot = snapshot_UNSTABLE(({ set }) =>
        set(shoppingBasketItemsState, [
          {
            id: "1",
            name: "Item",
            price: 2,
            imageUrl: "/img-url",
          },
          {
            id: "1",
            name: "Item",
            price: 2,
            imageUrl: "/img-url",
          },
          {
            id: "2",
            name: "Item 2",
            price: 4,
            imageUrl: "/img-url",
          },
        ])
      );

      expect(
        initialSnapshot
          .getLoadable(shoppingBasketCalculationState)
          .valueOrThrow()
      ).toEqual({
        groupedItems: [
          {
            id: "1",
            name: "Item",
            unitPrice: 2,
            imageUrl: "/img-url",
            quantity: 2,
          },
          {
            id: "2",
            name: "Item 2",
            unitPrice: 4,
            imageUrl: "/img-url",
            quantity: 1,
          },
        ],
        totalCost: 8,
      });
    });
  });
});
