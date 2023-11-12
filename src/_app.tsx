import { FormEvent, useState } from "react"
import TypeForm from "./components/form/type_form"
import Stepper from "./components/stepper"
import { useMultistepForm } from "./hooks/use_multistep_form"
import InformationForm from "./components/form/information_form"
import { Data, ShipTypeEnumZod, TrueDataZod } from "./type"
import ConfirmationForm from "./components/form/confirmation_form"
import FinalForm from "./components/form/final_form"
import { PostData } from "./lib/api"

const INITIAL_DATA: Data = {
  shipType: null,
  shipName: "",
  callSign: "",
  numOfEngines: 0,
  length: null,
  beam: null,
  draft: null,
}

function App() {
  const [data, setData] = useState(INITIAL_DATA)
  const [isFirstError, setFirstError] = useState<boolean>(false)
  const [isSecondError, setSecondError] = useState<boolean>(false)
  const [isFinish, setFinish] = useState(false)

  const updateFields = (fields: Partial<Data>) => {
    setData((prev) => {
      return { ...prev, ...fields }
    })
  }

  const { step, currentStepIndex, isFirstStep, isLastStep, next, back } = useMultistepForm([
    <TypeForm key={1} {...data} updateFields={updateFields} isError={isFirstError} />,
    <InformationForm key={2} {...data} updateFields={updateFields} hasError={isSecondError} />,
    <ConfirmationForm key={3} {...data} />,
  ])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (currentStepIndex === 0) {
      try {
        ShipTypeEnumZod.parse(data.shipType)
        setFirstError(false)
      } catch (e) {
        setFirstError(true)
        return
      }
    }

    if (currentStepIndex === 1) {
      try {
        TrueDataZod.parse(data)
        setSecondError(false)
      } catch (e) {
        console.error("step2 error", e)
        setSecondError(true)
        return
      }
    }

    if (currentStepIndex === 2) {
      await PostData(data)
      setFinish(true)
    }

    next()
  }

  return (
    <div
      style={{
        background: "white",
        border: "1px solid lightgrey",
        borderRadius: ".5rem",
        padding: "2rem",
        margin: "1rem",
        fontFamily: "Arial",
      }}
    >
      <Stepper current={currentStepIndex} />
      {isFinish ? (
        <FinalForm />
      ) : (
        <form onSubmit={onSubmit} noValidate>
          {step}
          <div style={{ marginTop: "3rem", display: "flex", justifyContent: "space-between" }}>
            {!isFirstStep && (
              <button
                type="button"
                onClick={back}
                style={{ marginRight: "auto", background: "none", border: "none", fontWeight: "600" }}
              >
                Back
              </button>
            )}

            <button
              type="submit"
              style={{
                marginLeft: "auto",
                backgroundColor: "black",
                color: "white",
                borderRadius: "8px",
                padding: "8px 16px",
                fontWeight: "600",
              }}
            >
              {isLastStep ? "Confirm" : "Continue"}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default App
