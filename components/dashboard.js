import c from "./dashboard.module.css";
import { useSession } from "next-auth/client";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditAbout from "./edit-about";

const Dashboard = (props) => {
  const [session] = useSession();
  let { image, name, about, _id } = props.user;
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const editHandler = (event) => {
    setIsEditingAbout(true);
  };
  const cancelEditHandler = () => {
    setIsEditingAbout(false);
  };

  const updateAboutHandler = async (newAbout) => {
    try {
      const res = await fetch(`/api/user/${_id}/sweets`, {
        method: "POST",
        body: JSON.stringify({
          about: newAbout,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Error occured.");
      }
      const data = await res.json();
      setIsEditingAbout(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isEditingAbout && (
        <EditAbout
          currentAbout={about}
          cancelEditHandler={cancelEditHandler}
          updateAboutHandler={updateAboutHandler}
        />
      )}
      <div className={c.dashboard}>
        <div className={c.imageContainer}>
          <img src={image} alt={name} />
        </div>
        <div className={c.name}>{name}</div>
        <div className={c.about}>
          <p className={c.aboutText}>{about}</p>
          {session && _id === session.user._id && (
            <div className={c.editAbout} onClick={editHandler}>
              <FaEdit />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
