import { AppBar } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";

import styles from "./Header.module.css";
import { Box } from "@mui/system";

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 10);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const time = useMemo(() => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  }, [currentTime]);

  return (
    <AppBar position="static" color="primary" className={styles.container}>
      <div className={styles.marketName}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={styles.burger}
        >
          <MenuIcon />
        </IconButton>
        name
      </div>
      <Box className={styles.time}>{time}</Box>
      <Box className={styles.employeeName}>
        name asd Lorem
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={styles.ring}
        >
          <Badge badgeContent={3} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>
    </AppBar>
  );
};

export default Header;
