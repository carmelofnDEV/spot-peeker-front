import { env } from "../env";
import { PostModal } from "./Modals/PostModal";
import { useEffect, useState } from "react";
import { Modal } from "./Components/Modal";
import { NotFeedHome } from "./NotFeedHome";
import { HomeLoader } from "./HomeLoader";
import Cookies from "js-cookie";

export const Home = ({ logged }) => {
  const SERVER_URL = env.SERVER_URL;

  const [userFeed, setUserFeed] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [notFeed, setNotFeed] = useState(false);

  const getFeed = async () => {
    const authToken = {
      auth_token: Cookies.get("auth_token"),
    };

    try {
      const response = await fetch(`${SERVER_URL}/user_feed/`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(authToken),
      });

      const data = await response.json();

      if (data.status == "success") {
        setUserFeed(data.publicaciones);
        setLoaded(true);
        setNotFeed(false);
      } else {
        setNotFeed(true);
      }
    } catch (error) {
      console.error("Error al cargar feed:", error);
    }
  };

  const [openModalIndex, setOpenModalIndex] = useState(null);

  const openModal = (index) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    setOpenModalIndex(null);
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (notFeed) {
    return <NotFeedHome />;
  }

  return (
    <>
      <HomeLoader />

      <div className="relative w-full py-2 flex justify-center bg-gray-300 bg-opacity-80 shadow-lg ">
        <a href="/">
          <img
            className="max-h-[10vh]"
            src={`${env.SERVER_URL}/static/logo-home.png`}
            alt="logo-home"
          />
        </a>
      </div>

      <div className="relative flex justify-center items-center my-[8vh] mt-[2vh]">
        <div className="grid grid-cols-1 gap-4 ">
          {userFeed.map((post, index) => (
            <div
              key={index}
              className="flex border-black border-[3px] rounded-t-md flex-col justify-center bg-white bg-opacity-30 items-center"
            >
              <div className="w-full bg-white p-3 rounded-t-md">
                <div className="flex">
                  <a
                    href={`/usuario/${post.autor}`}
                    key={`${index}-tag`}
                    className="font-[700] text-[20px] hover:underline text-white bg-black py-1 px-2 rounded-md "
                  >
                    #{post.autor}
                  </a>
                </div>
              </div>
              <div className="flex justify-center items-center w-full h-[60vh]  border-black border-y-[3px] ">
                <button
                  onClick={() => openModal(index)}
                  className="group inline-block relative w-full h-full"
                >
                  <img
                    src={`${env.SERVER_S3}/media/${post.imagenes[0].imagen}`}
                    alt="..."
                    className="w-[50vw]  h-full object-contain"
                  />
                </button>
              </div>
              <div className="w-full bg-white p-3">
                <div className="flex items-center justify-end gap-1">
                  <div className="flex items-center rounded-md gap-1 bg-black py-1 px-4">
                    <p className="text-[20px] text-white">{post.likes}</p>
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                          stroke="#fff"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                          stroke="#fff"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {openModalIndex === index && (
                <Modal isOpen={true} onClose={closeModal}>
                  <PostModal
                    singlePost={post}
                    isOwner={false}
                    handleOnFollow={true}
                    isFollowed={true}
                    logged={logged}
                  />
                </Modal>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
