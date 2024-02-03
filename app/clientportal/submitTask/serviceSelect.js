import { Select } from "@mantine/core";
import classes from "./styles/taskFrom.module.css";

export default function ServiceSelect(props) {
  const { service, choosenService, setChoosenService } = props;

  return (
    <Select
      placeholder="Project Type..."
      clearable
      searchable
      w={245}
      data={service}
      value={choosenService}
      onChange={setChoosenService}
      checkIconPosition="right"
      classNames={{
        dropdown: classes.selectDropdown,
        option: classes.selectOption,
        options: classes.options,
      }}
      comboboxProps={{
        position: "bottom",
        offset: 13,
      }}
    />
  );
}
