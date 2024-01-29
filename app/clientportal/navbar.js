import {
  Center,
  Image,
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
} from "@mantine/core";
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
    </Tooltip>
  );
};

export default function Navbar(props) {
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
          src="/img/svgLogo.svg"
          style={{ width: rem(70), height: rem(70) }}
          opacity={0.25}
          alt="Logo"
        />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={"settings"} label="Account Settings" />
        <NavbarLink icon={"logout"} label="Logout" />
      </Stack>
    </nav>
  );
}
