import { render } from "@testing-library/react";
import { App } from "./app";
import { byText } from "testing-library-selector";
import { useRecoilValue } from "recoil";

jest.mock("recoil");
const mockUseRecoilValue = useRecoilValue as jest.MockedFunction<
  typeof useRecoilValue
>;

jest.mock("../item-list/item-list", () => ({
  ItemList: () => <div>Item List</div>,
}));

jest.mock("../shopping-basket/shopping-basket", () => ({
  ShoppingBasket: () => <div>Shopping Basket</div>,
}));

jest.mock("../receipt/receipt", () => ({
  Receipt: () => <div>Receipt</div>,
}));

describe("app", () => {
  const ui = {
    itemList: byText("Item List"),
    shoppingBasket: byText("Shopping Basket"),
    receipt: byText("Receipt"),
  };

  const setShoppingStatusAsContinue = () => {
    mockUseRecoilValue.mockReturnValue({
      isShoppingDone: false,
    });
  };

  const setShoppingStatusAsDone = () => {
    mockUseRecoilValue.mockReturnValueOnce({
      isShoppingDone: true,
    });
  };

  it("should render item list component", () => {
    setShoppingStatusAsContinue();

    render(<App />);

    expect(ui.itemList.get()).toBeInTheDocument();
  });

  it("should render shopping basket component", () => {
    setShoppingStatusAsContinue();

    render(<App />);

    expect(ui.shoppingBasket.get()).toBeInTheDocument();
  });

  it("should render receipt when shopping is done", () => {
    setShoppingStatusAsDone();

    render(<App />);

    expect(ui.receipt.get()).toBeInTheDocument();
  });
});
