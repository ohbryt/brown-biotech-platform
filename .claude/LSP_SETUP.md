# LSP Setup for TypeScript

## Why LSP Matters

Without LSP, Claude searches by string pattern (grep). For a common function name like `getData` or `handleClick`, this returns thousands of matches across a large codebase — burning context window before work begins.

With LSP, Claude searches by symbol — only the actual function definition and its real references, across files and even across languages.

## Setup

### 1. Install the language server

```bash
npm install -g typescript-language-server typescript
```

### 2. VS Code (recommended)

Add to `.vscode/settings.json`:

```json
{
  "typescript.tsserver.enable": true,
  "typescript.tsserver.log": "verbose",
  "typescript.tsserver.trace": {
    "server": "verbose"
  }
}
```

The TypeScript plugin is already available in Claude Code's extension layer.

### 3. Neovim / LSP config

```lua
-- Using nvim-lspconfig
require('lspconfig').tsserver.setup({
  on_attach = on_attach,
  flags = lsp_flags,
})
```

### 4. Verify

```bash
tsc --version
# Should return: Version X.X.X
# No errors = LSP ready
```

## Integration with Claude Code

Once configured, Claude Code automatically uses LSP for:
- "Go to definition" — finds actual symbol definition
- "Find all references" — returns only real symbol references
- Cross-file symbol navigation
- Type-aware completions

## Brown Biotech Platform Specifics

The platform is pure TypeScript/Next.js. LSP benefits:
- `src/app/services/` — multiple service directories with similar naming
- `src/components/` — shared UI components
- API routes in `src/app/api/`

Without LSP, searching for `page.tsx` imports would return every file. With LSP, Claude finds only the actual symbol references.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "tsserver not found" | `npm install -g typescript typescript-language-server` |
| Slow startup | Normal on first run — downloads type definitions |
| Wrong symbol | Check you're in the right TypeScript project (not repo root) |