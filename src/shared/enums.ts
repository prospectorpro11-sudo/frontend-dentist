export enum BUTTON_VARIANT_ENUM {
    PRIMARY = "primary",
    PRIMARY_DARK = "primary-dark",
    PRIMARY_LIGHT = "primary-light",
    TEXT = "text",
    GLASS = "glass",
    DANGER = "danger",
    SUCCESS = "success",
    SECONDARY = "secondary",
    TERTIARY = "tertiary",
    ACTION = "action",
    TERTIARY_SECONDARY = "tertiary-secondary",
    WHITE = "white"
}

export enum BUTTON_SIZE_ENUM {
    SMALL = "small",
    DEFAULT = "default",
    LARGE = "large",
}

export enum BUTTON_RADIUS_ENUM {
    NORMAL = "normal",
    HALF = "half",
    LARGE = "large",
    FULL = "full",
}
export enum TRUST_STRIP_VARIANT {
    V1 = "v1",
    V2 = "v2",
}



export enum HEADER_VARIANT_ENUM {
    TRANSPARENT = "transparent",
    REGULAR = "regular",
    LIGHT = "light",
}

export enum PROSPECTOR_FILTER_VARIANT_ENUM {
    STATE = "state",
    CITY = "city",
    ZIP_CODE = "zipCode",
    SPECIALTY = "specialty",
    LICENSE_TYPE = "licenseType",
    LICENSE_STATE = "licenseState",
    GENDER = "gender",
    EMAIL_AVAILABILITY = "emailAvailability",
}

export enum PAYMENT_METHOD {
    STRIPE = "Stripe",
    PAYPAL = "Paypal",
    CRYPTO = "Crypto",
    CRYPTO_PLISIO = "Crypto payment using Plisio",
    CRYPTO_PLISIO_INITIALIZED = "Crypto payment using Plisio - initialized",
}

export enum PAYMENT_STATUS {
    INITIALIZED = "Initialized",
    REQUESTED = "Requested",
    PENDING = "Pending",
    APPROVED = "Approved",
    REJECTED = "Rejected",
}

export enum DATABASE_MAIN_TYPES {
    STATES = "STATES",
    CITIES = "CITIES",
    HOME = "HOME",
    JOB_TITLE = "JOB_TITLE",
}
