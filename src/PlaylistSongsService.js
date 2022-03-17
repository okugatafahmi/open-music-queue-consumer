const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistSongsByPlaylistId(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM playlist_songs 
      LEFT JOIN songs ON playlist_songs.song_id = songs.id
      WHERE playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this.pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistSongsService;
