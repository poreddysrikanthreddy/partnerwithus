import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import constants from "../constants/constant";
import https from "https";
import API from "../constants/APIEndpoints";

interface RefreshToken {
  status: number;
  data: {
    hashToken: string;
  };
}

export abstract class HTTPBaseService {
  protected instance: AxiosInstance;
  protected token: string;
  protected readonly baseURL: string;

  public constructor(baseURL: string, token: string) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    this.token = token;

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use((response) => {
      if (response.headers && response.headers.authorization) {
        const responseToken = (response.headers.authorization as string).split(
          " "
        )[1];
        this.token = responseToken;

        localStorage.setItem("hashToken", this.token);
      }
      return response;
    }, this.handleError);
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    config.headers["Content-Type"] = `application/json`;
    config.headers["Accept"] = `application/json`;

    if (config.url?.startsWith(API.CHECK_RUPIFI_CREDIT_ELIGIBILITY)) {
      let rpf_token: any = localStorage.getItem("rpf_token");
      rpf_token = JSON.parse(rpf_token);
      config.headers["Authorization"] = `Bearer ${rpf_token.accessToken}`;
    } else {
      config.headers["Authorization"] = `Bearer ${this.token}`;
    }

    if (
      config.url?.startsWith(API.VERIFY_EMAIL_OTP) ||
      config.url?.startsWith(API.VERIFY_OTP) ||
      config.url?.startsWith(API.SEND_OTP_EMAIL) ||
      config.url?.startsWith(API.UPLOAD_DOCUMENTATION) ||
      config.url?.startsWith(API.GST_VERIFICATION)
    ) {
      config.headers["api_key"] = constants.APIKEY;
    }
    console.log(config);
    return config;
  };

  private handleError = async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      const refreshToken = await this.refreshToken();
      if (refreshToken.status === 200) {
        this.token = refreshToken.data.hashToken;
        localStorage.setItem("hashToken", this.token);
        return this.instance(originalRequest);
      }
    } else {
      throw error;
    }
  };

  private async refreshToken(): Promise<RefreshToken> {
    const refreshTokenRequest = {
      hashToken: this.token,
    };

    const { data } = await this.addRequestOptionsForClientSecrect();
    const options: AxiosRequestConfig = {
      headers: {
        CLIENT_KEY: data.clientKey,
      },
    };

    return axios.post(
      `${this.baseURL}/User/RenewToken`,
      refreshTokenRequest,
      options
    );
  }

  private addRequestOptionsForClientSecrect() {
    return axios.get(`${this.baseURL}/Utility/GetSecrets`);
  }
}
