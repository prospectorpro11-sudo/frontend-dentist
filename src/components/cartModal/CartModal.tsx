import Link from "next/link";
import { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineLock } from "react-icons/md";

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

  const pressClose = () => {
    setCartEnable(false);
  };

  const removeCartItem = (id: string) => {
    const currentFilters = currentCartItem.filter((element: ICartItem) => {
      return element.id !== id;
    });

    setCurrentCartItem(currentFilters);
    addToCartLocal(currentFilters);
  };

  const pressCheckout = () => {
    setCartEnable(false);
  };

  const pressLogin = () => {
    setAuthEnable(true);
    setCartEnable(false);
  };

  return (
    <UCDModal
      bodyClassName="px-4 pb-4 pt-0"
      onHide={pressClose}
      title="Shopping Cart"
      size="lg"
      open={cartEnable}
    >
      <div className={styles.cartBody}>
        {/* Summary badge */}
        <div className={styles.summaryBadge}>
          <span className={styles.badgeCount}>{currentCartItem?.length || 0}</span>
          {currentCartItem?.length === 1 ? "item" : "items"} in your cart
        </div>

        {/* Items list */}
        {currentCartItem?.length > 0 ? (
          <div className={styles.itemsList}>
            {currentCartItem.map((element: ICartItem, index: number) => (
              <div className={styles.itemCard} key={element.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <div className={styles.itemIcon}>
                  <HiOutlineShoppingBag size={22} />
                </div>
                <div className={styles.itemDetails}>
                  {typeof element.productName === "string" ? (
                    <div
                      className={styles.productName}
                      dangerouslySetInnerHTML={{ __html: element.productName }}
                    />
                  ) : (
                    <div className={styles.productName}>{element.productName}</div>
                  )}
                  <div className={styles.itemMeta}>
                    <span className={styles.metaTag}>
                      {numberWithCommas(element.contacts?.toString())} Contacts
                    </span>
                  </div>
                </div>
                <div className={styles.itemPrice}>
                  {loggedInUser ? (
                    <>${numberWithCommas(element.price?.toString())}</>
                  ) : (
                    <span className={styles.priceHidden}><MdOutlineLock size={14} /> $<span className={styles.blurPrice}>***</span></span>
                  )}
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeCartItem(element.id)}
                  aria-label="Remove item"
                >
                  <BiTrash size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <HiOutlineShoppingBag size={28} />
            </div>
            <div className={styles.emptyTitle}>Your cart is empty</div>
            <div className={styles.emptyDescription}>
              Use the Prospector to find and add leads to your cart.
            </div>
          </div>
        )}

        {/* Login prompt */}
        {!loggedInUser && currentCartItem?.length > 0 && (
          <div className={styles.loginPrompt}>
            <div className={styles.loginIcon}>
              <MdOutlineLock size={18} />
            </div>
            <span>
              <span className={styles.loginLink} onClick={pressLogin}>Log in</span> to see prices and proceed to checkout.
            </span>
          </div>
        )}

        <div className={styles.divider} />

        {/* Total */}
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalAmount}>
            {loggedInUser
              ? `$${numberWithCommas(totalCartAmount?.toString())}`
              : <><MdOutlineLock size={20} /> $<span className={styles.blurPrice}>***.**</span></>}
          </span>
        </div>

        {/* Min order warning */}
        {totalCartAmount > 0 && totalCartAmount < 50 && (
          <div className={styles.minOrderWarning}>
            Minimum order amount is $50. Add more leads to proceed.
          </div>
        )}

        {/* Actions */}
        <div className={styles.actionsRow}>
          <button type="button" className={styles.continueShopping} onClick={pressClose}>
            Continue Shopping <BsArrowRight size={18} />
          </button>
          <Link passHref href="/checkout" className={styles.checkoutBtn} onClick={pressCheckout}
            style={(!currentCartItem?.length || totalCartAmount < 50 || !loggedInUser) ? { pointerEvents: "none", opacity: 0.45 } : {}}
          >
            <MdOutlineLock size={18} />
            Secure Checkout
          </Link>
        </div>
      </div>
    </UCDModal>
  );
};

export default CartModal;
