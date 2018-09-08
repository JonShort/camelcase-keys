import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        name: 'keysToCamelcase',
        file: pkg.browser,
        format: 'umd',
      },
      { file: pkg.main, format: 'cjs' },
    ],
    plugins: [
      resolve(), // Allow rollup to 'see' dependencies
      commonjs(), // Include dependency code in bundle
      babel(), // Transpile using babel config
      terser(), // Minify / mangle using terser
    ],
  },
  {
    input: 'src/index.js',
    output: { file: pkg.module, format: 'es' },
    plugins: [
      terser(), // Minify / mangle using terser
    ],
  },
];
