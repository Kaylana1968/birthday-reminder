import 'dotenv/config'
import express from 'express'
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware
} from 'discord-interactions'
import { InstallGlobalCommands } from './utils/discord.js'
import commands from './commands/index.js'
import executer from './src/index.js'

// Create an express app
const app = express()
// Get port, or default to 3000
const PORT = process.env.PORT || 3000

InstallGlobalCommands(process.env.APP_ID, commands)

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post(
  '/interactions',
  verifyKeyMiddleware(process.env.PUBLIC_KEY),
  async function (req, res) {
    // Interaction type and data
    const { type, data, member } = req.body

    /**
     * Handle verification requests
     */
    if (type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG })
    }

    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
      const response = executer(member.user, data)

      return response
        ? res.send(response)
        : res.status(400).json({ error: 'unknown command' })
    }

    console.error('unknown interaction type', type)
    return res.status(400).json({ error: 'unknown interaction type' })
  }
)

app.listen(PORT, () => {
  console.log('Listening on port', PORT)
})
