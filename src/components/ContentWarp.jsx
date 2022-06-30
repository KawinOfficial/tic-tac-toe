import { useState } from "react";
import { Box, Grid, GridItem, Image, Text, Center } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Headset } from "./img";

// Animate Effect
const footerVariants = {
  initial: { y: "98vh", opacity: 0.2 },
  show: { y: "71vh", opacity: 1, transition: { duration: 0.5 } },
};
const blockerVariants = {
  initial: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

export default function ContentWarp({ content: Content }) {
  const [showFooter, setShowFooter] = useState(false);

  return (
    <>
      <Box bg="#06283D" h="100vh" overflow="hidden">
        {/* Footer Page */}
        <motion.div
          variants={footerVariants}
          initial={false}
          animate={showFooter ? "show" : "initial"}
          className="footer-page"
          onClick={() => setShowFooter(!showFooter)}
        >
          <Center flexDirection="column" pb={10}>
            <Box bg="#D9D9D9" rounded="full" h={1} w={100} mb={8} />
            <Grid templateColumns="repeat(2,1fr)" gap={8} alignItems="center">
              <GridItem>
                <Image src={Headset} maxH={190} />
              </GridItem>
              <GridItem fontSize={{ md: "2xl" }}>
                <Text fontWeight="bolder">Contact</Text>
                <Text my={3}>github.com/KawinOfficial</Text>
                <Text>kawin.sris@gmail.com</Text>
              </GridItem>
            </Grid>
          </Center>
        </motion.div>

        {/* Main content */}
        <Content />
      </Box>

      {/* Blocker click outside */}
      {showFooter && (
        <motion.div
          variants={blockerVariants}
          initial="initial"
          animate="show"
          className="blocker"
          onClick={() => setShowFooter(false)}
        />
      )}
    </>
  );
}
