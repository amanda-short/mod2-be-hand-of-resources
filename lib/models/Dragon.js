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
}  

module.exports = Dragon;
