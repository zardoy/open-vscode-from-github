import { build } from 'esbuild'
p
await build({
    bundle: true,
    entryPoints: ['src/injectGithub.tsx', 'src/background.ts'],
    outdir: 'build',
    platform: 'browser',
    watch: true,
})
