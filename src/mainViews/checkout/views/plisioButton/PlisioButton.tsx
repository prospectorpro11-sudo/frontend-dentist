'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import instance from "../../../../services/baseServices";

import { PAYMENT_METHOD } from "../../../../shared/enums";
import {
  generateRandomPassword,
  makeOrderAction,
  triggerForm,
} from "../../../../shared/InternalService";
import { setPlisioLocal } from "@/services/tokenService";
import { useRootContext } from "@/contexts/RootContext";
import Button from "@/components/button/Button";

interface IPlisioButton {
  termCondition: boolean;
  editBillingEnable: boolean;
  selectedCoin: string;
}

const PlisioButton = (props: IPlisioButton) => {
  const router = useRouter();
  const { termCondition, editBillingEnable, selectedCoin } = props;
  const [plisioLoading, setPlisioLoading] = useState(false);

  const {
    currentCartItem,
    loggedInUser,
    setCurrentCartItem,
    setCryptoModalVisible,
    totalCartAmount,
    promoCode,
  } = useRootContext();

  const pressPlisioCrypto = async () => {
    setPlisioLoading(true);

    const orderId = generateRandomPassword();
    setPlisioLocal({
      currentCartItem: currentCartItem,
      totalAmount: totalCartAmount,
      loggedInUser: loggedInUser,
      orderId,
    });

    try {
      const repsonse: any = await instance.post("createTransaction", {
        coin: selectedCoin,
        email: loggedInUser?.email,
        amount: totalCartAmount,
        orderId,
      });

      if (repsonse.data?.checkout_url) {
        makeOrderAction(
          currentCartItem,
          totalCartAmount,
          // null,
          loggedInUser,
          "",
          "",
          setCurrentCartItem,
          router,
          setCryptoModalVisible,
          () => { },
          PAYMENT_METHOD.CRYPTO_PLISIO_INITIALIZED,
          orderId,
          promoCode,
          repsonse.data
        );

        const newWin = window.open(repsonse.data?.checkout_url);

        if (!newWin || newWin.closed || typeof newWin.closed == "undefined") {
          triggerForm({
            title: "",
            text: "Our Plisio window was blocked by your Browser. Please allow popup and redirects",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        triggerForm({
          title: "",
          text:
            repsonse.data?.extra?.data?.error || "Coin Payment URL  Not Found",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      setPlisioLoading(false);
    } catch (error: any) {
      triggerForm({
        title: "",
        text: error.response.data?.message || error.response.data,
        icon: "error",
        confirmButtonText: "OK",
      });

      setPlisioLoading(false);
    }
  };

  return (
    <Button
      disabled={
        !loggedInUser ||
        !currentCartItem.length ||
        !termCondition ||
        editBillingEnable
      }
      isLoading={plisioLoading}
      onClick={pressPlisioCrypto}
    >
      Proceed to Crypto Payment
    </Button>
  );
};

export default PlisioButton;
