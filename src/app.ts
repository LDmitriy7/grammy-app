import {
  apiThrottler,
  autoRetry,
  Bot,
  env,
  Handler,
  run as runBot,
} from "./deps.ts"
import { sequentialize, setR, setSession, setTexts } from "./middlewares.ts"
import { AppContext, Session, Texts } from "./types.ts"

const BOT_TOKEN = env.str("BOT_TOKEN")

class App<S extends Session, T extends Texts> {
  bot: Bot<AppContext<S, T>>

  constructor(defaultSession: S, texts: T) {
    const bot = this.bot = new Bot(BOT_TOKEN)
    bot.api.config.use(apiThrottler(), autoRetry())
    bot.use(
      sequentialize,
      setSession(defaultSession),
      setTexts(texts),
      setR,
    )
    bot.catch(console.error)
  }

  run(handler: Handler<AppContext<S, T>>) {
    this.bot.use(handler)
    runBot(this.bot)
  }
}

export { App }
