Requires "BOT_TOKEN" environment variable

```ts
import { App, AppContext } from "https://deno.land/x/grammy_app/mod.ts";
import { Composer } from "https://deno.land/x/grammy/mod.ts";

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
```
