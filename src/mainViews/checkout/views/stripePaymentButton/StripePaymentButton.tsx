import Image from "next/image";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useRef, useState } from "react";
import { Button, Spinner, Card, Container, Col } from "react-bootstrap";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";

import styles from "./styles.module.scss";
import { PAYMENT_METHOD } from "@/shared/enums";
import { useRootContext } from "@/contexts/RootContext";
import { MINIMUM_PURCHASED_AMOUNT } from "@/shared/constant";
import { PaymentMessages } from "../paymentMessage/PaymentMessage";
import { generateRandomPassword, makeOrderAction, triggerForm } from "@/shared/InternalService";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// interface IStripePaymentButton {}
// props: IStripePaymentButton
const StripePaymentButton = () => {
  // const {setCheckoutStep} = props;

  const stripe = useStripe();
  const router = useRouter();
  const searchParams = useSearchParams();
  const elements = useElements();
  const { currentCartItem, totalCartAmount, setCurrentCartItem, loggedInUser, userPrivateInfo, promoCode } = useRootContext();

  // const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentVerifyingLoading, setPaymentVerifyingLoading] = useState(false);
  const [termCondition, setTermCondition] = useState(false);
  const email = loggedInUser?.email || "";
  const hasFetched = useRef(false);

  const stripeSessionId = searchParams.get("stripe_session_id");

  useEffect(() => {
    if (!stripeSessionId || hasFetched.current) return;

    const fetchSession = async () => {
      hasFetched.current = true; // prevent multiple calls
      try {
        setPaymentVerifyingLoading(true);
        const res = await fetch(`/api/verify-session?stripe_session_id=${stripeSessionId}`);
        const data = await res.json();

        const isPaymentSuccess = data.payment_status === "unpaid" && data.status === "complete";
        if (isPaymentSuccess) {
          setTermCondition(true);

          await makeOrderAction(
            currentCartItem,
            totalCartAmount,
            loggedInUser,
            null,
            null,
            setCurrentCartItem,
            router,
            () => { },
            setLoading,
            PAYMENT_METHOD.STRIPE,
            data?.payment_intent || generateRandomPassword(),
            promoCode
          );

          triggerForm({
            title: "",
            text: `Payment successful!`,
            icon: "success",
            confirmButtonText: "OK",
          });

          setPaymentVerifyingLoading(false);
          router.push("/orders");
        }
      } catch (error) {
        console.log("error", error);
        setPaymentVerifyingLoading(false);
      }
    };

    fetchSession();
  }, [stripeSessionId, currentCartItem, totalCartAmount, loggedInUser, promoCode, router, setCurrentCartItem]);

  const handleStripeRedirect = async () => {
    const products = currentCartItem.map((item: any) => ({
      name: item.productName.length > 200 ? item.productName.substring(0, 200) + "..." : item.productName,
      price: item.price,
    }));

    setLoading(true);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products, email }),
    });

    const data = await res.json();
    if (data.url) {
      window.open(data.url); // Opens in new tab
    } else {
      triggerForm({
        title: "",
        text: "Failed to start checkout. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Col xs={12}>
        {!stripeSessionId || stripeSessionId == 'CANCELLED' && (
          <PaymentMessages totalAmount={totalCartAmount} setTermCondition={setTermCondition} termCondition={termCondition} title="" description="" />
        )}
      </Col>
      {termCondition && (
        <Card className="border-0" style={{ maxWidth: "530px" }}>
          <Card.Body>
            <Button
              variant="primary"
              onClick={handleStripeRedirect}
              disabled={loading || totalCartAmount < MINIMUM_PURCHASED_AMOUNT || paymentVerifyingLoading}
              className={classNames(styles.checkoutButton, "w-100")}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Redirecting to Stripe...
                </>
              ) : paymentVerifyingLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Verifying Payment... Please do not close this tab
                </>
              ) : (
                <>Pay ${totalCartAmount}</>
              )}
            </Button>
            <br />
            <br />

            <Image src="/stripe_badge1.png" width={500} height={165} layout="fixed" alt="Stripe Guranteed Safe & Secure Checkout" />
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default function StripePaymentButtonWrapper() {
  return (
    <Container className="my-5">
      <Elements stripe={stripePromise}>
        <StripePaymentButton />
      </Elements>
    </Container>
  );
}
