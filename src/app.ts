import {
  apiThrottler,
  autoRetry,
  Bot,
  Composer,
  env,
  run as runBot,
} from "./deps.ts"
import { sequentialize, setR, setSession } from "./middlewares.ts"
import { AppContext } from "./types.ts"

const BOT_TOKEN = env.str("BOT_TOKEN")

/** S - Session */
class App<S> {
  bot: Bot<AppContext<S>>

  constructor(defaultSession: S) {
    const bot = this.bot = new Bot(BOT_TOKEN)
    bot.api.config.use(apiThrottler(), autoRetry())
    bot.use(sequentialize, setSession(defaultSession), setR)
    bot.catch(console.error)
  }

  run(handlers: Composer<AppContext<S>>) {
    this.bot.use(handlers)
    runBot(this.bot)
  }
}

export { App }
