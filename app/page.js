import { Image } from "@mantine/core";
import Link from "next/link";
import Intro from "./intro/intro";

const LoginBtn = () => {
  return (
    <Image
      pos={"fixed"}
      top={10}
      right={10}
      component={Link}
      src={"/img/login.svg"}
      href={"/login"}
      alt="Login"
    />
  );
};

export default function Home() {
  return (
    <>
      <LoginBtn />
      <Intro />
    </>
  );
}
