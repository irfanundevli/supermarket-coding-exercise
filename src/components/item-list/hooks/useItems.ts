import { useEffect, useState } from "react";
import {
  Item,
  itemList,
} from "../services/item-provider/item-provider.service";

export function useItems(): Item[] {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(itemList());
  }, []);

  return items;
}
