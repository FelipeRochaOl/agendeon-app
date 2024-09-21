import { Container } from "./styles";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  color?: "yellow" | "green";
}

export const Button = (props: IButtonProps) => {
  return (
    <Container $color={props.color ?? 'yellow'}>{props.children}</Container>
  );
}