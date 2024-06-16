import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { env } from "../../env";
import { useAuth } from "../../Hooks/Auth/useAuth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastNotifications } from "../Components/ToastNotifications";

export const Login = () => {
  const navigate = useNavigate();
  const { checkLoginCredentials, onChangeLoginInput, errors, setErrors } =
    useAuth();

  const recaptchaRef = useRef();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const token = await recaptchaRef.current.executeAsync();
      console.log("Token de reCAPTCHA:", token);

      if (token) {
        await loginCredentials(event);
      } else {
        setErrors({
          captcha: "La verificación del reCAPTCHA falló. Inténtalo de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error ejecutando reCAPTCHA:", error);
      setErrors({ captcha: "Error ejecutando reCAPTCHA. Inténtalo de nuevo." });
    }
  };

  const loginCredentials = async (event) => {
    let data = await checkLoginCredentials(event);
    if (data.status === "error") {
      setErrors(data.errors);
      recaptchaRef.current.reset();
    } else {
      Cookies.set("auth_token", data.response.cookie, {
        expires: 1,
        path: "/",
      });
      navigate("/");
      setErrors({});
    }
  };

  return (
    <div className="flex justify-center items-center mt-20 w-[100%] p-5 ">
      <form
        onSubmit={handleLogin}
        className="lg:w-1/3 flex flex-col bg-[#dddddd] rounded-xl gap-5 border-black border-[3px]"
      >
        <a href="/" className="flex border-black border-b-[3px] py-4 px-4 justify-center">
          <img
            className="w-[60%]"
            src={`${env.SERVER_S3}/static/logo-home.png`}
            alt="imagen"
          />
        </a>        <div className="w-full h-[100vh] flex justify-center mt-[30vh] ">
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
                Este token NO es valido...
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

        <div className="flex flex-col py-3 px-10">
          <label htmlFor="email" className="text-[18px] font-[800]">
            Usuario o Correo:
          </label>
          <input
            onChange={onChangeLoginInput}
            type="text"
            id="email"
            required
            className="border-black border-[3px] rounded-md focus:border-black focus:ring-0"
          />
          {errors.unverified_email && (
            <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
              {errors.unverified_email}
            </span>
          )}
          {errors.not_email && (
            <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
              {errors.not_email}
            </span>
          )}
        </div>

        <div className="flex flex-col py-3 px-10">
          <label htmlFor="password" className="text-[18px] font-[800]">
            Contraseña:
          </label>
          <input
            onChange={onChangeLoginInput}
            type="password"
            id="password"
            required
            className="border-black border-[3px] rounded-md focus:border-black focus:ring-0"
          />
          {errors.bad_password && (
            <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
              {errors.bad_password}
            </span>
          )}
        </div>

        {errors.captcha && (
          <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
            {errors.captcha}
          </span>
        )}

        <div className="flex justify-end px-10 pb-8">
          <div className="flex justify-center">
            <button className="bg-[#627254] text-[18px] font-[800] border-black border-[2px] py-1 px-3 rounded" type="submit">
              Iniciar sesión
            </button>
          </div>
        </div>

        <div className="border-t-[3px] border-black flex items-center justify-between px-4 pt-5">
          <a href="/register" className="py-1 px-3 bg-black text-white rounded-md">Crear cuenta</a>
          <a href="/recovery-password" className="py-1 px-3 bg-black text-white rounded-md">Recuperar contraseña</a>
        </div>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={env.RECAPTCHA_KEY}
          size="invisible"
        />
      </form>
      <ToastNotifications />
    </div>
  );
};
