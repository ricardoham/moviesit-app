import React from 'react';
import { useField } from 'formik';
import { Box } from '@chakra-ui/react';
import Label from '../Label';
import { ErrorMessage } from './styles';

interface Props {
  name: string;
  label?: string;
  id?: string;
  children: JSX.Element;
}

const Field = ({
  id, name, label, children, ...props
}: Props): JSX.Element => {
  const [field, meta] = useField({ ...props, name });
  return (
    <Box m={3}>
      {label && <Label id={id} name={name} label={label} />}
      {children
        && React.cloneElement(children, {
          ...children.props,
          ...field,
        })}
      {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
    </Box>
  );
};

export default Field;
