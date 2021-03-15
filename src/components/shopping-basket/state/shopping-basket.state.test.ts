import { snapshot_UNSTABLE } from "recoil";
import {
  shoppingBasketCalculationState,
  shoppingBasketItemsState,
} from "./shopping-basket.state";
import { applyDiscount } from "../services/discount/discount.service";

jest.mock("../services/discount/discount.service", () => ({
  applyDiscount: jest.fn(),
}));
const mockApplyDiscountTo = applyDiscount as jest.MockedFunction<
  typeof applyDiscount
>;
describe("shopping basket state", () => {
  describe("shoppingBasketCalculateState", () => {
    it("should return defaults if there is no item", () => {
      mockApplyDiscountTo.mockReturnValue([]);
      const initialSnapshot = snapshot_UNSTABLE();

      expect(
        initialSnapshot
          .getLoadable(shoppingBasketCalculationState)
          .valueOrThrow()
      ).toEqual({
        groupedItems: [],
        discounts: [],
        totalCost: "0.00",
        totalDiscount: "0.00",
        totalPay: "0.00",
      });
    });

    it("should return calculation if there are items", () => {
      mockApplyDiscountTo.mockReturnValue([
        {
          itemId: "1",
          promotionName: "Test",
          reducedPay: 3,
        },
      ]);
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
        discounts: [
          {
            itemId: "1",
            promotionName: "Test",
            reducedPay: 3,
          },
        ],
        totalCost: "8.00",
        totalDiscount: "3.00",
        totalPay: "5.00",
      });
    });
  });
});
