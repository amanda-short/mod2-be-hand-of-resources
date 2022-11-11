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


}

module.exports = Song;
