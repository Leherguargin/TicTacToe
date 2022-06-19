let round = "x";
const buttons = document.querySelectorAll(".element");
const win_check = document.querySelectorAll(".b");

const state = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

async function newGame() {
  state.forEach((arr, i) => (state[i] = [0, 0, 0]));
  win_check.forEach((w) => (w.style.visibility = "hidden"));
  buttons.forEach((b) => {
    b.innerHTML = "";
    b.disabled = false;
  });
}

function allEquals(...arr) {
  return arr.every((v) => v === arr[0]);
}

function win(type, number) {
  console.log(`${round} win in ${type} ${number}`);
  buttons.forEach((b) => (b.disabled = true));
  switch (type) {
    case "horizontal":
      win_check[number - 1].style.visibility = "visible";
      break;
    case "vertical":
      win_check[number + 2].style.visibility = "visible";
      break;
    case "cross":
      win_check[number + 5].style.visibility = "visible";
      break;
    case "remis":
      alert("remis");
      break;
    default:
      throw Error();
  }
}

function checkWin() {
  //remis
  if (state.flat().every((e) => e === "o" || e === "x")) win("remis", 0);
  // poziom
  if (allEquals(round, ...state[0])) win("horizontal", 1);
  if (allEquals(round, ...state[1])) win("horizontal", 2);
  if (allEquals(round, ...state[2])) win("horizontal", 3);
  // pion
  if (allEquals(state[0][0], state[1][0], state[2][0], round))
    win("vertical", 1);
  if (allEquals(state[0][1], state[1][1], state[2][1], round))
    win("vertical", 2);
  if (allEquals(state[0][2], state[1][2], state[2][2], round))
    win("vertical", 3);
  // skosy
  if (allEquals(state[0][0], state[1][1], state[2][2], round)) win("cross", 1);
  if (allEquals(state[0][2], state[1][1], state[2][0], round)) win("cross", 2);
}

function shiftRound() {
  if (round === "x") round = "o";
  else round = "x";
}

function handleClick(i, j) {
  state[i][j] = round;
  const btn = buttons[i * 3 + j];
  btn.innerHTML = round;
  btn.disabled = true;
  checkWin();
  shiftRound();
}
