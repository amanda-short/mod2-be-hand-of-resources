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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * 
      FROM countries
      WHERE id = $1`,
      [id]);
    if (!rows[0]) return null;
    return new Country(rows[0]);
  }

  static async insert({ name, language, population }) {
    const { rows } = await pool.query(
      `INSERT INTO countries(name, language, population)
      VALUES ($1, $2, $3)
      RETURNING *`, 
      [name, language, population]
    );
    return new Country(rows[0]);
  }

  


}

module.exports = Country;
