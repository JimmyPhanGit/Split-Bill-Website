import * as React from "react";
import { Input, Label } from "@fluentui/react-components";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "number" | "date" | "datetime-local" | "email" | "month" | "password" | "search" | "tel" | "text" | "time" | "url" | "week";
  required?: boolean;
}

const wrapperStyle: React.CSSProperties = {
  marginBottom: "1.5rem",
  width: "100%",
  maxWidth: "350px",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}) => (
  <div style={wrapperStyle}>
    {label && <Label required={required}>{label}</Label>}
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        width: "100%",
        background: "#f3f3f3", // Light gray background
        border: "1px solid #ccc", // Optional: subtle border
      }}
      />
  </div>
);

export default TextField;