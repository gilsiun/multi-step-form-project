import classNames from "classnames"
import React, { ReactNode, useEffect, useRef, useState } from "react"

interface LabeledInputProps {
  label: string
  requiredText?: string
  children: ReactNode
}

export const LabeledInput = ({ label, requiredText, children }: LabeledInputProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: ".5rem" }}>
        <label className={classNames({ required: !!requiredText })}>{label}</label>
        <span style={{ display: requiredText ? "inline-block" : "none", fontSize: "0.8rem", marginLeft: "0.2rem" }}>
          (required)
        </span>
      </div>
      {children}
      {/* <span style={{ marginTop: "0.4rem", color: "red", fontSize: "0.7rem", fontWeight: "600" }}>{requiredText}</span> */}
    </div>
  )
}

type LabeledInputText = Omit<LabeledInputProps, "children"> & React.HTMLProps<HTMLInputElement>

export const LabeledInputText = ({ ...props }: LabeledInputText) => {
  return (
    <LabeledInput {...props}>
      <input
        type="text"
        style={{
          height: "3rem",
          boxSizing: "border-box",
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "1rem",
        }}
        {...props}
      />
    </LabeledInput>
  )
}

type LabeledInputNumber = LabeledInputText & {
  postValidation: (value: number) => void
  needCheck: boolean
}

export const LabeledInputNumber = ({ postValidation, needCheck, ...props }: LabeledInputNumber) => {
  const [errorText, setErrorText] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (needCheck && inputRef.current) validateNumber(inputRef.current?.value)
  }, [needCheck])

  const validateNumber = (value: string) => {
    if (!value.length) {
      setErrorText(`Please enter a ${props.label}`)
      return false
    }

    if (value.match("[^$.\\d]") !== null) {
      setErrorText("Please enter a number only")
      return false
    }

    if (value.match("^(0|[1-9]\\d*)(\\.\\d+)?$") === null) {
      setErrorText("Please enter a valid number")
      return false
    }

    if (parseFloat(value) <= 0) {
      setErrorText("Please enter a number greater than 0")
      return false
    }

    if (value.match("\\.\\d\\d+") !== null) {
      setErrorText("Max precision is 1 decimal places")
      return false
    }

    return true
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const text = e.target.value

    if (!validateNumber(text)) return false

    setErrorText("")
    postValidation(parseFloat(text))
  }

  return (
    <LabeledInput {...props}>
      <input
        ref={inputRef}
        type="text"
        style={{ border: "1px solid #ddd", borderRadius: "4px", padding: ".8rem" }}
        onBlur={onBlur}
        onChange={() => console.log("123")}
        {...props}
      />
      <span style={{ height: "1rem", marginTop: ".3rem", color: "red", fontSize: "0.8rem" }}>{errorText}</span>
    </LabeledInput>
  )
}
