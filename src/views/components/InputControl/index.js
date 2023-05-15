import { useController } from "react-hook-form";

import {
  FormGroup,
  Input,
  FormText,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const InputControl = (props) => {
  const {
    label,
    placeholder,
    type,
    name,
    control,
    helperText,
    FormFeedback,
    icon,
  } = props;

  const {
    field: { onChange, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
  });

  return (
    <FormGroup>
      {label && <Label>{label}</Label>}
      <InputGroup className="input-group-alternative">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className={`ni ${icon}`} />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          value={value}
          ref={ref}
        />
      </InputGroup>
      {helperText && <FormText>{helperText}</FormText>}
      {error && error[name] && (
        <FormFeedback invalid>{error[name]?.message}</FormFeedback>
      )}
    </FormGroup>
  );
};

export default InputControl;
