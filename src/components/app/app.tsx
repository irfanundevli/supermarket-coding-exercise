import React from "react";
import { ItemList } from "../item-list/item-list";
import { ShoppingBasket } from "../shopping-basket/shopping-basket";
import "./app.scss";
import { useRecoilValue } from "recoil";
import { appState } from "./state/app.state";
import { Receipt } from "../receipt/receipt";

export const App: React.FC = () => {
  const shopping = useRecoilValue(appState);

  return (
    <div className="c-app__container">
      {!shopping.isShoppingDone && (
        <>
          <ItemList />
          <ShoppingBasket />
        </>
      )}
      {shopping.isShoppingDone && <Receipt />}
    </div>
  );
};
