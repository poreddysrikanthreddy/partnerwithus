import React from "react";
import ValidationMessage from "../constants/validationMessage";
import Validators from "../utils/Validator";

export default class FormValidation {
  static UserNamePassword(params: any, isLogin: boolean) {
    const { name, email, password, email_for_otp, different_otp_email } =
      params;

    let json = {
      name: "",
      email: "",
      password: "",
      email_for_otp: "",
      different_otp_email: "",
      isValid: true,
    };
    if (!isLogin && Validators.isEmpty(name)) {
      json.isValid = false;
      json.name = ValidationMessage.name;
    }
    if (Validators.isEmpty(email)) {
      json.isValid = false;
      json.email = ValidationMessage.email;
    }
    if (!Validators.isEmpty(email) && !Validators.isEmailValid(email)) {
      json.isValid = false;
      json.email = ValidationMessage.validEmail;
    }
    if (Validators.isEmpty(password)) {
      json.isValid = false;
      json.password = ValidationMessage.password;
    }
    if (
      !Validators.isEmpty(password) &&
      !Validators.isPasswordValidMatch(password)
    ) {
      json.isValid = false;
      json.password = ValidationMessage.validPassword;
    }
    if (!isLogin && different_otp_email && Validators.isEmpty(email_for_otp)) {
      json.isValid = false;
      json.email_for_otp = ValidationMessage.emailOTP;
    }

    return json;
  }

  static BuniessDetail(params: any, otpConsider = true) {
    const {
      brand_name,
      city,
      company_name,
      state,
      business_location,
      whatsapp_number,
      gst_number,
      whats_app_otp,
      otp_sent,
      isWhatsappVerified,
      isGSTVerified,
    } = params;

    let json = {
      brand_name: "",
      city: "",
      company_name: "",
      state: "",
      business_location: "",
      whatsapp_number: "",
      gst_number: "",
      whats_app_otp: "",
      otp_sent: "",
      isValid: true,
    };
    if (Validators.isEmpty(brand_name)) {
      json.isValid = false;
      json.brand_name = ValidationMessage.brandName;
    }
    if (Validators.isEmpty(city)) {
      json.isValid = false;
      json.city = ValidationMessage.city;
    }
    if (Validators.isEmpty(company_name)) {
      json.isValid = false;
      json.company_name = ValidationMessage.compnayName;
    }

    if (Validators.isEmpty(state)) {
      json.isValid = false;
      json.state = ValidationMessage.state;
    }

    if (Validators.isEmpty(business_location)) {
      json.isValid = false;
      json.business_location = ValidationMessage.businessLocation;
    }

    if (Validators.isEmpty(whatsapp_number)) {
      json.isValid = false;
      json.whatsapp_number = ValidationMessage.whatsappNumber;
    } else if (
      Validators.isFalse(isWhatsappVerified) &&
      Validators.isEmpty(whats_app_otp)
    ) {
      json.isValid = false;
      json.whatsapp_number = ValidationMessage.sendOTP;
    }

    if (Validators.isEmpty(gst_number)) {
      json.isValid = false;
      json.gst_number = ValidationMessage.gstNumber;
    } else if (Validators.isFalse(isGSTVerified)) {
      json.isValid = false;
      json.gst_number = ValidationMessage.isGSTVerified;
    }

    if (!isWhatsappVerified) {
      if (Validators.isEmpty(whats_app_otp) && otpConsider) {
        json.isValid = false;
        json.whats_app_otp = ValidationMessage.whatsAppOTPNumber;
      } else if (Validators.isFalse(isWhatsappVerified) && otpConsider) {
        json.isValid = false;
        json.whats_app_otp = ValidationMessage.isWhatsappVerified;
      }
    }

    return json;
  }

  static RupifiDetails(params: any) {
    const { rupifi_option, rupifi_status } = params;

    let json = {
      rupifi_option: "",
      rupifi_status: "",
      isValid: true,
    };

    if (Validators.isEmpty(rupifi_option)) {
      json.isValid = false;
      json.rupifi_option = ValidationMessage.rupifi_option;
    }

    if (
      rupifi_option == "Yes" &&
      (Validators.isEmpty(rupifi_status) || rupifi_status == "PRE_APPROVED")
    ) {
      json.isValid = false;
      json.rupifi_status = ValidationMessage.rupifi_required;
    } else if (
      rupifi_option == "Yes" &&
      (Validators.isEmpty(rupifi_status) || rupifi_status == "INCOMPLETE")
    ) {
      json.isValid = false;
      json.rupifi_status = ValidationMessage.rupifi_incomplete;
    }
    else if (
      rupifi_option == "Yes" &&
      (Validators.isEmpty(rupifi_status) || rupifi_status == "REJECTED")
    ) {
      json.isValid = false;
      json.rupifi_status = ValidationMessage.rupifi_rejected;
    }
    return json;
  }

