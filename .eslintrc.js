module.exports = {
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['warn', { usePrettierrc: true }],
  },
  extends: 'next/core-web-vitals',
};
