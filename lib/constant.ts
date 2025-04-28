export const SAMPLE_GRID_LAYOUTS = [
    `.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
  }`,
    `.parent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 1.5rem;
  }`,
    `.parent {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: repeat(2, 150px);
    gap: 0.75rem;
  }`,
    `.parent {
    display: grid;
    grid-template-areas: 
      "a a b"
      "c d b"
      "c e e";
    gap: 1rem;
  }
  .parent .item:nth-child(1) { grid-area: a; }
  .parent .item:nth-child(2) { grid-area: b; }
  .parent .item:nth-child(3) { grid-area: c; }
  .parent .item:nth-child(4) { grid-area: d; }
  .parent .item:nth-child(5) { grid-area: e; }`,
  `.parent {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(80px, auto);
    gap: 1rem;
  }
  .parent .item:nth-child(1) {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
  .parent .item:nth-child(2) {
    grid-column: 3 / 5;
    grid-row: 1 / 2;
  }
  .parent .item:nth-child(3) {
    grid-column: 3 / 4;
    grid-row: 2 / 4;
  }
  .parent .item:nth-child(4) {
    grid-column: 4 / 5;
    grid-row: 2 / 4;
  }
  .parent .item:nth-child(5) {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
  }
  
  /* --- Styling begins here (can be removed) --- */
  .parent {
    background-color: #f5f5f5;
    padding: 1.5rem;
    border-radius: 12px;
  }
  .parent .item {
    background-color: #e0f7fa;
    border: 2px solid #4dd0e1;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }
  .parent .item:hover {
    transform: translateY(-4px);
  }`,
  `.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 1rem;
  }
  .parent .item:nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
  .parent .item:nth-child(2) {
    grid-column: 2 / 4;
    grid-row: 1 / 2;
  }
  .parent .item:nth-child(3) {
    grid-column: 2 / 3;
    grid-row: 2 / 4;
  }
  .parent .item:nth-child(4) {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }
  .parent .item:nth-child(5) {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
  }
  
  /* --- Styling begins here (can be removed) --- */
  .parent {
    background-color: #1a1a2e;
    padding: 1.2rem;
    border-radius: 8px;
  }
  .parent .item {
    background-color: #16213e;
    border-left: 5px solid #e94560;
    color: white;
    padding: 1.5rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  }
  .parent .item:nth-child(odd) {
    border-left-color: #0f3460;
  }`,
`
.parent {
  display: grid;
  grid-template-areas:
    "a a b"
    "c b d"
    "c e e";
  gap: 0.8rem;
}
.parent .item:nth-child(1) { grid-area: a; }
.parent .item:nth-child(2) { grid-area: b; }
.parent .item:nth-child(3) { grid-area: c; }
.parent .item:nth-child(4) { grid-area: d; }
.parent .item:nth-child(5) { grid-area: e; }

/* --- Styling begins here (can be removed) --- */
.parent {
  padding: 1rem;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  border-radius: 10px;
}
.parent .item {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(5px);
  border-radius: 6px;
  padding: 1.2rem;
  text-align: center;
  font-weight: bold;
  color: #333;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.parent .item:hover {
  background: white;
  transform: scale(1.02);
}`,
`
.parent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1.2rem;
  grid-template-areas:
    "a a b"
    "c d b"
    "e e e";
}
.parent .item:nth-child(1) { grid-area: a; }
.parent .item:nth-child(2) { grid-area: b; }
.parent .item:nth-child(3) { grid-area: c; }
.parent .item:nth-child(4) { grid-area: d; }
.parent .item:nth-child(5) { grid-area: e; }

/* --- Styling begins here (can be removed) --- */
.parent {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 24px;
}
.parent .item {
  background-color: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #444;
}
.parent .item:nth-child(4) {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  font-weight: bold;
  transform: scale(1.05);
  z-index: 1;
}
`,
`
.parent {
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 1rem;
}
.parent .item:nth-child(1) {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
.parent .item:nth-child(2) {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.parent .item:nth-child(3) {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}
.parent .item:nth-child(4) {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
.parent .item:nth-child(5) {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

/* --- Styling begins here (can be removed) --- */
.parent {
  aspect-ratio: 1/1;
  max-width: 500px;
  margin: 0 auto;
  transform: rotate(45deg);
}
.parent .item {
  background-color: #673ab7;
  border: 2px solid #512da8;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 2rem;
  transform: rotate(-45deg);
}
.parent .item:nth-child(5) {
  background-color: #9c27b0;
  z-index: 2;
}`,
`
.parent {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(80px, auto);
  gap: 0;
}
.parent .item:nth-child(1) {
  grid-column: 1 / 5;
  grid-row: 1 / 3;
}
.parent .item:nth-child(2) {
  grid-column: 3 / 7;
  grid-row: 2 / 4;
}
.parent .item:nth-child(3) {
  grid-column: 1 / 4;
  grid-row: 3 / 5;
}
.parent .item:nth-child(4) {
  grid-column: 2 / 5;
  grid-row: 4 / 6;
}
.parent .item:nth-child(5) {
  grid-column: 4 / 7;
  grid-row: 5 / 7;
}

/* --- Styling begins here (can be removed) --- */
.parent {
  position: relative;
  padding: 2rem;
  background-color: #f0f0f0;
}
.parent .item {
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin: 5px;
  transition: transform 0.3s, box-shadow 0.3s;
}
.parent .item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  z-index: 2;
}`,
`
.parent {
  display: grid;
  grid-template-areas:
    "a a a a a"
    "a b b b a"
    "a b c b a"
    "a b b b a"
    "a a a a a";
  gap: 0.5rem;
}
.parent .item:nth-child(1) { grid-area: a; }
.parent .item:nth-child(2) { grid-area: b; }
.parent .item:nth-child(3) { grid-area: c; }
.parent .item:nth-child(4) { display: none; }
.parent .item:nth-child(5) { display: none; }

/* --- Styling begins here (can be removed) --- */
.parent {
  aspect-ratio: 1/1;
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #121212;
  border-radius: 50%;
}
.parent .item {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  transition: transform 0.3s ease;
}
.parent .item:nth-child(1) {
  background-color: #880e4f;
}
.parent .item:nth-child(2) {
  background-color: #ad1457;
}
.parent .item:nth-child(3) {
  background-color: #d81b60;
}
.parent .item:hover {
  transform: scale(0.97);
}`,
`
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, minmax(80px, auto));
  gap: 1rem;
}
.parent .item:nth-child(1) {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}
.parent .item:nth-child(2) {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
.parent .item:nth-child(3) {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}
.parent .item:nth-child(4) {
  grid-column: 1 / 4;
  grid-row: 2 / 3;
}
.parent .item:nth-child(5) {
  grid-column: 1 / 4;
  grid-row: 3 / 4;
}

/* --- Styling begins here (can be removed) --- */
.parent {
  background-color: #101010;
  padding: 2rem;
  border-radius: 12px;
}
.parent .item {
  background-color: #1e1e1e;
  color: #e0e0e0;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s;
}
.parent .item:nth-child(4) {
  background-color: #003366;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  letter-spacing: 1px;
}
.parent .item:hover {
  background-color: #2a2a2a;
  color: white;
}
.parent .item:nth-child(4):hover {
  background-color: #004080;
}`,
`
.parent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(60px, auto);
  gap: 0.8rem;
}
.parent .item:nth-child(1) {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}
.parent .item:nth-child(2) {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}
.parent .item:nth-child(3) {
  grid-column: 4 / 5;
  grid-row: 2 / 3;
}
.parent .item:nth-child(4) {
  grid-column: 1 / 3;
  grid-row: 3 / 4;
}
.parent .item:nth-child(5) {
  grid-column: 3 / 6;
  grid-row: 3 / 4;
}

/* --- Styling begins here (can be removed) --- */
.parent {
  background: linear-gradient(to bottom, #8e24aa, #5e35b1);
  padding: 2rem;
  border-radius: 16px;
}
.parent .item {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
  color: white;
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.parent .item:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-5px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.3);
}`,
  ];

export const HTML_CODE = ` <div class="parent">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
    <div class="item">Item 4</div>
    <div class="item">Item 5</div>
</div>`;

export const SAMPLE_TEMPLATES = [
    { name: "Classic Grid", id: 1 },
    { name: "Masonry Layout", id: 2 },
    { name: "Magazine Style", id: 3 },
    { name: "Portfolio Grid", id: 4 },
    { name: "Dashboard Layout", id: 5 },
    { name: "Feature Showcase", id: 6 },
    { name: "Gallery Grid", id: 7 },
    { name: "Blog Layout", id: 8 },
  ];