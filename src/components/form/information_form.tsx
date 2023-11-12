import { Data, InformationData } from "@/type"
import { LabeledInputNumber, LabeledInputRadio, LabeledInputText } from "../input/labeled_input"
import FormWrapper from "./form_wrapper"
import React from "react"

type InformationFormProps = InformationData & {
  updateFields: (fields: Partial<Data>) => void
  hasError: boolean
}

const InformationForm = ({ updateFields, hasError, ...props }: InformationFormProps) => {
  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({ numOfEngines: parseInt(e.target.value) })
  }

  return (
    <FormWrapper title="Information">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", rowGap: "2rem", columnGap: "2rem" }}>
        <LabeledInputText
          label={"Ship name"}
          name={"shipName"}
          updateData={updateFields}
          defaultValue={props.shipName}
        />
        <LabeledInputText
          label={"Call sign"}
          name={"callSign"}
          updateData={updateFields}
          defaultValue={props.callSign}
        />

        <LabeledInputRadio
          label={"Engine"}
          items={[
            { label: "Single", value: 1 },
            { label: "Twin", value: 2 },
          ]}
          updateData={updateFields}
          selectedValue={props.numOfEngines}
          onChange={onRadioChange}
          requiretext="Please select one of the engines"
          needcheck={hasError}
        />

        <LabeledInputNumber
          label={"Length"}
          name={"length"}
          updateData={updateFields}
          defaultValue={props.length || ""}
          requiretext={`Please enter a Length`}
          postvalidation={(value) => updateFields({ length: parseFloat(value) })}
          needcheck={hasError}
        />
        <LabeledInputNumber
          label={"Beam"}
          name={"beam"}
          updateData={updateFields}
          defaultValue={props.beam || ""}
          requiretext={`Please enter a Beam`}
          postvalidation={(value) => updateFields({ beam: parseFloat(value) })}
          needcheck={hasError}
        />
        <LabeledInputNumber
          label={"Draft"}
          name={"draft"}
          updateData={updateFields}
          defaultValue={props.draft || ""}
          requiretext={`Please enter a Draft`}
          postvalidation={(value) => updateFields({ draft: parseFloat(value) })}
          needcheck={hasError}
        />
      </div>
    </FormWrapper>
  )
}

export default InformationForm
