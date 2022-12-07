import { UserCircleIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

function AuthShow() {
  const [click, setClick] = useState(false);
  const { data, status } = useSession() || {};

  return (
    <div>
      {data ? (
        <div className="relative">
          <img
            onClick={() => setClick((prev) => !prev)}
            src={data.user.image}
            className="w-10 h-10 rounded-full"
            alt=""
          />

          {click && (
            <div className="absolute top-14 -left-20 bg-white space-y-3  w-32 rounded border">
              <p
                className="font-bold cursor-pointer hover:bg-slate-100 px-4 py-2 "
                onClick={signOut}
              >
                Logout
              </p>
              {/* <Link href={"/account"}>
                <p className="font-bold cursor-pointer hover:bg-slate-100 px-4 py-2">
                  Settings
                </p>
              </Link> */}
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link href={"/login"}>
            <UserCircleIcon className="w-10 h-10" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default AuthShow;
