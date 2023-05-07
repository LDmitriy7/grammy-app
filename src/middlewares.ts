import { Context, sequentialize as _seq, session } from "./deps.ts"
import { Session } from "./types.ts"

function getSessionKey(ctx: Context) {
  return ctx.chat && ctx.from ? `${ctx.chat.id}/${ctx.from.id}` : undefined
}

const sequentialize = _seq(getSessionKey)

const setSession = <S extends Session>(defaultSession: S) =>
  session({
    getSessionKey,
    initial: () => structuredClone(defaultSession),
  })

export { sequentialize, setSession }
