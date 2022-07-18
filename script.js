const modes = document.querySelector(".mode");
const boxes = document.querySelectorAll(".divs");
const container = document.querySelector(".container");
const restartbtn = document.getElementById("restart-btn");

container.style.visibility = "hidden";

restartbtn.addEventListener("click", () => {
  game.roundreset();
  gameboard.reset();
  game.playround();
  game.updategameboard();
});

// display controller

const displaycontroller = (() => {
  const pvpmode = document.getElementById("Player");
  const aimode = document.getElementById("ailevels");
  const mainmenu = document.getElementById("Menu");

  pvpmode.addEventListener("click", () => {
    container.style.visibility = "visible";
    aimode.style.visibility = "hidden";
    gameboard.reset();
  });

  mainmenu.addEventListener("click", () => {
    window.location.reload();
  });

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

  return { setField, getField, reset, board };
})();

// game
const game = (() => {
  let round = 1;
  let isover = false;

  boxes.forEach((box) => {
    box.textContent = "";
    box.addEventListener("click", (e) => {
      if (isover) return;
      playround(parseInt(e.target.dataset.index));
      updategameboard();
      console.log(round);
    });
  });

  const playround = (index) => {
    gameboard.setField(index, getcurrentplayersign());
    if (checkwinner(boxes)) {
      displaycontroller.setMessage(`Player ${getcurrentplayersign()} Won !`);
      isover = true;
      return;
    }
    if (round >= 9) {
      displaycontroller.setMessage("Its'a Tie !");
      isover = true;
      return;
    }
    round++;
    displaycontroller.setMessage(`Player ${getcurrentplayersign()}'s turn`);
  };

  const updategameboard = () => {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].textContent = gameboard.getField(i);
    }
  };

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

  const checkwinner = () => {
    return winconditions.some((innerArray) => {
      return innerArray.every((i) => {
        return gameboard.getField(i) === getcurrentplayersign();
      });
    });
  };

  return { round, isover, roundreset, playround, updategameboard };
})();
