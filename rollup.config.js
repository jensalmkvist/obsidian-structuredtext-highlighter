import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'main.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'auto'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    terser()
  ],
  external: ['obsidian']
};
