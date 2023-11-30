import HeaderBar from "./HeaderBar";
import Menu from "./menu/Menu";
import Options from "./options/Options";

const Header = () => {
  return (
    <header data-testid={"header"}>
      {/* <Menu />
      <Options /> */}
      <HeaderBar />
    </header>
  );
};

export default Header;
