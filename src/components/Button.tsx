import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) => {
  const baseStyle: React.CSSProperties = {
    border: "none",
    borderRadius: "6px",
    padding: "0.7rem 1.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s",
    marginRight: "0.5rem",
  };

  const primaryStyle: React.CSSProperties = {
    background: "#2563eb",
    color: "#fff",
  };

  const secondaryStyle: React.CSSProperties = {
    background: "#fff",
    color: "#222",
    border: "1px solid #222",
  };

  const style =
    variant === "primary"
      ? { ...baseStyle, ...primaryStyle }
      : { ...baseStyle, ...secondaryStyle };

  return (
    <button type={type} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;