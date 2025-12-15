// Simple favicon generator for FreshCart
const fs = require('fs');

// Create a simple 32x32 favicon data
const faviconData = `
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4CAF50"/>
      <stop offset="100%" style="stop-color:#2E7D32"/>
    </linearGradient>
  </defs>
  <circle cx="16" cy="16" r="16" fill="url(#bg)"/>
  <text x="16" y="22" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" fill="white">F</text>
</svg>
`;

console.log('Favicon SVG created. Convert to PNG using online converter or image editor.');