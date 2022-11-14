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

  static async updateById(id, newAttrs) {
    const movie = await Movie.getById(id);
    if (!movie) return null;
    const { title, release, studio } = { ...movie, ...newAttrs };
    const { rows } = await pool.query(
      `UPDATE movies
      SET title = $2, release = $3, studio = $4
      WHERE id = $1 RETURNING *`,
      [id, title, release, studio]
    );
    return new Movie(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM movies
      WHERE id = $1 RETURNING *`,
      [id]
    );
    return new Movie(rows[0]);
  }

}

module.exports = Movie;
