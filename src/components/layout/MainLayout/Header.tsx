/* eslint-disable max-lines-per-function */
import React from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MailIcon from '@mui/icons-material/Mail';

import { RootState } from '@/redux/store';
import { logout } from '@/redux/slices/auth.slice';
import { useNotificationContext } from '@/context/NotificationContext';

const pagesStudent = ['student', 'Pricing', 'Blog'];
const pagesTeacher = ['teacher', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
function Header() {
  const router = useRouter();
  const { student, teacher, accessToken } = useSelector((state: RootState) => state.auth);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { toggleAlert } = useNotificationContext();

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            component="a"
            href="/"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            variant="h6"
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="account of current user"
              color="inherit"
              onClick={handleOpenNavMenu}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              id="menu-appbar"
              keepMounted
              onClose={handleCloseNavMenu}
              open={Boolean(anchorElNav)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {student &&
                pagesStudent.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      router.push(`/${page}`);
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              {teacher &&
                pagesTeacher.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      router.push(`/${page}`);
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            component="a"
            href="#app-bar-with-responsive-menu"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            variant="h5"
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {student &&
              pagesStudent.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push(`/${page}`);
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            {teacher &&
              pagesTeacher.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push(`/${page}`);
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
          </Box>
          {accessToken ? (
            <Box sx={{ flexGrow: 0 }}>
              <div className="flex items-center space-x-5">
                <Tooltip title="Message">
                  <Badge
                    badgeContent={1}
                    className="cursor-pointer"
                    color="error"
                    component="div"
                    onClick={() => router.push('/message')}
                  >
                    <MailIcon />
                  </Badge>
                </Tooltip>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {teacher && (
                      <Avatar alt="Remy Sharp" src={teacher.avatar ?? ''}>
                        {!teacher.avatar && teacher.name.charAt(0)}
                      </Avatar>
                    )}
                    {student && (
                      <Avatar alt="Remy Sharp" src={student.avatar ?? ''}>
                        {!student.avatar && student.name.charAt(0)}
                      </Avatar>
                    )}
                  </IconButton>
                </Tooltip>
              </div>
              <Menu
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                id="menu-appbar"
                keepMounted
                onClose={handleCloseUserMenu}
                open={Boolean(anchorElUser)}
                sx={{ mt: '45px' }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting === 'Logout') {
                        router.push('/');
                        dispatch(logout());
                        toggleAlert({ content: 'Logged out' });
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <div
              className="cursor-pointer flex space-x-1"
              onClick={() => router.push('/auth/login')}
              onKeyPress={undefined}
              role="button"
              tabIndex={0}
            >
              <span className="font-semibold">Login</span>
              <LoginIcon />
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
