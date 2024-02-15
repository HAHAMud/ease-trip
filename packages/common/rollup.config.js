const path = require('path');
const fs = require('fs');
const alias = require('@rollup/plugin-alias');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { default: esbuild } = require('rollup-plugin-esbuild');
const json = require('@rollup/plugin-json');
const { dts } = require('rollup-plugin-dts');

const rootPath = process.cwd();

/** @type {import('type-fest').PackageJson} */
const pkg = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf-8'));

const NODEJS_MODULES = [
  'default',
  'assert',
  'async_hooks',
  'async_hooks',
  'buffer',
  'child_process',
  'cluster',
  'console',
  'crypto',
  'diagnostics_channel',
  'dns',
  'domain',
  'fs',
  'fs/promises',
  'http',
  'http2',
  'https',
  'inspector',
  'module',
  'net',
  'os',
  'path',
  'perf_hooks',
  'process',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'stream',
  'string_decoder',
  'sys',
  'timers',
  'tls',
  'trace_events',
  'tty',
  'url',
  'util',
  'v8',
  'vm',
  'worker_threads',
  'zlib',
];

/**
 * @type {import('rollup').RollupOptions[]}
 */
module.exports = [
  {
    input: './src/index.ts',
    output: [
      {
        dir: 'dist/es',
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
      {
        dir: 'dist/lib',
        format: 'cjs',
        interop: 'auto',
        exports: 'named',
        footer: 'module.exports = Object.assign(exports.default || {}, exports);',
        sourcemap: true,
      },
    ],
    plugins: [
      alias({
        entries: [
          {
            find: /^@/,
            replacement: path.join(rootPath, 'src'),
          },
        ],
      }),
      resolve({
        preferBuiltins: false,
      }),
      commonjs(),
      esbuild({
        jsx: 'automatic',
      }),
      json(),
    ],
    external: [
      ...NODEJS_MODULES,
      /^node:/,
      ...Object.keys(pkg?.peerDependencies || {}),
      ...Object.keys(pkg?.dependencies || {}),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/types/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
]