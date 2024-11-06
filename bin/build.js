/* eslint-disable no-console */
import esbuild from 'esbuild';

const buildDirectory = 'dist';
const production = process.env.NODE_ENV === 'production';

// Config entrypoint files
const entryPoints = ['src/index.ts'];

/**
 * Default Settings
 * @type {esbuild.BuildOptions}
 */
const defaultSettings = {
  bundle: true,
  outdir: buildDirectory,
  minify: production,
  sourcemap: !production,
  target: production ? 'es2017' : 'esnext',
  entryPoints,
  footer: {
    js: '//Copyright (c) 2024 Devhaus Pte Ltd',
  },
};
let ctx = await esbuild.context(defaultSettings);

// Files building
if (production) {
  await esbuild.build(defaultSettings);
}

// Files watching if in dev mode
else {
  let { host, port } = await ctx.serve({ servedir: buildDirectory, port: 3000 });
  console.log(`Serving at ${host}:${port}`);

  // esbuild
  //   .watch(
  //     {
  //       servedir: buildDirectory,
  //       port: 3000,
  //     },
  //     defaultSettings
  //   )
  //   .then((server) => {
  //     console.log(`Serving at http://localhost:${server.port}`);
  //   });
}
