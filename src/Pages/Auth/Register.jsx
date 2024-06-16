import { useContext, useRef, useState } from "react";
import { useAuth } from "../../Hooks/Auth/useAuth";
import { env } from "../../env";
import ReCAPTCHA from "react-google-recaptcha";
import { GlobalContext } from "../../context/GlobalContext";

export const Register = () => {
  const SERVER_URL = env.SERVER_URL;

  const { toasts, setToast } = useContext(GlobalContext);

  const {
    checkRegisterCredentials,
    onChangeRegisterInput,
    errors,
    setErrors,
    navigate,
  } = useAuth();

  const handleCaptchaChange = (token) => {
    setIsCaptchaVerified(true);
    registerCredentials();
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    recaptchaRef.current.execute();
  };

  const recaptchaRef = useRef();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const registerCredentials = async () => {
    let data = await checkRegisterCredentials(event);

    if (data != false) {
      if (data.status == "error") {
        setErrors(data.errors);
      } else {
        setToast([
          ...toasts,
          { type: "info", message: "Hemos enviado un correo de verificación." },
        ]);
        navigate("/login/");
        setErrors({});
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-5  w-[100%] p-5 ">
      <form
        onSubmit={registerCredentials}
        className="lg:w-1/3 flex flex-col  bg-[#dddddd] text-[20px] rounded-xl gap-8 border-[3px] border-black"
      >
  
          <a href="/" className="flex justify-center border-b-[3px] border-black py-4 px-4">
            <img
              className="w-[50%]"
              src={`${env.SERVER_S3}/static/logo-home.png`}
              alt="imagen"
            />
          </a>
    
        <div className="flex justify-center">
          <h1 className="text-[25px] font-[800]">¡Registrate ahora!</h1>
        </div>

        <div className="flex justify-around gap-3 py-4 px-4">
          <div className="flex flex-col">
            <label className="font-[800] text-[18px]" htmlFor="name">
              Nombre:
            </label>
            <input
              onChange={onChangeRegisterInput}
              type="text"
              id="name"
              required
              className="border-black border-[3px] rounded-md focus:border-black focus:ring-0"
            />

            {errors.short_name && (
              <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px] ">
                {errors.short_name}
              </span>
            )}
          </div>

          <div className="flex flex-col ">
            <label className="font-[800] text-[18px]" htmlFor="last_name">
              Apellidos:
            </label>
            <input
              onChange={onChangeRegisterInput}
              type="text"
              id="last_name"
              required
              className="border-black border-[3px] focus:border-black focus:ring-0 rounded-md"
            />

            {errors.short_lastname && (
              <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
                {errors.short_lastname}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-around gap-3 py-4 px-4">
          <div className="flex flex-col">
            <label className="font-[800] text-[18px]" htmlFor="username">
              Usuario:
            </label>
            <input
              onChange={onChangeRegisterInput}
              type="text"
              id="username"
              required
              className="border-black border-[3px] focus:border-black focus:ring-0 rounded-md"
            />

            {errors.large_username && (
              <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
                {errors.large_username}
              </span>
            )}
            {errors.username_exist && (
              <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
                {errors.username_exist}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-[800] text-[18px]" htmlFor="email">
              Correo:
            </label>
            <input
              onChange={onChangeRegisterInput}
              type="email"
              id="email"
              required
              className="border-black border-[3px] focus:border-black focus:ring-0 rounded-md"
            />

            {errors.email_exist && (
              <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
                {errors.email_exist}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-around gap-3 py-4 px-4">
          <div className="flex flex-col">
            <label className="font-[800] text-[18px]" htmlFor="password">
              Contraseña:
            </label>
            <input
              onChange={onChangeRegisterInput}
              type="password"
              id="password"
              required
              className="border-black border-[3px] focus:border-black focus:ring-0 rounded-md"
            />

            {errors.short_password && (
              <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
                {errors.short_password}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-[800] text-[18px]" htmlFor="rep_password">
              Repetir contraseña:
            </label>
            <input
              onChange={onChangeRegisterInput}
              type="password"
              id="rep_password"
              required
              className="border-black focus:border-black focus:ring-0 border-[3px] rounded-md"
            />

            {errors.different_password && (
              <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
                {errors.different_password}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end border-black border-t-[3px] place-items-end	pt-8 px-2">
          <button className="bg-black text-white py-1 px-4 rounded">
            Registrarse
          </button>
        </div>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={env.RECAPTCHA_KEY}
          onChange={handleCaptchaChange}
          size="invisible"
        />
      </form>
    </div>
  );
};
