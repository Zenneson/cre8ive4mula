"use client";
import {
  Box,
  Button,
  Center,
  Group,
  Stack,
  Text,
  Transition,
} from "@mantine/core";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import BrandInfo from "./brandInfo";
import ClientInfo from "./clientInfo";
import classes from "./styles/register.module.css";

export default function Join() {
  const [clinetInfoAdded, setClientInfoAdded] = useState(false);

  return (
    <Center w={"100vw"}>
      <Stack gap={20} mt={150} mx={50}>
        <Box className="panel" p={"xl"} w={"100%"} maw={700} miw={650}>
          <Text className={classes.title} c="#fff">
            CRE8IVE 4MULA
          </Text>
          <Text className={classes.subtitle}>Client Onboarding Form</Text>
          {!clinetInfoAdded && <ClientInfo />}
          <Transition
            mounted={clinetInfoAdded}
            transition="slide-right"
            duration={1000}
            timingFunction="ease"
          >
            {(styles) => (
              <div style={styles}>
                <BrandInfo />
              </div>
            )}
          </Transition>
        </Box>
        <Transition
          mounted={!clinetInfoAdded}
          transition="slide-down"
          duration={1000}
          timingFunction="ease"
        >
          {(styles) => (
            <Box className="panel" style={styles} p={"xl"}>
              Stripe Payment Form
            </Box>
          )}
        </Transition>
        <Group justify="flex-end">
          <Button
            onClick={() => {
              setClientInfoAdded(!clinetInfoAdded);
            }}
            rightSection={<FaPlay size={10} />}
          >
            Continue to Client Portal
          </Button>
        </Group>
      </Stack>
    </Center>
  );
}
