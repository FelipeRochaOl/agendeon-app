import { useState } from "react";
import { Container } from "./styles";

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string
  setValue: (value: string) => void
}

export const CheckboxService = (props: ICheckboxProps) => {
  const [checked, setChecked] = useState(false)

  const handleChecked = (value?: string) => {
    if (value) {
      props.setValue(value)
      setChecked(!checked)
    }
  }

  return (
    <Container onClick={() => handleChecked(props.value as string | undefined)} $checked={checked}>
      <input type="radio" {...props} defaultChecked={checked} />
      <span>{props.text}</span>
    </Container>
  )
}