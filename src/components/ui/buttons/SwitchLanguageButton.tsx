import {
  Brightness4 as LightIcon,
  Brightness7 as DarkIcon,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  useTheme,
} from "@mui/material";
import { LANGUAGES } from "../../../constants";

//type StyledFormControlProps = {}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(0),
  //maxHeight: "24px",
  backgroundColor: "transparent",
}));

const SwitchLanguageButton = () => {
  const theme = useTheme();

  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     //minHeight: "100vh",
    //     //width: "100%",
    //     alignItems: "right",
    //     justifyContent: "right",
    //   }}
    // >
    //   {
    //     <select defaultValue={"en"}>
    //       {LANGUAGES.map(({ code, label }) => (
    //         <option key={code} value={label}>
    //           {label}
    //         </option>
    //       ))}
    //     </select>
    //   }
    // </Box>
    <StyledFormControl variant="standard" size="small">
      {/* <InputLabel id="demo-simple-select-label">Language</InputLabel> */}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={LANGUAGES[0].code}
        //label="Language"
        //onChange={handleChange}
        disableUnderline={true}
      >
        {LANGUAGES.map(({ code, label }, index) => (
          <MenuItem key={index} value={code}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default SwitchLanguageButton;
