Requires "BOT_TOKEN" environment variable

```ts
import { App, AppContext, Handler } from "https://deno.land/x/grammy_app/mod.ts"

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
```
