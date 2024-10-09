import birthday from "./birthday/index.js";

export default function executer(user, data, res) {
  switch (data.name) {
    case "birthday":
      return birthday(user, data.options[0], res);

    default:
      console.error(`unknown command: ${data.name}`);

      return res.status(400).json({ error: "unknown command" });
  }
}
