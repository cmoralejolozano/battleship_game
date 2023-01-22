class Board_square {
  constructor() {
    this.state = " ";
    this.img;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.own_board = {};
    this.external_board = {};
    this.shot_count = 0;
    this.ship_log = [];
    this.shot_log = [];
  }
  water() {
    this.own_board[random_item[0]][random_item[1]] = "💧";
    this.external_board[random_item[0]][random_item[1]] = "💧";
    console.log(
      `Shoot #${this.shot_count} pointing to ${random_item.join("")}: 💧`
    );
    this.shot_count++;
    console.log("Own board:");
    console.table(this.own_board);
    console.log("External board:");
    console.table(this.external_board);
  }
  touched() {
    this.own_board[random_item[0]][random_item[1]] = "💥";
    this.external_board[random_item[0]][random_item[1]] = "💥";
    this.shot_count++;
  }
  touched_drawn_print() {
    console.log(
      `Shoot #${this.shot_count} pointing to ${random_item.join(
        ""
      )}: 💥 and drawn! 🏴‍☠️`
    );
    console.log("Own board:");
    console.table(this.own_board);
    console.log("External board:");
    console.table(this.external_board);
  }
  touched_print() {
    console.log(
      `Shoot #${this.shot_count} pointing to ${random_item.join("")}: 💥`
    );
    console.log("Own board:");
    console.table(this.own_board);
    console.log("External board:");
    console.table(this.external_board);
  }
}

let player1 = new Player(1);
let player2 = new Player(2);

function make_rows(n) {
  let board2 = [];
  for (var i = 0; i < n; i++) {
    let row = [];
    for (var j = 0; j < n; j++) {
      row.push(new Board_square());
    }
    board2.push(row);
  }
  return board2;
}

let show_board = make_rows(10);

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function generate_board(obj) {
  for (let i = 0; i < show_board.length; i++) {
    let row = show_board[i];
    let row_states = [];
    for (let j = 0; j < row.length; j++) {
      row_states.push(row[j].state);
    }
    obj[LETTERS[i]] = row_states;
  }
  return obj;
}

generate_board(player1.own_board);
generate_board(player1.external_board);
generate_board(player2.own_board);
generate_board(player2.external_board);

class Portaavion {
  constructor(arr) {
    this.img = "🚢";
    this.squares = arr;
    this.board_squares = 5;
    this.floating = true;
  }
}
class Buque {
  constructor(arr) {
    this.img = "⛵";
    this.squares = arr;
    this.board_squares = 4;
    this.floating = true;
  }
}
class Submarino {
  constructor(arr) {
    this.img = "🚤";
    this.squares = arr;
    this.board_squares = 3;
    this.floating = true;
  }
}
class Crucero {
  constructor(arr) {
    this.img = "⛴️";
    this.squares = arr;
    this.board_squares = 2;
    this.floating = true;
  }
}
class Lancha {
  constructor(arr) {
    this.img = "🛶";
    this.squares = arr;
    this.board_squares = 1;
    this.floating = true;
  }
}

player1.ship_log = [
  new Portaavion(["C.3", "C.4", "C.5", "C.6", "C.7"]),
  new Buque(["C.0", "D.0", "E.0", "F.0"]),
  new Submarino(["I.1", "I.2", "I.3"]),
  new Submarino(["A.6", "A.7", "A.8"]),
  new Crucero(["D.9", "E.9"]),
  new Crucero(["A.2", "B.2"]),
  new Crucero(["I.9", "H.9"]),
  new Lancha(["G.3"]),
  new Lancha(["I.6"]),
  new Lancha(["F.7"]),
];

player2.ship_log = [
  new Portaavion(["C.3", "D.3", "E.3", "F.3", "G.3"]),
  new Buque(["H.5", "H.6", "H.7", "H.8"]),
  new Submarino(["A.1", "B.1", "C.1"]),
  new Submarino(["B.5", "C.5", "D.5"]),
  new Crucero(["G.0", "G.1"]),
  new Crucero(["C.7", "C.8"]),
  new Crucero(["J.3", "J.4"]),
  new Lancha(["E.2"]),
  new Lancha(["E.9"]),
  new Lancha(["A.4"]),
];

function ship_allocator(PLAYER_SHIPS, board) {
  for (let elem of PLAYER_SHIPS) {
    for (let square of elem.squares) {
      let letter = square[0];
      let number = parseInt(square[2]);
      board[letter][number] = elem.img;
    }
  }
}

ship_allocator(player1.ship_log, player1.own_board);
ship_allocator(player2.ship_log, player2.own_board);



function getRandomItem(arr_letters, arr_numbers, random_item_log2) {
  let random_item = [];
  do {
    // get random index value
    const random_letter_index = Math.floor(Math.random() * arr_letters.length);
    const random_num_index = Math.floor(Math.random() * arr_numbers.length);
    // get random item
    const random_letter = arr_letters[random_letter_index];
    random_item = [random_letter, random_num_index];
  } while(random_item_log2.includes(random_item.join(".")));
  return random_item;
}



const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let random_item_log = [];
let round_num = 0;
let turn = 1;
let game_over = false;

