import WeatherPage from "../pages/weatherPage/WeatherPage";

// component wraps content into HTML5 main tag

const Main = () => {
  return (
    <main data-testid={"main"}>
      <WeatherPage />
    </main>
  );
};

export default Main;
