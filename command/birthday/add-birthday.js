import { InteractionResponseType } from "discord-interactions";
import fs from "fs/promises";
import path from "path";

export default async function addBirthday(user, options, res) {
  const name = options.find((option) => option.name === "name").value;
  const birthdate = options.find((option) => option.name === "birthdate").value;

  const filePath = path.join(process.cwd(), "data", `${user.id}`);
  const fileContent = JSON.parse(await fs.readFile(filePath));

  if (Object.keys(fileContent).includes(name)) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `already the name of someone, do you want to modify instead`,
      },
    });
  }

  fileContent[name] = birthdate;
  fs.writeFile(filePath, JSON.stringify(fileContent));

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${name} born on ${birthdate} was successfully added`,
    },
  });
}
