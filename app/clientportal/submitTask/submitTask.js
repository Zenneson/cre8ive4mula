"use client";
import "@dotlottie/react-player/dist/index.css";
import { Center, Group } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { services } from "../../../public/data/services";
import { useSubissionData } from "../portalStore";
import ChooseTypePanel from "./chooseTypePanel/chooseTypePanel";
import ReviewPanel from "./reviewPanel/reviewPanel";
import classes from "./styles/submitTask.module.css";
import TaskForm from "./taskForm/taskForm";

const types = [
  {
    text: "Design",
    color: "deeporange.5",
    svg1: "/img/clientDashboard/submit/psd.json",
    svg2: "/img/clientDashboard/submit/ai.json",
    desc: "Design services encompass all aspects of graphic and web design. This includes the creation of visual elements, website layout design, and other design-related tasks, ensuring a cohesive and aesthetically pleasing visual identity.",
  },
  {
    text: "Content",
    color: "deepred.6",
    svg1: "/img/clientDashboard/submit/docx.json",
    svg2: "/img/clientDashboard/submit/pdf.json",
    desc: "Content services involve SEO, editing, and management of digital content. The focus is on optimizing content for search engines, refining the clarity and effectiveness of the text, and managing content to align with strategic goals.",
  },
  {
    text: "Web Dev",
    color: "#ffd941",
    svg1: "/img/clientDashboard/submit/css.json",
    svg2: "/img/clientDashboard/submit/js.json",
    desc: "Web Development services cover the addition of new features, maintenance, and overall management of websites. This includes ensuring website functionality, responsiveness, and security, as well as implementing updates and improvements.",
  },
];

export default function SubmitTask() {
  const titleRef = useRef();
  const { taskType, submissionPanel, setSubmissionPanel } = useSubissionData();
  const [typeServices, setTypeServices] = useState();

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
    if (taskType === "Design") {
      return {
        color: "deeporange.5",
        services: services.design,
        desc: types[0].desc,
      };
    }
    if (taskType === "Content") {
      return {
        color: "deepred.6",
        services: services.content,
        desc: types[1].desc,
      };
    }
    if (taskType === "Web Dev") {
      return {
        color: "#ffd941",
        services: services.webdev,
        desc: types[2].desc,
      };
    }
  };

  const setupData = setup();
  useEffect(() => {
    if (setupData && setupData.services) {
      setTypeServices(setupData.services);
    }
  }, [setupData]);

  const preloadLottieFile = (fileUrl) => {
    const img = new Image();
    img.src = fileUrl;
  };

  useEffect(() => {
    const lottieFiles = [
      "/img/clientDashboard/submit/psd.json",
      "/img/clientDashboard/submit/ai.json",
      "/img/clientDashboard/submit/docx.json",
      "/img/clientDashboard/submit/pdf.json",
      "/img/clientDashboard/submit/css.json",
      "/img/clientDashboard/submit/js.json",
    ];

    lottieFiles.forEach(preloadLottieFile);
  }, []);

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
          types={types}
          taskType={taskType}
          setupData={setupData}
          setSubmissionPanel={setSubmissionPanel}
          titleRef={titleRef}
        />
      </Center>
      <Center id="1" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <TaskForm
          typeColor={setupData?.color}
          typeServices={typeServices}
          titleRef={titleRef}
        />
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
