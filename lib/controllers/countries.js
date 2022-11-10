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

  .post('/', async (req, res, next) => {
    try {
      const addCountry = await Country.insert(req.body);
      res.json(addCountry);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const update = await Country.updateById(req.params.id, req.body);
      res.json(update);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const remove = await Country.delete(req.params.id);
      res.json(remove);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res) => {
    const countries = await Country.getAllCountries();
    res.json(countries);
  });