  static BankDetail(params: any) {
    const {
      bank_name,
      account_number,
      ifsc_code,
      upi_id,
      cancelled_cheque,
      isBankAcVerified,
      isUPIVerified,
    } = params;

    let json = {
      bank_name: "",
      account_number: "",
      ifsc_code: "",
      upi_id: "",
      cancelled_cheque: "",
      isValid: true,
    };

    if (Validators.isEmpty(bank_name)) {
      json.isValid = false;
      json.bank_name = ValidationMessage.bank_name;
    }

    if (Validators.isEmpty(ifsc_code)) {
      json.isValid = false;
      json.ifsc_code = ValidationMessage.ifsc_code;
    }

    if (Validators.isEmpty(account_number)) {
      json.isValid = false;
      json.account_number = ValidationMessage.account_number;
    } else if (
      !Validators.isEmpty(ifsc_code) &&
      Validators.isFalse(isBankAcVerified)
    ) {
      json.isValid = false;
      json.account_number = ValidationMessage.isBankAcVerified;
    }

    if (Validators.isEmpty(upi_id)) {
      json.isValid = false;
      json.upi_id = ValidationMessage.upi_id;
    } else if (Validators.isFalse(isUPIVerified)) {
      json.isValid = false;
      json.upi_id = ValidationMessage.isUPIVerified;
    }

    if (Validators.isEmpty(cancelled_cheque)) {
      json.isValid = false;
      json.cancelled_cheque = ValidationMessage.upload_cheque;
    }

    return json;
  }

  static GstPanDetail(params: any) {
    const { gst_document, pan_document } = params;

    let json = {
      gst_document: "",
      pan_document: "",
      isValid: true,
    };
    if (Validators.isEmpty(gst_document)) {
      json.isValid = false;
      json.gst_document = ValidationMessage.gst_doc_upload;
    }
    if (Validators.isEmpty(pan_document)) {
      json.isValid = false;
      json.pan_document = ValidationMessage.aadhar_doc_upload;
    }

    return json;
  }

  static ShoppingPreference(params: any) {
    let json = {
      preference_selection: "",
      isValid: true,
    };
    if (params.items && params.items.length < 2) {
      json.isValid = false;
      json.preference_selection = ValidationMessage.preference_selection;
    }
    return json;
  }

  static OnlinePresense(params: any) {
    return {
      isValid: true,
    };
  }

  static OnboardingForm(params: any) {
    const { accept_terms, e_signature_file } = params;
    let json = {
      e_signature_file: "",
      accept_terms: "",
      isValid: true,
    };
    if (Validators.isEmpty(e_signature_file)) {
      json.isValid = false;
      json.e_signature_file = ValidationMessage.e_signature_file;
    }
    if (!accept_terms) {
      json.isValid = false;
      json.accept_terms = ValidationMessage.terms_and_condition;
    }
    return json;
  }

  static SocialLinks(params: any) {
    const { instagram, facebook, twitter } = params;

    let json = {
      instagram: "",
      facebook: "",
      twitter: "",
      isValid: true,
    };
    if (Validators.isEmpty(instagram)) {
      json.isValid = false;
      json.instagram = ValidationMessage.insta_link;
    }
    if (Validators.isEmpty(facebook)) {
      json.isValid = false;
      json.facebook = ValidationMessage.facebook_link;
    }
    if (Validators.isEmpty(twitter)) {
      json.isValid = false;
      json.twitter = ValidationMessage.twitter_link;
    }

    if (
      !Validators.isEmpty(instagram) &&
      !Validators.isValidInstaLink(instagram)
    ) {
      json.isValid = false;
      json.instagram = ValidationMessage.insta_valid_link;
    }
    if (
      !Validators.isEmpty(facebook) &&
      !Validators.isValidFacebookLink(facebook)
    ) {
      json.isValid = false;
      json.facebook = ValidationMessage.facebook_valid_link;
    }
    if (
      !Validators.isEmpty(twitter) &&
      !Validators.isValidTwitterLink(twitter)
    ) {
      json.isValid = false;
      json.twitter = ValidationMessage.twitter_valid_link;
    }

    return json;
  }
}
