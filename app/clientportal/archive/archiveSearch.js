import { ActionIcon, Combobox, TextInput, useCombobox } from "@mantine/core";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

const MOCKDATA = [
  "Changing Page Content",
  "Revamp Homepage Design for Enhanced User Engagement and the the a Conversion",
  "Changing Page Content",
];

function getAsyncData(searchQuery, signal) {
  return new Promise((resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(new Error("Request aborted"));
    });

    setTimeout(() => {
      resolve(
        MOCKDATA.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5)
      );
    }, Math.random() * 1000);
  });
}

export default function ArchiveSearch() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(false);
  const abortController = useRef();

  const fetchOptions = (query) => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    setLoading(true);

    getAsyncData(query, abortController.current.signal)
      .then((result) => {
        setData(result);
        setLoading(false);
        setEmpty(result.length === 0);
        abortController.current = undefined;
      })
      .catch(() => {});
  };

  const options = (data || []).map((item) => (
    <Combobox.Option fz={11} value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
      w={500}
    >
      <Combobox.Target>
        <TextInput
          placeholder="Search Tasks..."
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            fetchOptions(event.currentTarget.value);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            combobox.openDropdown();
            if (data === null) {
              fetchOptions(value);
            }
          }}
          onBlur={() => combobox.closeDropdown()}
          rightSectionWidth={40}
          rightSectionPointerEvents="all"
          rightSection={
            <ActionIcon
              size={"lg"}
              mr={10}
              className="actionBtn actionBtnDimmed"
            >
              <FaSearch />
            </ActionIcon>
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown className="selectDropdown" hidden={data === null}>
        <Combobox.Options>
          {options}
          {empty && <Combobox.Empty>No results found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
