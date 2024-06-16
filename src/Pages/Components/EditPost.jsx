import { useNavigate } from "react-router-dom";

export const EditPost = ({ singlePost }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/editar-post", { state: { singlePost: singlePost } });
  };

  return (
    <>
      <button
        onClick={handleEditClick}
        className="flex gap-2 items-center text-lg px-4 py-1 bg-black text-white rounded-md "
      >
        <span>Editar</span>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="white"
          
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-13 13A1 1 0 0 1 8 21H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 .293-.707l10-10 3-3zM14 7.414l-9 9V19h2.586l9-9L14 7.414zm4 1.172L19.586 7 17 4.414 15.414 6 18 8.586z"
            fill="#white"
          />
        </svg>
      </button>
    </>
  );
};
