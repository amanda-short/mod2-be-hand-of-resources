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

  static async insert({ name, artist, release }) {
    const { rows } = await pool.query(
      `INSERT INTO songs(name, artist, release)
      VALUES ($1, $2, $3)
      RETURNING *`, 
      [name, artist, release]
    );
    return new Song(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const song = await Song.getById(id);
    if (!song) return null;
    const { name, artist, release } = { ...song, ...newAttrs };
    const { rows } = await pool.query(
      `UPDATE songs
      SET name = $2, artist = $3, release = $4
      WHERE id = $1 RETURNING *`,
      [id, name, artist, release]
    );
    return new Song(rows[0]);
  }


}

module.exports = Song;
