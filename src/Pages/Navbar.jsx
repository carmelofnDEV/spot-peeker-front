import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/Auth/useAuth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  const excludedPaths = [
    "/login/",
    "/login",
    "/register/",
    "/register",
    "/publicar/",
    "/publicar",
    "/editar-post",
    "/editar-post/",
    "/cambiar-contraseña",
    "/cambiar-contraseña/",
    "/change-password/",
    "/change-password"
  ];

  if (excludedPaths.includes(window.location.pathname)) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white">
      {isLoggedIn ? (
        <>
          <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium border-black border-t-[3px] ">
            <Link
              to="/"
              className="hover:text-black border-l-[3px] border-black inline-flex flex-col items-center justify-center px-5  bg-white hover:bg-[#dddddd] dark:hover:bg-gray-800 group dark:border-gray-600"
            >
              <svg
                className=" mb-2 "
                fill="#000000"
                height="30px"
                width="30px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 404.666 404.666"
                xmlSpace="preserve"
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
                    id="XMLID_216_"
                    d="M136.001,5.128c2.139-4.486,7.511-6.389,11.997-4.251l3.007,1.434c4.487,2.14,6.39,7.511,4.251,11.997 c-1.543,3.237-4.769,5.129-8.13,5.129c-1.299,0-2.617-0.282-3.867-0.878l-3.007-1.434C135.764,14.986,133.862,9.615,136.001,5.128z M246.042,87.867l-72.152,34.407c-4.486,2.14-6.389,7.512-4.25,11.998c1.544,3.236,4.769,5.128,8.13,5.128 c1.299,0,2.618-0.282,3.868-0.878l72.152-34.407c4.486-2.14,6.389-7.512,4.25-11.998C255.898,87.629,250.525,85.729,246.042,87.867z M204.795,47.905l41.247,19.669c1.251,0.596,2.569,0.878,3.868,0.878c3.361,0,6.586-1.892,8.13-5.128 c2.139-4.486,0.236-9.858-4.25-11.998l-41.247-19.669c-4.49-2.139-9.858-0.236-11.998,4.25 C198.406,40.393,200.308,45.765,204.795,47.905z M124.837,86.748c0.004,0,0.008,0,0.012,0l79.936-0.101 c4.97-0.006,8.994-4.041,8.988-9.012c-0.006-4.967-4.034-8.988-9-8.988c-0.003,0-0.008,0-0.012,0l-79.936,0.101 c-4.97,0.006-8.994,4.041-8.988,9.012C115.843,82.726,119.871,86.748,124.837,86.748z M173.89,33.166l2.652,1.265 c1.25,0.596,2.568,0.878,3.867,0.878c3.361,0,6.587-1.892,8.13-5.129c2.139-4.486,0.236-9.857-4.251-11.997l-2.652-1.265 c-4.486-2.138-9.857-0.237-11.997,4.251C167.501,25.656,169.403,31.027,173.89,33.166z M87.566,86.793c0.003,0,0.007,0,0.011,0 l3.333-0.004c4.971-0.006,8.995-4.04,8.989-9.011c-0.006-4.967-4.033-8.989-9-8.989c-0.003,0-0.007,0-0.011,0l-3.333,0.004 c-4.971,0.006-8.995,4.04-8.989,9.011C78.572,82.771,82.6,86.793,87.566,86.793z M143.258,136.882l-3.008,1.435 c-4.486,2.14-6.389,7.511-4.249,11.997c1.543,3.236,4.768,5.128,8.129,5.128c1.299,0,2.618-0.282,3.868-0.879l3.008-1.435 c4.487-2.14,6.389-7.511,4.249-11.997C153.115,136.644,147.742,134.741,143.258,136.882z M342.55,253.091c-4.971,0-9,4.029-9,9 v5.203c0,4.971,4.029,9,9,9s9-4.029,9-9v-5.203C351.55,257.121,347.52,253.091,342.55,253.091z M393.061,160.303v235.362 c0,4.971-4.029,9-9,9h-141.22c-4.971,0-9-4.029-9-9V160.303c0-4.328,3.055-7.942,7.126-8.805 c5.591-16.503,18.561-30.016,35.494-38.091l4.246-40.361c0.481-4.581,4.344-8.059,8.95-8.059h47.586c4.606,0,8.469,3.478,8.95,8.059 l4.247,40.363c16.934,8.074,29.902,21.586,35.494,38.089C390.006,152.361,393.061,155.975,393.061,160.303z M295.224,107.102 c5.85-1.228,11.957-1.875,18.226-1.875c6.271,0,12.377,0.647,18.229,1.875l-2.537-24.114H297.76L295.224,107.102z M260.648,151.303 h81.901h23.704c-8.934-16.574-29.666-28.076-52.804-28.076S269.581,134.73,260.648,151.303z M375.061,169.303H351.55v61.39 c0,4.971-4.029,9-9,9s-9-4.029-9-9v-31.639c-1.645,2.152-4.238,3.541-7.156,3.541c-4.971,0-9-4.029-9-9v-24.292h-65.552v217.362 h123.22V169.303z M166.663,251.568v45.63h21.466c4.971,0,9,4.029,9,9s-4.029,9-9,9h-30.279c-0.125,0.002-0.248,0.002-0.373,0 h-25.841v45.631h56.493c4.971,0,9,4.029,9,9s-4.029,9-9,9H20.604c-4.971,0-9-4.029-9-9s4.029-9,9-9h93.031v-45.631h-62.38 c-0.125,0.002-0.248,0.002-0.373,0H20.604c-4.971,0-9-4.029-9-9s4.029-9,9-9h21.465v-45.63H20.604c-4.971,0-9-4.029-9-9s4.029-9,9-9 H74.34v-45.63H20.604c-4.971,0-9-4.029-9-9s4.029-9,9-9h82.23c4.971,0,9,4.029,9,9s-4.029,9-9,9H92.34v45.63h95.789 c4.971,0,9,4.029,9,9s-4.029,9-9,9H166.663z M148.663,251.568H60.069v45.63h88.594V251.568z"
                  ></path>{" "}
                </g>
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 ">
                Home
              </span>
            </Link>

            <Link
              to="/descubrir"
              className="hover:text-black border-l-[3px] border-black inline-flex flex-col items-center justify-center px-5  bg-white   hover:bg-[#dddddd] dark:hover:bg-gray-800 group dark:border-gray-600"
            >
              <svg
                className="mb-2"
                width="30px"
                height="30px"
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
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Descubrir
              </span>
            </Link>

            <Link
              to="/publicar"
              className="hover:text-black border-x-[3px] border-black inline-flex flex-col items-center justify-center px-5  bg-white   hover:bg-[#dddddd] dark:hover:bg-gray-800 group dark:border-gray-600"
            >
              <svg
                className="mb-2"
                fill="#000000"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Zm5-9a1,1,0,0,1-1,1H13v3a1,1,0,0,1-2,0V13H8a1,1,0,0,1,0-2h3V8a1,1,0,0,1,2,0v3h3A1,1,0,0,1,17,12Z"></path>
                </g>
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Publicar
              </span>
            </Link>

            <Link
              to="/perfil"
              className="hover:text-black border-r-[3px] border-black inline-flex flex-col items-center justify-center px-5  bg-white   hover:bg-[#dddddd] dark:hover:bg-gray-800 group dark:border-gray-600"
            >
              <svg
                className="mb-2"
                width="25px"
                height="25px"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>profile [#000000]</title>{" "}
                  <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    {" "}
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-420.000000, -2159.000000)"
                      fill="#000000"
                    >
                      {" "}
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        {" "}
                        <path
                          d="M374,2009 C371.794,2009 370,2007.206 370,2005 C370,2002.794 371.794,2001 374,2001 C376.206,2001 378,2002.794 378,2005 C378,2007.206 376.206,2009 374,2009 M377.758,2009.673 C379.124,2008.574 380,2006.89 380,2005 C380,2001.686 377.314,1999 374,1999 C370.686,1999 368,2001.686 368,2005 C368,2006.89 368.876,2008.574 370.242,2009.673 C366.583,2011.048 364,2014.445 364,2019 L366,2019 C366,2014 369.589,2011 374,2011 C378.411,2011 382,2014 382,2019 L384,2019 C384,2014.445 381.417,2011.048 377.758,2009.673"
                          id="profile-[#000000]"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Perfil
              </span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium border-black border-t-[3px] ">
            <Link
              to="/"
              className="hover:text-black inline-flex flex-col items-center justify-center px-5  bg-white border-black border-x-[3px] border-x hover:bg-[#dddddd]  group dark:border-gray-600"
            >
              <svg
                className=" mb-2 "
                fill="#000000"
                height="30px"
                width="30px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 404.666 404.666"
                xmlSpace="preserve"
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
                    id="XMLID_216_"
                    d="M136.001,5.128c2.139-4.486,7.511-6.389,11.997-4.251l3.007,1.434c4.487,2.14,6.39,7.511,4.251,11.997 c-1.543,3.237-4.769,5.129-8.13,5.129c-1.299,0-2.617-0.282-3.867-0.878l-3.007-1.434C135.764,14.986,133.862,9.615,136.001,5.128z M246.042,87.867l-72.152,34.407c-4.486,2.14-6.389,7.512-4.25,11.998c1.544,3.236,4.769,5.128,8.13,5.128 c1.299,0,2.618-0.282,3.868-0.878l72.152-34.407c4.486-2.14,6.389-7.512,4.25-11.998C255.898,87.629,250.525,85.729,246.042,87.867z M204.795,47.905l41.247,19.669c1.251,0.596,2.569,0.878,3.868,0.878c3.361,0,6.586-1.892,8.13-5.128 c2.139-4.486,0.236-9.858-4.25-11.998l-41.247-19.669c-4.49-2.139-9.858-0.236-11.998,4.25 C198.406,40.393,200.308,45.765,204.795,47.905z M124.837,86.748c0.004,0,0.008,0,0.012,0l79.936-0.101 c4.97-0.006,8.994-4.041,8.988-9.012c-0.006-4.967-4.034-8.988-9-8.988c-0.003,0-0.008,0-0.012,0l-79.936,0.101 c-4.97,0.006-8.994,4.041-8.988,9.012C115.843,82.726,119.871,86.748,124.837,86.748z M173.89,33.166l2.652,1.265 c1.25,0.596,2.568,0.878,3.867,0.878c3.361,0,6.587-1.892,8.13-5.129c2.139-4.486,0.236-9.857-4.251-11.997l-2.652-1.265 c-4.486-2.138-9.857-0.237-11.997,4.251C167.501,25.656,169.403,31.027,173.89,33.166z M87.566,86.793c0.003,0,0.007,0,0.011,0 l3.333-0.004c4.971-0.006,8.995-4.04,8.989-9.011c-0.006-4.967-4.033-8.989-9-8.989c-0.003,0-0.007,0-0.011,0l-3.333,0.004 c-4.971,0.006-8.995,4.04-8.989,9.011C78.572,82.771,82.6,86.793,87.566,86.793z M143.258,136.882l-3.008,1.435 c-4.486,2.14-6.389,7.511-4.249,11.997c1.543,3.236,4.768,5.128,8.129,5.128c1.299,0,2.618-0.282,3.868-0.879l3.008-1.435 c4.487-2.14,6.389-7.511,4.249-11.997C153.115,136.644,147.742,134.741,143.258,136.882z M342.55,253.091c-4.971,0-9,4.029-9,9 v5.203c0,4.971,4.029,9,9,9s9-4.029,9-9v-5.203C351.55,257.121,347.52,253.091,342.55,253.091z M393.061,160.303v235.362 c0,4.971-4.029,9-9,9h-141.22c-4.971,0-9-4.029-9-9V160.303c0-4.328,3.055-7.942,7.126-8.805 c5.591-16.503,18.561-30.016,35.494-38.091l4.246-40.361c0.481-4.581,4.344-8.059,8.95-8.059h47.586c4.606,0,8.469,3.478,8.95,8.059 l4.247,40.363c16.934,8.074,29.902,21.586,35.494,38.089C390.006,152.361,393.061,155.975,393.061,160.303z M295.224,107.102 c5.85-1.228,11.957-1.875,18.226-1.875c6.271,0,12.377,0.647,18.229,1.875l-2.537-24.114H297.76L295.224,107.102z M260.648,151.303 h81.901h23.704c-8.934-16.574-29.666-28.076-52.804-28.076S269.581,134.73,260.648,151.303z M375.061,169.303H351.55v61.39 c0,4.971-4.029,9-9,9s-9-4.029-9-9v-31.639c-1.645,2.152-4.238,3.541-7.156,3.541c-4.971,0-9-4.029-9-9v-24.292h-65.552v217.362 h123.22V169.303z M166.663,251.568v45.63h21.466c4.971,0,9,4.029,9,9s-4.029,9-9,9h-30.279c-0.125,0.002-0.248,0.002-0.373,0 h-25.841v45.631h56.493c4.971,0,9,4.029,9,9s-4.029,9-9,9H20.604c-4.971,0-9-4.029-9-9s4.029-9,9-9h93.031v-45.631h-62.38 c-0.125,0.002-0.248,0.002-0.373,0H20.604c-4.971,0-9-4.029-9-9s4.029-9,9-9h21.465v-45.63H20.604c-4.971,0-9-4.029-9-9s4.029-9,9-9 H74.34v-45.63H20.604c-4.971,0-9-4.029-9-9s4.029-9,9-9h82.23c4.971,0,9,4.029,9,9s-4.029,9-9,9H92.34v45.63h95.789 c4.971,0,9,4.029,9,9s-4.029,9-9,9H166.663z M148.663,251.568H60.069v45.63h88.594V251.568z"
                  ></path>{" "}
                </g>
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 ">
                Home
              </span>
            </Link>

            <Link
              to="/descubrir"
              className="hover:text-black inline-flex flex-col items-center justify-center px-5  bg-white   hover:bg-[#dddddd] dark:hover:bg-gray-800 group dark:border-gray-600"
            >
              <svg
                className="mb-2"
                width="30px"
                height="30px"
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
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Descubrir
              </span>
            </Link>

            <Link
              to="/login"
              className="hover:text-black inline-flex flex-col items-center justify-center px-5  bg-white border-black border-x-[3px]   hover:bg-[#dddddd] dark:hover:bg-gray-800 group dark:border-gray-600"
            >
              <svg
                className="mb-2"
                width="25px"
                height="25px"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>profile [#000000]</title>{" "}
                  <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    {" "}
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-420.000000, -2159.000000)"
                      fill="#000000"
                    >
                      {" "}
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        {" "}
                        <path
                          d="M374,2009 C371.794,2009 370,2007.206 370,2005 C370,2002.794 371.794,2001 374,2001 C376.206,2001 378,2002.794 378,2005 C378,2007.206 376.206,2009 374,2009 M377.758,2009.673 C379.124,2008.574 380,2006.89 380,2005 C380,2001.686 377.314,1999 374,1999 C370.686,1999 368,2001.686 368,2005 C368,2006.89 368.876,2008.574 370.242,2009.673 C366.583,2011.048 364,2014.445 364,2019 L366,2019 C366,2014 369.589,2011 374,2011 C378.411,2011 382,2014 382,2019 L384,2019 C384,2014.445 381.417,2011.048 377.758,2009.673"
                          id="profile-[#000000]"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Login
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
