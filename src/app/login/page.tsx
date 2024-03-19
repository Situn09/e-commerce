import Link from "next/link";
import React from "react";

export default function logIn() {
  return (
    <div className="my-10 flex justify-center">
      <div className="h-[691px] w-[576px] rounded-[20px] border-2 ">
        <div className="my-10 text-center text-[32px] text-xl font-bold">
          Login
        </div>
        <div className="text-center  text-[24px] text-xl font-bold">
          Welcome back to ECOMMERCE
        </div>
        <div className="mb-10 text-center  text-[16px] text-xl font-semibold">
          The next gen business marketplace
        </div>
        <div className="mx-[50px]">
          <label htmlFor="email" className="mb-5 text-[16px] font-semibold">
            Email
          </label>{" "}
          <br />
          <input
            id="email"
            type="email"
            placeholder="Enter"
            className="mb-11 mt-5 w-[100%] border-2 pb-[5px] pl-[10px] pr-[5px] pt-[8px]"
          />
          <label htmlFor="password" className="mb-5 text-[16px] font-semibold">
            Password
          </label>{" "}
          <br />
          <input
            id="password"
            type="password"
            placeholder="Enter"
            className="mb-11 mt-5 w-[100%] border-2 pb-[5px] pl-[10px] pr-[5px] pt-[8px]"
          />
          <Link href="/otp">
            {/* <input  type="submit" value="LOGIN" className="border-2 w-[100%] mt-5 mb-11 py-[13px]   bg-black text-white"/> */}
            <div className="mb-11 mt-5 w-[100%] border-2 bg-black py-[13px]  text-center text-white">
              LOGIN
            </div>
          </Link>
          <div className="h-[2px] border-2"></div>
          <div className="mt-10 text-center ">
            Don’t have an Account?{" "}
            <Link href="/" className="font-bold">
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
