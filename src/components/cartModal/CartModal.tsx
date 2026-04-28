import Link from "next/link";
import { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { BiSolidCartAlt } from "react-icons/bi";
import { MdOutlineLock } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";

import UCDModal from "../UCDModal/UCDModal";
import styles from "./cartModal.module.scss";
import { ICartItem } from "@/shared/interface";
import { numberWithCommas } from "@/shared/InternalService";
import { addToCartLocal } from "@/services/tokenService";
import { useRootContext } from "@/contexts/RootContext";

const CartModal = () => {
  const {
    cartEnable,
    setCartEnable,
    currentCartItem,
    setCurrentCartItem,
    totalCartAmount,
    loggedInUser,
    setAuthEnable
  } = useRootContext();

  useEffect(() => {
    if (!currentCartItem?.length) {
      setCartEnable(false);
    }
  }, [currentCartItem?.length]);

  const pressClose = () => setCartEnable(false);

  const removeCartItem = (id: string) => {
    const next = currentCartItem.filter((el: ICartItem) => el.id !== id);
    setCurrentCartItem(next);
    addToCartLocal(next);
  };

  const pressCheckout = () => setCartEnable(false);

  const pressLogin = () => {
    setAuthEnable(true);
    setCartEnable(false);
  };

  const isCheckoutDisabled =
    !currentCartItem?.length || totalCartAmount < 50 || !loggedInUser;

  return (
    <UCDModal
      onHide={pressClose}
      title="Shopping Cart"
      size="lg"
      open={cartEnable}
    >
      <div className={styles.cartBody}>

        {/* ── Header meta row ── */}
        <div className={styles.cartMeta}>
          <span className={styles.itemCount}>
            <span className={styles.countPill}>{currentCartItem?.length || 0}</span>
            {currentCartItem?.length === 1 ? "Item" : "Items"} in cart
          </span>
        </div>

        {/* ── Item list ── */}
        {currentCartItem?.length > 0 ? (
          <div className={styles.itemsList}>
            {currentCartItem.map((el: ICartItem, i: number) => (
              <div
                className={styles.itemCard}
                key={el.id}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {/* Icon */}
                <div className={styles.itemIcon}>
                  <BiSolidCartAlt size={22} style={{ color: "var(--blue-600)" }} />
                </div>

                {/* Details */}
                <div className={styles.itemDetails}>
                  {typeof el.productName === "string" ? (
                    <div
                      className={styles.productName}
                      dangerouslySetInnerHTML={{ __html: el.productName }}
                    />
                  ) : (
                    <div className={styles.productName}>{el.productName}</div>
                  )}
                  <div className={styles.itemMeta}>
                    <span className={styles.metaTag}>
                      {numberWithCommas(el.contacts?.toString())} contacts
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className={styles.itemPrice}>
                  {loggedInUser ? (
                    <>${numberWithCommas(el.price?.toString())}</>
                  ) : (
                    <span className={styles.priceHidden}>
                      <MdOutlineLock size={13} />
                      <span className={styles.blurPrice}>$***</span>
                    </span>
                  )}
                </div>

                {/* Remove */}
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeCartItem(el.id)}
                  aria-label="Remove item"
                >
                  <BiTrash size={15} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <BiSolidCartAlt size={26} style={{ color: "var(--blue-600)" }} />
            </div>
            <div className={styles.emptyTitle}>Your cart is empty</div>
            <div className={styles.emptyDescription}>
              Use the Prospector to find and add dentist leads to your cart.
            </div>
          </div>
        )}

        {/* ── Order summary panel ── */}
        {currentCartItem?.length > 0 && (
          <div className={styles.summaryPanel}>
            <div className={styles.summaryRow}>
              <span>Subtotal ({currentCartItem.length} {currentCartItem.length === 1 ? "item" : "items"})</span>
              <span>
                {loggedInUser
                  ? `$${numberWithCommas(totalCartAmount?.toString())}`
                  : <span className={styles.priceHidden}><MdOutlineLock size={12} /><span className={styles.blurPrice}>$***</span></span>
                }
              </span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalAmount}>
                {loggedInUser
                  ? `$${numberWithCommas(totalCartAmount?.toString())}`
                  : <><MdOutlineLock size={18} /><span className={styles.blurPrice}>$***</span></>
                }
              </span>
            </div>
          </div>
        )}

        {/* ── Login alert ── */}
        {!loggedInUser && currentCartItem?.length > 0 && (
          <div className={`${styles.alertBar} ${styles.alertAmber}`}>
            <span className={styles.alertIcon}><MdInfoOutline size={16} /></span>
            <span>
              <span className={styles.loginLink} onClick={pressLogin}>Log in</span>
              {" "}to see prices and proceed to checkout.
            </span>
          </div>
        )}

        {/* ── Min order alert ── */}
        {loggedInUser && totalCartAmount > 0 && totalCartAmount < 50 && (
          <div className={`${styles.alertBar} ${styles.alertRose}`}>
            <span className={styles.alertIcon}><MdInfoOutline size={16} /></span>
            <span>Minimum order is $50. Add more leads to continue.</span>
          </div>
        )}

        {/* ── Actions ── */}
        <div className={styles.actionsRow}>
          <button type="button" className={styles.continueShopping} onClick={pressClose}>
            Continue Shopping <BsArrowRight size={15} />
          </button>
          <Link
            passHref
            href="/checkout"
            className={styles.checkoutBtn}
            onClick={pressCheckout}
            style={isCheckoutDisabled ? { pointerEvents: "none", opacity: 0.45 } : {}}
          >
            <MdOutlineLock size={15} />
            Secure Checkout
          </Link>
        </div>

      </div>
    </UCDModal>
  );
};

export default CartModal;
