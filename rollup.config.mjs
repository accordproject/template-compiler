import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

const name = packageJson.main.replace(/\.js$/, '');

const bundle = (config) => ({
    ...config,
    input: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
});

export default [
    bundle({
        plugins: [esbuild()],
        output: [
            {
                file: `${name}.js`,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: `${name}.mjs`,
                format: 'es',
                sourcemap: true,
            },
        ],
    }),
    bundle({
        plugins: [dts()],
        output: {
            file: `${name}.d.ts`,
            format: 'es',
        },
    }),
];
