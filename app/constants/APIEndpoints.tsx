import React from "react";
import constants from "./constant";
const API = {
  LOGIN: "login",
  SIGNUP: "create-customer",
  SELLER_UPDATE: "update-customer",
  GET_SHOPPING_PREFERENCES: "categories",
  UPLOAD_DOCUMENTATION: "api/v1/upload/doc",
  GET_CUSTOMER: "get-customer",
  SEND_OTP: "api/send-otp",
  VERIFY_OTP: "api/verify-top",
  ACC_VERIFICATION: "api/v1/verify/bank/acc",
  GST_VERIFICATION: "api/v1/verify/gst",
  PAN_VERIFICATION: "api/v1/check/pan",
  UPI_VERIFICATION: "api/v1/verify/upi",
  EMAIL_VERIFICATION: "api/v1/verify/email",
  SEND_OTP_EMAIL: "/api/v1/send/email_otp",
  CONTACT_VERIFICATION: "api/v1/verify/contact",
  VERIFY_EMAIL_OTP: "/api/v1/verify/email_otp",
  VALIDATE_CUSTOMER: "validate_customer",
  UPDATE_CUSTOMER: "update-customer",
  GET_RUPIFI_ACCESS_TOKEN: constants.RUPIFI.BASE_URL+"merchants/auth/token",
  CHECK_RUPIFI_CREDIT_ELIGIBILITY: constants.RUPIFI.BASE_URL+"customers/eligibility",
};
export default API;
