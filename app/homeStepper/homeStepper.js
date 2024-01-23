"use client";
import { Button, Group, Stepper } from "@mantine/core";
import Link from "next/link";

export default function HomeStepper(porps) {
  const { isUp, active, setActive, nextStep, prevStep } = porps;

  return (
    <>
      <Stepper
        orientation="vertical"
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account{" "}
          <Button component={Link} href={"/blank"}>
            Blank Page
          </Button>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
