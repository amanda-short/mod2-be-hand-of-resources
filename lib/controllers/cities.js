const { Router } = require('express');
const City = require('../models/City.js');

module.exports = Router()
  .get('/', async (req, res) => {
    const cities = await City.getAllCities();
    res.json(cities);
  });
