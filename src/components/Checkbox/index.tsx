import { useState } from "react"
import { Container } from "./styles"

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const CheckboxService = (props: ICheckboxProps) => {
  const [checked, setChecked] = useState(false)

  const handleChecked = () => {
    setChecked(!checked)
  }

  return (
    <Container onClick={handleChecked} $checked={checked}>
      <input type="checkbox" {...props} checked onClick={handleChecked} />
      <span>{props.value}</span>
    </Container>
  )
}