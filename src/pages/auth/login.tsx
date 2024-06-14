/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { setAuth, setStudent, setTeacher } from '@/redux/slices/auth.slice';
import { useNotificationContext } from '@/context/NotificationContext';
import signInSchema from '@/schema/signIn';
import { useLoginTeacherMutation } from '@/redux/endpoints/auth';
import { Grid } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography align="center" color="text.secondary" variant="body2" {...props}>
      {'Copyright © '}
      <Link className="text-sky-600" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const router = useRouter();
  const [login] = useLoginTeacherMutation();
  const dispatch = useDispatch();
  const { toggleAlert } = useNotificationContext();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit((data) =>
            login({ email: data.email, password: data.password, role: data.isTeacher ? 'teacher' : 'student' })
              .unwrap()
              .then((value) => {
                if (value.result.teacher) {
                  router.push('/teacher/class');
                  dispatch(setTeacher(value.result.teacher));
                }
                if (value.result.student) {
                  router.push('/student/class');
                  dispatch(setStudent(value.result.student));
                }
                // toggleAlert({ content: value.message, type: 'success' });
                dispatch(
                  setAuth({
                    accessToken: value.result.token.accessToken,
                    refreshToken: value.result.token.refreshToken,
                  })
                );
              })
              .catch((error) => toggleAlert({ content: error?.data?.message, type: 'error' }))
          )}
          sx={{ mt: 1 }}
          width="100%"
        >
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                autoComplete="email"
                autoFocus
                fullWidth
                label="Email Address"
                margin="normal"
                required
                {...field}
              />
            )}
          />
          {errors.email && <p className="text-red-500 text-[12px]">*{errors.email?.message}</p>}
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                autoComplete="current-password"
                fullWidth
                label="Password"
                margin="normal"
                required
                type="password"
                {...field}
              />
            )}
          />
          {errors.password && <p className="text-red-500 text-[12px]">*{errors.password?.message}</p>}
          <Controller
            control={control}
            name="isTeacher"
            render={({ field }) => (
              <FormControlLabel control={<Checkbox color="primary" {...field} />} label="Is Teacher" />
            )}
          />

          <Button fullWidth sx={{ mt: 3, mb: 2 }} type="submit" variant="contained">
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className="text-sky-600 text-[14px] underline" href="#">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className="text-sky-600 text-[14px] underline" href="/auth/sign-up">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default LoginPage;
