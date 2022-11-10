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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * 
      FROM cities
      WHERE id = $1`,
      [id]);
    if (!rows[0]) return null;
    return new City(rows[0]);
  }

  static async insert({ name, state, population }) {
    const { rows } = await pool.query(
      `INSERT INTO cities(name, state, population)
      VALUES ($1, $2, $3)
      RETURNING *`, 
      [name, state, population]
    );
    return new City(rows[0]);
  }

}

module.exports = City;
