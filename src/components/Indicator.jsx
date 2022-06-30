import { Text, Circle } from "@chakra-ui/react";
import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: "7vh", x: "20vw" },
  player1: {
    opacity: [0, 0, 0, 0, 1],
    y: "7vh",
    x: "20vw",

    transition: {
      duration: 0.5,
    },
  },
  player2: {
    opacity: [0, 0, 0, 0, 1],
    y: "84vh",
    x: "80vw",
    transition: {
      duration: 0.5,
    },
  },
};

export default function Indicator({ player }) {
  return (
    <>
      <motion.div
        className="indicator"
        variants={variants}
        initial="initial"
        animate={player ? "player1" : "player2"}
      >
        <Circle bg={player ? "#FDB833" : "#1363df"} border="2px" size="6vh">
          <Text>Turn</Text>
        </Circle>
      </motion.div>
    </>
  );
}
