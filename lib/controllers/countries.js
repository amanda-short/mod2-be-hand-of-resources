const { Router } = require('express');
const Country = require('../models/Country.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const countrySingle = await Country.getById(id);
      res.json(countrySingle);
    } catch (e) {
      next(e);
    }  
  })

  .get('/', async (req, res) => {
    const countries = await Country.getAllCountries();
    res.json(countries);
  });
