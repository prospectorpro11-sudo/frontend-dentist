import { SweetAlertOptions } from "sweetalert2";
import { IBuilFilteList, ICartItem, IProspectorFilter } from "./interface";
import { AxiosError } from "axios";
import { EMAIL_AVAILABILITY_OPTIONS } from "@/seeds/filterData";
import { addToCartLocal, setProspectorFilters } from "@/services/tokenService";
import { DATABASE_MAIN_TYPES, PAYMENT_METHOD, PAYMENT_STATUS } from "./enums";
import { getIpAddress, orderCreatedCryptoEmailSend, orderCreatedEmailSend } from "./emailSend";
import { CATEGORIES_TO_URLS } from "./constant";
import instance from "@/services/baseServices";
import dayjs from "dayjs";

export const numberWithCommas = (price: string, appendDecimals = 0) => {
    return parseFloat(price).toLocaleString(undefined, {
        minimumFractionDigits: appendDecimals,
        maximumFractionDigits: 9,
    });
};

export const formatCompactContactCount = (count: number) => {
    const safeCount = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;

    if (safeCount >= 1_000_000_000) {
        return `${Math.floor(safeCount / 1_000_000_000)}B`;
    }

    if (safeCount >= 1_000_000) {
        return `${Math.floor(safeCount / 1_000_000)}M`;
    }

    if (safeCount >= 1_000) {
        return `${Math.floor(safeCount / 1_000)}K`;
    }

    return safeCount.toString();
};

export const MULTI_TO_SINGLE_VALUES = (values: IProspectorFilter[] | null, type: "city" | "zip" | "" = "", joinWith: string = ";") => {
    if (!values?.length) return null;

    const formatted = values.map((element) => {
        if (type === "city") {
            return `${element.state}=${element.value}`;
        } else if (type === "zip") {
            return `${element.state}=${element.city}=${element.value}`;
        } else {
            return element.value;
        }
    });

    return formatted.join(joinWith);
};

export const triggerForm = (swalObject: SweetAlertOptions) => {
    import("sweetalert2" /* webpackChunkName: "sweetalert2" */).then(
        ({ default: Swal }) => {
            const timerDuration = swalObject.timer ?? 8000;
            const iconKey = typeof swalObject.icon === "string" ? swalObject.icon : undefined;
            const iconHtmlMap: Record<string, string> = {
                success:
                    '<svg class="nr-swal-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"/></svg>',
                error:
                    '<svg class="nr-swal-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6l-12 12"/></svg>',
                warning:
                    '<svg class="nr-swal-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v8"/><circle cx="12" cy="18" r="1.3" fill="currentColor" stroke="none"/></svg>',
                info:
                    '<svg class="nr-swal-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10v7"/><circle cx="12" cy="7" r="1.3" fill="currentColor" stroke="none"/></svg>',
                question:
                    '<svg class="nr-swal-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.2c-.9.4-1.5 1.1-1.5 2.3"/><circle cx="12" cy="17.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
            };
            const resolvedIconHtml =
                swalObject.iconHtml ?? (iconKey ? iconHtmlMap[iconKey] : undefined);

            Swal.fire({
                timer: timerDuration,
                timerProgressBar: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "OK",
                ...swalObject,
                iconHtml: resolvedIconHtml,
                customClass: {
                    container: "custom-sweetalert",
                    popup: "custom-sweetalert-popup",
                    ...((swalObject.customClass as Record<string, string>) || {}),
                },
                didOpen: (popup) => {
                    swalObject.didOpen?.(popup);
                    if (!timerDuration) return;
                    const closeBtn = popup.querySelector(".swal2-close");
                    if (!closeBtn) return;

                    const ring = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    ring.setAttribute("class", "nr-close-timer-ring");
                    ring.setAttribute("viewBox", "0 0 36 36");
                    ring.innerHTML = `<circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" stroke-width="2.5"/><circle class="nr-close-timer-path" cx="18" cy="18" r="16" fill="none" stroke="#39BABD" stroke-width="2.5" stroke-dasharray="100.53" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 18 18)" style="transition: stroke-dashoffset linear;" />`;
                    closeBtn.appendChild(ring);

                    const path = ring.querySelector(".nr-close-timer-path") as SVGCircleElement;
                    const circumference = 2 * Math.PI * 16; // ~100.53
                    requestAnimationFrame(() => {
                        path.style.transitionDuration = `${timerDuration}ms`;
                        path.style.strokeDashoffset = `${circumference}`;
                    });
                },
            });
        }
    );
};

