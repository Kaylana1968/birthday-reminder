import addBirthday from "./add-birthday.js";

export default function birthday(user, data, res) {
  switch (data.name) {
    case "add":
      return addBirthday(user, data.options, res);

    default:
      console.error(`unknown command: ${data.name}`);

      return res.status(400).json({ error: "unknown command" });
  }
}
