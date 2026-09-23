/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// These give `import logo from './logo.png'` and `import Icon from './i.svg?react'`
// their types. `tsconfig.app.json` also lists them under `types`, which is what
// `tsc -b` and `eslint` read — but an editor that resolves this file to the root
// project (which declares `"files": []`) sees neither, and every asset import
// becomes an error type. Declaring them here makes the editor agree with CI.
