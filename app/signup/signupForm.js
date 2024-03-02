"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { auth, firestore } from "@libs/firebase";
import { useJoinForm } from "@libs/store";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFlagCheckered, FaPlay } from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa6";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import BrandInfo from "./brandInfo";
import ClientInfo from "./clientInfo";
import classes from "./styles/signup.module.css";

export default function SignupForm() {
  const router = useRouter();
  const { premiereSignup, paymentPanel, setPaymentPanel } = useJoinForm();
  const form = useForm({
    initialValues: {
      companyName: "",
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      desiredServices: [],
      companyDesc: "",
      goals: "",
      relatedURLs: {
        value: [],
        isValid: true,
        invalidValue: "",
      },
      companyFiles: [],
    },
    validate: {
      email: isEmail("Invalid email"),
    },
  });

  const addUser = async (user) => {
    await setDoc(doc(firestore, "users", user.email), {
      uid: user.uid,
      companyName: form.values.companyName,
      title: form.values.title,
      firstName: form.values.firstName,
      lastName: form.values.lastName,
      email: form.values.email,
      phone: form.values.phone,
      desiredServices: form.values.desiredServices,
      companyDesc: form.values.companyDesc,
      goals: form.values.goals,
      relatedURLs: form.values.relatedURLs,
      companyFiles: form.values.companyFiles,
    });
  };

  const handleSignup = () => {
    createUserWithEmailAndPassword(
      auth,
      form.values.email,
      form.values.password
    )
      .then((userCredential) => {
        addUser(userCredential.user)
          .then(() => {
            console.log("User added to database");
            router.push("/clientportal");
          })
          .catch((error) => {
            console.error("Error adding user to database: ", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
      });
  };

  const animation = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { animationTimingFunction: "ease-in-out", duration: 1 },
  };

  return (
    <>
      <Box className={`panel lightShadow ${classes.formPanel}`} p={"xl"}>
        <Box pos={"absolute"} top={0} right={0}>
          {paymentPanel === 0 && (
            <motion.div {...animation}>
              <DotLottiePlayer
                className={classes.subLottieIcon}
                src={"/img/signup/subscribe.json"}
                autoplay
                loop
                speed={0.4}
              />
            </motion.div>
          )}
          {paymentPanel === 1 && (
            <motion.div {...animation}>
              <DotLottiePlayer
                className={classes.fingerprintLlottieIcon}
                src={"/img/signup/clientDetails.json"}
                autoplay
                loop={2}
                speed={0.75}
              />
            </motion.div>
          )}
          {paymentPanel === 2 && (
            <motion.div {...animation}>
              <DotLottiePlayer
                className={classes.detailsLottieIcon}
                src={"/img/signup/addDetails.json"}
                autoplay
                loop={5}
                speed={0.75}
              />
            </motion.div>
          )}
        </Box>
        <Group justify="space-between" mt={-5} mb={20}>
          <Group align="center" gap={10}>
            <Stack gap={0}>
              <Text className={classes.title} c="#fff">
                CRE8IVE 4MULA
              </Text>
              <Box className={classes.subtitle}>
                <Group gap={5}>
                  <Text c="#fff" fz={"inherit"} fw={700}>
                    {premiereSignup ? "Premiere" : "Pro"} Account
                  </Text>
                  <RiArrowRightDoubleFill opacity={0.25} />
                  <Text fz={12} opacity={0.5}>
                    {paymentPanel === 0 && "Purchase Subscription"}
                    {paymentPanel === 1 && "Account Details"}
                    {paymentPanel === 2 && "Company / Brand Details"}
                  </Text>
                </Group>
              </Box>
            </Stack>
          </Group>
        </Group>
        <form onSubmit={form.onSubmit(handleSignup)}>
          {paymentPanel === 0 && (
            <motion.div {...animation}>
              <Text>Stripe Payment Form</Text>
            </motion.div>
          )}
          {paymentPanel === 1 && (
            <motion.div {...animation}>
              <ClientInfo form={form} />
            </motion.div>
          )}
          {paymentPanel === 2 && (
            <motion.div {...animation}>
              <BrandInfo form={form} />
            </motion.div>
          )}
        </form>
      </Box>
      <Group justify="flex-end">
        {paymentPanel > 0 && (
          <Button
            className={`removeDetails ${classes.backBtn}`}
            size="md"
            onClick={() => setPaymentPanel(paymentPanel - 1)}
            leftSection={
              <FaPlay
                size={8}
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
          type={paymentPanel === 2 ? "submit" : "button"}
          component={paymentPanel === 2 ? Link : "button"}
          href={paymentPanel === 2 ? "/clientportal" : null}
          onClick={() => paymentPanel < 2 && setPaymentPanel(paymentPanel + 1)}
          rightSection={
            paymentPanel === 0 ? (
              <FaRegHandshake opacity={0.5} size={20} />
            ) : paymentPanel === 2 ? (
              <FaFlagCheckered size={15} />
            ) : (
              <FaPlay size={8} />
            )
          }
        >
          {paymentPanel === 0
            ? "Create Account"
            : paymentPanel === 2
              ? "Continue to Client Portal"
              : "Share Details"}
        </Button>
      </Group>
    </>
  );
}
