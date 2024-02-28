"use client";
import { auth } from "@libs/firebase";
import { useJoinForm } from "@libs/store";
import { Box, Button, Group, Text, Transition } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa6";
import BrandInfo from "./brandInfo";
import ClientInfo from "./clientInfo";
import classes from "./styles/signup.module.css";

export default function SignupForm() {
  const [clinetInfoAdded, setClientInfoAdded] = useState(false);
  const { clientInfo, setClientInfo } = useJoinForm();
  const form = useForm({
    initialValues: {
      companyName: "",
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      desiredService: "",
      companyDesc: "",
      goals: "",
      relatedURLs: [],
      companyFiles: [],
    },
    validate: {
      email: isEmail("Invalid email"),
    },
  });

  const addUser = async (user) => {
    await setDoc(doc(firestore, "users", user.email), {
      firstName: form.values.firstName,
      lastName: form.values.lastName,
      email: form.values.email,
      uid: user.uid,
    });
  };

  const handleLogin = () => {
    createUserWithEmailAndPassword(
      auth,
      form.values.email,
      form.values.password
    )
      .then((userCredential) => {
        addUser(userCredential.user)
          .then(() => {
            setInfoAdded(true);
            setPopoverOpened(false);
          })
          .catch((error) => {
            console.error("Error adding user to database: ", error);
          });
      })
      .catch((error) => {
        showError(
          error,
          emailInvalid(form),
          alreadyExists(form),
          "auth/invalid-email",
          "auth/email-already-in-use"
        );
      });
  };

  return (
    <>
      <Box
        className="panel lightShadow"
        p={"xl"}
        w={"100%"}
        maw={1000}
        miw={650}
      >
        <Text className={classes.title} c="#fff">
          CRE8IVE 4MULA
        </Text>
        <Text className={classes.subtitle}>
          <Text component="span" c="#fff" fz={"inherit"} fw={700} mr={5}>
            {/* TODO Add logic to swithc account sign - up type  */}
            Pro Account
          </Text>
          | Sign - Up
        </Text>
        <form onSubmit={form.onSubmit(setClientInfo)}>
          {!clinetInfoAdded && <ClientInfo form={form} />}
          <Transition
            mounted={clinetInfoAdded}
            transition="fade"
            duration={500}
            exitDuration={0}
            timingFunction="ease-in-out"
          >
            {(styles) => (
              <div style={styles}>
                <BrandInfo form={form} />
              </div>
            )}
          </Transition>
        </form>
      </Box>
      <Box hidden={clinetInfoAdded} className="panel lightShadow" p={"xl"}>
        Stripe Payment Form
      </Box>
      <Group justify="flex-end">
        {clinetInfoAdded && (
          <Button
            className={`removeDetails ${classes.backBtn}`}
            size="md"
            onClick={() => setClientInfoAdded(false)}
            leftSection={
              <FaPlay
                size={10}
                style={{
                  transform: "rotate(180deg)",
                }}
              />
            }
          >
            Back
          </Button>
        )}
        <Button
          className={`removeDetails ${classes.submitBtn}`}
          type={clinetInfoAdded ? "submit" : "button"}
          component={!clinetInfoAdded ? "button" : Link}
          href={!clinetInfoAdded ? null : "/clientportal"}
          onClick={() => {
            if (!clinetInfoAdded) {
              setClientInfoAdded(true);
            } else {
              setClientInfo(form.values);
            }
          }}
          rightSection={
            !clinetInfoAdded ? (
              <FaRegHandshake opacity={0.5} size={20} />
            ) : (
              <FaPlay size={10} />
            )
          }
        >
          {!clinetInfoAdded ? "Subscribe" : "Continue to Client Portal"}
        </Button>
      </Group>
    </>
  );
}
