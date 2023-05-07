import {
  apiThrottler,
  autoRetry,
  Bot,
  env,
  Handler,
  runBot,
  setR,
} from "./deps.ts"
import { sequentialize, setSession } from "./middlewares.ts"
import { AllowedUpdates, AppContext, Session } from "./types.ts"

export class App<S extends Session, Command extends string = string>
  extends Bot<AppContext<S>> {
  handlers: Handler<AppContext<S>, Command>

  constructor(defaultSession: S, token?: string) {
    token = token ?? env.str("TOKEN")
    super(token)
    // @ts-ignore: TODO
    this.api.config.use(apiThrottler(), autoRetry())
    this.use(
      sequentialize,
      setSession(defaultSession),
      setR,
    )
    this.catch(console.error)
    this.handlers = new Handler()
    this.use(this.handlers)
  }

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
