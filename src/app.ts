import {
  apiThrottler,
  autoRetry,
  Bot,
  env,
  Handler,
  hydrateReply,
  parseMode,
  runBot,
  setR,
} from "./deps.ts"
import { sequentialize, setSession } from "./middlewares.ts"
import { AllowedUpdates, AppContext, Session } from "./types.ts"

export class App<
  S extends Session,
  Command extends string = string,
  CTX extends AppContext<S> = AppContext<S>,
> extends Bot<CTX> {
  handlers: Handler<CTX, Command>

  constructor(defaultSession: S, token?: string) {
    token = token ?? env.str("TOKEN")
    super(token)
    this.api.config.use(
      apiThrottler(),
      autoRetry(),
      parseMode("HTML"),
    )
    this.use(
      sequentialize,
      setSession(defaultSession),
      setR,
      hydrateReply,
    )
    this.catch(console.error)
    this.handlers = new Handler()
    this.use(this.handlers)
  }

  get url() {
    return `https://t.me/${this.botInfo.username}`
  }

  startUrl(payload: string, group = false) {
    const q = group ? "startgroup" : "start"
    return `${this.url}?${q}=${payload}`
  }

  startGroupUrl = (payload = "0") => this.startUrl(payload, true)

  run(allowed_updates = allowedUpdates) {
    this.api.deleteWebhook()
    runBot(this, { runner: { fetch: { allowed_updates } } })
  }
}

const allowedUpdates: AllowedUpdates = [
  "message",
  "callback_query",
  "chat_member",
  "my_chat_member",
]
