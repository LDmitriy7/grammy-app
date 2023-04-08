import { Context, RFlavor, SessionFlavor, Texts } from "./deps.ts"

// deno-lint-ignore no-explicit-any
type Session = Record<string, any>

type AppContext<S extends Session, T extends Texts> =
  & Context
  & SessionFlavor<S>
  & RFlavor<T>

export type { AppContext, Session, Texts }
