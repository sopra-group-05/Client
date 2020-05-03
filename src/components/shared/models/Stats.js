/**
 * Stats model
 */
class Stats {
  constructor(data = {}) {
    this.playerId = null;
    this.playerName = null;
    this.score = null;
    this.guessCount = null;
    this.correctGuessCount = null;
    this.teamPoints = null;
    this.timeToGuess = null;
    this.givenClues = null;
    this.goodClues = null;
    this.timeForClue = null;
    Object.assign(this, data);
  }
}
export default Stats;
