'use client';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BiTrash } from "react-icons/bi";
import React, { useEffect, useState } from "react";

import Button from "@/components/button/Button";
import styles from "../cartMainView.module.scss";
import relativeTime from "dayjs/plugin/relativeTime";
import { ICartItem } from "../../../shared/interface";
import instance from "../../../services/baseServices";
import { triggerForm } from "@/shared/InternalService";
import { useRootContext } from "@/contexts/RootContext";
import { BUTTON_VARIANT_ENUM } from "../../../shared/enums";

dayjs.extend(relativeTime);
dayjs.extend(utc);

interface ICartListView {
  pressRemove: (name: string) => void;
  productList: ICartItem[];
}

const CartListView = (props: ICartListView) => {
  const { loggedInUser } = useRootContext()

  const { productList, pressRemove } = props;
  const {
    setCartEnable,
    currentCartItem,
    setTotalCartAmount,
    totalCartAmount,
    promoCodeApplied,
    setPromoCodeApplied,
    promoCode,
    setPromoCode,
  } = useRootContext();

  const [loadingPromoCode, setLoadingPromoCode] = useState(false);

  useEffect(() => {
    if (!productList?.length) {
      setCartEnable(false);
    }
  }, [currentCartItem?.length]);

  const isDayExpired = (date: number) =>
    dayjs().date() === dayjs.unix(date).date()
      ? false
      : dayjs().isAfter(dayjs.unix(date));

  const pressApply = async () => {
    if (!promoCode) {
      triggerForm({
        title: "",
        text: "Field is Empty!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    setLoadingPromoCode(true);

    try {
      const matchingPromoCode = await instance.post("/promo-codes", {
        promoCode,
      });

      if (!matchingPromoCode?.data?.length) {
        triggerForm({
          title: "",
          text: "No Matching Promo Code Found!",
          icon: "error",
          confirmButtonText: "OK",
        });

        setLoadingPromoCode(false);
        setPromoCode("");
        return;
      }

      const isExpired = isDayExpired(matchingPromoCode?.data[0].endDate);

      if (isExpired) {
        triggerForm({
          title: "",
          text: "This Promo Code is Expired!",
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoadingPromoCode(false);
        setPromoCode("");
        return;
      }

      const increasedTotalPercent =
        totalCartAmount * (matchingPromoCode?.data[0].percentage / 100);

      setTotalCartAmount(
        totalCartAmount - Number(increasedTotalPercent?.toFixed(0))
      );
      setPromoCodeApplied(true);
      setLoadingPromoCode(false);
      triggerForm({
        title: "",
        text: "Promo Code Applied Successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      setLoadingPromoCode(false);
    }
  };

  const cancelPromoCode = () => {
    setPromoCode("");
    setPromoCodeApplied(false);

    if (currentCartItem?.length) {
      let totalPrice = 0;
      currentCartItem?.map((element: ICartItem) => {
        totalPrice += element.price;
      });

      setTotalCartAmount(totalPrice);
    } else {
      setTotalCartAmount(0);
    }
  };

  return (
    <>
      <Row>
        <Col className="pb-3" xs={12}>
          <Row>
            <Col xs={8}>
              <b>Product Name</b>
            </Col>
            <Col xs={2} md={2} className="text-end">
              <b>Price</b>
            </Col>
            <Col md={2} />
          </Row>
        </Col>
        {productList.map((element: ICartItem, index: number) => {
          return (
            <Col key={index} xs={12}>
              <Col className={styles.item} xs="12">
                <Row>
                  <Col xs={8} md={8}>
                    <div className={styles.productNameWrapper}>
                      {typeof element.productName === "string" ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: element.productName,
                          }}
                        />
                      ) : (
                        element.productName
                      )}
                    </div>
                  </Col>
                  <Col xs={2} md={2} className="text-end text-highlight">
                    {loggedInUser ? <b>${element.price}</b> : <b>---</b>}
                  </Col>
                  <Col
                    className="text-end"
                    xs={2}
                    md={2}
                    onClick={() => pressRemove(element.productName)}
                  >
                    <BiTrash size={24} />
                  </Col>
                </Row>
              </Col>
            </Col>
          );
        })}
      </Row>
      <Row className={styles.totalRow}>
        <Col xs={6} md={7} className={styles.total}>
          <b>Total Cost</b>
        </Col>
        <Col xs={6} md={3} className={styles.cost}>
          {loggedInUser ? `$${totalCartAmount}` : '--'}
        </Col>
        <Col md={2}></Col>
      </Row>
      <hr className={styles.divider} />
      <Row>
        <Col xs={12} md={8}>
          <input
            placeholder="Promo Code"
            value={promoCode}
            onChange={(event: any) => setPromoCode(event.target.value)}
            type="text"
            disabled={promoCodeApplied}
          />
        </Col>
        <Col xs={12} md={4} className="text-end mt-2 mt-lg-0">
          {promoCodeApplied ? (
            <Button
              onClick={cancelPromoCode}
              variant={BUTTON_VARIANT_ENUM.SECONDARY}
              isLoading={loadingPromoCode}
              className={styles.button}
            >
              Remove
            </Button>
          ) : (
            <Button
              onClick={pressApply}
              isLoading={loadingPromoCode}
              className={styles.button}
            >
              Apply
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CartListView;
