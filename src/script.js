//create a neural network
const net = new brain.NeuralNetwork();

//training data
const data = [
  //initital data
  {
    input: { r: 0, g: 0, b: 0 }, //0 = white
    output: [1],
  },
  {
    input: { r: 1, g: 1, b: 1 }, //1 = black
    output: [0],
  },
  //adding more data from console log

  {
    input: {
      r: 0.9808989862097606,
      g: 0.9821152395564563,
      b: 0.9767190192316402,
    },
    output: [0],
  },
  {
    input: {
      r: 0.2327260053467095,
      g: 0.5573538910674773,
      b: 0.04466923993182914,
    },
    output: [1],
  },
  {
    input: {
      r: 0.44995748575073624,
      g: 0.09071915568798139,
      b: 0.07951336369292372,
    },
    output: [1],
  },
  {
    input: {
      r: 0.5418794797064848,
      g: 0.6855021946234725,
      b: 0.75511668834007,
    },
    output: [0],
  },
  {
    input: {
      r: 0.1362580418712589,
      g: 0.5904198235569735,
      b: 0.20695620833295214,
    },
    output: [1],
  },
  {
    input: {
      r: 0.2356420306269711,
      g: 0.1498401383650234,
      b: 0.5520739068094773,
    },
    output: [1],
  },
  {
    input: {
      r: 0.9945987861447667,
      g: 0.2788205392030263,
      b: 0.5651822282549863,
    },
    output: [0],
  },
  {
    input: {
      r: 0.5307993070111745,
      g: 0.9367047513484614,
      b: 0.9093480710337933,
    },
    output: [0],
  },
];

//training the network
net.train(data);

const colorElement = document.getElementById("color");
const guessElement = document.getElementById("guess");
const whiteButton = document.getElementById("white-button");
const blackButton = document.getElementById("black-button");
const printButton = document.getElementById("print-button");

let color;
setRandomColor();

whiteButton.addEventListener("click", () => {
  chooseColor(1);
});
blackButton.addEventListener("click", () => {
  chooseColor(0);
});
printButton.addEventListener("click", print);

function chooseColor(value) {
  data.push({
    input: color,
    output: [value],
  });

  setRandomColor();
}

//adding new training data

function print() {
  console.log(JSON.stringify(data));
}

function setRandomColor() {
  color = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  };

  const guess = net.run(color)[0];
  guessElement.style.color = guess > 0.5 ? "#FFF" : "#000";

  colorElement.style.backgroundColor = `rgba(${color.r * 255}, ${
    color.g * 255
  }, ${color.b * 255})`;
}

//generate report

let correctGuesses = 0;
let wrongGuesses = 0;

//AI guess
function aiGuess() {
  const guess = Math.round(net.run(color)[0]);
  return guess > .5 ? 'white' : 'black'
}

// user Guess
function userGuess(userGuess) {
  const aiGuessResult = aiGuess();
  if (userGuess === aiGuessResult) {
    correctGuesses++;
  } else {
    wrongGuesses++;
  }
}

// generate Report
function generateReport() {
  const totalGuesses = correctGuesses + wrongGuesses;
  const percentageCorrect =
    totalGuesses === 0 ? 0 : ((correctGuesses / totalGuesses) * 100).toFixed(2);
  document.getElementById("report").innerHTML = `
                Correct Guesses: ${correctGuesses} <br>
                Wrong Guesses: ${wrongGuesses} <br>
                Percentage of Correct Answers: ${percentageCorrect}%
            `;
}
