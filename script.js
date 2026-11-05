/* =========================================================================
   PORTFOLIO_DATA — edit only this. Name, links, bio, stack and projects.
   ========================================================================= */
const PORTFOLIO_DATA = {
  name: "Juniar Arif",                         // <- your real name or alias
  role: "Mobile app developer and software engineer",
  status: "Available for projects",
  bio: "I build Android and cross-platform apps with Kotlin, C++ and React, backed by Node.js and Python. I care about fast startup, low memory use and code that is easy to maintain.",
  typed: ["Android apps in Kotlin and React.", "Native modules in C++.", "APIs and automation in Node.js and Python.", "Fast startup, low memory, clean code."], // lines typed under your role
  github: "https://github.com/rikooo3", // <- your GitHub profile
  email: "juniararifpratama01@gmail.com",               // <- your Gmail
  contactLead: "Hiring or have a project in mind?",
  stack: [
    ["Mobile and native", "Kotlin, C++, React"],
    ["Backend and scripting", "Node.js, Python, JavaScript"]
  ],
  /* PROJECTS. source: "public" (GitHub) or "private" (closed source).
     github: URL or null. live: URL or null. notes: optional list, shown for private projects. */
  projects: [
    { title: "Hybrid Music Streaming App", source: "private",
      summary: " Unavailable",
      stack: ["React", "Kotlin"], github: null, live: null,
      shots: [], // add screenshots as { src: "data:image/webp;base64,...", alt: "Home screen" }
      notes: ["React interface inside a Kotlin Android shell, connected through a native bridge.", "Read-through cache cuts repeat database reads on cold and warm starts.", "Artwork loads near the viewport and is decoded at display size to keep memory low.", "Playback state lives natively and is mirrored to the UI."] },
    { title: "Website Wisata Indonesia", source: "public",
      summary: "The website I created for a school assignment, about a site about Indonesian tourism",
      stack: ["HTML, JavaScript"], github: "https://github.com/rikooo3/Wisataindonesia-host", live: null },
    { title: "Project Three", source: "public",
      summary: "Replace with a short description of this full-stack project.",
      stack: ["Node.js", "JavaScript", "React"], github: "https://github.com/yourusername/project-three", live: null }
  ]
};

/* ============================ Rendering ============================ */
const D = PORTFOLIO_DATA, $ = s => document.querySelector(s);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
document.title = D.name + " — " + D.role;
$("#hName").textContent = D.name; $("#role").textContent = D.role;
const h1 = $("#name"); let ci = 0; h1.setAttribute("aria-label", D.name);
D.name.split(" ").forEach((w, wi, a) => { const ws = document.createElement("span"); ws.className = "w"; ws.setAttribute("aria-hidden", "true"); [...w].forEach(c => { const s = document.createElement("span"); s.className = "ch"; s.style.setProperty("--i", ci++); s.textContent = c; ws.appendChild(s); }); h1.appendChild(ws); if (wi < a.length - 1) h1.appendChild(document.createTextNode(" ")); });
$("#bio").textContent = D.bio; $("#status").textContent = D.status; $("#cLead").textContent = D.contactLead;
$("#gh").href = $("#gh2").href = D.github;
$("#mail").textContent = D.email; $("#mail").href = $("#send").href = "mailto:" + D.email;
$("#foot").textContent = "© " + new Date().getFullYear() + " " + D.name;
$("#stackList").innerHTML = D.stack.map(r => "<dt>" + esc(r[0]) + "</dt><dd>" + r[1].split(", ").map(t => '<button class="tech" data-t="' + esc(t) + '">' + esc(t) + "<sup>" + D.projects.filter(p => p.stack.includes(t)).length + "</sup></button>").join("") + "</dd>").join("");
const A = ' <span class="arr">↗</span>';
$("#projects").innerHTML = D.projects.map((p, pi) => {
  const priv = p.source === "private";
  const shots = (p.shots || []).length ? '<div class="shots">' + p.shots.map((s, k) => { const o = typeof s === "string" ? { src: s } : s; return '<button class="shot" data-p="' + pi + '" data-k="' + k + '" aria-label="View screenshot ' + (k + 1) + '"><img loading="lazy" decoding="async" src="' + o.src + '" alt="' + esc(o.alt || p.title + " screenshot " + (k + 1)) + '"></button>'; }).join("") + "</div>" : "";
  const links = (p.github ? '<a href="' + p.github + '" target="_blank" rel="noopener">Source code' + A + "</a>" : "") + (p.live ? '<a href="' + p.live + '" target="_blank" rel="noopener">Live' + A + "</a>" : "");
  return '<article class="proj"><h3>' + esc(p.title) + '<span class="src ' + (priv ? "" : "pub") + '">' + (priv ? "Private source" : "Open source") + "</span></h3>" +
    '<div class="plinks">' + links + "</div><p>" + esc(p.summary) + '</p><div class="tags">' + p.stack.map(s => '<button class="tg" data-t="' + esc(s) + '">' + esc(s) + "</button>").join("") + "</div>" + shots +
    (p.notes ? '<div class="how"><button class="hbtn" aria-expanded="false"><span class="pl">+</span>How it’s built</button><div class="hbody"><div><ul>' + p.notes.map(n => "<li>" + esc(n) + "</li>").join("") + "</ul></div></div></div>" : "") + "</article>";
}).join("");

