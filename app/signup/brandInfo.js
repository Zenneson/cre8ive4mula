"use client";
import ListInput from "@libs/listInput/listInput";
import {
  ActionIcon,
  Box,
  Center,
  Dialog,
  Divider,
  FileInput,
  Group,
  MultiSelect,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiChevronsDown } from "react-icons/fi";
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
    const isValid = newValue.every((v) =>
      v.match(
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
      )
    );
    if (isValid) {
      form.setFieldValue("relatedURLs", {
        value: newValue,
        isValid: true,
        invalidValue: "",
      });
    } else {
      form.setFieldValue("relatedURLs", {
        isValid: false,
        invalidValue: newValue,
      });
    }
  };

  return (
    <>
      <Stack gap={20}>
        <Textarea
          {...form.getInputProps("companyDesc")}
          placeholder="Company Description..."
          minRows={4}
          autosize
        />
        <Textarea
          {...form.getInputProps("goals")}
          placeholder="Goals related to our services..."
          minRows={4}
          autosize
        />
        <Divider opacity={0.2} />
        <MultiSelect
          classNames={{
            wrapper: "inputWrapper",
            input: `defaultInput ${classes.desiredServicesInput}`,
            option: classes.desiredServicesOption,
            pill: classes.desiredServicesPill,
            dropdown: "selectDropdown",
          }}
          name="desiredServices"
          placeholder={
            form.values.desiredServices.length < 4
              ? "Most Desired Services..."
              : ""
          }
          data={convertedData}
          checkIconPosition="right"
          maxValues={5}
          rightSectionWidth={40}
          rightSection={
            form.values.desiredServices.length > 0 ? (
              <Stack gap={0} align="center">
                <Title c={"gray.6"} fz={12}>
                  {form.values.desiredServices.length}
                </Title>
                <Divider w={15} color={"gray.6"} />
                <Title c={"gray.6"} fz={12}>
                  5
                </Title>
              </Stack>
            ) : (
              <ActionIcon
                w={40}
                mr={10}
                className={"actionBtn actionBtnDimmed"}
              >
                <FiChevronsDown size={15} />
              </ActionIcon>
            )
          }
          value={form.values.desiredServices}
          onChange={(value) => form.setFieldValue("desiredServices", value)}
        />
        <Group grow gap={20}>
          <ListInput placeholder={"Relevant Websites..."} />
          <FileInput
            {...form.getInputProps("companyFiles")}
            name="Upload files"
            placeholder="Upload Files..."
            multiple
            leftSectionWidth={50}
            leftSectionPointerEvents="all"
            leftSection={
              <ActionIcon
                className={"actionBtnDimmed"}
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
                w={40}
                mr={10}
                className={"actionBtn actionBtnDimmed"}
              >
                <FaPlus size={12} />
              </ActionIcon>
            }
          />
        </Group>
        <Box>
          <Text
            className={classes.infoNotice}
            fz={14}
            pl={15}
            pr={5}
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
