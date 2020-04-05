/**
 * Player model
 */
class PlayerModel {
  constructor(data = {}) {
    this.playerId = null;
    this.username = null;
    this.status = null;
    this.role = null;
    Object.assign(this, data);
  }
}
export default PlayerModel;