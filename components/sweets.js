import Sweet from "./sweet.js";

const Sweets = (props) => {
  return (
    <div>
      {props.sweets.map((sweet) => {
        return (
          <Sweet
            key={sweet._id}
            sweet={sweet}
            deleteSweet={() => props.deleteSweet(sweet._id)}
          />
        );
      })}
    </div>
  );
};

export default Sweets;
