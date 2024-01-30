"use client";
import { Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";
import Dashboard from "./dashboard/dashboard";
import Navbar from "./navbar";
import classes from "./styles/clientPortal.module.css";
import SubmitTask from "./submitTask";

const animation = {
  initial: { y: -50, duration: 500 },
  animate: { y: 0, duration: 500 },
  exit: { y: 50, duration: 500 },
  transition: { type: "ease-in-out" },
};

export default function ClientPortal() {
  const [active, setActive] = useState(0);

  return (
    <>
      <Navbar active={active} setActive={setActive} />

      {active === 0 && (
        <motion.div {...animation} className={classes.dashPanel}>
          <Dashboard setActive={setActive} />
        </motion.div>
      )}
      {active === 1 && (
        <motion.div {...animation} className={classes.dashPanel}>
          <SubmitTask />
        </motion.div>
      )}
      {active === 2 && (
        <motion.div {...animation} className={classes.dashPanel}>
          <Title>Archive</Title>
        </motion.div>
      )}
      {active === 3 && (
        <motion.div {...animation} className={classes.dashPanel}>
          <Title>File Repository</Title>
        </motion.div>
      )}
      {active === 4 && (
        <motion.div {...animation} className={classes.dashPanel}>
          <Title>Account Settings</Title>
        </motion.div>
      )}
    </>
  );
}
