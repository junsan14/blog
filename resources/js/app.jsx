import './bootstrap';
import '../css/app.css';
import "../css/reset.css"
import { createRoot } from 'react-dom/client';
import { createInertiaApp,Link } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';



  createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
      delay: 250,
      color: '#111',
      includeCSS: true,
      // Whether the NProgress spinner will be shown...
      showSpinner: false,
    },
});
