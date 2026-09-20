import JSZip from 'jszip';

export async function downloadProjectZip() {
  const zip = new JSZip();

  // Package manifest
  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'globalharmonyrun-in',
        private: true,
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'vite --port=3000 --host=0.0.0.0',
          build: 'vite build',
          preview: 'vite preview',
        },
        dependencies: {
          '@tailwindcss/vite': '^4.3.3',
          '@vitejs/plugin-react': '^6.1.1',
          'lucide-react': '^0.546.0',
          motion: '^12.23.24',
          react: '^19.0.1',
          'react-dom': '^19.0.1',
          tailwindcss: '^4.3.3',
          vite: '^8.3.0',
        },
        devDependencies: {
          '@types/node': '^22.14.0',
          '@types/react': '^19.3.0',
          '@types/react-dom': '^19.3.0',
          typescript: '^7.0.2',
        },
      },
      null,
      2
    )
  );

  // tsconfig
  zip.file(
    'tsconfig.json',
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          useDefineForClassFields: true,
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          skipLibCheck: true,
          moduleResolution: 'bundler',
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'react-jsx',
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,
        },
        include: ['src'],
      },
      null,
      2
    )
  );

  // vite.config.ts
  zip.file(
    'vite.config.ts',
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
`
  );

  // index.html
  zip.file(
    'index.html',
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GlobalHarmonyRun.in | Marathon Organizer Knowledge Portal</title>
    <meta name="description" content="GlobalHarmonyRun.in — Educational guide and resource portal for marathon organizers on everything needed before, during, and after peace marathon events. Contact globalharmonyrun@gmail.com." />
    <meta property="og:title" content="GlobalHarmonyRun.in | Marathon Organizer Knowledge Portal" />
    <meta property="og:description" content="GlobalHarmonyRun.in — Educational guide and resource portal for marathon organizers on everything needed before, during, and after peace marathon events. Contact globalharmonyrun@gmail.com." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#FAF8F5] text-neutral-900 antialiased selection:bg-amber-500/20 selection:text-amber-900 font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  );

  // README.md
  zip.file(
    'README.md',
    `# GlobalHarmonyRun.in — Marathon Organizer Portal

Landing page for **GlobalHarmonyRun.in** — an educational knowledge and guidance portal for marathon organizers covering preparation before, during, and after events.

## Quick Start

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Build for production:
\`\`\`bash
npm run build
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the site.
`
  );

  // Fetch and package images
  try {
    const wideImgResp = await fetch('/src/assets/images/marathon_finish_wide_1789917348175.jpg');
    if (wideImgResp.ok) {
      const blob = await wideImgResp.blob();
      zip.file('src/assets/images/marathon_finish_wide_1789917348175.jpg', blob);
    }
  } catch {
    // ignore
  }

  try {
    const sikhImgResp = await fetch('/src/assets/images/sikh_man_worship_1789915993630.jpg');
    if (sikhImgResp.ok) {
      const blob = await sikhImgResp.blob();
      zip.file('src/assets/images/sikh_man_worship_1789915993630.jpg', blob);
    }
  } catch {
    // ignore
  }

  // Generate ZIP file
  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'globalharmonyrun-in-project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
