import './bootstrap';
import '../css/style.scss';
import "../css/reset.css"

import { createRoot } from 'react-dom/client';
import { createInertiaApp,Link } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';


createInertiaApp({
    resolve: name => {
      const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
      let page =  pages[`./Pages/${name}.jsx`]
      return page
    },
    setup({ el, App, props }) {
      createRoot(el).render(<App {...props} />)
    },
  })

