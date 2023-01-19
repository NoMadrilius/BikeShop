import { AppBar, Typography } from "@mui/material";
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
    <AppBar
      position="static"
      color="primary"
      className={styles.container}
    >
      <Box component="div" className={styles.marketName} sx={{margin: '0 5px'}}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={styles.burger}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="subtitle1">market's name</Typography>
      </Box>
      <Typography variant="subtitle1" className={styles.time} sx={{margin: '0 5px'}}>
        {time}
      </Typography>
      <Box component='div' className={styles.employeeName} sx={{margin: '0 5px'}}>
        <Typography variant="subtitle1">employee's name</Typography>
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
