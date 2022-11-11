const pool = require('../utils/pool');

class Song {
  constructor({ id, name, artist, release, }) {
    this.id = id;
    this.name = name;
    this.artist = artist;
    this.release = release; 
  }

  static async getAllSongs() {
    const { rows } = await pool.query('SELECT * FROM songs');

    return rows.map((row) => new Song(row));  
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * 
      FROM songs
      WHERE id = $1`,
      [id]);
    if (!rows[0]) return null;
    return new Song(rows[0]);
  }


}

module.exports = Song;
