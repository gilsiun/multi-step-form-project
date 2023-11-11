import { z } from "zod"
import { ShipTypeArr } from "./constant"

export const ShipTypeEnumZod = z.enum(ShipTypeArr)
export type ShipType = z.infer<typeof ShipTypeEnumZod>

export const DataZod = z.object({
  shipType: ShipTypeEnumZod.nullable(),
  shipName: z.string(),
  callSign: z.string(),
  numOfEngines: z.number().int().gte(1).lte(2),
  length: z.number().gt(0).multipleOf(0.1).nullable(),
  beam: z.number().gt(0).multipleOf(0.1).nullable(),
  draft: z.number().gt(0).multipleOf(0.1).nullable(),
})

export type Data = z.infer<typeof DataZod>

export const TrueDataZod = z.object({
  shipType: ShipTypeEnumZod,
  shipName: z.string(),
  callSign: z.string(),
  numOfEngines: z.number().int().gte(1).lte(2),
  length: z.number().gt(0).multipleOf(0.1),
  beam: z.number().gt(0).multipleOf(0.1),
  draft: z.number().gt(0).multipleOf(0.1),
})

export type InformationData = Omit<Data, "shipType">
