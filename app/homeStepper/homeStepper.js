"use client";
import { Button, Stepper } from "@mantine/core";
import Link from "next/link";

export default function HomeStepper(porps) {
  const { active, setActive } = porps;

  return (
    <>
      <Stepper
        orientation="vertical"
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Company Intro" description="Brief explanation">
          Step 1 content: Create an account{" "}
          <Button component={Link} href={"/blank"}>
            Blank Page
          </Button>
        </Stepper.Step>
        <Stepper.Step
          label="List of Services and Features"
          description="In depth explantation"
        >
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Recent Work" description="List of recent work...">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Step label="Plans" description="Price and Package Breakdown">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Step
          label="Contact Information"
          description="Contact Information"
        >
          Step 3 content: Get full access
        </Stepper.Step>
      </Stepper>
    </>
  );
}
