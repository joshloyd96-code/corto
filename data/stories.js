/* PictoLingo graded readers — comprehensible input.
   Built from app vocabulary plus the high-frequency function words
   (toujours, mais, parce que, rien, quelque chose…) so they get massed
   exposure in context. Questions: correct answer is always index 0;
   the app shuffles options at render time. Append only. */
window.STORIES = [
 {
  e:"🐈🌙",
  t:{fr:"Le petit chat", es:"El pequeño gato", it:"Il piccolo gatto"},
  x:{
   fr:"Marie a un petit chat noir. Il s'appelle Milo. Milo dort toujours sur le lit, mais la nuit, il court dans la maison. Un matin, Marie ne trouve pas Milo. Elle cherche dans la cuisine, sous la table et dans le jardin. Rien ! Elle est très inquiète. Mais Milo n'est pas perdu : il dort dans le panier, avec le chien. Marie rit, parce que le chat et le chien sont maintenant amis.",
   es:"María tiene un pequeño gato negro. Se llama Milo. Milo siempre duerme en la cama, pero por la noche corre por la casa. Una mañana, María no encuentra a Milo. Busca en la cocina, debajo de la mesa y en el jardín. ¡Nada! Está muy preocupada. Pero Milo no está perdido: duerme en la cesta, con el perro. María ríe, porque el gato y el perro ahora son amigos.",
   it:"Maria ha un piccolo gatto nero. Si chiama Milo. Milo dorme sempre sul letto, ma di notte corre per la casa. Una mattina, Maria non trova Milo. Cerca in cucina, sotto il tavolo e in giardino. Niente! È molto preoccupata. Ma Milo non è perso: dorme nel cesto, con il cane. Maria ride, perché il gatto e il cane adesso sono amici."
  },
  q:[
   {q:{fr:"Où est Milo ?", es:"¿Dónde está Milo?", it:"Dov'è Milo?"},
    o:{fr:["dans le panier","sur le lit","dans le jardin","sous la table"],
       es:["en la cesta","en la cama","en el jardín","debajo de la mesa"],
       it:["nel cesto","sul letto","in giardino","sotto il tavolo"]}},
   {q:{fr:"Pourquoi Marie rit-elle ?", es:"¿Por qué ríe María?", it:"Perché ride Maria?"},
    o:{fr:["le chat et le chien sont amis","le chat est perdu","le chien dort","la maison est grande"],
       es:["el gato y el perro son amigos","el gato está perdido","el perro duerme","la casa es grande"],
       it:["il gatto e il cane sono amici","il gatto è perso","il cane dorme","la casa è grande"]}}
  ]
 },
 {
  e:"🏪🍎☀️",
  t:{fr:"Au marché", es:"En el mercado", it:"Al mercato"},
  x:{
   fr:"Le samedi matin, Paul va toujours au marché. Aujourd'hui, il veut acheter quelque chose pour le dîner. Il achète du poisson, des tomates et un peu de fromage. Le vendeur est très gentil et donne une orange à Paul. « Merci beaucoup ! » Au marché, il y a beaucoup de monde, parce qu'il fait beau. Après le marché, Paul boit un café avec un ami. Ils parlent du travail et de la famille. C'est une bonne journée.",
   es:"El sábado por la mañana, Pablo siempre va al mercado. Hoy quiere comprar algo para la cena. Compra pescado, tomates y un poco de queso. El vendedor es muy amable y le da una naranja a Pablo. «¡Muchas gracias!» En el mercado hay mucha gente, porque hace buen tiempo. Después del mercado, Pablo toma un café con un amigo. Hablan del trabajo y de la familia. Es un buen día.",
   it:"Il sabato mattina, Paolo va sempre al mercato. Oggi vuole comprare qualcosa per la cena. Compra del pesce, dei pomodori e un po' di formaggio. Il venditore è molto gentile e dà un'arancia a Paolo. «Grazie mille!» Al mercato c'è molta gente, perché fa bello. Dopo il mercato, Paolo beve un caffè con un amico. Parlano del lavoro e della famiglia. È una bella giornata."
  },
  q:[
   {q:{fr:"Qu'est-ce que Paul achète ?", es:"¿Qué compra Pablo?", it:"Cosa compra Paolo?"},
    o:{fr:["du poisson et des tomates","du pain et du lait","des pommes","un gâteau"],
       es:["pescado y tomates","pan y leche","manzanas","un pastel"],
       it:["pesce e pomodori","pane e latte","mele","una torta"]}},
   {q:{fr:"Pourquoi y a-t-il beaucoup de monde ?", es:"¿Por qué hay mucha gente?", it:"Perché c'è molta gente?"},
    o:{fr:["parce qu'il fait beau","parce que c'est gratuit","parce qu'il pleut","parce que c'est la nuit"],
       es:["porque hace buen tiempo","porque es gratis","porque llueve","porque es de noche"],
       it:["perché fa bello","perché è gratis","perché piove","perché è notte"]}}
  ]
 },
 {
  e:"🚆🌙❄️",
  t:{fr:"Le train de nuit", es:"El tren de noche", it:"Il treno di notte"},
  x:{
   fr:"Anna prend le train de nuit pour aller à la montagne. Elle arrive à la gare en retard, mais le train est encore là. Ouf ! Dans le train, elle mange un sandwich et boit un thé. Après, elle dort un peu. Le matin, elle regarde par la fenêtre : il neige ! Tout est blanc. Anna est heureuse, parce qu'elle adore le ski. Elle pense : « Peut-être que demain, je vais skier toute la journée. »",
   es:"Ana toma el tren de noche para ir a la montaña. Llega a la estación con retraso, pero el tren todavía está allí. ¡Uf! En el tren, come un bocadillo y bebe un té. Después, duerme un poco. Por la mañana, mira por la ventana: ¡está nevando! Todo está blanco. Ana está feliz, porque le encanta el esquí. Piensa: «Quizás mañana voy a esquiar todo el día.»",
   it:"Anna prende il treno di notte per andare in montagna. Arriva alla stazione in ritardo, ma il treno è ancora lì. Uff! Sul treno, mangia un panino e beve un tè. Dopo, dorme un po'. La mattina, guarda dalla finestra: nevica! Tutto è bianco. Anna è felice, perché adora lo sci. Pensa: «Forse domani vado a sciare tutto il giorno.»"
  },
  q:[
   {q:{fr:"Anna arrive à la gare…", es:"Ana llega a la estación…", it:"Anna arriva alla stazione…"},
    o:{fr:["en retard","à l'heure","le matin","avec un ami"],
       es:["con retraso","a tiempo","por la mañana","con un amigo"],
       it:["in ritardo","in orario","la mattina","con un amico"]}},
   {q:{fr:"Pourquoi Anna est-elle heureuse ?", es:"¿Por qué está feliz Ana?", it:"Perché Anna è felice?"},
    o:{fr:["parce qu'elle adore le ski","parce qu'il fait chaud","parce que le train est vide","parce qu'elle mange un gâteau"],
       es:["porque le encanta el esquí","porque hace calor","porque el tren está vacío","porque come un pastel"],
       it:["perché adora lo sci","perché fa caldo","perché il treno è vuoto","perché mangia una torta"]}}
  ]
 },
 {
  e:"🎂🎉🎸",
  t:{fr:"L'anniversaire", es:"El cumpleaños", it:"Il compleanno"},
  x:{
   fr:"Aujourd'hui, c'est l'anniversaire de Léo. Il a trente ans. Sa famille prépare une fête dans le jardin. Sa mère fait un grand gâteau au chocolat, et son père achète du vin. Tout le monde arrive à six heures. Léo ouvre ses cadeaux : un livre, une guitare et un ballon de foot. « Merci à tous ! » Ils mangent, chantent et dansent jusqu'à la nuit. De temps en temps, le chien mange un peu de gâteau sous la table.",
   es:"Hoy es el cumpleaños de Leo. Tiene treinta años. Su familia prepara una fiesta en el jardín. Su madre hace un gran pastel de chocolate y su padre compra vino. Todo el mundo llega a las seis. Leo abre sus regalos: un libro, una guitarra y un balón de fútbol. «¡Gracias a todos!» Comen, cantan y bailan hasta la noche. De vez en cuando, el perro come un poco de pastel debajo de la mesa.",
   it:"Oggi è il compleanno di Leo. Ha trent'anni. La sua famiglia prepara una festa in giardino. Sua madre fa una grande torta al cioccolato e suo padre compra del vino. Tutti arrivano alle sei. Leo apre i suoi regali: un libro, una chitarra e un pallone da calcio. «Grazie a tutti!» Mangiano, cantano e ballano fino a notte. Ogni tanto, il cane mangia un po' di torta sotto il tavolo."
  },
  q:[
   {q:{fr:"Quel âge a Léo ?", es:"¿Cuántos años tiene Leo?", it:"Quanti anni ha Leo?"},
    o:{fr:["trente ans","vingt ans","treize ans","quarante ans"],
       es:["treinta","veinte","trece","cuarenta"],
       it:["trenta","venti","tredici","quaranta"]}},
   {q:{fr:"Qui mange du gâteau sous la table ?", es:"¿Quién come pastel debajo de la mesa?", it:"Chi mangia la torta sotto il tavolo?"},
    o:{fr:["le chien","le père","Léo","le chat"],
       es:["el perro","el padre","Leo","el gato"],
       it:["il cane","il padre","Leo","il gatto"]}}
  ]
 },
 {
  e:"☕🚌🏢",
  t:{fr:"Le café du matin", es:"El café de la mañana", it:"Il caffè del mattino"},
  x:{
   fr:"Tous les matins, Hugo boit un café avant le travail. Aujourd'hui, le café est fermé ! Hugo n'est pas content. Il marche jusqu'à un autre café, mais il est en retard. Dans le bus, une femme lui donne un chocolat. « Merci beaucoup ! » Au bureau, son collègue a une surprise : une nouvelle machine à café. Maintenant, Hugo boit son café tous les jours au bureau. Il est très heureux.",
   es:"Todas las mañanas, Hugo bebe un café antes del trabajo. ¡Hoy el café está cerrado! Hugo no está contento. Camina hasta otro café, pero llega tarde. En el autobús, una mujer le da un chocolate. «¡Muchas gracias!» En la oficina, su colega tiene una sorpresa: una nueva máquina de café. Ahora Hugo bebe su café todos los días en la oficina. Está muy feliz.",
   it:"Tutte le mattine, Ugo beve un caffè prima del lavoro. Oggi il caffè è chiuso! Ugo non è contento. Cammina fino a un altro caffè, ma è in ritardo. Sull'autobus, una donna gli dà un cioccolatino. «Grazie mille!» In ufficio, il suo collega ha una sorpresa: una nuova macchina del caffè. Adesso Ugo beve il suo caffè tutti i giorni in ufficio. È molto felice."
  },
  q:[
   {q:{fr:"Pourquoi Hugo n'est-il pas content ?", es:"¿Por qué no está contento Hugo?", it:"Perché Ugo non è contento?"},
    o:{fr:["le café est fermé","il pleut","le bus est en retard","le café est cher"],
       es:["el café está cerrado","llueve","el autobús llega tarde","el café es caro"],
       it:["il caffè è chiuso","piove","l'autobus è in ritardo","il caffè è caro"]}},
   {q:{fr:"Qu'est-ce qu'il y a au bureau ?", es:"¿Qué hay en la oficina?", it:"Cosa c'è in ufficio?"},
    o:{fr:["une machine à café","un chien","un gâteau","une télévision"],
       es:["una máquina de café","un perro","un pastel","una televisión"],
       it:["una macchina del caffè","un cane","una torta","una televisione"]}}
  ]
 },
 {
  e:"🌧️📖🌈",
  t:{fr:"La pluie", es:"La lluvia", it:"La pioggia"},
  x:{
   fr:"Il pleut depuis trois jours. Emma regarde par la fenêtre et attend. Elle veut aller au parc avec son vélo, mais c'est impossible. Alors, elle lit un livre, écoute de la musique et fait un gâteau avec sa grand-mère. Le soir, enfin, la pluie s'arrête. Un arc-en-ciel apparaît dans le ciel. « Demain, il va faire beau ! » dit la grand-mère. Emma est contente : demain, elle va au parc.",
   es:"Llueve desde hace tres días. Emma mira por la ventana y espera. Quiere ir al parque con su bicicleta, pero es imposible. Entonces lee un libro, escucha música y hace un pastel con su abuela. Por la tarde, por fin, la lluvia se detiene. Un arcoíris aparece en el cielo. «¡Mañana hará buen tiempo!», dice la abuela. Emma está contenta: mañana va al parque.",
   it:"Piove da tre giorni. Emma guarda dalla finestra e aspetta. Vuole andare al parco con la sua bicicletta, ma è impossibile. Allora legge un libro, ascolta la musica e fa una torta con sua nonna. La sera, finalmente, la pioggia si ferma. Un arcobaleno appare nel cielo. «Domani farà bello!», dice la nonna. Emma è contenta: domani va al parco."
  },
  q:[
   {q:{fr:"Qu'est-ce qu'Emma fait avec sa grand-mère ?", es:"¿Qué hace Emma con su abuela?", it:"Cosa fa Emma con sua nonna?"},
    o:{fr:["un gâteau","un vélo","une lettre","une pizza"],
       es:["un pastel","una bicicleta","una carta","una pizza"],
       it:["una torta","una bicicletta","una lettera","una pizza"]}},
   {q:{fr:"Qu'est-ce qu'il y a dans le ciel le soir ?", es:"¿Qué hay en el cielo por la tarde?", it:"Cosa c'è nel cielo la sera?"},
    o:{fr:["un arc-en-ciel","un avion","la lune","des nuages noirs"],
       es:["un arcoíris","un avión","la luna","nubes negras"],
       it:["un arcobaleno","un aereo","la luna","nuvole nere"]}}
  ]
 },
 {
  e:"🏥👩‍⚕️✨",
  t:{fr:"Le nouveau travail", es:"El nuevo trabajo", it:"Il nuovo lavoro"},
  x:{
   fr:"Lundi, Sara commence un nouveau travail à l'hôpital. Elle est infirmière. Le premier jour, elle est très nerveuse. Mais ses collègues sont gentils, et le médecin explique tout lentement. À midi, tout le monde mange ensemble. Une collègue demande : « Tu viens d'où ? » Sara répond : « Je viens d'Angleterre, mais maintenant j'habite ici. » Après une semaine, Sara n'est plus nerveuse. Elle aime son nouveau travail, parce que chaque jour est différent.",
   es:"El lunes, Sara empieza un nuevo trabajo en el hospital. Es enfermera. El primer día está muy nerviosa. Pero sus colegas son amables y el médico explica todo despacio. A mediodía, todo el mundo come junto. Una colega pregunta: «¿De dónde eres?» Sara responde: «Soy de Inglaterra, pero ahora vivo aquí.» Después de una semana, Sara ya no está nerviosa. Le gusta su nuevo trabajo, porque cada día es diferente.",
   it:"Lunedì, Sara comincia un nuovo lavoro all'ospedale. È infermiera. Il primo giorno è molto nervosa. Ma i suoi colleghi sono gentili e il medico spiega tutto lentamente. A mezzogiorno, tutti mangiano insieme. Una collega chiede: «Da dove vieni?» Sara risponde: «Vengo dall'Inghilterra, ma adesso abito qui.» Dopo una settimana, Sara non è più nervosa. Le piace il suo nuovo lavoro, perché ogni giorno è diverso."
  },
  q:[
   {q:{fr:"Quel est le travail de Sara ?", es:"¿Cuál es el trabajo de Sara?", it:"Qual è il lavoro di Sara?"},
    o:{fr:["infirmière","médecin","professeure","cuisinière"],
       es:["enfermera","médica","profesora","cocinera"],
       it:["infermiera","medico","professoressa","cuoca"]}},
   {q:{fr:"Pourquoi Sara aime-t-elle son travail ?", es:"¿Por qué le gusta su trabajo?", it:"Perché le piace il suo lavoro?"},
    o:{fr:["chaque jour est différent","le salaire est grand","l'hôpital est petit","elle dort beaucoup"],
       es:["cada día es diferente","el sueldo es grande","el hospital es pequeño","duerme mucho"],
       it:["ogni giorno è diverso","lo stipendio è grande","l'ospedale è piccolo","dorme molto"]}}
  ]
 },
 {
  e:"🧭🏛️🚌",
  t:{fr:"Perdu en ville", es:"Perdido en la ciudad", it:"Perso in città"},
  x:{
   fr:"Tom visite une grande ville pour la première fois. Il veut aller au musée, mais après dix minutes, il est perdu. Il ne trouve rien sur la carte. Il demande à un homme : « Excusez-moi, où est le musée ? » L'homme répond : « C'est loin. Prenez le bus numéro cinq, puis allez tout droit. » Tom trouve enfin le musée. À l'intérieur, il regarde les tableaux pendant trois heures. Quelle belle journée !",
   es:"Tom visita una gran ciudad por primera vez. Quiere ir al museo, pero después de diez minutos está perdido. No encuentra nada en el mapa. Le pregunta a un hombre: «Perdona, ¿dónde está el museo?» El hombre responde: «Está lejos. Tome el autobús número cinco y luego siga todo recto.» Tom encuentra por fin el museo. Dentro, mira los cuadros durante tres horas. ¡Qué buen día!",
   it:"Tom visita una grande città per la prima volta. Vuole andare al museo, ma dopo dieci minuti è perso. Non trova niente sulla mappa. Chiede a un uomo: «Scusi, dov'è il museo?» L'uomo risponde: «È lontano. Prenda l'autobus numero cinque, poi vada sempre dritto.» Tom trova finalmente il museo. Dentro, guarda i quadri per tre ore. Che bella giornata!"
  },
  q:[
   {q:{fr:"Où va Tom ?", es:"¿Adónde va Tom?", it:"Dove va Tom?"},
    o:{fr:["au musée","à la gare","au marché","à l'hôpital"],
       es:["al museo","a la estación","al mercado","al hospital"],
       it:["al museo","alla stazione","al mercato","all'ospedale"]}},
   {q:{fr:"Quel bus prend Tom ?", es:"¿Qué autobús toma Tom?", it:"Quale autobus prende Tom?"},
    o:{fr:["le numéro cinq","le numéro dix","le numéro trois","le numéro neuf"],
       es:["el número cinco","el número diez","el número tres","el número nueve"],
       it:["il numero cinque","il numero dieci","il numero tre","il numero nove"]}}
  ]
 },
 {
  e:"✉️🌳💛",
  t:{fr:"La lettre", es:"La carta", it:"La lettera"},
  x:{
   fr:"Dans une vieille boîte, Julie trouve une lettre de son grand-père. La lettre a cinquante ans ! Il écrit : « Aujourd'hui, j'ai planté un arbre dans le jardin, derrière la maison. Sous l'arbre, il y a quelque chose pour toi. » Julie court au jardin avec une pelle. Elle creuse sous le grand arbre et trouve une petite boîte. À l'intérieur : une montre en or et une photo de toute la famille. Julie pleure, mais elle est heureuse.",
   es:"En una caja vieja, Julia encuentra una carta de su abuelo. ¡La carta tiene cincuenta años! Él escribe: «Hoy he plantado un árbol en el jardín, detrás de la casa. Debajo del árbol hay algo para ti.» Julia corre al jardín con una pala. Cava debajo del gran árbol y encuentra una pequeña caja. Dentro: un reloj de oro y una foto de toda la familia. Julia llora, pero está feliz.",
   it:"In una vecchia scatola, Giulia trova una lettera di suo nonno. La lettera ha cinquant'anni! Lui scrive: «Oggi ho piantato un albero in giardino, dietro la casa. Sotto l'albero c'è qualcosa per te.» Giulia corre in giardino con una pala. Scava sotto il grande albero e trova una piccola scatola. Dentro: un orologio d'oro e una foto di tutta la famiglia. Giulia piange, ma è felice."
  },
  q:[
   {q:{fr:"Qu'est-ce que Julie trouve sous l'arbre ?", es:"¿Qué encuentra Julia debajo del árbol?", it:"Cosa trova Giulia sotto l'albero?"},
    o:{fr:["une petite boîte","un chat","de l'argent","un livre"],
       es:["una pequeña caja","un gato","dinero","un libro"],
       it:["una piccola scatola","un gatto","dei soldi","un libro"]}},
   {q:{fr:"La lettre est de qui ?", es:"¿De quién es la carta?", it:"Di chi è la lettera?"},
    o:{fr:["de son grand-père","de sa mère","d'un ami","de son frère"],
       es:["de su abuelo","de su madre","de un amigo","de su hermano"],
       it:["di suo nonno","di sua madre","di un amico","di suo fratello"]}}
  ]
 },
 {
  e:"⚽🏟️🎉",
  t:{fr:"Le match", es:"El partido", it:"La partita"},
  x:{
   fr:"Ce soir, il y a un grand match de football au stade. Nico et son père arrivent tôt, parce qu'il y a beaucoup de monde. Le match commence à huit heures. L'équipe de Nico joue très bien, mais à la fin, c'est un à un. Dans la dernière minute, le numéro dix marque un but ! Tout le monde crie et chante. Nico est si heureux qu'il ne dort presque pas cette nuit.",
   es:"Esta noche hay un gran partido de fútbol en el estadio. Nico y su padre llegan temprano, porque hay mucha gente. El partido empieza a las ocho. El equipo de Nico juega muy bien, pero al final van uno a uno. ¡En el último minuto, el número diez marca un gol! Todo el mundo grita y canta. Nico está tan feliz que casi no duerme esta noche.",
   it:"Stasera c'è una grande partita di calcio allo stadio. Nico e suo padre arrivano presto, perché c'è molta gente. La partita comincia alle otto. La squadra di Nico gioca molto bene, ma alla fine è uno a uno. All'ultimo minuto, il numero dieci segna un gol! Tutti gridano e cantano. Nico è così felice che quasi non dorme questa notte."
  },
  q:[
   {q:{fr:"Le match commence à quelle heure ?", es:"¿A qué hora empieza el partido?", it:"A che ora comincia la partita?"},
    o:{fr:["à huit heures","à six heures","à dix heures","à neuf heures"],
       es:["a las ocho","a las seis","a las diez","a las nueve"],
       it:["alle otto","alle sei","alle dieci","alle nove"]}},
   {q:{fr:"Qui marque le but ?", es:"¿Quién marca el gol?", it:"Chi segna il gol?"},
    o:{fr:["le numéro dix","le numéro cinq","Nico","le père de Nico"],
       es:["el número diez","el número cinco","Nico","el padre de Nico"],
       it:["il numero dieci","il numero cinque","Nico","il padre di Nico"]}}
  ]
 },
 {
  e:"🍳🚪🍕",
  t:{fr:"Le dîner surprise", es:"La cena sorpresa", it:"La cena a sorpresa"},
  x:{
   fr:"Vendredi soir, Chloé rentre tard du travail. Elle est fatiguée et elle a faim, mais le frigo est presque vide : trois œufs, un peu de fromage et une tomate. « Pas de problème ! » Elle cuisine une omelette avec une salade. Pendant le dîner, on sonne à la porte. C'est sa sœur, avec une pizza et un gâteau au chocolat ! Elles mangent, parlent et rient jusqu'à minuit. Parfois, les meilleures soirées ne sont pas planifiées.",
   es:"El viernes por la noche, Chloé vuelve tarde del trabajo. Está cansada y tiene hambre, pero la nevera está casi vacía: tres huevos, un poco de queso y un tomate. «¡No hay problema!» Cocina una tortilla con una ensalada. Durante la cena, alguien llama a la puerta. ¡Es su hermana, con una pizza y un pastel de chocolate! Comen, hablan y ríen hasta medianoche. A veces, las mejores noches no están planeadas.",
   it:"Venerdì sera, Chloé torna tardi dal lavoro. È stanca e ha fame, ma il frigorifero è quasi vuoto: tre uova, un po' di formaggio e un pomodoro. «Nessun problema!» Cucina una frittata con un'insalata. Durante la cena, qualcuno suona alla porta. È sua sorella, con una pizza e una torta al cioccolato! Mangiano, parlano e ridono fino a mezzanotte. A volte, le serate migliori non sono programmate."
  },
  q:[
   {q:{fr:"Qu'est-ce que Chloé cuisine ?", es:"¿Qué cocina Chloé?", it:"Cosa cucina Chloé?"},
    o:{fr:["une omelette","une pizza","des pâtes","une soupe"],
       es:["una tortilla","una pizza","pasta","una sopa"],
       it:["una frittata","una pizza","la pasta","una zuppa"]}},
   {q:{fr:"Qui arrive à la porte ?", es:"¿Quién llega a la puerta?", it:"Chi arriva alla porta?"},
    o:{fr:["sa sœur","sa mère","un ami","le voisin"],
       es:["su hermana","su madre","un amigo","el vecino"],
       it:["sua sorella","sua madre","un amico","il vicino"]}}
  ]
 },
 {
  e:"🚗🌊⛱️",
  t:{fr:"Les vacances", es:"Las vacaciones", it:"Le vacanze"},
  x:{
   fr:"En août, la famille Martin part en vacances à la mer. Le voyage est long : cinq heures de voiture ! Les enfants chantent, dorment et demandent cent fois : « On arrive quand ? » Enfin, ils voient la mer. L'hôtel est petit mais propre, avec une vue magnifique. Chaque jour, ils nagent, mangent des glaces et jouent au ballon sur la plage. Le dernier soir, ils regardent le soleil descendre dans la mer. Personne ne veut rentrer à la maison.",
   es:"En agosto, la familia Martín se va de vacaciones al mar. El viaje es largo: ¡cinco horas de coche! Los niños cantan, duermen y preguntan cien veces: «¿Cuándo llegamos?» Por fin, ven el mar. El hotel es pequeño pero limpio, con una vista magnífica. Cada día nadan, comen helados y juegan a la pelota en la playa. La última noche, miran el sol bajar al mar. Nadie quiere volver a casa.",
   it:"Ad agosto, la famiglia Martini parte per le vacanze al mare. Il viaggio è lungo: cinque ore di macchina! I bambini cantano, dormono e chiedono cento volte: «Quando arriviamo?» Finalmente vedono il mare. L'hotel è piccolo ma pulito, con una vista magnifica. Ogni giorno nuotano, mangiano gelati e giocano a palla sulla spiaggia. L'ultima sera, guardano il sole scendere nel mare. Nessuno vuole tornare a casa."
  },
  q:[
   {q:{fr:"Combien d'heures dure le voyage ?", es:"¿Cuántas horas dura el viaje?", it:"Quante ore dura il viaggio?"},
    o:{fr:["cinq heures","deux heures","dix heures","une heure"],
       es:["cinco horas","dos horas","diez horas","una hora"],
       it:["cinque ore","due ore","dieci ore","un'ora"]}},
   {q:{fr:"Qu'est-ce qu'ils font chaque jour ?", es:"¿Qué hacen cada día?", it:"Cosa fanno ogni giorno?"},
    o:{fr:["ils nagent et mangent des glaces","ils travaillent","ils visitent des musées","ils dorment"],
       es:["nadan y comen helados","trabajan","visitan museos","duermen"],
       it:["nuotano e mangiano gelati","lavorano","visitano musei","dormono"]}}
  ]
 }
];
