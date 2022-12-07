import React from "react";

function contact() {
  return (
    <div className="my-10 flex items-center justify-center h-[80vh]">
      <div className="grid grid-cols-3 gap-5">
        {["pixel-7.jpg", "p-1.jpg", "p-4.jpg"].map((prod) => (
          <div key={prod} className="h-80 ">
            <img
              src={prod}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default contact;
