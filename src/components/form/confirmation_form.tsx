import { Data } from "@/type"
import FormWrapper from "./form_wrapper"

type ConfirmationFormProps = Data

const ConfirmationForm = ({ ...props }: ConfirmationFormProps) => {
  return (
    <FormWrapper title={"Confirmation"}>
      <div
        style={{
          padding: "1rem",
          backgroundColor: "lightgrey",
          borderRadius: ".5rem",
          whiteSpace: "pre-wrap",
          fontFamily: "consolas",
        }}
      >
        {JSON.stringify(props, (_key, value: string) => (!value ? undefined : value), 2)}
      </div>
    </FormWrapper>
  )
}

export default ConfirmationForm
