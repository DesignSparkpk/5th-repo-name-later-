// Builds two sample decks for the presentation gig.
// Run from a folder where pptxgenjs, react, react-dom, react-icons and sharp are installed:
//   NODE_PATH=<that folder>/node_modules node build.js
const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");

const HERE = __dirname;
const IMG = (f) => path.join(HERE, "img", f);

async function icon(name, hex, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(fa[name], { color: "#" + hex, size }));
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// icon in a filled circle
async function iconCircle(slide, pres, { x, y, d, fill, iconName, iconHex, name }) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" }, objectName: name + " circle" });
  const pad = d * 0.27;
  slide.addImage({ data: await icon(iconName, iconHex), x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad, objectName: name + " icon", altText: name });
}

const tb = (o) => Object.assign({ isTextBox: true, margin: 0, valign: "top" }, o);

/* ===================================================================== */
/* DECK 1: FreshRoute, startup investor pitch deck                        */
/* ===================================================================== */
async function buildFreshRoute() {
  const THEME = {
    name: "FreshRoute",
    headFontFace: "Arial",
    bodyFontFace: "Calibri",
    colors: {
      dk1: "1B2B22", lt1: "FFFFFF", dk2: "0F3D2E", lt2: "EEF5EF",
      accent1: "1F8A4C", accent2: "B6E35A", accent3: "F2A541", accent4: "5C6F66", accent5: "D9E8DD", accent6: "0B2A20",
      hlink: "1F8A4C", folHlink: "5C6F66",
    },
  };
  const H = THEME.colors;
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "FreshRoute Investor Presentation";
  pres.author = "DesignSpark Studio";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;

  const footer = [
    { text: { text: "FreshRoute · Seed Round 2026", options: { x: 0.6, y: 5.2, w: 5, h: 0.25, fontSize: 10, color: C.accent4 } } },
  ];
  pres.defineSlideMaster({
    title: "FR Title", background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 1.95, w: 4.6, h: 0.95, fontSize: 48, bold: true, color: C.background1, valign: "middle", margin: 0 }, text: "Company name" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 2.95, w: 4.4, h: 0.9, fontSize: 18, color: C.accent5, valign: "top", margin: 0 }, text: "Tagline" } },
    ],
  });
  pres.defineSlideMaster({
    title: "FR Content", background: { color: C.background1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 0.35, w: 8.8, h: 0.75, fontSize: 30, bold: true, color: C.text2, valign: "middle", margin: 0 }, text: "Title" } },
      ...footer,
    ],
    slideNumber: { x: 9.0, y: 5.2, w: 0.4, h: 0.25, fontSize: 10, color: C.accent4, align: "right" },
  });
  pres.defineSlideMaster({
    title: "FR Split", background: { color: C.background1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", align: "left", x: 4.75, y: 0.45, w: 4.75, h: 1.0, fontSize: 30, bold: true, color: C.text2, valign: "middle", margin: 0 }, text: "Title" } },
    ],
    slideNumber: { x: 9.0, y: 5.2, w: 0.4, h: 0.25, fontSize: 10, color: C.accent4, align: "right" },
  });
  pres.defineSlideMaster({
    title: "FR Dark", background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 0.35, w: 8.8, h: 0.75, fontSize: 30, bold: true, color: C.background1, valign: "middle", margin: 0 }, text: "Title" } },
    ],
    slideNumber: { x: 9.0, y: 5.2, w: 0.4, h: 0.25, fontSize: 10, color: C.accent5, align: "right" },
  });

  // 1. Title
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "FR Title", sectionTitle: "Opening" });
  s.addImage({ path: IMG("market.jpg"), x: 5.5, y: 0, w: 4.5, h: 5.625, sizing: { type: "cover", w: 4.5, h: 5.625 }, objectName: "Hero photo", altText: "Fresh vegetables at a market" });
  await iconCircle(s, pres, { x: 0.6, y: 0.75, d: 0.6, fill: C.accent2, iconName: "FaLeaf", iconHex: H.dk2, name: "Logo" });
  s.addText("INVESTOR PRESENTATION · SEED ROUND 2026", tb({ x: 0.6, y: 1.55, w: 4.8, h: 0.3, fontSize: 11, bold: true, color: C.accent2, charSpacing: 2, objectName: "Kicker" }));
  s.addText("FreshRoute", { placeholder: "title" });
  s.addText("Farm-fresh groceries delivered to your door in 60 minutes", { placeholder: "body" });
  s.addText("freshroute.example  ·  hello@freshroute.example", tb({ x: 0.6, y: 4.8, w: 4.8, h: 0.3, fontSize: 11, color: C.accent5, objectName: "Contact" }));

  // 2. Problem
  pres.addSection({ title: "Problem & Solution" });
  s = pres.addSlide({ masterName: "FR Content", sectionTitle: "Problem & Solution" });
  s.addText("Buying fresh food is still broken", { placeholder: "title" });
  const probs = [
    ["40%", "of fresh produce is wasted before it ever reaches a home", "FaTrashAlt"],
    ["3 days", "average age of the \"fresh\" vegetables on supermarket shelves", "FaClock"],
    ["2 hrs", "spent every week by city families on grocery shopping", "FaShoppingBasket"],
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 3.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.4, w: 2.8, h: 3.3, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Problem card ${i + 1}` });
    await iconCircle(s, pres, { x: x + 0.3, y: 1.7, d: 0.6, fill: C.accent1, iconName: probs[i][2], iconHex: "FFFFFF", name: `Problem ${i + 1}` });
    s.addText(probs[i][0], tb({ x: x + 0.3, y: 2.5, w: 2.3, h: 0.85, fontSize: 40, bold: true, color: C.accent1, fontFace: THEME.headFontFace, objectName: `Problem stat ${i + 1}` }));
    s.addText(probs[i][1], tb({ x: x + 0.3, y: 3.4, w: 2.25, h: 1.1, fontSize: 14, color: C.text1, objectName: `Problem text ${i + 1}` }));
  }
  s.addText("Illustrative figures for demonstration", tb({ x: 0.6, y: 4.85, w: 5, h: 0.25, fontSize: 10, italic: true, color: C.accent4, objectName: "Note" }));

  // 3. Solution
  s = pres.addSlide({ masterName: "FR Split", sectionTitle: "Problem & Solution" });
  s.addImage({ path: IMG("produce.jpg"), x: 0, y: 0, w: 4.3, h: 5.625, sizing: { type: "cover", w: 4.3, h: 5.625 }, objectName: "Produce photo", altText: "Fresh produce on shelves" });
  s.addText("FreshRoute fixes the whole chain", { placeholder: "title" });
  const sols = [
    ["FaTractor", "Direct from local farms", "Harvested within 24 hours, with fair prices for farmers"],
    ["FaShippingFast", "Delivered in 60 minutes", "Micro-hubs in every neighbourhood keep it fast"],
    ["FaRecycle", "Zero-waste packaging", "Reusable crates collected on the next delivery"],
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.75 + i * 1.12;
    await iconCircle(s, pres, { x: 4.75, y, d: 0.62, fill: C.background2, iconName: sols[i][0], iconHex: H.accent1, name: `Solution ${i + 1}` });
    s.addText(sols[i][1], tb({ x: 5.55, y: y - 0.02, w: 4.0, h: 0.35, fontSize: 17, bold: true, color: C.text2, objectName: `Solution title ${i + 1}` }));
    s.addText(sols[i][2], tb({ x: 5.55, y: y + 0.36, w: 3.95, h: 0.55, fontSize: 14, color: C.accent4, objectName: `Solution text ${i + 1}` }));
  }

  // 4. How it works
  pres.addSection({ title: "Product & Market" });
  s = pres.addSlide({ masterName: "FR Content", sectionTitle: "Product & Market" });
  s.addText("How it works", { placeholder: "title" });
  const steps = [
    ["FaSeedling", "Farmers list today's harvest", "Partner farms add fresh stock each morning"],
    ["FaMobileAlt", "Customers order in the app", "Pick items or a weekly box in under a minute"],
    ["FaBoxOpen", "We pack at micro-hubs", "Quality-checked and packed within 15 minutes"],
    ["FaMotorcycle", "Delivered in 60 minutes", "Riders deliver with live order tracking"],
  ];
  s.addShape(pres.shapes.LINE, { x: 1.2, y: 2.05, w: 6.9, h: 0, line: { color: H.accent5, width: 2, dashType: "dash" }, objectName: "Process line" });
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * 2.25;
    await iconCircle(s, pres, { x: x + 0.15, y: 1.6, d: 0.9, fill: i === 3 ? C.accent2 : C.accent1, iconName: steps[i][0], iconHex: i === 3 ? H.dk2 : "FFFFFF", name: `Step ${i + 1}` });
    s.addText(`STEP ${i + 1}`, tb({ x, y: 2.75, w: 2.0, h: 0.3, fontSize: 11, bold: true, color: C.accent1, charSpacing: 2, objectName: `Step label ${i + 1}` }));
    s.addText(steps[i][1], tb({ x, y: 3.05, w: 2.0, h: 0.65, fontSize: 16, bold: true, color: C.text2, objectName: `Step title ${i + 1}` }));
    s.addText(steps[i][2], tb({ x, y: 3.75, w: 1.95, h: 0.9, fontSize: 14, color: C.accent4, objectName: `Step text ${i + 1}` }));
  }

  // 5. Market
  s = pres.addSlide({ masterName: "FR Content", sectionTitle: "Product & Market" });
  s.addText("A large and growing market", { placeholder: "title" });
  s.addShape(pres.shapes.OVAL, { x: 0.8, y: 1.3, w: 3.7, h: 3.7, fill: { color: C.background2 }, line: { type: "none" }, objectName: "TAM circle" });
  s.addShape(pres.shapes.OVAL, { x: 1.45, y: 2.25, w: 2.4, h: 2.4, fill: { color: C.accent5 }, line: { type: "none" }, objectName: "SAM circle" });
  s.addShape(pres.shapes.OVAL, { x: 2.0, y: 3.2, w: 1.3, h: 1.3, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "SOM circle" });
  s.addText("TAM", tb({ x: 0.8, y: 1.55, w: 3.7, h: 0.3, fontSize: 12, bold: true, color: C.accent1, align: "center", objectName: "TAM label" }));
  s.addText("SAM", tb({ x: 1.45, y: 2.5, w: 2.4, h: 0.3, fontSize: 12, bold: true, color: C.text2, align: "center", objectName: "SAM label" }));
  s.addText("SOM", tb({ x: 2.0, y: 3.7, w: 1.3, h: 0.3, fontSize: 12, bold: true, color: C.background1, align: "center", objectName: "SOM label" }));
  const mkt = [
    ["$48B", "Total market", "Online grocery across Pakistan and the Gulf", C.accent1],
    ["$6.2B", "Serviceable market", "Fresh produce in the 8 biggest cities", C.accent1],
    ["$310M", "Our 5-year target", "5% share of fresh produce in our cities", C.accent3],
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.45 + i * 1.2;
    s.addText(mkt[i][0], tb({ x: 5.1, y, w: 1.8, h: 0.7, fontSize: 32, bold: true, color: mkt[i][3], fontFace: THEME.headFontFace, objectName: `Market value ${i + 1}` }));
    s.addText(mkt[i][1], tb({ x: 7.0, y: y + 0.02, w: 2.5, h: 0.32, fontSize: 15, bold: true, color: C.text2, objectName: `Market label ${i + 1}` }));
    s.addText(mkt[i][2], tb({ x: 7.0, y: y + 0.36, w: 2.5, h: 0.6, fontSize: 13, color: C.accent4, objectName: `Market text ${i + 1}` }));
  }

  // 6. Business model
  pres.addSection({ title: "Business & Traction" });
  s = pres.addSlide({ masterName: "FR Content", sectionTitle: "Business & Traction" });
  s.addText("Three ways we make money", { placeholder: "title" });
  const biz = [
    ["FaStore", "22%", "Product margin", "Average gross margin on every order"],
    ["FaSyncAlt", "Rs 2,499", "Weekly box subscription", "Predictable monthly revenue from loyal families"],
    ["FaHandshake", "5%", "Farm partner fee", "Small fee on sales from partner farms"],
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 3.0;
    const hl = i === 1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.4, w: 2.8, h: 3.4, rectRadius: 0.12, fill: { color: hl ? C.text2 : C.background2 }, line: { type: "none" }, objectName: `Revenue card ${i + 1}` });
    await iconCircle(s, pres, { x: x + 0.3, y: 1.7, d: 0.6, fill: hl ? C.accent2 : C.accent1, iconName: biz[i][0], iconHex: hl ? H.dk2 : "FFFFFF", name: `Revenue ${i + 1}` });
    s.addText(biz[i][1], tb({ x: x + 0.3, y: 2.55, w: 2.3, h: 0.75, fontSize: 34, bold: true, color: hl ? C.accent2 : C.accent1, fontFace: THEME.headFontFace, objectName: `Revenue value ${i + 1}` }));
    s.addText(biz[i][2], tb({ x: x + 0.3, y: 3.35, w: 2.3, h: 0.35, fontSize: 16, bold: true, color: hl ? C.background1 : C.text2, objectName: `Revenue label ${i + 1}` }));
    s.addText(biz[i][3], tb({ x: x + 0.3, y: 3.75, w: 2.25, h: 0.8, fontSize: 14, color: hl ? C.accent5 : C.accent4, objectName: `Revenue text ${i + 1}` }));
  }

  // 7. Traction
  s = pres.addSlide({ masterName: "FR Content", sectionTitle: "Business & Traction" });
  s.addText("Strong early traction", { placeholder: "title" });
  const stats = [["15,800", "orders last month"], ["28%", "average monthly growth"], ["4.8 ★", "app store rating"]];
  for (let i = 0; i < 3; i++) {
    const y = 1.35 + i * 1.2;
    s.addText(stats[i][0], tb({ x: 0.6, y, w: 2.9, h: 0.65, fontSize: 34, bold: true, color: C.accent1, fontFace: THEME.headFontFace, objectName: `Traction stat ${i + 1}` }));
    s.addText(stats[i][1], tb({ x: 0.6, y: y + 0.65, w: 2.9, h: 0.35, fontSize: 14, color: C.accent4, objectName: `Traction label ${i + 1}` }));
  }
  s.addChart(pres.charts.LINE, [{ name: "Monthly orders", labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"], values: [1200, 1900, 2600, 3400, 4800, 6100, 7900, 9600, 12400, 15800] }], {
    x: 3.8, y: 1.3, w: 5.7, h: 3.6, objectName: "Orders chart",
    showTitle: true, title: "Monthly orders, 2026", titleFontSize: 14, titleColor: H.dk2, titleFontFace: "+mn-lt",
    chartColors: [H.accent1], lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 7,
    catAxisLabelColor: H.accent4, valAxisLabelColor: H.accent4, catAxisLabelFontSize: 11, valAxisLabelFontSize: 11,
    catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt", valAxisLabelFormatCode: "#,##0",
    valGridLine: { color: "E3ECE5", size: 1 }, catGridLine: { style: "none" }, showLegend: false,
  });

  // 8. Competition
  s = pres.addSlide({ masterName: "FR Content", sectionTitle: "Business & Traction" });
  s.addText("Why we win", { placeholder: "title" });
  const yes = { text: "✓", options: { color: H.accent1, bold: true } };
  const no = { text: "—", options: { color: "A9B5AE" } };
  const hdr = (t, hl) => ({ text: t, options: { bold: true, color: hl ? "FFFFFF" : H.dk2, fill: { color: hl ? H.accent1 : H.lt2 }, align: hl ? "center" : "center" } });
  const rows = [
    [{ text: "", options: { fill: { color: H.lt2 } } }, hdr("FreshRoute", true), hdr("Supermarkets"), hdr("Delivery apps")],
    ["Harvested within 24 hours", yes, no, no],
    ["Delivered in 60 minutes", yes, no, yes],
    ["Fair prices for farmers", yes, no, no],
    ["Zero-waste packaging", yes, no, no],
    ["Weekly subscription boxes", yes, no, yes],
  ].map((r, ri) => r.map((c, ci) => {
    const cell = typeof c === "string" ? { text: c, options: {} } : { text: c.text, options: Object.assign({}, c.options) };
    if (ri > 0 && ci > 0) { cell.options.align = "center"; cell.options.fontSize = 18; if (ci === 1) cell.options.fill = { color: "E4F2E8" }; }
    if (ri > 0 && ci === 0) { cell.options.bold = true; cell.options.color = H.dk2; }
    return cell;
  }));
  s.addTable(rows, { x: 0.6, y: 1.35, w: 8.8, colW: [3.4, 1.8, 1.8, 1.8], rowH: 0.55, fontSize: 14, fontFace: THEME.bodyFontFace, color: H.dk1, valign: "middle", border: { type: "solid", color: "E3ECE5", pt: 1 }, objectName: "Comparison table" });

  // 9. Team
  pres.addSection({ title: "Team & Ask" });
  s = pres.addSlide({ masterName: "FR Content", sectionTitle: "Team & Ask" });
  s.addText("The team", { placeholder: "title" });
  const team = [["AK", "Ayesha Khan", "CEO", "Ran city operations at a ride-hailing company for 8 years"], ["BA", "Bilal Ahmed", "CTO", "Built consumer apps used by 2 million people"], ["SM", "Sara Malik", "Head of Supply", "Agri-economist working with 120+ farms"], ["OF", "Omar Farooq", "Head of Growth", "Scaled three direct-to-consumer brands"]];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * 2.25;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.4, w: 2.05, h: 3.35, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Team card ${i + 1}` });
    s.addShape(pres.shapes.OVAL, { x: x + 0.55, y: 1.65, w: 0.95, h: 0.95, fill: { color: i === 0 ? C.accent2 : C.accent1 }, line: { type: "none" }, objectName: `Avatar ${i + 1}` });
    s.addText(team[i][0], tb({ x: x + 0.55, y: 1.65, w: 0.95, h: 0.95, fontSize: 20, bold: true, color: i === 0 ? C.text2 : C.background1, align: "center", valign: "middle", objectName: `Initials ${i + 1}` }));
    s.addText(team[i][1], tb({ x: x + 0.15, y: 2.8, w: 1.75, h: 0.35, fontSize: 15, bold: true, color: C.text2, align: "center", objectName: `Name ${i + 1}` }));
    s.addText(team[i][2], tb({ x: x + 0.15, y: 3.15, w: 1.75, h: 0.3, fontSize: 12, bold: true, color: C.accent1, align: "center", objectName: `Role ${i + 1}` }));
    s.addText(team[i][3], tb({ x: x + 0.15, y: 3.5, w: 1.75, h: 1.1, fontSize: 12, color: C.accent4, align: "center", objectName: `Bio ${i + 1}` }));
  }

  // 10. The Ask
  s = pres.addSlide({ masterName: "FR Dark", sectionTitle: "Team & Ask" });
  s.addText("The ask", { placeholder: "title" });
  s.addText("Raising", tb({ x: 0.6, y: 1.45, w: 4, h: 0.35, fontSize: 16, color: C.accent5, objectName: "Raising label" }));
  s.addText("$1.5M seed", tb({ x: 0.6, y: 1.8, w: 4.4, h: 0.85, fontSize: 44, bold: true, color: C.accent2, fontFace: THEME.headFontFace, objectName: "Raise amount" }));
  s.addText("18 months of runway to launch in 5 cities and reach 100,000 monthly orders.", tb({ x: 0.6, y: 2.8, w: 4.0, h: 0.9, fontSize: 16, color: C.background1, objectName: "Raise text" }));
  s.addText("hello@freshroute.example", tb({ x: 0.6, y: 4.3, w: 4, h: 0.35, fontSize: 14, bold: true, color: C.accent2, objectName: "Email" }));
  s.addChart(pres.charts.DOUGHNUT, [{ name: "Use of funds", labels: ["Product & tech 40%", "Marketing 30%", "Operations 20%", "Team 10%"], values: [40, 30, 20, 10] }], {
    x: 5.0, y: 1.2, w: 4.5, h: 3.8, objectName: "Use of funds chart", holeSize: 58,
    showTitle: true, title: "Use of funds", titleColor: "FFFFFF", titleFontSize: 14, titleFontFace: "+mn-lt",
    chartColors: [H.accent2, H.accent1, H.accent3, H.accent5],
    showPercent: false, showValue: false, showLabel: false,
    showLegend: true, legendPos: "r", legendColor: "FFFFFF", legendFontSize: 13, legendFontFace: "+mn-lt",
  });

  const out = path.join(HERE, "FreshRoute-Pitch-Deck.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  return out;
}

