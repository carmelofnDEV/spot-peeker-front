import { useState, useEffect, useContext } from "react";
import { env } from "../env";
import { TagInput } from "./Components/TagInput";
import { GMap } from "./Components/GMap";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DeletePostModal } from "./Modals/DeletePostModal";
import { GlobalContext } from "../context/GlobalContext";
import { ToastNotifications } from "./Components/ToastNotifications";
import Cookies from "js-cookie";

export const Publicar = () => {
  const { toasts, setToast, toastViewed } = useContext(GlobalContext);

  const location = useLocation();
  const { singlePost } = location.state || {};

  const [deleteMolaOpen, setDeleteMolaOpen] = useState(false);

  const openDeleteModal = () => {
    setDeleteMolaOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteMolaOpen(false);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosArray = await Promise.all(
          singlePost.imagenes
            .map(async (imagen) => {
              const url = `${env.SERVER_S3}/media/${imagen.imagen}`;

              const options = {
                mode: "cors",
              };

              const response = await fetch(url);

              // Verifica el estado de la respuesta
              if (!response.ok) {
                console.error(
                  `Failed to fetch image ${imagen.imagen}: ${response.status} ${response.statusText}`
                );
                return null;
              }

              const blob = await response.blob();

              let fileExtension = imagen.imagen.split(".").pop() || "png";

              return new File(
                [blob],
                imagen.imagen.substring(imagen.imagen.lastIndexOf("/") + 1),
                { type: `image/${fileExtension}` }
              );
            })
            .filter((photo) => photo !== null) // Filtra elementos nulos
        );

        setPhotos(photosArray);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const SERVER_URL = env.SERVER_URL;
  const navigate = useNavigate();

  const [coords, setCoords] = useState(
    singlePost && singlePost.ubicacion ? JSON.parse(singlePost.ubicacion) : []
  );

  const [photos, setPhotos] = useState([]);
  const [tags, setTags] = useState(singlePost?.etiquetas || []);
  const [description, setDescription] = useState(singlePost?.descripcion || "");
  const [post_id, setPostId] = useState(singlePost?.id || null);

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!photos) {
      console.error("No se ha seleccionado ningún archivo.");
      return;
    }

    const formData = new FormData();

    photos.forEach((file) => {
      formData.append("photos", file);
    });

    if (post_id != null) {
      formData.append("post_id", post_id);
    }
    formData.append("tags", JSON.stringify(tags));
    formData.append("coords", JSON.stringify(coords));
    formData.append("description", description);

    try {
      let fetch_url = "";
      if (post_id != null) {
        fetch_url = `${SERVER_URL}/editar-post/`;
      } else {
        fetch_url = `${SERVER_URL}/publicar-post/`;
      }

      const authToken = Cookies.get("auth_token");

      formData.append("auth_token", authToken);

      const response = await fetch(fetch_url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      if (data.status == "success") {
        if (post_id != null) {
          setToast([
            { type: "success", message: "Post editado correctamente." },
          ]);
        } else {
          setToast([
            { type: "success", message: "Post publicado correctamente." },
          ]);
        }
        navigate("/perfil");
      } else {
        if (data.errors) {
          const errores = Object.values(data.errors);
          errores.forEach((error) => {
            setToast([...toasts, { type: "error", message: error }]);
          });
          toastViewed();
        }
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const addPhoto = (e) => {
    const files = Array.from(e.target.files);

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const remainingSpace = 4 - photos.length;
    const newPhotos = imageFiles.slice(0, remainingSpace);

    setPhotos([...photos, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex justify-center items-center  w-[100%] mt-5 ">
        <div className="w-1/2 flex border-[3px] border-black flex-col shadow-2xl bg-[#dddddd] rounded-lg  gap-5">
          <div className="w-full border-b-[3px] border-black bg-gray-300 rounded-t-lg py-2 px-4">
            <Link to="/perfil">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#000000"
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  />
                  <path
                    fill="#000000"
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                  />
                </g>
              </svg>
            </Link>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col   rounded-xl gap-5"
          >
            <div className="grid grid-cols-4 gap-3 px-10 ">
              {photos.map((file, index) => (
                <div key={index} className="relative group">
                  {file.url ? (
                    <img
                      src={file.preview}
                      alt={`Foto ${index}`}
                      className="rounded-lg h-[12em] w-full object-cover bg-[#ffffff] border-black border-[2px]"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Foto ${index}`}
                      className="rounded-lg h-[12em] w-full object-cover bg-[#ffffff] border-black border-[2px]"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              {photos.length < 4 ? (
                <label
                  htmlFor="dropzone-file"
                  className="h-[12em] w-full border-2 border-black border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Añadir imagen</span>
                    </p>
                  </div>
                  <input
                    multiple
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={addPhoto}
                    accept="image/*"
                  />
                </label>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-5 h-50 px-10 ">
              <div>
                <textarea
                  id="message"
                  rows="4"
                  name="description"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-[3px] border-black focus:border-black focus:ring-0"
                  placeholder="Descripción del post"
                  onChange={handleDescription}
                  defaultValue={singlePost?.descripcion || ""}
                ></textarea>
              </div>
              <div>
                <div className="flex justify-center h-full">
                  <TagInput
                    setPostTags={setTags}
                    defaultTags={tags}
                    toasts={toasts}
                    setToast={setToast}
                    toastViewed={toastViewed}
                  />
                </div>
              </div>
            </div>
            <div className=" px-10 w-full h-[300px] ">
              <GMap
                setCoords={setCoords}
                defaultMarker={
                  singlePost && singlePost.ubicacion
                    ? JSON.parse(singlePost.ubicacion)
                    : []
                }
              />
            </div>
            {singlePost === undefined ? (
              <div className="w-full bg-[#d1d5db] py-4 border-t-[3px] border-black px-4 rounded-b-lg flex justify-end items-end mt-10">
                <button
                  type="submit"
                  className="bg-black text-white flex justify-center gap-2 items-center cursor-pointer	 px-4 py-1 border-[1px] border-black rounded-lg"
                >
                  <span>Publicar</span>
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
                    color="#000000"
                  >
                    <polyline points="4 13 9 18 20 7" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="w-full flex bg-[#d1d5db] py-4 border-t-[3px] border-black px-4  justify-between items-end mt-10">
                <button
                  onClick={openDeleteModal}
                  type="button"
                  className="bg-red-500 flex justify-center items-center gap-2 px-4 py-1 rounded-lg"
                >
                  <span className="text-white">Eliminar </span>
                  <svg
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    viewBox="0 0 52 52"
                    enableBackground="new 0 0 52 52"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path d="M45.5,10H33V6c0-2.2-1.8-4-4-4h-6c-2.2,0-4,1.8-4,4v4H6.5C5.7,10,5,10.7,5,11.5v3C5,15.3,5.7,16,6.5,16h39 c0.8,0,1.5-0.7,1.5-1.5v-3C47,10.7,46.3,10,45.5,10z M23,7c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1v3h-6V7z" />
                      <path d="M41.5,20h-31C9.7,20,9,20.7,9,21.5V45c0,2.8,2.2,5,5,5h24c2.8,0,5-2.2,5-5V21.5C43,20.7,42.3,20,41.5,20z  M23,42c0,0.6-0.4,1-1,1h-2c-0.6,0-1-0.4-1-1V28c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1V42z M33,42c0,0.6-0.4,1-1,1h-2 c-0.6,0-1-0.4-1-1V28c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1V42z" />
                    </g>
                  </svg>
                </button>
                <button
                  type="submit"
                  className="bg-black text-white flex justify-center gap-2 items-center cursor-pointer px-4 py-1 border-[1px] border-black rounded-lg"
                >
                  <span>Editar</span>
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
                    color="#000000"
                  >
                    <polyline points="4 13 9 18 20 7" />
                  </svg>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <DeletePostModal
        isOpen={deleteMolaOpen}
        onClose={closeDeleteModal}
        singlePost={singlePost}
      />
      <ToastNotifications />
    </>
  );
};
