const modes = document.querySelector(".mode");
const boxes = document.querySelectorAll(".divs");
const container = document.querySelector(".container");
const restartbtn = document.getElementById("restart-btn");

restartbtn.addEventListener("click", () => {
  window.location.reload();
  roundreset();
});

// display controller

const displaycontroller = (() => {
  const messageElement = document.getElementById("message");

  const setMessage = (message) => {
    messageElement.textContent = message;
  };
  return { setMessage };
})();

// gameboard
const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setField = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
  };

  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { setField, getField, reset };
})();

// game
const game = (() => {
  let round = 1;
  let isover = false;

  const playerone = (box) => {
    box.textContent = "X";
  };
  const playertwo = (box) => {
    box.textContent = "O";
  };

  boxes.forEach((box) => {
    box.textContent = "";
    box.addEventListener("click", () => {
      if (round % 2 != 0 && box.textContent === "") {
        displaycontroller.setMessage("Player O's turn");
        playerone(box);
        console.log("X");
        round++;
      } else if (round % 2 === 0 && box.textContent === "") {
        displaycontroller.setMessage("Player X's turn");
        playertwo(box);
        console.log("O");
        round++;
      }
      result();
      console.log(round);
    });
  });

  const roundreset = () => {
    round = 0;
    isover = false;
  };

  const getcurrentplayersign = () => {
    return round % 2 === 0 ? "O" : "X";
  };

  const winconditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkwinner = (boxes) => {
    return winconditions.some((innerArray) => {
      return innerArray.every((i) => {
        return boxes[i].textContent === getcurrentplayersign();
      });
    });
    //   function wincheckO(boxes) {
    //     let score = 0;
    //     return winConditions.some((innerArray) => {
    //       return innerArray.every((i) => {
    //         return boxes[i].textContent === "O";
    //       });
    //     });
    //   }
  };
  const result = () => {
    if (checkwinner(boxes)) {
      console.log(checkwinner(boxes));
      displaycontroller.setMessage(`player ${getcurrentplayersign()} won `);
      roundreset();
      return;
    }
    if (round >= 10) {
      displaycontroller.setMessage("it's a tie");
      roundreset();
      return;
    }
  };
  return { checkwinner, round };
})();
