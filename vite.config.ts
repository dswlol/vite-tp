import { defineConfig } from 'vite';
import Plugins from './presets/index';

export default defineConfig({
  plugins: [Plugins()],
  base: '/vite-tp/'
});
