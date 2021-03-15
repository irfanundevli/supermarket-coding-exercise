import { multiBuyPromotionOf } from "./promotion.service";
import { GroupedItem } from "./shopping-basket.state";

describe("promotion service", () => {
  it("should return promotion by seacrhing item id", () => {
    const item: GroupedItem = {
      id: "1",
      name: "name",
      imageUrl: "",
      quantity: 1,
      unitPrice: 2,
    };

    const result = multiBuyPromotionOf(item);

    expect(result).not.toBeUndefined();
  });
});
