import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { useCallback, useEffect, useReducer } from "react";

import Button from "@/ui/components/Button";
import Input from "@/ui/components/Input/Input";
import Modal from "@/ui/components/Modal/Modal";
import { Page } from "@/ui/components/Page/Page";

import { authPageReducer, initialAuthPageState } from "@/ui/modules/Auth/state";

import { useStore } from "@/ui/state/Store";

import { uiApiClient } from "@/ui/external";

import { cb } from "@/utils/cb";


const Home: NextPage = () => {
  const [state, change] = useReducer(authPageReducer, initialAuthPageState);
  const { login } = uiApiClient.auth();
  const {
    state: { user },
  } = useStore();

  const initLogin = useCallback(() => {
    if (state.email && state.emailValid) {
      change(true);
      login(state.email).finally(cb(change, false));
    }
  }, [login, state]);

  useEffect(() => {
    !!user && Router.push("/");
  }, [user]);

  return (
    <>
      <Page>
        <div className="flex h-full md:flex-wrap ">
          <div className="w-1/2 lg:w-4/12 flex items-center justify-center bg-[#141620] md:w-full">
            <div className="logo md:w-1/2 md:w-48 xl:w-auto md:mb-5 md:h-96 flex items-center justify-center">
              <figure>
                <img src="/images/logo.png" alt="logo" />
              </figure>
            </div>
          </div>

          <div className="w-1/2  lg:w-8/12 flex items-center justify-center bg-black md:w-full">
            <div className="md:text-center md:text-left md:p-5">
              <form>
                <h1 className="text-white text-md md:mb-2  md:mb-1 font-roboto font-bold">
                  Log in/Sign up
                </h1>
                <p className="text-gray text-base">
                  Authenticate with your email to use the app.
                </p>
                <div className="flex mt-2 md:flex-wrap items-end mt-8 gap-0">
                  <Input
                    handleChange={change}
                    label={"Email Address"}
                    placeholder={"Your email..."}
                    className={`w-96 md:w-ful bg-gray-900 placeholder-label ou focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-base focus:ring-1 lg:w-80 min-h-sm font-mono font-medium text-sm pl-11 md:w-52 xs:w-full sm:w-52`}
                    valid={state.emailValid}
                    icon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 9L10.7506 12.0005C11.481 12.5848 12.519 12.5848 13.2494 12.0005L17 9M21 17L21 7C21 5.89543 20.1046 5 19 5L5 5C3.89543 5 3 5.89543 3 7L3 17C3 18.1046 3.89543 19 5 19L19 19C20.1046 19 21 18.1046 21 17Z"
                          stroke="#596184"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                  <Button
                    type="button"
                    className="buttons w-52 bg-yellow h-sm font-roboto font-bold rounded-base lg:px-8 px-8 text-sm  md:px-4 md:w-full md:mt-0 "
                    onClick={initLogin}
                  >
                    SIGN IN
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Page>
      {state.modalVisible && (
        <Modal>
          <div
            className={
              "modal-content shadow-lg relative flex flex-col w-full pointer-events-auto bg-[#B7006E] bg-clip-padding rounded-base outline-none text-current py-28"
            }
          >
            <div className="modal-header flex flex-shrink-0 items-center justify-center p-4  rounded-t-md ">
              <h5
                className="text-5xl  font-roboto leading-normal text-white"
                id="exampleModalScrollableLabel "
              >
                Check your email
              </h5>
              <button
                type="button"
                className=" absolute top-5 right-5 box-content w-4 h-4 p-1 text-white border-none rounded-none  focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
                onClick={cb(change, false)}
              >
                <img src="/images/Close.svg" alt={"close-icon"} />
              </button>
            </div>

            <div className="modal-body relative p-4 text-center text-white font-light font-mono text-xl">
              <p>
                We emailed a magic link to
                <br />
                <span className="font-mono font-semibold ">{state.email}</span>
                <br />
                Click the link to log in or sign up.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export async function getServerSideProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Home;