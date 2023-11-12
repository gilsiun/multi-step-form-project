import { PartyPopper } from "lucide-react"

const FinalForm = () => {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <PartyPopper size={150} strokeWidth={1.4} style={{ marginBottom: "2rem" }} />
      <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>You are now registered.</div>
      <a href={"http://www.avikus.ai"}>www.avikus.ai</a>
    </div>
  )
}

export default FinalForm
