import "./App.css";
import TopButton from "./components/TopButton";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App=()=> {
  const [query, setQuery] = useState({ q: "delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);


  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const limit1 = units === "metric" ? 10 : 50;
    const limit2 = units === "metric" ? 20 : 60;
    if (weather.temp <= limit1) return "from-cyan-700 to-blue-700";
    if(weather.temp>limit1 && weather.temp<=limit2) return " from-gray-400 to to-gray-900  "
    return "from-yellow-700 to-orange-700 ";
  };

  const formatBackgroundImage = () => {
    if (!weather) return "bg-[url('https://cdn.wallpapersafari.com/86/45/75RTke.jpg')]";
    const limit1 = units === "metric" ? 10 : 50;
    const limit2 = units === "metric" ? 20 : 60;
    if (weather.temp <= limit1) return " bg-[url('http://www.itsjustlight.com/wp-content/uploads/2014/08/arctic-nunavut-35.jpg')]";
    if(weather.temp>limit1 && weather.temp<=limit2) return " bg-[url('https://live.staticflickr.com/7456/10173336893_26b5aa21f3.jpg')]"
    return " bg-[url('https://cdn.wallpapersafari.com/86/45/75RTke.jpg')]";
  };

  return (
    <div className={`${formatBackgroundImage()} bg-no-repeat bg-cover h-fit bg-blend-darken `}>
      <div className="backdrop-blur-sm">
        <div
          className={`mx-auto max-w-screen-md  py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
        >
          <TopButton setQuery={setQuery} />
          <Inputs setQuery={setQuery} units={units} setUnits={setUnits}  />

          {weather && (
            <div>
              <TimeAndLocation weather={weather} />
              <Weather weather={weather} />

              <Forecast title="hourly forecast" items={weather.hourly} />
              <Forecast title="daily forecast" items={weather.daily} />
            </div>
          )}

          <ToastContainer autoClose={2000} theme="colored" newestOnTop={true} />
        </div>
      </div>
    </div>
  );
}

export default App;

// className={`${formatBackgroundImage()} bg-no-repeat bg-cover h-fit bg-blend-darken `}
// className={`mx-auto max-w-screen-md  py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}