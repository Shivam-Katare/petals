import { create } from 'zustand'

export type GridTemplate = {
  id: string
  name: string
  description: string
  columns: string
  rows: string
  columnGap: number
  rowGap: number
  css: string
  html: string
}

interface GridState {
  // Custom grid settings
  columns: number
  rows: number
  columnGap: number
  rowGap: number
  columnFractions: number[]
  rowFractions: number[]
  
  // Selected template
  selectedTemplate: GridTemplate | null
  templates: GridTemplate[]
  
  // Actions
  setColumns: (columns: number) => void
  setRows: (rows: number) => void
  setColumnGap: (gap: number) => void
  setRowGap: (gap: number) => void
  setColumnFraction: (index: number, value: number) => void
  setRowFraction: (index: number, value: number) => void
  resetFractions: () => void
  resetToDefaults: () => void
  setSelectedTemplate: (template: GridTemplate | null) => void
  generateCSS: () => string
}

export const useGridStore = create<GridState>((set, get) => ({
  // Default values
  columns: 3,
  rows: 3,
  columnGap: 10,
  rowGap: 10,
  columnFractions: [1, 1, 1],
  rowFractions: [1, 1, 1],
  selectedTemplate: null,
  templates: [
    {
      id: 'wildflower-mosaic',
      name: 'Wildflower Mosaic',
      description: 'Pinterest-style gallery',
      columns: 'repeat(auto-fill, minmax(250px, 1fr))',
      rows: 'auto',
      columnGap: 16,
      rowGap: 16,
      css: '.wildflower-mosaic {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  grid-auto-rows: minmax(100px, auto);\n  grid-gap: 16px;\n}\n\n/* --- Optional extra styling starts here (remove if not needed) --- */\n.wildflower-mosaic .item {\n  background: #f9f9f9;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 16px;\n  text-align: center;\n}\n/* --- Optional extra styling ends here --- */',
      html: '<div class="wildflower-mosaic">\n  <div class="item">Item 1</div>\n  <div class="item">Item 2</div>\n  <div class="item">Item 3</div>\n  <div class="item">Item 4</div>\n  <div class="item">Item 5</div>\n  <div class="item">Item 6</div>\n</div>'
    },
    {
      id: 'magnolia-gazette',
      name: 'Magnolia Gazette',
      description: 'Magazine style multi-column grid',
      columns: 'repeat(3, 1fr)',
      rows: 'auto',
      columnGap: 24,
      rowGap: 32,
      css: '.magnolia-gazette {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: auto;\n  grid-column-gap: 24px;\n  grid-row-gap: 32px;\n}\n\n/* --- Optional extra styling starts here (remove if not needed) --- */\n.magnolia-gazette .article {\n  background: #fff;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  padding: 24px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.05);\n}\n/* --- Optional extra styling ends here --- */',
      html: '<div class="magnolia-gazette">\n  <article class="article">Article 1</article>\n  <article class="article">Article 2</article>\n  <article class="article">Article 3</article>\n  <article class="article">Article 4</article>\n  <article class="article">Article 5</article>\n  <article class="article">Article 6</article>\n</div>'
    },
    {
      id: 'ivy-cascade',
      name: 'Ivy Cascade',
      description: 'Staggered, cascading layout with true masonry feel',
      columns: 'repeat(auto-fill, minmax(200px, 1fr))',
      rows: 'auto',
      columnGap: 16,
      rowGap: 16,
      css: '.ivy-cascade {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  grid-auto-rows: 10px;\n  grid-gap: 16px;\n  grid-auto-flow: dense;\n}\n\n.ivy-cascade .item {\n  grid-row: span 20;\n}\n\n.ivy-cascade .item.tall {\n  grid-row: span 40;\n}\n\n.ivy-cascade .item.medium {\n  grid-row: span 30;\n}\n\n.ivy-cascade .item.wide {\n  grid-column: span 2;\n}\n\n.ivy-cascade .item.wide.tall {\n  grid-column: span 2;\n  grid-row: span 40;\n}\n\n/* --- Optional extra styling starts here (remove if not needed) --- */\n.ivy-cascade .item {\n  background: #eef2f7;\n  border-radius: 6px;\n  padding: 8px;\n  text-align: center;\n}\n/* --- Optional extra styling ends here --- */',
      html: '<div class="ivy-cascade">\n  <div class="item tall">Tall Item</div>\n  <div class="item">Normal Item</div>\n  <div class="item medium">Medium Item</div>\n  <div class="item wide">Wide Item</div>\n  <div class="item">Normal Item</div>\n  <div class="item tall wide">Tall & Wide Item</div>\n  <div class="item medium">Medium Item</div>\n  <div class="item">Normal Item</div>\n</div>'
    },
    {
      id: 'orchid-overlap',
      name: 'Orchid Overlap',
      description: 'Overlapping cards with image over text sections',
      columns: 'repeat(3, 1fr)',
      rows: 'auto',
      columnGap: 20,
      rowGap: 40,
      css: '.orchid-overlap {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: auto;\n  grid-gap: 20px 40px;\n  position: relative;\n}\n\n.orchid-overlap .card {\n  display: grid;\n  grid-template-rows: 1fr auto;\n  position: relative;\n}\n\n.orchid-overlap .card-image {\n  grid-row: 1;\n  z-index: 1;\n  margin-bottom: -30px;\n}\n\n.orchid-overlap .card-content {\n  grid-row: 2;\n  background: white;\n  padding: 40px 20px 20px;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n}\n\n/* --- Optional extra styling starts here (remove if not needed) --- */\n.orchid-overlap img {\n  border-radius: 8px;\n  width: 100%;\n  height: auto;\n}\n/* --- Optional extra styling ends here --- */',
      html: '<div class="orchid-overlap">\n  <div class="card">\n    <div class="card-image">\n      <img src="image1.jpg" alt="Card image">\n    </div>\n    <div class="card-content">\n      <h3>Card Title</h3>\n      <p>Card description here...</p>\n    </div>\n  </div>\n  <div class="card">\n    <div class="card-image">\n      <img src="image2.jpg" alt="Card image">\n    </div>\n    <div class="card-content">\n      <h3>Card Title</h3>\n      <p>Card description here...</p>\n    </div>\n  </div>\n  <div class="card">\n    <div class="card-image">\n      <img src="image3.jpg" alt="Card image">\n    </div>\n    <div class="card-content">\n      <h3>Card Title</h3>\n      <p>Card description here...</p>\n    </div>\n  </div>\n</div>'
    },
    {
      id: 'lavender-waves',
      name: 'Lavender Waves',
      description: 'Wavy showcase with varied section sizes',
      columns: 'repeat(6, 1fr)',
      rows: 'auto',
      columnGap: 16,
      rowGap: 16,
      css: '.lavender-waves {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-auto-rows: minmax(100px, auto);\n  grid-gap: 16px;\n}\n\n.lavender-waves .item:nth-child(5n+1) {\n  grid-column: span 3;\n  grid-row: span 2;\n}\n\n.lavender-waves .item:nth-child(5n+2) {\n  grid-column: span 3;\n  grid-row: span 1;\n}\n\n.lavender-waves .item:nth-child(5n+3) {\n  grid-column: span 2;\n  grid-row: span 1;\n}\n\n.lavender-waves .item:nth-child(5n+4) {\n  grid-column: span 2;\n  grid-row: span 2;\n}\n\n.lavender-waves .item:nth-child(5n+5) {\n  grid-column: span 2;\n  grid-row: span 1;\n}\n\n/* --- Optional extra styling starts here (remove if not needed) --- */\n.lavender-waves .item {\n  background: linear-gradient(135deg, #f0f4ff, #d9e4ff);\n  border-radius: 8px;\n  padding: 12px;\n  text-align: center;\n}\n/* --- Optional extra styling ends here --- */',
      html: '<div class="lavender-waves">\n  <div class="item">Item 1 (large)</div>\n  <div class="item">Item 2</div>\n  <div class="item">Item 3</div>\n  <div class="item">Item 4</div>\n  <div class="item">Item 5</div>\n  <div class="item">Item 6 (large)</div>\n  <div class="item">Item 7</div>\n  <div class="item">Item 8</div>\n  <div class="item">Item 9</div>\n  <div class="item">Item 10</div>\n</div>'
    },
    {
      id: 'carnation-nest',
      name: 'Carnation Nest',
      description: 'Nested grid inside a grid card (complex dashboard)',
      columns: 'repeat(4, 1fr)',
      rows: 'auto auto auto',
      columnGap: 16,
      rowGap: 16,
      css: '.carnation-nest {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: auto auto auto;\n  grid-gap: 16px;\n}\n\n.carnation-nest .header {\n  grid-column: 1 / -1;\n  grid-row: 1;\n}\n\n.carnation-nest .sidebar {\n  grid-column: 1;\n  grid-row: 2 / span 2;\n}\n\n.carnation-nest .main-dashboard {\n  grid-column: 2 / -1;\n  grid-row: 2;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(2, 150px);\n  grid-gap: 12px;\n}\n\n.carnation-nest .widget-area {\n  grid-column: 2 / -1;\n  grid-row: 3;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-gap: 12px;\n}\n\n/* --- Optional extra styling starts here (remove if not needed) --- */\n.carnation-nest .header, .carnation-nest .sidebar, .carnation-nest .dashboard-item, .carnation-nest .widget {\n  background: #f7fafc;\n  border-radius: 8px;\n  padding: 16px;\n  box-shadow: 0 2px 6px rgba(0,0,0,0.05);\n}\n/* --- Optional extra styling ends here --- */',
      html: '<div class="carnation-nest">\n  <div class="header">Header</div>\n  <div class="sidebar">Sidebar</div>\n  <div class="main-dashboard">\n    <div class="dashboard-item">Dashboard Item 1</div>\n    <div class="dashboard-item">Dashboard Item 2</div>\n    <div class="dashboard-item">Dashboard Item 3</div>\n    <div class="dashboard-item">Dashboard Item 4</div>\n    <div class="dashboard-item">Dashboard Item 5</div>\n    <div class="dashboard-item">Dashboard Item 6</div>\n  </div>\n  <div class="widget-area">\n    <div class="widget">Widget 1</div>\n    <div class="widget">Widget 2</div>\n  </div>\n</div>'
    },    
    {
      id: 'rose-mosaic',
      name: 'Rose Mosaic',
      description: 'Art gallery with random shaped blocks',
      columns: 'repeat(5, 1fr)',
      rows: 'auto',
      columnGap: 12,
      rowGap: 12,
      css: `.rose-mosaic {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-auto-rows: 100px;
      gap: 12px;
    }
    
    .rose-mosaic .item:nth-child(9n+1) {
      grid-column: span 2;
      grid-row: span 2;
    }
    
    .rose-mosaic .item:nth-child(9n+2) {
      grid-column: span 3;
      grid-row: span 1;
    }
    
    .rose-mosaic .item:nth-child(9n+3) {
      grid-column: span 1;
      grid-row: span 1;
    }
    
    .rose-mosaic .item:nth-child(9n+4) {
      grid-column: span 2;
      grid-row: span 1;
    }
    
    .rose-mosaic .item:nth-child(9n+5) {
      grid-column: span 1;
      grid-row: span 2;
    }
    
    .rose-mosaic .item:nth-child(9n+6) {
      grid-column: span 3;
      grid-row: span 2;
    }
    
    .rose-mosaic .item:nth-child(9n+7) {
      grid-column: span 1;
      grid-row: span 1;
    }
    
    .rose-mosaic .item:nth-child(9n+8) {
      grid-column: span 2;
      grid-row: span 1;
    }
    
    .rose-mosaic .item:nth-child(9n+9) {
      grid-column: span 3;
      grid-row: span 1;
    }
    
    /* --- Optional Styling for better preview (you can remove below if not needed) --- */
    .rose-mosaic .item {
      background-color: #f9f9f9;
      border: 1px dashed #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #333;
      padding: 8px;
      box-sizing: border-box;
    }
    /* --- End of optional preview styling --- */
    `,
      html: `<div class="rose-mosaic">
      <div class="item">Item 1 (2x2)</div>
      <div class="item">Item 2 (3x1)</div>
      <div class="item">Item 3 (1x1)</div>
      <div class="item">Item 4 (2x1)</div>
      <div class="item">Item 5 (1x2)</div>
      <div class="item">Item 6 (3x2)</div>
      <div class="item">Item 7 (1x1)</div>
      <div class="item">Item 8 (2x1)</div>
      <div class="item">Item 9 (3x1)</div>
    </div>`
    },    
    {
      id: 'tulip-trail',
      name: 'Tulip Trail',
      description: 'Zig-zag layout for storytelling pages',
      columns: 'repeat(12, 1fr)',
      rows: 'auto',
      columnGap: 20,
      rowGap: 40,
      css: '.tulip-trail {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-auto-rows: minmax(100px, auto);\n  gap: 20px 40px;\n}\n\n.tulip-trail .story-block:nth-child(odd) {\n  grid-column: 2 / span 5;\n}\n\n.tulip-trail .story-block:nth-child(even) {\n  grid-column: 7 / span 5;\n}\n\n.tulip-trail .full-width {\n  grid-column: 1 / -1;\n}\n\n.tulip-trail .story-block:nth-child(4n+1) {\n  grid-column: 2 / span 4;\n}\n\n.tulip-trail .story-block:nth-child(4n+2) {\n  grid-column: 7 / span 4;\n}\n\n.tulip-trail .story-block:nth-child(4n+3) {\n  grid-column: 4 / span 4;\n}\n\n.tulip-trail .story-block:nth-child(4n+4) {\n  grid-column: 9 / span 3;\n}\n\n/* --- Optional Styling for better preview (you can remove below if not needed) --- */\n.tulip-trail .story-block, .tulip-trail .full-width {\n  background-color: #f5f5f5;\n  border: 1px dashed #bbb;\n  padding: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  color: #555;\n  box-sizing: border-box;\n}\n/* --- End of optional preview styling --- */',
      html: '<div class="tulip-trail">\n  <div class="story-block">Story Block 1</div>\n  <div class="story-block">Story Block 2</div>\n  <div class="story-block">Story Block 3</div>\n  <div class="story-block">Story Block 4</div>\n  <div class="full-width">Full Width Section</div>\n  <div class="story-block">Story Block 5</div>\n  <div class="story-block">Story Block 6</div>\n  <div class="story-block">Story Block 7</div>\n  <div class="story-block">Story Block 8</div>\n</div>'
    },
    {
      id: 'lily-stack',
      name: 'Lily Stack',
      description: 'Tall, stacked panels with alternating gaps',
      columns: 'repeat(3, 1fr)',
      rows: 'auto',
      columnGap: 24,
      rowGap: 16,
      css: '.lily-stack {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: minmax(150px, auto);\n  gap: 24px 16px;\n}\n\n.lily-stack .panel:nth-child(3n+1) {\n  margin-top: 40px;\n}\n\n.lily-stack .panel:nth-child(3n+2) {\n  margin-top: 0;\n}\n\n.lily-stack .panel:nth-child(3n+3) {\n  margin-top: 80px;\n}\n\n.lily-stack .panel {\n  min-height: 250px;\n  transition: transform 0.3s ease;\n}\n\n.lily-stack .panel:hover {\n  transform: translateY(-10px);\n}\n\n/* --- Optional Styling Starts --- */\n.lily-stack .panel {\n  background-color: #f5f5f5;\n  border: 2px dashed #bbb;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  color: #555;\n  border-radius: 8px;\n  padding: 16px;\n}\n/* --- Optional Styling Ends --- */',
      html: '<div class="lily-stack">\n  <div class="panel">Panel 1</div>\n  <div class="panel">Panel 2</div>\n  <div class="panel">Panel 3</div>\n  <div class="panel">Panel 4</div>\n  <div class="panel">Panel 5</div>\n  <div class="panel">Panel 6</div>\n  <div class="panel">Panel 7</div>\n  <div class="panel">Panel 8</div>\n  <div class="panel">Panel 9</div>\n</div>'
    },      
    {
      id: 'garden-board',
      name: 'Garden Board',
      description: 'Dashboard grid with clean sections',
      columns: 'repeat(4, 1fr)',
      rows: 'auto auto',
      columnGap: 16,
      rowGap: 16,
      css: '.garden-board {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: auto auto;\n  gap: 16px;\n}\n\n/* --- Optional Styling Starts --- */\n.garden-board .board-item {\n  background-color: #e0f7fa;\n  border: 2px dashed #26c6da;\n  padding: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 17px;\n  color: #007c91;\n  border-radius: 10px;\n}\n/* --- Optional Styling Ends --- */',
      html: '<div class="garden-board">\n  <div class="board-item">Item 1</div>\n  <div class="board-item">Item 2</div>\n  <div class="board-item">Item 3</div>\n  <div class="board-item">Item 4</div>\n  <div class="board-item">Item 5</div>\n  <div class="board-item">Item 6</div>\n  <div class="board-item">Item 7</div>\n  <div class="board-item">Item 8</div>\n</div>'
    },    
    {
      id: 'twin-petals',
      name: 'Twin Petals',
      description: 'Split screen 50/50 of variable',
      columns: '1fr 1fr',
      rows: '1fr',
      columnGap: 0,
      rowGap: 0,
      css: '.twin-petals {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 1fr;\n  height: 100%;\n}\n\n/* --- Optional Styling Starts --- */\n.twin-petals .left-section, .twin-petals .right-section {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #fafafa;\n  border: 2px solid #ccc;\n  font-size: 20px;\n  color: #333;\n  padding: 20px;\n  border-radius: 12px;\n}\n/* --- Optional Styling Ends --- */',
      html: '<div class="twin-petals">\n  <div class="left-section">Left Content</div>\n  <div class="right-section">Right Content</div>\n</div>'
    },      
    {
      id: 'sunflower-center',
      name: 'Sunflower Center',
      description: 'Centered content with main focus',
      columns: '1fr 3fr 1fr',
      rows: 'auto',
      columnGap: 16,
      rowGap: 0,
      css: '.sunflower-center {\n  display: grid;\n  grid-template-columns: 1fr 3fr 1fr;\n  grid-template-rows: auto;\n  gap: 16px 0;\n}\n\n/* --- Optional Styling Starts --- */\n.sunflower-center .left-sidebar, .sunflower-center .main-content, .sunflower-center .right-sidebar {\n  background-color: #fff8e1;\n  border: 2px solid #ffcc80;\n  padding: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  color: #ff6f00;\n  border-radius: 8px;\n}\n/* --- Optional Styling Ends --- */',
      html: '<div class="sunflower-center">\n  <div class="left-sidebar">Sidebar Left</div>\n  <div class="main-content">Main Content Area</div>\n  <div class="right-sidebar">Sidebar Right</div>\n</div>'
    },    
    {
      id: 'morning-glory',
      name: 'Morning Glory',
      description: 'Hero section with content below',
      columns: '1fr',
      rows: 'minmax(300px, 40vh) auto',
      columnGap: 0,
      rowGap: 32,
      css: '.morning-glory {\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: minmax(300px, 40vh) auto;\n  gap: 0 32px;\n}\n\n/* --- Optional Styling Starts --- */\n.morning-glory .hero-section {\n  background: linear-gradient(to right, #6a11cb, #2575fc);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 26px;\n  padding: 24px;\n  border-radius: 10px;\n}\n\n.morning-glory .content-section {\n  background-color: #f2f2f2;\n  padding: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  border-radius: 10px;\n}\n/* --- Optional Styling Ends --- */',
      html: '<div class="morning-glory">\n  <div class="hero-section">Hero Content</div>\n  <div class="content-section">Main Content</div>\n</div>'
    },
    // some more templates
    {
      id: "lily-diagonal",
      name: "Lily Diagonal",
      description: "Diagonal overlapping blocks that shift with increasing gaps",
      columns: "repeat(5, 1fr)",
      rows: "auto",
      columnGap: 15,
      rowGap: 50,
      css: ".lily-diagonal {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-auto-rows: auto;\n  grid-gap: 15px 50px;\n  position: relative;\n}\n\n.lily-diagonal .item:nth-child(odd) {\n  transform: rotate(5deg);\n  grid-column: span 2;\n}\n\n.lily-diagonal .item:nth-child(even) {\n  transform: rotate(-5deg);\n  grid-column: span 3;\n}\n\n/* --- Optional extra styling starts here (remove if not needed) --- */\n.lily-diagonal .item {\n  background: #f0e6f6;\n  border: 1px solid #ddd;\n  border-radius: 10px;\n  padding: 20px;\n  text-align: center;\n}\n/* --- Optional extra styling ends here --- */",
      html: "<div class=\"lily-diagonal\">\n  <div class=\"item\">Item 1</div>\n  <div class=\"item\">Item 2</div>\n  <div class=\"item\">Item 3</div>\n  <div class=\"item\">Item 4</div>\n  <div class=\"item\">Item 5</div>\n</div>"
    },
    {
      id: "violet-spiral",
      name: "Violet Spiral",
      description: "Spiral-like grid, items diagonally overlapping for an artistic touch",
      columns: "repeat(6, 1fr)",
      rows: "auto",
      columnGap: 18,
      rowGap: 40,
      css: ".violet-spiral {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-auto-rows: auto;\n  grid-gap: 18px 40px;\n}\n\n.violet-spiral .item {\n  position: relative;\n  transform: rotate(10deg);\n  grid-column: span 2;\n}\n\n.violet-spiral .item:nth-child(4n) {\n  grid-column: span 3;\n  transform: rotate(-10deg);\n}\n\n/* --- Optional extra styling starts here (remove if not needed) --- */\n.violet-spiral .item {\n  background: #e0d9ff;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  padding: 16px;\n  text-align: center;\n}\n/* --- Optional extra styling ends here --- */",
      html: "<div class=\"violet-spiral\">\n  <div class=\"item\">Item 1</div>\n  <div class=\"item\">Item 2</div>\n  <div class=\"item\">Item 3</div>\n  <div class=\"item\">Item 4</div>\n  <div class=\"item\">Item 5</div>\n</div>"
    },
    {
      id: "daisy-slant",
      name: "Daisy Slant",
      description: "Overlapping diagonal items with a slanting effect for visual depth",
      columns: "repeat(4, 1fr)",
      rows: "auto",
      columnGap: 24,
      rowGap: 48,
      css: ".daisy-slant {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-auto-rows: auto;\n  grid-gap: 24px 48px;\n  position: relative;\n}\n\n.daisy-slant .item {\n  position: relative;\n  transform: skew(-10deg);\n  grid-column: span 2;\n}\n\n.daisy-slant .item:nth-child(even) {\n  transform: skew(10deg);\n  grid-column: span 3;\n}\n\n/* --- Optional extra styling starts here (remove if not needed) --- */\n.daisy-slant .item {\n  background: #f5f3f3;\n  border: 1px solid #e0e0e0;\n  border-radius: 6px;\n  padding: 16px;\n  text-align: center;\n}\n/* --- Optional extra styling ends here --- */",
      html: "<div class=\"daisy-slant\">\n  <div class=\"item\">Item 1</div>\n  <div class=\"item\">Item 2</div>\n  <div class=\"item\">Item 3</div>\n  <div class=\"item\">Item 4</div>\n  <div class=\"item\">Item 5</div>\n</div>"
    },
    {
      id: "magnolia-horizontal",
      name: "Magnolia Horizontal",
      description: "Items arranged horizontally with occasional vertical overlap",
      columns: "repeat(6, 1fr)",
      rows: "auto",
      columnGap: 16,
      rowGap: 20,
      css: ".magnolia-horizontal {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-auto-rows: auto;\n  grid-gap: 16px 20px;\n  position: relative;\n}\n\n.magnolia-horizontal .item {\n  position: relative;\n  grid-column: span 2;\n}\n\n.magnolia-horizontal .item:nth-child(3n) {\n  grid-column: span 4;\n  transform: rotate(-5deg);\n}\n\n/* --- Optional extra styling starts here (remove if not needed) --- */\n.magnolia-horizontal .item {\n  background: #f7d6e0;\n  border: 1px solid #d1a6b4;\n  border-radius: 10px;\n  padding: 16px;\n  text-align: center;\n}\n/* --- Optional extra styling ends here --- */",
      html: "<div class=\"magnolia-horizontal\">\n  <div class=\"item\">Item 1</div>\n  <div class=\"item\">Item 2</div>\n  <div class=\"item\">Item 3</div>\n  <div class=\"item\">Item 4</div>\n  <div class=\"item\">Item 5</div>\n  <div class=\"item\">Item 6</div>\n</div>"
    }
    
    
  ],

  // Actions
  setColumns: (columns) => {
    set((state) => {
      const columnFractions = state.columnFractions.length === columns 
        ? state.columnFractions
        : Array(columns).fill(1);
      
      return { columns, columnFractions };
    });
  },
  
  setRows: (rows) => {
    set((state) => {
      const rowFractions = state.rowFractions.length === rows 
        ? state.rowFractions
        : Array(rows).fill(1);
      
      return { rows, rowFractions };
    });
  },
  
  setColumnGap: (gap) => set({ columnGap: gap }),
  setRowGap: (gap) => set({ rowGap: gap }),
  
  setColumnFraction: (index, value) => set((state) => {
    const newFractions = [...state.columnFractions];
    newFractions[index] = value;
    return { columnFractions: newFractions };
  }),
  
  setRowFraction: (index, value) => set((state) => {
    const newFractions = [...state.rowFractions];
    newFractions[index] = value;
    return { rowFractions: newFractions };
  }),
  
  resetFractions: () => set((state) => ({
    columnFractions: Array(state.columns).fill(1),
    rowFractions: Array(state.rows).fill(1)
  })),
  
  resetToDefaults: () => set({
    columns: 3,
    rows: 3,
    columnGap: 10,
    rowGap: 10,
    columnFractions: [1, 1, 1],
    rowFractions: [1, 1, 1]
  }),
  
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  
  generateCSS: () => {
    const state = get();
    
    if (state.selectedTemplate) {
      return state.selectedTemplate.css;
    }
    
    const columnValues = state.columnFractions.map(fr => `${fr}fr`).join(' ');
    const rowValues = state.rowFractions.map(fr => `${fr}fr`).join(' ');
    
    return `.grid-container {
  display: grid;
  grid-template-columns: ${columnValues};
  grid-template-rows: ${rowValues};
  grid-column-gap: ${state.columnGap}px;
  grid-row-gap: ${state.rowGap}px;
}`;
  }
})); 