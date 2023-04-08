import {
  Context,
  NextFunction,
  sequentialize as _sequentialize,
  session,
} from "./deps.ts"
import { AppContext, ReplyMarkup, Session, Texts } from "./types.ts"

function getSessionKey(ctx: Context) {
  return ctx.chat?.id.toString()
}

const sequentialize = _sequentialize(getSessionKey)

const setSession = <S extends Session>(defaultSession: S) =>
  session({
    getSessionKey,
    initial: () => structuredClone(defaultSession),
  })

function setTexts<T extends Texts>(texts: T) {
  async function middleware<S extends Session>(
    ctx: AppContext<S, T>,
    next: NextFunction,
  ): Promise<void> {
    ctx.texts = texts
    await next()
  }
  return middleware
}

async function setR<S extends Session, T extends Texts>(
  ctx: AppContext<S, T>,
  next: NextFunction,
): Promise<void> {
  ctx.rt = (text: string, markup?: ReplyMarkup) => {
    return ctx.reply(text, { reply_markup: markup, parse_mode: "HTML" })
  }
  ctx.r = (textKey: keyof typeof ctx.texts, markup?: ReplyMarkup) => {
    const text = ctx.texts[textKey]
    return ctx.rt(text, markup)
  }
  await next()
}

export { sequentialize, setR, setSession, setTexts }
