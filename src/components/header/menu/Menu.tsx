import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div
      style={{
        display: "flex",
        margin: "0.5em 1em",
        alignItems: "center",
      }}
    >
      {/* About */}
      <Link to={"/about"}>About</Link>
    </div>
  );
};

export default Menu;
