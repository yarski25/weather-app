import SwitchLanguageButton from "../../ui/buttons/SwitchLanguageButton";
import SwitchModeButton from "../../ui/buttons/SwitchModeButton";

const Options = () => {
  return (
    <div
      style={{
        display: "flex",
        margin: "0.5em 0",
        alignItems: "center",
      }}
    >
      <SwitchLanguageButton />
      <SwitchModeButton />
    </div>
  );
};

export default Options;