export const handleApiError = (err: unknown, defaultMessage = "Something went wrong") => {
    let message = defaultMessage;

    if (err instanceof Error) {
        message = err.message;
    }

    if ((err as AxiosError)?.response?.data) {
        message = (err as AxiosError).response?.data as string;
    }

    triggerForm({
        title: "Error",
        text: message,
        icon: "error",
    });

    return err;
};

export const validateEmail = (value: string) => {
    let error;
    if (!value) {
        error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = "Invalid email address";
    }
    return error;
};

export const validateRequired = (value: string) => {
    let error;
    if (!value) {
        error = "Required";
    }

    return error;
};

export const attachWithPrefix = (email: string) => {
    return `${email?.toLowerCase()}`;
};



export function CALCULATE_NON_EMAIL_COST(emailCount: number): number {
    if (emailCount <= 0) return 0;

    const tiers = [
        { max: 66, rate: 0.06 },           // ~$3.96
        { max: 100, rate: 0.05 },          // ~$5.00
        { max: 500, rate: 0.035 },         // ~$17.50
        { max: 1000, rate: 0.03 },         // ~$30.00
        { max: 2500, rate: 0.025 },        // ~$62.50
        { max: 5000, rate: 0.02 },         // ~$100.00
        { max: 10000, rate: 0.015 },       // ~$150.00
        { max: 15000, rate: 0.014 },       // ~$210.00
        { max: 20000, rate: 0.013 },       // ~$260.00
        { max: 25000, rate: 0.0125 },      // ~$312.50
        { max: 50000, rate: 0.01 },        // ~$500.00
        { max: 100000, rate: 0.008 },      // ~$800.00
        { max: 200000, rate: 0.006 },      // ~$1,200.00
        { max: 500000, rate: 0.0045 },     // ~$2,250.00
        { max: 1000000, rate: 0.003 },     // ~$3,000.00
        { max: 2300000, rate: 0.00227 },   // ~$4,994.00
    ];
    for (const tier of tiers) {
        if (emailCount < tier.max) {
            return (emailCount * tier.rate * .734) / 3; // TODO: Reduce / 2 if want to increase the prices
        }
    }

    // Fixed price for 2,000,000+ leads
    return 8900 / 2;
}


export function CALCULATE_EMAIL_COST_WITH_EMAIL(emailCount: number): number {
    if (emailCount <= 0) return 0;

    const tiers = [
        { max: 66, rate: 0.06 },           // ~$3.96
        { max: 100, rate: 0.05 },          // ~$5.00
        { max: 500, rate: 0.035 },         // ~$17.50
        { max: 1000, rate: 0.03 },         // ~$30.00
        { max: 2500, rate: 0.025 },        // ~$62.50
        { max: 5000, rate: 0.02 },         // ~$100.00
        { max: 10000, rate: 0.015 },       // ~$150.00
        { max: 15000, rate: 0.014 },       // ~$210.00
        { max: 20000, rate: 0.013 },       // ~$260.00
        { max: 25000, rate: 0.0125 },      // ~$312.50
        { max: 50000, rate: 0.01 },        // ~$500.00
        { max: 100000, rate: 0.008 },      // ~$800.00
        { max: 200000, rate: 0.006 },      // ~$1,200.00
        { max: 500000, rate: 0.0045 },     // ~$2,250.00
        { max: 1000000, rate: 0.003 },     // ~$3,000.00
        { max: 2300000, rate: 0.00227 },   // ~$4,994.00 
    ];
    for (const tier of tiers) {
        if (emailCount < tier.max) {
            return (emailCount * tier.rate); // TODO: Reduce / 2 if want to increase the prices
        }
    }

    // Fixed price for 2,000,000+ leads
    return 8900 / 2;
}

