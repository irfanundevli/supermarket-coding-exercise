import { useRecoilValue } from "recoil";
import {
  shoppingBasketCalculationState,
  shoppingBasketItemsState,
} from "../shopping-basket/state/shopping-basket.state";
import "./receipt.scss";
import { ReceiptDiscount } from "./services/receipt-discount/receipt-discount";
import { ReceiptItems } from "./services/receipt-items/receipt-items";
import { ReceiptTotalPay } from "./services/receipt-totalpay/receipt-totalpay";

export const Receipt: React.FC = () => {
  const items = useRecoilValue(shoppingBasketItemsState);
  const { discounts, totalCost, totalDiscount, totalPay } = useRecoilValue(
    shoppingBasketCalculationState
  );

  return (
    <div className="c-receipt">
      <ReceiptItems items={items} />

      <ReceiptDiscount
        discounts={discounts}
        totalCost={totalCost}
        totalDiscount={totalDiscount}
      />

      <ReceiptTotalPay totalPay={totalPay} />
    </div>
  );
};
