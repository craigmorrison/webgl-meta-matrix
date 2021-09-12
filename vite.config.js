/**
 * @type {import('vite').UserConfig}
 */
const config = {
  build: {
    minify: false,
    rollupOptions: {
      output: {
        format: 'umd',
      },
    },
  },
};

export default config;
