import {
  ActionIcon,
  CloseButton,
  Combobox,
  InputBase,
  Text,
  useCombobox,
} from "@mantine/core";
import { shallowEqual } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { FiChevronsDown } from "react-icons/fi";
import { useSubissionData } from "../../portalStore";
import classes from "./styles/serviceSelect.module.css";

export default function ServiceSelect(props) {
  const { form, typeServices, tabIndex, value, setValue, search, setSearch } =
    props;
  const { formData, setFormData } = useSubissionData();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    if (typeServices && typeServices.length > 0 && data.length === 0) {
      setData(typeServices);
    }
  }, [typeServices, data]);

  useEffect(() => {
    if (!shallowEqual(form.values.service, value)) {
      form.setFieldValue("service", value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, form.values.service]);

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
      p={0}
      classNames={{
        dropdown: "selectDropdown",
        options: classes.selectOptions,
        option: classes.selectOption,
      }}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          setData((current) => [...current, search]);
          setValue(search);
          setFormData({ ...formData, service: search });
        } else {
          setValue(val);
          setSearch(val);
          setFormData({ ...formData, service: val });
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          {...form.getInputProps("service")}
          value={search || ""}
          tabIndex={tabIndex}
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
          rightSectionWidth={35}
          rightSection={
            search !== "" ? (
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
              <ActionIcon
                w={40}
                mr={10}
                className={"actionBtn actionBtnDimmed"}
              >
                <FiChevronsDown size={15} />
              </ActionIcon>
            )
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">
              <Text component="span" fw={100} fz={13} opacity={0.8}>
                + Request to add:
              </Text>
              &quot;{search}&quot;
            </Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
