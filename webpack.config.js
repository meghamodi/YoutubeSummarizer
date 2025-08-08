const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    background: './src/background/background.ts',
    popup: './src/popup/popup.ts',
    content: './src/content/content.ts',
  },
  // ... rest of webpack configuration
};