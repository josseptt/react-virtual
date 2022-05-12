import { terser } from 'rollup-plugin-terser'
import size from 'rollup-plugin-size'
import externalDeps from 'rollup-plugin-peer-deps-external'
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import visualizer from 'rollup-plugin-visualizer'
import replace from '@rollup/plugin-replace'
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';

const external = ['react']

const globals = {
  react: 'React',
}

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-virtual.mjs',
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [resolve(), babel(), commonjs(), peerDepsExternal()],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-virtual.min.mjs',
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [resolve(), babel(), commonjs(), externalDeps()],
  },
  {
    input: 'src/index.js',
    output: {
      name: 'ReactQuery',
      file: 'dist/react-virtual.development.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [resolve(), babel(), commonjs(), externalDeps()],
  },
  {
    input: 'src/index.js',
    output: {
      name: 'ReactVirtual',
      file: 'dist/react-virtual.production.min.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [
      replace({ 'process.env.NODE_ENV': `"production"`, delimiters: ['', ''] }),
      resolve(),
      babel(),
      commonjs(),
      externalDeps(),
      terser(),
      size(),
      visualizer(),
    ],
  },
]
