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

const external = [
  '@mui/material-nextjs/v14-pagesRouter',
  /^@mui\/material\//,
  /^@mui\/icons-material\//,
  /^react\//,
  /^react-dom\//,
  ...Object.keys(pkg?.peerDependencies || {}),
  ...Object.keys(pkg?.dependencies || {}),
];

/**
 * @type {import('rollup').RollupOptions[]}
 */
module.exports = [
  {
    onwarn(warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes(`"use client"`)) {
        return;
      }
      warn(warning);
    },
    input: {
      index: './src/index.ts',
      next: './src/next.ts',
      // icon: './src/icon.ts',
    },
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
            find: /^@\//,
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
    external,
  },
  {
    input: {
      index: './src/index.ts',
      next: './src/next.ts',
      // icon: './src/icon.ts',
    },
    output: {
      dir: 'dist/types',
      format: 'esm',
    },
    external,
    plugins: [dts()],
  },
];
