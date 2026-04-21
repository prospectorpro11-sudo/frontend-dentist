import { DATABASE_MAIN_TYPES } from "./enums";

export const ADMIN_EMAIL = "support@medioutreach.com";
export const WEBSITE_SEO_TITLE = "DentistEmailList";
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const CATEGORIES_TO_URLS = {
    [DATABASE_MAIN_TYPES.STATES]: "states",
    [DATABASE_MAIN_TYPES.CITIES]: "cities",
    [DATABASE_MAIN_TYPES.HOME]: "home",
};

export const EMAIL_TEMPLATE_IDS = {
    CONTACT_US: "d-61b5da3083b4482ba946bb6f7c9e58b4",
    SUPPORT: "d-0d1675de354c494291aaaedbd7346560",
    ORDER_CREATED: "d-105891b93e25464db9f35d33ff01d7aa",
    DOWNLOAD_MODAL: "",
    CREATE_ACCOUNT: "d-a3d78bb1beea454e9468056218138999",
    ORDER_CREATED_CRYPTO: "d-b877e0855bbe49e6b774a15f90c0d437",
    RESPONSE_AFTER_DOWNLOAD_SAMPLE: "d-7148e4c2bbde41879406a102da639ad2",
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
