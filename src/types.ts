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

interface RFlavor {
  r: (text: string, markup?: ReplyMarkup) => Promise<Message.TextMessage>
}

type AppContext<S> = Context & SessionFlavor<S> & RFlavor

export type { AppContext, ReplyMarkup }
