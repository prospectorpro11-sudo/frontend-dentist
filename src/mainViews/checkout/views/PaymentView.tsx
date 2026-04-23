import Image from "next/image";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import classNames from "classnames";

import styles from "./paypal.module.scss";
import { PAYMENT_METHOD } from "@/shared/enums";
import PaypalView from "./paypalView/PaypalView";
import { useRootContext } from "@/contexts/RootContext";
import CryptoPaymentView from "./cryptoPaymentView/CryptoPaymentView";
import StripePaymentButtonWrapper from "./stripePaymentButton/StripePaymentButton";

interface IPaymentView {
  editBillingEnable: boolean;
}

const PaymentView = (props: IPaymentView) => {
  const { editBillingEnable } = props;
  const [blockListObjectExist, setBlockListObjectExist] = useState(false);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(PAYMENT_METHOD.PAYPAL);
  const { setCartEnable, currentCartItem, loggedInUser, totalCartAmount } = useRootContext();

  useEffect(() => {
    if (currentCartItem?.length) {
      let isBlockListObject = false;

      setBlockListObjectExist(isBlockListObject);
    } else {
      setCartEnable(false);
    }
  }, [currentCartItem?.length]);

  const onChangePaypal = () => {
    setCurrentPaymentMethod(PAYMENT_METHOD.PAYPAL);
  };

  const onChangeCrypto = () => {
    setCurrentPaymentMethod(PAYMENT_METHOD.CRYPTO);
  };

  const onChangeStripe = () => {
    setCurrentPaymentMethod(PAYMENT_METHOD.STRIPE);
  };

  return (
    <Row className={styles.wrapper}>
      {loggedInUser ? (
        <>
          {/* <Col xs={4} md="4">
            <div className="mt-3 mt-md-0">
              <input
                className="form-check-input d-none"
                type="radio"
                name="flexRadioDefault"
                checked={currentPaymentMethod == PAYMENT_METHOD.STRIPE}
                id="flexRadioDefault2"
                onClick={onChangeStripe}
              />
              <label
                className={classNames(styles.radioButton, {
                  [styles.active]: currentPaymentMethod === PAYMENT_METHOD.STRIPE,
                })}
                htmlFor="flexRadioDefault2"
              >
                <div className={classNames(styles.paypal, styles.secondButton)}>
                  <Image alt="Stripe Logo" src="/stripe_logo1.png" objectFit="scale-down" width={200} height={30} />
                </div>
              </label>
            </div>
          </Col> */}
          <Col xs={4} md="4" className="pe-0">
            <div className="">
              <input
                className="form-check-input d-none"
                type="radio"
                name="flexRadioDefault"
                checked={currentPaymentMethod == PAYMENT_METHOD.PAYPAL}
                id="flexRadioDefault1"
                onChange={onChangePaypal}
              />
              <label
                className={classNames(styles.radioButton, {
                  [styles.active]: currentPaymentMethod === PAYMENT_METHOD.PAYPAL,
                })}
                htmlFor="flexRadioDefault1"
              >
                <div className={styles.paypal}>
                  <Image
                    alt="Paypal Logo"
                    src="/paypal.png"
                    width={200}
                    height={30}
                    className={styles.paymentLogo}
                  />
                </div>
              </label>
            </div>
          </Col>
          <Col xs={4} md="4">
            <div className="">
              <input
                className="form-check-input d-none"
                type="radio"
                name="flexRadioDefault"
                checked={currentPaymentMethod == PAYMENT_METHOD.CRYPTO}
                id="flexRadioDefault3"
                onChange={onChangeCrypto}
              />
              <label
                className={classNames(styles.radioButton, {
                  [styles.active]: currentPaymentMethod === PAYMENT_METHOD.CRYPTO,
                })}
                htmlFor="flexRadioDefault3"
              >
                <div className={styles.paypal}>
                  <Image
                    alt="Coinpayment Logo"
                    src="/coinpayment_logo.png"
                    width={200}
                    height={30}
                    className={styles.paymentLogo}
                  />
                </div>
              </label>
            </div>
          </Col>

          <>
            {currentPaymentMethod === PAYMENT_METHOD.PAYPAL ? (
              <PaypalView totalAmount={totalCartAmount} editBillingEnable={editBillingEnable} currentPaymentMethod={currentPaymentMethod} />
            ) : currentPaymentMethod === PAYMENT_METHOD.STRIPE ? (
              <StripePaymentButtonWrapper />
            ) : (
              <CryptoPaymentView editBillingEnable={editBillingEnable} blockListObjectExist={blockListObjectExist} />
            )}
          </>
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
