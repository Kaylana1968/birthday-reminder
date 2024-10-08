import test from './test.js';

export default function executer(name, res) {
  if (name === "test") {
    return test(res);
  }

  console.error(`unknown command: ${name}`);
  return res.status(400).json({ error: "unknown command" });
}
