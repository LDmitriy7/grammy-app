import { Context, sequentialize as _sqnt, session } from "./deps.ts"
import { Session } from "./types.ts"

function getSessionKey(ctx: Context) {
  return ctx.chat?.id.toString()
}

const sequentialize = _sqnt(getSessionKey)

const setSession = <S extends Session>(defaultSession: S) =>
  session({
    getSessionKey,
    initial: () => structuredClone(defaultSession),
  })

export { sequentialize, setSession }
