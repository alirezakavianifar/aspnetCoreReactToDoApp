import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5202/weatherforecast")
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Weather Forecast</h1>
        <ul className="space-y-2">
          {data.map((item, index) => (
            <li
              key={index}
              className="flex justify-between p-4 bg-gray-50 rounded border border-gray-200"
            >
              <span>{item.date}</span>
              <span>{item.temperatureC}°C</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
