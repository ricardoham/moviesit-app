import React from 'react';
import { useField } from 'formik';
import Label from '../Label';
import { ErrorMessage } from './styles';

interface Props {
  name: string;
  label?: string;
  id?: string;
  children: JSX.Element;
}

const CustomFormikField = ({
  id, name, label, children, ...props
}: Props): JSX.Element => {
  const [field, meta] = useField({ ...props, name });
  console.log('META_--', field);
  return (
    <>
      {label && <Label id={id} name={name} label={label} />}
      {children
        && React.cloneElement(children, {
          ...children.props,
          ...field,
        })}
      {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
    </>
  );
};

export default CustomFormikField;