export const PROSPECTOR_PRODUCT_PRICE_UPDATE = (totalContacts: number, uniqueEmails: number, emailAvailability: string): number => {
    let price = 0;

    const formatPrice = (price: number) => {
        return Math.ceil(Number(price));
    };

    if (emailAvailability === EMAIL_AVAILABILITY_OPTIONS[0].value) {
        const getWithoutEmail = totalContacts - uniqueEmails;
        const withoutEmailPrice = CALCULATE_NON_EMAIL_COST(getWithoutEmail);
        const withEmailPrice = CALCULATE_EMAIL_COST_WITH_EMAIL(uniqueEmails);
        price = withoutEmailPrice + withEmailPrice;
    } else if (emailAvailability === EMAIL_AVAILABILITY_OPTIONS[1].value) {
        price = CALCULATE_EMAIL_COST_WITH_EMAIL(totalContacts);
    } else if (emailAvailability === EMAIL_AVAILABILITY_OPTIONS[2].value) {
        price = CALCULATE_NON_EMAIL_COST(totalContacts);
    } else {
        return 0;
    }

    const finalPrice = formatPrice(price);
    return finalPrice;
};


export const AddToCart = (
    currentCartItem: ICartItem[],
    setCurrentCartItem: any,
    url?: string,
    directContacts?: number,
    amount?: number,
    bannerPlainTitle?: string,
    databaseMainType?: "DATABASE_MAIN_TYPES" | null,
    filterItems?: IBuilFilteList[] | null
) => {
    const selectedCartItem = currentCartItem?.filter((element: ICartItem) => {
        return element.id?.replace(/\//g, "") === url?.replace(/\//g, "");
    });

    if (selectedCartItem?.length) {
        triggerForm({
            title: "",
            text: "Already added to the Cart!",
            icon: "error",
            confirmButtonText: "OK",
        });
        return;
    }

    // triggerForm({
    //   title: "",
    //   text: "Added to the Cart!",
    //   icon: "success",
    //   confirmButtonText: "OK",
    // });

    setCurrentCartItem([
        ...currentCartItem,
        {
            id: url ?? "",
            productName: `${bannerPlainTitle}`,
            price: amount ?? 0,
            contacts: directContacts ?? 0,
            databaseMainType,
            filterItems,
            // bannerPlainTitle: bannerPlainTitle,
        },
    ]);

    addToCartLocal([
        ...currentCartItem,
        {
            id: url ?? "",
            productName: `${bannerPlainTitle}`,
            price: amount ?? 0,
            contacts: directContacts ?? 0,
            databaseMainType,
            filterItems,
            // bannerPlainTitle: bannerPlainTitle,
        },
    ]);
};

export const validURL = (str: string) => {
    const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator

    if (!pattern.test(str)) {
        return "Not a Valid URL";
    }
};

export const generateRandomPassword = () => {
    return (Math.floor(Math.random() * 90000) + 10000)?.toString();
};

export const replaceWithPrefix = (email: string) => {
    return email;
};


export const makeOrderAction = async (
    currentCartItem: ICartItem[],
    totalAmount: number,
    // userPrivateInfo: any,
    loggedInUser: any,
    currentCoinSelection: any,
    selectedNetwork: any,
    setCurrentCartItem: any,
    router: any,
    setCryptoModalVisible: any,
    setLoading: any,
    paymentMethod: PAYMENT_METHOD,
    orderId: string,
    promoCode?: string,
    coinPaymentInfo?: any
) => {
    const ipAddress = await getIpAddress();

    const totalOrder = {
        currentCartItem: currentCartItem.map((element: any) => {
            return {
                filterItems: element.filterItems,
                contacts: element.contacts,
                price: element.price,
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/${CATEGORIES_TO_URLS[element?.databaseMainType as keyof typeof CATEGORIES_TO_URLS]
                    }${element.id}`,
                productName: element?.productName,
            };
        }),
        totalAmount,
        date: dayjs().unix(),
        status:
            paymentMethod === PAYMENT_METHOD.CRYPTO
                ? PAYMENT_STATUS.REQUESTED
                : paymentMethod === PAYMENT_METHOD.CRYPTO_PLISIO_INITIALIZED
                    ? PAYMENT_STATUS.INITIALIZED
                    : PAYMENT_STATUS.PENDING,
        userIpAddress: ipAddress || "",
        paymentMethod,
        orderId,
        promoCode: promoCode || "",
        coinPaymentInfo: coinPaymentInfo || "",
    };

    try {
        const cryptoValueObj: any =
            paymentMethod === PAYMENT_METHOD.CRYPTO
                ? [
                    {
                        coin: currentCoinSelection?.value,
                        network: selectedNetwork?.value,
                    },
                ]
                : [];

        // PaymentService.updateWithCustomIdAndAdd(loggedInUser.uid, totalOrder);
        await instance.post(`/makeOrder`, {
            ...totalOrder,
        });

        if (paymentMethod !== PAYMENT_METHOD.CRYPTO_PLISIO_INITIALIZED) {
            orderCreatedEmailSend(
                loggedInUser,
                currentCartItem,
                totalAmount,
                orderId,
                replaceWithPrefix(loggedInUser?.email),
                replaceWithPrefix(loggedInUser?.email),
                paymentMethod,
                promoCode,
                ...cryptoValueObj
            );

            // const ipAddress = await getIpAddress();

            // ADMIN_EMAILS.forEach((email) => {
            //   orderCreatedEmailSendAdmin(
            //     loggedInUser,
            //     currentCartItem,
            //     totalAmount,
            //     orderId,
            //     email,
            //     loggedInUser?.email,
            //     paymentMethod,
            //     ipAddress,
            //     promoCode,
            //     ...cryptoValueObj
            //   );
            // });

            triggerForm({
                title: "",
                text: "You will soon receive an email from our agent.",
                icon: "success",
                confirmButtonText: "OK",
            });
        } else {
            orderCreatedCryptoEmailSend(orderId, replaceWithPrefix(loggedInUser?.email), replaceWithPrefix(loggedInUser?.email), totalAmount, promoCode);
        }
        setCurrentCartItem([]);
        addToCartLocal([]);
        setLoading(false);
        setCryptoModalVisible(false);

        if (typeof window !== "undefined" && window?.dataLayer) {
            window.dataLayer.push({
                event: "purchase",
                ecommerce: {
                    purchase: {
                        actionField: {
                            id: orderId,
                            affiliation: promoCode || "",
                            revenue: totalAmount,
                            tax: 0,
                        },
                        products: currentCartItem.map((element: any) => {
                            return {
                                name: element?.productName,
                                price: `${element.price}`,
                                category: `${CATEGORIES_TO_URLS[element?.databaseMainType as keyof typeof CATEGORIES_TO_URLS]}`,
                                quantity: 1,
                            };
                        }),
                    },
                },
            });
        }

        const resetFilters = {
            emailAvailability: EMAIL_AVAILABILITY_OPTIONS[0],
            prefix: null,
            suffix: null,
            gender: null,
            mailingState: null,
            mailingCity: null,
            mailingZip: null,
            specialization: null,
            licenseNumberState: null,
        };
        setProspectorFilters(resetFilters);
        router.push("/orders");
    } catch (error: any) {
        triggerForm({
            title: "",
            text: error.response.data?.message || error.response.data,
            icon: "error",
            confirmButtonText: "OK",
        });

        setLoading(false);
    }
};
export const getQueryString = (value: string, type: string) => {
    const querstring: any = {
        [DATABASE_MAIN_TYPES.JOB_TITLE]: `?specialization=${value}`,
        [DATABASE_MAIN_TYPES.STATES]: `?state=${value}`,
        [DATABASE_MAIN_TYPES.HOME]: ``,
        [DATABASE_MAIN_TYPES.CITIES]: ``,
    }
    return querstring[type]
}
