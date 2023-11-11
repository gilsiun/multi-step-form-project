import classNames from "classnames"
import { Fragment, ReactNode } from "react"

interface FormWrapperProps {
  title: string
  children: ReactNode
  required?: boolean
}

const FormWrapper = ({ title, children, required }: FormWrapperProps) => {
  return (
    <Fragment>
      <h2 className={classNames({ required: required })} style={{ marginBottom: "3rem" }}>
        {title}
      </h2>
      {children}
    </Fragment>
  )
}

export default FormWrapper
