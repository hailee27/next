import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { usePopUpContext } from '@/context/PopUpContext';
import { useCreateClassMutation } from '@/redux/endpoints/teacher';
import { createClassSchema } from '@/schema/teacher';
import { useNotificationContext } from '@/context/NotificationContext';

function CreateClass() {
  const { closePopUp } = usePopUpContext();
  const [createClass] = useCreateClassMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createClassSchema) });
  const { toggleAlert } = useNotificationContext();

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit((data) =>
        createClass(data)
          .unwrap()
          .then(() => closePopUp())
          .catch((error) => toggleAlert({ content: error?.data?.message, type: 'error' }))
      )}
    >
      <div className=" bg-white">
        <DialogTitle id="alert-dialog-title">Tạo lớp học mới!</DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              // <FormControlLabel control={<Checkbox color="primary" {...field} />} label="Is Teacher" />
              <TextField
                helperText={errors.name && 'Cần nhập tên'}
                id="standard-basic"
                label="Name"
                {...field}
                sx={{ width: '100%' }}
                variant="standard"
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              // <FormControlLabel control={<Checkbox color="primary" {...field} />} label="Is Teacher" />
              <TextField id="standard-basic" label="description" {...field} sx={{ width: '100%' }} variant="standard" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closePopUp()}>Hủy</Button>
          <Button autoFocus type="submit">
            Tạo
          </Button>
        </DialogActions>
        {/* <TextField id="standard-basic" label="Standard" sx={{ width: '100%' }} variant="standard" /> */}
      </div>
    </form>
  );
}

export default CreateClass;
