import { ActionIcon, Input, Popover, Text } from "@mantine/core";
import { FaPlus } from "react-icons/fa";
import { TbHelpSquareFilled } from "react-icons/tb";

export default function ListInput(props) {
  const { placeholder } = props;

  return (
    <Popover width="target" position="top" shadow="md">
      <Popover.Target>
        <Input
          placeholder={placeholder}
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
          rightSectionWidth={40}
          rightSection={
            <ActionIcon w={40} mr={10} className={"actionBtn actionBtnDimmed"}>
              <FaPlus size={15} />
            </ActionIcon>
          }
        />
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">
          This is uncontrolled popover, it is opened when button is clicked
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
