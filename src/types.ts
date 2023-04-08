import {
  Context,
  ForceReply,
  InlineKeyboardMarkup,
  Message,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  SessionFlavor,
} from "./deps.ts"

type KeyboardMarkup = ReplyKeyboardMarkup | InlineKeyboardMarkup
type ReplyMarkup = KeyboardMarkup | ReplyKeyboardRemove | ForceReply
type Texts = Record<string, string>
// deno-lint-ignore no-explicit-any
type Session = Record<string, any>

interface RFlavor<T> {
  rt: (text: string, markup?: ReplyMarkup) => Promise<Message.TextMessage>
  r: (textKey: keyof T, markup?: ReplyMarkup) => Promise<Message.TextMessage>
}

interface TextsFlavours<T> {
  texts: T
}

type AppContext<S extends Session, T extends Texts> =
  & Context
  & SessionFlavor<S>
  & RFlavor<T>
  & TextsFlavours<T>

export type { AppContext, ReplyMarkup, Session, Texts }
