import { ReactNode } from "react";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ADMIN_EMAIL, EMAIL_TEMPLATE_IDS, SITE_URL, WEBSITE_SEO_TITLE } from "./constant";
import instance from "../services/baseServices";
import { EMAIL_CONTENT } from "./emailContent";

dayjs.extend(utc);

export const orderCreatedEmailSend = async (
  loggedInUser: any,
  currentCartItem: any,
  totalAmount: number,
  orderId: string,
  email: string,
  userEmail: string,
  paymentMethod: string,
  promoCode?: string,
  cryptoPayment?: {
    coin: string;
    network: string;
  }
) => {
  try {
    const response = await instance.post("/mail", {
      templateid: EMAIL_TEMPLATE_IDS.ORDER_CREATED,
      email: email,
      Items: currentCartItem.map((element: any) => {
        return {
          productName: element?.productName,
          price: element.price,
        };
      }),
      totalAmount: totalAmount,
      cc: [
        {
          name: "Mike",
          email: ADMIN_EMAIL,
        },
      ],
      orderId,
      promoCode: promoCode,
      billingAddress: {
        name: loggedInUser.name,
        streetAddress: `${loggedInUser?.streetAddress}, ${loggedInUser?.streetAddress2}`,
        country: loggedInUser?.country?.label,
        city: loggedInUser?.city,
        state: loggedInUser?.state,
        zipCode: loggedInUser?.zip,
      },
      userEmail,
      date: dayjs().format("YYYY-MMM-DD / h:mm A"),
      paymentMethod,
      cryptoPayment,
      // dynamic: EMAIL_CONTENT.PAYPAL_ORDER,
      siteName: WEBSITE_SEO_TITLE,
      siteUrl: SITE_URL,
    });

    return response.data;
  } catch (error) {
    // error
  }
};

export const orderFailed = async (loggedInUser: any) => { };

export const orderCancelled = async (loggedInUser: any) => { };

export const contactUsEmailSend = async (values: any) => {
  try {
    const response = await instance.post("/mail", {
      templateid: EMAIL_TEMPLATE_IDS.CONTACT_US,
      ...values,
      email: ADMIN_EMAIL,
      userEmail: values.email,
      dynamic: EMAIL_CONTENT.CONTACT_US,
      date: dayjs().format("YYYY-MMM-DD / h:mm A"),
      siteUrl: SITE_URL,
    });

    return response.data;
  } catch (error) { }
};

export const supportEmailSend = async (
  downloadURL: any,
  userPrivateInfo: any,
  subject: string,
  message: string,
  name: string,
  loggedInEmail: string[]
) => {
  try {
    const response = await instance.post("/mail", {
      templateid: EMAIL_TEMPLATE_IDS.SUPPORT,
      email: loggedInEmail,
      ipAddress: userPrivateInfo?.IPv4,
      downloadURL,
      name,
      cc: [
        {
          name: "Mike",
          email: ADMIN_EMAIL,
        },
      ],
      subject,
      message,
      dynamic: EMAIL_CONTENT.SUPPORT,
      requestId: Math.floor(Math.random() * 10000 + 1),
      date: dayjs().format("YYYY-MMM-DD / h:mm A"),
      siteName: WEBSITE_SEO_TITLE,
      siteUrl: SITE_URL,
    });

    return response.data;
  } catch (error) { }
};

export const emailSendSampleLink = async (
  businessEmail: string,
  name: string,
  title: ReactNode,
  links: any,
  downloadLink: string
) => {
  try {
    const response = await instance.post("/mail", {
      templateid: EMAIL_TEMPLATE_IDS.DOWNLOAD_MODAL,
      email: businessEmail,
      userName: name,
      subject: `Sample download list of ${title}`,
      state: title,
      links: links,
      downloadLink,
      dynamic: EMAIL_CONTENT.DOWNLOAD_FREE_SAMPLE,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const createAccount = async (name: string, email: string) => {
  try {
    return await instance.post("/mail", {
      templateid: EMAIL_TEMPLATE_IDS.CREATE_ACCOUNT,
      name,
      email,
      dynamic: EMAIL_CONTENT.SIGN_UP_EMAIL,
    });
  } catch (error: any) { }
};

export const getIpAddress = async () => {
  let userIpInfo: any = null;
  try {
    const response = await axios.post("https://geolocation-db.com/json/");

    userIpInfo = await response.data;

    return userIpInfo?.IPv4;
  } catch (error) {
    return userIpInfo;
  }
};

export const orderCreatedCryptoEmailSend = async (
  orderId: string,
  email: string,
  userEmail: string,
  totalAmount: number,
  promoCode?: string
) => {
  try {
    const response = await instance.post("/mail", {
      templateid: EMAIL_TEMPLATE_IDS.ORDER_CREATED_CRYPTO,
      email: email,
      cc: [
        {
          name: "Mike",
          email: ADMIN_EMAIL,
        },
      ],
      orderId,
      promoCode: promoCode,
      userEmail,
      totalAmount,
      dynamic: EMAIL_CONTENT.CRYPTO_ORDER,
      date: dayjs().format("YYYY-MMM-DD / h:mm A"),
      siteName: WEBSITE_SEO_TITLE,
      siteUrl: SITE_URL,
    });

    return response.data;
  } catch (error) {
    // error
  }
};

export const downloadSampleListEmailSend = async (values: any) => {
  const link2 = values.urlText2
    ? [
      {
        name: values.urlText2,
        link: values?.url2,
      },
    ]
    : [];

  try {
    const response = await instance.post("/mail", {
      templateid: EMAIL_TEMPLATE_IDS.RESPONSE_AFTER_DOWNLOAD_SAMPLE,
      cc: [
        {
          name: "Mike",
          email: ADMIN_EMAIL,
        },
      ],
      date: dayjs().format("YYYY-MMM-DD / h:mm A"),
      dynamic: EMAIL_CONTENT.RESPONSE_AFTER_DOWNLOAD_FREE_SAMPLE(
        values.urlText1,
        values?.urlText2,
        values.contactCount
      ),
      ...values,
      links: [
        {
          name: `Complete Doctor List`,
          link: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        },
        ...link2,
      ],
    });

    return response.data;
  } catch (error) { }
};