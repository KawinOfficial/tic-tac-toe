import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
import { draw, trophy } from "./img";

export default function ModalWin({ isOpen, onClose, winner, handleReset }) {
  const handlePlayAgain = () => {
    handleReset();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center flexDirection="column" p={5} gap={5}>
              <Image
                src={winner != "It's a draw!" ? trophy : draw}
                maxW={200}
              />
              <Text className="win-text">
                {winner != "It's a draw!" ? winner + " WIN!!" : winner}
              </Text>

              <button className="button-main" onClick={handlePlayAgain}>
                Play Again
              </button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