let tt; function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 2200); }
async function copyEmail() {
  let ok = false;
  try { await navigator.clipboard.writeText(D.email); ok = true; } catch (e) {
    try { const t = document.createElement("textarea"); t.value = D.email; t.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(t); t.select(); ok = document.execCommand("copy"); t.remove(); } catch (e2) {}
  }
  toast(ok ? "Email copied to clipboard" : "Copy blocked. Email: " + D.email); return ok;
}
$("#copy").onclick = copyEmail;
$("#copy2").onclick = async () => { const b = $("#copy2"), o = b.textContent; if (await copyEmail()) { b.textContent = "✓ Copied"; setTimeout(() => b.textContent = o, 1800); } };

/* Technology -> projects: hover (mouse) or tap/Enter to lock */
let lock = null, hov = null;
const techs = [...document.querySelectorAll(".tech")], rowsEl = [...document.querySelectorAll(".proj")];
function paint() { const a = hov || lock; techs.forEach(b => { b.classList.toggle("on", b.dataset.t === a); b.setAttribute("aria-pressed", lock === b.dataset.t); }); rowsEl.forEach((r, i) => { const m = !!a && D.projects[i].stack.includes(a); r.classList.toggle("hit", m); r.classList.toggle("dim", !!a && !m); }); }
techs.forEach(b => { b.onpointerenter = e => { if (e.pointerType === "mouse") { hov = b.dataset.t; paint(); } }; b.onpointerleave = e => { if (e.pointerType === "mouse") { hov = null; paint(); } }; b.onclick = () => { lock = lock === b.dataset.t ? null : b.dataset.t; paint(); }; });

/* Hero field: a grid of small marks that turn toward the pointer and drift on their own when idle */
(function () {
  const cv = $("#field"), cx = cv.getContext("2d"), S = 30, R = 320;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W, H, cols, rows, ang, dpr, mx = null, my = null, vis = true, rip = [];
  const idle = (x, y, t) => Math.sin(x * .006 + t * .0003 + scrollY * .003) * 1.6 + Math.cos(y * .008 - t * .00025 - scrollY * .002) * 1.6;
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; if (!W || !H) return;
    cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(W / S) + 1; rows = Math.ceil(H / S) + 1; ang = new Float32Array(cols * rows);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) ang[r * cols + c] = idle(c * S, r * S, 0);
    frame(0);
  }
  function frame(t) {
    if (!ang) return; rip = rip.filter(q => t - q.t < 1800); cx.clearRect(0, 0, W, H); cx.lineCap = "round"; cx.lineWidth = 1.2;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = c * S, y = r * S, i = r * cols + c; let tg = idle(x, y, t), w = 0;
      if (mx !== null) { const dx = mx - x, dy = my - y, d = Math.hypot(dx, dy); if (d < R) { w = 1 - d / R; w = w * w * (3 - 2 * w); const to = Math.atan2(dy, dx); tg += Math.atan2(Math.sin(to - tg), Math.cos(to - tg)) * w; } }
      for (const q of rip) { const age = t - q.t, ring = Math.abs(Math.hypot(x - q.x, y - q.y) - age * .45); if (ring < 70) { const k = (1 - ring / 70) * Math.max(0, 1 - age / 1800); tg += k * 1.4; w = Math.max(w, k); } }
      let da = tg - ang[i]; da = Math.atan2(Math.sin(da), Math.cos(da)); ang[i] += da * .14;
      const L = (6 + 8 * w) / 2, hx = Math.cos(ang[i]) * L, hy = Math.sin(ang[i]) * L;
      cx.strokeStyle = "rgba(250,250,250," + (.16 + .6 * w).toFixed(2) + ")";
      cx.beginPath(); cx.moveTo(x - hx, y - hy); cx.lineTo(x + hx, y + hy); cx.stroke();
    }
    cv.classList.add("on");
  }
  size(); new ResizeObserver(size).observe(cv);
  if (still) return;
  new IntersectionObserver(e => vis = e[0].isIntersecting).observe(cv);
  addEventListener("pointermove", e => { const b = cv.getBoundingClientRect(); mx = e.clientX - b.left; my = e.clientY - b.top; if (my < 0 || my > b.height) mx = null; });
  addEventListener("pointerdown", e => { if (e.target.closest("a,button,summary")) return; const b = cv.getBoundingClientRect(), y = e.clientY - b.top; if (y < 0 || y > b.height) return; rip.push({ x: e.clientX - b.left, y, t: performance.now() }); });
  addEventListener("pointerup", e => { if (e.pointerType !== "mouse") mx = null; });
  document.documentElement.addEventListener("pointerleave", () => mx = null);
  (function loop(t) { if (vis && !document.hidden) frame(t); requestAnimationFrame(loop); })(0);
})();

