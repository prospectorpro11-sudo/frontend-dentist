import { DATABASE_MAIN_TYPES } from "./enums";

export const ADMIN_EMAIL = "support@medioutreach.com";
export const WEBSITE_SEO_TITLE = "DentistEmailList";
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const MINIMUM_PURCHASED_AMOUNT = 50;

export const CATEGORIES_TO_URLS = {
    [DATABASE_MAIN_TYPES.STATES]: "states",
    [DATABASE_MAIN_TYPES.CITIES]: "cities",
    [DATABASE_MAIN_TYPES.HOME]: "home",
};

const filterBasePath = "/api/prospector/filters";

export const PROSPECTOR_FILTER_ENDPOINTS = {
    STATE: `${filterBasePath}/state`,
    CITY: `${filterBasePath}/city`,
    ZIP_CODE: `${filterBasePath}/zipCode`,
    SPECIALTY: `${filterBasePath}/specialty`,
    LICENSE_STATE: `${filterBasePath}/licenseState`,
    GENDER: `${filterBasePath}/gender`,
    EMAIL_AVAILABILITY: `${filterBasePath}/emailAvailability`
}

export const EMAIL_TEMPLATE_IDS = {
    CONTACT_US: "d-f44a26c177194a88b7e3249f048ad072",
    SUPPORT: "d-e7690e42f10d46ceab9704eff4e5aa65",
    ORDER_CREATED: "d-9b6365ec27674e08ac26425f0fda8009",
    DOWNLOAD_MODAL: "d-b98a8b1748fd4bfc8555544fe54b3112",
    CREATE_ACCOUNT: "d-46732b0828354d689e263b4677efb8e8",
    ORDER_CREATED_CRYPTO: "d-73bbd7ca4f524595aa629d159ffd2b25",
    RESPONSE_AFTER_DOWNLOAD_SAMPLE: "d-b98a8b1748fd4bfc8555544fe54b3112",
};


export function getFriendlyErrorMessage(errorCode: string) {
    switch (errorCode) {
        case 'EMAIL_EXISTS':
            return 'This email is already in use.';
        case 'OPERATION_NOT_ALLOWED':
            return 'Password sign-in is disabled. Please contact support.';
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            return 'Too many attempts. Please try again later.';
        case 'EMAIL_NOT_FOUND':
            return 'No account found with this email.';
        case 'INVALID_PASSWORD':
            return 'Incorrect password. Please try again.';
        case 'USER_DISABLED':
            return 'This account has been disabled. Contact support.';
        case 'INVALID_EMAIL':
            return 'The email address is badly formatted.';
        case 'MISSING_PASSWORD':
            return 'Password is missing. Please enter one.';
        case 'INVALID_LOGIN_CREDENTIALS':
            return 'Incorrect email or password. Please try again.';
        case 'ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL':
            return 'This email is already linked to another sign-in method.';
        case 'POPUP_CLOSED_BY_USER':
            return 'Google sign-in was canceled.';
        case 'CANCELLED_POPUP_REQUEST':
            return 'Please complete the open Google sign-in window first.';
        case 'POPUP_BLOCKED':
            return 'Popup was blocked. Please allow popups and try again.';
        case 'NETWORK_REQUEST_FAILED':
            return 'Network issue detected. Please check your connection and try again.';
        case 'UNAUTHORIZED_DOMAIN':
            return 'This domain is not authorized for Google sign-in.';
        case 'OPERATION_NOT_SUPPORTED_IN_THIS_ENVIRONMENT':
            return 'Google sign-in is not supported in this browser environment.';
        case 'MISSING_ID_TOKEN':
            return 'Google authentication failed. Please try again.';
        case 'WEAK_PASSWORD':
            return 'Your password is too weak. Use at least 6 characters.';
        case 'EXPIRED_OOB_CODE':
            return 'This link has expired. Please request a new one.';
        case 'INVALID_OOB_CODE':
            return 'The link is invalid. Please request a new one.';
        case 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN':
            return 'Please log in again to continue.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
}

export const PROSPECTOR_PRODUCT_ID = "/prospector";

export const COMMON_URLS = {
    home: "/",
    contactUs: "/contact-us",
    prospector: "/prospector",
    freeSample: "/free-sample",
    support: "/support",
}

export const DATA_FIELDS_SAMPLE: string[] = [
    "First Name", "Last Name", "Email", "Phone", "Fax", "Gender", "State",
    "City", "Zip", "Speciality", "Speciality2", "Speciality Code", "Title",
    "License Number", "License State", "Address", "Full Name",
];