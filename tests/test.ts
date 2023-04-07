import { App, AppContext, Handler } from "../mod.ts"

interface Session {
  count: number
}

type Context = AppContext<Session>
const defaultSession: Session = { count: 0 }
const app = new App(defaultSession)
const handler = new Handler<Context>()

handler.privateChat.start((ctx) => {
  const count = ++ctx.session.count
  return ctx.r(`${count}`)
})

app.run(handler)
