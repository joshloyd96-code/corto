/* PictoLingo phrase data.
   Scene tableaux carry the meaning — no translation anywhere.
   [word] brackets mark the cloze-blank word. "»" splits a two-panel scene.
   Append only — indexes are saved-progress keys. */
window.PPACKS = [
 {k:"cafe", icon:"☕", n:{fr:"Au café",     es:"En el café",    it:"Al caffè"}},
 {k:"town", icon:"🗺️", n:{fr:"En ville",    es:"En la ciudad",  it:"In città"}},
 {k:"shop", icon:"🛍️", n:{fr:"Au magasin",  es:"En la tienda",  it:"Al negozio"}},
 {k:"meet", icon:"👋", n:{fr:"Rencontres",  es:"Conocer gente", it:"Incontri"}},
 {k:"trav", icon:"🧳", n:{fr:"Voyage",      es:"Viaje",         it:"Viaggio"}}
];
window.PHRASES = [
 /* cafe */
 {sc:"🧑🙋☕", p:"cafe", fr:"Je voudrais un [café], s'il vous plaît.", es:"Quisiera un [café], por favor.", it:"Vorrei un [caffè], per favore."},
 {sc:"🧑❓🍵", p:"cafe", fr:"Vous avez du [thé] ?", es:"¿Tienen [té]?", it:"Avete del [tè]?"},
 {sc:"🙋🧾💶", p:"cafe", fr:"L'[addition], s'il vous plaît.", es:"La [cuenta], por favor.", it:"Il [conto], per favore."},
 {sc:"☕➕🥛", p:"cafe", fr:"Un café avec du [lait], s'il vous plaît.", es:"Un café con [leche], por favor.", it:"Un caffè [macchiato], per favore."},
 {sc:"🚻❓", p:"cafe", fr:"Où sont les [toilettes] ?", es:"¿Dónde está el [baño]?", it:"Dov'è il [bagno]?"},
 {sc:"🪑🆓❓", p:"cafe", fr:"Cette [place] est libre ?", es:"¿Está [libre] este sitio?", it:"È [libero] questo posto?"},
 {sc:"😋👌🍽️", p:"cafe", fr:"C'était très [bon], merci !", es:"Estaba muy [rico], ¡gracias!", it:"Era molto [buono], grazie!"},
 {sc:"💳❓🧾", p:"cafe", fr:"Je peux payer par [carte] ?", es:"¿Puedo pagar con [tarjeta]?", it:"Posso pagare con la [carta]?"},
 /* town / directions */
 {sc:"🧑🤷🚉", p:"town", fr:"Excusez-moi, où est la [gare] ?", es:"Perdona, ¿dónde está la [estación]?", it:"Scusi, dov'è la [stazione]?"},
 {sc:"👉➡️", p:"town", fr:"C'est à [droite].", es:"Está a la [derecha].", it:"È a [destra]."},
 {sc:"👉⬅️", p:"town", fr:"C'est à [gauche].", es:"Está a la [izquierda].", it:"È a [sinistra]."},
 {sc:"🚶⬆️🛣️", p:"town", fr:"Allez tout [droit].", es:"Siga todo [recto].", it:"Vada sempre [dritto]."},
 {sc:"📍❓🔭", p:"town", fr:"C'est [loin] d'ici ?", es:"¿Está [lejos] de aquí?", it:"È [lontano] da qui?"},
 {sc:"🚌❓🏛️", p:"town", fr:"Quel [bus] va au centre-ville ?", es:"¿Qué [autobús] va al centro?", it:"Quale [autobus] va in centro?"},
 {sc:"🗺️👉🙏", p:"town", fr:"Vous pouvez me montrer sur la [carte] ?", es:"¿Me lo puede enseñar en el [mapa]?", it:"Può mostrarmelo sulla [mappa]?"},
 {sc:"🧭😵", p:"town", fr:"Je suis [perdu].", es:"Estoy [perdido].", it:"Mi sono [perso]."},
 /* shop */
 {sc:"🏷️❓💶", p:"shop", fr:"Ça coûte [combien] ?", es:"¿[Cuánto] cuesta?", it:"[Quanto] costa?"},
 {sc:"👀🙂🛍️", p:"shop", fr:"Je regarde [seulement], merci.", es:"Solo estoy [mirando], gracias.", it:"Sto solo [guardando], grazie."},
 {sc:"👕📏⬆️", p:"shop", fr:"Vous l'avez en plus [grand] ?", es:"¿Lo tiene en una talla más [grande]?", it:"Ce l'ha in una taglia più [grande]?"},
 {sc:"🙋✅🛍️", p:"shop", fr:"Je le [prends].", es:"Me lo [llevo].", it:"Lo [prendo]."},
 {sc:"🎁📦🙂", p:"shop", fr:"C'est pour [offrir].", es:"Es para [regalar].", it:"È per un [regalo]."},
 {sc:"🕙❓🏪", p:"shop", fr:"Vous ouvrez à quelle [heure] ?", es:"¿A qué [hora] abren?", it:"A che [ora] aprite?"},
 {sc:"👗❓🚪", p:"shop", fr:"Je peux l'[essayer] ?", es:"¿Me lo puedo [probar]?", it:"Posso [provarlo]?"},
 {sc:"💸😮", p:"shop", fr:"C'est trop [cher].", es:"Es demasiado [caro].", it:"È troppo [caro]."},
 /* meet */
 {sc:"👋🙂❓", p:"meet", fr:"Bonjour, ça [va] ?", es:"Hola, ¿qué [tal]?", it:"Ciao, come [va]?"},
 {sc:"🧑💬📛", p:"meet", fr:"Je m'[appelle] Josh.", es:"Me [llamo] Josh.", it:"Mi [chiamo] Josh."},
 {sc:"❓📛🫵", p:"meet", fr:"Comment tu t'[appelles] ?", es:"¿Cómo te [llamas]?", it:"Come ti [chiami]?"},
 {sc:"🧑🏠🇬🇧", p:"meet", fr:"Je viens d'[Angleterre].", es:"Soy de [Inglaterra].", it:"Vengo dall'[Inghilterra]."},
 {sc:"🤝😊", p:"meet", fr:"[Enchanté] !", es:"¡[Encantado]!", it:"[Piacere]!"},
 {sc:"🗣️🐢🙏", p:"meet", fr:"Vous pouvez parler plus [lentement] ?", es:"¿Puede hablar más [despacio]?", it:"Può parlare più [lentamente]?"},
 {sc:"🤷❓🔁", p:"meet", fr:"Vous pouvez [répéter] ?", es:"¿Puede [repetir]?", it:"Può [ripetere]?"},
 {sc:"👋😊🌙", p:"meet", fr:"Bonne [soirée] !", es:"¡Buenas [noches]!", it:"Buona [serata]!"},
 /* travel */
 {sc:"🎫🚆🙋", p:"trav", fr:"Un [billet] pour Paris, s'il vous plaît.", es:"Un [billete] para Madrid, por favor.", it:"Un [biglietto] per Roma, per favore."},
 {sc:"🕐❓🚆", p:"trav", fr:"Le train part à quelle [heure] ?", es:"¿A qué [hora] sale el tren?", it:"A che [ora] parte il treno?"},
 {sc:"🚉❓🔢", p:"trav", fr:"C'est quel [quai] ?", es:"¿Qué [andén] es?", it:"Che [binario] è?"},
 {sc:"🏨🛏️❓", p:"trav", fr:"Vous avez une [chambre] pour ce soir ?", es:"¿Tiene una [habitación] para esta noche?", it:"Avete una [camera] per stasera?"},
 {sc:"🙋🔑🏨", p:"trav", fr:"La [clé], s'il vous plaît.", es:"La [llave], por favor.", it:"La [chiave], per favore."},
 {sc:"🧳😰❓", p:"trav", fr:"J'ai perdu ma [valise].", es:"He perdido mi [maleta].", it:"Ho perso la mia [valigia]."},
 {sc:"🛂👉📄", p:"trav", fr:"Voici mon [passeport].", es:"Aquí está mi [pasaporte].", it:"Ecco il mio [passaporto]."},
 {sc:"🆘🙏🧑", p:"trav", fr:"Vous pouvez m'[aider] ?", es:"¿Me puede [ayudar]?", it:"Mi può [aiutare]?"}
];

