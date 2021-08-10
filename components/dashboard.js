import c from "./dashboard.module.css";

const Dashboard = (props) => {
  const { image, name } = props.user;
  return (
    <div className={c.dashboard}>
      <div className={c.imageContainer}>
        <img src={image} alt={name} />
        {/* <Image src={image} alt={name} layout="fill" objectFit="cover" /> */}
      </div>
      <div className={c.name}>{name}</div>
    </div>
  );
};

export default Dashboard;
