/*
  This function must return one of "rock", "paper" or "scissors"
 */
function getMove() {
  const possibleMove = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);

  return possibleMove[randomIndex];
}
