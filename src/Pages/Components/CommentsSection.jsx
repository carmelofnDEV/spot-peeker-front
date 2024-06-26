import { useEffect, useState } from "react";
import { useUser } from "../../Hooks/useUser";
import { env } from "../../env";
import Cookies from "js-cookie";

export const CommentsSection = ({
  postComments = [],
  logged,
  isOwner,
  setPostComments,
}) => {
  const { getUser } = useUser();
  const [user, setUser] = useState({});
  const [hoverIndex, setHoverIndex] = useState(null);

  const fetchUser = async () => {
    if (logged) {
      try {
        const userData = await getUser();
        setUser(userData.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [logged]);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleDelete = async (commentId) => {
    const authToken = {
      auth_token: Cookies.get("auth_token"),
    };

    try {
      const response = await fetch(
        `${env.SERVER_URL}/delete-comment/${commentId}`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(authToken),
        }
      );
      const data = await response.json();

      if (data.status == "success") {
        const newComm = postComments.filter(
          (comment) => comment.id != commentId
        );
        setPostComments(newComm);
      }
    } catch (error) {
      console.error("Server Error:", error);
      return null;
    }
  };

  return (
    <ul className="list-none p-5 m-0">
      {postComments.map((comment, index) => (
        <li
          key={index}
          className="flex items-start bg-white p-4 rounded-lg shadow-md mb-4 relative border-black border-[3px]"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-12 h-12 overflow-hidden border-black border-[2px] rounded-full">
            <img
              className="object-cover w-full h-full "
              src={`${comment.pic}`}
              alt={`comment_pic_${index}`}
            />
          </div>
          <div className="ml-3">
                    
            <a href={`/usuario/${comment.username}`} className="font-[800] text-black text-[18px] hover:underline">#{comment.username}</a>
            <p className="text-black text-[17px] pl-4 font-[500]">{comment.content}</p>
          </div>
          {hoverIndex === index &&
            (user.username === comment.username || isOwner) && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="absolute top-2 right-2 text-white px-2 py-1 rounded"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"
                    fill="#ef4444"
                  />
                </svg>
              </button>
            )}
        </li>
      ))}
    </ul>
  );
};