/* Sticky header: background on scroll + sliding indicator for the current section */
const hd = document.querySelector("header"), navLinks = [...document.querySelectorAll("header nav a")], ind = document.querySelector(".ind");
function setCur(a) { navLinks.forEach(l => l.classList.toggle("cur", l === a)); if (a) { ind.style.width = a.offsetWidth + "px"; ind.style.transform = "translateX(" + a.offsetLeft + "px)"; } else ind.style.width = "0"; }
const secObs = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) setCur(navLinks.find(l => l.getAttribute("href") === "#" + en.target.id)); }), { rootMargin: "-35% 0px -60% 0px" });
["work", "stack", "contact"].forEach(id => secObs.observe(document.getElementById(id)));
addEventListener("scroll", () => { hd.classList.toggle("stuck", scrollY > 40); if (scrollY < 200) setCur(null); }, { passive: true });

/* Buttons lean slightly toward the pointer */
document.querySelectorAll(".btn").forEach(b => { b.addEventListener("pointermove", e => { if (e.pointerType !== "mouse") return; const r = b.getBoundingClientRect(); b.style.translate = ((e.clientX - r.left - r.width / 2) * .16) + "px " + ((e.clientY - r.top - r.height / 2) * .28) + "px"; }); b.addEventListener("pointerleave", () => b.style.translate = ""); });

/* Soft light follows the pointer inside project rows */
rowsEl.forEach(r => r.addEventListener("pointermove", e => { const b = r.getBoundingClientRect(); r.style.setProperty("--mx", (e.clientX - b.left) + "px"); r.style.setProperty("--my", (e.clientY - b.top) + "px"); }));

/* Scroll reveal: projects arrive one after another */
const rvEls = [...document.querySelectorAll("section h2, .hint, .proj, .stack > *, .contact > *")]; let pi = 0;
rvEls.forEach(el => { el.classList.add("rv"); if (el.classList.contains("proj")) el.style.transitionDelay = (pi++ * 90) + "ms"; });
const rvObs = new IntersectionObserver(es => es.forEach(en => { if (!en.isIntersecting) return; const el = en.target, dl = parseFloat(el.style.transitionDelay) || 0; rvObs.unobserve(el); el.classList.add("in"); setTimeout(() => { el.classList.remove("rv", "in"); el.style.transitionDelay = ""; }, 1100 + dl); }), { threshold: .15 });
rvEls.forEach(el => rvObs.observe(el));

/* Typed line under the role */
(function () {
  const el = $("#typed"), L = D.typed; if (!el || !L || !L.length) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = L[0]; return; }
  let i = 0, j = 0, del = false;
  (function tick() {
    const s = L[i]; el.textContent = s.slice(0, j); let d = del ? 22 : 48 + Math.random() * 50;
    if (!del && j === s.length) { del = true; d = 1700; } else if (del && j === 0) { del = false; i = (i + 1) % L.length; d = 350; } else j += del ? -1 : 1;
    setTimeout(tick, d);
  })();
})();

/* Reading progress */
const pg = document.createElement("div"); pg.className = "prog"; document.body.appendChild(pg);
const updPg = () => { const m = document.documentElement.scrollHeight - innerHeight; pg.style.transform = "scaleX(" + (m > 0 ? Math.min(scrollY / m, 1) : 0) + ")"; };
addEventListener("scroll", updPg, { passive: true }); addEventListener("resize", updPg); updPg();

