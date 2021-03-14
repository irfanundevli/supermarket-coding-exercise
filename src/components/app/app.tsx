import React from "react";
import { ItemList } from "../item-list/item-list";
import { ShoppingBasket } from "../shopping-basket/shoping-basket";
import "./app.scss";

export const App: React.FC = () => {
  return (
    <div className="c-app__container">
      <ItemList />
      <ShoppingBasket />
    </div>
  );
};
