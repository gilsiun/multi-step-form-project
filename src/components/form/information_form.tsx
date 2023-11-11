import { Data, InformationData } from "@/type"
import { LabeledInput, LabeledInputNumber, LabeledInputText } from "../input/labeled_input"
import RadioButton from "../input/radio_button"
import FormWrapper from "./form_wrapper"
import React from "react"

type InformationFormProps = InformationData & {
  updateFields: (fields: Partial<Data>) => void
  hasError: boolean
}

const InformationForm = ({ updateFields, hasError, ...props }: InformationFormProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({ [e.target.name]: e.target.value })
  }

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({ numOfEngines: parseInt(e.target.value) })
  }

  return (
    <FormWrapper title="Information">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", rowGap: "2rem", columnGap: "2rem" }}>
        <LabeledInputText label={"Ship name"} name={"shipName"} value={props.shipName} onChange={onChange} />
        <LabeledInputText label={"Call sign"} name={"callSign"} value={props.callSign} onChange={onChange} />

        <LabeledInput label={"Engine"} requiredText="Please select one of the engines">
          <div style={{ height: "3rem", display: "flex", alignItems: "center", gap: "3rem" }}>
            <RadioButton
              inputLabel="Single"
              id={"engine-1"}
              value={1}
              checked={props.numOfEngines === 1}
              onChange={onRadioChange}
            />
            <RadioButton
              inputLabel="Twin"
              id={"engine-2"}
              value={2}
              checked={props.numOfEngines === 2}
              onChange={onRadioChange}
            />
          </div>
        </LabeledInput>

        <LabeledInputNumber
          label={"Length"}
          defaultValue={props.length || ""}
          name={"length"}
          required
          onChange={onChange}
          postValidation={(value: number) => updateFields({ length: value })}
          needCheck={hasError}
        />
        <LabeledInputNumber
          label={"Beam"}
          value={props.beam || ""}
          name={"beam"}
          required
          onChange={onChange}
          postValidation={(value: number) => updateFields({ beam: value })}
          needCheck={hasError}
        />
        <LabeledInputNumber
          label={"Draft"}
          value={props.draft || ""}
          name={"draft"}
          required
          onChange={onChange}
          postValidation={(value: number) => updateFields({ draft: value })}
          needCheck={hasError}
        />
      </div>
    </FormWrapper>
  )
}

export default InformationForm
