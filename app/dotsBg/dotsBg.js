"use client";
import classes from "./styles/dotsBg.module.css";

export default function DotsBg() {
  return (
    <div className={classes.scene}>
      <div className={classes.backdrop}></div>
      <div className={classes.noise}></div>
      <div className={classes.dots}></div>
      <div className={classes.canvas}></div>
    </div>
  );
}
