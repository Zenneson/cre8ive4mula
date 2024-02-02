import {
  Center,
  Image,
  Indicator,
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import classes from "./styles/navbar.module.css";

const linkData = [
  { icon: "dashboard", label: "Dashbaord" },
  { icon: "submitTask", label: "Submit Task" },
  { icon: "taskArchive", label: "Task Archive" },
  { icon: "fileRepo", label: "File Repository" },
];

const NavbarLink = ({ icon, label, active, onClick }) => {
  return (
    <Tooltip label={label} position="right" openDelay={0} withArrow={false}>
      <Indicator
        size={active ? "8" : "5"}
        offset={active ? "2" : "17"}
        disabled={icon === "dashboard" ? false : true}
      >
        <UnstyledButton
          onClick={onClick}
          className={`${classes.link} ${active && classes.linkActive}`}
          data-active={active || undefined}
        >
          <Image
            src={`/img/menu/${icon}.svg`}
            style={{ width: rem(40), height: rem(40) }}
            alt={label}
          />
        </UnstyledButton>
      </Indicator>
    </Tooltip>
  );
};

export default function Navbar(props) {
  const router = useRouter();
  const { active, setActive } = props;
  const links = linkData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));
  return (
    <nav className={classes.navbar}>
      <Center>
        <Image
          className={classes.mainLogo}
          src="/img/svgLogo.svg"
          alt="Logo"
          onClick={() => router.push("/", { scroll: false })}
        />
      </Center>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
      <Stack justify="center" gap={0}>
        <NavbarLink
          icon={"settings"}
          onClick={() => setActive(4)}
          label="Account Settings"
        />
        <NavbarLink icon={"logout"} label="Logout" />
      </Stack>
    </nav>
  );
}
