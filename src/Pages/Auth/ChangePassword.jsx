import { useEffect } from "react";
import { useAuth } from "../../Hooks/Auth/useAuth";
import { env } from "../../env";

export const ChangePassword = () => {
  const { handleOnChangePassword } = useAuth();

  const onSendMail = async () => {
    const resp = await handleOnChangePassword();
  };

  useEffect(() => {
    onSendMail();
  }, []);

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center mt-[30vh] ">
        <div className="flex flex-col ">
          <div className="bg-[#d1d5db] rounded-t-lg border-black border-[3px] border-b-0">
            <img
              className="py-4 px-8 max-h-[10vh]"
              src={`${env.SERVER_URL}/static/logo-home.png`}
              alt="logo-home"
            />
          </div>

          <div className="flex flex-col bg-white  border-black border-[3px] ">
            <p className="text-[30px] font-[500] px-10 py-10">
              Hemos mandado un enlace a tu correo <br /> para restablecer tu
              contraseña.
            </p>
            <div className="flex w-full justify-end bg-[#d1d5db] py-4 px-2 border-black border-t-[3px]">
              <a
                className="flex items-center gap-2 py-2 px-6 rounded-lg border-[1px] bg-black bg-opacity-100 hover:bg-opacity-80"
                href="/"
              >
                <span className="text-[18px] font-[700] text-white">Ok</span>
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="okIconTitle"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  color="#fff"
                >
                  <title id="okIconTitle">{"Ok"}</title>
                  <polyline points="4 13 9 18 20 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
