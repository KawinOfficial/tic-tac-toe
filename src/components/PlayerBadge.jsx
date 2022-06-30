import { Text, Circle, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const badgeVariants = {
  player1: { opacity: 0, y: -150 },
  player2: { opacity: 0, y: 150 },
  show1: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
  show2: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.8,
    },
  },
};

export default function PlayerBadge({ text, symbol, bg, counter }) {
  return (
    <>
      <motion.div
        variants={badgeVariants}
        initial={symbol == "X" ? "player1" : "player2"}
        animate={symbol == "X" ? "show1" : "show2"}
        className={symbol == "X" ? "player1" : "player2"}
      >
        <Flex fontWeight="bold" flexDirection="column" alignItems="center">
          <Text fontSize="small">WIN</Text>
          <Text fontSize="4xl">{counter}</Text>
        </Flex>

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
      </motion.div>
    </>
  );
}
