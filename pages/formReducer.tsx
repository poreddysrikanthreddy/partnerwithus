import React from "react";
import questions from "../app/constants/staticContent/questions";

// An interface for our actions
interface PayloadAction {
  type: string;
  payload: any;
}

type State = {
  auth: any;
  businessDetails: {
    company_name: string;
    city: string;
    brand_name: string;
    state: string;
    business_location: string;
    whatsapp_number: string;
    gst_number: string;
    whats_app_otp: string;
    otp_sent: boolean;
    isWhatsappVerified: boolean;
    isGSTVerified: boolean;
  };
  rupifiDetails: {
    rupifi_option: string;
    rupifi_status: string;
    activationUrl: string;
  };
  gst_pan_doc: {
    gst_document: string;
    pan_document: string;
  };
  userDetails: {
    name: string;
    email: string;
    password: string;
    email_for_otp: string;
    different_otp_email: boolean;
    profile_status: string;
    registration_status: string;
    registration_step: string;
  };
  bankDetails: {
    bank_name: string;
    account_number: string;
    ifsc_code: string;
    upi_id: string;
    cancelled_cheque: string;
    isUPIVerified: boolean;
    isBankAcVerified: boolean;
  };
  shoppingPreferences: any;
  onlinePresense: any;
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  termsAndConditions: {
    e_signature_file: string;
    accept_terms: boolean;
    subscribe_newsletter: boolean;
  };
  pricingDetail: {
    billing_option: string;
    plan_type: string;
  };
};
export const initialState: State = {
  auth: {},
  businessDetails: {
    brand_name: "",
    city: "",
    company_name: "",
    state: "",
    business_location: "",
    whatsapp_number: "",
    gst_number: "",
    whats_app_otp: "",
    otp_sent: false,
    isWhatsappVerified: false,
    isGSTVerified: false,
  },
  rupifiDetails: {
    rupifi_option: "",
    rupifi_status: "",
    activationUrl: "",
  },
  userDetails: {
    name: "",
    email: "",
    password: "",
    email_for_otp: "",
    different_otp_email: false,
    profile_status: "",
    registration_status: "",
    registration_step: "",
  },
  bankDetails: {
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    upi_id: "",
    cancelled_cheque: "",
    isUPIVerified: false,
    isBankAcVerified: false,
  },
  gst_pan_doc: {
    gst_document: "",
    pan_document: "",
  },
  shoppingPreferences: {
    items: [],
  },
  onlinePresense: {
    items: questions,
  },
  socialMedia: {
    instagram: "",
    facebook: "",
    twitter: "",
  },
  termsAndConditions: {
    e_signature_file: "",
    accept_terms: false,
    subscribe_newsletter: false,
  },
  pricingDetail: {
    billing_option: "monthly",
    plan_type: "Free",
  },
};

export const errorInitialState: State = {
  auth: {},
  businessDetails: {
    brand_name: "",
    city: "",
    company_name: "",
    state: "",
    business_location: "",
    whatsapp_number: "",
    gst_number: "",
    whats_app_otp: "",
    otp_sent: false,
    isWhatsappVerified: false,
    isGSTVerified: false,
  },
  rupifiDetails: {
    rupifi_option: "",
    rupifi_status: "",
    activationUrl: "",
  },
  userDetails: {
    name: "",
    email: "",
    password: "",
    email_for_otp: "",
    different_otp_email: false,
    profile_status: "",
    registration_status: "",
    registration_step: "",
  },
  bankDetails: {
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    upi_id: "",
    cancelled_cheque: "",
    isUPIVerified: false,
    isBankAcVerified: false,
  },
  gst_pan_doc: {
    gst_document: "",
    pan_document: "",
  },
  shoppingPreferences: {
    isValid: true,
    items: [],
  },
  onlinePresense: {
    isValid: true,
    items: [],
  },
  socialMedia: {
    instagram: "",
    facebook: "",
    twitter: "",
  },
  termsAndConditions: {
    e_signature_file: "",
    accept_terms: false,
    subscribe_newsletter: false,
  },
  pricingDetail: {
    billing_option: "",
    plan_type: "",
  },
};
// Our reducer function that uses a switch statement to handle our actions
export function ErrorReducer(errorState: any, action: PayloadAction) {
  const { type, payload } = action;
  console.log("ErrorReducer=>", type, "payload=>", payload);
  switch (type) {
    case "Username&Password":
      return {
        ...errorState,
        userDetails: {
          ...payload,
        },
      };
    case "BusniessDetails":
      return {
        ...errorState,
        businessDetails: {
          ...payload,
        },
      };

    case "RupifiDetails":
      return {
        ...errorState,
        rupifiDetails: {
          ...payload,
        },
      };

    case "BankDetails":
      return {
        ...errorState,
        bankDetails: {
          ...payload,
        },
      };
    case "gst_pan_doc":
      return {
        ...errorState,
        gst_pan_doc: {
          ...payload,
        },
      };

    case "shoppingPreferences":
      return {
        ...errorState,
        shoppingPreference: {
          ...payload,
        },
      };

    case "onlinePresense":
      return {
        ...errorState,
        onlinePresense: {
          ...payload,
        },
      };
    case "SocialMedia":
      return {
        ...errorState,
        socialMedia: {
          ...payload,
        },
      };
    case "Onboarding":
      return {
        ...errorState,
        termsAndConditions: {
          ...payload,
        },
      };

    default:
      return errorState;
  }
}

