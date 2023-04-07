import { App, AppContext } from "../mod.ts"
import { Composer } from "../src/deps.ts"

interface Session {
  count: number
}

type Context = AppContext<Session>
const defaultSession: Session = { count: 0 }
const app = new App(defaultSession)
const handlers = new Composer<Context>()

handlers.on("msg", (ctx) => {
  const count = ++ctx.session.count
  return ctx.r(`${count}`)
})

app.run(handlers)
