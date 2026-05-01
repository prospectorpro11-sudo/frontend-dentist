'use client';
import Link from "next/link";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useMemo, useState } from "react";
import { verifyEmail } from "@/database/Authentication";


import styles from "../paypal.module.scss";
import CryptoSelection from "./CryptoSelection";
import Button from "@/components/button/Button";
import PlisioButton from "../plisioButton/PlisioButton";
import { useRootContext } from "@/contexts/RootContext";
import { conditionBeforePayment, getTermTextCondition } from "@/shared/InternalServices";

interface ICryptoPaymentView {
  editBillingEnable: boolean;
  blockListObjectExist: boolean;
}

const CryptoPaymentView = (props: ICryptoPaymentView) => {
  const { editBillingEnable, blockListObjectExist } = props;
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [termCondition, setTermCondition] = useState(false);
  const {
    currentCartItem,
    setCryptoModalVisible,
    loggedInUser,
    setAuthEnable,
  } = useRootContext();

  const includCompletedDatabase = useMemo(
    () => currentCartItem?.some((element: any) => element?.isCompleteDatabase),
    [currentCartItem]
  );

  const onChangeTermCondition = (event: any) => {
    setTermCondition(event.target.checked);
  };

  const pressVerifyEmail = () => {
    verifyEmail();
  };

  const pressLogin = () => {
    setAuthEnable(true);
  };

  const onSelectedCoin = (coin: string) => {
    setSelectedCoin(coin);
  };

  if (includCompletedDatabase) {
    return (
      <div className="mt-4">
        You have selected one or more complete databases to your cart.
        <br />
        Crypto payment cannot be used for the complete database and you have to
        use either <span className="text-highlight">Paypal</span> or{" "}
        <span className="text-highlight">
          {" "}
          <Link href="/contact-us">Contact Us</Link>{" "}
        </span>
        .
      </div>
    );
  }

  return (
    <div className={styles.paymentBody}>
      <Col xs={12}>
        <Row>
          <p className={styles.helperText}>Choose your preferred cryptocurrency network for this payment.</p>
          <div className={styles.coinsWrapper}>
            <CryptoSelection
              coin="BTC"
              name="Bitcoin"
              selectedCoin={selectedCoin}
              onSelectedCoin={onSelectedCoin}
              uniqueValue="flexRadioDefault-btc"
              icon="bitcoin"
            />
            <CryptoSelection
              coin="USDC"
              name="USD Coin (ERC20)"
              selectedCoin={selectedCoin}
              onSelectedCoin={onSelectedCoin}
              uniqueValue="flexRadioDefault-usdc"
              icon="usdc"
            />

            <CryptoSelection
              coin="USDC.BEP20"
              name="USD Coin (BSC Chain)"
              selectedCoin={selectedCoin}
              onSelectedCoin={onSelectedCoin}
              uniqueValue="flexRadioDefault-USDC.BEP20"
              icon="usdc"
            />

            <CryptoSelection
              coin="USDC.TRC20"
              name="USD Coin (Tron/TRC20)"
              selectedCoin={selectedCoin}
              onSelectedCoin={onSelectedCoin}
              uniqueValue="flexRadioDefault-USDC.TRC20"
              icon="usdc"
            />

            <CryptoSelection
              coin="USDT.BEP20"
              name="Tether USD (BSC Chain)"
              selectedCoin={selectedCoin}
              onSelectedCoin={onSelectedCoin}
              uniqueValue="flexRadioDefault-USDT.BEP20"
              icon="usdt"
            />

            <CryptoSelection
              coin="USDT.ERC20"
              name="Tether USD (ERC20)"
              selectedCoin={selectedCoin}
              onSelectedCoin={onSelectedCoin}
              uniqueValue="flexRadioDefault-USDT.ERC20"
              icon="usdt"
            />

            <CryptoSelection
              coin="USDT.TRC20"
              name="Tether USD (Tron/TRC20)"
              selectedCoin={selectedCoin}
              onSelectedCoin={onSelectedCoin}
              uniqueValue="flexRadioDefault-USDT.TRC20"
              icon="usdt"
            />
          </div>
        </Row>
      </Col>
      <Col xs={12} className={styles.termsWrap}>
        {getTermTextCondition(termCondition, onChangeTermCondition)}
      </Col>
      {conditionBeforePayment(
        loggedInUser,
        pressVerifyEmail,
        pressLogin,
        currentCartItem
      )}
      {blockListObjectExist ? (
        <Button
          disabled={
            !loggedInUser ||
            !currentCartItem.length ||
            !termCondition ||
            editBillingEnable
          }
          className="mt-4"
          onClick={() => setCryptoModalVisible(true)}
        >
          Request a crypto payment for this order
        </Button>
      ) : (
        <div className={styles.actionArea}>
          <PlisioButton
            termCondition={termCondition}
            editBillingEnable={editBillingEnable}
            selectedCoin={selectedCoin}
          />
        </div>
      )}
    </div>
  );
};

export default CryptoPaymentView;
