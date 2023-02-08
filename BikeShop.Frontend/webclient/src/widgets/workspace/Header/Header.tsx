import React, {useEffect, useMemo, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import {AppBar, Grid, Typography} from '@mui/material';
import {useAuthUser} from "../../../entities";
import {HeaderUserMenu} from "../../../features";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {

    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const user = useAuthUser(s => s.user);

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
        <AppBar position="static" color="primary" sx={{p: '12px 25px'}}>

            <Grid container direction="row" alignItems="center">
                <Grid item alignItems="center" container direction="row" xs={4} sx={{display: 'flex'}}>

                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: '20px'}}>
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant="subtitle1" noWrap onClick={() => {
                        navigate('/mainpage')
                    }}>
                        Shop
                    </Typography>

                </Grid>

                <Grid item xs={4} alignItems="center" justifyContent="center" sx={{display: 'flex'}}>

                    <Typography variant="subtitle1" noWrap>
                        {time}
                    </Typography>

                </Grid>

                <Grid item xs={4} alignItems="center" justifyContent="center" sx={{display: 'flex'}}>

                    <Typography variant="subtitle1" noWrap sx={{mr: '20px'}}>
                        <HeaderUserMenu firstName={user?.firstName} lastName={user?.lastName}/>
                    </Typography>

                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Badge badgeContent={3} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>

                </Grid>
            </Grid>

        </AppBar>
    );
};

export default Header;
