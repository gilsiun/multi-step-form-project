import RadioButton from "../input/radio_button"
import FormWrapper from "./form_wrapper"
import { Data, ShipType } from "@/type"
import { ShipTypeArr } from "@/constant"
// import React from "react"

interface TypeFormProps {
  shipType: ShipType | null
  updateFields: (fields: Partial<Data>) => void
  isError?: boolean
}

const TypeForm = ({ shipType, updateFields, isError }: TypeFormProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({ shipType: e.target.value as ShipType })
  }

  return (
    <FormWrapper title={"Type"} required>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", rowGap: "2rem" }}>
          {ShipTypeArr.map((type, i) => {
            return (
              <RadioButton
                key={`ship-type-${i}`}
                id={`ship-type-${i}`}
                name={"shipType"}
                inputLabel={type.toString()}
                value={type}
                checked={shipType === type}
                onChange={onChange}
              />
            )
          })}
        </div>
        <div style={{ visibility: isError ? "visible" : "hidden", marginTop: "3rem", color: "red", fontSize: "1rem" }}>
          Please select one of the types
        </div>
      </div>
    </FormWrapper>
  )
}

export default TypeForm
