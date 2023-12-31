import { PropsWithChildren, useState } from "react";
import { Collapse } from "@mui/material";
import { DeepPartial } from "../../types/custom/DeepPartial";
import { Weather } from "../../types/Forecast";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  StyledBox,
  StyledCard,
  StyledCardActions,
  StyledCardContent,
} from "../../styles/card";
import { ExpandMore } from "../ui/buttons/ExpandMore";
import CardData from "./data/CardData";
import CardDetails from "./details/CardDetails";

type WeatherCardProps = {
  index: number;
  day: number;
  hour: number;
  weatherData?: DeepPartial<Weather>;
  style?: React.CSSProperties;
};

const WeatherCard = ({
  weatherData,
  day,
  hour,
  index,
}: PropsWithChildren<WeatherCardProps>) => {
  const [expandedId, setExpandedId] = useState(-1);

  const handleExpandClick = (id: number) => {
    setExpandedId(expandedId === id ? -1 : id);
  };

  return (
    <StyledBox>
      <StyledCard variant="outlined">
        <StyledCardContent>
          <CardData data={weatherData} day={day} hour={hour} />
        </StyledCardContent>
        <StyledCardActions sx={{ padding: "0.0em 1.5em" }}>
          <ExpandMore
            expand={expandedId === index}
            onClick={() => handleExpandClick(index)}
            aria-expanded={expandedId === index}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </StyledCardActions>
        <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
          <StyledCardContent>
            <CardDetails data={weatherData} day={day} hour={hour} />
          </StyledCardContent>
        </Collapse>
      </StyledCard>
    </StyledBox>
  );
};

export default WeatherCard;
