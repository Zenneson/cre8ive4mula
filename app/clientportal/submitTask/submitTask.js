"use client";
import "@dotlottie/react-player/dist/index.css";
import { Center, Group } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { services } from "../../../public/data/services";
import { useSubissionData } from "../portalStore";
import ChooseTypePanel from "./chooseTypePanel";
import ReviewPanel from "./reviewPanel";
import classes from "./styles/submitTask.module.css";
import TaskForm from "./taskForm";

export default function SubmitTask() {
  const titleRef = useRef();
  const { formData, setFormData, submissionPanel, setSubmissionPanel } =
    useSubissionData();
  const [typeServices, setTypeServices] = useState();

  useEffect(() => {
    if (submissionPanel !== 0) setSubmissionPanel(0);
    setFormData({ type: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitPage = () => {
    switch (submissionPanel) {
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

  const setup = () => {
    if (formData.type && formData.type.title === "Design") {
      return { color: "deeporange.5", service: services.design };
    }
    if (formData.type && formData.type.title === "Content") {
      return { color: "deepred.6", service: services.content };
    }
    if (formData.type && formData.type.title === "Web Dev") {
      return { color: "#ffd941", service: services.webdev };
    }
  };
  const setupData = setup();
  useEffect(() => {
    if (setupData && setupData.service) {
      setTypeServices(setupData.service);
    }
  }, [setupData]);

  return (
    <Group className={classes.centerFrame} left={submitPage()} gap={"0px"}>
      <Center
        id="0"
        w={"calc(100vw - 110px)"}
        h={"100vh"}
        pos={"relative"}
        ml={"110px"}
      >
        <ChooseTypePanel
          setupData={setupData}
          choosenType={formData.type}
          setSubmissionPanel={setSubmissionPanel}
          titleRef={titleRef}
        />
      </Center>
      <Center id="1" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <TaskForm typeServices={typeServices} titleRef={titleRef} />
      </Center>
      <Center
        id="2"
        w={"calc(100vw - 110px)"}
        h={"100vh"}
        pos={"relative"}
        ml={"110px"}
      >
        <Center id="1" w={"100vw"} pos={"relative"}>
          <ReviewPanel />
        </Center>
      </Center>
    </Group>
  );
}
