import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { LANGUAGES } from "../../../constants";
import { useState } from "react";

const SwitchLanguageButton = () => {
  const [language, setLanguage] = useState(LANGUAGES[0].label);

  const handleLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <FormControl variant="standard" size="small">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={language}
        onChange={handleLanguage}
        disableUnderline={true}
      >
        {LANGUAGES.map(({ label }, index) => (
          <MenuItem key={index} value={label}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SwitchLanguageButton;
