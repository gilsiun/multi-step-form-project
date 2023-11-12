import classNames from "classnames"
import React, { ReactNode, useEffect, useState } from "react"
import RadioButton from "./radio_button"
import { Data } from "@/type"

interface LabeledInputProps {
  label: string
  updateData: (fields: Partial<Data>) => void
  currentvalue?: string | number
  requiretext?: string
  needcheck?: boolean
  validator?: () => string
  postvalidation?: (value: string) => void
  children: ReactNode
}

export const LabeledInput = ({
  label,
  updateData,
  currentvalue,
  requiretext,
  needcheck,
  validator,
  postvalidation,
  children,
}: LabeledInputProps) => {
  const [errorText, setErrorText] = useState("")

  const doValidate = () => {
    if (requiretext && !currentvalue) {
      setErrorText(requiretext)
      return false
    }
    if (validator) {
      const result = validator()

      if (result.length) {
        setErrorText(result)
        return false
      }

      setErrorText("")
      return true
    }
  }

  useEffect(() => {
    if (needcheck) {
      if (doValidate()) {
        postvalidation?.(currentvalue?.toString() || "")
      }
    }
  }, [needcheck])

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    updateData({ [e.target.name]: e.target.value })
    if (doValidate()) postvalidation?.(e.target.value)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }} onBlur={handleBlur}>
      <div style={{ marginBottom: ".5rem" }}>
        <label className={classNames({ required: !!requiretext })}>{label}</label>
        <span style={{ display: requiretext ? "inline-block" : "none", fontSize: "0.8rem", marginLeft: "0.2rem" }}>
          (required)
        </span>
      </div>
      {children}
      <span
        style={{
          height: "0.8rem",
          marginTop: "0.4rem",
          color: "red",
          fontSize: "0.8rem",
          fontWeight: "600",
        }}
      >
        {errorText}
      </span>
    </div>
  )
}

type OmittedLabeledInputProps = Omit<LabeledInputProps, "children">
type LabeledInputTextProps = Omit<OmittedLabeledInputProps, "currentvalue"> &
  Omit<React.HTMLProps<HTMLInputElement>, "required">

export const LabeledInputText = ({ ...props }: LabeledInputTextProps) => {
  const [value, setValue] = useState<string>(props.defaultValue as string)

  return (
    <LabeledInput currentvalue={value} {...props}>
      <input
        type="text"
        style={{
          height: "3rem",
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "0.8rem",
        }}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </LabeledInput>
  )
}

type LabeledInputNumberProps = LabeledInputTextProps

export const LabeledInputNumber = ({ needcheck, postvalidation, ...props }: LabeledInputNumberProps) => {
  const [value, setValue] = useState(props.defaultValue?.toString() || "")

  const validateNumber = () => {
    if (value.match("[^$.\\d]") !== null) return "Please enter a number only"
    if (value.match("^(0|[1-9]\\d*)(\\.\\d+)?$") === null) return "Please enter a valid number"
    if (parseFloat(value) <= 0) return "Please enter a number greater than 0"
    if (value.match("\\.\\d\\d+") !== null) return "Max precision is 1 decimal places"

    return ""
  }

  return (
    <LabeledInput
      currentvalue={value}
      validator={validateNumber}
      needcheck={needcheck}
      postvalidation={postvalidation}
      {...props}
    >
      <input
        type="text"
        style={{
          height: "3rem",
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "0.8rem",
        }}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </LabeledInput>
  )
}

type LabeledInputRadioProps = LabeledInputTextProps & {
  items: { label: string; value: number }[]
  selectedValue: number
}

export const LabeledInputRadio = ({ items, selectedValue, ...props }: LabeledInputRadioProps) => {
  return (
    <LabeledInput currentvalue={selectedValue} {...props}>
      <div style={{ height: "3rem", display: "flex", alignItems: "center", gap: "3rem" }}>
        {items.map((item, i) => (
          <RadioButton
            key={`${item.label}-${i}`}
            inputLabel={item.label}
            name={props.name}
            id={`${props.name}-${item.value}`}
            value={item.value}
            checked={selectedValue === item.value}
            onChange={props.onChange}
          />
        ))}
      </div>
    </LabeledInput>
  )
}
