import React from "react";
import { Container } from "./styles";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "yellow" | "green";
}

export const Button = (props: IButtonProps) => {
  return (
    <Container $color={props.color ?? 'yellow'} {...props}>{props.children}</Container>
  );
}