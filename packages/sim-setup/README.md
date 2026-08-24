# ame-setup

Set up and manage a self-hosted Ame installation.

```bash
npx ame-setup
```

Outside an Ame source checkout, the command creates a Docker Compose installation using published
images. Inside an Ame source checkout, use `bun run ame-setup` to expose the complete development
and deployment wizard.

`npx sim-setup` remains available as a compatibility alias for existing automation and installations.
