import { GroupedItem } from "../../state/shopping-basket.state";
import { multiBuyPromotionOf } from "../promotion/promotion.service";

export type Discount = {
  itemId: string;
  promotionName: string;
  reducedPay: number;
};

export function applyDiscount(itemsInBasket: GroupedItem[]): Discount[] {
  return applyItemMultiBuyDiscountTo(itemsInBasket);
}

function applyItemMultiBuyDiscountTo(items: GroupedItem[]): Discount[] {
  const discounts: Discount[] = [];

  items.forEach((item) => {
    const promotion = multiBuyPromotionOf(item);

    if (promotion) {
      if (item.quantity >= promotion.buyAmount) {
        if (promotion.discountType === "giveAwayAmount") {
          const numberOfGiveAway = Math.floor(
            item.quantity / promotion.buyAmount
          );

          discounts.push({
            itemId: item.id,
            promotionName: promotion.name,
            reducedPay: item.unitPrice * numberOfGiveAway,
          });
        }

        if (promotion.discountType === "giveAwayPay") {
          const numberOfGiveAway = Math.floor(
            item.quantity / promotion.buyAmount
          );

          discounts.push({
            itemId: item.id,
            promotionName: promotion.name,
            reducedPay: promotion.giveAwayPay!! * numberOfGiveAway,
          });
        }
      }
    }
  });

  return discounts;
}
