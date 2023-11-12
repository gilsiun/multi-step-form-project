import React from "react"

interface RadioButtonProps extends React.HTMLProps<HTMLInputElement> {
  inputLabel: string
}

const RadioButton = ({ inputLabel, ...props }: RadioButtonProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input type="radio" style={{ margin: 0, marginRight: "0.5rem" }} {...props} />
      <label htmlFor={props.id} style={{ fontWeight: 600 }}>
        {inputLabel}
      </label>
    </div>
  )
}

export default RadioButton
