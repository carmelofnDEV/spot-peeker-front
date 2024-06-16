import { useState } from "react";
import { env } from "../../env";
import Cookies from "js-cookie";

export const PicProfileModal = ({ onClose, onSuccess, isOpen }) => {
  const SERVER_URL = env.SERVER_URL;

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error("No se ha seleccionado ningún archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("pic", selectedFile);
    const authToken = Cookies.get("auth_token");
    formData.append("auth_token", authToken);

    try {
      const response = await fetch(`${SERVER_URL}/upload-pic_profile/`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();

      if (data.status == "success") {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };
  if (!isOpen) {
    return null;
  } else {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-40">
        <div className="absolute bg-black bg-opacity-30 inset-0"></div>
        <div className="relative md:p-8 md:pt-0 rounded-t-lg  w-full">
          <form
            className=" flex flex-col items-center justify-center w-full"
            onSubmit={handleFormSubmit}
          >
            <div className=" flex flex-col rounded-t-lg  items-center justify-center mb-10 w-[30%] bg-white  gap-4  border-black border-[3px]">
              <div className="bg-[#d1d5db] rounded-t-lg w-full flex justify-end py-4 px-4  border-black border-b-[3px]">
                <button
                  className="text-white  p-1 rounded-lg"
                  onClick={onClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <p className="text-[30px]">Cambiar foto de perfil: </p>
              <input
                className="block border-[#1f2937] border-[3px] text-sm text-gray-900 mb-10 rounded-md  "
                id="pic_input"
                type="file"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <>
                  <div className="w-full flex justify-end bg-[#d1d5db] py-3 px-4 border-black border-t-[3px]">
                    <input
                      type="submit"
                      value="Guardar"
                      className="bg-black text-white py-1 px-4 rounded-lg"
                    />
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
};
