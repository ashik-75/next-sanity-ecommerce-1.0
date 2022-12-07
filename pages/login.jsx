import { getProviders, signIn } from "next-auth/react";

function LoginProvider({ providers }) {
  return (
    <div className=" flex justify-center mt-24">
      <div className="px-20 py-10 shadow rounded">
        {Object.values(providers).map((provider) => (
          <button
            className="border flex items-center gap-4 rounded-full px-4 py-2"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/",
              })
            }
            key={provider.id}
          >
            <img src="google.png" className="w-5 h-5" />
            <span>Sign in with {provider.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LoginProvider;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
