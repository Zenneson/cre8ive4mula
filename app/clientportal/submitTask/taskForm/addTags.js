"use client";
import { ActionIcon, Popover, TagsInput } from "@mantine/core";
import { shallowEqual, useSetState } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TbHelpSquareFilled } from "react-icons/tb";
import { usePortalState } from "../../portalStore";
import classes from "./styles/taskFrom.module.css";

export default function AddTags(props) {
  const { form, placeholder, mode, tabIndex, icon } = props;
  const { helpMode, setHelpMode, deliverInfo, setDeliverInfo } =
    usePortalState();
  const [styleKeywords, setStyleKeywords] = useState([]);
  const [deliveryFormats, setDeliveryFormats] = useState([]);
  const [websites, setWebsites] = useSetState({
    value: [],
    isValid: true,
    invalidValue: "",
  });

  const styleKeywordsRef = useRef(null);
  const deliveryFormatsRef = useRef(null);
  const websitesRef = useRef(null);

  const valueMode = (mode) => {
    let handler = {};
    if (mode === "styleKeywords") {
      handler.var = styleKeywords;
      handler.setter = setStyleKeywords;
      handler.ref = styleKeywordsRef;
      return handler;
    }
    if (mode === "deliveryFormats") {
      handler.var = deliveryFormats;
      handler.setter = setDeliveryFormats;
      handler.ref = deliveryFormatsRef;
      return handler;
    }
    if (mode === "websites") {
      handler.var = websites.value;
      handler.ref = websitesRef;
      handler.setter = (newValue) => {
        const isValid = newValue.every((v) =>
          v.match(
            /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
          )
        );
        if (isValid) {
          setWebsites({ value: newValue, isValid: true, invalidValue: "" });
        } else {
          setWebsites({ isValid: false, invalidValue: newValue });
        }
      };
      return handler;
    }
  };
  const { var: modeVar, setter: modeSetter, ref: modeRef } = valueMode(mode);

  const maxAllowed =
    mode === "deliveryFormats" ? 5 : mode === "websites" ? 7 : 10;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setTimeout(() => {
        modeRef.current?.focus();
      }, 100);
    }
  };

  const pillWidth = () => {
    if (mode === "styleKeywords") return 57.5;
    if (mode === "deliveryFormats") return 123;
    if (mode === "websites") return 85.5;
  };

  useEffect(() => {
    const equal = shallowEqual(modeVar, form.values[mode]);
    if (equal || modeVar.length === 0) return;
    form.setFieldValue(mode, modeVar);
  }, [mode, modeVar, form]);

  return (
    <Popover
      position="bottom"
      opened={modeRef.current?.focused}
      offset={{ crossAxis: -8, mainAxis: 20 }}
      width={371}
    >
      <Popover.Target>
        <TagsInput
          classNames={{
            wrapper: `inputWrapper ${classes.wrapperInput}`,
            input: `defaultInput ${classes.tagsInput}`,
            inputField: classes.tagsInputField,
            pillsList: classes.tagsPillsList,
          }}
          ref={modeRef}
          tabIndex={tabIndex}
          value={modeVar || form.values[mode]}
          onChange={modeSetter}
          placeholder={modeVar.length < maxAllowed - 2 ? placeholder : ""}
          mah={50}
          styles={{
            pill: {
              minWidth: pillWidth(),
              maxWidth: pillWidth(),
              justifyContent: "space-between",
            },
          }}
          onKeyDown={handleKeyDown}
          rightSectionPointerEvents="all"
          rightSection={
            <ActionIcon w={40} mr={10} className={"actionBtn actionBtnDimmed"}>
              <FaPlus size={12} />
            </ActionIcon>
          }
          maxTags={maxAllowed}
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
        />
      </Popover.Target>
      <Popover.Dropdown with ta={"center"}>
        Huh
      </Popover.Dropdown>
    </Popover>
  );
}
