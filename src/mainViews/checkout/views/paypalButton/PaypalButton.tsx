import { useEffect, useState } from "react";
import {
  DISPATCH_ACTION,
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

import { verifyEmail } from "../../../../database/Authentication";
import { PAYMENT_METHOD } from "../../../../shared/enums";
import { orderCancelled, orderFailed } from "../../../../shared/emailSend";
import { generateRandomPassword, makeOrderAction } from "../../../../shared/InternalService";
import { useRootContext } from "@/contexts/RootContext";
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import { conditionBeforePayment } from "@/shared/InternalServices";

// This values are the props in the UI
// const amount = "2";
const currency = "USD";
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, totalAmount, termCondition, editBillingEnable, currentPaymentMethod }: any) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const router = useRouter();
  const { currentCartItem, setCurrentCartItem, loggedInUser, setAuthEnable, userPrivateInfo, promoCode } = useRootContext();

  const [loading, setLoading] = useState(false);

  const reset = () => {
    dispatch({
      type: DISPATCH_ACTION.RESET_OPTIONS,
      value: {
        ...options,
        currency: currency,
      },
    });
  };

  useEffect(() => {
    reset();
  }, [termCondition]);

  const pressLogin = () => {
    setAuthEnable(true);
  };

  const pressVerifyEmail = () => {
    verifyEmail();
  };

  const createOrder = (data: any, actions: any) => {
    let realAmount = 0;
    const currentItems = currentCartItem.map((element) => {
      realAmount += element.price;
      return {
        name: `${element?.productName} - Download Link available for 6 Months`,
        quantity: 1,
        category: "DIGITAL_GOODS",
        unit_amount: {
          currency_code: currency,
          value: element.price,
        },
      };
    });

    const discount = realAmount - totalAmount;

    const items = currentItems.map((element) => {
      const updateProductName = element.name.length > 115 ? element.name.substring(0, 115) + "..." : element.name;

      return { ...element, name: updateProductName };
    });

    return actions.order
      .create({
        intent: "AUTHORIZE",
        purchase_units: [
          {
            amount: {
              breakdown: {
                item_total: {
                  currency_code: currency,
                  value: realAmount,
                },
                discount: {
                  currency_code: currency,
                  value: discount,
                },
              },
              currency_code: currency,
              value: totalAmount,
            },
            items: items || [],
          },
        ],
        application_context: {
          brand_name: WEBSITE_SEO_TITLE,
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId: string) => {
        // Your code here after create the order
        return orderId;
      });
  };

  const onApprove = (data: any, actions: any) => {
    setLoading(true);
    return actions.order.authorize().then(function () {
      makeOrderAction(
        currentCartItem,
        totalAmount,
        // userPrivateInfo,
        loggedInUser,
        null,
        null,
        setCurrentCartItem,
        router,
        () => {},
        setLoading,
        PAYMENT_METHOD.PAYPAL,
        generateRandomPassword(),
        promoCode
      );
    });
  };

  const onError = async () => {
    orderFailed(loggedInUser);
    setLoading(false);
  };

  const onCancel = async () => {
    orderCancelled(loggedInUser);
    setLoading(false);
  };

  const isDiabled = !loggedInUser || !currentCartItem.length || !termCondition || !loggedInUser?.country || editBillingEnable;

  return (
    <>
      {loading && <div className="loader">Loading...</div>}
      {conditionBeforePayment(loggedInUser, pressVerifyEmail, pressLogin, currentCartItem)}
      <PayPalButtons
        disabled={isDiabled}
        forceReRender={[totalAmount, currency, style]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
        onCancel={onCancel}
        onError={onError}
        style={{ label: "checkout" }}
      />
    </>
  );
};

export default function PaypalButton(props: any) {
  const { totalAmount, termCondition, editBillingEnable, currentPaymentMethod } = props;

  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          components: "buttons",
          currency: "USD",
          intent: "authorize",
          vault: true,
        }}
      >
        <ButtonWrapper
          totalAmount={totalAmount}
          currency={currency}
          showSpinner={false}
          termCondition={termCondition}
          editBillingEnable={editBillingEnable}
          currentPaymentMethod={currentPaymentMethod}
        />
      </PayPalScriptProvider>
    </div>
  );
}
