/**
 * Lobby model
 */
class Lobby {
  constructor(data = {}) {
    this.id = null;
    this.lobbyName = null;
    this.language = null;
    this.lobbyStatus = null;
    this.gameMode = null;
    this.creator = null;
    this.players = null;
    this.numberOfCards = null;
    Object.assign(this, data);
  }
}
export default Lobby;
