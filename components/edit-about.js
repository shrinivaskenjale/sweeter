import { useRef } from "react";
import c from "./edit-about.module.css";

const EditAbout = (props) => {
  const aboutRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    props.updateAboutHandler(aboutRef.current.value);
  };

  return (
    <>
      <div className="backdrop" onClick={props.cancelEditHandler}></div>
      <div className={c.editAbout}>
        <form onSubmit={submitHandler}>
          <div className={c.formControl}>
            <textarea
              name="about"
              id="about"
              cols="30"
              rows="3"
              defaultValue={props.currentAbout}
              ref={aboutRef}
              minLength={5}
              maxLength={120}
              required
            ></textarea>
          </div>
          <div className={c.formActions}>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAbout;
