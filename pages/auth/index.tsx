import type { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useReducer, useState } from "react";

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
import X from "@/ui/components/Common/Icons/X";
import clsx from "clsx";

const Home: NextPage = () => {
  const [state, change] = useReducer(authPageReducer, initialAuthPageState);
  const [error, setError] = useState(false);
  const { login } = uiApiClient.auth();
  const {
    state: { user },
  } = useStore();
  const router = useRouter();

  const initLogin = useCallback(() => {
    if (state.email && state.emailValid) {
      change(true);
      setError(false);
      login(state.email).finally(cb(change, false));
    } else {
      setError(true);
    }
  }, [login, state]);

  const resolveRedirectParam = (param: string | undefined) => {
    switch (param) {
      case 'queries': return '/me/queries';
      default: return '/';
    }
  }

  useEffect(() => {
    !!user && Router.push(resolveRedirectParam(router.query.redirect?.toString()));
  }, [user]);

  const submitted = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    initLogin();
  };

  return (
    <>
      <Page>
        <div className="flex flex-grow">
          <div className="flex relative w-11/25 items-center justify-center bg-line_opacity-80">
            <div className="absolute self-end top-0 right-0 3xl:w-[380px] 2xl:max-w-[300px] w-[529px]">
              <AuthIllustrationTop/>
            </div>
            <div className="flex items-center justify-center z-10">
              <LogoName/>
            </div>
            <div className="absolute self-start bottom-0 left-0 3xl:w-[380px] 2xl:max-w-[300px] w-[529px]">
              <AuthIllustrationBottom/>
            </div>
          </div>

          <div className="w-14/25 lg:w-8/12 flex items-center justify-center md:w-full">
            <div className="md:text-center md:text-left md:p-5 mr-[12%]">
              <form onSubmit={(e) => submitted(e)}>
                <h1 className="font-space text-white text-36 font-bold leading-compact">
                  Log in/Sign up
                </h1>
                <p className="font-roboto text-white font-normal text-16 leading-normal mt-4">
                  Authenticate with your email to use the app.
                </p>
                <div className="flex md:flex-wrap items-end mt-12 gap-0 relative">
                  <Input
                    handleChange={change}
                    placeholder="Email"
                    className={clsx("block bg-slate min-h-sm w-96 pl-11 border-2 border-body rounded-4 text-white placeholder-label caret-white text-14 outline-none leading-4 hover:border-label focus:border-label focus:ring-body", {
                      ['focus:ring']: !error,
                      ['border-red hover:border-red focus:border-red focus:shadow-[0px_0px_0px_3px_rgba(211,47,64,0.3)]']: error
                    })}
                    valid={state.emailValid}
                    icon={<MailIcon/>}
                  />
                  {error && <div className="absolute left-0 -bottom-5 text-12 text-red ml-3">Invalid email</div>}
                  <Button
                    type="submit"
                    className="btn bg-blue-500 text-white hover:bg-blue-400 hover:border-blue-400 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all whitespace-nowrap ml-5"
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
          <div className="modal-content border-none shadow-none relative flex flex-col w-[590px] mx-auto pointer-events-auto bg-blue-500 rounded-10">
            <div className="modal-header flex flex-shrink-0 items-center">
              <button
                type="button"
                className="btn-close absolute right-7 top-7 z-10 hover:opacity-50 transition-all [transition:opacity_.0.16s_ease_in_out]"
                onClick={cb(change, false)}
              >
                <X />
              </button>
            </div>

            <div className="modal-body relative p-[70px] text-center">
              <h5
                className="text-[36px] leading-normal text-white mb-12"
                id="exampleModalScrollableLabel "
              >
                Check your email
              </h5>
              <p className="text-white leading-[1.5rem]">
                We emailed a magic link to
                <br />
                <span className="font-space font-bold ">{state.email}</span>
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