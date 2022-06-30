import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Circle,
  Flex,
  SimpleGrid,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { Buttons, ModalWin } from "../components";
import { motion } from "framer-motion";

const WinCounter = ({ counter }) => (
  <Flex fontWeight="bold" flexDirection="column" alignItems="center">
    <Text fontSize="small">WIN</Text>
    <Text fontSize="4xl">{counter}</Text>
  </Flex>
);

const PlayerAvatar = ({ text, symbol, bg }) => (
  <Flex
    alignItems="center"
    gap={5}
    flexDirection={text == "Player 2" ? "row-reverse" : ""}
  >
    <Circle bg="#fff" size={12} color={bg} fontWeight="bold">
      {symbol}
    </Circle>
    <Text>{text}</Text>
  </Flex>
);

export default function Game() {
  const initialBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  // Modal function
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
      checkArray(row);
      // Check Column
      checkArray(col);
      // Check diagonal Right
      checkArray(diagonalR);
      // Check diagonal Left
      checkArray(diagonalL);
    }

    // Check Draw
    if (draw.length == 9) {
      setWinner("It's a draw!");
      onOpen();
    }
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  return (
    <>
      {/* Player 1 */}
      <motion.div
        initial={{ opacity: 0, y: -150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box h="10vh" className="player1">
          <PlayerAvatar symbol="X" bg="#47b5ff" text="Player 1" />
          <WinCounter counter={counter["X"]} />
        </Box>
      </motion.div>

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
                        color={board[i][j] == "X" ? "#47b5ff" : "#1363df"}
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
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Box h="12vh" className="player2">
          <PlayerAvatar symbol="H" bg="#1363df" text="Player 2" />
          <WinCounter counter={counter["H"]} />
        </Box>
      </motion.div>

      <ModalWin
        isOpen={isOpen}
        onClose={onClose}
        winner={winner}
        handleReset={handleReset}
      />
    </>
  );
}
