"use client";
import { ActionIcon, Input, Popover } from "@mantine/core";
import {
  shallowEqual,
  useClickOutside,
  useFocusWithin,
  useSetState,
} from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TbHelpSquareFilled } from "react-icons/tb";
import { usePortalState } from "../../portalStore";
import classes from "./styles/taskFrom.module.css";

export default function AddTags(props) {
  const { form, placeholder, mode, tabIndex } = props;
  const { helpMode, setHelpMode, deliverInfo, setDeliverInfo } =
    usePortalState();

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
      // TODO: Add to the list of on Enter
    }
  };

  useEffect(() => {
    const equal = shallowEqual(modeVar, form.values[mode]);
    if (equal || modeVar.length === 0) return;
    form.setFieldValue(mode, modeVar);
  }, [mode, modeVar, form]);

  return (
    <Popover
      opened={focused || hoveringPopover}
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
            value={modeVar || form.values[mode]}
            onChange={modeSetter}
            mah={50}
            onKeyDown={handleKeyDown}
            placeholder={modeVar.length < maxAllowed - 2 ? placeholder : ""}
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
        Huh
      </Popover.Dropdown>
    </Popover>
  );
}
