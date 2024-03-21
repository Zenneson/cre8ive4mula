"use client";
import {
  ActionIcon,
  Divider,
  Group,
  Input,
  Popover,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  shallowEqual,
  useClickOutside,
  useFocusWithin,
  useSetState,
} from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { FaCut, FaPlus } from "react-icons/fa";
import { TbHelpSquareFilled } from "react-icons/tb";
import { usePortalState } from "../../portalStore";
import classes from "./styles/taskFrom.module.css";

export default function AddTags(props) {
  const { form, placeholder, mode, tabIndex } = props;
  const { helpMode, setHelpMode, deliverInfo, setDeliverInfo } =
    usePortalState();

  const [inputValue, setInputValue] = useState("");
  const [styleKeywords, setStyleKeywords] = useState([]);
  const [deliveryFormats, setDeliveryFormats] = useState([]);
  const [websites, setWebsites] = useSetState({
    value: [],
    isValid: true,
    invalidValue: "",
  });

  const { ref, focused } = useFocusWithin();
  const popoverDropdownRef = useClickOutside(() => setHoveringPopover(false));
  const [hoveringPopover, setHoveringPopover] = useState(false);

  const styleKeywordsRef = useRef(null);
  const deliveryFormatsRef = useRef(null);
  const websitesRef = useRef(null);

  const valueMode = (mode) => {
    let handler = {};
    if (mode === "styleKeywords") {
      handler.var = styleKeywords;
      handler.ref = styleKeywordsRef;
      return handler;
    }
    if (mode === "deliveryFormats") {
      handler.var = deliveryFormats;
      handler.ref = deliveryFormatsRef;
      return handler;
    }
    if (mode === "websites") {
      handler.var = websites.value;
      handler.ref = websitesRef;
      return handler;
    }
  };
  const { var: modeVar, ref: modeRef } = valueMode(mode);

  const handleList = () => {
    tagsList.insertListItem("tags", inputValue);
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleList();
    }
  };

  useEffect(() => {
    const equal = shallowEqual(modeVar, form.values[mode]);
    if (equal || modeVar.length === 0) return;
    form.setFieldValue(mode, modeVar);
  }, [mode, modeVar, form]);

  const tagsList = useForm({
    initialValues: {
      tags: [],
    },
  });

  const tags = tagsList.values.tags.map((tag, index) => (
    <Group justify="space-between" key={index}>
      <Group gap={7}>
        <Text opacity={0.25} fw={700} fz={14}>
          {index + 1}
          {" )"}
        </Text>
        <Text fz={14}>{tag}</Text>
      </Group>
      <ActionIcon
        className={classes.deleteBtn}
        onClick={() => tagsList.removeListItem("tags", index)}
        variant="transparent"
        mr={-8}
        color="red"
      >
        <FaCut size={12} />
      </ActionIcon>
    </Group>
  ));

  return (
    <Popover
      opened={(focused || hoveringPopover) && tagsList.values.tags.length > 0}
      position="top"
      width={"target"}
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <Input.Wrapper ref={ref}>
          <Input
            ref={modeRef}
            className="inputWrapper"
            tabIndex={tabIndex}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            mah={50}
            onKeyDown={handleKeyDown}
            placeholder={placeholder + "..."}
            leftSectionWidth={50}
            leftSectionPointerEvents="all"
            leftSection={
              <ActionIcon
                className={"actionBtnDimmed"}
                variant="transparent"
                color="#777"
                onClick={() => {
                  if (helpMode !== mode || !deliverInfo) {
                    setHelpMode(mode);
                    setDeliverInfo(true);
                  } else {
                    setDeliverInfo(!deliverInfo);
                    if (deliverInfo) {
                      setTimeout(() => {
                        setHelpMode("");
                      }, 300);
                    }
                  }
                }}
              >
                <TbHelpSquareFilled className={classes.tagsInput} size={30} />
              </ActionIcon>
            }
            rightSectionPointerEvents="all"
            rightSection={
              <ActionIcon
                className={"actionBtn actionBtnDimmed"}
                w={40}
                mr={10}
                onClick={handleList}
              >
                <FaPlus size={12} />
              </ActionIcon>
            }
          />
        </Input.Wrapper>
      </Popover.Target>
      <Popover.Dropdown
        ref={popoverDropdownRef}
        className="selectDropdown"
        onMouseEnter={() => setHoveringPopover(true)}
      >
        <Divider
          color="gray.4"
          labelPosition="right"
          label={
            <Text tt={"uppercase"} c="gray.4" fw={700} fz={12}>
              {"// " + placeholder}
            </Text>
          }
        />
        {tags}
      </Popover.Dropdown>
    </Popover>
  );
}
