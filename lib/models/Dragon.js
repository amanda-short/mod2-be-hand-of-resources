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

  static async insert({ name, origin, color }) {
    const { rows } = await pool.query(
      `INSERT INTO dragons(name, origin, color)
      VALUES ($1, $2, $3)
      RETURNING *`, 
      [name, origin, color]
    );
    return new Dragon(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const dragon = await Dragon.getById(id);
    if (!dragon) return null;
    const { name, origin, color } = { ...dragon, ...newAttrs };
    const { rows } = await pool.query(
      `UPDATE dragons
      SET name = $2, origin = $3, color = $4
      WHERE id = $1 RETURNING *`,
      [id, name, origin, color]
    );
    return new Dragon(rows[0]);
  }
}  

module.exports = Dragon;
