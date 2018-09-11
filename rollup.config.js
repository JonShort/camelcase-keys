import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const commonJSConfig = {
  namedExports: {
    // left-hand side can be an absolute path, a path
    // relative to the current directory, or the name
    // of a module in node_modules
    'node_modules/quick-lru/index.js': ['QuickLRU'],
  },
};

const externals = ['camelcase', 'map-obj', 'quick-lru'];

const globalDeps = {
  camelcase: 'camelCase',
  'map-obj': 'mapObj',
  'quick-lru': 'QuickLRU',
};

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'keysToCamelcase',
      file: pkg.browser,
      format: 'iife',
    },
    plugins: [
      resolve(), // Allow rollup to 'see' dependencies
      commonjs(commonJSConfig), // Include dependency code in bundle
      babel(), // Transpile using babel config
      terser(), // Minify / mangle using terser
    ],
  },
  {
    external: externals,
    input: 'src/index.js',
    output: {
      file: pkg.main,
      format: 'cjs',
      globals: globalDeps,
    },
    plugins: [
      resolve(), // Allow rollup to 'see' dependencies
      babel(), // Transpile using babel config
      terser(), // Minify / mangle using terser
    ],
  },
  {
    external: externals,
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
      globals: globalDeps,
    },
    plugins: [
      resolve(), // Allow rollup to 'see' dependencies
      terser(), // Minify / mangle using terser
    ],
  },
];
