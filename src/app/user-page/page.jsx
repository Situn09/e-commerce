import React from "react";

export default function userPage() {
  return (
    <div className="my-10 flex justify-center">
      <div className="h-[691px] w-[576px] rounded-[20px] border-2 ">
        <div className="my-10 text-center text-[32px] font-bold">
          Please mark your interests!
        </div>
        <div className="my-10 text-center text-[16px]">
          We will keep you notified.
        </div>
        <div className="mx-[50px]">
          <label htmlFor="email" className=" text-[20px] font-bold">
            My saved interests!
          </label>{" "}
          <br />
          <div className="mt-5 flex flex-col">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <input
                  
                    id={`item ${index}`}
                    type="checkbox"
                    placeholder="Enter"
                    className=" mb-5 h-[24px] w-[24px] border-2"
                  />
                  <label

                    htmlFor={`item ${index}`}
                    className="mx-[5px] align-[6px] font-semibold"
                  >
                    {" "}
                    {`item ${index}`}{" "}
                  </label>
                </div>
              ))}
          </div>
          <div className="flex mt-5 justify-center">
            <div>
              {" "}
              <i style={style.leftArrow}></i>
              <i style={style.leftArrow}></i> <i style={style.leftArrow}></i>
            </div>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <span key={index} className="mx-3">{index +1}</span>
              ))}
            <div>
              <i style={style.rightArrow}></i> <i style={style.rightArrow}></i>
              <i style={style.rightArrow}></i>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const style = {
  leftArrow: {
    border: "solid black",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
    transform: "rotate(135deg)",
    WebkitTransform: "rotate(135deg)",
  },
  rightArrow: {
    border: "solid black",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
    transform: "rotate(-45deg)",
    WebkitTransform: "rotate(-45deg)",
  },
};
