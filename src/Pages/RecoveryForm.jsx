import { useRef } from "react";
import { useAuth } from "../Hooks/Auth/useAuth";
import { env } from "../env";

export const RecoveryForm = () => {
  const mail = useRef(null);
  const { handleOnChangePassword, navigate } = useAuth();

  const onSendMail = async () => {
    const resp = await handleOnChangePassword(mail.current.value);
    navigate("/");
  };

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center mt-[30vh]">
        <div className="flex flex-col ">
          <div className="bg-gray-200 rounded-t-lg border-black border-[3px] border-b-0">
            <img
              className="py-4 px-8 max-h-[10vh]"
              src={`${env.SERVER_URL}/static/logo-home.png`}
              alt="logo-home"
            />
          </div>

          <div className="flex flex-col bg-white border-black border-[3px]  ">
            <p className="text-[20px] font-[500] pt-10 px-10 ">
              Introduce el correo de la cuenta que quieres recuperar:
            </p>
            <div className="py-4 px-10 w-full">
              <input
                type="email"
                ref={mail}
                className="border-black focus:border-black focus:ring-0 border-[3px] rounded-md w-full "
              />
            </div>

            <div className="flex w-full justify-end py-4 mt-5 border-black border-t-[3px] bg-[#d1d5db]">
              <button
                className="flex items-center gap-2 py-2 px-6 bg-black rounded-lg border-[1px] bg-[#76885b] "
                onClick={onSendMail}
              >
                <span className="text-[18px] font-[700] text-white">Recuperar</span>
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