/* Command menu: Ctrl/Cmd + K */
(function () {
  
  const go = id => () => document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  const acts = [["Go to work", "section", go("work")], ["Go to stack", "section", go("stack")], ["Go to contact", "section", go("contact")], ["Copy email address", "action", copyEmail], ["Send email", "action", () => { location.href = "mailto:" + D.email; }], ["Open GitHub profile", "link", () => window.open(D.github, "_blank", "noopener")]]
    .concat(D.projects.map((p, i) => ["Project: " + p.title, "work", () => rowsEl[i].scrollIntoView({ behavior: "smooth", block: "center" })]));
  const pal = document.createElement("div"); pal.className = "pal"; pal.setAttribute("aria-hidden", "true");
  pal.innerHTML = '<div class="pbox" role="dialog" aria-modal="true" aria-label="Command menu"><input placeholder="Type a command or search\u2026" aria-label="Search commands"><ul role="listbox"></ul></div>'; document.body.appendChild(pal);
  const inp = pal.querySelector("input"), ul = pal.querySelector("ul"); let list = [], sel = 0;
  function render() { const q = inp.value.trim().toLowerCase(); list = acts.filter(a => a[0].toLowerCase().includes(q)); sel = Math.min(sel, Math.max(list.length - 1, 0)); ul.innerHTML = list.map((a, i) => '<li role="option" class="' + (i === sel ? "sel" : "") + '" data-i="' + i + '"><span>' + esc(a[0]) + "</span><small>" + a[1] + "</small></li>").join("") || "<li>No results</li>"; }
  function open() { inp.value = ""; sel = 0; render(); pal.classList.add("on"); pal.setAttribute("aria-hidden", "false"); inp.focus(); }
  function close() { pal.classList.remove("on"); pal.setAttribute("aria-hidden", "true"); }
  function run(i) { const a = list[i]; if (!a) return; close(); setTimeout(a[2], 120); }
  
  pal.addEventListener("click", e => { if (e.target === pal) close(); const li = e.target.closest("li[data-i]"); if (li) run(+li.dataset.i); });
  inp.addEventListener("input", () => { sel = 0; render(); });
  addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key && e.key.toLowerCase() === "k") { e.preventDefault(); pal.classList.contains("on") ? close() : open(); return; }
    if (!pal.classList.contains("on")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown" && list.length) { e.preventDefault(); sel = (sel + 1) % list.length; render(); }
    else if (e.key === "ArrowUp" && list.length) { e.preventDefault(); sel = (sel - 1 + list.length) % list.length; render(); }
    else if (e.key === "Enter") { e.preventDefault(); run(sel); }
  });
})();
/* Expandable build notes */
document.addEventListener("click", e => { const b = e.target.closest(".hbtn"); if (b) b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") !== "true"); });

/* Clicking a project tag selects that technology across the page */
$("#projects").addEventListener("click", e => { const g = e.target.closest(".tg"); if (!g) return; lock = lock === g.dataset.t ? null : g.dataset.t; paint(); });

/* Name letters lift toward the pointer once the intro has finished */
setTimeout(() => h1.classList.add("done"), ci * 40 + 1300);
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const chs = [...h1.querySelectorAll(".ch")], hb = $(".herobox");
  hb.addEventListener("pointermove", e => { if (e.pointerType !== "mouse" || !h1.classList.contains("done")) return; chs.forEach(c => { const r = c.getBoundingClientRect(), d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)), k = Math.max(0, 1 - d / 160); c.style.translate = "0 " + (-12 * k * k).toFixed(1) + "px"; }); });
  hb.addEventListener("pointerleave", () => chs.forEach(c => c.style.translate = ""));
}
/* Screenshots: fade in when loaded, open in a lightbox */
document.querySelectorAll(".shot img").forEach(im => im.complete ? im.classList.add("ok") : im.addEventListener("load", () => im.classList.add("ok")));
(function () {
  const lb = document.createElement("div"); lb.className = "lb"; lb.setAttribute("aria-hidden", "true");
  lb.innerHTML = '<button class="lbx" aria-label="Close">\u2715</button><button class="lbn lbp" aria-label="Previous">\u2039</button><img alt=""><button class="lbn lbq" aria-label="Next">\u203a</button><span class="lbc"></span>';
  document.body.appendChild(lb);
  const im = lb.querySelector("img"), cap = lb.querySelector(".lbc"); let pi = 0, k = 0;
  const list = () => D.projects[pi].shots;
  function show() { const s = list()[k], o = typeof s === "string" ? { src: s } : s; im.src = o.src; im.alt = o.alt || ""; cap.textContent = (k + 1) + " / " + list().length + (o.alt ? "  \u00b7  " + o.alt : ""); lb.classList.toggle("one", list().length < 2); }
  function open(p, i) { pi = p; k = i; show(); lb.classList.add("on"); lb.setAttribute("aria-hidden", "false"); lb.querySelector(".lbx").focus(); }
  function close() { lb.classList.remove("on"); lb.setAttribute("aria-hidden", "true"); }
  function step(d) { const n = list().length; k = (k + d + n) % n; show(); }
  document.addEventListener("click", e => { const b = e.target.closest(".shot"); if (b) open(+b.dataset.p, +b.dataset.k); });
  lb.addEventListener("click", e => { if (e.target === lb || e.target.closest(".lbx")) close(); else if (e.target.closest(".lbp")) step(-1); else if (e.target.closest(".lbq")) step(1); });
  addEventListener("keydown", e => { if (!lb.classList.contains("on")) return; if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") step(-1); else if (e.key === "ArrowRight") step(1); });
})();