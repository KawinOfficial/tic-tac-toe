import { useState, useEffect } from "react";
import { Box, SimpleGrid, Center, useDisclosure } from "@chakra-ui/react";
import { Buttons, ModalWin, PlayerBadge, Indicator } from "../components";
import { motion } from "framer-motion";

export default function Game() {
  const initialBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState(true);
  const [winner, setWinner] = useState(null);
  const [counter, setCounter] = useState({ X: 0, H: 0 });

  const handleClick = (i, j) => {
    const boardCopy = [...board];

    if (boardCopy[i][j] == "") {
      boardCopy[i][j] = player ? "X" : "H";
      setBoard(boardCopy);
      setPlayer(!player);
    }
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setPlayer(true);
    setWinner(null);
  };

  const checkArray = (arr) => {
    if (arr?.every((info) => info == arr[0]) && arr[0]) {
      const symbol = arr[0];
      setWinner(symbol == "X" ? "Player 1" : "Player 2");
      setCounter({ ...counter, [symbol]: counter[symbol] + 1 });
      onOpen();
      return true;
    }
  };

  const checkWinner = () => {
    const diagonalR = [board[0][0], board[1][1], board[2][2]];
    const diagonalL = [board[0][2], board[1][1], board[2][0]];
    const draw = board.flat().filter((value) => value != "");

    for (let i = 0; i < 3; i++) {
      const col = board.map((value) => value[i]);
      const row = board[i];
      // Check Row
      if (checkArray(row)) {
        return;
      }
      // Check Column
      else if (checkArray(col)) {
        return;
      }
    }

    // Check diagonal Right
    if (checkArray(diagonalR)) {
      return;
    }
    // Check diagonal Left
    else if (checkArray(diagonalL)) {
      return;
    }
    //  Check draw
    else if (draw.length == 9) {
      setWinner("It's a draw!");
      onOpen();
      return;
    }
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  return (
    <>
      <Indicator player={player} />
      {/* Player 1 */}
      <PlayerBadge
        symbol="X"
        bg="#FDB833"
        text="Player 1"
        counter={counter["X"]}
      />

      {/* Play Board */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Center h="78vh" flexDirection="column" gap={10}>
          <SimpleGrid spacing={3}>
            {Array(3)
              .fill("")
              .map((_, i) => (
                <SimpleGrid key={i} columns={3} spacing={3}>
                  {Array(3)
                    .fill("")
                    .map((_, j) => (
                      <Box
                        key={j}
                        boxSize="12vh"
                        fontSize="7xl"
                        onClick={() => handleClick(i, j)}
                        color={board[i][j] == "X" ? "#FDB833" : "#1363df"}
                        className="board"
                      >
                        {board[i][j]}
                      </Box>
                    ))}
                </SimpleGrid>
              ))}
          </SimpleGrid>

          {/* Button */}
          <Box>
            <Buttons text="Back" />
            <Buttons text="Reset" func={handleReset} />
          </Box>
        </Center>
      </motion.div>

      {/* Player 2 */}
      <PlayerBadge
        symbol="H"
        bg="#1363df"
        text="Player 2"
        counter={counter["H"]}
      />

      <ModalWin
        isOpen={isOpen}
        onClose={onClose}
        winner={winner}
        handleReset={handleReset}
      />
    </>
  );
}