// Our reducer function that uses a switch statement to handle our actions
export function Reducer(state: any, action: PayloadAction) {
  const { type, payload } = action;
  console.log("type=>", type, "payload=>", payload);
  switch (type) {
    case "auth":
      return {
        ...state,
        auth: action.payload,
      };
    case "brand_name":
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          brand_name: action.payload,
        },
      };
    case "city":
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          city: action.payload,
        },
      };
    case "company_name":
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          company_name: action.payload,
        },
      };
    case "state":
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          state: action.payload,
        },
      };
    case "business_location":
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          business_location: action.payload,
        },
      };
    case "whatsapp_number":
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          whatsapp_number: action.payload,
        },
      };
    case "gst_number":
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          gst_number: action.payload,
        },
      };
    case "isGSTVerified":
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          isGSTVerified: action.payload,
        },
      };
    case "whats_app_otp":
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          whats_app_otp: action.payload,
        },
      };
    case "whats_app_otp_sent":
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          otp_sent: action.payload,
        },
      };
    case "isWhatsappVerified":
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          isWhatsappVerified: action.payload,
        },
      };
    case "name":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          name: action.payload,
        },
      };

    case "email":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          email: action.payload,
        },
      };

    case "password":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          password: action.payload,
        },
      };

    case "different_otp_email":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          different_otp_email: action.payload,
        },
      };

    case "email_for_otp":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          email_for_otp: action.payload,
        },
      };

    case "bank_name":
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          bank_name: action.payload,
        },
      };

    case "account_number":
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          account_number: action.payload,
        },
      };

    case "ifsc_code":
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          ifsc_code: action.payload,
        },
      };

    case "upi_id":
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          upi_id: action.payload,
        },
      };
    case "isUPIVerified":
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          isUPIVerified: action.payload,
        },
      };
    case "isBankAcVerified":
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          isBankAcVerified: action.payload,
        },
      };

    case "cancelled_cheque":
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          cancelled_cheque: action.payload,
        },
      };
    case "shoppingPreferences":
      return {
        ...state,
        shoppingPreferences: {
          ...state.shoppingPreferences,
          items: action.payload,
        },
      };
    case "handleOnlinePresense":
      state.onlinePresense.items.map((item: any, index: number) => {
        if (index == action.payload.index) {
          item.optedAnswer = action.payload.optedAnswer;
          item.answer = action.payload.value;
        }
      });
      return {
        ...state,
        onlinePresense: state.onlinePresense,
      };
    case "instagram":
      return {
        ...state,
        socialMedia: {
          ...state.socialMedia,
          instagram: action.payload,
        },
      };

    case "facebook":
      return {
        ...state,
        socialMedia: {
          ...state.socialMedia,
          facebook: action.payload,
        },
      };

    case "twitter":
      return {
        ...state,
        socialMedia: {
          ...state.socialMedia,
          twitter: action.payload,
        },
      };

    case "gst_document":
      return {
        ...state,
        gst_pan_doc: {
          ...state.gst_pan_doc,
          gst_document: action.payload,
        },
      };
    case "pan_document":
      return {
        ...state,
        gst_pan_doc: {
          ...state.gst_pan_doc,
          pan_document: action.payload,
        },
      };

    case "e_signature_file":
      return {
        ...state,
        termsAndConditions: {
          ...state.termsAndConditions,
          e_signature_file: action.payload,
        },
      };
    case "accept_terms":
      return {
        ...state,
        termsAndConditions: {
          ...state.termsAndConditions,
          accept_terms: action.payload,
        },
      };
    case "subscribe_newsletter":
      return {
        ...state,
        termsAndConditions: {
          ...state.termsAndConditions,
          subscribe_newsletter: action.payload,
        },
      };
    case "billing_option":
      return {
        ...state,
        pricingDetail: {
          ...state.pricingDetail,
          billing_option: action.payload,
        },
      };

    case "plan_type":
      return {
        ...state,
        pricingDetail: {
          ...state.pricingDetail,
          plan_type: action.payload,
        },
      };
    case "overlapInitialState":
      return {
        ...state,
        ...action.payload,
      };
    case "handleRupifiOption":
      return {
        ...state,
        rupifiDetails: {
          ...state.rupifiDetails,
          rupifi_option: action.payload,
        },
      };
    case "handleRupifiStatus":
      return {
        ...state,
        rupifiDetails: {
          ...state.rupifiDetails,
          rupifi_status: action.payload,
        },
      };
    case "handleRupifiActivationUrl":
      return {
        ...state,
        rupifiDetails: {
          ...state.rupifiDetails,
          activationUrl: action.payload,
        },
      };
    default:
      return state;
  }
}
