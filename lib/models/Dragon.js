const pool = require('../utils/pool');

class Dragon {
  constructor({ id, name, origin, color, }) {
    this.id = id;
    this.name = name;
    this.origin = origin;
    this.color = color; 
  }

  static async getAllDragons() {
    const { rows } = await pool.query('SELECT * FROM dragons');

    return rows.map((row) => new Dragon(row));  
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * 
      FROM dragons
      WHERE id = $1`,
      [id]);
    if (!rows[0]) return null;
    return new Dragon(rows[0]);
  }
}  

module.exports = Dragon;
