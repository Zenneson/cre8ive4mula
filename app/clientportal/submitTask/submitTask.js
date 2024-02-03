"use client";
import "@dotlottie/react-player/dist/index.css";
import { Affix, Badge, Button, Center, Group, Text } from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ChooseTypePanel from "./chooseTypePanel";
import classes from "./styles/submitTask.module.css";
import TaskForm from "./taskForm";

export default function SubmitTask() {
  const [activePage, setActivePage] = useState(0);
  const [choosenType, setChoosenType] = useSessionStorage({
    key: "submitData",
    defaultValue: null,
  });

  const submitPage = () => {
    switch (activePage) {
      case 0:
        return "0px";
      case 1:
        return "-100vw";
      case 2:
        return "-200vw";
      case 3:
        return "-300vw";
      case 4:
        return "-400vw";
      case 5:
        return "-500vw";
      default:
        return "0px";
    }
  };

  const services = {
    design: [
      "Logo Design",
      "UX / UI Design",
      "Brand Identity",
      "Website / App Wireframing",
      "Print Design",
      "Infographic Design",
      "Photoshop Editing",
      "Social Media Posts",
      "Promotion Material",
    ],
    content: [
      "Editing and Proofreading",
      "Marketing Copywriting",
      "SEO Optimization",
      "Content Transcribing ",
    ],
    webdev: [
      "Performance Optimization",
      "Feature Development",
      "API Development",
      "Database Management",
      "Website Migration",
      "Security Optimization",
      "Bug Fixes and Troubleshooting",
      "Payment Gateway Integration",
      "CMS Management",
    ],
  };

  const setup = () => {
    if (choosenType && choosenType.title === "Design")
      return { color: "#ff4d28", service: services.design };
    if (choosenType && choosenType.title === "Content")
      return { color: "#f80800", service: services.content };
    if (choosenType && choosenType.title === "Web Dev")
      return { color: "#ffd941", service: services.webdev };
  };

  const setupData = setup();
  const serviceList = setupData?.service;
  const serviceBadges = serviceList?.map((service, i) => {
    return (
      <Badge
        key={i}
        className={classes.serviceBadges}
        color={setupData.color}
        c={choosenType.title === "Web Dev" ? "#000" : "#fff"}
        size={"xs"}
        variant="filled"
      >
        {service}
      </Badge>
    );
  });

  return (
    <Group className={classes.centerFrame} left={submitPage()} gap={"0px"}>
      {activePage > 0 && (
        <Affix position={{ top: 30, right: 30 }}>
          <Button
            className={classes.backButton}
            leftSection={
              <FaPlay size={10} style={{ transform: "scaleX(-1)" }} />
            }
            onClick={() =>
              setActivePage((current) => (current > 0 ? current - 1 : current))
            }
          >
            Back
          </Button>
        </Affix>
      )}

      <Center
        id="0"
        w={"calc(100vw - 110px)"}
        h={"100vh"}
        pos={"relative"}
        ml={"110px"}
      >
        <ChooseTypePanel
          choosenType={choosenType}
          serviceBadges={serviceBadges}
          setActivePage={setActivePage}
        />
      </Center>
      <Center id="1" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <TaskForm
          setActivePage={setActivePage}
          choosenType={choosenType}
          service={serviceList}
        />
      </Center>
      <Center
        id="2"
        w={"calc(100vw - 110px)"}
        h={"100vh"}
        pos={"relative"}
        ml={"110px"}
      >
        <Text>Review Details</Text>
      </Center>
    </Group>
  );
}
