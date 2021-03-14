import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { byText } from "testing-library-selector";
import { ItemList, addNewItemToCurrentItemList } from "./item-list";
import { Item, itemList } from "./item.service";
import { useSetRecoilState } from "recoil";

jest.mock("./item.service");
const mockItemList = itemList as jest.MockedFunction<typeof itemList>;

jest.mock("recoil");
const mockUseSetRecoilState = useSetRecoilState as jest.MockedFunction<
  typeof useSetRecoilState
>;

describe("item list component", () => {
  const item1 = {
    id: "1",
    name: "Face Mask",
    price: 2.5,
    imageUrl: "/placeholder1.png",
  };

  const item2 = {
    id: "2",
    name: "Toilet Paper",
    price: 0.65,
    imageUrl: "/placeholder2.png",
  };

  const setItems = (itemList: Item[]) => {
    mockItemList.mockReturnValue(itemList);
  };

  // resuable selectors
  const ui = {
    addToBasketButton: byText("Add to Basket"),
  };

  it("should render items", () => {
    setItems([item1, item2]);

    render(<ItemList />);

    expect(screen.getByText(item1.name)).toBeInTheDocument();
    expect(screen.getByText(item1.price)).toBeInTheDocument();
    expect(screen.getByAltText(item1.name)).toBeInTheDocument();

    expect(screen.getByText(item2.name)).toBeInTheDocument();
    expect(screen.getByText(item2.price)).toBeInTheDocument();
    expect(screen.getByAltText(item2.name)).toBeInTheDocument();
  });

  it("should render a button to add item to basket", () => {
    setItems([item1]);

    render(<ItemList />);

    expect(ui.addToBasketButton.get()).toBeInTheDocument();
  });

  it("should add new item to basket when add to basket is clicked", () => {
    setItems([item1]);
    const mockSetShopBasketItems = jest.fn();
    mockUseSetRecoilState.mockReturnValue(mockSetShopBasketItems);

    render(<ItemList />);
    userEvent.click(ui.addToBasketButton.get());

    expect(mockSetShopBasketItems).toHaveBeenNthCalledWith(
      1,
      expect.any(Function)
    );
  });
});

describe("addNewItemToCurrentItemList", () => {
  const item: Item = {
    id: "1",
    name: "Face Mask",
    price: 2.5,
    imageUrl: "/placeholder1.png",
  };

  it("should add new item to existing empty item list", () => {
    const result = addNewItemToCurrentItemList(item, []);

    expect(result).toEqual([item]);
  });

  it("should add new item to existing item list", () => {
    const existingItemList = [item, item];

    const result = addNewItemToCurrentItemList(item, existingItemList);

    expect(result).toEqual([item, item, item]);
  });
});
