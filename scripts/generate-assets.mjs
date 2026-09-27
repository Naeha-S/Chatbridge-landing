import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 1. Generate crisp high-res logo.png matching the user's gradient infinity chain logo
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" fill="none">
  <defs>
    <linearGradient id="logoGradient" x1="120" y1="200" x2="900" y2="800" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00A3FF" />
      <stop offset="25%" stop-color="#2997FF" />
      <stop offset="55%" stop-color="#7C3AED" />
      <stop offset="80%" stop-color="#C026D3" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
    <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#7C3AED" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Left Circular Loop -->
  <path
    d="M 520 280 
       A 260 260 0 1 0 520 680"
    stroke="url(#logoGradient)"
    stroke-width="76"
    stroke-linecap="round"
    stroke-linejoin="round"
    filter="url(#subtleGlow)"
  />

  <!-- Intersecting Right Loop -->
  <path
    d="M 440 520 
       L 560 400 
       A 210 210 0 1 1 600 740"
    stroke="url(#logoGradient)"
    stroke-width="76"
    stroke-linecap="round"
    stroke-linejoin="round"
    filter="url(#subtleGlow)"
  />
</svg>`;

// 2. Generate crisp high-res domain-workflows.png matching the user's terminal/matrix diagram
const workflowsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" fill="#0C0D11">
  <defs>
    <linearGradient id="glowLine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2997FF" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#7C3AED" stop-opacity="0.8" />
    </linearGradient>
    <pattern id="matrixPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <text x="5" y="15" fill="rgba(255,255,255,0.035)" font-family="monospace" font-size="10">:.+:=</text>
      <text x="20" y="35" fill="rgba(255,255,255,0.025)" font-family="monospace" font-size="10">+=:-</text>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1600" height="900" fill="#0C0D11" />
  <rect x="750" y="40" width="810" height="820" fill="url(#matrixPattern)" />

  <!-- Divider line -->
  <line x1="750" y1="40" x2="750" y2="860" stroke="rgba(255,255,255,0.07)" stroke-width="1" />

  <!-- Left Column Navigation Items -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="22" font-weight="500">
    <!-- Item 1: Programmatic inboxes -->
    <g transform="translate(100, 70)" fill="#E5E5EA">
      <rect x="0" y="0" width="32" height="24" rx="4" fill="none" stroke="#A1A1A6" stroke-width="2" />
      <path d="M 0 0 L 16 14 L 32 0" fill="none" stroke="#A1A1A6" stroke-width="2" />
      <text x="55" y="19" fill="#E5E5EA" font-size="21">Programmatic inboxes</text>
    </g>

    <!-- Item 2: Threads and replies -->
    <g transform="translate(100, 145)" fill="#E5E5EA">
      <circle cx="16" cy="10" r="7" fill="none" stroke="#A1A1A6" stroke-width="2" />
      <path d="M 4 28 C 4 20 28 20 28 28" fill="none" stroke="#A1A1A6" stroke-width="2" />
      <text x="55" y="21" fill="#E5E5EA" font-size="21">Threads and replies</text>
    </g>

    <!-- Item 3: Attachments -->
    <g transform="translate(100, 225)" fill="#E5E5EA">
      <circle cx="16" cy="16" r="10" fill="none" stroke="#A1A1A6" stroke-width="2" />
      <text x="11" y="21" fill="#A1A1A6" font-family="monospace" font-size="16">@</text>
      <text x="55" y="21" fill="#E5E5EA" font-size="21">Attachments</text>
    </g>

    <!-- Item 4: Realtime events (Active selected card) -->
    <g transform="translate(80, 290)">
      <rect x="0" y="0" width="630" height="170" rx="12" fill="#18181E" />
      <text x="25" y="44" fill="#FFFFFF" font-family="serif" font-style="italic" font-size="26">ƒ</text>
      <text x="55" y="42" fill="#FFFFFF" font-size="22" font-weight="600">Realtime events</text>
      <text x="25" y="85" fill="#9E9EA6" font-size="16" font-weight="400">
        <tspan x="25" dy="0">Agents receive instant notifications for every incoming</tspan>
        <tspan x="25" dy="26">message, status update, or delivery change, allowing them</tspan>
        <tspan x="25" dy="26">to react and execute tasks without delay.</tspan>
      </text>
    </g>

    <!-- Item 5: Custom domains -->
    <g transform="translate(100, 500)" fill="#E5E5EA">
      <rect x="2" y="6" width="28" height="20" rx="3" fill="none" stroke="#A1A1A6" stroke-width="2" />
      <path d="M 2 11 L 12 11 L 15 6 L 2 6 Z" fill="none" stroke="#A1A1A6" stroke-width="2" />
      <text x="55" y="21" fill="#E5E5EA" font-size="21">Custom domains</text>
    </g>

    <!-- Item 6: Language/Framework SDKs -->
    <g transform="translate(100, 580)" fill="#E5E5EA">
      <path d="M 6 18 L 14 10 M 18 22 L 26 14" stroke="#A1A1A6" stroke-width="2.5" stroke-linecap="round" />
      <rect x="8" y="8" width="16" height="16" rx="4" fill="none" stroke="#A1A1A6" stroke-width="2" transform="rotate(45 16 16)" />
      <text x="55" y="21" fill="#E5E5EA" font-size="21">Language/Framework SDKs</text>
    </g>

    <!-- Item 7: Semantic search -->
    <g transform="translate(100, 660)" fill="#E5E5EA">
      <circle cx="14" cy="14" r="8" fill="none" stroke="#A1A1A6" stroke-width="2" />
      <line x1="20" y1="20" x2="28" y2="28" stroke="#A1A1A6" stroke-width="2" stroke-linecap="round" />
      <text x="55" y="21" fill="#E5E5EA" font-size="21">Semantic search</text>
    </g>

    <!-- Item 8: Data extractions -->
    <g transform="translate(100, 740)" fill="#E5E5EA">
      <ellipse cx="16" cy="8" rx="12" ry="5" fill="none" stroke="#A1A1A6" stroke-width="2" />
      <path d="M 4 8 L 4 22 C 4 25 28 25 28 22 L 28 8" fill="none" stroke="#A1A1A6" stroke-width="2" />
      <text x="55" y="21" fill="#E5E5EA" font-size="21">Data extractions</text>
    </g>
  </g>

  <!-- Right Column Diagram -->
  <!-- Top Node: Inbound Event/Mail -->
  <g transform="translate(1120, 140)">
    <!-- Corner brackets -->
    <path d="M 0 20 L 0 0 L 20 0" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none" />
    <path d="M 120 0 L 140 0 L 140 20" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none" />
    <path d="M 140 100 L 140 120 L 120 120" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none" />
    <path d="M 20 120 L 0 120 L 0 100" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none" />

    <!-- Mail icon inside -->
    <rect x="35" y="40" width="70" height="44" rx="6" fill="none" stroke="#FFFFFF" stroke-width="3.5" />
    <path d="M 35 40 L 70 68 L 105 40" fill="none" stroke="#FFFFFF" stroke-width="3.5" />
  </g>

  <!-- Arrow down to Agent -->
  <g stroke="rgba(255,255,255,0.4)" stroke-width="2">
    <line x1="1190" y1="270" x2="1190" y2="380" stroke-dasharray="6 6" />
    <path d="M 1184 374 L 1190 384 L 1196 374" fill="none" stroke-width="2" />
  </g>

  <!-- Central Agent (Hat & Glasses) -->
  <g transform="translate(1120, 390)">
    <!-- Corner brackets -->
    <path d="M 0 20 L 0 0 L 20 0" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none" />
    <path d="M 120 0 L 140 0 L 140 20" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none" />
    <path d="M 140 100 L 140 120 L 120 120" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none" />
    <path d="M 20 120 L 0 120 L 0 100" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none" />

    <!-- Agent Silhouette Icon -->
    <path d="M 30 50 C 30 45 45 25 70 25 C 95 25 110 45 110 50 Z" fill="#FFFFFF" />
    <rect x="20" y="50" width="100" height="8" rx="4" fill="#FFFFFF" />
    <!-- Glasses -->
    <path d="M 35 68 L 65 68 L 58 84 L 42 84 Z M 75 68 L 105 68 L 98 84 L 82 84 Z" fill="#FFFFFF" />
  </g>

  <!-- Diverging Dispatch Lines -->
  <g stroke="rgba(255,255,255,0.4)" stroke-width="2">
    <!-- Left Branch -->
    <path d="M 1120 450 L 980 450 L 980 660" fill="none" stroke-dasharray="6 6" />
    <path d="M 974 654 L 980 664 L 986 654" fill="none" stroke-width="2" />

    <!-- Center Branch -->
    <line x1="1190" y1="520" x2="1190" y2="660" stroke-dasharray="6 6" />
    <path d="M 1184 654 L 1190 664 L 1196 654" fill="none" stroke-width="2" />

    <!-- Right Branch -->
    <path d="M 1260 450 L 1400 450 L 1400 660" fill="none" stroke-dasharray="6 6" />
    <path d="M 1394 654 L 1400 664 L 1406 654" fill="none" stroke-width="2" />
  </g>

  <!-- Bottom Nodes (3 Execution Targets) -->
  <!-- Left Node (Context Graph) -->
  <g transform="translate(910, 670)">
    <path d="M 0 20 L 0 0 L 20 0" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <path d="M 120 0 L 140 0 L 140 20" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <path d="M 140 100 L 140 120 L 120 120" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <path d="M 20 120 L 0 120 L 0 100" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <!-- 3 Connected Nodes Icon -->
    <circle cx="70" cy="45" r="14" fill="none" stroke="#CCCCCC" stroke-width="3" />
    <circle cx="45" cy="85" r="14" fill="none" stroke="#CCCCCC" stroke-width="3" />
    <circle cx="95" cy="85" r="14" fill="none" stroke="#CCCCCC" stroke-width="3" />
    <line x1="62" y1="55" x2="52" y2="73" stroke="#CCCCCC" stroke-width="3" />
    <line x1="78" y1="55" x2="88" y2="73" stroke="#CCCCCC" stroke-width="3" />
  </g>

  <!-- Center Node (Inbox Delivery) -->
  <g transform="translate(1120, 670)">
    <path d="M 0 20 L 0 0 L 20 0" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <path d="M 120 0 L 140 0 L 140 20" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <path d="M 140 100 L 140 120 L 120 120" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <path d="M 20 120 L 0 120 L 0 100" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <!-- Mail icon -->
    <rect x="35" y="40" width="70" height="44" rx="6" fill="none" stroke="#CCCCCC" stroke-width="3.5" />
    <path d="M 35 40 L 70 68 L 105 40" fill="none" stroke="#CCCCCC" stroke-width="3.5" />
  </g>

  <!-- Right Node (SDK Tool Execution) -->
  <g transform="translate(1330, 670)">
    <path d="M 0 20 L 0 0 L 20 0" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <path d="M 120 0 L 140 0 L 140 20" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <path d="M 140 100 L 140 120 L 120 120" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <path d="M 20 120 L 0 120 L 0 100" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
    <!-- SDK Connector Icon -->
    <path d="M 40 45 L 60 45 L 75 60 L 60 75 L 40 75 Z" fill="none" stroke="#CCCCCC" stroke-width="3.5" />
    <path d="M 100 75 L 80 75 L 65 60 L 80 45 L 100 45 Z" fill="none" stroke="#CCCCCC" stroke-width="3.5" />
  </g>
</svg>`;

async function main() {
  fs.mkdirSync('public', { recursive: true });
  fs.mkdirSync('public/assets', { recursive: true });

  // Render logo.png
  await sharp(Buffer.from(logoSvg))
    .png({ quality: 100 })
    .toFile('public/logo.png');
  console.log('Created public/logo.png successfully.');

  // Also write logo.svg to keep in sync
  fs.writeFileSync('public/logo.svg', logoSvg);
  console.log('Updated public/logo.svg successfully.');

  // Render domain-workflows.png
  await sharp(Buffer.from(workflowsSvg))
    .png({ quality: 100 })
    .toFile('public/assets/domain-workflows.png');
  console.log('Created public/assets/domain-workflows.png successfully.');
}

main().catch(console.error);
