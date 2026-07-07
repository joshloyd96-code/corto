/* PictoLingo app logic. Data loaded from data/vocab.js and data/phrases.js */
"use strict";
const VOCAB=window.VOCAB, PACKS=window.PACKS, PPACKS=window.PPACKS,
      PHRASES=window.PHRASES, WARMUPS=window.WARMUPS, STORIES=window.STORIES||[];
/* ============ VOCAB DATA ============
   [emoji, french, spanish, italian, pack]
   Nouns include the article; gender derives from it. Overrides after "|":
   m/f/pl (ambiguous articles), v (verb), a (adjective).
   IMPORTANT: never reorder existing entries — indexes are the saved-progress keys. Append only. */
const LANGS = {
  fr:{flag:"🇫🇷", name:"Français", voice:"fr-FR", idx:1,
      ui:{review:"Réviser", practice:"Entraînement", packs:"Thèmes", phrases:"Phrases",
          newphrase:"Nouvelle phrase", buildIt:"Reconstruis la phrase", cont:"Continuer",
          check:"Vérifier", correct:"Correct !", wrong:"Pas tout à fait…", newword:"Nouveau mot",
          done:"Session terminée !", type:"Écris le mot…", voice:"Voix",
          modes:["Choisir le mot","Choisir l'image","Écrire le mot","Écoute et choisis"],
          trouble:"Mots difficiles", streak:"jours de suite",
          stories:"Histoires", quiz:"Questions", listen2:"Écouter", storyDone:"Bien lu !",
          accents:"Attention aux accents :", seen:"appris", due:"à réviser", accuracy:"réussite",
          chips:{m:"m",f:"f",pl:"pl",v:"verbe",a:"adj.",d:"adv."},
          warmTitle:"Immersion", warmSub:"Écoute… ton cerveau passe en français.",
          replay:"Réécouter", skip:"Passer", start:"C'est parti !"}},
  es:{flag:"🇪🇸", name:"Español", voice:"es-ES", idx:2,
      ui:{review:"Repasar", practice:"Práctica", packs:"Temas", phrases:"Frases",
          newphrase:"Frase nueva", buildIt:"Reconstruye la frase", cont:"Continuar",
          check:"Comprobar", correct:"¡Correcto!", wrong:"No exactamente…", newword:"Palabra nueva",
          done:"¡Sesión terminada!", type:"Escribe la palabra…", voice:"Voz",
          modes:["Elige la palabra","Elige la imagen","Escribe la palabra","Escucha y elige"],
          trouble:"Palabras difíciles", streak:"días seguidos",
          stories:"Historias", quiz:"Preguntas", listen2:"Escuchar", storyDone:"¡Bien leído!",
          accents:"Ojo con las tildes:", seen:"aprendidas", due:"para repasar", accuracy:"aciertos",
          chips:{m:"m",f:"f",pl:"pl",v:"verbo",a:"adj.",d:"adv."},
          warmTitle:"Inmersión", warmSub:"Escucha… tu cerebro cambia al español.",
          replay:"Escuchar otra vez", skip:"Saltar", start:"¡Vamos!"}},
  it:{flag:"🇮🇹", name:"Italiano", voice:"it-IT", idx:3,
      ui:{review:"Ripassare", practice:"Esercizi", packs:"Temi", phrases:"Frasi",
          newphrase:"Frase nuova", buildIt:"Ricostruisci la frase", cont:"Continua",
          check:"Verifica", correct:"Corretto!", wrong:"Non proprio…", newword:"Parola nuova",
          done:"Sessione finita!", type:"Scrivi la parola…", voice:"Voce",
          modes:["Scegli la parola","Scegli l'immagine","Scrivi la parola","Ascolta e scegli"],
          trouble:"Parole difficili", streak:"giorni di fila",
          stories:"Storie", quiz:"Domande", listen2:"Ascolta", storyDone:"Ben letto!",
          accents:"Occhio agli accenti:", seen:"imparate", due:"da ripassare", accuracy:"risposte esatte",
          chips:{m:"m",f:"f",pl:"pl",v:"verbo",a:"agg.",d:"avv."},
          warmTitle:"Immersione", warmSub:"Ascolta… il tuo cervello passa all'italiano.",
          replay:"Ascolta di nuovo", skip:"Salta", start:"Andiamo!"}}
};

/* ~15-second context-restabiliser passages (everyday language, built from familiar vocab) */
const ART_GENDER = {
  fr:{"le":"m","la":"f","les":"pl"},
  es:{"el":"m","la":"f","los":"pl","las":"pl"},
  it:{"il":"m","lo":"m","la":"f","i":"pl","gli":"pl","le":"pl"}
};
const INTERVALS_DAYS = [0, 1, 3, 7, 21, 60]; // by box
const NEW_BATCH = 8;
const DAY = 86400000;

