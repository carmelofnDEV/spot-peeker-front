import { useEffect, useRef, useState } from "react";
import { env } from "../../env";
import { useAuth } from "../../Hooks/Auth/useAuth";
import Cookies from "js-cookie";

export const EditProfileModal = ({
  onSuccess,
  profileInfo,
  isOpen,
  onClose,
}) => {
  const { onLogout, navigate } = useAuth();
  const handleLogOut = async () => {
    const resp = await onLogout();

    if (resp) {
      navigate("/login");
    }
  };

  const [privateOption, setPrivateOption] = useState(profileInfo.es_privado);

  const username = useRef(null);
  const bio = useRef(null);

  const [errors, setErrors] = useState({});

  const handleChangePassword = async () => {
    navigate("/cambiar-contraseña/");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const auth_token = Cookies.get("auth_token");

    if (
      profileInfo.userData.username != username.current.value ||
      profileInfo.profileData.biografia != bio.current.value ||
      profileInfo.profileData.es_privado != privateOption
    ) {
      formData.append("username", username.current.value);
      formData.append("biografia", bio.current.value);
      formData.append("es_privado", privateOption);
      formData.append("auth_token", auth_token);

      try {
        const response = await fetch(`${env.SERVER_URL}/edit-profile/`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const data = await response.json();

        if (data.status == "success") {
          setErrors({});
          onSuccess();
        } else {
          if (data.errors) {
            setErrors(data.errors);
          }
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    } else {
      onSuccess();
    }
  };

  useEffect(() => {
    setPrivateOption(profileInfo.es_privado);
  }, [profileInfo]);

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const changeOption = (e) => {
    setPrivateOption(!privateOption);
  };

  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-40 bg-black bg-opacity-20">
        <div className="relative p-8 rounded-lg flex flex-col justify-center items-center  overflow-hidden">
          <div className=" border-[3px] border-black w-full  bg-white rounded-lg overflow-y-hidden">
            <div className="flex justify-between bg-[#d1d5db] border-b-[3px] border-black text-gray-700 px-6 py-4">
              <h3 className="font-[900] text-[20px] text-black">Perfil</h3>
              <button
                className="text-white p-1 rounded-lg"
                onClick={handleClose}
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <path
                    fill="#000000"
                    d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                  />
                </svg>
              </button>
            </div>
            <form
              onSubmit={handleEdit}
              className="!text-[20px] divide-y divide-gray-200 "
            >
              <div className=" ">
                <div className="mb-10 px-10 pt-4">
                  <label
                    className="block  font-medium text-gray-700"
                    htmlFor="usuario"
                  >
                    Cambiar nombre de usuario:
                  </label>
                  <input
                    ref={username}
                    required
                    id="usuario"
                    type="text"
                    className="mt-1 block w-full px-4 py-2 border-[3px] border-black focus:border-black focus:ring-0 rounded-md shadow-sm  "
                    placeholder="Usuario"
                    defaultValue={profileInfo.userData.username}
                    onChange={(e) => {
                      setUsernameInfo(e.target.value);
                    }}
                  />
                  {errors.username_exist && (
                    <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px] ">
                      {errors.username_exist}
                      <svg
                        className="animate-bounce"
                        fill="#ef4444"
                        width="18px"
                        height="18px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <title>warning</title>
                          <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path>
                        </g>
                      </svg>
                    </span>
                  )}
                  {errors.large_username && (
                    <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px] ">
                      {errors.large_username}
                      <svg
                        className="animate-bounce"
                        fill="#ef4444"
                        width="18px"
                        height="18px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <title>warning</title>
                          <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path>
                        </g>
                      </svg>
                    </span>
                  )}
                </div>
                <div className="!mb-10 px-10">
                  <label
                    className="block  font-medium text-gray-700"
                    htmlFor="biografia"
                  >
                    Biografía
                  </label>
                  <textarea
                    ref={bio}
                    id="biografia"
                    rows="4"
                    className="mt-1 block w-full px-4 py-2 border-[3px] border-black focus:border-black rounded-md shadow-sm focus:ring-0 "
                    placeholder="Cuéntanos sobre ti..."
                    defaultValue={profileInfo.profileData.biografia}
                  ></textarea>
                  {errors.large_bio && (
                    <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px] ">
                      {errors.large_bio}
                      <svg
                        className="animate-bounce"
                        fill="#ef4444"
                        width="18px"
                        height="18px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <title>warning</title>
                          <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path>
                        </g>
                      </svg>
                    </span>
                  )}
                </div>
                <div className="mb-[20%] px-10">
                  <label className="flex gap-3 items-center cursor-pointer">
                    <span className="font-medium text-gray-900 dark:text-gray-300">
                      Cuenta oculta:
                    </span>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        changeOption(e);
                      }}
                      checked={privateOption ? "checked" : ""}
                      className="sr-only peer bg-black"
                    />
                    <div className="relative w-11 h-6 bg-black peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-black rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#76885b]"></div>
                  </label>
                </div>
                <div className="flex gap-32 w-full border-black border-t-[3px] px-2 py-4 ">
                  <div className="flex w-full items-end">
                    <button
                      onClick={handleChangePassword}
                      className="flex items-center  gap-1 py-2 px-4 bg-red-500 rounded-lg"
                    >
                      <span className="text-[16px] text-white whitespace-nowrap overflow-hidden">
                        Cambiar contraseña
                      </span>
                      <svg
                        fill="#fff"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12,13a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0V14A1,1,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex w-full bg-black rounded-lg justify-between items-end">
                    <button
                      type="button"
                      onClick={handleLogOut}
                      className="flex items-center  gap-2 py-2 px-4 "
                    >
                      <span className="text-[16px] text-white">Cerrar sesion</span>
                      <svg
                        width="18px"
                        height="18px"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5"
                          stroke="#fff"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex w-full bg-[#d1d5db] justify-end p-2  !border-black !border-t-[3px]">
                <button
                  type="submit"
                  className="flex gap-2 items-center py-2 px-4 border-[1px] bg-black rounded-lg"
                >
                  <span className="text-[18px] text-white">Hecho</span>
                  <svg
                    width="20px"
                    height="20px"
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
                    <polyline points="4 13 9 18 20 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};
