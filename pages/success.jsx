import Link from "next/link";
import React, { useEffect } from "react";
import { runFireworks } from "../lib/confetti-fireworks";

function SuccessPage() {
  useEffect(() => {
    localStorage.removeItem("cartItems");
    runFireworks();
  }, []);

  return (
    <div className="h-[70vh] flex items-center justify-center p-5">
      <div className="space-y-3 flex flex-col items-center  p-10 rounded shadow text-center">
        <p className="text-lg">
          {" "}
          <span className="font-bold text-pink-700">Thanks,</span> Purchase
          Successfully Completed
        </p>
        <p>Check Your Inbox for Receipt</p>
        <p>
          if you have any problem then you can email{" "}
          <a
            className=" underline underline-offset-1"
            href="mailto:ashikex49@gmail.com"
          >
            ashikex49@gmail.com
          </a>{" "}
        </p>
        <Link href={"/"}>
          <button className="px-4 py-1 font-mono text-white bg-slate-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;
