import { render } from "@testing-library/react";
import { App } from "./app";
import { byText } from "testing-library-selector";
import { RecoilRoot } from "recoil";

describe("app", () => {
  const ui = {
    itemList: byText("Item List"),
    shoppingBasket: byText("Shopping Basket"),
  };

  it("should render item list component", () => {
    render(<WrappedApp />);

    expect(ui.itemList.get()).toBeInTheDocument();
  });

  it("should render shopping basket component", () => {
    render(<WrappedApp />);

    expect(ui.shoppingBasket.get()).toBeInTheDocument();
  });
});

const WrappedApp = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};
