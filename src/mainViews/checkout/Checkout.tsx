'use client';
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { BiCart, BiCheckCircle, BiCreditCard, BiSupport } from "react-icons/bi";

import styles from "./style.module.scss";
import PaymentView from "./views/PaymentView";
import instance from "@/services/baseServices";
import CartMainView from "../cart/CartMainView";
import { Col, Container, Row } from "react-bootstrap";
import { triggerForm } from "@/shared/InternalService";
import { useRootContext } from "@/contexts/RootContext";
import BillingInfo from "./views/billingInfo/BillingInfo";
import { MINIMUM_PURCHASED_AMOUNT } from "@/shared/constant";
import BillingAddress from "./views/billingAddress/BillingAddress";
import { FaRegBuilding } from "react-icons/fa";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";

const CheckoutMainView = () => {
  const { loggedInUser, authLoading, setLoggedInUser, totalCartAmount } = useRootContext();
  const [editBillingEnable, setEditBillingEnable] = useState(false);
  const isLoadedRef = useRef(false);
  const canProceedPayment = totalCartAmount > MINIMUM_PURCHASED_AMOUNT;
  const isBillingStep = !loggedInUser?.country || editBillingEnable;
  const isPaymentStep = !isBillingStep && canProceedPayment;

  useEffect(() => {
    if (!loggedInUser || isLoadedRef.current) return;
    isLoadedRef.current = true;

    const oldLoggedInUser = { ...loggedInUser };

    (async () => {
      try {
        const userData = await instance.post(`/user`);
        setLoggedInUser({ ...oldLoggedInUser, ...userData.data });
      } catch (error: any) {
        triggerForm({
          title: "",
          text: error.response?.data?.message || error.response?.data,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    })();
  }, [loggedInUser]);

  const getRightElement = () => {
    return (
      <div
        className={styles.editLink}
        onClick={() => {
          setEditBillingEnable(true);
        }}
      >
        Edit
      </div>
    );
  };

  const cancelEdit = () => {
    setEditBillingEnable(false);
  };

  return (
    <div className={styles.checkoutWrapper}>
      <Container className={styles.checkoutContainer}>
        <div className={styles.pageHeader}>
          <div className={styles.steps}>
            <div className={classNames(styles.step, { [styles.active]: isBillingStep })}>
              <span className={styles.stepIndex}><BiCart size={12} /></span>
              <span className={styles.stepLabel}>Cart Review</span>
            </div>
            <div
              className={classNames(styles.step, {
                [styles.active]: isPaymentStep,
                [styles.disabled]: !canProceedPayment,
              })}
            >
              <span className={styles.stepIndex}><BiCreditCard size={12} /></span>
              <span className={styles.stepLabel}>Billing & Payment</span>
            </div>
            <div className={classNames(styles.step, styles.ghostStep)}>
              <span className={styles.stepIndex}><BiCheckCircle size={12} /></span>
              <span className={styles.stepLabel}>Confirm</span>
            </div>
          </div>
        </div>
        <Row className={styles.checkoutGrid}>
          <Col xs={{ order: 2, span: 12 }} lg={{ order: 1, span: 8 }} className="mt-4 mt-lg-0">
            <div className={classNames(styles.checkoutCard, styles.cardElevated, "shadow-sm")}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleWrap}>
                  <span className={styles.stepBadge}><FaRegBuilding size={22} /></span>
                  <div className={styles.cardTitle}>{loggedInUser ? "Billing Information" : "Registration & Billing Information"}</div>
                </div>
                {!editBillingEnable && loggedInUser && loggedInUser?.country && getRightElement()}
              </div>
              <p className={styles.cardSubtitle}>Enter your company details for invoicing.</p>
              <div className={styles.cardContent}>
                {!authLoading ? (
                  !loggedInUser?.country || editBillingEnable ? (
                    <BillingAddress cancelEdit={cancelEdit} />
                  ) : (
                    <BillingInfo />
                  )
                ) : (
                  <> Loading...</>
                )}
              </div>
            </div>
            {totalCartAmount > MINIMUM_PURCHASED_AMOUNT ? (
              <div className={classNames(styles.checkoutCard, styles.cardElevated, styles.addGap, "shadow-sm")}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitleWrap}>
                    <span className={styles.stepBadge}><BsFillCreditCard2FrontFill size={22} /></span>
                    <div className={styles.cardTitle}>Select Payment Method</div>
                  </div>
                </div>
                <p className={styles.cardSubtitle}>Choose your preferred payment option.</p>
                <div className={styles.cardContent}>
                  <PaymentView editBillingEnable={editBillingEnable} />
                </div>
              </div>
            ) : (
              authLoading == false ? <div className={styles.warning}>
                {/* <div className={styles.label}><TiWarningOutline size={21} className="mb-1 me-1" />Warning</div> */}
                <><span>The minimum order amount is $50 to proceed to checkout.</span>
                  <br />
                  <br />

                  <span>Go to the <a style={{ textDecoration: 'underline' }} href="/app/prospector">Prospector</a> page to select leads.</span>
                </>
              </div> : null
            )}
          </Col>
          <Col xs={{ order: 1, span: 12 }} lg={{ order: 2, span: 4 }}>
            <div className={styles.summaryPanel}>
              <div className={classNames(styles.checkoutCard, styles.cardElevated, styles.summaryCard, "shadow-sm")}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitleWrap}>
                    <span className={styles.summaryBadge}>Summary</span>
                    <div className={styles.cardTitle}>Order Summary</div>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <CartMainView />
                </div>
              </div>
              <div className={classNames(styles.checkoutCard, styles.cardElevated, styles.supportCard, "shadow-sm")}>
                <div className={styles.supportIcon}><BiSupport size={32} /></div>
                <div className={styles.supportTitle}>Need Help?</div>
                <p className={styles.supportText}>Our support team is available if you have questions about checkout.</p>
                <div className={styles.supportActions}>
                  <a href="/contact-us">Contact Us</a>
                  <a href="/contact-us">Support</a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutMainView;
