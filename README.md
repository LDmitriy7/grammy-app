Requires "TOKEN" environment variable

```ts
import { App, Msg } from "../mod.ts"

type Session = { count: number }
type Command = "count" | "test"

const app = new App<Session, Command>({ count: 0 })
const handlers = app.handlers
const helloMsg = new Msg("Hello")

function CountMsg(count: number) {
  return new Msg(`<b>Count is:</b> ${count}`)
}

handlers.private.start((ctx) => ctx.r(helloMsg))
handlers.command("count", (ctx) => ctx.r(CountMsg(++ctx.session.count)))
handlers.command("test", (ctx) => {
  const s = [app.url, app.startUrl("1"), app.startGroupUrl()]
  ctx.reply(s.join("\n"))
})
app.run()
```
