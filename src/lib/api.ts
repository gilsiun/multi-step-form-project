import { Data } from "@/type"

export async function PostData(data: Data) {
  const payload = {
    $schema: "http://json-schema.org/draft-04/schema#",
    title: "Example Schema",
    type: "object",
    properties: { ...data },
    required: ["shipType", "numOfEngines", "length", "beam", "draft"],
  }

  console.log(payload)

  const res = await fetch("/api/registration", {
    method: "POST",
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    console.error("[ERROR] ", res)
    throw res
  }
}
