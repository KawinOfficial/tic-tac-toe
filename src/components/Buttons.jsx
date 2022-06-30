import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const buttonVariants = {
  initial: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 1.6,
    },
  },
  tab: { scale: 0.8 },
};

export default function Buttons({ text, func }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (text == "Back") {
      navigate("/");
    } else {
      navigate("/game");
    }
  };

  return (
    <>
      <motion.button
        className="button-main"
        onClick={text == "Reset" ? func : handleClick}
        variants={buttonVariants}
        initial="initial"
        animate="show"
        whileTap="tab"
      >
        {text}
      </motion.button>
    </>
  );
}
