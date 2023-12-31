import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { LANGUAGES } from "../../../constants";
import { useTranslation } from "react-i18next";

const SwitchLanguageButton = () => {
  const { i18n } = useTranslation();

  const handleLanguage = (e: SelectChangeEvent) => {
    const langCode = e.target.value;
    i18n.changeLanguage(langCode);
    console.log(i18n.language);
  };

  return (
    <FormControl variant="standard" size="small">
      <Select
        labelId="language-select-label"
        id="language-select"
        defaultValue="en"
        onChange={handleLanguage}
        disableUnderline={true}
        // sx={{
        //   "& .MuiMenuItem-root.Mui-selected:hover": {
        //     backgroundColor: "yellow",
        //   },
        // }}
      >
        {LANGUAGES.map(({ code, label }) => (
          <MenuItem key={code} value={code}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SwitchLanguageButton;
