import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
          port: 5173,
          open: true,
    },
    build: {
          outDir: 'dist',
          sourcemap: false,
          minify: 'terser',
          terserOptions: {
                  compress: {
                            drop_console: true,
                  },
          },
    },
    define: {
          'process.env.VITE_ANTHROPIC_API_KEY': JSON.stringify(
                  process.env.VITE_ANTHROPIC_API_KEY
                ),
          'process.env.VITE_CLAUDE_MODEL': JSON.stringify(
                  process.env.VITE_CLAUDE_MODEL || 'claude-opus-4-7'
                ),
          'process.env.VITE_MAX_TOKENS': JSON.stringify(
                  process.env.VITE_MAX_TOKENS || '1024'
                ),
    },
});
