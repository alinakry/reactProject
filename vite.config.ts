import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Middleware to set the correct MIME type for .tsx files
function mimeTypesMiddleware() {
  return {
    name: 'mime-types-middleware',
    configureServer(server: { middlewares: { use: (arg0: (req: any, res: any, next: any) => void) => void; }; }) {
      server.middlewares.use((req, res, next) => {
        if (req.url.endsWith('.tsx')) {
          res.setHeader('Content-Type', 'text/javascript');
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), mimeTypesMiddleware()],
  build: {
    outDir: 'dist',
  },
});