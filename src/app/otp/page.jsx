"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function OTP() {
  const [otp, setOtp] = useState(new Array(8).fill(""));
  const swa = "chi";
  const inputRefs = useRef([]);
  console.log(inputRefs);
  useEffect(() => {
    if (inputRefs.current[0]) {
      // @ts-expect-error : Should any typ
      inputRefs.current[0]?.focus();
    }
  }, []);
  // @ts-expect-error : Should any typ
  const submitHandler = (otp) => {
    console.log(otp);
  };
const handleFocus=(/** @type {number} */ index,/** @type {React.FocusEvent<HTMLInputElement, Element>} */ e)=>{
// @ts-expect-error : Should any typ
inputRefs.current[index].setSelectionRange(0,e.target.value.length)
}

  // @ts-expect-error : Should any typ
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only on input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    console.log(newOtp);
    const combineOtp = newOtp.join("");
    if (combineOtp.length === 8) submitHandler(combineOtp);
    // move to next field after fill
    if (value && index < 8 && inputRefs.current[index + 1] ) {
        // @ts-expect-error : Should any typ
        inputRefs.current[index + 1].focus();
    }
    
  };
  // @ts-expect-error : Should any typ
  const handleclick = (index,e) => {
    // @ts-expect-error : Should any typ
    inputRefs.current[index].setSelectionRange(0, e.target.value.length);

    // optional
    if (index > 0 && !otp[index - 1]) {
      // @ts-expect-error : Should any typ
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  // @ts-expect-error : Should any typ
  const keyDownHandler = (index, e) => {
    if (
        e.key === "Backspace" &&
        !otp[index] &&
        index > 0 &&
        inputRefs.current[index - 1]
      ) {
        // Move focus to the previous input field on backspace
        // @ts-expect-error : Should any typ
        inputRefs.current[index - 1].focus();
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
                  // @ts-expect-error : Should any typ
                  ref={(input) => (inputRefs.current[index] = input)}
                  key={index}
                  type="text"
                  className="h-[48px] w-[48px] rounded-md border-2 px-[15px] py-[15px] text-[1.4em]"
                  inputMode="numeric"
                  onChange={(e) => handleChange(index, e)}
                  onClick={(e) => handleclick(index,e)}
                  onKeyDown={(e) => {
                    keyDownHandler(index, e);
                  }}
                  onFocus={(e)=>handleFocus(index,e)}
                />
              ))}
          </div>
          <Link href="/user-page">
            <input
              type="submit"
              value="VERIFY"
              className="mb-11 mt-5 w-[100%] border-2 bg-black   py-[13px] text-white"
              onSubmit={() => submitHandler()}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
