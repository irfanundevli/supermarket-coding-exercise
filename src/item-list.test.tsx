import { render, screen } from "@testing-library/react";
import { ItemList } from "./item-list";
import { Item, itemList } from "./item.service";

jest.mock("./item.service");
const mockItemList = itemList as jest.MockedFunction<typeof itemList>;

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

    expect(screen.getByText("Add to Basket")).toBeInTheDocument();
  });
});
