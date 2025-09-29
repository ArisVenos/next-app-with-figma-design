/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{tsx,ts}",
    "./app/login/*.{ts,tsx}",
    "./app/components/**/*.{ts,tsx}",
    "./app/components/Buttons/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f7f9fc",
        table: "#bbf7d0",
        tableHead: "#f4f7fc",
        headerText: "#464f60",
        addButton: "#2264e5",
        rows: "#f9fafc",
        id: "#687182",
        stGreenBg: "#e1fcef",
        stGreenFont: "#14804a",
        stBlueBg: "#f0f1fa",
        stBlueFont: "#4f5aed",
        stRedBg: "#faf0f3",
        stRedFont: "#d12953",
        stGrayBg: "#e9edf5",
        stGrayFont: "#5a6376",
      },
      fontFamily: {
        sans: ["Inter"],
      },
      fontSize: {
        sm: ["11px", "16px"],
        xmd: ["12px", "18px"],
        md: ["14px", "20px"],
      },
    },
  },
};
