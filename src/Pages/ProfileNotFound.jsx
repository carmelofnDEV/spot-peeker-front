import { env } from "../env";


export const ProfileNotFound = () => {
  return (
    <div className="flex w-full justify-center ">
      <div className="grid grid-cols-4 p-10 ">
        <div></div>
        <div className="p-10 border-[3px] border-black col-span-2 grid grid-cols-3 bg-[#dddddd] rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,15)] relative">
          <div className="flex flex-col justify-center items-center p-4">
            <div

              className="relative flex items-end"
            >
              <img
                className="border-[2px] border-black bg-white rounded-full w-[200px] h-[200px] object-scale-down	"
                src={`${env.SERVER_S3}/media/pics_profile/default.png`}
                alt="foto_perfil"
              />

       
            </div>
          </div>
          <div className="flex flex-col p-4 col-span-2 gap-3">
            <div className=" flex items-center justify-between gap-3">
              <h1 className="text-[30px] font-[800]">¡¡Perfil no encontrado!!</h1>

            </div>
            <div className="flex justify-around">

            </div>
            <div className="text-[18px] font-[800] italic border-t-[3px] pt-8 pl-5 border-black">Parece que este perfil no existe...</div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
