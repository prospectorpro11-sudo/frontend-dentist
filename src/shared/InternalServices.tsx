
import { ChangeEventHandler } from "react";
import { ICartItem } from "./interface";

export const conditionBeforePayment = (
    loggedInUser: any,
    pressVerifyEmail: any,
    pressLogin: any,
    currentCartItem: ICartItem[]
) => {
    return (
        <>
            {!currentCartItem.length && (
                <div>
                    <span >*</span> You have No items in your Cart.
                    Please add something in your Cart
                </div>
            )}
            {!loggedInUser && (
                <p >
                    Please{" "}
                    <span onClick={pressLogin}>
                        Log in
                    </span>{" "}
                    to proceed the Payment
                </p>
            )}
        </>
    );
};

export const getTermTextCondition = (
    termCondition: boolean,
    onChangeTermCondition: ChangeEventHandler<HTMLInputElement>
) => {
    return (
        <>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={termCondition}
                    onChange={onChangeTermCondition}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    I&apos;ve read and accept the{" "}
                    <a href="/terms-and-conditions" target="_blank">
                        <span className="text-highlight">Terms &amp; Conditions</span>
                    </a>{" "}
                    *
                </label>
            </div>
        </>
    );
};
