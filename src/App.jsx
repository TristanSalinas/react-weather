import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import Display from './components/Display'
import processWeatherJSON from './scripts/jsonhandler';

function App() {
  const API_KEY = "6f161bf00e674263b2e92305243101";
  const [userInputedLoc, setUserInputedLoc] = useState("Rennes");
  const [isLoading, setLoading] = useState(true);
  const [forecast, setForecast]  = useState(null);
 

  useEffect(()=> {
    setLoading(true)
    async function fetchData() {
      const response = await fetch(
        "http://api.weatherapi.com/v1/forecast.json?key="
        + API_KEY
        +"&q="+ userInputedLoc
        +"&days=7"
        +"&lang=fr"
      );
      const result = await response.json();     
      setForecast(processWeatherJSON(result));
      
      setLoading(false);
    }
    fetchData();
    
  }, [userInputedLoc])
  
  return (
    <>
      {!isLoading ? <Display forecast={forecast}/> : <h1>Loading</h1>}
      <SearchBar search={
          (string) => {setUserInputedLoc(string)}
        }
      />
    </>
  )
}

export default App
