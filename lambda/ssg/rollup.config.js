import jsx from 'acorn-jsx';
import nodeResolve from "@rollup/plugin-node-resolve";
import common from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: "index.tsx",
    output: [
      {
        dir: "lib",
        exports: "auto",
        format: "cjs"
      }
    ],
    external: ["solid-js", "solid-js/web"],
    acornInjectPlugins: [jsx()],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      nodeResolve({ preferBuiltins: true, exportConditions: ["solid", "node"] }),
      babel({
        babelHelpers: "bundled",
        presets: [["solid", { generate: "ssr", hydratable: true }]]
      }),
      common()
    ]
  }
];