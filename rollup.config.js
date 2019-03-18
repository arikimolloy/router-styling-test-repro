import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const devBuildConfig = {
  input: './',
  output: {
    file: './bundle.js',
    format: 'iife',
    name: 'main',
    sourcemap: true
  },
  plugins: [resolve(), commonjs()]
};

export default commandLineArgs => devBuildConfig;
