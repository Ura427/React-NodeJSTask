
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import "./countryListPage.scss"

interface Country {
  name: string;
  countryCode: string;
}

const fetchCountries = async () => {
  const response = await axios.get('http://localhost:3000/api/countries');
  return response.data;
};

const CountryListPage: React.FC = () => {
  const { data: countries, isLoading, isError } = useQuery(['countries'], fetchCountries);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching countries</div>;
  }

  return (
    <div className='countryListPage__container'>
      <h2 className='countryListPage__header'>Countries</h2>
      <ul className='countryListPage__list'>
        {countries.map((country: Country) => (
          <li key={country.countryCode} className='countryListPage__list--item'>
            <Link to={`/country/${country.countryCode}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryListPage;



