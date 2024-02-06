import {
  CloseButton,
  Combobox,
  InputBase,
  Text,
  useCombobox,
} from "@mantine/core";
import { useState } from "react";
import classes from "./styles/serviceSelect.module.css";

export default function ServiceSelect(props) {
  const { services } = props;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState(services);
  const [value, setValue] = useState(null);
  const [search, setSearch] = useState("");

  console.log("🚀 ~ SelectCreatable ~ value:", value);

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
      );

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      w={245}
      store={combobox}
      withinPortal={false}
      classNames={{
        dropdown: classes.selectDropdown,
        options: classes.options,
        option: classes.selectOption,
      }}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          setData((current) => [...current, search]);
          setValue(search);
        } else {
          setValue(val);
          setSearch(val);
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || "");
          }}
          placeholder="Choose Service..."
          rightSectionPointerEvents={value === null ? "none" : "all"}
          rightSection={
            value !== null ? (
              <CloseButton
                size="sm"
                variant="transparent"
                onMouseDown={(event) => event.preventDefault()}
                aria-label="Clear search"
                onClick={() => {
                  setValue(null);
                  setSearch("");
                }}
              />
            ) : (
              <Combobox.Chevron />
            )
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">
              <Text component="span" fw={700} fz={15} opacity={0.2}>
                &#9205; SELECT:
              </Text>
              &quot;{search}&quot;
            </Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