function turn_pl1() {
  while (true) {
    let random_item = getRandomItem(LETTERS, NUMBERS, player1.shot_log);
    if ((!player1.shot_log.includes(random_item.join("."))) && (!(player1.own_board[random_item[0]][random_item[1]] == " "))) {
      player1.shot_log.push(random_item.join("."));
        player1.own_board[random_item[0]][random_item[1]] = "💥";
        player1.external_board[random_item[0]][random_item[1]] = "💥";
        player1.shot_count++;
        for (let elem of player1.ship_log) {
          let ship_hit = false;
          if (elem.squares.includes(random_item.join("."))) {
            elem.board_squares--;
            ship_hit = true;
            if (elem.board_squares == 0) {
              elem.floating = false;
              console.log(`Shoot #${player1.shot_count} pointing to ${random_item.join("")}: 💥 and sunk! 🏴‍☠️`);
              console.log("Own board:");
              console.table(player1.own_board);
              console.log("External board:");
              console.table(player1.external_board);
            } else {
              console.log(`Shoot #${player1.shot_count} pointing to ${random_item.join("")}: 💥`);
              console.log("Own board:");
              console.table(player1.own_board);
              console.log("External board:");
              console.table(player1.external_board);
            }
          }
          if (ship_hit) break;}}
    else if ((!player1.shot_log.includes(random_item.join("."))) && ((player1.own_board[random_item[0]][random_item[1]] == " "))){
      player1.shot_log.push(random_item.join("."));
        player1.own_board[random_item[0]][random_item[1]] = "💧";
        player1.external_board[random_item[0]][random_item[1]] = "💧";
        player1.shot_count++;
        console.log(`Shoot #${player1.shot_count} pointing to ${random_item.join("")}: 💧`);
        console.log("Own board:");
        console.table(player1.own_board);
        console.log("External board:");
        console.table(player1.external_board);
        turn++;
        break
      }
    }
  }

function turn_pl2() {
    while (true) {
      let random_item = getRandomItem(LETTERS, NUMBERS, player2.shot_log);
      if ((!player2.shot_log.includes(random_item.join("."))) && (!(player2.own_board[random_item[0]][random_item[1]] == " "))) {
        player2.shot_log.push(random_item.join("."));
          player2.own_board[random_item[0]][random_item[1]] = "💥";
          player2.external_board[random_item[0]][random_item[1]] = "💥";
          player2.shot_count++;
          for (let elem of player2.ship_log) {
            let ship_hit = false;
            if (elem.squares.includes(random_item.join("."))) {
              elem.board_squares--;
              ship_hit = true;
              if (elem.board_squares == 0) {
                elem.floating = false;
                console.log(`Shoot #${player2.shot_count} pointing to ${random_item.join("")}: 💥 and sunk! 🏴‍☠️`);
                console.log("Own board:");
                console.table(player2.own_board);
                console.log("External board:");
                console.table(player2.external_board);
              } else {
                console.log(`Shoot #${player2.shot_count} pointing to ${random_item.join("")}: 💥`);
                console.log("Own board:");
                console.table(player2.own_board);
                console.log("External board:");
                console.table(player2.external_board);
              }
            }
            if (ship_hit) break;}}
      else if ((!player2.shot_log.includes(random_item.join("."))) && ((player2.own_board[random_item[0]][random_item[1]] == " "))){
        player2.shot_log.push(random_item.join("."));
          player2.own_board[random_item[0]][random_item[1]] = "💧";
          player2.external_board[random_item[0]][random_item[1]] = "💧";
          player2.shot_count++;
          console.log(`Shoot #${player2.shot_count} pointing to ${random_item.join("")}: 💧`);
          console.log("Own board:");
          console.table(player2.own_board);
          console.log("External board:");
          console.table(player2.external_board);
          turn--;
          break
        }
      }
    }

// comienza el juego

console.log('===================================================')
console.log(`========= The Battleship Simulator Starts =========`)
console.log('===================================================')

console.log("Player 1 Own Board:");
console.table(player1.own_board);

console.log("Player 2 Own Board:");
console.table(player2.own_board);

console.log('===================================')
console.log(`========= The Game Starts =========`)
console.log('===================================')


while (!game_over) {
  while (turn == 1) {
    console.log(`Round ${round_num} for player ${turn}`);
    turn_pl1()} 
  while (turn == 2) {
  console.log(`Round ${round_num} for player ${turn}`);
  turn_pl2()}
  round_num++;
if ((((player1.ship_log.every((item) => !item.floating))) || ((player2.ship_log.every((item) => !item.floating)))) ||
  ((player1.shot_count == 100) || (player2.shot_count == 100))) {
  game_over = true;
}}

let winner = ''

if ((player1.ship_log.every((item) => !item.floating))) {
  winner = player2.name
} else if ((player2.ship_log.every((item) => !item.floating))){
  winner = player1.name
}

console.log('And the winner is.....')
console.log(`============================`)
console.log(`========= Player ${winner} =========`)
console.log(`============================`)

console.log('And the final boards are:')
console.log("Player 1 Own Board:");
console.table(player1.own_board);
console.log("Player 2 Own Board:");
console.table(player2.own_board);