const pool = require('../utils/pool');

class City {
  constructor({ id, name, state, population, }) {
    this.id = id;
    this.name = name;
    this.state = state;
    this.population = population; 
  }

  static async getAllCities() {
    const { rows } = await pool.query('SELECT * FROM cities');

    return rows.map((row) => new City(row));  
  }
}

module.exports = City;
