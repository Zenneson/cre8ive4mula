"use client";
import {
  ActionIcon,
  Box,
  Center,
  Dialog,
  Divider,
  FileInput,
  Group,
  MultiSelect,
  Popover,
  Stack,
  TagsInput,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { FaPaperclip } from "react-icons/fa6";
import { MdArrowDropDown, MdOutlineFileUpload } from "react-icons/md";
import { TbHelpSmall, TbHelpSquareFilled } from "react-icons/tb";
import { services } from "../../public/data/services";
import classes from "./styles/signup.module.css";

export default function BrandInfo(props) {
  const { form } = props;
  const [fileUploadInfo, setFileUploadInfo] = useState(false);
  const [relevantSitesInfo, setRelevantSitesInfo] = useState(false);

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

  const handleWebsites = (newValue) => {
    const isValid = newValue.every((v) => v.match(/[.][a-zA-Z]+$/));
    if (isValid) {
      form.setFieldValue("relatedURLs", {
        value: newValue,
        isValid: true,
        invaidValue: "",
      });
    } else {
      form.setFieldValue("relatedURLs", {
        isValid: false,
        invaidValue: newValue,
      });
    }
  };

  return (
    <>
      <Stack className={classes.formStack} gap={20}>
        <Box className="altPanel">
          <Text
            className={classes.infoNotice}
            fz={14}
            px={10}
            lh={1.25}
            ta={"justify"}
          >
            To align our goals effectively, we request any relevant information
            you have about your company. This information is invaluable in
            ensuring that our efforts are perfectly tailored to your unique
            vision and objectives. Your insights into your company&apos;s
            identity, values, and aspirations will guide us in creating
            strategies that genuinely reflect and enhance your brand&apos;s
            presence in the market.
          </Text>
        </Box>
        <Textarea
          {...form.getInputProps("companyDesc")}
          placeholder="Company Description..."
          minRows={6}
          autosize
        />
        <Textarea
          {...form.getInputProps("goals")}
          placeholder="Goals related to our services..."
          minRows={4}
          autosize
        />
        <MultiSelect
          name="desiredServices"
          placeholder={
            form.values.desiredServices.length < 4
              ? "Most Desired Services..."
              : ""
          }
          data={convertedData}
          checkIconPosition="right"
          maxValues={5}
          rightSection={
            form.values.desiredServices.length > 0 ? (
              <Stack gap={0} align="center">
                <Title c={"cobaltblue.4"} fz={12}>
                  {form.values.desiredServices.length}
                </Title>
                <Divider w={15} color={"cobaltblue.4"} />
                <Title c={"cobaltblue.4"} fz={12}>
                  5
                </Title>
              </Stack>
            ) : (
              <MdArrowDropDown opacity={0.5} size={30} />
            )
          }
          value={form.values.desiredServices}
          onChange={(value) => form.setFieldValue("desiredServices", value)}
          classNames={{
            wrapper: "inputWrapper",
            input: `defaultInput ${classes.desiredServicesInput}`,
            option: classes.desiredServicesOption,
            pill: classes.desiredServicesPill,
          }}
        />
        <Popover
          position="bottom-start"
          opened={!form.values.relatedURLs.isValid}
          offset={{ mainAxis: 20, crossAxis: -123 }}
        >
          <Popover.Target>
            <TagsInput
              classNames={{
                wrapper: "inputWrapper",
                input: "defaultInput",
                pillsList: classes.tagsPillsList,
              }}
              placeholder={
                form.values.relatedURLs.value?.length < 5
                  ? "Relevant Websites..."
                  : ""
              }
              rightSection={
                form.values.relatedURLs.value?.length > 0 && (
                  <Stack gap={0} align="center">
                    <Title c={"cobaltblue.4"} fz={12}>
                      {form.values.relatedURLs.value?.length}
                    </Title>
                    <Divider w={15} color={"cobaltblue.4"} />
                    <Title c={"cobaltblue.4"} fz={12}>
                      6
                    </Title>
                  </Stack>
                )
              }
              onChange={handleWebsites}
              leftSectionWidth={50}
              leftSectionPointerEvents="all"
              maxTags={6}
              mah={50}
              styles={{
                inputField: {
                  display: "inline",
                  maxHeight:
                    form.values.relatedURLs.value?.length === 6 ? 0 : 50,
                },
                pill: {
                  justifyContent: "space-between",
                  minWidth: 75,
                  maxWidth: 75,
                },
              }}
              leftSection={
                <ActionIcon
                  variant="transparent"
                  color="#fff"
                  onClick={() => {
                    setRelevantSitesInfo(!relevantSitesInfo);
                    setFileUploadInfo(false);
                  }}
                >
                  <TbHelpSquareFilled size={30} />
                </ActionIcon>
              }
            />
          </Popover.Target>
          <Popover.Dropdown ta={"center"}>
            <Text fz={13} c={"#777"}>
              <Text component="span" fw={700}>
                &quot;
                {
                  form.values.relatedURLs.invaidValue[
                    form.values.relatedURLs.invaidValue.length - 1
                  ]
                }
                &quot;
              </Text>{" "}
              is not valid web address (e.g. .com, .net, .org)
            </Text>
          </Popover.Dropdown>
        </Popover>
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
                setRelevantSitesInfo(false);
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
        opened={fileUploadInfo || relevantSitesInfo}
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
          setRelevantSitesInfo(false);
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
