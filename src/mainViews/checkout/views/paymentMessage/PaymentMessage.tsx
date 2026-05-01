import React, { useEffect, useState } from "react";
import { Alert, Col, Form } from "react-bootstrap";
import { getTermTextCondition } from "@/shared/InternalServices";
import { useRootContext } from "@/contexts/RootContext";
import { MINIMUM_PURCHASED_AMOUNT } from "@/shared/constant";
import instance from "@/services/baseServices";

interface Props {
  termCondition: boolean;
  totalAmount: number;
  setTermCondition: (e: boolean) => void;
  title: string;
  description: string;
}

export const PaymentMessages = ({ totalAmount, setTermCondition, termCondition, title, description }: Props) => {
  const { currentCartItem, loggedInUser } = useRootContext();
  // const [termCondition, setTermCondition] = useState(false);
  const [planId, setPlanId] = useState<string | null>(null);
  //   const [loading, setLoading] = useState(true);
  const [vpnLoading, setVpnLoading] = useState(false);
  const [vpnObj, setVpnObj] = useState<any>(null);

  //   const [vpnLoading, setVpnLoading] = useState(false);

  const checkIfVpn = async () => {
    setVpnLoading(true);
    try {
      const res = await instance.post("/checkIfVpnIsUsed");
      setVpnObj(res?.data);

      setVpnLoading(false);
    } catch (error) {
      setVpnLoading(false);

      // console.error("Error fetching VPN data", error);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      checkIfVpn();
    }
  }, [loggedInUser]);

  const onChangeTermCondition = (event: any) => {
    setTermCondition(event.target.checked);
  };

  return (
    <>
      <Col xs={12}>
        <p className="mb-2">
          <b>{title}</b>
        </p>
        <p>{description}</p>

        {totalAmount < MINIMUM_PURCHASED_AMOUNT && (
          <p style={{ color: "red" }}>The minimum order amount is ${MINIMUM_PURCHASED_AMOUNT} to proceed to checkout.</p>
        )}
      </Col>
      <Col xs={12}>{getTermTextCondition(termCondition, onChangeTermCondition)}</Col>

      <br />
      {!vpnLoading && vpnObj === "yes" ? (
        <Alert variant="danger" className="mt-3">
          {!vpnLoading && vpnObj === "yes" && (
            <>
              It looks like you&apos;re using a VPS, VPN, or cloud server. <br /> <br /> Please turn it off and refresh your browser. <br />{" "}
              Otherwise, our system may reject the payment, hold the money for a few days through PayPal, and then issue a refund
            </>
          )}
          {/* {!termCondition && <>Please accept our terms and conditions to continue.</>} */}
        </Alert>
      ) : null}

      {!termCondition && <Alert variant="warning">{!termCondition && <>Please accept our terms and conditions to continue.</>}</Alert>}
    </>
  );
};
