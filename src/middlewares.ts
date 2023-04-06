import {
  Context,
  NextFunction,
  sequentialize as _sequentialize,
  session,
} from "./deps.ts"
import { AppContext, ReplyMarkup } from "./types.ts"

function getSessionKey(ctx: Context) {
  return ctx.chat?.id.toString()
}

const sequentialize = _sequentialize(getSessionKey)

const setSession = <S>(defaultSession: S) =>
  session({
    getSessionKey,
    initial: () => structuredClone(defaultSession),
  })

async function setR<S>(ctx: AppContext<S>, next: NextFunction): Promise<void> {
  ctx.r = (text: string, markup?: ReplyMarkup) =>
    ctx.reply(text, { reply_markup: markup, parse_mode: "HTML" })
  await next()
}

export { sequentialize, setR, setSession }
