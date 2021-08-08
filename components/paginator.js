import c from "./paginator.module.css";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";

const Paginator = (props) => {
  return (
    <div className={c.paginator}>
      {props.currentPage > 1 && (
        <button onClick={props.onPrevious}>
          <IoMdArrowRoundBack />
        </button>
      )}
      {props.currentPage < props.lastPage && (
        <button onClick={props.onNext}>
          <IoMdArrowRoundForward />
        </button>
      )}
    </div>
  );
};

export default Paginator;
