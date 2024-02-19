// ex : createLocalIconPathFromUrl( "//cdn.weatherapi.com/weather/64x64/night/119.png" )   => "/night/119.png"
function createLocalIconPathFromUrl(url) {
  const parts = url.split("/");
  const path =
    "../src/assets" + `/${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
  return path;
}
// C:\Users\Trekol\Documents\WebDev\Sites\JsOdin\weather\src\assets\day\395.png
export default function processWeatherJSON(json) {
  const location = {
    name: json.location.name,
    region: json.location.region,
  };

  let days = json.forecast.forecastday.map((currday) => {
    // retrieving the date
    const date = new Date(currday.date);
    //----------------------

    // Grouping the average conditions
    const text = currday.day.condition.text;
    const iconPath = createLocalIconPathFromUrl(currday.day.condition.icon);
    const avgTemp = currday.day.avgtemp_c;
    const averageCondition = { text, iconPath, avgTemp };
    //---------------------------

    let hours = currday.hour.map((currHour) => {
      const iconPath = createLocalIconPathFromUrl(currHour.condition.icon);
      const temp = currHour.temp_c;
      const time = currHour.time.split(" ")[1];
      return { iconPath, temp, time };
    });
    return { date, averageCondition, hours };
  });
  return { days, location };
}
