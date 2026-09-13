export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Avoid running during the build phase
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return;
    }

    if (process.env.VENDURE_STARTED === 'true') {
      return;
    }

    process.env.VENDURE_STARTED = 'true';

    try {
      const { spawn } = await import('child_process');
      const path = await import('path');
      const fs = await import('fs');

      const internalPort = process.env.INTERNAL_VENDURE_PORT || '3002';
      const candidates = [
        path.resolve(process.cwd(), '..', 'dist', 'index.js'),
        path.resolve(process.cwd(), 'dist', 'index.js'),
        path.resolve(__dirname, '..', 'dist', 'index.js'),
        path.resolve(__dirname, '..', '..', 'dist', 'index.js'),
        path.resolve(__dirname, '..', '..', '..', 'dist', 'index.js'),
      ];

      const backendScript = candidates.find((c: string) => fs.existsSync(c));
      if (backendScript) {
        const backendCwd = path.dirname(path.dirname(backendScript));
        console.log('================================================================');
        console.log('>>> [Next.js Instrumentation] Auto-starting Vendure Backend...');
        console.log('>>> Backend Script: ' + backendScript);
        console.log('>>> Backend Root: ' + backendCwd);
        console.log('>>> Internal Port: ' + internalPort);
        console.log('================================================================');

        try {
          const dotenv = await import('dotenv');
          dotenv.config({ path: path.join(backendCwd, '.env') });
        } catch (e) {}

        const backend = spawn(process.execPath, [backendScript], {
          cwd: backendCwd,
          env: {
            ...process.env,
            PORT: internalPort,
            VENDURE_PORT: internalPort,
          },
          stdio: 'inherit',
        });

        backend.on('error', (err: any) => console.error('>>> [Vendure] Spawn error:', err));
        backend.on('exit', (code: number, sig: string) =>
          console.error(`>>> [Vendure] Process exited: code ${code}, sig ${sig}`)
        );
      } else {
        console.warn('>>> [Next.js Instrumentation] Vendure backend script not found in candidates:', candidates);
      }
    } catch (err) {
      console.error('>>> [Next.js Instrumentation] Error initializing Vendure:', err);
    }
  }
}
