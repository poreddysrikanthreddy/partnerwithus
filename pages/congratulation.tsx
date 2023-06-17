import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Congratulation: NextPage = () => {
  return (
    <>
      <Head>
        <title>Navtatva - Partner with us | Congratulations</title>
      </Head>
      <section className="signup-step-container">
        <div className="container-fluid px-0">
          <div className="row no-gutters">
            <div className="col-lg-12">
              <div className="welcome-screen-bg">
                <div className="welcome-screen">
                  <div className="welcome-screen-inner">
                    <h3>Welcome to NavTatva</h3>
                    <p>
                      You have now gained access to hundreds of products from
                      the store. Visit the NavTatva Store to begin shopping.
                    </p>
                    <img src="images/check.gif" alt="" className="img-fluid" />
                    <div className="confirm-text">
                      A confirmation e-mail will be sent to your registered
                      email including your login credentials.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Congratulation;
