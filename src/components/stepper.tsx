import { CheckCircle2 } from "lucide-react"

const StepIcon = ({ step }: { step: number }) => {
  return (
    <div
      style={{
        width: "2.5rem",
        height: "2.5rem",
        // boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid grey",
        borderRadius: "50%",
      }}
    >
      {step}
    </div>
  )
}

const StepContainer = ({ step, stepName, isPassed }: { step: number; stepName: string; isPassed: boolean }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "0.5rem", alignItems: "center" }}>
      {isPassed ? (
        <CheckCircle2
          style={{
            width: "2.5rem",
            height: "2.5rem",
          }}
        />
      ) : (
        <StepIcon step={step} />
      )}
      {stepName}
    </div>
  )
}

interface StepperProps {
  current: number
}

const Stepper = ({ current }: StepperProps) => {
  return (
    <div style={{ marginBottom: "3rem", padding: "0 1rem", display: "flex", justifyContent: "space-between" }}>
      <StepContainer step={1} isPassed={current > 0} stepName={"Type"} />
      <StepContainer step={2} isPassed={current > 1} stepName={"Information"} />
      <StepContainer step={3} isPassed={current > 2} stepName={"Confirmation"} />
    </div>
  )
}

export default Stepper
