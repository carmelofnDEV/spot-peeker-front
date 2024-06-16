import { useEffect, useState } from "react";
import { GMapMarkers } from "./Components/GMapMarkers";
import { env } from "../env";
import { Link } from "react-router-dom";
export const Descubrir = () => {
  const [loaded, setLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [markerData, setMarkerData] = useState();

  const getDiscover = async () => {
    try {
      const response = await fetch(`${env.SERVER_URL}/discover/`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (data.status == "success") {
        setMarkers(data.markers);
        setLoaded(true);
      }
    } catch (error) {
      console.error("Error al cargar feed:", error);
    }
  };

  const onMarker = (marker) => {
    setMarkerData(marker);
  };

  useEffect(() => {
    getDiscover();
  }, []);

  if (loaded) {
    return (
      <div className="flex justify-end relative w-full h-screen">
        <div className="absolute w-screen h-screen ">
          <GMapMarkers markers={markers} onMarker={onMarker} />
        </div>
        {markerData != undefined && (
          <div className="relative mt-[10vh] mr-[5%] ">
            <div className="flex flex-col w-full shadow-2xl border-[2px] border-black  rounded-t-lg">
              <div className="flex justify-between p-3 bg-white rounded-t-lg border-b-[2px] border-black">
                <p className="font-[700] bg-[#76885b] py-1 px-4 rounded-md"> #{markerData.autor}</p>
                <Link className="bg-[#000000] text-white text-[15px] py-1 px-4 rounded-lg border-black border-[1px]" to={`/usuario/${markerData.autor}`}>Ver perfil</Link>
              </div>
              {markerData.imagenes && markerData.imagenes.length > 0 && (
                <div className="flex justify-center items-center max-w-[600px] max-h-[400px] bg-white bg-opacity-30">
                  <img
                    className="object-fit max-w-[600px] max-h-[400px] bg-opacity-30"
                    src={`${env.SERVER_S3}/media/${markerData.imagenes[0].imagen}`}
                    alt="Profile Image"
                  />
                </div>
              )}
            </div>
          </div>
        )}
        <div className="absolute bottom-20 left-5">
          <button
            className="bg-black text-white p-2 rounded-lg"
            onClick={() => {
              getDiscover();
            }}
          >
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 17 17"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M6 8h-6v-6h1v4.109c1.013-3.193 4.036-5.484 7.5-5.484 3.506 0 6.621 2.36 7.574 5.739l-0.963 0.271c-0.832-2.95-3.551-5.011-6.611-5.011-3.226 0.001-6.016 2.276-6.708 5.376h4.208v1zM11 9v1h4.208c-0.693 3.101-3.479 5.375-6.708 5.375-3.062 0-5.78-2.061-6.611-5.011l-0.963 0.271c0.952 3.379 4.067 5.739 7.574 5.739 3.459 0 6.475-2.28 7.5-5.482v4.108h1v-6h-6z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
};