/* ~15-second context-restabiliser passages */
window.WARMUPS = {
  fr:[
    "Bonjour ! Aujourd'hui, il fait très beau. Ce matin, j'ai pris un café à la terrasse et j'ai regardé les gens passer dans la rue. Ce soir, je vais préparer le dîner avec des amis, et nous allons parler de nos vacances.",
    "Hier, je suis allé au marché. J'ai acheté du pain, du fromage et des tomates. Le vendeur était très gentil et nous avons parlé de la pluie et du beau temps. Ensuite, j'ai marché le long de la rivière jusqu'à la maison.",
    "Ce week-end, nous partons à la montagne. J'adore marcher dans la forêt le matin, quand tout est calme. À midi, nous mangeons du pain et du fromage près d'un petit lac, puis nous rentrons doucement avant la nuit."
  ],
  es:[
    "¡Hola! Hoy hace muy buen tiempo. Esta mañana tomé un café en la terraza y miré a la gente pasar por la calle. Esta noche voy a preparar la cena con unos amigos y vamos a hablar de nuestras vacaciones.",
    "Ayer fui al mercado. Compré pan, queso y tomates. El vendedor era muy amable y hablamos del tiempo. Después caminé a lo largo del río hasta casa, escuchando música y mirando los barcos en el agua.",
    "Este fin de semana vamos a la montaña. Me encanta caminar por el bosque por la mañana, cuando todo está tranquilo. Al mediodía comemos pan y queso cerca de un pequeño lago, y luego volvemos despacio antes de la noche."
  ],
  it:[
    "Ciao! Oggi fa molto bel tempo. Stamattina ho preso un caffè in terrazza e ho guardato la gente passare per strada. Stasera preparo la cena con degli amici e parliamo delle nostre vacanze.",
    "Ieri sono andato al mercato. Ho comprato pane, formaggio e pomodori. Il venditore era molto gentile e abbiamo parlato del tempo. Poi ho camminato lungo il fiume fino a casa, ascoltando la musica.",
    "Questo fine settimana andiamo in montagna. Mi piace camminare nel bosco la mattina, quando tutto è tranquillo. A mezzogiorno mangiamo pane e formaggio vicino a un piccolo lago, e poi torniamo lentamente prima di sera."
  ]
};
