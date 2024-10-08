import { InteractionResponseType } from "discord-interactions";

export default function test(res) {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `hello beurre`,
    },
  });
}
