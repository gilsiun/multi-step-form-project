import React from "react"
import ReactDOM from "react-dom/client"

import App from "./_app"

import "./styles/globals.css"

async function deferRender() {
  if (import.meta.env.PROD) return

  const { worker } = await import("./mocks/browser")

  return worker.start()
}

void deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
