import React from "react";

import EmptyCart from "./views/EmptyCart";
import CartListView from "./views/CartList";
import { useRootContext } from "@/contexts/RootContext";
import { addToCartLocal } from "@/services/tokenService";

const CartMainView = () => {
  const { currentCartItem, setCurrentCartItem } = useRootContext();
  console.log(currentCartItem, "checker")

  const pressRemove = (productName: string) => {
    const newProductList = [...currentCartItem];
    const newProductListState = newProductList.filter(function (obj) {
      return obj.productName !== productName;
    });

    setCurrentCartItem(newProductListState);
    addToCartLocal(newProductListState)
  };

  return currentCartItem.length ? (
    <CartListView pressRemove={pressRemove} productList={currentCartItem} />
  ) : (
    <EmptyCart />
  );
};

export default CartMainView;
