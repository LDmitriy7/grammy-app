import {
  Context,
  ParseModeFlavor,
  RFlavor,
  SessionFlavor,
  Update,
} from "./deps.ts"

// deno-lint-ignore no-explicit-any
export type Session = Record<string, any>
export type AppContext<S extends Session> =
  & ParseModeFlavor<Context>
  & SessionFlavor<S>
  & RFlavor
export type AllowedUpdates = Exclude<keyof Update, "update_id">[]