/* ===================================================================== */
/* DECK 2: Apex Build & Engineering, company profile                     */
/* ===================================================================== */
async function buildApex() {
  const THEME = {
    name: "Apex Build",
    headFontFace: "Arial",
    bodyFontFace: "Calibri",
    colors: {
      dk1: "141A26", lt1: "FFFFFF", dk2: "0E1A2B", lt2: "F1F4F8",
      accent1: "F2A900", accent2: "2E5C8A", accent3: "8A97A8", accent4: "5A6678", accent5: "C9D3DF", accent6: "263B55",
      hlink: "2E5C8A", folHlink: "5A6678",
    },
  };
  const H = THEME.colors;
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Apex Build and Engineering Company Profile";
  pres.author = "DesignSpark Studio";
  pres.company = "Apex Build &amp; Engineering";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;

  pres.defineSlideMaster({
    title: "AX Title", background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 1.9, w: 6.5, h: 1.3, fontSize: 44, bold: true, color: C.background1, valign: "bottom", margin: 0 }, text: "Company name" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 3.35, w: 6, h: 0.5, fontSize: 18, color: C.accent5, valign: "top", margin: 0 }, text: "Tagline" } },
    ],
  });
  const axFooter = { text: { text: "Apex Build & Engineering · Company Profile", options: { x: 0.6, y: 5.2, w: 5, h: 0.25, fontSize: 10, color: C.accent3 } } };
  pres.defineSlideMaster({
    title: "AX Content", background: { color: C.background1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 0.35, w: 8.8, h: 0.75, fontSize: 30, bold: true, color: C.text2, valign: "middle", margin: 0 }, text: "Title" } },
      axFooter,
    ],
    slideNumber: { x: 9.0, y: 5.2, w: 0.4, h: 0.25, fontSize: 10, color: C.accent3, align: "right" },
  });
  pres.defineSlideMaster({
    title: "AX Light", background: { color: C.background2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 0.35, w: 8.8, h: 0.75, fontSize: 30, bold: true, color: C.text2, valign: "middle", margin: 0 }, text: "Title" } },
      axFooter,
    ],
    slideNumber: { x: 9.0, y: 5.2, w: 0.4, h: 0.25, fontSize: 10, color: C.accent3, align: "right" },
  });
  pres.defineSlideMaster({
    title: "AX Split", background: { color: C.background1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", align: "left", x: 4.75, y: 0.45, w: 4.75, h: 1.0, fontSize: 30, bold: true, color: C.text2, valign: "middle", margin: 0 }, text: "Title" } },
    ],
    slideNumber: { x: 9.0, y: 5.2, w: 0.4, h: 0.25, fontSize: 10, color: C.accent3, align: "right" },
  });
  pres.defineSlideMaster({
    title: "AX Dark", background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 0.9, w: 5.2, h: 1.5, fontSize: 36, bold: true, color: C.background1, valign: "top", margin: 0 }, text: "Title" } },
    ],
  });

  // 1. Title
  pres.addSection({ title: "Introduction" });
  let s = pres.addSlide({ masterName: "AX Title", sectionTitle: "Introduction" });
  s.addImage({ path: IMG("towers.jpg"), x: 0, y: 0, w: 10, h: 5.625, sizing: { type: "cover", w: 10, h: 5.625 }, objectName: "Background photo", altText: "Office towers" });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.text2, transparency: 18 }, line: { type: "none" }, objectName: "Photo overlay" });
  await iconCircle(s, pres, { x: 0.6, y: 0.7, d: 0.62, fill: C.accent1, iconName: "FaHardHat", iconHex: H.dk2, name: "Logo" });
  s.addText("COMPANY PROFILE 2026", tb({ x: 0.6, y: 1.55, w: 5, h: 0.3, fontSize: 12, bold: true, color: C.accent1, charSpacing: 3, objectName: "Kicker" }));
  s.addText("Apex Build & Engineering", { placeholder: "title" });
  s.addText("Building landmarks since 2004", { placeholder: "body" });
  s.addText("apexbuild.example", tb({ x: 0.6, y: 4.8, w: 4, h: 0.3, fontSize: 12, color: C.accent5, objectName: "Website" }));

  // 2. About
  s = pres.addSlide({ masterName: "AX Content", sectionTitle: "Introduction" });
  s.addText("Who we are", { placeholder: "title" });
  s.addText([
    { text: "Apex Build & Engineering is a full-service construction company delivering commercial, residential and infrastructure projects across the region.", options: { breakLine: true, paraSpaceAfter: 10 } },
    { text: "For more than two decades, clients have trusted us to deliver complex projects safely, on time and on budget.", options: {} },
  ], tb({ x: 0.6, y: 1.4, w: 4.2, h: 2.6, fontSize: 16, color: C.text1, objectName: "About text" }));
  const ab = [["22", "years of experience"], ["340+", "projects delivered"], ["1,200", "engineers and staff"], ["98%", "projects on time"]];
  for (let i = 0; i < 4; i++) {
    const x = 5.25 + (i % 2) * 2.15, y = 1.4 + Math.floor(i / 2) * 1.75;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.0, h: 1.55, rectRadius: 0.1, fill: { color: i === 0 ? C.text2 : C.background2 }, line: { type: "none" }, objectName: `Stat card ${i + 1}` });
    s.addText(ab[i][0], tb({ x: x + 0.25, y: y + 0.25, w: 1.6, h: 0.65, fontSize: 32, bold: true, color: C.accent1, fontFace: THEME.headFontFace, objectName: `Stat ${i + 1}` }));
    s.addText(ab[i][1], tb({ x: x + 0.25, y: y + 0.92, w: 1.6, h: 0.5, fontSize: 13, color: i === 0 ? C.background1 : C.accent4, objectName: `Stat label ${i + 1}` }));
  }

  // 3. Mission, vision, values
  s = pres.addSlide({ masterName: "AX Light", sectionTitle: "Introduction" });
  s.addText("What drives us", { placeholder: "title" });
  const mvv = [["FaBullseye", "Our mission", "To build safe, lasting structures that improve how people live and work."], ["FaEye", "Our vision", "To be the region's most trusted name in construction and engineering."], ["FaGem", "Our values", "Safety first, honest work, quality in every detail, and respect for people."]];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 3.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.4, w: 2.8, h: 3.35, rectRadius: 0.1, fill: { color: C.background1 }, line: { type: "none" }, shadow: { type: "outer", color: "0E1A2B", opacity: 0.12, blur: 12, offset: 3, angle: 90 }, objectName: `Value card ${i + 1}` });
    await iconCircle(s, pres, { x: x + 0.3, y: 1.7, d: 0.7, fill: C.accent1, iconName: mvv[i][0], iconHex: H.dk2, name: `Value ${i + 1}` });
    s.addText(mvv[i][1], tb({ x: x + 0.3, y: 2.6, w: 2.3, h: 0.4, fontSize: 18, bold: true, color: C.text2, objectName: `Value title ${i + 1}` }));
    s.addText(mvv[i][2], tb({ x: x + 0.3, y: 3.05, w: 2.25, h: 1.5, fontSize: 14, color: C.accent4, objectName: `Value text ${i + 1}` }));
  }

  // 4. Services
  pres.addSection({ title: "What we do" });
  s = pres.addSlide({ masterName: "AX Content", sectionTitle: "What we do" });
  s.addText("Our services", { placeholder: "title" });
  const svc = [["FaBuilding", "General contracting", "End-to-end delivery of commercial and residential buildings"], ["FaDraftingCompass", "Design & build", "One team from first sketch to final handover"], ["FaRoad", "Civil infrastructure", "Roads, bridges, water and drainage networks"], ["FaTasks", "Project management", "Cost, schedule and quality control for owners"], ["FaBolt", "MEP engineering", "Mechanical, electrical and plumbing systems"], ["FaPaintRoller", "Renovation & fit-out", "Upgrades for offices, retail and hospitals"]];
  for (let i = 0; i < 6; i++) {
    const x = 0.6 + (i % 3) * 3.0, y = 1.35 + Math.floor(i / 3) * 1.8;
    await iconCircle(s, pres, { x, y, d: 0.62, fill: C.background2, iconName: svc[i][0], iconHex: H.accent2, name: `Service ${i + 1}` });
    s.addText(svc[i][1], tb({ x, y: y + 0.75, w: 2.7, h: 0.35, fontSize: 16, bold: true, color: C.text2, objectName: `Service title ${i + 1}` }));
    s.addText(svc[i][2], tb({ x, y: y + 1.1, w: 2.6, h: 0.6, fontSize: 13, color: C.accent4, objectName: `Service text ${i + 1}` }));
  }

  // 5. Process
  s = pres.addSlide({ masterName: "AX Light", sectionTitle: "What we do" });
  s.addText("How we deliver", { placeholder: "title" });
  const proc = [["Consult", "We understand your goals, site and budget"], ["Design", "Architects and engineers shape the plan"], ["Plan", "Detailed schedule, costs and approvals"], ["Build", "Safe, quality-controlled construction"], ["Handover", "Inspection, keys and after-care support"]];
  s.addShape(pres.shapes.LINE, { x: 0.95, y: 2.0, w: 7.5, h: 0, line: { color: H.accent5, width: 3 }, objectName: "Timeline" });
  for (let i = 0; i < 5; i++) {
    const x = 0.6 + i * 1.8;
    s.addShape(pres.shapes.OVAL, { x: x + 0.05, y: 1.6, w: 0.8, h: 0.8, fill: { color: i === 4 ? C.accent1 : C.text2 }, line: { color: H.lt2, width: 4 }, objectName: `Timeline dot ${i + 1}` });
    s.addText(String(i + 1).padStart(2, "0"), tb({ x: x + 0.05, y: 1.6, w: 0.8, h: 0.8, fontSize: 18, bold: true, color: i === 4 ? C.text2 : C.accent1, align: "center", valign: "middle", objectName: `Timeline number ${i + 1}` }));
    s.addText(proc[i][0], tb({ x, y: 2.65, w: 1.65, h: 0.4, fontSize: 17, bold: true, color: C.text2, objectName: `Phase ${i + 1}` }));
    s.addText(proc[i][1], tb({ x, y: 3.1, w: 1.6, h: 1.2, fontSize: 13, color: C.accent4, objectName: `Phase text ${i + 1}` }));
  }

  // 6. Portfolio by sector
  pres.addSection({ title: "Our work" });
  s = pres.addSlide({ masterName: "AX Content", sectionTitle: "Our work" });
  s.addText("A diverse portfolio", { placeholder: "title" });
  s.addChart(pres.charts.DOUGHNUT, [{ name: "Projects by sector", labels: ["Commercial 35%", "Residential 25%", "Infrastructure 20%", "Industrial 12%", "Healthcare & education 8%"], values: [35, 25, 20, 12, 8] }], {
    x: 0.5, y: 1.2, w: 4.6, h: 3.8, objectName: "Sector chart", holeSize: 55,
    showTitle: true, title: "Projects by sector", titleFontSize: 14, titleColor: H.dk2, titleFontFace: "+mn-lt",
    chartColors: [H.dk2, H.accent2, H.accent1, H.accent3, H.accent5],
    showPercent: false, showValue: false, showLabel: false,
    showLegend: true, legendPos: "r", legendFontSize: 12, legendColor: H.accent4, legendFontFace: "+mn-lt",
  });
  const ins = [["FaBuilding", "Commercial leads", "Office towers and retail make up a third of our work."], ["FaRoad", "Growing in infrastructure", "Public infrastructure doubled over the last five years."], ["FaHardHat", "Trusted on complex builds", "Hospitals and schools need the strictest standards."]];
  for (let i = 0; i < 3; i++) {
    const y = 1.4 + i * 1.15;
    await iconCircle(s, pres, { x: 5.5, y, d: 0.55, fill: C.background2, iconName: ins[i][0], iconHex: H.accent2, name: `Insight ${i + 1}` });
    s.addText(ins[i][1], tb({ x: 6.25, y: y - 0.02, w: 3.25, h: 0.35, fontSize: 16, bold: true, color: C.text2, objectName: `Insight title ${i + 1}` }));
    s.addText(ins[i][2], tb({ x: 6.25, y: y + 0.34, w: 3.2, h: 0.6, fontSize: 13, color: C.accent4, objectName: `Insight text ${i + 1}` }));
  }

  // 7. Featured projects
  s = pres.addSlide({ masterName: "AX Light", sectionTitle: "Our work" });
  s.addText("Featured projects", { placeholder: "title" });
  const projs = [["site.jpg", "Harbor View Towers", "42-storey mixed-use towers · 2024"], ["team-site.jpg", "Northern Bypass Bridge", "1.2 km highway bridge · 2023"], ["blueprints.jpg", "Lakeside Medical Center", "300-bed hospital · 2022"]];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 3.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.35, w: 2.8, h: 3.45, rectRadius: 0.1, fill: { color: C.background1 }, line: { type: "none" }, shadow: { type: "outer", color: "0E1A2B", opacity: 0.12, blur: 12, offset: 3, angle: 90 }, objectName: `Project card ${i + 1}` });
    s.addImage({ path: IMG(projs[i][0]), x, y: 1.35, w: 2.8, h: 2.1, sizing: { type: "cover", w: 2.8, h: 2.1 }, objectName: `Project photo ${i + 1}`, altText: projs[i][1] });
    s.addText(projs[i][1], tb({ x: x + 0.25, y: 3.65, w: 2.35, h: 0.4, fontSize: 16, bold: true, color: C.text2, objectName: `Project title ${i + 1}` }));
    s.addText(projs[i][2], tb({ x: x + 0.25, y: 4.05, w: 2.35, h: 0.55, fontSize: 13, color: C.accent4, objectName: `Project text ${i + 1}` }));
  }

  // 8. Why choose us
  pres.addSection({ title: "Why Apex" });
  s = pres.addSlide({ masterName: "AX Split", sectionTitle: "Why Apex" });
  s.addImage({ path: IMG("drafting.jpg"), x: 0, y: 0, w: 4.3, h: 5.625, sizing: { type: "cover", w: 4.3, h: 5.625 }, objectName: "Engineer photo", altText: "Engineer reviewing drawings" });
  s.addText("Why clients choose Apex", { placeholder: "title" });
  const why = [["FaShieldAlt", "Safety first", "Zero major incidents in the last three years"], ["FaCertificate", "Certified quality", "ISO 9001 quality management on every site"], ["FaCalendarCheck", "On time, on budget", "98% of projects delivered on schedule"], ["FaSeedling", "Sustainable building", "Energy-efficient design and responsible materials"]];
  for (let i = 0; i < 4; i++) {
    const y = 1.85 + i * 0.85;
    await iconCircle(s, pres, { x: 4.75, y, d: 0.55, fill: C.accent1, iconName: why[i][0], iconHex: H.dk2, name: `Reason ${i + 1}` });
    s.addText(why[i][1], tb({ x: 5.5, y: y - 0.03, w: 4.0, h: 0.32, fontSize: 16, bold: true, color: C.text2, objectName: `Reason title ${i + 1}` }));
    s.addText(why[i][2], tb({ x: 5.5, y: y + 0.3, w: 4.0, h: 0.4, fontSize: 13, color: C.accent4, objectName: `Reason text ${i + 1}` }));
  }

  // 9. Testimonial
  s = pres.addSlide({ masterName: "AX Light", sectionTitle: "Why Apex" });
  s.addText("What our clients say", { placeholder: "title" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.35, w: 8.8, h: 2.55, rectRadius: 0.12, fill: { color: C.background1 }, line: { type: "none" }, shadow: { type: "outer", color: "0E1A2B", opacity: 0.12, blur: 12, offset: 3, angle: 90 }, objectName: "Quote card" });
  s.addImage({ data: await icon("FaQuoteLeft", H.accent1), x: 1.0, y: 1.7, w: 0.55, h: 0.55, objectName: "Quote mark", altText: "Quote" });
  s.addText("Apex delivered our 42-storey towers two weeks ahead of schedule, with a safety record we have never seen on a project this size. They are our first call for every new development.", tb({ x: 1.85, y: 1.7, w: 7.1, h: 1.35, fontSize: 18, italic: true, color: C.text2, objectName: "Quote text" }));
  s.addText([{ text: "Daniel Price", options: { bold: true, color: H.dk2, breakLine: true } }, { text: "Director, Harbor Developments", options: { color: H.accent4 } }], tb({ x: 1.85, y: 3.1, w: 6, h: 0.6, fontSize: 14, objectName: "Quote author" }));
  s.addText("TRUSTED BY", tb({ x: 0.6, y: 4.15, w: 3, h: 0.3, fontSize: 11, bold: true, color: C.accent3, charSpacing: 3, objectName: "Clients label" }));
  ["Harbor Developments", "Metro Transit", "Lakeside Health", "Northgate Retail"].forEach((n, i) => s.addText(n, tb({ x: 0.6 + i * 2.2, y: 4.5, w: 2.1, h: 0.4, fontSize: 15, bold: true, color: C.accent3, objectName: `Client ${i + 1}` })));

  // 10. Contact
  s = pres.addSlide({ masterName: "AX Dark", sectionTitle: "Why Apex" });
  s.addImage({ path: IMG("team-site.jpg"), x: 6.0, y: 0, w: 4.0, h: 5.625, sizing: { type: "cover", w: 4.0, h: 5.625 }, objectName: "Team photo", altText: "Construction team on site" });
  s.addText("Let's build something great together", { placeholder: "title" });
  const ct = [["FaMapMarkerAlt", "Plot 12, Business District, Islamabad"], ["FaPhoneAlt", "+92 51 000 0000"], ["FaEnvelope", "projects@apexbuild.example"], ["FaGlobe", "apexbuild.example"]];
  for (let i = 0; i < 4; i++) {
    const y = 2.65 + i * 0.55;
    await iconCircle(s, pres, { x: 0.6, y, d: 0.4, fill: C.accent1, iconName: ct[i][0], iconHex: H.dk2, name: `Contact ${i + 1}` });
    s.addText(ct[i][1], tb({ x: 1.2, y: y + 0.04, w: 4.5, h: 0.35, fontSize: 15, color: C.background1, objectName: `Contact text ${i + 1}` }));
  }

  const out = path.join(HERE, "Apex-Company-Profile.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  return out;
}

(async () => {
  console.log(await buildFreshRoute());
  console.log(await buildApex());
})().catch((e) => { console.error(e); process.exit(1); });
