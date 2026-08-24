#!/usr/bin/env node

console.warn('sim-setup is deprecated; use ame-setup for new installs.')
await import('ame-setup/dist/index.js')
