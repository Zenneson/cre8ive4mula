"use client";
import "@dotlottie/react-player/dist/index.css";
import { Affix, Badge, Button, Center, Group, Text } from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";
import { useState } from "react";
import ChooseTypePanel from "./chooseTypePanel";
import classes from "./styles/submitTask.module.css";

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
      "Brand Design",
      "Website / App Wireframing",
      "Social Media Posts",
      "Infographics",
      "Promo and Ad Material",
      "User Interface ",
      "Custom Illustration",
      "CMS Theme Customization",
    ],
    content: [
      "Editing and Proofreading",
      "Marketing Copywriting",
      "SEO Optimization",
      "Content Transcribing ",
    ],
    webdev: [
      "Performance Optimization",
      "Security Optimization",
      "API Development and Integration",
      "CMS Management",
      "Bug Fixes and Troubleshooting",
      "Feature Development",
      "Payment Gateway Integration",
    ],
  };

  const color = () => {
    if (choosenType && choosenType.title === "Design") return "#ff4d28";
    if (choosenType && choosenType.title === "Content") return "#f80800";
    if (choosenType && choosenType.title === "Web Dev") return "#ffd941";
  };

  const serviceList = () => {
    if (choosenType && choosenType.title === "Design") return services.design;
    if (choosenType && choosenType.title === "Content") return services.content;
    if (choosenType && choosenType.title === "Web Dev") return services.webdev;
  };

  const typeColor = color();
  const serviceBadges = serviceList()?.map((service, i) => {
    return (
      <Badge key={i} color={typeColor} variant="filled" size="md">
        {service}
      </Badge>
    );
  });

  return (
    <Group className={classes.centerFrame} left={submitPage()} gap={"0px"}>
      <Affix position={{ top: 30, right: 30 }}>
        <Button.Group className={classes.nextPrev}>
          <Button
            onClick={() =>
              setActivePage((current) => (current > 0 ? current - 1 : current))
            }
          >
            Prev
          </Button>
          <Button
            onClick={() =>
              setActivePage((current) => (current < 2 ? current + 1 : current))
            }
          >
            Next
          </Button>
        </Button.Group>
      </Affix>

      <Center id="0" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <ChooseTypePanel
          choosenType={choosenType}
          serviceBadges={serviceBadges}
          setActivePage={setActivePage}
        />
      </Center>
      <Center id="1" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <Text>Task Details</Text>
      </Center>
      <Center id="2" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <Text>Review Details</Text>
      </Center>
    </Group>
  );
}
