/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';
import { Box } from '@chakra-ui/react';
import { StyledCalendar } from './styles';

interface Props {
  id?: string;
  name: string
}

const FormDatePicker = ({ id, name, ...props }: Props): JSX.Element => {
  const [field, meta, { setValue }] = useField({ ...props, name });

  return (
    <Box display="flex" alignItems="center">
      <StyledCalendar
        {...field}
        {...props}
        value={(field.value && new Date(field.value)) || null}
        onChange={(val: Date) => {
          setValue(val);
        }}
      />
    </Box>
  );
};

export default FormDatePicker;
