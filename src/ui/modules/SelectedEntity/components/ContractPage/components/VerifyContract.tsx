import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import classNames from "classnames";
import { lensPath, set } from "ramda";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import X from "@/ui/components/Common/Icons/X";
import Modal from "@/ui/components/Modal/Modal";
import { Spinner } from "@/ui/components/Spinner/Spinner";
import { TooltipTrigger } from "@/ui/components/TooltipTrigger";

import { useMutation } from "@/ui/external/data";
import { useWeb3Storage } from "@/ui/external/useWeb3Storage";

import { cb } from "@/utils/cb";
import { onChange } from "@/utils/unpack";


type State = {
  name: string;
  private: boolean;
  optimized: boolean;
  source: File | null;
};

const defaultState: State = {
  name: "",
  private: false,
  optimized: false,
  source: null,
};

const MAX_FILE_SIZE = 10000000;

export const VerifyContract = ({
  contractAddress,
  onVerify,
  network,
}: {
  contractAddress: string;
  onVerify: VoidFunction;
  network: Network;
}) => {
  const [data, setData] = useState(defaultState);
  const [showVerify, setShowVerify] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const {
    upload,
    data: sourceCid,
    loading: uploading,
    error,
  } = useWeb3Storage();
  const {
    post: verify,
    loading: verifying,
    error: verificationError,
    total: verificationResult,
  } = useMutation();

  const change = (key: keyof State) => (val: State[typeof key]) => {
    setData((p) => set(lensPath([key]), val)(p));
  };

  const handleSource = useCallback(
    ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      const file = files ? files[0] : null;
      change("source")(file);
      setUploadedFile(file);
    },
    []
  );

  const valid = useMemo(
    () =>
      !!data.name.trim() &&
      !!data.source?.name &&
      data.source?.size < MAX_FILE_SIZE,
    [data]
  );

  const submit = useCallback(() => {
    if (!valid || !data.source) {
      return toast.error(
        'Verification data needs to be valid before making the "Verify" request'
      );
    }

    upload(data.source);
  }, [valid, data]);

  useEffect(() => {
    if (!!error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (!!verificationError) toast.error(verificationError);
  }, [verificationError]);

  useEffect(() => {
    if (!!verificationResult) {
      toast.success(`Contract ${contractAddress} Verified!`);
      onVerify();
    }
  }, [verificationResult]);

  useEffect(() => {
    if (!sourceCid) return;

    toast.info("Upload completed. Verification process started...");

    verify(Entity.ContractMeta, `/contracts/${contractAddress}/verify`, {
      network: network,
      contractName: data.name,
      contractsZipCID: sourceCid,
      optimise: data.optimized,
      isPublic: !data.private,
    });
  }, [sourceCid, data]);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      header.style.marginTop = "50px";
    }

    return () => {
      const header = document.querySelector("header");
      if (header) {
        header.style.marginTop = "0px";
      }
    };
  }, []);

  return (
    <>
      <div
        className={
          "absolute top-0 left-0 w-full h-16 bg-label flex justify-between items-center  px-10"
        }
      >
        <div className={"text-white"}>
          <span className={"font-bold"}>Do you own this contract?</span>{" "}
          <span>Upload source code to claim ownership.</span>
        </div>
        <button
          className={"bg-blue-500 p- py-3.75 px-7 text-white text-16 font-semibold rounded-6"}
          onClick={cb(setShowVerify, true)}
        >
          VERIFY CONTRACT
        </button>
      </div>
      {uploading && (
        <Modal>
          <div className="modal-content border-none shadow-none relative justify-center items-center flex w-full pointer-events-auto bg-slate rounded-10 h-96">
            <p className={"flex gap-5 text-white text-lg"}>
              Uploading...
              <Spinner inline />
            </p>
          </div>
        </Modal>
      )}

      {verifying && (
        <Modal>
          <div className="modal-content border-none shadow-none relative justify-center items-center flex w-full pointer-events-auto bg-slate rounded-10 h-96">
            <p className={"flex gap-5 text-white text-lg"}>
              Verifying...
              <Spinner inline />
            </p>
          </div>
        </Modal>
      )}

      {showVerify && !uploading && !verifying && (
        <Modal>
          <div className="modal-content border-none shadow-none relative flex flex-col w-full pointer-events-auto bg-slate rounded-10">
            <div className="modal-header flex flex-shrink-0 items-center">
              <button
                className="btn-close absolute right-7 top-7 z-10 hover:opacity-50 transition-all [transition:opacity_.0.16s_ease_in_out]"
                onClick={cb(setShowVerify, false)}
              >
                <X />
              </button>
            </div>
            <div className="modal-body relative p-[70px]">
              <h3 className="font-space text-white text-24 mb-10">
                Upload source code
              </h3>
              <p className="mb-14 text-white text-16">
                Please don’t close this popup while upload is in progress.
              </p>

              <div className={"flex flex-col gap-3"}>
                <div className="input-wrapper flex items-center uppercase justify-between w-full mb-7">
                  <label className="mb-0">Source Code (.zip)*</label>
                  <label htmlFor="uploadFile" className="btn bg-blue-500 text-white ml-auto mb-0 cursor-pointer">CHOOSE FILE</label>
                  <input
                    id="uploadFile"
                    className="hidden"
                    type={"file"}
                    accept=".zip"
                    onChange={handleSource}
                  ></input>
                  {uploadedFile && <span className="text-12 text-white ml-5">{uploadedFile.name}</span>}
                </div>

                <div className="input-wrapper">
                  <label>ENTRY POINT (CLASS NAME)*</label>
                  <input
                    value={data.name}
                    className="w-full"
                    placeholder="Contract name - e.g. Swap"
                    onChange={onChange(change("name"))}
                  />
                </div>

                <div className="flex justify-between gap-2 items-center form-check form-switch mt-4">
                  <span className="text-white uppercase flexform-check-label text-14 mr-4 flex gap-2 items-center">
                    Optimized Bytecode{" "}
                    <TooltipTrigger
                      tooltip={
                        "Used --optimize flag during contract compilation"
                      }
                    />
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={data.optimized}
                      onChange={cb(change("optimized"), !data.optimized)}
                    />
                    <div className="w-11 h-6 outline-none bg-gray-200 peer-focus:outline-none rounded-40 bg-body peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-label after:rounded-40 after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-400"></div>
                  </label>
                </div>
                <div className="flex justify-between gap-2 items-center form-check form-switch mt-4">
                  <span className="text-white uppercase  form-check-label text-14 mr-4 flex gap-2 items-center">
                    Make Private{" "}
                    <TooltipTrigger
                      tooltip={
                        "Contract metadata will not be publicly accessible until it is marked as public."
                      }
                    />
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={data.private}
                      onChange={cb(change("private"), !data.private)}
                    />
                    <div className=" w-11 h-6 outline-none bg-gray-200 peer-focus:outline-none rounded-40 bg-body peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-label after:rounded-40 after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-400"></div>
                  </label>
                </div>
              </div>

              {data.source && data.source.size > MAX_FILE_SIZE && (
                <p
                  className={
                    "text-14 text-red pt-10"
                  }
                >
                  Maximum file size is 10 MB
                </p>
              )}
              <button
                className={classNames(
                  "btn text-white mt-10 flex gap-2  uppercase",
                  {
                    "bg-blue-500": valid,
                    "bg-body cursor-not-allowed": !valid || uploading,
                  }
                )}
                onClick={submit}
                disabled={!valid || uploading}
              >
                UPLOAD
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};