"use client";
import {
  Center,
  Divider,
  Image,
  Indicator,
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePortalState } from "../portalStore";
import classes from "./styles/navbar.module.css";

const linkData = [
  { icon: "dashboard", label: "Dashbaord" },
  { icon: "submitTask", label: "Submit Task" },
  { icon: "fileRepo", label: "Archive" },
  { icon: "imgGen", label: "AI Image Generator" },
];

const NavbarLink = ({ id, icon, label, activePanel, onClick }) => {
  return (
    <>
      <Divider
        hidden={icon !== "imgGen"}
        opacity={0.15}
        w={"80%"}
        mx={"auto"}
      />
      <Tooltip label={label} position="right" openDelay={0} withArrow={false}>
        <Indicator
          size={activePanel ? "8" : "5"}
          offset={activePanel ? "2" : "17"}
          disabled={icon === "dashboard" ? false : true}
          style={{
            "--indicator-translate-x": "6px",
          }}
        >
          <UnstyledButton
            onClick={onClick}
            className={`${classes.link} ${activePanel && classes.linkActive}`}
            data-activepanel={activePanel || undefined}
          >
            <Image
              src={`/img/menu/${icon}.svg`}
              style={{ width: rem(40), height: rem(40) }}
              alt={label}
            />
          </UnstyledButton>
        </Indicator>
      </Tooltip>
    </>
  );
};

const MainLogo = () => {
  const router = useRouter();
  const logoAnimationProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 1, delay: 1 },
  };

  return (
    <motion.div {...logoAnimationProps}>
      <Image
        className={classes.mainLogo}
        src="/img/svgLogo.svg"
        alt="Logo"
        onClick={() => router.push("/", { scroll: false })}
      />
    </motion.div>
  );
};

export default function Navbar() {
  const { activePanel, setActivePanel, setDrawerOpen } = usePortalState();

  const animationProps = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 1 },
  };

  const links = linkData.map((link, index) => {
    const btnAnimationProps = {
      initial: { x: -50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 1, delay: index * 0.2 },
    };

    return (
      <motion.div key={link.label} {...btnAnimationProps}>
        <NavbarLink
          {...link}
          activePanel={index === activePanel}
          onClick={() => {
            setDrawerOpen(false);
            setActivePanel(index);
          }}
        />
      </motion.div>
    );
  });

  return (
    <motion.div {...animationProps}>
      <nav className={classes.navbar}>
        <Center>
          <MainLogo />
        </Center>
        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>
        <Stack justify="center" gap={0}>
          <NavbarLink
            icon={"settings"}
            onClick={() => {
              setDrawerOpen(false);
              setActivePanel(4);
            }}
            label="Account Settings"
          />
          <NavbarLink icon={"logout"} label="Logout" />
        </Stack>
      </nav>
    </motion.div>
  );
}
