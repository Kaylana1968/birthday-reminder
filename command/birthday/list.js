import { InteractionResponseType } from "discord-interactions";
import fs from "fs/promises";
import path from "path";

export default async function list(user, res) {
  const filePath = path.join(process.cwd(), "data", `${user.id}.txt`);
  const fileContent = await fs.readFile(filePath, "utf8");

  const datas = fileContent
    .split(";")
    .filter((data) => data)
    .map((data) => data.split(":"));

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${datas}`,
    },
  });
}
