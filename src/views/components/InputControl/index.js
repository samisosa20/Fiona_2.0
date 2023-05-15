import { Controller } from 'react-hook-form';

import {
  FormGroup,
  Input,
  FormText,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

const InputControl = (props) => {
  const {
    label,
    placeholder,
    type,
    name,
    control,
    errors,
    helperText,
    icon,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormGroup>
          {label && <Label>{label}</Label>}
          <InputGroup className='input-group-alternative'>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className={`ni ${icon}`} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder={placeholder}
              type={type}
              onChange={onChange}
              value={value}
              
            />
          </InputGroup>
          {helperText && <FormText>{helperText}</FormText>}
          {errors && errors[name] && (
            <p className="text-danger form-text small">{errors[name]?.message}</p>
          )}
        </FormGroup>
      )}
    />
  );
};

export default InputControl;
