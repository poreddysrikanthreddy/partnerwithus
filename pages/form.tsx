import type { NextPage } from "next";
import Head from "next/head";
//import Image from "next/image";
import {
  useReducer,
  useEffect,
  useState,
  useRef,
  ChangeEventHandler,
} from "react";
import TextInput from "../app/components/elements/textInput";
import Button from "../app/components/elements/button";
import StepIndicator from "../app/components/elements/step";
import FormValidation from "../app/validation/form";
import {
  errorInitialState,
  ErrorReducer,
  initialState,
  Reducer,
} from "./formReducer";
import { DropDown } from "../app/components/elements/dropDown";
import ValidationMessage from "../app/constants/validationMessage";
import { SellerRegisterationService } from "../app/network/gateway/SellerRegisterationService";
import Color from "../app/constants/color";
import bankList from "../app/constants/banks";
//import AutoComplete from "react-google-autocomplete";

//import constants from "../app/constants/constant";
import AutoCompleteTextInput from "../app/components/elements/autocomplete";
import Country from "../app/constants/staticContent/Country";
import LoadingSpinner from "../app/components/elements/loadingSpinner";
import TermsCondition1 from "../app/constants/staticContent/terms1";
import TermsCondition2 from "../app/constants/staticContent/terms2";
import TermsCondition3 from "../app/constants/staticContent/terms3";
import Toast from "../app/utils/Toast";
import { useRouter } from "next/router";
import Validators from "../app/utils/Validator";
import constants from "../app/constants/constant";

