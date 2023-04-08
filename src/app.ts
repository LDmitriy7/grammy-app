import {
  apiThrottler,
  autoRetry,
  Bot,
  env,
  Handler,
  run as runBot,
  setR,
} from "./deps.ts"
import { sequentialize, setSession } from "./middlewares.ts"
import { AppContext, Session, Texts } from "./types.ts"

const BOT_TOKEN = env.str("BOT_TOKEN")

class App<
  S extends Session,
  T extends Texts,
  C extends AppContext<S, T>,
> {
  bot: Bot<C>

  constructor(defaultSession: S, texts: T) {
    const bot = this.bot = new Bot(BOT_TOKEN)
    bot.api.config.use(apiThrottler(), autoRetry())
    bot.use(
      sequentialize,
      setSession(defaultSession),
      setR(texts),
    )
    bot.catch(console.error)
  }

  run(handler: Handler<C>) {
    this.bot.use(handler)
    runBot(this.bot)
  }
}

export { App }
