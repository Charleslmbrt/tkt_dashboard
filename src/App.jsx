import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

//imports components/pages
import Home from "./pages/home";
import Company from "./pages/Company";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [businessList, setBusinessList] = useState([]);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    const fetchBusinessListData = async () => {
      try {
        const response = await axios.get(`https://test.wertkt.com/api/biz/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setBusinessList(response.data);

        const allSectors = response.data.map((company) => company.sector);
        const sectorsList = allSectors.filter(
          (sector, index, array) => array.indexOf(sector) === index
        );
        setSectors(sectorsList);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBusinessListData();
  }, [setIsLoading]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            isLoading={isLoading}
            businessList={businessList}
            sectors={sectors}
          />
        }
      />
      <Route
        path="/company/:id"
        element={<Company isLoading={isLoading} setIsLoading={setIsLoading} />}
      />
    </Routes>
  );
}

export default App;
