import API from "../../constants/APIEndpoints";
import constants from "../../constants/constant";
import { HTTPBaseService } from "../HTTPBaseService";
import Toast from "../../utils/Toast";
export class SellerRegisterationService extends HTTPBaseService {
  private static classInstance?: SellerRegisterationService;

  constructor(token: string) {
    super(constants.baseURL, token);
  }

  public static getInstance(token: string) {
    if (!this.classInstance) {
      this.classInstance = new SellerRegisterationService(token);
    }

    return this.classInstance;
  }

  public sellerLogin = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.LOGIN, data)
        .then((response) => {
          if (response.status == 200) {
            let message = response.data.msg ?? "Login success";
            Toast.showSuccess(message);
            resolve(response);
          } else {
            let message = response.data.msg ?? "Login failed";
            Toast.showError(message);
            reject(response);
          }
        })
        .catch((error) => {
          console.log("Error", error);
          Toast.showError(
            JSON.parse(error.response.request.response).msg.detail
          );
          reject(error);
        });
    });
  };

  public sellerSignup = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.SIGNUP, { data: { ...data.data, type: "customer" } })
        .then((response) => {
          if (response.status == 200) {
            let message = response.data;
            Toast.showSuccess(message);
            resolve(response);
          } else {
            let message = response.data.message;
            Toast.showError(message);
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.response.data.msg.detail ?? JSON.parse(error.response.request.response).msg);
          reject(error);
        });
    });
  };

  public sellerUpdate = ({ data, customerId }: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .put(API.SELLER_UPDATE + "/" + customerId, data)
        .then((response) => {
          let message = response.data.detail;
          if (response) {
            Toast.showSuccess(message ?? "Update success");
            resolve(response);
          } else {
            Toast.showError(message ?? "Update failed");
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public getShoppingPreferences = () => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .get(API.GET_SHOPPING_PREFERENCES)
        .then((response) => {
          //let message = response.data.detail;
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public uploadDocumentation = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.UPLOAD_DOCUMENTATION, data)
        .then((response) => {
          //let message = response.data.detail;
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public getCustomer = ({ customerId }: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .get(API.GET_CUSTOMER + "/" + customerId)
        .then((response) => {
          //let message = response.data.detail;
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public sendOTP = ({ mobileNumber }: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .get(API.SEND_OTP + "/" + mobileNumber)
        .then((response) => {
          //let message = response.data.detail;
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public verifyOTP = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.VERIFY_OTP, data)
        .then((response) => {
          //let message = response.data.detail;
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public sendOTPEmail = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.SEND_OTP_EMAIL, data)
        .then((response) => {
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public updateCustomer = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .put(API.UPDATE_CUSTOMER + "/" + data.customer_id, data)
        .then((response) => {
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(JSON.parse(error.response.request.response).msg);
          reject(error);
        });
    });
  };

  public getCustomerEmail = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.VALIDATE_CUSTOMER + "/" + data.email, {})
        .then((response) => {
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          console.log("error", error.response.request.response);
          Toast.showError(error.response.request.response.msg);
          reject(error);
        });
    });
  };

  public verifyEmailOTP = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.VERIFY_EMAIL_OTP + "/" + data.req_id, data)
        .then((response) => {
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public verifyGST = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.GST_VERIFICATION, data)
        .then((response) => {
          //let message = response.data.detail;
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public verifyBankDetails = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.ACC_VERIFICATION, data)
        .then((response) => {
          //let message = response.data.detail;
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public verifyUPI = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.UPI_VERIFICATION, data)
        .then((response) => {
          //let message = response.data.detail;
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public getRupifiAccessToken = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.GET_RUPIFI_ACCESS_TOKEN, data)
        .then((response) => {
          //let message = response.data.detail;
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public checkRupifiCreditEligibility = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.CHECK_RUPIFI_CREDIT_ELIGIBILITY, data)
        .then((response) => {
          //let message = response.data.detail;
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          Toast.showError(error.message);
          reject(error);
        });
    });
  };
}
