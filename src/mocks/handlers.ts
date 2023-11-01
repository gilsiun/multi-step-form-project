import { http, HttpResponse } from "msw"

export const handlers = [
  http.post("/api/registration", async ({ request }) => {
    await delay(300)

    console.log("======== Registration Success ========")
    console.log(await request.json())

    return HttpResponse.json({
      code: 201,
      message: "registration success",
    })
  }),
]

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
