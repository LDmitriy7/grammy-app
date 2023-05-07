import { App, Msg } from "../mod.ts"

type Session = { count: number }
type Command = "count" | "test"

const app = new App<Session, Command>({ count: 0 })
const handlers = app.handlers
const helloMsg = new Msg("Hello")

function CountMsg(count: number) {
  return new Msg(`Count is: ${count}`)
}

handlers.private.start((ctx) => ctx.r(helloMsg))
handlers.command("count", (ctx) => ctx.r(CountMsg(++ctx.session.count)))
app.run()
