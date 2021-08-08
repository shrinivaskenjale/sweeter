import Image from "next/image";
import c from "./dashboard.module.css";

const Dashboard = (props) => {
  const { image, name } = props.user;
  return (
    <div className={c.dashboard}>
      <div>
        <Image src={image} alt={name} />
      </div>
      <div className={c.name}>{name}</div>
    </div>
  );
};

export default Dashboard;
