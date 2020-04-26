/**
 * Clue model
 */
class Clue {
  constructor(data = {}) {
    this.id = null;
    this.clueStatus = null;
    this.hint = null;
    this.lobby = null;
    this.player = null;
    this.flagCounter = null;
    Object.assign(this, data);
  }
}
export default Clue;
