import { Container } from "./styles";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const Button = (props: IButtonProps) => {
  return (
    <Container>{props.children}</Container>
  );
}