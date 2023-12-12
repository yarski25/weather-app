import { fetchImage } from "../../../../api/AWSService";
import SwitchLanguageButton from "../../../ui/buttons/SwitchLanguageButton";
import SwitchModeButton from "../../../ui/buttons/SwitchModeButton";

const Options = () => {
  //const data = fetchImage("logo512.png");

  return (
    <div
      style={{
        display: "flex",
        margin: "0.5em 0",
        alignItems: "center",
      }}
    >
      {/* <div>
        <img src={data} alt="no image" />
      </div> */}
      <SwitchLanguageButton />
      <SwitchModeButton />
    </div>
  );
};

export default Options;
