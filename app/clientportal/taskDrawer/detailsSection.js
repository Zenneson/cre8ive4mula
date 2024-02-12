"use client";
import { taskColor } from "@libs/custom";
import { Badge, Box, Group, Stack, Text, Title } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { IoMdArrowDropright } from "react-icons/io";
import { RiArrowDropRightLine } from "react-icons/ri";
import classes from "./styles/detailsSection.module.css";

export default function DetailsSection() {
  const typeColor = taskColor();
  const { ref, height } = useElementSize();
  const topHeight = `${height + 145}px`;

  return (
    <Box className={`innerPanel ${classes.detailsSection}`} mr={5}>
      <Box h={"100%"}>
        <Stack className={classes.taskTitle} gap={0}>
          <Group gap={3}>
            <Badge
              className={classes.taskType}
              color={typeColor}
              variant={"filled"}
              size="md"
            >
              Design
            </Badge>
            <IoMdArrowDropright opacity={0.25} />
            <Text tt={"uppercase"} fz={14} fw={600}>
              Logo Design
            </Text>
          </Group>
          <Title tt={"uppercase"} w={830} ml={8} order={2} lineClamp={1}>
            Revamp Homepage Design for Enhanced User Engagement and Conversion
          </Title>
        </Stack>
        <Stack gap={20} mt={5}>
          <Box className={classes.topDetails} ref={ref}>
            <Box className={classes.textPanel}>
              <Group gap={0}>
                <RiArrowDropRightLine />
                <Title tt={"uppercase"} mb={1} order={6}>
                  Intended goal
                </Title>
              </Group>
              <Text fz={14}>
                To increase website engagement metrics by redesigning the
                homepage to be more visually appealing, intuitive, and
                user-friendly. The new design should encourage longer visits,
                lower bounce rates, and increase the conversion rate by at least
                20%.
              </Text>
            </Box>
          </Box>
          <Box
            className={`${classes.textPanel} ${classes.taskDesc}`}
            h={`calc(70vh - ${topHeight})`}
          >
            <Group gap={0}>
              <RiArrowDropRightLine />
              <Title tt={"uppercase"} mb={1} order={6}>
                Description
              </Title>
            </Group>
            <Text fz={14}>
              {`The homepage is the first impression visitors have of our brand and services. Currently, it lacks the visual appeal and navigational ease that modern web users expect, leading to suboptimal engagement metrics. The task involves a comprehensive overhaul of the homepage design with the following key objectives:

Modernize the Layout: Implement a clean, modern design that aligns with our brand identity. Use whitespace effectively to create a layout that is easy on the eyes and makes content easily digestible.

Improve Navigation: Redesign the navigation menu to be more intuitive, ensuring that visitors can find the information they are looking for with minimal clicks. Consider sticky navigation elements for easy access throughout the site.

Enhance Content Presentation: Revise content presentation to be more engaging. This includes incorporating dynamic elements such as sliders, interactive infographics, and short explainer videos that succinctly convey our services and value proposition.

Optimize for Conversions: Integrate clear, compelling calls-to-action (CTAs) at strategic points across the homepage. Ensure that each CTA is designed to guide visitors towards taking the next step, whether it's contacting us, requesting a quote, or signing up for a newsletter.

Mobile Responsiveness: Ensure the design is fully responsive, providing a seamless experience across all devices and screen sizes. Mobile users should find the site equally engaging and easy to navigate.

SEO Considerations: Implement SEO best practices in the design process, ensuring that the homepage is optimized for search engines without compromising user experience. This includes proper use of headings, meta tags, and alt text for images.

Performance Optimization: The design should not only be visually appealing but also performance-optimized. Aim for minimal load times by optimizing images and using modern coding practices that do not sacrifice speed for aesthetics.

The project will proceed in phases, starting with a conceptual design, followed by mockups, and then the final implementation after approval. Collaboration and feedback will be essential at every stage to ensure the end product meets our objectives and exceeds our expectations.`}
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
