import React from "react";
import { Box, Text, Center } from "@chakra-ui/react";
import { Buttons } from "../components";
import { motion } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      duration: 0.8,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const texts = "The Tic Tac Toe Game";

  return (
    <>
      <Center h="90vh" flexDirection="column" gap={10}>
        <motion.div
          className="logo"
          variants={containerVariants}
          initial="initial"
          animate="show"
        >
          {texts.split(" ").map((text) => (
            <motion.p key={text} variants={itemVariants}>
              {text}
            </motion.p>
          ))}
        </motion.div>
        <Buttons text="Start" />
      </Center>
    </>
  );
}
