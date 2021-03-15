import { GroupedItem } from "../../state/shopping-basket.state";

type DiscountType = "giveAwayAmount" | "giveAwayPay";

export type MultiBuyPromotion = {
  name: string;
  itemId: string;
  discountType: DiscountType;
  buyAmount: number;
  giveAwayAmount?: number;
  giveAwayPay?: number;
};

export function multiBuyPromotionOf(
  item: GroupedItem
): MultiBuyPromotion | undefined {
  return multiBuyPromotions().find((promotion) => promotion.itemId === item.id);
}

export function multiBuyPromotions(): MultiBuyPromotion[] {
  return [
    {
      name: "Toilet Paper 6 for 5",
      itemId: "2",
      discountType: "giveAwayAmount",
      buyAmount: 6,
      giveAwayAmount: 1,
    },
    {
      name: "Two Face Masks for £4",
      itemId: "1",
      discountType: "giveAwayPay",
      buyAmount: 2,
      giveAwayPay: 1,
    },
  ];
}
