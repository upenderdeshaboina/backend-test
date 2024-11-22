const express = require("express");
const mysql = require("mysql2/promise");
const axios = require("axios");

// Configuration
const PORT = 3007;
const FINNHUB_API_KEY = "csvgqr9r01qq28mn6htgcsvgqr9r01qq28mn6hu0";
const EXCHANGE = "US"; // Change to your desired exchange code
const DB_CONFIG = {
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "stock_market",
};

// Initialize MySQL Connection Pool
const pool = mysql.createPool(DB_CONFIG);

// Create Express App
const app = express();

// Fetch Companies from Finnhub and Store in MySQL
app.get("/fetch-companies", async (req, res) => {
  try {
    // Fetch company data from Finnhub
    const response = await axios.get(
      `https://marketstack.com/stock_api.php?offset=&exchange=XNSE&search=`
    );
    res.status(200)
    res.send(response.data)

    /*// Check if data is valid
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No companies found" });
    }

    // Insert data into MySQL
    const connection = await pool.getConnection();
    const sql = "INSERT INTO companies (symbol, name, type, currency) VALUES ?";
    const values = data.map((company) => [
      company.symbol,
      company.description,
      company.type,
      company.currency,
    ]);

    await connection.query(sql, [values]);
    connection.release();

    res.status(200).json({ message: "Companies fetched and stored successfully", count: values.length });*/
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred while fetching companies" });
  }
});

// Start the Server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
