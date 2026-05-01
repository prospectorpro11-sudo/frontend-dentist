import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";

import styles from "./paypal.module.scss";
import { PAYMENT_METHOD } from "@/shared/enums";
import PaypalView from "./paypalView/PaypalView";
import { useRootContext } from "@/contexts/RootContext";
import CryptoPaymentView from "./cryptoPaymentView/CryptoPaymentView";

interface IPaymentView {
  editBillingEnable: boolean;
}

const PaymentView = (props: IPaymentView) => {
  const { editBillingEnable } = props;
  const blockListObjectExist = false;
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(PAYMENT_METHOD.PAYPAL);
  const { setCartEnable, currentCartItem, loggedInUser, totalCartAmount } = useRootContext();

  useEffect(() => {
    if (!currentCartItem?.length) {
      setCartEnable(false);
    }
  }, [currentCartItem?.length, setCartEnable]);

  const onChangePaypal = () => {
    setCurrentPaymentMethod(PAYMENT_METHOD.PAYPAL);
  };

  const onChangeCrypto = () => {
    setCurrentPaymentMethod(PAYMENT_METHOD.CRYPTO);
  };

  return (
    <Row className={styles.wrapper}>
      {loggedInUser ? (
        <>
          <Col xs={12}>
            <div className={styles.methodList}>
              <input
                className="form-check-input d-none"
                type="radio"
                name="flexRadioDefault"
                checked={currentPaymentMethod == PAYMENT_METHOD.PAYPAL}
                id="payment-paypal"
                onChange={onChangePaypal}
              />
              <label
                className={classNames(styles.radioButton, styles.methodCard, {
                  [styles.active]: currentPaymentMethod === PAYMENT_METHOD.PAYPAL,
                })}
                htmlFor="payment-paypal"
              >
                <span className={styles.radioDot} aria-hidden="true" />
                <div className={styles.methodIconWrap}>
                  <span className={classNames(styles.methodBrand, styles.paypalBrand)}>
                    <FaPaypal size={16} />
                    <span>PayPal</span>
                  </span>
                </div>
                <div className={styles.methodContent}>
                  <span className={styles.methodTitle}>PayPal</span>
                  <span className={styles.methodHint}>Pay with your PayPal account or card</span>
                </div>
                <span className={styles.popularBadge}>Popular</span>
              </label>

              <input
                className="form-check-input d-none"
                type="radio"
                name="flexRadioDefault"
                checked={currentPaymentMethod == PAYMENT_METHOD.CRYPTO}
                id="payment-crypto"
                onChange={onChangeCrypto}
              />
              <label
                className={classNames(styles.radioButton, styles.methodCard, {
                  [styles.active]: currentPaymentMethod === PAYMENT_METHOD.CRYPTO,
                })}
                htmlFor="payment-crypto"
              >
                <span className={styles.radioDot} aria-hidden="true" />
                <div className={styles.methodIconWrap}>
                  <span className={classNames(styles.methodBrand, styles.cryptoBrand)}>
                    <BsCurrencyBitcoin size={14} />
                    <span>Crypto</span>
                  </span>
                </div>
                <div className={styles.methodContent}>
                  <span className={styles.methodTitle}>Cryptocurrency</span>
                  <span className={styles.methodHint}>BTC, ETH, LTC via CoinPayments</span>
                </div>
              </label>
            </div>
          </Col>

          <Col xs={12}>
            {currentPaymentMethod === PAYMENT_METHOD.PAYPAL ? (
              <PaypalView totalAmount={totalCartAmount} editBillingEnable={editBillingEnable} currentPaymentMethod={currentPaymentMethod} />
            ) : (
              <CryptoPaymentView editBillingEnable={editBillingEnable} blockListObjectExist={blockListObjectExist} />
            )}
          </Col>
        </>
      ) : (
        <>
          <p>
            We Accept{" "}
            <span className="text-highlight">
              Major Credit Card payments such as VISA, MasterCard, American Express, Discovery via PayPal Payment Gateway.
            </span>{" "}
          </p>

          <p>
            We also <span className="text-highlight">accept Bitcoin and USDC Crypto payments too</span>{" "}
          </p>

          <b>Payment methods will be enabled once your register and filled the billing address.</b>
        </>
      )}
    </Row>
  );
};

export default PaymentView;
