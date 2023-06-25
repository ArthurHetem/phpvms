/**
 * Before you edit these, read the documentation on how these files are compiled:
 * https://docs.phpvms.net/developers/building-assets
 *
 * Edits here don't take place until you compile these assets and then upload them.
 */

/**
 * Admin stuff needed
 */

// import 'bootstrap-sass/assets/javascripts/bootstrap';

// import airport_lookup from './airport_lookup';
// import calculate_distance from './calculate_distance';

// import '../entrypoint';

// // Import the mapping function
// import {
//   render_airspace_map, render_base_map, render_live_map, render_route_map,
// } from '../maps/index';

// window.phpvms.airport_lookup = airport_lookup;
// window.phpvms.calculate_distance = calculate_distance;

// window.phpvms.map = {
//   render_airspace_map,
//   render_base_map,
//   render_live_map,
//   render_route_map,
// };


import { createApp, h } from 'vue'
import { createInertiaApp, Link } from '@inertiajs/vue3'

import '../../css/app.css'

import Layout from './Shared/Layout.vue';
import PageHeader from './Components/PageHeader.vue';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
    let page = pages[`./Pages/${name}.vue`]
    page.default.layout = page.default.layout || Layout
    return page
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .component('PageHeader', PageHeader)
      .component('Link', Link)
      .mount(el)
  },

  title: title => title + ' - phpvms admin'
})
