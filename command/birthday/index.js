import add from "./add.js";
import list from "./list.js";

export default function birthday(user, data, res) {
  switch (data.name) {
    case "add":
      return add(user, data.options, res);

    case "list":
      return list(user, res);

    default:
      console.error(`unknown command: ${data.name}`);

      return res.status(400).json({ error: "unknown command" });
  }
}
