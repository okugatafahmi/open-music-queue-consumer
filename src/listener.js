class Listener {
  constructor(playlistsService, playlistSongsService, mailSender) {
    this.playlistsService = playlistsService;
    this.playlistSongsService = playlistSongsService;
    this.mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this.playlistsService.getPlaylistById(playlistId);
      const songs = await this.playlistSongsService.getPlaylistSongsByPlaylistId(playlistId);
      playlist.songs = songs;

      const result = await this.mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
