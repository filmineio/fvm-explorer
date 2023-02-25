import type { NextPage } from "next";
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
import LogoName from "@/ui/components/Common/Icons/LogoName";
import AuthIllustrationTop from "@/ui/components/Common/Icons/AuthIllustrationTop";
import AuthIllustrationBottom from "@/ui/components/Common/Icons/AuthIllustrationBottom";
import MailIcon from "@/ui/components/Common/Icons/MailIcon";


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
        <div className="flex h-full">
          <div className="flex relative w-11/25 items-center justify-center bg-line_opacity-80">
            <div className="absolute self-end top-0 right-0">
              <AuthIllustrationTop/>
            </div>
            <div className="flex items-center justify-center z-50">
              <LogoName/>
            </div>
            <div className="absolute self-start bottom-0 left-0">
              <AuthIllustrationBottom/>
            </div>
          </div>

          <div className="w-14/25 lg:w-8/12 flex items-center justify-center md:w-full">
            <div className="md:text-center md:text-left md:p-5 mr-[12%]">
              <form>
                <h1 className="font-space text-white text-36 font-bold leading-compact">
                  Log in/Sign up
                </h1>
                <p className="font-roboto text-white font-normal text-16 leading-normal mt-4">
                  Authenticate with your email to use the app.
                </p>
                <div className="flex md:flex-wrap items-end mt-12 gap-0">
                  <Input
                    handleChange={change}
                    placeholder="Email"
                    className="block bg-slate min-h-sm w-80 pl-11 border-2 border-body rounded-4 text-white placeholder-label caret-white text-14 outline-none leading-4 hover:border-label
                        focus:border-label focus:ring-body focus:ring-2"
                    valid={state.emailValid}
                    icon={<MailIcon/>}
                  />
                  <Button
                    type="button"
                    className="bg-blue-500 py-3.75 px-7 rounded-4 font-roboto text-base text-white font-bold leading-5 whitespace-nowrap ml-5"
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
              "modal-content shadow-lg relative flex flex-col w-full pointer-events-auto bg-[#B7006E] bg-clip-padding rounded-4 outline-none text-current py-28"
            }
          >
            <div className="modal-header flex flex-shrink-0 items-center justify-center p-4  rounded-t-md ">
              <h5
                className="text-5xl  leading-normal text-white"
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

export default Home;