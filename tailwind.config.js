import defaultTheme from "tailwindcss/defaultTheme";

import colors from "tailwindcss/colors";

import flowBitePlugin from "flowbite/plugin";

module.exports = {
  darkMode: "class",
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./node_modules/flowbite/**/*.js",
    "./resources/views/**/*.{vue,js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        accent: colors.fuchsia,
        success: colors.green,
        info: colors.blue,
        warning: colors.amber,
        danger: colors.red,
        default: colors.slate,
      },
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [flowBitePlugin],
};