const Form: NextPage = () => {
  const route = useRouter();
  const [state, dispatch] = useReducer(Reducer, initialState);
  const gstFileRef: any = useRef(null);
  const panDocumentFileRef: any = useRef(null);
  const bankFileRef: any = useRef(null);
  const signatureRef: any = useRef(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [stateDataSource, setStateDataSource] = useState<any>([]);
  const [cityDataSource, setCityDataSource] = useState<any>([]);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [forgotPasswordData, setForgotPasswordData] = useState<any>({
    email: "",
    otp: "",
    otp_sent: false,
    error: "",
    request_id: "",
    customer_id: "",
    is_verified: false,
    confirm_password: "",
    new_password: "",
  });
  const [errorState, errorDispatch] = useReducer(
    ErrorReducer,
    errorInitialState
  );
  const [activeTab, setActiveTab] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [stepList] = useState([
    "Username & Password",
    "Business Details",
    "Rupifi (BNPL)",
    "Bank Details",
    "GST/PAN Details",
    "Your Preferences",
    "Online Presence",
    "Social Media",
    "Pricing Table",
    "Onboarding Form & E-sign",
  ]);

  const [invalidAnswer, setInvalidAnswer] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [rupifiOption] = useState({
    id: "rupifiOption",
    name: "Do you want to continue with Rupifi(BNPL)?",
    options: ["Yes", "No"],
  });
  const [applyForRupifi, setApplyForRupifi] = useState<boolean>(false);

  useEffect(() => {
    getAllStates();
    getShoppingPreferencesAPI();
    return () => {};
  }, []);

  useEffect(() => {
    getAllCities();
    return () => {};
  }, [state.businessDetails.state]);

  //****************Validtion****************

  function isValidForm(type: number) {
    console.log("Active page", type, state);
    let response: any;
    switch (type) {
      case 0:
        response = FormValidation.UserNamePassword(state.userDetails, isLogin);

        errorDispatch({
          type: "Username&Password",
          payload: response,
        });

        return response.isValid;
      case 1:
        response = FormValidation.BuniessDetail(state.businessDetails);

        errorDispatch({
          type: "BusniessDetails",
          payload: response,
        });

        return response.isValid;
      case 2:
        response = FormValidation.RupifiDetails(state.rupifiDetails);
        errorDispatch({
          type: "RupifiDetails",
          payload: response,
        });

        return response.isValid;
      case 3:
        response = FormValidation.BankDetail(state.bankDetails);

        errorDispatch({
          type: "BankDetails",
          payload: response,
        });

        return response.isValid;
      case 4:
        response = FormValidation.GstPanDetail(state.gst_pan_doc);

        errorDispatch({
          type: "gst_pan_doc",
          payload: response,
        });
        if (response.gst_document != "") {
          Toast.showError(response.gst_document);
        } else if (response.pan_document != "") {
          Toast.showError(response.pan_document);
        }
        return response.isValid;
      case 5:
        response = FormValidation.ShoppingPreference(state.shoppingPreferences);

        errorDispatch({
          type: "shoppingPreference",
          payload: response,
        });

        if (response.preference_selection != "") {
          Toast.showError(response.preference_selection);
        }

        return response.isValid;
      case 6:
        response = FormValidation.OnlinePresense(state.onlinePresense);

        errorDispatch({
          type: "onlinePresense",
          payload: response,
        });

        return response.isValid;
      case 7:
        response = FormValidation.SocialLinks(state.socialMedia);
        errorDispatch({
          type: "SocialMedia",
          payload: response,
        });
        return response.isValid;
      case 8:
        return true;
      case 9:
        response = FormValidation.OnboardingForm(state.termsAndConditions);

        if (response.accept_terms != "") {
          Toast.showError(response.accept_terms);
        }
        errorDispatch({
          type: "Onboarding",
          payload: response,
        });
        return response.isValid;

      default:
        break;
    }
  }

  //***************FIND ALL CITIES BASED ON SELECTED STATE********** */
  function getAllCities() {
    let selectedStateData = Country.states.filter((info) => {
      return info.name === state.businessDetails.state;
    });

    if (selectedStateData.length > 0) {
      let response;
      response = selectedStateData[0].cities.map((item: any, index: number) => {
        return item.name;
      });
      setCityDataSource(response);
    } else {
      setCityDataSource([]);
    }
  }

  //***************FIND ALL STATES********** */
  function getAllStates() {
    let response;
    response = Country.states.map((item: any, index: number) => {
      return item.name;
    });
    setStateDataSource(response);
  }

  //***************Validate Answer********** */
  function isValidAnswer(type: number) {
    let response = false;
    state?.onlinePresense?.items?.map((item: any, index: number) => {
      if (type == index) {
        response = item.answer == "" ? false : true;
      }
    });
    setInvalidAnswer(response ? "" : ValidationMessage.valid_answer);
    return response;
  }

  //****************FILE UPLAODING FUNCTIONS START****************
  function onFileChange(event: any) {
    if (event.target.name == "GST_Registration_Certificate") {
      uploadDoc(event.target.files[0], 3);
    } else if (event.target.name == "Aadhaar_Registration_Certificate") {
      uploadDoc(event.target.files[0], 2);
    } else if (event.target.name == "cancelled_cheque") {
      uploadDoc(event.target.files[0], 1);
    } else if (event.target.name == "E-Signature") {
      uploadDoc(event.target.files[0], 4);
    }
  }

  function resetFileUpload(type: number) {
    if (type == 0) {
      dispatch({
        type: "cancelled_cheque",
        payload: undefined,
      });
    } else if (type == 1) {
      dispatch({
        type: "gst_document",
        payload: undefined,
      });
    } else if (type == 2) {
      dispatch({
        type: "pan_document",
        payload: undefined,
      });
    } else if (type == 3) {
      dispatch({
        type: "e_signature_file",
        payload: undefined,
      });
    }
  }

  const onGSTBtnClick = () => {
    gstFileRef.current.click();
  };
  const onPanBtnClick = () => {
    panDocumentFileRef.current.click();
  };

  const onBankFileClick = () => {
    bankFileRef.current.click();
  };

  const onESignatureClick = () => {
    signatureRef.current.click();
  };
  //****************FILE UPLAODING FUNCTIONS END****************

  //*********************STEP INDICATOR ACTIONS*******************/

  function moveNextSlide() {
    if (activeTab < (stepList.length-1)) {
      setActiveTab(activeTab + 1);
    } else {
      route.replace("/congratulation");
    }
  }

  function nextButtonTabAction() {
    if (isValidForm(activeTab)) {
      if (activeTab == 0) {
        if (isLogin) {
          loginAPI();
        } else {
          signupAPI();
        }
      } else if (activeTab == 8) {
        moveNextSlide();
      } else {
        updateSellerAPI(activeTab);
      }
    }
  }

  //****************FORM API CALLING START****************
  async function loginAPI() {
    setLoading(true);
    let sellerObj = SellerRegisterationService.getInstance("");
    sellerObj
      .sellerLogin({
        data: {
          token: "token",
          ...state.userDetails,
        },
      })
      .then((response: any) => {
        if (response != "") {
          getCustomerAPI(
            response?.data?.data?.customer_id,
            response?.data?.data
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  async function signupAPI() {
    setLoading(true);
    let sellerObj = SellerRegisterationService.getInstance("");
    sellerObj
      .sellerSignup({
        data: state.userDetails,
      })
      .then((response) => {
        if (response != "") {
          //moveNextSlide();
          Toast.showSuccess(ValidationMessage.signupSuccess)
          route.replace("/");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  async function updateSellerAPI(activeTab: number) {
    if (state.auth?.customer_id) {
      let requestData = {};
      switch (activeTab) {
        case 1:
          requestData = state.businessDetails;
          break;
        case 2:
          requestData = {
            rupifi_details: JSON.stringify(state.rupifiDetails),
          };
          break;
        case 3:
          requestData = state.bankDetails;
          break;
        case 4:
          requestData = state.gst_pan_doc;
          break;
        case 5:
          requestData = {
            shopping_preferences: JSON.stringify(
              state.shoppingPreferences.items
            ),
          };
          break;
        case 6:
          requestData = {
            business_operations: JSON.stringify(state.onlinePresense.items),
          };
          break;
        case 7:
          requestData = state.socialMedia;
          break;
        case 8:
            break;
        case 9:
          requestData = {
            ...state.pricingDetail,
            ...state.termsAndConditions,
          };
          break;
        default:
          break;
      }
      setLoading(true);
      let sellerObj = SellerRegisterationService.getInstance("");
      sellerObj
        .sellerUpdate({
          data: {
            data: {
              type: "customer",
              ...requestData,
            },
          },
          customerId: state.auth?.customer_id,
        })
        .then((response) => {
          if (response != "") {
            moveNextSlide();
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      Toast.showError(ValidationMessage.loginRequired);
    }
  }

  async function getShoppingPreferencesAPI() {
    setLoading(true);
    let sellerObj = SellerRegisterationService.getInstance("");
    sellerObj
      .getShoppingPreferences()
      .then((response: any) => {
        if (response != "") {
          setCategoryList(response?.data?.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  async function getCustomerAPI(customerId: any, auth: any) {
    let sellerObj = SellerRegisterationService.getInstance("");
    sellerObj
      .getCustomer({
        customerId,
      })
      .then((response: any) => {
        if (response != "" && response != undefined) {
          let responsePayload: any = {
            ...initialState,
            auth: auth,
            userDetails: response?.data?.data?.userDetails,
            businessDetails: response?.data?.data?.businessDetails,
            rupifiDetails: response?.data?.data?.rupify?.rupifi_details
              ? JSON.parse(response?.data?.data?.rupify?.rupifi_details)
              : initialState?.rupifiDetails,
            bankDetails: response?.data?.data?.bankDetails,
            gst_pan_doc: response?.data?.data?.gst_pan_doc,
            shoppingPreferences: response?.data?.data?.shoppingPreference
              ?.shopping_preferences
              ? {
                  items: JSON.parse(
                    response?.data?.data?.shoppingPreference
                      ?.shopping_preferences
                  ),
                }
              : initialState?.shoppingPreferences,
            onlinePresense: response?.data?.data?.businessOperations
              ?.business_operations
              ? {
                  items: JSON.parse(
                    response?.data?.data?.businessOperations
                      ?.business_operations
                  ),
                }
              : initialState?.onlinePresense,
            socialMedia: response?.data?.data?.socialMedia,
            pricingDetail: response?.data?.data?.pricingDetail,
            termsAndConditions: response?.data?.data?.termsAndConditions,
          };
          dispatch({
            type: "overlapInitialState",
            payload: responsePayload,
          });

          checkUserCompletedSteps(responsePayload);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(error);
      });
  }

  function uploadDoc(file: any, type: number) {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("doc_type", type.toString());

    let sellerObj = SellerRegisterationService.getInstance("");
    sellerObj
      .uploadDocumentation(formData)
      .then((response: any) => {
        if (response != "") {
          switch (type) {
            case 1:
              dispatch({
                type: "cancelled_cheque",
                payload: response.data.data[0].Location,
              });
              break;
            case 2:
              dispatch({
                type: "pan_document",
                payload: response.data.data[0].Location,
              });
              break;
            case 3:
              dispatch({
                type: "gst_document",
                payload: response.data.data[0].Location,
              });
              break;
            case 4:
              dispatch({
                type: "e_signature_file",
                payload: response.data.data[0].Location,
              });
              break;
            default:
              break;
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }
  //****************FORM API CALLING END****************

  //****************GOOGLE AUTO COMPLETE START****************
  function getReverseGeocodingData(lat: number, lng: number) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ latLng: latlng }, (results: any, status: number) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        alert(status);
      }
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results);
        autoCompleteSelectedPlace(results[0]);
      }
    });
  }

  function autoCompleteSelectedPlace(results: any) {
    let address = results.formatted_address;
    let state =
      results?.address_components[results.address_components.length - 3]
        ?.long_name ?? "";
    let city =
      results?.address_components[results.address_components.length - 4]
        ?.long_name ?? "";

    console.log("state=>", state, "city=>", city);

    dispatch({
      type: "business_location",
      payload: address,
    });

    if (stateDataSource.includes(state)) {
      let selectedStateData = Country.states.filter((info) => {
        return info.name === state;
      });

      if (selectedStateData.length <= 0) {
        state = "";
        city = "";
      }
    } else {
      state = "";
      city = "";
    }

    dispatch({
      type: "state",
      payload: state,
    });

    dispatch({
      type: "city",
      payload: city,
    });
  }

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      getReverseGeocodingData(
        position.coords.latitude,
        position.coords.longitude
      );
    });
  }
  //****************GOOGLE AUTO COMPLETE END****************

  /*********Verify third party APIs */
  async function sendOTP() {
    if (state.businessDetails.whatsapp_number) {
      let sellerObj = SellerRegisterationService.getInstance("");
      sellerObj
        .sendOTP({
          mobileNumber: state.businessDetails.whatsapp_number,
        })
        .then((response: any) => {
          if (response != "") {
            dispatch({
              type: "whats_app_otp_sent",
              payload: true,
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      Toast.showError(ValidationMessage.whatsappNumber);
    }
  }
  async function verifyWhatsappNumber() {
    if (state.businessDetails.whatsapp_number) {
      let requestData: any = {
        mobile_number: state.businessDetails.whatsapp_number,
        otp: state.businessDetails.whats_app_otp,
      };
      let sellerObj = SellerRegisterationService.getInstance("");
      sellerObj
        .verifyOTP(requestData)
        .then((response: any) => {
          if (response != "") {
            if (response?.data?.valid) {
              dispatch({
                type: "isWhatsappVerified",
                payload: true,
              });
              Toast.showSuccess(response?.data?.msg);
            } else {
              Toast.showError(response?.data?.msg);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      Toast.showError(ValidationMessage.whatsappNumber);
    }
  }

  async function sendOTPEmail() {
    let requestData: any = {
      email: forgotPasswordData.email,
    };
    let sellerObj = SellerRegisterationService.getInstance("");
    sellerObj
      .sendOTPEmail(requestData)
      .then((response: any) => {
        if (response != "") {
          if (response?.data?.valid) {
            Toast.showSuccess(response?.data?.msg);
            setForgotPasswordData({
              ...forgotPasswordData,
              request_id: response?.data?._id,
            });
          } else {
            Toast.showError(response?.data?.msg);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  async function updateCustomerRecord() {
    let requestData: any = {
      data: {
        type: "customer",
        password: "password1",
      },
      customer_id: forgotPasswordData.customer_id,
    };
    let sellerObj = SellerRegisterationService.getInstance("");
    sellerObj
      .updateCustomer(requestData)
      .then((response: any) => {
        if (response != "") {
          if (response?.data?.valid) {
            Toast.showSuccess(response?.data?.msg);
          } else {
            Toast.showError(response?.data?.msg);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  async function checkCustomerEmailExist() {
    let requestData: any = {
      email: forgotPasswordData.email,
    };
    let sellerObj = SellerRegisterationService.getInstance("");
    sellerObj
      .getCustomerEmail(requestData)
      .then((response: any) => {
        console.log("Tasdasr", response?.data?.data.id);
        if (response.status == 200) {
          Toast.showSuccess(response?.data?.msg);
          setForgotPasswordData({
            ...forgotPasswordData,
            customer_id: response?.data?.data.id,
          });
          sendOTPEmail();
        } else {
          Toast.showError(response?.data?.msg);
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  async function verifyEmailOTP() {
    let requestData: any = {
      req_id: forgotPasswordData.request_id,
      otp: forgotPasswordData.otp,
    };
    let sellerObj = SellerRegisterationService.getInstance("");
    sellerObj
      .verifyEmailOTP(requestData)
      .then((response: any) => {
        if (response != "") {
          if (response?.data?.valid) {
            setForgotPasswordData({
              ...forgotPasswordData,
              is_verified: true,
            });
            Toast.showSuccess(response?.data?.msg);
          } else {
            Toast.showError(response?.data?.msg);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  async function verifyGST() {
    if (state.businessDetails.gst_number) {
      let date = new Date();
      let year = date.getFullYear();
      let fy = year + "-" + (year - 2000 + 1);
      let requestData: any = {
        gstin: state.businessDetails.gst_number,
        fetchFilings: true,
        fy,
      };
      let sellerObj = SellerRegisterationService.getInstance("");
      sellerObj
        .verifyGST(requestData)
        .then((response: any) => {
          if (response != "") {
            if (response?.data?.valid) {
              dispatch({
                type: "isGSTVerified",
                payload: true,
              });
              Toast.showSuccess(response?.data?.msg);
            } else {
              Toast.showError(response?.data?.msg);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      Toast.showError(ValidationMessage.gstNumber);
    }
  }
  async function verifyBankDetails() {
    if (
      state.bankDetails.bank_name &&
      state.bankDetails.ifsc_code &&
      state.bankDetails.account_number
    ) {
      let requestData: any = {
        ifsc: state.bankDetails.ifsc_code,
        acc: state.bankDetails.account_number,
      };
      let sellerObj = SellerRegisterationService.getInstance("");
      sellerObj
        .verifyBankDetails(requestData)
        .then((response: any) => {
          if (response != "") {
            if (response?.data?.valid) {
              dispatch({
                type: "isBankAcVerified",
                payload: true,
              });
              Toast.showSuccess(response?.data?.msg);
            } else {
              Toast.showError(response?.data?.msg);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      Toast.showError(ValidationMessage.bank_details);
    }
  }
  async function verifyUPI() {
    if (state.bankDetails.upi_id) {
      let requestData: any = {
        vpa: state.bankDetails.upi_id,
      };
      let sellerObj = SellerRegisterationService.getInstance("");
      sellerObj
        .verifyUPI(requestData)
        .then((response: any) => {
          if (response != "") {
            if (response?.data?.valid) {
              dispatch({
                type: "isUPIVerified",
                payload: true,
              });
              Toast.showSuccess(response?.data?.msg);
            } else {
              Toast.showError(response?.data?.msg);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      Toast.showError(ValidationMessage.upi_id);
    }
  }
  /***********Verify third party APIs END */

  /**************HANDLE RUPIFI */
  async function handleRupifiAccessToken(type: string, payload: string) {
    setLoading(true);
    //handle page loader - todo
    if (state.businessDetails.whatsapp_number) {
      dispatch({ type, payload });
      let rpf_token: any = localStorage.getItem("rpf_token");
      if (rpf_token) {
        rpf_token = JSON.parse(rpf_token);
      }
      if (rpf_token && rpf_token.expiryTime > new Date().getTime()) {
        // token is not expired
        setApplyForRupifi(true);
        setLoading(false);
      } else {
        // tokne expired and create new one
        let requestData: any = {
          merchantId: constants.RUPIFI.MERCHANT_ID,
          merchantSecret: constants.RUPIFI.MERCHANT_SECRET,
        };
        let sellerObj = SellerRegisterationService.getInstance("");
        sellerObj
          .getRupifiAccessToken(requestData)
          .then((response: any) => {
            if (response != "") {
              if (response?.data?.accessToken) {
                response.data.expiryTime =
                  parseInt(response.data.expiryTime) + new Date().getTime();
                localStorage.setItem(
                  "rpf_token",
                  JSON.stringify(response?.data)
                );
                setApplyForRupifi(true);
              } else {
                Toast.showError(
                  "Something went working with Rupifi, Please try again later"
                );
              }
            }
            setLoading(false);
          })
          .catch((error) => {
            Toast.showError(
              "Something went working with Rupifi, Please try again later"
            );
            setApplyForRupifi(false);
            setLoading(false);
          });
      }
    } else {
      Toast.showError(ValidationMessage.whatsappNumber);
      setLoading(false);
    }
  }

  async function checkRupifiEligibility() {
    setLoading(true);

    let requestData: any = {
      merchantCustomerRefId: state.auth?.customer_id,
      phone: state.businessDetails.whatsapp_number,
      updateGMV: false,
    };
    let sellerObj = SellerRegisterationService.getInstance("");
    sellerObj
      .checkRupifiCreditEligibility(requestData)
      .then((response: any) => {
        if (response != "") {
          if (response?.data?.success) {
            // user activation link
            dispatch({
              type: "handleRupifiStatus",
              payload: response?.data?.data?.status,
            });
            dispatch({
              type: "handleRupifiActivationUrl",
              payload: response?.data?.data?.activationUrl,
            });
          } else {
            Toast.showError(response?.data?.message);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        Toast.showError(
          "Something went working with Rupifi, Please try again later"
        );
        setLoading(false);
      });
  }
  //****************RENDER VIEWS****************

  function checkUserCompletedSteps(data: any) {
    let completedSteps = 1;
    let response: any = { isValid: false };
    for (let step = 0; step < stepList.length; step++) {
      if (step == 1) {
        response = FormValidation.BuniessDetail(data.businessDetails, false);
        console.log("BuniessDetailresponse", response);
        if (response.isValid) {
          completedSteps = step;
        } else {
          break;
        }
      } else if (step == 3) {
        response = FormValidation.BankDetail(data.bankDetails);
        if (response.isValid) {
          completedSteps = step;
        } else {
          break;
        }
      } else if (step == 4) {
        response = FormValidation.GstPanDetail(data.gst_pan_doc);
        if (response.isValid) {
          completedSteps = step;
        } else {
          break;
        }
      } else if (step == 5) {
        response = FormValidation.ShoppingPreference(data.shoppingPreferences);
        if (response.isValid) {
          completedSteps = step;
        } else {
          break;
        }
      } else if (step == 6) {
        response = FormValidation.OnlinePresense(data.onlinePresense);
        if (response.isValid) {
          completedSteps = step;
        } else {
          break;
        }
      } else if (step == 7) {
        response = FormValidation.SocialLinks(data.socialMedia);
        console.log("completedSteps6", response);
        if (response.isValid) {
          completedSteps = step;
        } else {
          break;
        }
      } else if (step == 9) {
        response = FormValidation.OnboardingForm(data.termsAndConditions);

        if (response.accept_terms != "") {
          response.isValid = false;
          Toast.showError(response.accept_terms);
        }
        if (response.isValid) {
          completedSteps = step;
        } else {
          break;
        }
      }
    }
    console.log("completedSteps", completedSteps);
    setActiveTab(completedSteps);
  }

  //****************RENDER VIEWS****************

  //****************BUSNIESS INFORMATION****************
  function renderBusinessInformation() {
    console.log(state?.auth);
    return (
      <div className="tab-pane active" role="tabpanel" id="step1">
        <div className="step-title-area">
          <h4 className="step-title">Let’s get to know your business</h4>
        </div>
        <div className="row">
          <TextInput
            placeholder=""
            label="Brand Name"
            name="Brand Name"
            value={state.businessDetails.brand_name}
            error={errorState.businessDetails.brand_name}
            onChange={(event) => {
              dispatch({
                type: "brand_name",
                payload: event.target.value,
              });
            }}
          />
          <DropDown
            data={stateDataSource}
            placeholder="-- Select State --"
            name="State"
            value={state.businessDetails.state}
            error={errorState.businessDetails.state}
            onChange={(event) => {
              dispatch({
                type: "state",
                payload: event.target.value,
              });
            }}
          />

          <TextInput
            placeholder=""
            label="Company Name"
            name="Company Name"
            value={state.businessDetails.company_name}
            error={errorState.businessDetails.company_name}
            onChange={(event) => {
              dispatch({
                type: "company_name",
                payload: event.target.value,
              });
            }}
          />

          <DropDown
            data={cityDataSource}
            placeholder="-- Select City --"
            name="City"
            value={state.businessDetails.city}
            error={errorState.businessDetails.city}
            onChange={(event) => {
              dispatch({
                type: "city",
                payload: event.target.value,
              });
            }}
          />

          <AutoCompleteTextInput
            placeholder=""
            label="Business Location"
            name="Business Location"
            value={state.businessDetails.business_location}
            error={errorState.businessDetails.business_location}
            rightIconClassName={"far fa-location-crosshairs fa-fw"}
            onRightClick={() => {
              getCurrentLocation();
            }}
            onPlaceSelected={(results) => {
              autoCompleteSelectedPlace(results);
            }}
            onChange={(event) => {
              dispatch({
                type: "business_location",
                payload: event.target.value,
              });
            }}
          />

          <TextInput
            placeholder=""
            label="GST No."
            name="GST No."
            error={errorState.businessDetails.gst_number}
            value={state.businessDetails.gst_number}
            rightButtonTitle={
              state.businessDetails.isGSTVerified ? "Verified" : "Verify"
            }
            rightButtonTextClass={
              state.businessDetails.isGSTVerified ? "text-success" : ""
            }
            disabled={state.businessDetails.isGSTVerified ? true : false}
            onRightClick={() => {
              if (!state.businessDetails.isGSTVerified) {
                verifyGST();
              }
            }}
            onChange={(event) => {
              dispatch({
                type: "gst_number",
                payload: event.target.value,
              });
            }}
          />

          <TextInput
            placeholder=""
            type={"number"}
            label="Whatsapp Number"
            name="Whatsapp Number"
            error={errorState.businessDetails.whatsapp_number}
            value={state.businessDetails.whatsapp_number}
            rightButtonTitle={
              state.businessDetails.isWhatsappVerified
                ? "Verified"
                : state.businessDetails.otp_sent
                ? "OTP sent"
                : "Send OTP"
            }
            rightButtonTextClass={
              state.businessDetails.isWhatsappVerified ? "text-success" : ""
            }
            disabled={state.businessDetails.isWhatsappVerified ? true : false}
            onRightClick={() => {
              if (!state.businessDetails.isWhatsappVerified) {
                //sendOTP()
                dispatch({
                  type: "whats_app_otp_sent",
                  payload: true,
                });
              }
            }}
            onChange={(event) => {
              dispatch({
                type: "whatsapp_number",
                payload: event.target.value,
              });
            }}
          />

          {state.businessDetails.otp_sent &&
            !state.businessDetails.isWhatsappVerified && (
              <TextInput
                placeholder=""
                label="Verify OTP"
                name="Verify OTP"
                type={"number"}
                error={errorState.businessDetails.whats_app_otp}
                value={state.businessDetails.whats_app_otp}
                rightButtonTitle={"Verify"}
                onRightClick={() => {
                  //verifyWhatsappNumber()
                  dispatch({
                    type: "isWhatsappVerified",
                    payload: true,
                  });
                }}
                onChange={(event) => {
                  dispatch({
                    type: "whats_app_otp",
                    payload: event.target.value,
                  });
                }}
              />
            )}
        </div>
      </div>
    );
  }

  //****************RUPIFI DETAILS****************
  function renderRupifiDetails() {
    return (
      <div className="tab-pane active" role="tabpanel" id="step2">
        <div className="step-title-area">
          <h4 className="step-title">Rupifi (BNPL)</h4>
        </div>
        <div className="row mb-3 mb-md-5">
          <div className="col-lg-9">
            <div className="radio-area">
              <h5>{rupifiOption.name}</h5>
              {rupifiOption?.options?.map((answer: any, key: number) => {
                return (
                  <div key={key} className="radio-item">
                    <label className="radio-container">
                      {answer}
                      <input
                        type="radio"
                        value={answer}
                        name={"_answer_" + rupifiOption.id}
                        checked={state.rupifiDetails.rupifi_option == answer}
                        onChange={(event) => {
                          if (answer == "Yes") {
                            handleRupifiAccessToken(
                              "handleRupifiOption",
                              answer
                            );
                          } else {
                            dispatch({
                              type: "handleRupifiOption",
                              payload: answer,
                            });
                          }
                        }}
                      />
                      <span className="radio-checkmark"></span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-lg-12">
            <label className="text-danger mb-0">
              {errorState.rupifiDetails.rupifi_option}
            </label>
          </div>
          {
            state.rupifiDetails.rupifi_option == "Yes" &&
            (
              <div>
                &nbsp;&nbsp;&nbsp;
                <label className={"text-"+(state.rupifiDetails.rupifi_status == "ACTIVE"?"success":"warning")}>Rupifi Account Status: {state.rupifiDetails.rupifi_status ?? "PENDING"}</label>
              </div>
            )
          }
          {state.rupifiDetails.rupifi_option == "Yes" &&
            applyForRupifi &&
            (
              state.rupifiDetails.rupifi_status == ""
            ) && (
              <div className="col-lg-12 text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => checkRupifiEligibility()}
                >
                  Check Credit Eligibility
                </button>
              </div>
            )}
          {state.rupifiDetails.rupifi_option == "Yes" &&
            applyForRupifi &&
            (
              state.rupifiDetails.rupifi_status == "PRE_APPROVED" ||
              state.rupifiDetails.rupifi_status == "INCOMPLETE"
            ) && (
              <>
                <div className="col-lg-9">
                  <label className="text-success">
                    <b>Congratulations!!</b> You are eligible for applying
                    Rupifi(BNPL) Your are one step away to avail credit of
                    Amount.
                  </label>
                </div>
                <div className="col-lg-3 text-right">
                  <a
                    href={state.rupifiDetails.activationUrl}
                    className="btn btn-primary"
                  >
                    Apply Now
                  </a>
                </div>
              </>
            )}
          <div className="col-lg-12">
            <label className="text-danger mb-0">
              {errorState.rupifiDetails.rupifi_status}
            </label>
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-4">
            Don't know about Rupifi (BNPL)?{" "}
            <a
              style={{ color: "rgb(48, 0, 86)" }}
              target={"_blank"}
              href="https://www.rupifi.com/bnpl"
            >
              click here <i className="far fa-arrow-up-right fa-fw"></i>
            </a>{" "}
            to learn more.
          </div>
        </div>
      </div>
    );
  }

  //****************USERNAME AND PASSWORD****************
  function renderUserNamePassword() {
    return (
      <div className="tab-pane active" role="tabpanel" id="step0">
        <div className="step-title-area">
          <h4 className="step-title">Create your Account</h4>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4">
            <TextInput
              error={errorState.userDetails.name}
              colClass="col-lg-12"
              placeholder="Enter name"
              label="Enter name"
              name="name"
              value={state.userDetails.name}
              onChange={(event) => {
                dispatch({
                  type: "name",
                  payload: event.target.value,
                });
              }}
            />
            <TextInput
              colClass="col-lg-12"
              error={errorState.userDetails.email}
              placeholder="Official e-mail ID"
              label="Official e-mail ID"
              name="Official e-mail ID"
              type={"email"}
              value={state.userDetails.email}
              onChange={(event) => {
                dispatch({
                  type: "email",
                  payload: event.target.value,
                });
              }}
            />
            <TextInput
              colClass="col-lg-12"
              error={errorState.userDetails.password}
              placeholder="Password"
              type={"password"}
              label="Password"
              name="Password"
              value={state.userDetails.password}
              onChange={(event) => {
                dispatch({
                  type: "password",
                  payload: event.target.value,
                });
              }}
            />
          </div>
          <div className="col-lg-6 mb-4">
            <div className="account-info">
              <h5 className="text-white">Password Must Contain:</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <i className="far fa-arrow-up-right fa-fw"></i>
                  <span>At least 12 characters</span>
                </li>
                <li>
                  <i className="far fa-arrow-up-right fa-fw"></i>
                  <span>One upper case character</span>
                </li>
                <li>
                  <i className="far fa-arrow-up-right fa-fw"></i>
                  <span>One lower case character</span>
                </li>
                <li>
                  <i className="far fa-arrow-up-right fa-fw"></i>
                  <span>One special character</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="form-group">
              <div className="switch">
                <input
                  type="checkbox"
                  id="switch"
                  onClick={() => {
                    dispatch({
                      type: "different_otp_email",
                      payload: !state.userDetails.different_otp_email,
                    });
                  }}
                />
                <label htmlFor="switch" className="">
                  Use different e-mail for OTP
                </label>
              </div>
              <br />
            </div>
          </div>
          {state.userDetails.different_otp_email && (
            <TextInput
              error={errorState.userDetails.email_for_otp}
              placeholder="E-mail for OTP"
              label="E-mail for OTP"
              name="E-mail for OTP"
              value={state.userDetails.email_for_otp}
              onChange={(event) => {
                dispatch({
                  type: "email_for_otp",
                  payload: event.target.value,
                });
              }}
            />
          )}
          <div className={"col-lg-6"}>
            <span style={{ color: Color.black, paddingLeft: 16 }}>
              Already have an account? &nbsp;
              <button
                onClick={() => {
                  setIsLogin(true);
                }}
                type="button"
                className="bg-transparent p-0 border-0"
              >
                <span style={{ color: Color.primaryColor }}> Sign In</span>
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }

  function renderResetPassword() {
    return (
      <div className="tab-pane active" role="tabpanel" id="step2">
        <div className="step-title-area">
          <h4 className="step-title">Create Your Password</h4>
        </div>

        <div className="row">
          <div className="col-lg-12 mb-4">
            <TextInput
              // error={errorState.userDetails.name}
              colClass="col-lg-12"
              placeholder="Enter new password"
              label="Enter new password"
              name="Enter new password"
              type={"password"}
              value={forgotPasswordData.new_password}
              onChange={(event) => {
                setForgotPasswordData({
                  ...forgotPasswordData,
                  new_password: event.target.value,
                });
              }}
            />

            <TextInput
              // error={errorState.userDetails.name}
              colClass="col-lg-12"
              placeholder="Enter new password"
              label="Confirm new password"
              name="Confirm new password"
              type={"password"}
              value={forgotPasswordData.confirmPassword}
              onChange={(event) => {
                setForgotPasswordData({
                  ...forgotPasswordData,
                  confirm_password: event.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  //****************LOGIN VIEW****************
  function renderLoginView() {
    return (
      <div className="tab-pane active" role="tabpanel" id="step2">
        <div className="step-title-area">
          <h4 className="step-title">Login</h4>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-4">
            <TextInput
              colClass="col-lg-12"
              error={errorState.userDetails.email}
              placeholder="E-mail ID"
              label="E-mail ID"
              name="E-mail ID"
              type={"email"}
              value={state.userDetails.email}
              onChange={(event) => {
                dispatch({
                  type: "email",
                  payload: event.target.value,
                });
              }}
            />
            <TextInput
              colClass="col-lg-12"
              error={errorState.userDetails.password}
              placeholder="Password"
              type={"password"}
              label="Password"
              name="Password"
              value={state.userDetails.password}
              onChange={(event) => {
                dispatch({
                  type: "password",
                  payload: event.target.value,
                });
              }}
            />
            <div className="row">
              <div className={"col-lg-6"}>
                <span style={{ color: Color.black, paddingLeft: 16 }}>
                  Don't have an account? &nbsp;
                  <button
                    onClick={() => {
                      setIsLogin(false);
                    }}
                    type="button"
                    className="bg-transparent p-0 border-0"
                  >
                    <span style={{ color: Color.primaryColor }}> Sign Up</span>
                  </button>
                </span>
              </div>
              <div className={"col-lg-6"}>
                <p className="text-right">
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setForgotPassword(true);
                    }}
                    type="button"
                    className="bg-transparent p-0 border-0"
                  >
                    <span style={{ color: Color.primaryColor }}>
                      Forgot Password?
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //****************LOGIN VIEW****************
  function renderForgotPasswordView() {
    return (
      <div className="tab-pane active" role="tabpanel" id="step2">
        <div className="step-title-area">
          <h4 className="step-title">Forgot Password</h4>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <TextInput
              error={forgotPasswordData.error}
              placeholder="E-mail ID"
              colClass="col-lg-12"
              label="E-mail ID"
              name="E-mail ID"
              type={"email"}
              value={forgotPasswordData.email}
              disabled={forgotPasswordData.otp_sent}
              rightButtonTitle={
                state.bankDetails.isBankAcVerified ? "Verified" : "Verify"
              }
              rightButtonTextClass={
                state.bankDetails.isBankAcVerified ? "text-success" : ""
              }
              onRightClick={() => {
                if (!Validators.isEmailValid(forgotPasswordData.email)) {
                  setForgotPasswordData({
                    ...forgotPasswordData,
                    error: ValidationMessage.validEmail,
                  });
                } else {
                  checkCustomerEmailExist();
                }
              }}
              onChange={(event) => {
                setForgotPasswordData({
                  ...forgotPasswordData,
                  email: event.target.value,
                });
              }}
            />
          </div>
          {forgotPasswordData.request_id != "" && (
            <div className="col-lg-6 mb-4">
              <TextInput
                // error={forgotPasswordData.error}
                type={"number"}
                colClass="col-lg-12"
                placeholder="Email OTP"
                label="Email OTP"
                name="Email OTP"
                value={forgotPasswordData.otp}
                disabled={state.bankDetails.isBankAcVerified ? true : false}
                rightButtonTitle={
                  state.bankDetails.isBankAcVerified ? "Verified" : "Verify"
                }
                rightButtonTextClass={
                  state.bankDetails.isBankAcVerified ? "text-success" : ""
                }
                onRightClick={() => {
                  if (forgotPasswordData.otp.length == 6) {
                    verifyEmailOTP();
                  }
                }}
                onChange={(event) => {
                  setForgotPasswordData({
                    ...forgotPasswordData,
                    otp: event.target.value,
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  //****************BANK DETAILS****************
  function renderBankDetails() {
    return (
      <div className="tab-pane active" role="tabpanel" id="step3">
        <div className="step-title-area">
          <h4 className="step-title">Bank Details</h4>
        </div>
        <div className="row">
          <DropDown
            placeholder="-- Select Bank Name --"
            data={bankList}
            error={errorState.bankDetails.bank_name}
            value={state.bankDetails.bank_name}
            name="bank_name"
            onChange={(event) => {
              dispatch({
                type: "bank_name",
                payload: event.target.value,
              });
            }}
          />

          <TextInput
            error={errorState.bankDetails.ifsc_code}
            placeholder="IFSC Code"
            label="IFSC Code"
            name="IFSC Code"
            value={state.bankDetails.ifsc_code}
            disabled={state.bankDetails.isBankAcVerified ? true : false}
            onChange={(event) => {
              dispatch({
                type: "ifsc_code",
                payload: event.target.value,
              });
            }}
          />

          <TextInput
            error={errorState.bankDetails.account_number}
            type={"number"}
            placeholder="Account Number"
            label="Account Number"
            name="Account Number"
            value={state.bankDetails.account_number}
            disabled={state.bankDetails.isBankAcVerified ? true : false}
            rightButtonTitle={
              state.bankDetails.isBankAcVerified ? "Verified" : "Verify"
            }
            rightButtonTextClass={
              state.bankDetails.isBankAcVerified ? "text-success" : ""
            }
            onRightClick={() => {
              if (!state.bankDetails.isBankAcVerified) {
                verifyBankDetails();
              }
            }}
            onChange={(event) => {
              dispatch({
                type: "account_number",
                payload: event.target.value,
              });
            }}
          />

          <TextInput
            error={errorState.bankDetails.upi_id}
            placeholder="UPI ID"
            label="UPI ID"
            name="UPI ID"
            value={state.bankDetails.upi_id}
            disabled={state.bankDetails.isUPIVerified ? true : false}
            rightButtonTitle={
              state.bankDetails.isUPIVerified ? "Verified" : "Verify"
            }
            rightButtonTextClass={
              state.bankDetails.isUPIVerified ? "text-success" : ""
            }
            onRightClick={() => {
              if (!state.bankDetails.isUPIVerified) {
                verifyUPI();
              }
            }}
            onChange={(event) => {
              dispatch({
                type: "upi_id",
                payload: event.target.value,
              });
            }}
          />
          {state.bankDetails.cancelled_cheque ? (
            <div className="col-lg-6">
              <div className="form-group">
                <div className="uploaded-image">
                  <img
                    src={state.bankDetails.cancelled_cheque}
                    className="img-fluid"
                  />
                  <button
                    type="button"
                    className="refreshbtn"
                    onClick={() => resetFileUpload(0)}
                  >
                    <i className="far fa-arrow-rotate-right fa-fw"></i>
                  </button>
                  <button
                    className="upload-field form-btn form-btn-text bg-transparent p-0 border-0 check-done"
                    type="button"
                  >
                    <span>Uploaded</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <input
                id="cancelled_cheque"
                name="cancelled_cheque"
                ref={bankFileRef}
                type="file"
                accept="image/*"
                className="input-file"
                onChange={(event) => onFileChange(event)}
                onClick={(event: any) => {
                  event.target.value = null;
                }}
              />
              <TextInput
                error={errorState.bankDetails.cancelled_cheque}
                placeholder=""
                disabled={true}
                label="Cancelled Cheque"
                name="Cancelled Cheque"
                value={state.bankDetails.cancelled_cheque}
                rightIconClassName={"far fa-arrow-up-from-line fa-fw"}
                rightButtonTitle={"Upload"}
                onRightClick={() => onBankFileClick()}
                onChange={(event) => {
                  //
                }}
              />
            </>
          )}
        </div>
      </div>
    );
  }

  //****************GST PAN DETAILS****************
  function renderGstPanDetails() {
    console.log(state);
    return (
      <div className="tab-pane active" role="tabpanel" id="step4">
        <div className="step-title-area">
          <h4 className="step-title">GST/PAN Documents</h4>
        </div>
        <div className="row">
          {state.gst_pan_doc.gst_document ? (
            <div className="col-md-6 mb-5">
              <div className="form-uploader form-uploader-after text-center">
                <div className="form-uploader-image">
                  <img
                    src={state.gst_pan_doc.gst_document}
                    alt="gst"
                    style={{ maxWidth: 150, maxHeight: 134 }}
                    className="img-fluid w-100"
                  />
                  <div className="reupload-btn">
                    <button
                      onClick={() => resetFileUpload(1)}
                      type="button"
                      className="upload-btn"
                    >
                      <i className="fas fa-arrow-rotate-right fa-fw"></i>
                      <span>Re-Upload</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-6 mb-5">
              <div className="form-uploader text-center">
                <div className="form-uploader-image">
                  <div className="custom-file-upload">
                    <input
                      id="GST_Registration_Certificate"
                      name="GST_Registration_Certificate"
                      ref={gstFileRef}
                      type="file"
                      accept="image/*"
                      className="input-file"
                      onChange={(event) => onFileChange(event)}
                      onClick={(event: any) => {
                        event.target.value = null;
                      }}
                    />

                    <span className="input-group-btn">
                      <button
                        className="upload-field form-btn-text bg-transparent p-0 border-0"
                        type="button"
                        onClick={onGSTBtnClick}
                      >
                        <img
                          src="images/draw-image.png"
                          alt=""
                          className="img-fluid"
                        />
                      </button>
                    </span>
                  </div>
                </div>
                <h5 className="mb-0">GST Registration Certificate</h5>
              </div>
            </div>
          )}
          {state.gst_pan_doc.pan_document ? (
            <div className="col-md-6 mb-5">
              <div className="form-uploader form-uploader-after text-center">
                <div className="form-uploader-image">
                  <img
                    src={state.gst_pan_doc.pan_document}
                    alt=""
                    className="img-fluid w-100"
                    style={{ maxWidth: 150, maxHeight: 134 }}
                  />
                  <div className="reupload-btn">
                    <button
                      onClick={() => resetFileUpload(2)}
                      type="button"
                      className="upload-btn"
                    >
                      <i className="fas fa-arrow-rotate-right fa-fw"></i>
                      <span>Re-Upload</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-6 mb-4">
              <div className="form-uploader text-center">
                <div className="form-uploader-image">
                  <div className="custom-file-upload">
                    <input type="file" name="img[]" className="input-file" />

                    <input
                      id="Aadhaar_Registration_Certificate"
                      name="Aadhaar_Registration_Certificate"
                      ref={panDocumentFileRef}
                      type="file"
                      accept="image/*"
                      className="input-file"
                      onChange={(event) => onFileChange(event)}
                      onClick={(event: any) => {
                        event.target.value = null;
                      }}
                    />

                    <span className="input-group-btn">
                      <button
                        className="upload-field form-btn-text bg-transparent p-0 border-0"
                        type="button"
                        onClick={onPanBtnClick}
                      >
                        <img
                          src="images/draw-image.png"
                          alt=""
                          className="img-fluid"
                        />
                      </button>
                    </span>
                  </div>
                </div>
                <h5 className="mb-0">PAN Card</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  //****************PREFERENCES****************
  function renderYourPreferences() {
    return (
      <div className="tab-pane active" role="tabpanel" id="step5">
        {/* <div className="step-title-area">
          <h4 className="step-title">Your Shopping Preferences</h4>
          <p>Please select at least 2 Categories.</p>
        </div> */}

        <div className="step-title-area">
          <h4 className="step-title">Your Shopping Preferences</h4>
          <div className="row col-sm-12 col-lg-12">
            <div className="col-sm-9 col-lg-9">
              <p>Please select at least 2 Categories.</p>
            </div>
            <div className="col-sm-3 col-lg-3">
              <div className="policy-area">
                <label className="radio-container mb-2">
                  {categoryList.length == state.shoppingPreferences.items.length
                    ? "Unselect All"
                    : "Select All"}
                  <input
                    type="checkbox"
                    name="category"
                    checked={
                      categoryList.length ==
                      state.shoppingPreferences.items.length
                    }
                    onChange={(event) => {
                      let shoppingPref: any = [];
                      if (event.target.checked) {
                        shoppingPref = categoryList.map(
                          (item: any) => `${item.id}`
                        );
                      }
                      dispatch({
                        type: "shoppingPreferences",
                        payload: shoppingPref,
                      });
                    }}
                  />
                  <span className="radio-checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row category-row mb-3 mb-md-5">
          {categoryList?.map((item: any, index: number) => {
            let isSelected = state.shoppingPreferences.items?.includes(
              `${item.id}`
            );
            return (
              <div key={index} className="col-sm-6 col-lg-4">
                <div className={`category-area ${isSelected ? "active" : ""}`}>
                  <label className="cateory-checkbox">
                    <input
                      type="checkbox"
                      value={item.id}
                      checked={isSelected}
                      onChange={(event) => {
                        selectCategoryPreference(event);
                      }}
                    />
                    <img
                      src={
                        item?.category_image
                          ? item?.category_image
                          : "images/img1.png"
                      }
                      alt=""
                      className="img-fluid"
                    />
                    <span className="checkmark">
                      <i>{item.name}</i>
                    </span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function renderOnlinePresense() {
    return (
      <div className="tab-pane active" role="tabpanel" id="step6">
        <div className="step-title-area">
          <h4 className="step-title">Current Business Operations</h4>
        </div>
        {state?.onlinePresense?.items?.map((item: any, index: number) => {
          return (
            <div key={index}>
              {activeQuestion == index && (
                <div className="row mb-3 mb-md-5">
                  <div className="col-lg-9">
                    <div className="radio-area">
                      <h5>{item.name}</h5>

                      {item?.options?.map((answer: any, key: number) => {
                        return (
                          <div key={key} className="radio-item">
                            <label className="radio-container">
                              {answer}
                              <input
                                type="radio"
                                value={answer}
                                name={"_answer_" + item.id}
                                checked={item.answer == answer}
                                onChange={(event) => {
                                  dispatch({
                                    type: "handleOnlinePresense",
                                    payload: {
                                      optedAnswer: true,
                                      index,
                                      value: answer,
                                    },
                                  });
                                  setInvalidAnswer("");
                                }}
                              />
                              <span className="radio-checkmark"></span>
                            </label>
                          </div>
                        );
                      })}
                      {item?.customAnswer && (
                        <div className="radio-custom-item">
                          <TextInput
                            colClass="no-class"
                            placeholder="Custom answer"
                            label="Custom answer"
                            name="Custom answer"
                            value={item.answer}
                            onChange={(event) => {
                              dispatch({
                                type: "handleOnlinePresense",
                                payload: {
                                  optedAnswer: false,
                                  index,
                                  value: event.target.value,
                                },
                              });
                              if (event.target.value != "") {
                                setInvalidAnswer("");
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <label className="text-danger mb-0">{invalidAnswer}</label>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  function renderPricingTable() {
    return (
      <div className="tab-pane active" role="tabpanel" id="step8">
        <div className="row">
          <div className="col-xl-7">
            <div className="step-title-area">
              <h4 className="step-title">
                Pricing Tailored <span>For You.</span>
              </h4>
            </div>
          </div>
          <div className="col-xl-5">
            <div className="form-group d-flex align-items-center">
              <span className="font-sm mr-2">Billed Monthly</span>
              <div className="switch">
                <input
                  type="checkbox"
                  id="toggle"
                  checked={
                    state.pricingDetail.billing_option == "monthly"
                      ? false
                      : true
                  }
                  onChange={(event) => {
                    dispatch({
                      type: "billing_option",
                      payload:
                        state.pricingDetail.billing_option == "monthly"
                          ? "annually"
                          : "monthly",
                    });
                  }}
                />
                <label htmlFor="toggle" className="">
                  Billed Annually
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row pricing-row mb-4">
          <div className="col-md-6 col-xl-4 mb-4">
            <div
              className={
                "pricing-table " +
                (state.pricingDetail.plan_type == "Free" ? "active" : "")
              }
            >
              <h2>Free</h2>
              <p>
                Suitable for experiencing the store but doesn’t allow buying or
                selling.
              </p>
              <div className="price-tag">
                <span className="symbol">
                  <i className="far fa-indian-rupee-sign"></i>
                </span>
                <span className="amount">0</span>
                <span className="after">/month billed annually</span>
              </div>
              <ul className="list-unstyled mb-0">
                <li>
                  <i className="far fa-xmark fa-fw close"></i>
                  <span>Does Not allow placing orders.</span>
                </li>
                <li>
                  <i className="far fa-xmark fa-fw close"></i>
                  <span>Does Not allow placing orders.</span>
                </li>
                <li>
                  <i className="far fa-xmark fa-fw close"></i>
                  <span>No Seller Dashboard.</span>
                </li>
                <li>
                  <i className="far fa-xmark fa-fw close"></i>
                  <span>Limited Time on Demo Store.</span>
                </li>
              </ul>
              <a
                className="price-button"
                href="#"
                onClick={() => {
                  dispatch({
                    type: "plan_type",
                    payload: "Free",
                  });
                  moveNextSlide();
                }}
              >
                Choose this Plan
              </a>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 mb-4">
            <div
              className={
                "pricing-table pricing-table-dark " +
                (state.pricingDetail.plan_type == "Starter" ? "active" : "")
              }
            >
              <h2>Starter</h2>
              <p>
                Excellent for bulk ordering and experiencing the NavTatva store.
              </p>
              <div className="price-tag">
                <span className="symbol">
                  <i className="far fa-indian-rupee-sign"></i>
                </span>
                <span className="amount">1,999</span>
                <span className="after">/month billed annually</span>
              </div>
              <ul className="list-unstyled mb-0">
                <li>
                  <i className="far fa-check fa-fw check"></i>
                  <span>Advantage 1</span>
                </li>
                <li>
                  <i className="far fa-check fa-fw check"></i>
                  <span>Advantage 2</span>
                </li>
                <li>
                  <i className="far fa-check fa-fw check"></i>
                  <span>Advantage 3</span>
                </li>
                <li>
                  <i className="far fa-check fa-fw check"></i>
                  <span>Advantage 4</span>
                </li>
              </ul>
              <a
                className="price-button"
                href="#"
                onClick={() => {
                  dispatch({
                    type: "plan_type",
                    payload: "Starter",
                  });
                  moveNextSlide();
                }}
              >
                Choose this Plan
              </a>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 mb-4">
            <div
              className={
                "pricing-table pricing-table-premium " +
                (state.pricingDetail.plan_type == "Premium" ? "active" : "")
              }
            >
              <h2>Premium</h2>
              <p>
                Perfect for expanding your business and reaching new customers
              </p>
              <div className="price-tag">
                <span className="symbol">
                  <i className="far fa-indian-rupee-sign"></i>
                </span>
                <span className="amount">3,999</span>
                <span className="after">/month billed annually</span>
              </div>
              <ul className="list-unstyled mb-0">
                <li>
                  <i className="far fa-check fa-fw check"></i>
                  <span>Advantage 1</span>
                </li>
                <li>
                  <i className="far fa-check fa-fw check"></i>
                  <span>Advantage 2</span>
                </li>
                <li>
                  <i className="far fa-check fa-fw check"></i>
                  <span>Advantage 3</span>
                </li>
                <li>
                  <i className="far fa-check fa-fw check"></i>
                  <span>Advantage 4</span>
                </li>
              </ul>
              <a
                className="price-button"
                href="#"
                onClick={() => {
                  dispatch({
                    type: "plan_type",
                    payload: "Premium",
                  });
                  moveNextSlide();
                }}
              >
                Choose this Plan
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderSocialMedia() {
    return (
      <div className="tab-pane active" role="tabpanel" id="step7">
        <div className="step-title-area">
          <h4 className="step-title">Your Social Media Handles</h4>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <TextInput
              colClass="col-lg-12"
              placeholder="Instagram"
              label="Instagram"
              name="Instagram"
              error={errorState.socialMedia.instagram}
              value={state.socialMedia.instagram}
              onChange={(event) => {
                dispatch({
                  type: "instagram",
                  payload: event.target.value,
                });
              }}
            />

            <TextInput
              colClass="col-lg-12"
              placeholder="Facebook"
              error={errorState.socialMedia.facebook}
              label="Facebook"
              name="Facebook"
              value={state.socialMedia.facebook}
              onChange={(event) => {
                dispatch({
                  type: "facebook",
                  payload: event.target.value,
                });
              }}
            />

            <TextInput
              colClass="col-lg-12"
              error={errorState.socialMedia.twitter}
              placeholder="Twitter"
              label="Twitter"
              name="Twitter"
              value={state.socialMedia.twitter}
              onChange={(event) => {
                dispatch({
                  type: "twitter",
                  payload: event.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  function renderTermsCondition() {
    switch (state.pricingDetail.plan_type) {
      case "Free":
        return <TermsCondition1></TermsCondition1>;

      case "Starter":
        return <TermsCondition2></TermsCondition2>;

      case "Premium":
        return <TermsCondition3></TermsCondition3>;

      default:
        break;
    }
  }

  function renderOnboardingForm() {
    return (
      <div className="tab-pane active" role="tabpanel" id="step8">
        <div className="step-title-area">
          <h4 className="step-title">Terms & Conditions</h4>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <div className="terms-condition">{renderTermsCondition()}</div>
            </div>
          </div>

          {state.termsAndConditions.e_signature_file ? (
            <div className="col-lg-6">
              <div className="form-group">
                <div className="uploaded-image">
                  <img
                    src={state.termsAndConditions.e_signature_file}
                    className="img-fluid"
                  />
                  <button
                    type="button"
                    className="refreshbtn"
                    onClick={() => resetFileUpload(3)}
                  >
                    <i className="far fa-arrow-rotate-right fa-fw"></i>
                  </button>
                  <button
                    className="upload-field form-btn form-btn-text bg-transparent p-0 border-0 check-done"
                    type="button"
                  >
                    <span>Uploaded</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <input
                id="E-Signature"
                name="E-Signature"
                ref={signatureRef}
                type="file"
                accept="image/*"
                className="input-file"
                onChange={(event) => onFileChange(event)}
                onClick={(event: any) => {
                  event.target.value = null;
                }}
              />
              <TextInput
                error={errorState.termsAndConditions.e_signature_file}
                placeholder=""
                disabled={true}
                label="E-Signature"
                name="E-Signature"
                value={state.termsAndConditions.e_signature_file}
                rightIconClassName={"far fa-arrow-up-from-line fa-fw"}
                rightButtonTitle={"Upload"}
                onRightClick={() => onESignatureClick()}
                onChange={(event) => {
                  // dispatch({
                  //   type: "e_signature_file",
                  //   payload: event.target.value,
                  // });
                }}
              />
            </>
          )}
          <div className="col-lg-6 mb-4">
            <div className="policy-area">
              <label className="radio-container mb-2">
                Accept Terms & Conditions
                <input
                  type="checkbox"
                  name="accept_terms"
                  checked={state.termsAndConditions.accept_terms}
                  onChange={(event) => {
                    dispatch({
                      type: "accept_terms",
                      payload: !state.termsAndConditions.accept_terms,
                    });
                  }}
                />
                <span className="radio-checkmark checkbox-new"></span>
              </label>
              <label className="radio-container">
                Subscribe to Newsletter
                <input
                  type="checkbox"
                  name="subscribe_newsletter"
                  checked={state.termsAndConditions.subscribe_newsletter}
                  onChange={(event) => {
                    dispatch({
                      type: "subscribe_newsletter",
                      payload: !state.termsAndConditions.subscribe_newsletter,
                    });
                  }}
                />
                <span className="radio-checkmark checkbox-new"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function _renderSteps() {
    return (
      <StepIndicator
        active={activeTab}
        onPressAction={(index) => {
          if (activeTab > index) {
            setActiveTab(index);
          }
        }}
        data={stepList}
      />
    );
  }

  function selectCategoryPreference(event: any) {
    let shoppingPref = state.shoppingPreferences.items;

    if (!event.target.checked) {
      let index = shoppingPref.indexOf(event.target.value);
      if (index > -1) {
        shoppingPref.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      shoppingPref.push(`${event.target.value}`);
    }
    dispatch({
      type: "shoppingPreferences",
      payload: shoppingPref,
    });
  }

  function renderAuthenticationView() {
    console.log("forgotPassword", forgotPassword, "active", activeTab);
    if (activeTab == 0 && isLogin) {
      return renderLoginView();
    } else if (activeTab == 0 && forgotPasswordData.is_verified) {
      return renderResetPassword();
    } else if (activeTab == 0 && forgotPassword) {
      //  return renderResetPassword();
      return renderForgotPasswordView();
    } else if (activeTab == 0) {
      return renderUserNamePassword();
    }
  }

  return (
    <>
      <Head>
        <title>Navtatva - Partner with us | Registration</title>
      </Head>
      <section className="signup-step-container">
        <div className="container">
          <div className="signup-step-inner">
            <div className="row wizard-row">
              {_renderSteps()}
              <div className="col-md-9">
                <div className="wizard">
                  <form role="form" action="" className="login-box">
                    <div className="tab-content" id="main_form">
                      {activeTab == 0 && renderAuthenticationView()}
                      {activeTab == 1 && renderBusinessInformation()}
                      {activeTab == 2 && renderRupifiDetails()}
                      {activeTab == 3 && renderBankDetails()}
                      {activeTab == 4 && renderGstPanDetails()}
                      {activeTab == 5 && renderYourPreferences()}
                      {activeTab == 6 && renderOnlinePresense()}
                      {activeTab == 7 && renderSocialMedia()}
                      {activeTab == 8 && renderPricingTable()}
                      {activeTab == 9 && renderOnboardingForm()}

                      <ul className="list-inline forword-btn">
                        <li>
                          <button
                            onClick={() => {
                              if (activeTab > 0) {
                                setActiveTab(activeTab - 1);
                              } else if (
                                activeTab == 0 &&
                                forgotPasswordData.is_verified
                              ) {
                                setForgotPasswordData({
                                  ...forgotPasswordData,
                                  is_verified: false,
                                });
                              } else if (activeTab == 0 && forgotPassword) {
                                setForgotPassword(false);
                              }
                            }}
                            type="button"
                            className="prev-step"
                          >
                            <i className="far fa-angle-left fa-fw"></i>{" "}
                            <span>Go Back</span>
                          </button>
                        </li>
                        {activeTab == 6 && (
                          <li className="ml-auto">
                            <button
                              type="button"
                              className="up-btn"
                              onClick={() => {
                                if (activeQuestion > 0) {
                                  setActiveQuestion(activeQuestion - 1);
                                }
                                if (activeQuestion - 1 == 0) {
                                  setActiveTab(activeTab - 1);
                                }
                              }}
                            >
                              <i className="fas fa-angle-up fa-fw"></i>
                            </button>
                          </li>
                        )}
                        <li>
                          {activeTab == 6 ? (
                            <Button
                              label={
                                "Next" +
                                (activeQuestion + 1 ==
                                state?.onlinePresense?.items?.length
                                  ? " Step"
                                  : "")
                              }
                              icon={
                                "fa-" +
                                (activeQuestion + 1 ==
                                state?.onlinePresense?.items?.length
                                  ? "arrow-up-right"
                                  : "angle-down")
                              }
                              onClick={() => {
                                if (
                                  activeQuestion <
                                  state?.onlinePresense?.items?.length - 1
                                ) {
                                  if (isValidAnswer(activeQuestion)) {
                                    setActiveQuestion(activeQuestion + 1);
                                  }
                                }
                                if (
                                  activeQuestion + 1 ==
                                  state?.onlinePresense?.items?.length
                                ) {
                                  if (isValidAnswer(activeQuestion)) {
                                    nextButtonTabAction();
                                  }
                                }
                              }}
                            />
                          ) : activeTab != 8 ? (
                            <Button
                              isLoading={isLoading}
                              label="Next Step"
                              icon="fa-arrow-up-right"
                              onClick={() => {
                                nextButtonTabAction();
                              }}
                            />
                          ) : null}
                        </li>
                      </ul>
                      <div className="clearfix"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form;
