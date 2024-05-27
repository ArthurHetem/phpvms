import laravel, { refreshPaths } from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    laravel({
      input: [
        "resources/views/**/*.blade.php",
        "resources/views/layouts/**/*.js",
        "resources/views/layouts/**/*.vue",
      ],
      refresh: [
        ...refreshPaths,
        "app/Livewire/**",
        "app/Filament/**",
        "modules/**/**",
        "resources/views/**/*.blade.php",
        "resources/views/layouts/**/*.js",
        "resources/views/layouts/**/*.vue",
      ],
    }),

    vue(),

    AutoImport({
      imports: [
        "vue",
        {
          "@inertiajs/vue3": ["router", "usePage", "useForm"],
        },
      ],
    }),

    Components({
      dirs: [
        "./resources/views/layouts/vite/Components",
        "./resources/views/layouts/vite/Components/Auth",
        "./resources/views/layouts/vite/FormInputs",
        "./resources/views/layouts/vite/Layouts",
        "./resources/views/layouts/vite/Transitions",
      ],
      extensions: ["vue"],
      directoryAsNamespace: true,
      deep: true,
      resolvers: [
        IconsResolver(),
        (name) => {
          if (name === "Head") {
            return {
              importName: "Head",
              path: "@inertiajs/vue3",
            };
          }

          if (name === "Link") {
            return {
              importName: "Link",
              path: "@inertiajs/vue3",
            };
          }
        },
      ],
    }),

    Icons({
      autoInstall: true,
    }),

    {
      name: "vite:inertia:layout",
      enforce: "pre",
      transform: (code, id) => {
        const layoutRegex =
          /<template +layout(?: *= *['"](?:(?:([\w|,]+):)?([\w|,]+))['"] *)?>/;

        if (!layoutRegex.test(code)) {
          return code;
        }

        const isTypeScript = /lang=['"]ts['"]/.test(code);

        return code.replace(layoutRegex, (_, __, layoutNames) => {
          const layoutImports = layoutNames
            .split(",")
            .map(
              (layoutName) =>
                `import ${layoutName} from '@/Layouts/${layoutName}.vue'`
            );

          const newCode = `
            <script${isTypeScript ? ' lang="ts"' : ""}>
            ${layoutImports.join("\n")}
            export default {
              layout: [${layoutNames}]
            }
            </script>
            <template>
          `;

          return newCode;
        });
      },
    },
  ],
  // server: {
  //   hmr: {
  //     host: "localhost",
  //   },
  //   watch: {
  //     usePolling: true,
  //   },
  // },
  resolve: {
    alias: {
      "@": resolve(__dirname, "resources/views/layouts/vite"),
    },
  },
});
