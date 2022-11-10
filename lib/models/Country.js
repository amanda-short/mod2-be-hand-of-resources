const pool = require('../utils/pool');

class Country {
  constructor({ id, name, language, population, }) {
    this.id = id;
    this.name = name;
    this.language = language;
    this.population = population; 
  }

  static async getAllCountries() {
    const { rows } = await pool.query('SELECT * FROM countries');

    return rows.map((row) => new Country(row));  
  }
}

module.exports = Country;
