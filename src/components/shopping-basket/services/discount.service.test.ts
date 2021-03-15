import { applyDiscount } from "./discount.service";
import { multiBuyPromotionOf } from "./promotion.service";
import { GroupedItem } from "../state/shopping-basket.state";

jest.mock("./promotion.service");
const mockMultiBuyPromotion = multiBuyPromotionOf as jest.MockedFunction<
  typeof multiBuyPromotionOf
>;

describe("discount service", () => {
  describe("applyDiscount", () => {
    it("should not apply discount if there is no item", () => {
      const result = applyDiscount([]);

      expect(result).toEqual([]);
    });

    it("should apply item multi-buy amount discount", () => {
      const items: GroupedItem[] = [
        {
          id: "1",
          name: "Item",
          imageUrl: "/img-url",
          unitPrice: 12,
          quantity: 12,
        },
      ];
      mockMultiBuyPromotion.mockReturnValue({
        name: "Buy 2 Get 1 Free",
        itemId: "1",
        discountType: "giveAwayAmount",
        buyAmount: 6,
        giveAwayAmount: 1,
      });

      const result = applyDiscount(items);

      expect(result).toEqual([
        {
          itemId: "1",
          promotionName: "Buy 2 Get 1 Free",
          reducedPay: 24,
        },
      ]);
    });

    it("should apply item multi-buy pay discount", () => {
      const items: GroupedItem[] = [
        {
          id: "1",
          name: "Item",
          imageUrl: "/img-url",
          unitPrice: 12,
          quantity: 6,
        },
      ];
      mockMultiBuyPromotion.mockReturnValue({
        name: "Buy 2 Get 1 Free",
        itemId: "1",
        discountType: "giveAwayPay",
        buyAmount: 2,
        giveAwayPay: 1,
      });

      const result = applyDiscount(items);

      expect(result).toEqual([
        {
          itemId: "1",
          promotionName: "Buy 2 Get 1 Free",
          reducedPay: 3,
        },
      ]);
    });
  });
});
