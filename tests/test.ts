import { App, AppContext, Handler } from "../mod.ts"

const session = { count: 0 }
const texts = { greet: "Hello!", count: "Count:" }
type Command = "count" | "test"

type Context = AppContext<typeof session, typeof texts>
const app = new App(session, texts)
const handler = new Handler<Context, Command>()

handler.privateChat.start((ctx) => ctx.r("greet"))
handler.cmd("count", (ctx) => {
  const text = `${ctx.texts.count} ${++ctx.session.count}`
  return ctx.rt(text)
})

app.run(handler)
