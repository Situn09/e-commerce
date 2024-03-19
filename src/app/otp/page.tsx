"use client";
/* eslint no-use-before-define: 0 */
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { string } from "zod";

export default function OTP() {
  const [otp, setOtp] = useState(new Array(8).fill(""));
  const swa = "chi";
  const arr: HTMLInputElement[] = [];
  const inputRefs = useRef(arr);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  //

  const submitHandler = (otp: string) => {
    console.log(otp);
  };
  const handleFocus = (
    index: number,
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    // //
    // inputRefs.current[index]?.select();
    // if (!e.target.value) {
    //   inputRefs.current[index - 1]?.focus();
    // } else {
    //   inputRefs.current[index + 1]?.focus();
    // }
  };

  //

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (isNaN(parseInt(value))) return;

    const newOtp = [...otp];
    // allow only on input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    const combineOtp = newOtp.join("");
    if (combineOtp.length === 8) submitHandler(combineOtp);
    // move to next field after fill

    if (value && index < 8 && inputRefs.current[index + 1]) {
      //

      inputRefs.current[index + 1]?.focus();
    }
    if (!value) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  //

  const handleclick = (
    index: number,
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    //

    inputRefs.current[index]?.select();
    if (index > 0 && !otp[index - 1]) {
      //

      inputRefs.current[otp.indexOf("")]?.focus();
    }
  };

  //

  const backKeyDownHandler = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key == "Backspace") {
      // Move focus to the previous input field on backspace
      inputRefs.current[index]?.focus();
    }
  };
  const backKeyUpHandler = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key == "Backspace") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="h-[453px] w-[576px] rounded-[20px] border-2 ">
        <div className="my-10 text-center text-[32px] text-xl font-bold">
          Verify Your Email
        </div>
        <div className="mb-10  text-center text-xl ">
          Enter the 8 digit code you have received on <br />{" "}
          <span className="text-[16px]  font-bold"> {swa}***@gmail.com</span>
        </div>
        <div className="mx-[50px]">
          <label htmlFor="OTP" className="mb-5 text-[16px] font-semibold">
            OTP
          </label>{" "}
          <br />
          <div className="mb-11 mt-5 flex gap-[12px]">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <input
                  //

                  ref={(input: HTMLInputElement) =>
                    (inputRefs.current[index] = input)
                  }
                  key={index}
                  type="text"
                  className="h-[48px] w-[48px] rounded-md border-2 px-[15px] py-[15px] text-[1.4em]"
                  inputMode="numeric"
                  onChange={(e) => handleChange(index, e)}
                  onClick={(e) => handleclick(index, e)}
                  onKeyDown={(e) => {
                    backKeyDownHandler(index, e);
                  }}
                  onKeyUp={(e) => {
                    backKeyUpHandler(index, e);
                  }}
                  onFocus={(e) => handleFocus(index, e)}
                />
              ))}
          </div>
          <Link href="/user-page">
            <input
              type="submit"
              value="VERIFY"
              className="mb-11 mt-5 w-[100%] border-2 bg-black   py-[13px] text-white"
              onSubmit={() => submitHandler(otp.toString())}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
