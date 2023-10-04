const axios = require("axios");

//'YOUR_API_KEY' with your actual CoinMarketCap API key
const apiKey = process.env.crypto_api_key;

// Define the cryptocurrency to get the rate for
const cryptocurrency = "BTC"; // this to the cryptocurrency we want

exports.getCryptoRate = async (req, res) => {
  console.log("Inside getCryptoRate");
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
      {
        params: {
          symbol: cryptocurrency,
          convert: "USD",
        },
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
      }
    );
    console.log("API Response:", response.data);
    if (response.status === 200) {
      const data = response.data;
      if (
        data &&
        data.data &&
        data.data[cryptocurrency] &&
        data.data[cryptocurrency].quote &&
        data.data[cryptocurrency].quote.USD
      ) {
        const price = data.data[cryptocurrency].quote.USD.price;
        res.status(200).json({
          rate: price.toFixed(2),
        });
      } else {
        res.status(500).json({ error: "Unexpected API response format" });
      }
    } else {
      res.status(response.status).json({ error: "API request failed" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
