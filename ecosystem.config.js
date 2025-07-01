module.exports = {
  apps: [
    {
      name: "chat_porta-3000",
      script: "src/server.ts",
      interpreter: "npx",
      interpreter_args: "tsx",
      env: { PORT: 3000 }
    },
    {
      name: "chat_porta-3001",
      script: "src/server.ts",
      interpreter: "npx",
      interpreter_args: "tsx",
      env: { PORT: 3001 }
    },
    {
      name: "chat_porta-3002",
      script: "src/server.ts",
      interpreter: "npx",
      interpreter_args: "tsx",
      env: { PORT: 3002 }
    },
    {
      name: "chat_porta-3003",
      script: "src/server.ts",
      interpreter: "npx",
      interpreter_args: "tsx",
      env: { PORT: 3003 }
    }
  ]
};