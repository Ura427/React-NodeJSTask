require('dotenv').config(); 
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());

app.get('/api/countries', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/AvailableCountries`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching available countries:', error);
    res.status(500).json({ error: 'Failed to fetch available countries' });
  }
});

app.get('/api/country/:countryCode', async (req, res) => {
  const { countryCode } = req.params;

  try {
    const countryResponse = await axios.get(`${process.env.BASE_URL}/CountryInfo/${countryCode}`);
    const countryInfo = countryResponse.data;
    const borderCountries = countryInfo.borders;

    const populationResponse = await axios.post(process.env.POPULATION_API, {
      country: countryInfo.commonName,
    });
    const populationData = populationResponse.data.data.populationCounts;

    const flagResponse = await axios.post(process.env.FLAG_API, {
      country: countryInfo.commonName,
    });
    const flagUrl = flagResponse.data.data.flag;

    res.json({
      commonName: countryInfo.commonName, 
      officialName: countryInfo.officialName,
      borderCountries,
      populationData,
      flagUrl,
    });
  } catch (error) {
    console.error('Error fetching country info:', error);
    res.status(500).json({ error: 'Failed to fetch country info' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