/* ============ helpers ============ */
function entry(id){ return VOCAB[id]; }
function wordFor(id, lang){
  const raw = entry(id)[LANGS[lang].idx];
  const [text, override] = raw.split("|");
  let g = override;
  if(!g){
    const art = text.split(/[' ]/)[0].toLowerCase();
    g = ART_GENDER[lang][art] || "";
  }
  return {text, g};
}
function emojiFor(id){ return entry(id)[0]; }
function catFor(id){ return entry(id)[4]; }
function packIds(k){ return VOCAB.map((_,i)=>i).filter(i=>catFor(i)===k); }
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function norm(s){
  return s.toLowerCase().replace(/œ/g,"oe").replace(/æ/g,"ae")
    .normalize("NFD").replace(/[̀-ͯ]/g,"")
    .replace(/['’]/g," ").replace(/\s+/g," ").trim();
}
function stripArticle(s){
  return s.replace(/^(le |la |les |l['’]|el |los |las |una |un |une |il |lo |i |gli )/i,"").trim();
}
function esc(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function chipHtml(w, lang){
  if(!w.g) return "";
  return `<span class="gchip ${w.g}">${LANGS[lang].ui.chips[w.g]||w.g}</span>`;
}
/* multi-emoji tableaux need smaller sizing */
function graphemes(s){
  try{ return [...new Intl.Segmenter(undefined,{granularity:"grapheme"}).segment(s)].length; }
  catch(e){ return Array.from(s).length; }
}
function bigEmojiHtml(id){
  const e = emojiFor(id), g = graphemes(e);
  const size = g<=1? 6.5 : g===2? 4.4 : g===3? 3.4 : 2.8;
  return `<div class="bigemoji" style="font-size:${size}rem">${e}</div>`;
}
function optEmojiStyle(id){
  const g = graphemes(emojiFor(id));
  const size = g<=1? 3 : g===2? 2.1 : 1.6;
  return `font-size:${size}rem`;
}
/* phrase helpers */
function phraseRaw(id, lang){ return PHRASES[id][lang]; }
function phraseText(id, lang){ return phraseRaw(id, lang).replace(/[\[\]]/g,""); }
function clozeParts(id, lang){
  const m = phraseRaw(id, lang).match(/^(.*)\[(.+?)\](.*)$/s);
  return {pre:m[1], word:m[2], post:m[3]};
}
function phraseTokens(id, lang){
  return phraseText(id, lang).split(/\s+/)
    .map(t=>t.replace(/^[¿¡«"]+|[,.!?;:»"]+$/g,""))
    .filter(t=>t.length);
}
function ppackIds(k){ return PHRASES.map((_,i)=>i).filter(i=>PHRASES[i].p===k); }
function sceneHtml(id, size){
  const panels = PHRASES[id].sc.split("»");
  return `<div class="scene" style="font-size:${size||3.2}rem">` +
    panels.join(`<span style="font-size:1.6rem;color:var(--muted)"> → </span>`) + `</div>`;
}

/* ============ persistence ============ */
let memStore = {};
function lsGet(key){ try{ return localStorage.getItem(key); }catch(e){ return memStore[key]||null; } }
function lsSet(key,val){ memStore[key]=val; try{ localStorage.setItem(key,val); }catch(e){} }
function loadState(lang){
  const s = lsGet("pictolingo-"+lang);
  if(s){ try{ const o = JSON.parse(s); if(!o.ph) o.ph = {}; return o; }catch(e){} }
  return {cards:{}, ph:{}};
}
function saveState(lang, st){ lsSet("pictolingo-"+lang, JSON.stringify(st)); }

/* ============ audio ============ */
let voices = [];
function loadVoices(){ try{ voices = speechSynthesis.getVoices(); }catch(e){} }
function voiceLang(v){ return v.lang.replace("_","-").toLowerCase(); }
function voicesFor(lang){
  return voices.filter(v=>voiceLang(v).startsWith(lang));
}
function scoreVoice(v, lang){
  const n = v.name.toLowerCase();
  let s = 0;
  if(/premium|enhanced|natural|neural|siri/.test(n)) s += 4;
  if(/google/.test(n)) s += 2;
  if(voiceLang(v) === LANGS[lang].voice.toLowerCase()) s += 1;
  if(v.localService) s += 1;
  if(/espeak|compact|desktop/.test(n)) s -= 5;
  return s;
}
function pickVoice(lang){
  const saved = lsGet("pictolingo-voice-"+lang);
  if(saved){
    const v = voices.find(v=>v.voiceURI===saved);
    if(v) return v;
  }
  const cands = voicesFor(lang);
  if(!cands.length) return null;
  return cands.sort((a,b)=>scoreVoice(b,lang)-scoreVoice(a,lang))[0];
}
function speak(text, lang, rate){
  if(!("speechSynthesis" in window)) return;
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANGS[lang].voice;
    const v = pickVoice(lang);
    if(v) u.voice = v;
    u.rate = rate || 0.9;
    speechSynthesis.speak(u);
  }catch(e){}
}
function stopSpeech(){ try{ speechSynthesis.cancel(); }catch(e){} }
if("speechSynthesis" in window){
  loadVoices();
  speechSynthesis.onvoiceschanged = ()=>{ loadVoices(); if(cur && cur.screen==="dash" && cur.lang) openLang(cur.lang, true); };
}

/* ============ app state ============ */
const app = document.getElementById("app");
let cur = {lang:null, screen:"home"};

/* ============ home ============ */
function renderHome(){
  stopSpeech();
  cur = {lang:null, screen:"home"};
  const streak = getStreak();
  let html = `<div class="top"><div><h1>PictoLingo</h1>
    <div class="sub">See it. Say it. No translation.</div></div>
    ${streak? `<div class="stat" style="flex:0 0 auto;padding:10px 16px"><div class="n">🔥${streak}</div></div>`:""}</div>`;
  for(const lang of ["fr","es","it"]){
    const st = loadState(lang);
    const seen = Object.keys(st.cards).length;
    const due = dueIds(lang, st).length;
    const pct = Math.round(seen/VOCAB.length*100);
    html += `<button class="langcard" onclick="openLang('${lang}')">
      <span class="flag">${LANGS[lang].flag}</span>
      <span style="flex:1">
        <div class="name">${LANGS[lang].name}</div>
        <div class="meta">${seen}/${VOCAB.length} · ${due>0? due+" due":"up to date"}</div>
        <div class="progressbar"><div style="width:${pct}%"></div></div>
      </span></button>`;
  }
  html += `<div class="footer">Images → words. Your brain skips English entirely.
    <div style="margin-top:12px">
      <button class="ghostbtn" style="width:auto;padding:6px 12px" onclick="exportProgress()">⬇︎ Export progress</button>
      <button class="ghostbtn" style="width:auto;padding:6px 12px" onclick="document.getElementById('impf').click()">⬆︎ Import</button>
      <input id="impf" type="file" accept=".json" style="display:none" onchange="importProgress(this)">
    </div></div>`;
  app.innerHTML = html;
}

/* ============ progress export / import ============ */
function exportProgress(){
  const data = {v:1};
  for(const lang of ["fr","es","it"]){
    data[lang] = loadState(lang);
    const vc = lsGet("pictolingo-voice-"+lang);
    if(vc) data["voice-"+lang] = vc;
  }
  const blob = new Blob([JSON.stringify(data)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pictolingo-progress.json";
  a.click();
  URL.revokeObjectURL(a.href);
}
function importProgress(input){
  const f = input.files && input.files[0];
  if(!f) return;
  const r = new FileReader();
  r.onload = ()=>{
    try{
      const data = JSON.parse(r.result);
      for(const lang of ["fr","es","it"]){
        if(data[lang]) saveState(lang, data[lang]);
        if(data["voice-"+lang]) lsSet("pictolingo-voice-"+lang, data["voice-"+lang]);
      }
      renderHome();
    }catch(e){ alert("Could not read that file."); }
  };
  r.readAsText(f);
}

function dueIds(lang, st){
  const now = Date.now();
  return Object.keys(st.cards).filter(id=>st.cards[id].d<=now).map(Number);
}
function duePh(lang, st){
  const now = Date.now();
  return Object.keys(st.ph).filter(id=>st.ph[id].d<=now).map(Number);
}
function unseenIn(st, ids){ return ids.filter(i=>!(i in st.cards)); }

/* ============ immersion warm-up (context restabiliser) ============ */
function renderWarmup(lang){
  cur = {lang, screen:"warm"};
  const ui = LANGS[lang].ui;
  const passage = WARMUPS[lang][Math.floor(Math.random()*WARMUPS[lang].length)];
  cur.passage = passage;
  app.innerHTML = `
    <div class="top"><button class="backbtn" onclick="renderHome()">←</button>
      <h1>${LANGS[lang].flag} ${ui.warmTitle}</h1><span style="width:44px"></span></div>
    <div class="prompt">
      <div class="pulse">🎧</div>
      <div class="sub" style="margin-top:22px">${ui.warmSub}</div>
      <div class="passage">“${esc(passage)}”</div>
      <button class="speak" onclick="replayWarmup()" title="${ui.replay}">🔊</button>
    </div>
    <button class="actionbtn" onclick="openLang('${lang}', true)">${ui.start}</button>
    <button class="ghostbtn" onclick="openLang('${lang}', true)">${ui.skip}</button>`;
  speak(passage, lang, 1.0);
}
function replayWarmup(){ if(cur.passage) speak(cur.passage, cur.lang, 1.0); }

/* ============ language dashboard ============ */
function openLang(lang, skipWarm){
  stopSpeech();
  const last = lsGet("pictolingo-last");
  lsSet("pictolingo-last", lang);
  if(!skipWarm && last !== lang && ("speechSynthesis" in window)){
    return renderWarmup(lang);
  }
  cur = {lang, screen:"dash"};
  const L = LANGS[lang], ui = L.ui;
  const st = loadState(lang);
  const seen = Object.keys(st.cards).length + Object.keys(st.ph).length;
  const due = dueIds(lang, st);
  const dueP = duePh(lang, st);
  const dueTotal = due.length + dueP.length;
  let html = `<div class="top">
    <button class="backbtn" onclick="renderHome()">←</button>
    <h1>${L.flag} ${L.name}</h1>
    <button class="backbtn" onclick="renderWarmup('${lang}')" title="${ui.warmTitle}">🎧</button></div>
    <div class="statrow">
      <div class="stat"><div class="n">${seen}</div><div class="l">${ui.seen}</div></div>
      <div class="stat"><div class="n">${dueTotal}</div><div class="l">${ui.due}</div></div>
    </div>
    <button class="bigbtn" onclick="startReview()" ${dueTotal? "":"disabled"}>
      <span>🔁 ${ui.review}</span><span class="cnt">${dueTotal}</span></button>
    <div class="prow">` +
    ["🖼️→💬","💬→🖼️","🖼️→⌨️","🔊→🖼️"].map((ic,i)=>
      `<button class="pbtn" onclick="startPractice(${i})" ${seen? "":"disabled"}>
        <div class="pi">${ic}</div><div class="pt">${ui.modes[i]}</div></button>`).join("") +
    `</div>`;
  const trouble = troubleIds(st);
  if(trouble.length >= 3){
    html += `<button class="bigbtn secondary" onclick="startTrouble()">
      <span>🔥 ${ui.trouble}</span><span class="cnt">${trouble.length}</span></button>`;
  }
  // voice picker
  const cands = voicesFor(lang);
  const savedV = lsGet("pictolingo-voice-"+lang) || "";
  html += `<div class="voicerow"><span>🗣️</span>
    <select onchange="setVoice(this.value)">
      <option value="">${ui.voice}: auto</option>` +
      cands.map(v=>`<option value="${esc(v.voiceURI)}" ${v.voiceURI===savedV?"selected":""}>${esc(v.name)}</option>`).join("") +
    `</select></div>`;
  // packs
  html += `<div class="modehdr">${ui.packs}</div>`;
  for(const p of PACKS){
    const ids = packIds(p.k);
    const pseen = ids.filter(i=>i in st.cards).length;
    const pdue = ids.filter(i=>st.cards[i] && st.cards[i].d<=Date.now()).length;
    const pct = Math.round(pseen/ids.length*100);
    const complete = pseen===ids.length;
    html += `<button class="packcard" onclick="tapPack('${p.k}')">
      <span class="picon">${p.icon}</span>
      <span style="flex:1">
        <div class="pname">${p.n[lang]}</div>
        <div class="pmeta">${pseen}/${ids.length}</div>
        <div class="progressbar"><div style="width:${pct}%"></div></div>
      </span>
      ${pdue? `<span class="pdue">${pdue}</span>`: complete? `<span class="pdone">✓</span>`:""}
    </button>`;
  }
  // phrase packs
  html += `<div class="modehdr">💬 ${ui.phrases}</div>`;
  for(const p of PPACKS){
    const ids = ppackIds(p.k);
    const pseen = ids.filter(i=>i in st.ph).length;
    const pdue = ids.filter(i=>st.ph[i] && st.ph[i].d<=Date.now()).length;
    const pct = Math.round(pseen/ids.length*100);
    const complete = pseen===ids.length;
    html += `<button class="packcard" onclick="tapPPack('${p.k}')">
      <span class="picon">${p.icon}</span>
      <span style="flex:1">
        <div class="pname">${p.n[lang]}</div>
        <div class="pmeta">${pseen}/${ids.length}</div>
        <div class="progressbar"><div style="width:${pct}%"></div></div>
      </span>
      ${pdue? `<span class="pdue">${pdue}</span>`: complete? `<span class="pdone">✓</span>`:""}
    </button>`;
  }
  // stories
  if(STORIES.length){
    html += `<div class="modehdr">📖 ${ui.stories}</div>`;
    STORIES.forEach((s,i)=>{
      const done = st.st && st.st[i];
      html += `<button class="packcard" onclick="renderStory(${i})">
        <span class="picon">${s.e.split("»")[0]}</span>
        <span style="flex:1"><div class="pname">${esc(s.t[lang])}</div></span>
        ${done? `<span class="pdone">✓</span>`:""}
      </button>`;
    });
  }
  app.innerHTML = html;
}

/* ============ story mode (graded readers) ============ */
function renderStory(i){
  stopSpeech();
  cur.screen = "story";
  const lang = cur.lang, ui = LANGS[lang].ui;
  const s = STORIES[i];
  app.innerHTML = `<div class="top">
    <button class="backbtn" onclick="openLang('${lang}', true)">←</button>
    <h1 style="font-size:1.2rem">${esc(s.t[lang])}</h1><span style="width:44px"></span></div>
    <div style="text-align:center;font-size:2.6rem;margin-bottom:8px">${s.e}</div>
    <div class="passage" style="font-style:normal">${esc(s.x[lang])}</div>
    <div style="text-align:center"><button class="speak" onclick="speakStory(${i})" title="${ui.listen2}">🔊</button></div>
    <button class="actionbtn" onclick="renderStoryQ(${i},0,0)">${ui.quiz} →</button>`;
}
function speakStory(i){ speak(STORIES[i].x[cur.lang], cur.lang, 0.95); }
function renderStoryQ(i, qi, right){
  stopSpeech();
  const lang = cur.lang, ui = LANGS[lang].ui;
  const s = STORIES[i];
  if(qi >= s.q.length){ // done
    const st = loadState(lang);
    st.st = st.st || {};
    st.st[i] = 1;
    saveState(lang, st);
    const streak = bumpStreak();
    app.innerHTML = `<div class="prompt">
        <div class="donebig">${right===s.q.length? "🎉":"📖"}</div>
        <div class="word">${ui.storyDone}</div>
        <div class="sub" style="margin-top:8px">${right}/${s.q.length} · 🔥 ${streak} ${ui.streak}</div>
      </div>
      <button class="actionbtn" onclick="openLang('${lang}', true)">${ui.cont}</button>`;
    return;
  }
  const Q = s.q[qi];
  const correctText = Q.o[lang][0];
  const opts = shuffle(Q.o[lang].slice());
  app.innerHTML = `<div class="top">
    <button class="backbtn" onclick="renderStory(${i})">←</button>
    <h1 style="font-size:1.1rem">${ui.quiz} ${qi+1}/${s.q.length}</h1><span style="width:44px"></span></div>
    <div class="prompt" style="min-height:100px;flex:0">
      <div class="word" style="font-size:1.25rem">${esc(Q.q[lang])}</div></div>
    <div class="opts">` + opts.map(o=>
      `<button class="opt" style="font-size:1rem" data-ok="${o===correctText?1:0}"
        onclick="answerStoryQ(this,${i},${qi},${right})">${esc(o)}</button>`
    ).join("") + `</div><div class="feedback" id="fb"></div>`;
}
function answerStoryQ(btn, i, qi, right){
  const opts = document.querySelectorAll(".opt");
  opts.forEach(o=>o.onclick=null);
  const ui = LANGS[cur.lang].ui;
  const ok = btn.dataset.ok==="1";
  btn.classList.add(ok? "good":"bad");
  if(!ok) opts.forEach(o=>{ if(o.dataset.ok==="1") o.classList.add("good"); });
  document.getElementById("fb").innerHTML = ok
    ? `<div class="fw good">${ui.correct}</div>`
    : `<div class="fw bad">${ui.wrong}</div>`;
  setTimeout(()=>renderStoryQ(i, qi+1, right+(ok?1:0)), ok? 1000:2200);
}
function setVoice(uri){
  lsSet("pictolingo-voice-"+cur.lang, uri);
  // sample the voice
  const ids = Object.keys(loadState(cur.lang).cards);
  const sample = ids.length? wordFor(+ids[0], cur.lang).text : wordFor(0, cur.lang).text;
  speak(sample, cur.lang);
}

/* ============ session building ============ */
function tapPack(k){
  const st = loadState(cur.lang);
  const ids = packIds(k);
  const unseen = unseenIn(st, ids);
  if(unseen.length) return startLearn(k);
  // pack complete → mixed practice on this pack
  const pick = shuffle(ids).slice(0, 10);
  const kinds = ["choice","choice","match","listen","type","type"];
  startSession(pick.map(id=>({id, kind:kinds[Math.min(st.cards[id].b,5)]})), true);
}
function startLearn(k){
  const st = loadState(cur.lang);
  const ids = unseenIn(st, packIds(k)).slice(0, NEW_BATCH);
  const queue = [];
  ids.forEach(id=>queue.push({id, kind:"learn"}));
  shuffle(ids).forEach(id=>queue.push({id, kind:"choice"}));
  shuffle(ids).forEach(id=>queue.push({id, kind:"match"}));
  startSession(queue);
}
function startReview(){
  const st = loadState(cur.lang);
  const wKinds = ["choice","choice","match","listen","type","type"];
  const pKinds = ["pchoice","pchoice","build","cloze","cloze","cloze"];
  const items = dueIds(cur.lang, st).map(id=>({id, kind:wKinds[Math.min(st.cards[id].b,5)]}))
    .concat(duePh(cur.lang, st).map(id=>({id, kind:pKinds[Math.min(st.ph[id].b,5)], ph:1})));
  startSession(shuffle(items).slice(0, 20));
}
function tapPPack(k){
  const st = loadState(cur.lang);
  const ids = ppackIds(k);
  const unseen = ids.filter(i=>!(i in st.ph));
  if(unseen.length){
    const batch = unseen.slice(0, 4);
    const q = [];
    batch.forEach(id=>q.push({id, kind:"plearn", ph:1}));
    shuffle(batch).forEach(id=>q.push({id, kind:"pchoice", ph:1}));
    shuffle(batch).forEach(id=>q.push({id, kind:"build", ph:1}));
    return startSession(q);
  }
  const pick = shuffle(ids).slice(0, 8);
  const kinds = ["pchoice","pchoice","build","cloze","cloze","cloze"];
  startSession(pick.map(id=>({id, kind:kinds[Math.min(st.ph[id].b,5)], ph:1})), true);
}
function startPractice(mode){
  const st = loadState(cur.lang);
  const seen = Object.keys(st.cards).map(Number);
  const ids = shuffle(seen).slice(0, 10);
  const kind = ["choice","match","type","listen"][mode];
  startSession(ids.map(id=>({id, kind})), true);
}
function troubleIds(st){
  return Object.keys(st.cards).filter(id=>(st.cards[id].w||0)>=2)
    .sort((a,b)=>(st.cards[b].w||0)-(st.cards[a].w||0)).map(Number);
}
function startTrouble(){
  const st = loadState(cur.lang);
  const ids = troubleIds(st).slice(0, 10);
  const kinds = ["choice","match","type"];
  startSession(ids.map((id,i)=>({id, kind:kinds[i%3]})), true);
}
/* daily streak */
function getStreak(){
  try{
    const s = JSON.parse(lsGet("pictolingo-streak")||"{}");
    const today = new Date().toISOString().slice(0,10);
    const yest = new Date(Date.now()-864e5).toISOString().slice(0,10);
    return (s.last===today || s.last===yest)? (s.n||0) : 0;
  }catch(e){ return 0; }
}
function bumpStreak(){
  const today = new Date().toISOString().slice(0,10);
  const yest = new Date(Date.now()-864e5).toISOString().slice(0,10);
  let s = {};
  try{ s = JSON.parse(lsGet("pictolingo-streak")||"{}"); }catch(e){}
  if(s.last !== today){
    s.n = (s.last===yest? (s.n||0)+1 : 1);
    s.last = today;
    lsSet("pictolingo-streak", JSON.stringify(s));
  }
  return s.n||1;
}
function startSession(queue, practice){
  cur.screen = "session";
  cur.queue = queue; cur.i = 0; cur.right = 0; cur.total = 0; cur.practice = !!practice;
  renderCard();
}

/* ============ cards ============ */
function renderCard(){
  if(cur.i >= cur.queue.length) return renderDone();
  if(cur.queue[cur.i].ph) return renderPhraseCard(cur.queue[cur.i]);
  const {id, kind} = cur.queue[cur.i];
  const lang = cur.lang, ui = LANGS[lang].ui;
  const w = wordFor(id, lang);
  const pct = Math.round(cur.i/cur.queue.length*100);
  let html = `<div class="top">
    <button class="backbtn" onclick="openLang('${lang}', true)">✕</button>
    <div style="flex:1;margin-left:14px"><div class="qbar"><div style="width:${pct}%"></div></div></div></div>`;

  if(kind==="learn"){
    html += `<div class="prompt">
      <div class="learnlabel">✨ ${ui.newword}</div>
      ${bigEmojiHtml(id)}
      <div class="word">${esc(w.text)}</div>
      ${chipHtml(w, lang)}
      <button class="speak" onclick="speak(wordFor(${id},'${lang}').text,'${lang}')">🔊</button>
    </div>
    <button class="actionbtn" onclick="answerLearn(${id})">${ui.cont}</button>`;
    app.innerHTML = html;
    speak(w.text, lang);
    return;
  }

  if(kind==="choice"){ // image -> pick word
    const opts = shuffle([id, ...distractors(id, 3)]);
    html += `<div class="prompt">${bigEmojiHtml(id)}</div>
      <div class="opts">` + opts.map(o=>{
        const ow = wordFor(o, lang);
        return `<button class="opt" data-id="${o}" onclick="answerChoice(this,${o},${id})">${esc(ow.text)}</button>`;
      }).join("") + `</div><div class="feedback" id="fb"></div>`;
    app.innerHTML = html;
    return;
  }

  if(kind==="listen"){ // audio only -> pick image (no text shown)
    const opts = shuffle([id, ...distractors(id, 3)]);
    html += `<div class="prompt" style="min-height:120px">
      <button class="speak" style="width:80px;height:80px;font-size:2.2rem" onclick="speak(wordFor(${id},'${lang}').text,'${lang}')">🔊</button></div>
      <div class="opts grid">` + opts.map(o=>
        `<button class="opt" style="${optEmojiStyle(o)}" data-id="${o}" onclick="answerChoice(this,${o},${id})">${emojiFor(o)}</button>`
      ).join("") + `</div><div class="feedback" id="fb"></div>`;
    app.innerHTML = html;
    speak(w.text, lang);
    return;
  }

  if(kind==="match"){ // word -> pick image
    const opts = shuffle([id, ...distractors(id, 3)]);
    html += `<div class="prompt" style="min-height:120px">
      <div class="word">${esc(w.text)}</div>
      ${chipHtml(w, lang)}
      <button class="speak" onclick="speak(wordFor(${id},'${lang}').text,'${lang}')">🔊</button></div>
      <div class="opts grid">` + opts.map(o=>
        `<button class="opt" style="${optEmojiStyle(o)}" data-id="${o}" onclick="answerChoice(this,${o},${id})">${emojiFor(o)}</button>`
      ).join("") + `</div><div class="feedback" id="fb"></div>`;
    app.innerHTML = html;
    speak(w.text, lang);
    return;
  }

  // type: image -> write word
  html += `<div class="prompt">${bigEmojiHtml(id)}</div>
    <div class="typebox"><input id="ti" type="text" autocomplete="off" autocapitalize="none"
      placeholder="${ui.type}" onkeydown="if(event.key==='Enter')checkType(${id})"></div>
    <div class="feedback" id="fb"></div>
    <button class="actionbtn" id="ab" onclick="checkType(${id})">${ui.check}</button>`;
  app.innerHTML = html;
  document.getElementById("ti").focus();
}

/* ============ phrase cards ============ */
function renderPhraseCard(item){
  const {id, kind} = item;
  const lang = cur.lang, ui = LANGS[lang].ui;
  const text = phraseText(id, lang);
  const pack = PPACKS.find(p=>p.k===PHRASES[id].p);
  const pct = Math.round(cur.i/cur.queue.length*100);
  let html = `<div class="top">
    <button class="backbtn" onclick="openLang('${lang}', true)">✕</button>
    <div style="flex:1;margin-left:14px"><div class="qbar"><div style="width:${pct}%"></div></div></div></div>
    <div class="learnlabel" style="text-align:center">${pack.icon} ${pack.n[lang]}</div>`;

  if(kind==="plearn"){
    html += `<div class="prompt">
      <div class="learnlabel">✨ ${ui.newphrase}</div>
      ${sceneHtml(id)}
      <div class="word" style="font-size:1.45rem">${esc(text)}</div>
      <button class="speak" onclick="speakPhrase(${id})">🔊</button>
    </div>
    <button class="actionbtn" onclick="answerPLearn(${id})">${ui.cont}</button>`;
    app.innerHTML = html;
    speakPhrase(id);
    return;
  }

  if(kind==="pchoice"){ // scene -> pick phrase (no audio before answer!)
    const others = shuffle(PHRASES.map((_,i)=>i).filter(i=>i!==id)).slice(0,3);
    const opts = shuffle([id, ...others]);
    html += `<div class="prompt" style="min-height:140px">${sceneHtml(id)}</div>
      <div class="opts">` + opts.map(o=>
        `<button class="opt" style="font-size:1rem" data-id="${o}" onclick="answerPChoice(this,${o},${id})">${esc(phraseText(o,lang))}</button>`
      ).join("") + `</div><div class="feedback" id="fb"></div>`;
    app.innerHTML = html;
    return;
  }

  if(kind==="build"){ // hear + scene -> rebuild from tiles
    cur.buildTokens = phraseTokens(id, lang);
    do{ cur.tilePool = shuffle(cur.buildTokens); }
    while(cur.buildTokens.length>1 && cur.tilePool.join(" ")===cur.buildTokens.join(" "));
    cur.built = [];
    html += `<div class="prompt" style="min-height:120px">
      ${sceneHtml(id, 2.6)}
      <div class="sub" style="margin-top:10px">${ui.buildIt}</div>
      <button class="speak" onclick="speakPhrase(${id})">🔊</button></div>
      <div class="builtline" id="bl"></div>
      <div class="tiles" id="tl"></div>
      <div class="feedback" id="fb"></div>`;
    app.innerHTML = html;
    renderTiles(id);
    speakPhrase(id);
    return;
  }

  // cloze: scene + gapped phrase -> pick the missing word
  const cp = clozeParts(id, lang);
  const otherWords = [];
  const seenW = new Set([norm(cp.word)]);
  for(const i of shuffle(PHRASES.map((_,x)=>x).filter(x=>x!==id))){
    const w = clozeParts(i, lang).word;
    if(!seenW.has(norm(w))){ seenW.add(norm(w)); otherWords.push(w); }
    if(otherWords.length===3) break;
  }
  const opts = shuffle([cp.word, ...otherWords]);
  html += `<div class="prompt" style="min-height:140px">
      ${sceneHtml(id, 2.6)}
      <div class="word" style="font-size:1.3rem;margin-top:18px">${esc(cp.pre)}<span class="blank">____</span>${esc(cp.post)}</div>
    </div>
    <div class="opts">` + opts.map(w=>
      `<button class="opt" data-w="${esc(w)}" onclick="answerCloze(this,${id})">${esc(w)}</button>`
    ).join("") + `</div><div class="feedback" id="fb"></div>`;
  app.innerHTML = html;
}

function speakPhrase(id){ speak(phraseText(id, cur.lang), cur.lang, 0.95); }

function renderTiles(id){
  const bl = document.getElementById("bl"), tl = document.getElementById("tl");
  bl.innerHTML = cur.built.map((t,i)=>
    `<button class="tile placed" onclick="untapTile(${i})">${esc(t)}</button>`).join("") || "&nbsp;";
  const remaining = cur.tilePool.slice();
  cur.built.forEach(t=>{ const ix = remaining.indexOf(t); if(ix>-1) remaining.splice(ix,1); });
  tl.innerHTML = remaining.map(t=>
    `<button class="tile" onclick="tapTile('${esc(t).replace(/'/g,"\\'")}',${id})">${esc(t)}</button>`).join("");
}
function tapTile(t, id){
  cur.built.push(t);
  renderTiles(id);
  if(cur.built.length===cur.buildTokens.length) finishBuild(id);
}
function untapTile(i){
  if(cur.buildDone) return;
  cur.built.splice(i,1);
  renderTiles(cur.queue[cur.i].id);
}
function finishBuild(id){
  cur.buildDone = true;
  const ui = LANGS[cur.lang].ui;
  const ok = cur.built.join(" ")===cur.buildTokens.join(" ");
  document.getElementById("fb").innerHTML = (ok
    ? `<div class="fw good">${ui.correct}</div>`
    : `<div class="fw bad">${ui.wrong}</div>`) +
    `<div class="note">${esc(phraseText(id, cur.lang))}</div>`;
  gradePh(id, ok);
  speakPhrase(id);
  setTimeout(()=>{cur.buildDone=false; cur.i++; renderCard();}, ok? 1400:2600);
}

function answerPLearn(id){
  const st = loadState(cur.lang);
  if(!st.ph[id]){ st.ph[id] = {b:1, d:Date.now()+DAY}; saveState(cur.lang, st); }
  cur.i++; renderCard();
}
function answerPChoice(btn, chosen, target){
  const opts = document.querySelectorAll(".opt");
  opts.forEach(o=>o.onclick=null);
  const ok = chosen===target;
  const ui = LANGS[cur.lang].ui;
  btn.classList.add(ok? "good":"bad");
  if(!ok) opts.forEach(o=>{ if(+o.dataset.id===target) o.classList.add("good"); });
  document.getElementById("fb").innerHTML = ok
    ? `<div class="fw good">${ui.correct}</div>`
    : `<div class="fw bad">${ui.wrong}</div>`;
  gradePh(target, ok);
  speakPhrase(target);
  setTimeout(()=>{cur.i++; renderCard();}, ok? 1200:2400);
}
function answerCloze(btn, id){
  const opts = document.querySelectorAll(".opt");
  opts.forEach(o=>o.onclick=null);
  const ui = LANGS[cur.lang].ui;
  const cp = clozeParts(id, cur.lang);
  const ok = btn.dataset.w===cp.word;
  btn.classList.add(ok? "good":"bad");
  if(!ok) opts.forEach(o=>{ if(o.dataset.w===cp.word) o.classList.add("good"); });
  document.getElementById("fb").innerHTML = (ok
    ? `<div class="fw good">${ui.correct}</div>`
    : `<div class="fw bad">${ui.wrong}</div>`) +
    `<div class="note">${esc(phraseText(id, cur.lang))}</div>`;
  gradePh(id, ok);
  speakPhrase(id);
  setTimeout(()=>{cur.i++; renderCard();}, ok? 1200:2400);
}
function gradePh(id, correct){
  cur.total++;
  if(correct) cur.right++;
  const st = loadState(cur.lang);
  const c = st.ph[id] || {b:0, d:0};
  if(correct){
    c.b = Math.min(c.b+1, 5);
    c.d = Date.now() + INTERVALS_DAYS[c.b]*DAY;
  }else{
    c.b = 1;
    c.d = Date.now() + 10*60000;
    cur.queue.push({id, kind:"pchoice", ph:1});
  }
  st.ph[id] = c;
  saveState(cur.lang, st);
}

function distractors(id, n){
  const cat = catFor(id);
  const same = VOCAB.map((_,i)=>i).filter(i=>i!==id && catFor(i)===cat);
  const other = VOCAB.map((_,i)=>i).filter(i=>i!==id && catFor(i)!==cat);
  const pool = shuffle(same).concat(shuffle(other));
  return pool.slice(0, n);
}

/* ============ answers & grading ============ */
function grade(id, correct){
  cur.total++;
  if(correct) cur.right++;
  const st = loadState(cur.lang);
  const c = st.cards[id] || {b:0, d:0};
  if(correct){
    c.b = Math.min(c.b+1, 5);
    c.d = Date.now() + INTERVALS_DAYS[c.b]*DAY;
    if(c.w) c.w = Math.max(0, c.w-1);
  }else{
    c.b = 1;
    c.d = Date.now() + 10*60000;
    c.w = (c.w||0)+1; // lapse counter feeds the trouble deck
    cur.queue.push({id, kind:"choice"}); // retry this session
  }
  st.cards[id] = c;
  saveState(cur.lang, st);
}

function answerLearn(id){
  const st = loadState(cur.lang);
  if(!st.cards[id]){ st.cards[id] = {b:1, d:Date.now()+DAY}; saveState(cur.lang, st); }
  cur.i++; renderCard();
}

function answerChoice(btn, chosen, target){
  const opts = document.querySelectorAll(".opt");
  opts.forEach(o=>o.onclick=null);
  const ok = chosen===target;
  const ui = LANGS[cur.lang].ui;
  const w = wordFor(target, cur.lang);
  btn.classList.add(ok? "good":"bad");
  if(!ok) opts.forEach(o=>{ if(+o.dataset.id===target) o.classList.add("good"); });
  document.getElementById("fb").innerHTML = ok
    ? `<div class="fw good">${ui.correct}</div>`
    : `<div class="fw bad">${ui.wrong}</div><div class="note">${emojiFor(target)} ${esc(w.text)}</div>`;
  grade(target, ok);
  speak(w.text, cur.lang);
  setTimeout(()=>{cur.i++; renderCard();}, ok? 900:2000);
}

function checkType(id){
  const inp = document.getElementById("ti");
  if(inp.dataset.done) return;
  const ui = LANGS[cur.lang].ui;
  const w = wordFor(id, cur.lang);
  const guess = norm(inp.value);
  const full = norm(w.text);
  const bare = norm(stripArticle(w.text));
  const ok = guess.length>0 && (guess===full || guess===bare || stripArticle(guess)===bare);
  const exact = inp.value.trim().toLowerCase()===w.text.toLowerCase() ||
                inp.value.trim().toLowerCase()===stripArticle(w.text).toLowerCase();
  inp.dataset.done = "1";
  inp.classList.add(ok? "good":"bad");
  let fb = ok
    ? `<div class="fw good">${ui.correct}</div>`
    : `<div class="fw bad">${ui.wrong}</div>`;
  if(ok && !exact) fb += `<div class="note">${ui.accents} <b>${esc(w.text)}</b></div>`;
  if(!ok) fb += `<div class="note">${emojiFor(id)} <b>${esc(w.text)}</b></div>`;
  document.getElementById("fb").innerHTML = fb;
  grade(id, ok);
  speak(w.text, cur.lang);
  const ab = document.getElementById("ab");
  ab.textContent = ui.cont;
  ab.onclick = ()=>{cur.i++; renderCard();};
  if(ok) setTimeout(()=>{cur.i++; renderCard();}, exact? 1000:2200);
}

function renderDone(){
  const ui = LANGS[cur.lang].ui;
  const acc = cur.total? Math.round(cur.right/cur.total*100):100;
  const streak = bumpStreak();
  app.innerHTML = `<div class="prompt">
      <div class="donebig">${acc>=80? "🎉": acc>=50? "💪":"🌱"}</div>
      <div class="word">${ui.done}</div>
      <div class="sub" style="margin-top:8px">${cur.right}/${cur.total} · ${acc}% ${ui.accuracy}</div>
      <div class="sub" style="margin-top:6px">🔥 ${streak} ${ui.streak}</div>
    </div>
    <button class="actionbtn" onclick="openLang('${cur.lang}', true)">${ui.cont}</button>`;
}

/* expose for inline handlers */
window.openLang=openLang; window.renderHome=renderHome; window.startLearn=startLearn;
window.startReview=startReview; window.startPractice=startPractice; window.answerLearn=answerLearn;
window.answerChoice=answerChoice; window.checkType=checkType; window.speak=speak;
window.tapPack=tapPack; window.setVoice=setVoice; window.renderWarmup=renderWarmup;
window.replayWarmup=replayWarmup; window.wordFor=wordFor;
window.tapPPack=tapPPack; window.answerPLearn=answerPLearn; window.answerPChoice=answerPChoice;
window.answerCloze=answerCloze; window.tapTile=tapTile; window.untapTile=untapTile;
window.speakPhrase=speakPhrase;
window.exportProgress=exportProgress; window.importProgress=importProgress;
window.startTrouble=startTrouble;
window.renderStory=renderStory; window.renderStoryQ=renderStoryQ;
window.answerStoryQ=answerStoryQ; window.speakStory=speakStory;

renderHome();
