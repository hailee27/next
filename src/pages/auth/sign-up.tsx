import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';

import signUpSchema from '@/schema/signUp';
import { useNotificationContext } from '@/context/NotificationContext';
import { useSignUpStudentMutation } from '@/redux/endpoints/auth';

function SignUpPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const router = useRouter();
  const { toggleAlert } = useNotificationContext();
  const [signUp] = useSignUpStudentMutation();

  return (
    <Container component="main" maxWidth="xs">
      <div className="flex flex-col items-center pt-[64px]">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <SensorOccupiedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit((data) =>
            signUp(data)
              .unwrap()
              .then((value) => {
                router.push('/auth/login');
                toggleAlert({ content: value.message });
              })
              .catch((error) => toggleAlert({ content: error.message[0], type: 'error' }))
          )}
        >
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                fullWidth
                helperText={errors.email?.message}
                label="Email Address"
                margin="normal"
                required
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                error={!!errors.password}
                fullWidth
                helperText={errors.password?.message}
                label="Password"
                margin="normal"
                required
                type="password"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                error={!!errors.name}
                fullWidth
                helperText={errors.name?.message}
                label="Name"
                margin="normal"
                required
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            defaultValue="FEMALE"
            name="gender"
            render={({ field }) => (
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row {...field}>
                  <FormControlLabel control={<Radio />} label="Female" value="FEMALE" />
                  <FormControlLabel control={<Radio />} label="Male" value="MALE" />
                  <FormControlLabel control={<Radio />} label="Other" value="OTHER" />
                </RadioGroup>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <TextField
                error={!!errors.address}
                fullWidth
                helperText={errors.address?.message}
                label="Address"
                margin="normal"
                required
                {...field}
              />
            )}
          />
          <Button fullWidth sx={{ mt: 3, mb: 2 }} type="submit" variant="contained">
            Sign Up
          </Button>
        </form>
        <Link className="text-sky-600 text-[14px] underline" href="/auth/login">
          Have an account? Sign In
        </Link>
      </div>
    </Container>
  );
}

export default SignUpPage;
