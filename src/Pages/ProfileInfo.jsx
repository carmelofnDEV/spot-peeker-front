import { env } from "../env";
import { FollowersModal } from "./Modals/FollowersModal ";
import { EditProfileModal } from "./Modals/EditProfileModal";
import { Modal } from "./Components/Modal";
import { PicProfileModal } from "./Modals/PicProfileModal";
import { NotificationsModal } from "./Modals/NotificationsModal";
import { useEffect, useState, Suspense } from "react";

export const ProfileInfo = ({
  handleEditData,
  handleOnFollow,
  isOwner,
  profileInfo,
}) => {
  const [notifyCounter, setNotifyCounter] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [hoverImg, setHoverImg] = useState(false);
  const openModal = () => setModalOpen(true);
  const modalOnClose = () => setModalOpen(false);
  const notifyModal = () => setNotifyOpen(true);

  const [editOpen, setEditOpen] = useState(false);

  const [followersOpen, setFollowersOpen] = useState(false);
  const openPerfilModal = () => setEditOpen(true);
  const closePerfilModal = () => setEditOpen(false);
  const followersOnOpen = () => setFollowersOpen(true);
  const followersOnClose = () => setFollowersOpen(false);
  const notifyOnClose = () => setNotifyOpen(false);
  const onSuccess = () => {
    handleEditData();
    setEditOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-4 p-10 ">
        <div></div>
        <div className="p-10 col-span-2 grid grid-cols-3 bg-[#dddddd] rounded-lg border-black border-[3px] relative">
          <div className="flex flex-col justify-center items-center p-4">
            <div
              onMouseEnter={() => setHoverImg(true)}
              onMouseLeave={() => setHoverImg(false)}
              className="relative flex items-end"
            >
              <img
                className="border-[1px]  border-black bg-white rounded-full w-[200px] h-[200px] object-scale-down	"
                src={`${profileInfo.profileData.foto_perfil}`}
                alt="foto_perfil"
              />

              {isOwner ? (
                <div
                  className={`w-[20px] transition-opacity duration-500 ${
                    hoverImg ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    onClick={openModal}
                    className="rounded-xl transition-opacity duration-500 "
                  >
                    <svg
                      className="max-w-[200px] "
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z"
                        fill="#000"
                      ></path>
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col p-4 col-span-2 gap-3">
            <div className=" flex items-center justify-between gap-3 border-b-[3px] border-black pb-2">
              <h1 className="text-[40px] font-[700]">
                #{profileInfo.userData.username}
              </h1>

              {isOwner ? (
                <div className="flex gap-3 relative">
                  <button
                    onClick={openPerfilModal}
                    className="text-[20px] rounded-md py-1 px-4 border-[2px] border-black  bg-[#76885b]"
                  >
                    Perfil
                  </button>

                  <button
                    onClick={notifyModal}
                    className="text-[20px] rounded py-0.5 px-1 bg-[#76885b] border-[2px] border-black "
                  >
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5.5C14.7614 5.5 17 7.73858 17 10.5V12.7396C17 13.2294 17.1798 13.7022 17.5052 14.0683L18.7808 15.5035C19.6407 16.4708 18.954 18 17.6597 18H6.34025C5.04598 18 4.35927 16.4708 5.21913 15.5035L6.4948 14.0683C6.82022 13.7022 6.99998 13.2294 6.99998 12.7396L7 10.5C7 7.73858 9.23858 5.5 12 5.5ZM12 5.5V3M10.9999 21H12.9999"
                        stroke="#000000"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {notifyCounter !== 0 && (
                      <span className="text-black absolute top-0 right-0 bg-black !text-white  text-[15px] w-5 h-5 rounded-full flex items-center justify-center -mt-1 -mr-1">
                        {notifyCounter}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleOnFollow}
                  className="flex gap-2 items-center text-lg px-4 py-1 bg-black text-white rounded-md "
                >
                  {profileInfo.isFollowed ? <p>Siguiendo</p> : <p>Seguir</p>}
                </button>
              )}
            </div>

            <div className="flex justify-around py-1 ">
              <div className="flex items-center gap-2">
                {" "}
                <span className="text-[25px]">
                  {profileInfo.profileData.num_post}
                </span>{" "}
                <svg
                  width="25px"
                  height="25px"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 391.377 391.377"
                  style={{ enableBackground: "new 0 0 391.377 391.377" }}
                  xmlSpace="preserve"
                >
                  {" "}
                  <g>
                    {" "}
                    <path d="M387.456,91.78c-3.739-6.178-9.648-10.526-16.638-12.245L162.499,28.298c-2.106-0.519-4.27-0.781-6.433-0.781 c-12.471,0-23.259,8.45-26.235,20.551l-6.271,25.498L19.405,106.616c-13.918,4.416-22.089,18.982-18.602,33.163l50.1,203.696 c1.733,7.046,6.122,12.958,12.358,16.647c4.182,2.474,8.837,3.737,13.564,3.737c2.324,0,4.667-0.306,6.977-0.923l160.436-42.907 l63.58,15.638c2.106,0.519,4.271,0.781,6.435,0.781c12.471,0,23.259-8.451,26.233-20.55l50.102-203.698 C392.307,105.211,391.195,97.959,387.456,91.78z M79.246,333.102L30.421,134.595l84.742-26.89L79.732,251.763 c-1.721,6.99-0.608,14.243,3.131,20.422c3.738,6.178,9.646,10.527,16.639,12.247l84.249,20.721L79.246,333.102z M335.706,209.731 l-28.492-43.88c-3.492-5.379-9.295-8.59-15.523-8.59c-4.229,0-8.271,1.438-11.69,4.157l-60.656,48.255 c-1.82,1.449-4.045,2.215-6.434,2.215c-3.137,0-6.058-1.336-8.014-3.663l-22.981-27.35c-4.406-5.242-11.464-8.372-18.879-8.372 c-3.661,0-7.207,0.803-10.254,2.32l-26.477,13.193l31.942-129.871L360.74,107.95L335.706,209.731z" />{" "}
                    <path d="M207.988,145.842c2.114,0.52,4.282,0.783,6.442,0.783c12.406,0,23.143-8.423,26.109-20.483 c3.542-14.405-5.295-29.008-19.7-32.552c-2.114-0.52-4.282-0.783-6.442-0.783c-12.406,0-23.143,8.423-26.109,20.483 C184.746,127.695,193.583,142.298,207.988,145.842z" />{" "}
                  </g>{" "}
                </svg>
              </div>

              <button
                className="flex items-center gap-2"
                onClick={followersOnOpen}
              >
                <span className="text-[25px]">
                  {profileInfo.profileData.followers}
                </span>{" "}
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <title>{"ionicons-v5-j"}</title>{" "}
                  <path d="M336,256c-20.56,0-40.44-9.18-56-25.84-15.13-16.25-24.37-37.92-26-61-1.74-24.62,5.77-47.26,21.14-63.76S312,80,336,80c23.83,0,45.38,9.06,60.7,25.52,15.47,16.62,23,39.22,21.26,63.63h0c-1.67,23.11-10.9,44.77-26,61C376.44,246.82,356.57,256,336,256Zm66-88h0Z" />{" "}
                  <path d="M467.83,432H204.18a27.71,27.71,0,0,1-22-10.67,30.22,30.22,0,0,1-5.26-25.79c8.42-33.81,29.28-61.85,60.32-81.08C264.79,297.4,299.86,288,336,288c36.85,0,71,9,98.71,26.05,31.11,19.13,52,47.33,60.38,81.55a30.27,30.27,0,0,1-5.32,25.78A27.68,27.68,0,0,1,467.83,432Z" />{" "}
                  <path d="M147,260c-35.19,0-66.13-32.72-69-72.93C76.58,166.47,83,147.42,96,133.45,108.86,119.62,127,112,147,112s38,7.66,50.93,21.57c13.1,14.08,19.5,33.09,18,53.52C213.06,227.29,182.13,260,147,260Z" />{" "}
                  <path d="M212.66,291.45c-17.59-8.6-40.42-12.9-65.65-12.9-29.46,0-58.07,7.68-80.57,21.62C40.93,316,23.77,339.05,16.84,366.88a27.39,27.39,0,0,0,4.79,23.36A25.32,25.32,0,0,0,41.72,400h111a8,8,0,0,0,7.87-6.57c.11-.63.25-1.26.41-1.88,8.48-34.06,28.35-62.84,57.71-83.82a8,8,0,0,0-.63-13.39C216.51,293.42,214.71,292.45,212.66,291.45Z" />{" "}
                </svg>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[25px]">
                  {profileInfo.profileData.likes_perfil}{" "}
                </span>
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z"
                      fill="#000000"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            </div>

            {profileInfo?.profileData?.biografia?.length > 0 ? (
              <div className="italic border-t-[3px] border-black py-8 text-[20px] font-[500]">
                "{profileInfo.profileData.biografia}"
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div></div>
      </div>

      <Suspense fallback={<div></div>}>
        <FollowersModal
          user={profileInfo.userData.username}
          isOpen={followersOpen}
          onClose={followersOnClose}
        />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <NotificationsModal
          notifyCounter={notifyCounter}
          setNotifyCounter={setNotifyCounter}
          isOpen={notifyOpen}
          onClose={notifyOnClose}
          onSuccess={onSuccess}
        />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <EditProfileModal
          profileInfo={profileInfo}
          isOpen={editOpen}
          onClose={closePerfilModal}
          onSuccess={onSuccess}
        />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <PicProfileModal
          onClose={modalOnClose}
          onSuccess={onSuccess}
          isOpen={modalOpen}
        />
      </Suspense>
    </>
  );
};
