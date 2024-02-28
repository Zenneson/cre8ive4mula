"use client";
import {
  ActionIcon,
  Box,
  Center,
  Dialog,
  FileInput,
  Group,
  Select,
  Stack,
  TagsInput,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { FaPaperclip } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import { TbHelpSmall, TbHelpSquareFilled } from "react-icons/tb";
import { services } from "../../public/data/services";
import classes from "./styles/signup.module.css";

export default function BrandInfo(props) {
  const { form } = props;
  const [fileUploadInfo, setFileUploadInfo] = useState(false);
  const [relevantSites, setRelevantSites] = useState(false);

  const servicesToData = (services) => {
    const data = Object.keys(services).map((group) => {
      let groupName = group.charAt(0).toUpperCase() + group.slice(1);
      if (group === "webdev") groupName = "Web Development";
      if (group === "content") groupName = "Content Management";

      return {
        group: groupName,
        items: services[group],
      };
    });

    return data;
  };
  const convertedData = servicesToData(services);

  return (
    <>
      <Stack className={classes.formStack} gap={20}>
        <Textarea
          {...form.getInputProps("companyDesc")}
          placeholder="Company Description..."
          minRows={6}
          autosize
        />
        <Textarea
          {...form.getInputProps("goals")}
          placeholder="Goals..."
          minRows={4}
          autosize
        />
        <Select
          {...form.getInputProps("desiredService")}
          placeholder="Most Desired Service"
          data={convertedData}
          checkIconPosition="right"
          clearable
          classNames={{
            wrapper: "inputWrapper",
            input: "chatInput",
            option: classes.desiredServiceOption,
          }}
        />
        <TagsInput
          {...form.getInputProps("relatedURLs")}
          placeholder="Relevant URLs..."
          leftSectionWidth={50}
          leftSectionPointerEvents="all"
          leftSection={
            <ActionIcon
              variant="transparent"
              color="#fff"
              onClick={() => {
                setRelevantSites(!relevantSites);
                setFileUploadInfo(false);
              }}
            >
              <TbHelpSquareFilled size={30} />
            </ActionIcon>
          }
        />
        <FileInput
          {...form.getInputProps("companyFiles")}
          name="Upload files"
          placeholder="Upload Files..."
          multiple
          leftSectionWidth={50}
          leftSectionPointerEvents="all"
          leftSection={
            <ActionIcon
              variant="transparent"
              color="#fff"
              onClick={() => {
                setFileUploadInfo(!fileUploadInfo);
                setRelevantSites(false);
              }}
            >
              <TbHelpSquareFilled size={30} />
            </ActionIcon>
          }
          rightSectionPointerEvents="all"
          rightSection={
            <ActionIcon
              size={"lg"}
              mr={10}
              className={`actionBtn ${classes.actionBtnDimmed}`}
            >
              <MdOutlineFileUpload />
            </ActionIcon>
          }
        />
        <Box className="altPanel">
          <Group gap={8}>
            <FaPaperclip />
            <Text opacity={0.5} tt={"uppercase"} fz={14} fw={600}>
              Uploaded Files
            </Text>
          </Group>
        </Box>
      </Stack>
      <Dialog
        className="infoDialog"
        opened={fileUploadInfo || relevantSites}
        transitionProps={{
          transition: "slide-left",
          duration: 300,
        }}
        withCloseButton
        size={400}
        p={"20px 25px"}
        pl={60}
        onClose={() => {
          setFileUploadInfo(false);
          setRelevantSites(false);
        }}
      >
        <Center className="dialogIcon">
          <TbHelpSmall size={30} />
        </Center>
        <Title tt={"uppercase"} order={6} c={"dark.1"}>
          {fileUploadInfo ? "Share Files" : "List Relevant URLs"}
        </Title>
        <Text className={classes.fileUploadInfoText} fz={13}>
          {fileUploadInfo ? (
            <>
              Please upload any company logos, brand guidelines, and any other
              relevant company-related files to facilitate accurate brand
              representation. These documents are essential for maintaining
              consistency across all marketing materials and presentations. By
              providing these files, you enable us to align our efforts with
              your brand&apos;s identity and values effectively.
            </>
          ) : (
            <>
              Please provide any relevant URLs that will help us understand your
              brand better. These could include your website, social media
              profiles, or any other online resources that will help us get a
              better understanding of your brand and its values.
            </>
          )}
        </Text>
      </Dialog>
    </>
  );
}
