import { render } from "@testing-library/react";
import { App } from "./app";
import { byText } from "testing-library-selector";

jest.mock("recoil");

describe("app", () => {
  const ui = {
    itemList: byText("Item List"),
    shoppingBasket: byText("Shopping Basket"),
  };

  it("should render item list component", () => {
    render(<App />);

    expect(ui.itemList.get()).toBeInTheDocument();
  });

  it("should render shopping basket component", () => {
    render(<App />);

    expect(ui.shoppingBasket.get()).toBeInTheDocument();
  });
});
