import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

const Home: NextPage = () => {
  const route = useRouter();
  useEffect( () => {
    localStorage.removeItem("rpf_token");
  },[])
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Navtatva - Partner with us | Home</title>
      </Head>

      <section className="signup-step-container">
        <div className="container">
          <div className="home-screen">
            <div className="row">
              <div className="col-md-6">
                <div className="left-area">
                  <div className="logo">
                    <a href="#">
                      <img src="images/logo.png" alt="" className="img-fluid" />
                    </a>
                  </div>
                  <ul className="list-unstyled my-4 my-md-5 py-md-4 content-list">
                    <li>
                      <i className="far fa-arrow-up-right fa-fw"></i>
                      <span>Unlock the NavTatva Store</span>
                    </li>
                    <li>
                      <i className="far fa-arrow-up-right fa-fw"></i>
                      <span>Acquire seller access</span>
                    </li>
                    <li>
                      <i className="far fa-arrow-up-right fa-fw"></i>
                      <span>Reach out to a large customer base</span>
                    </li>
                    <li>
                      <i className="far fa-arrow-up-right fa-fw"></i>
                      <span>Custom website for you business</span>
                    </li>
                  </ul>
                  <div className="home-bottom-list">
                    <div className="row">
                      <div className="col-6 col-sm-3 p-2">
                        <div className="site-info text-center">
                          <a href="#">
                            <div className="info-icon">
                              <i className="far fa-shield-check fa-fw"></i>
                            </div>
                            <div className="site-info-name">Sign Up</div>
                          </a>
                        </div>
                      </div>
                      <div className="col-6 col-sm-3 p-2">
                        <div className="site-info text-center">
                          <a href="#">
                            <div className="info-icon">
                              <i className="far fa-building-columns fa-fw"></i>
                            </div>
                            <div className="site-info-name">Unlock</div>
                          </a>
                        </div>
                      </div>
                      <div className="col-6 col-sm-3 p-2">
                        <div className="site-info text-center">
                          <a href="#">
                            <div className="info-icon">
                              <i className="far fa-cart-shopping fa-fw"></i>
                            </div>
                            <div className="site-info-name">Buy</div>
                          </a>
                        </div>
                      </div>
                      <div className="col-6 col-sm-3 p-2">
                        <div className="site-info text-center">
                          <a href="#">
                            <div className="info-icon">
                              <i className="far fa-circle-dollar fa-fw"></i>
                            </div>
                            <div className="site-info-name">Sell</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="right-area">
                  <div className="step-title-area">
                    <h4 className="step-title">Get Started</h4>
                    <p>
                      Keep the following documents ready for smooth sign-up.
                    </p>
                  </div>
                  <ul className="list-unstyled my-4 my-md-5 py-md-4">
                    <li>
                      <i className="far fa-credit-card-front fa-fw"></i>
                      <span>Aadhar Copy (for KYC)</span>
                    </li>
                    <li>
                      <i className="far fa-building-columns fa-fw"></i>
                      <span>Bank Details</span>
                    </li>
                    <li>
                      <i className="far fa-percent fa-fw"></i>
                      <span>GSTIN (optional)</span>
                    </li>
                    <li>
                      <i className="far fa-credit-card-front fa-fw"></i>
                      <span>PAN Card Copy</span>
                    </li>
                    <li>
                      <i className="far fa-money-check fa-fw"></i>
                      <span>Cancelled Cheque</span>
                    </li>
                  </ul>
                  <a onClick={() => route.replace("/form")} className="btnprimary go-btn">
                    Let's Go <i className="far fa-arrow-up-right fa-fw"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
