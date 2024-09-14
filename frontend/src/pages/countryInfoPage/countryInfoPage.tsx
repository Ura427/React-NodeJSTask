import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import "./countryInfoPage.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[];
}

interface CountryData {
  commonName: string;
  officialName: string;
  borderCountries: BorderCountry[];
  populationData: { year: string; value: number }[];
  flagUrl: string;
}

const fetchCountryData = async (countryCode: string) => {
  const response = await axios.get(
    `http://localhost:3000/api/country/${countryCode}`
  );
  return response.data;
};

const CountryInfoPage: React.FC = () => {
  const { countryCode } = useParams<{ countryCode: string }>();

  const {
    data: countryData,
    error,
    isLoading,
  } = useQuery<CountryData>(["countryData", countryCode], () =>
    fetchCountryData(countryCode!)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage = (error as Error).message;
    return <div>Error fetching country info: {errorMessage}</div>;
  }

  return (
    <div className="countryInfoPage__container">
      <div className="countryInfoPage__header">
        <h2>{countryData?.commonName || countryData?.officialName}</h2>
        <img
          src={countryData?.flagUrl}
          alt={`${countryCode} flag`}
          style={{ width: "100px" }}
        />
      </div>

      <div className="countryInfoPage__borderCountries">
        <h2>Border Countries</h2>
        <ul>
          {countryData?.borderCountries.map((country, index) => (
            <li key={index}>
              <Link to={`/country/${country.countryCode}`}>
                {country.commonName || country.officialName}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="countryInfoPage__populationChart">
        <h2>Population Over Time</h2>
        <LineChart width={600} height={300} data={countryData?.populationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default CountryInfoPage;
