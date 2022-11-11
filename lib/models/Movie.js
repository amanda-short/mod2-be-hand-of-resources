const pool = require('../utils/pool');

class Movie {
  constructor({ id, title, release, studio, }) {
    this.id = id;
    this.title = title;
    this.release = release;
    this.studio = studio; 
  }

  static async getAllMovies() {
    const { rows } = await pool.query('SELECT * FROM movies');

    return rows.map((row) => new Movie(row));  
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * 
      FROM movies
      WHERE id = $1`,
      [id]);
    if (!rows[0]) return null;
    return new Movie(rows[0]);
  }

  static async insert({ title, release, studio }) {
    const { rows } = await pool.query(
      `INSERT INTO movies(title, release, studio)
      VALUES ($1, $2, $3)
      RETURNING *`, 
      [title, release, studio]
    );
    return new Movie(rows[0]);
  }

}

module.exports = Movie;
