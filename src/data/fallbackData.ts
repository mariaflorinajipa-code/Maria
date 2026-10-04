import { BusinessPreset, IdeaItem, ScriptItem, PostItem, CalendarWeek, GeneratorFormState } from '../types';

export const BUSINESS_PRESETS: BusinessPreset[] = [
  {
    id: 'peluqueria',
    label: 'Peluquería / Salón de Belleza',
    icon: '✂️',
    defaultService: 'Balayage iluminador & Tratamiento de Brillo',
    sampleServices: [
      'Balayage iluminador & Tratamiento de Brillo',
      'Tratamiento de Keratina antiencrespamiento',
      'Corte de pelo en tendencia & Peinado',
      'Recogidos y maquillaje para eventos',
      'Terapia capilar hidratante profunda',
    ],
    defaultAudience: 'Mujeres y jóvenes locales que buscan cuidar su cabello con resultados naturales y duraderos',
    defaultTone: 'Cercano y profesional',
    defaultCity: 'mi ciudad',
    tagline: 'Muestra transformaciones reales del antes y después',
  },
  {
    id: 'estetica',
    label: 'Centro de Estética & Spa',
    icon: '✨',
    defaultService: 'Limpieza facial profunda ultrasónica con hidratación',
    sampleServices: [
      'Limpieza facial profunda ultrasónica con hidratación',
      'Maderoterapia corporal reductora',
      'Depilación láser indolora de última generación',
      'Diseño y laminado de cejas + lifting de pestañas',
      'Masaje relajante descontracturante con aromaterapia',
    ],
    defaultAudience: 'Personas que priorizan el autocuidado, desconectar del estrés y lucir una piel luminosa',
    defaultTone: 'Inspirador y relajante',
    defaultCity: 'mi ciudad',
    tagline: 'Transmite calma, higiene clínica y bienestar visual',
  },
  {
    id: 'restaurante',
    label: 'Restaurante / Cafetería / Bar',
    icon: '🍽️',
    defaultService: 'Menú especial de fin de semana con producto local',
    sampleServices: [
      'Menú especial de fin de semana con producto local',
      'Brunch completo con café de especialidad y tostadas',
      'Hamburguesas gourmet caseras y patatas trufadas',
      'Tapeo tradicional con raciones para compartir',
      'Postres caseros recién horneados',
    ],
    defaultAudience: 'Foodies, parejas, familias y grupos de amigos que buscan disfrutar de una buena comida en un ambiente acogedor',
    defaultTone: 'Divertido y apetitoso',
    defaultCity: 'mi ciudad',
    tagline: 'Haz que sientan el aroma y el crujido a través de la pantalla',
  },
  {
    id: 'tienda_ropa',
    label: 'Tienda de Ropa & Moda',
    icon: '👗',
    defaultService: 'Nueva colección de temporada & Guía de combinaciones',
    sampleServices: [
      'Nueva colección de temporada & Guía de combinaciones',
      'Prendas básicas de fondo de armario versátiles',
      'Vestidos de fiesta y ocasiones especiales',
      'Prendas de lino fresco y estilo casual chic',
      'Accesorios, bolsos y calzado a juego',
    ],
    defaultAudience: 'Mujeres y amantes de la moda práctica que quieren verse bien sin complicarse todos los días',
    defaultTone: 'Cercano y dinámico',
    defaultCity: 'mi ciudad',
    tagline: 'Viste a tus clientes con ideas de outfits listas para usar',
  },
  {
    id: 'gimnasio',
    label: 'Gimnasio & Centro Fitness',
    icon: '💪',
    defaultService: 'Plan de inicio guiado de 30 días para principiantes',
    sampleServices: [
      'Plan de inicio guiado de 30 días para principiantes',
      'Clases grupales dinámicas (Spinning, Funcional, Pilates)',
      'Entrenamiento personal 1 a 1 adaptado a objetivos',
      'Zona de fuerza y peso libre con asesoramiento',
      'Reto de hábitos saludables y movilidad articular',
    ],
    defaultAudience: 'Vecinos de la zona que quieren ponerse en forma sin sentirse juzgados y con apoyo constante',
    defaultTone: 'Motivador y cercano',
    defaultCity: 'mi ciudad',
    tagline: 'Desmitifica el gimnasio y celebra pequeñas victorias cotidianas',
  },
  {
    id: 'clinica_dental',
    label: 'Clínica Dental & Salud',
    icon: '🦷',
    defaultService: 'Blanqueamiento dental profesional seguro y rápido',
    sampleServices: [
      'Blanqueamiento dental profesional seguro y rápido',
      'Ortodoncia invisible con escáner digital 3D',
      'Revisión y limpieza dental preventiva sin dolor',
      'Implantes dentales con tecnología mínimamente invasiva',
      'Odontopediatría con trato cariñoso para los peques',
    ],
    defaultAudience: 'Familias y adultos que buscan tranquilidad, cero dolor y sonreír con total seguridad',
    defaultTone: 'Profesional, empático y tranquilizador',
    defaultCity: 'mi ciudad',
    tagline: 'Quita el miedo al dentista con transparencia y simpatía',
  },
  {
    id: 'mascotas',
    label: 'Tienda de Mascotas & Veterinaria',
    icon: '🐾',
    defaultService: 'Peluquería canina y felina con mimos y sin estrés',
    sampleServices: [
      'Peluquería canina y felina con mimos y sin estrés',
      'Chequeo preventivo de salud y vacunas al día',
      'Alimentación natural y piensos de calidad premium',
      'Juguetes interactivos para reducir la ansiedad',
      'Consejos de higiene y cuidado dental para mascotas',
    ],
    defaultAudience: 'Familias con perros y gatos que tratan a sus mascotas como un miembro más de la familia',
    defaultTone: 'Divertido, tierno y educativo',
    defaultCity: 'mi ciudad',
    tagline: 'El contenido con mascotas genera la mayor interacción orgánica',
  },
  {
    id: 'otro',
    label: 'Otro Pequeño Negocio / Comercio Local',
    icon: '🏪',
    defaultService: 'Servicio personalizado y trato directo de confianza',
    sampleServices: [
      'Servicio personalizado y trato directo de confianza',
      'Promoción de bienvenida para clientes nuevos',
      'Taller o demostración en directo',
      'Soluciones a medida para el día a día',
    ],
    defaultAudience: 'Vecinos y residentes locales que valoran el comercio de proximidad y la atención humana',
    defaultTone: 'Cercano y profesional',
    defaultCity: 'mi ciudad',
    tagline: 'Conecta con tu barrio y destaca lo que te hace único',
  },
];

export const TONE_OPTIONS = [
  { id: 'cercano', label: 'Cercano y amigable', description: 'Como charlar con un vecino o cliente habitual de confianza' },
  { id: 'divertido', label: 'Divertido y dinámico', description: 'Ganchos con chispa, ritmo ágil y tono fresco para conectar rápido' },
  { id: 'profesional', label: 'Profesional y experto', description: 'Transmite autoridad técnica, cuidado extremo del detalle y rigor' },
  { id: 'inspirador', label: 'Inspirador y motivador', description: 'Centrado en la superación, bienestar y cómo el cliente se sentirá' },
  { id: 'urgente', label: 'Promocional y directo', description: 'Para promociones, ofertas de temporada o plazas limitadas' },
];

export const AUDIENCE_SUGGESTIONS = [
  'Vecinos y clientes del barrio que buscan trato de confianza y calidad',
  'Jóvenes y adultos jóvenes (20-38 años) usuarios de Instagram y TikTok',
  'Mujeres trabajadoras que valoran optimizar su tiempo y su bienestar',
  'Familias locales que buscan opciones prácticas y fiables para todos',
  'Personas interesadas en cuidarse, salud y estilo de vida activo',
];

// Fallback content generators with rich, realistic, copy-paste-ready Spanish social media content
export function generateFallbackIdeas(form: GeneratorFormState): IdeaItem[] {
  const business = form.businessType === 'otro' ? form.customBusiness || 'tu negocio' : form.businessType;
  const service = form.service || 'tu servicio estrella';
  const city = form.city ? ` en ${form.city}` : '';

  return [
    {
      id: 'idea-1',
      title: 'El error más común que casi todos cometen',
      format: 'Reel',
      hook: `⚠️ El error nº 1 que veo con ${service} (y cómo solucionarlo en 2 pasos)`,
      concept: `Empieza mostrando el problema común que sufren tus clientes cuando no conocen ${service}. Luego enseña la solución práctica en tu negocio de forma visual y clara.`,
      goal: 'Educar a la audiencia y posicionarte como el experto de referencia',
      tip: 'Graba en vertical con buena luz frontal. Los primeros 2 segundos deben mostrar el gesto de descontento o el fallo visual.',
    },
    {
      id: 'idea-2',
      title: 'Transformación Real: El proceso completo',
      format: 'Reel',
      hook: `Así es cómo transformamos esto en menos de una sesión ✨`,
      concept: `Muestra el punto de partida (sin dramatizar, con respeto), el paso intermedio con las herramientas o técnicas que usas, y la sonrisa o satisfacción final del cliente.`,
      goal: 'Generar confianza inmediata y derribar objeciones sobre el resultado',
      tip: 'Usa una transición rápida con chasquido de dedos o movimiento de cámara para revelar el resultado.',
    },
    {
      id: 'idea-3',
      title: '3 Razones por las que necesitas probar esto este mes',
      format: 'Carrusel',
      hook: `¿Vale realmente la pena ${service}? Te lo resumo en 3 diapositivas 📌`,
      concept: `Diapositiva 1: Portada con pregunta gancho. Diapositiva 2: Beneficio 1 (tiempo/resultado). Diapositiva 3: Beneficio 2 (durabilidad/bienestar). Diapositiva 4: Pregunta a la comunidad + cómo reservar.`,
      goal: 'Guardados y compartidos, ideal para el algoritmo de Instagram',
      tip: 'Usa texto grande y legible con fondo contrastado para que se lea sin esfuerzo al deslizar.',
    },
    {
      id: 'idea-4',
      title: 'Un día entre bastidores: Preparando todo para ti',
      format: 'Reel',
      hook: `Lo que nunca ves de nuestro día a día mientras tú descansas ☕`,
      concept: `Un mini recorrido cinematográfico pero casero: cómo abres el local, preparas el material para ${service}, el aroma, los detalles de limpieza y la primera sonrisa al abrir la puerta.`,
      goal: 'Humanizar tu marca y crear vínculo emocional con clientes locales',
      tip: 'Añade una música en tendencia suave pero con ritmo positivo de fondo y sonido ambiente (ASMR).',
    },
    {
      id: 'idea-5',
      title: 'Respondiendo a la pregunta que más nos hacéis por privado',
      format: 'Historias Interactivas',
      hook: `¿Dura mucho? ¿Duele? ¿Cómo funciona? Respondemos con total sinceridad 👇`,
      concept: `Publica una cajita de preguntas en Stories o un vídeo corto de 20s respondiendo con naturalidad a la duda más frecuente sobre ${service}. Añade una encuesta o botón de reserva directa.`,
      goal: 'Interacción directa y activación de mensajes privados de posibles clientes',
      tip: 'Incluye stickers interactivos ("Encuesta" o "Enlace") para que sea facilísimo responder con un toque.',
    },
    {
      id: 'idea-6',
      title: 'Oferta o detalle de la semana para vecinos y seguidores',
      format: 'Post Estático',
      hook: `Esta semana tenemos algo preparado para quienes venís de redes 🎁`,
      concept: `Presenta un pequeño valor añadido (muestra de regalo, diagnóstico gratuito o prioridad en agenda) al reservar ${service} durante los próximos días${city}.`,
      goal: 'Fomentar la acción inmediata y reservas a corto plazo',
      tip: 'Sé muy claro con las condiciones y la fecha límite para evitar confusiones.',
    },
  ];
}

export function generateFallbackScripts(form: GeneratorFormState): ScriptItem[] {
  const service = form.service || 'nuestro servicio';
  const city = form.city ? ` en ${form.city}` : '';

  return [
    {
      id: 'script-1',
      title: 'Guion 1: El Gancho del Problema vs Solución (22 segundos)',
      duration: '20-25 seg',
      hook: 'Si todavía sigues haciendo esto, estás perdiendo tiempo y dinero 👇',
      musicSuggestion: 'Audio de tendencia con ritmo dinámico (Lo-Fi Pop o beat electrónico suave)',
      scenes: [
        {
          time: '0-3s',
          visual: 'Plano corto a cámara haciendo un gesto de "¿por qué sigues sufriendo con esto?" o sujetando el producto/material con cara de sorpresa.',
          audio: 'Si todavía sigues luchando con esto cada semana, por favor quédate 15 segundos.',
          onScreenText: '🚨 STOP si estás buscando un cambio real',
        },
        {
          time: '3-12s',
          visual: 'Corte rápido a planos detalle del proceso de ' + service + ' en acción. Manos trabajando con precisión, textura, brillos o sonido envolvente.',
          audio: 'Con ' + service + ' logramos un resultado impecable desde la primera sesión, sin complicaciones y adaptado 100% a lo que tú necesitas.',
          onScreenText: '✨ Proceso paso a paso: ' + service,
        },
        {
          time: '12-18s',
          visual: 'Resultado final iluminado, el cliente sonriendo o el detalle del trabajo terminado.',
          audio: 'Miras esto y la diferencia habla por sí sola. Fácil, duradero y sin secretos.',
          onScreenText: 'Resultado real sin filtros 👏',
        },
        {
          time: '18-22s',
          visual: 'Mirando a cámara con sonrisa amable, señalando abajo hacia la descripción.',
          audio: 'Escríbenos "INFO" por privado o déjanos un comentario y te contamos los huecos disponibles esta semana.',
          onScreenText: '👉 Comenta "INFO" o reserva en el link de la bio',
        },
      ],
      callToAction: 'Comenta "INFO" para recibir los detalles por mensaje directo o visita el enlace en nuestro perfil.',
      caption: `¿Cuántas veces has pospuesto cuidarte por falta de tiempo? ⏳\n\nEn nuestro espacio apostamos por resultados reales y un trato cercano desde que cruzas la puerta. Nuestro ${service} está pensado para que disfrutes tanto del proceso como del resultado final.\n\n📍 Te esperamos${city}.\n💬 ¿Tienes alguna duda? Déjamela en los comentarios y te respondo en minutos.\n\n👇 Guarda este Reel para tu próxima visita.`,
      hashtags: ['#negociolocal', '#servicioprofesional', '#calidadgarantizada', '#reelsviral', '#emprendedores', '#cambioradical'],
    },
    {
      id: 'script-2',
      title: 'Guion 2: "Tres cosas que no sabías de..." (18 segundos)',
      duration: '15-20 seg',
      hook: '3 cosas sobre ' + service + ' que casi nadie te cuenta abiertamente 🤫',
      musicSuggestion: 'Sonido con curiosidad o misterio que remata con beat alegre',
      scenes: [
        {
          time: '0-3s',
          visual: 'Entrando en el plano y levantando 3 dedos hacia la lente con mirada cómplice.',
          audio: 'Tres cosas sobre ' + service + ' que agradecerás saber antes de tu primera cita.',
          onScreenText: '3 Cosas que debes saber de ' + service,
        },
        {
          time: '3-8s',
          visual: 'Plano del producto o espacio de trabajo. Dedo 1 en pantalla.',
          audio: 'Uno: No necesitas horas interminables, el proceso está optimizado para tu comodidad.',
          onScreenText: '1. Rápido y sin esperas innecesarias',
        },
        {
          time: '8-13s',
          visual: 'Demostración de calidad o textura. Dedo 2 en pantalla.',
          audio: 'Dos: El mantenimiento en casa es mucho más sencillo de lo que imaginas.',
          onScreenText: '2. Mantenimiento súper fácil en casa',
        },
        {
          time: '13-18s',
          visual: 'Tú saludando o mostrando el espacio impecable.',
          audio: 'Y tres: La primera valoración personalizada es totalmente gratuita. ¡Te esperamos!',
          onScreenText: '3. Asesoramiento personalizado sin compromiso',
        },
      ],
      callToAction: 'Guarda este vídeo y compártelo con esa persona que siempre te dice que quiere probarlo.',
      caption: `La transparencia con nuestros clientes es nuestra regla número uno 🤝\n\nMuchas veces nos preguntáis si ${service} es adecuado para vosotras/os. La respuesta rápida es que sí, porque lo personalizamos para cada caso.\n\n✨ ¿Cuál de los 3 puntos te ha sorprendido más? Cuéntanoslo en comentarios.\n\n📲 Citas y consultas directas en el enlace de la bio.`,
      hashtags: ['#consejosutiles', '#tipsdebelleza', '#negociodeproximidad', '#tiktoktips', '#experiencia'],
    },
    {
      id: 'script-3',
      title: 'Guion 3: Detrás de cámaras con sonido ASMR y cercanía (25 segundos)',
      duration: '20-25 seg',
      hook: 'Sube el volumen y desconecta con nosotros 30 segundos 🎧✨',
      musicSuggestion: 'Sonido ambiente real (ASMR) mezclado con melodía chill instrumental de fondo',
      scenes: [
        {
          time: '0-4s',
          visual: 'Toma macro: sonidito satisfactorio al abrir el bote, encender la máquina o colocar los útiles limpios.',
          audio: '[Sonido nítido de preparación de material]. Un día en nuestro rincón favorito.',
          onScreenText: 'POV: Empieza tu momento de relajación',
        },
        {
          time: '4-12s',
          visual: 'Secuencia rítmica de 3 planos muy cuidados: aplicación delicada de ' + service + ', vapor, luz suave y cliente relajado.',
          audio: 'Cuidamos cada detalle para que tu experiencia sea perfecta de principio a fin.',
          onScreenText: 'Cuidando cada detalle por y para ti ✨',
        },
        {
          time: '12-19s',
          visual: 'Plano del resultado con movimiento de cámara elegante de abajo hacia arriba.',
          audio: 'La satisfacción de ver a nuestros clientes mirarse al espejo y sonreír.',
          onScreenText: 'Esa sensación inigualable...',
        },
        {
          time: '19-25s',
          visual: 'Plano cálido de despedida o una taza de café/agua servida con cariño.',
          audio: 'Regálate un momento para ti. Pulsa en el perfil para coordinar tu cita.',
          onScreenText: 'Te mereces este momento 💆‍♀️ Reserva en bio',
        },
      ],
      callToAction: 'Etiqueta a la persona que necesita este momento de autocuidado ahora mismo.',
      caption: `El verdadero lujo hoy en día es parar el reloj y dedicarte una hora para ti 🤍\n\nEn nuestro espacio preparamos cada sesión de ${service} como si fuera única. Sin prisas, con los mejores productos y con la atención que te mereces.\n\n📍 Ven a visitarnos${city}.\n📲 Enlace directo para agenda en el perfil.`,
      hashtags: ['#asmrvideos', '#momentoderelax', '#experienciacliente', '#calidaddevida', '#detallesqueimportan'],
    },
  ];
}

export function generateFallbackPosts(form: GeneratorFormState): PostItem[] {
  const service = form.service || 'nuestro servicio especializado';
  const city = form.city ? ` en ${form.city}` : '';

  return [
    {
      id: 'post-1',
      type: 'Educativo / Demostración de Calidad',
      headline: `¿Pensando en hacerte ${service}? Esto es lo que necesitas saber antes de dar el paso 💡`,
      body: `Sabemos que elegir dónde confiar tu imagen o tu tiempo no es fácil. Hay muchas opciones ahí fuera, pero hay 3 cosas que marcan la diferencia cuando vienes a visitarnos:\n\n1️⃣ **Diagnóstico honesto:** No te vamos a recomendar algo que no necesitas. Analizamos tu caso y te decimos qué te va a dar el mejor resultado real.\n\n2️⃣ **Materiales y productos de primera línea:** En ${service} no escatimamos. Usamos marcas que garantizan seguridad, durabilidad y respeto total.\n\n3️⃣ **Seguimiento cercano:** Te explicamos de forma sencilla cómo cuidarlo en tu día a día para que el resultado se mantenga impecable semanas después.\n\nPorque para nosotros no eres un número de ticket, eres parte de nuestra pequeña comunidad.`,
      callToAction: '¿Tienes alguna duda sobre tu caso concreto? Escríbela en comentarios o envíanos una foto por privado y te asesoramos sin coste alguno.',
      hashtagsNiche: ['#serviciocalidad', '#cuidadointegral', '#profesionales', '#asesoramientopersonalizado'],
      hashtagsLocal: ['#comerciodebarrio', '#negociocercano', '#clientesfelices', '#servicioexclusivo'],
      hashtagsTrend: ['#instagramtips', '#postdeldia', '#apoyaelpequeñocomercio', '#viralpost'],
    },
    {
      id: 'post-2',
      type: 'Promoción Especial / Conexión de Temporada',
      headline: `🚨 Esta semana abrimos 5 plazas especiales para ${service} con un detalle de bienvenida`,
      body: `Queremos premiar a los que siempre estáis al otro lado de la pantalla dándole cariño a nuestras publicaciones ❤️\n\nPor eso, durante los próximos días, todas las personas que reservéis vuestra cita para **${service}** mencionando que nos habéis visto en redes sociales, recibiréis:\n\n✨ Asesoramiento personalizado previo\n✨ Un detalle sorpresa para el cuidado en casa\n✨ Flexibilidad horaria prioritaria\n\n⚠️ Solo podemos habilitar 5 plazas bajo estas condiciones para asegurar la máxima atención a cada uno de vosotros sin prisas.`,
      callToAction: 'Para asegurar tu plaza, haz clic en el enlace de nuestra biografía o escríbenos un mensaje directo con la palabra "RESERVA".',
      hashtagsNiche: ['#promocionsemanal', '#ofertaespecial', '#plazaslimitadas', '#experienciapremium'],
      hashtagsLocal: ['#planeslocales', '#comerciolocal', '#apoyalonuestro', '#descuentoslocales'],
      hashtagsTrend: ['#ofertas', '#promocion', '#haztureserva', '#imperdible'],
    },
    {
      id: 'post-3',
      type: 'Detrás de Escenas / Confianza y Valores',
      headline: `Lo que nunca sale en la foto bonita de Instagram pero es lo que más nos enorgullece 🛠️✨`,
      body: `Detrás de cada resultado de ${service} hay:\n\n• Horas de formación constante para estar al día de las últimas técnicas.\n• Búsqueda minuciosa de productos que respeten al máximo tu salud y bienestar.\n• Desinfección y preparación de cada rincón antes de que pongas un pie aquí.\n• Y sobre todo: ganas infinitas de que salgas con una sonrisa que te dure todo el día.\n\nLos pequeños negocios vivimos de la satisfacción de cada persona que confía en nosotros. Gracias por hacer posible que sigamos haciendo lo que nos apasiona todos los días${city}.`,
      callToAction: 'Si valoras el trabajo hecho con mimo y cariño, déjanos un corazón en los comentarios ❤️ ¡Nos llena de energía!',
      hashtagsNiche: ['#detrasdecamaras', '#vocaciondeservicio', '#trabajobienhecho', '#pasionporloquehacemos'],
      hashtagsLocal: ['#comunidadlocal', '#negociosconalma', '#vidaenelbarrio', '#tratoamable'],
      hashtagsTrend: ['#emprendimiento', '#historiasreales', '#autenticidad', '#graciasporelapoyo'],
    },
  ];
}

export function generateFallbackCalendar(form: GeneratorFormState): CalendarWeek[] {
  const service = form.service || 'nuestro servicio';
  const city = form.city ? ` en ${form.city}` : '';

  return [
    {
      week: 1,
      weekFocus: 'Semana 1: Conexión, bienvenida y diagnóstico de necesidades',
      items: [
        {
          id: 'w1-1',
          day: 'Lunes',
          format: 'Reel',
          topic: 'El error que arruina tu resultado con ' + service,
          hook: '¿Por qué casi todos fallan al empezar con ' + service + '?',
          objective: 'Atracción',
          shortDescription: 'Vídeo rápido de 20s explicando el fallo típico y cómo lo solucionas en tu local.',
        },
        {
          id: 'w1-2',
          day: 'Miércoles',
          format: 'Carrusel',
          topic: 'Mini guía paso a paso de lo que ocurre en tu primera cita',
          hook: 'Así es tu primera visita cuando vienes a vernos 📌',
          objective: 'Confianza',
          shortDescription: '4 diapositivas explicando qué esperar: recepción, valoración, aplicación y despedida.',
        },
        {
          id: 'w1-3',
          day: 'Viernes',
          format: 'Historias Interactivas',
          topic: 'Ronda de preguntas y dudas comunes',
          hook: 'Pregúntanos lo que quieras sobre ' + service + ' 👇',
          objective: 'Interacción',
          shortDescription: 'Sticker de preguntas en Stories respondiendo con vídeos cortos y directos.',
        },
      ],
    },
    {
      week: 2,
      weekFocus: 'Semana 2: Prueba social, antes/después y testimonios reales',
      items: [
        {
          id: 'w2-1',
          day: 'Martes',
          format: 'Reel',
          topic: 'Transformación del antes y después con reacción real',
          hook: 'Miren la cara de satisfacción al verse en el espejo 😍',
          objective: 'Confianza',
          shortDescription: 'Muestra el caso de un cliente real sin filtros exagerados para transmitir honestidad.',
        },
        {
          id: 'w2-2',
          day: 'Jueves',
          format: 'Post Estático',
          topic: 'El testimonio de la semana de un vecino o vecina',
          hook: '"Tenía dudas al principio, pero superó todas mis expectativas"',
          objective: 'Venta',
          shortDescription: 'Captura estética de una reseña de Google o mensaje de WhatsApp agradeciendo el servicio.',
        },
        {
          id: 'w2-3',
          day: 'Sábado',
          format: 'Reel',
          topic: 'Detrás de cámaras: Sábado de ambiente lleno',
          hook: 'El ritmo de un sábado en nuestro espacio ⚡',
          objective: 'Atracción',
          shortDescription: 'Tomas dinámicas con música divertida mostrando que el negocio tiene vida y movimiento.',
        },
      ],
    },
    {
      week: 3,
      weekFocus: 'Semana 3: Educación, trucos prácticos y autoridad',
      items: [
        {
          id: 'w3-1',
          day: 'Lunes',
          format: 'Carrusel',
          topic: '3 Hábitos en casa para prolongar los resultados de ' + service,
          hook: 'Haz que te dure el doble de tiempo con estos 3 trucos sencillos ⏳',
          objective: 'Atracción',
          shortDescription: 'Consejos desinteresados que aportan valor inmediato para guardar y compartir.',
        },
        {
          id: 'w3-2',
          day: 'Miércoles',
          format: 'Reel',
          topic: 'Mito vs Realidad sobre ' + service,
          hook: 'Mito: "Esto daña o es incómodo". Realidad: Te lo muestro aquí 👆',
          objective: 'Confianza',
          shortDescription: 'Desmonta el miedo o excusa más frecuente que frena a los clientes para reservar.',
        },
        {
          id: 'w3-3',
          day: 'Viernes',
          format: 'Post Estático',
          topic: 'Presentación del equipo humano que hay detrás',
          hook: 'Las manos y el corazón que cuidan de ti cada día ❤️',
          objective: 'Interacción',
          shortDescription: 'Foto del equipo con sonrisa genuina explicando por qué les apasiona su trabajo.',
        },
      ],
    },
    {
      week: 4,
      weekFocus: 'Semana 4: Conversión, plazas del mes y llamada a la acción',
      items: [
        {
          id: 'w4-1',
          day: 'Lunes',
          format: 'Reel',
          topic: 'Últimos huecos disponibles para ' + service + ' de la semana',
          hook: 'Organizando la agenda de esta semana 🗓️ ¿Aseguraste tu momento?',
          objective: 'Venta',
          shortDescription: 'Vídeo mostrando la libreta de reservas o el espacio listo invitando a escribir por DM.',
        },
        {
          id: 'w4-2',
          day: 'Miércoles',
          format: 'Post Estático',
          topic: 'Promoción especial para cerrar el mes o detalle por recomendar amigos',
          hook: 'Premio para quienes venís de parte de otro cliente 🎁',
          objective: 'Venta',
          shortDescription: 'Fomenta el boca a boca local recompensando a quienes recomiendan tu negocio.',
        },
        {
          id: 'w4-3',
          day: 'Viernes',
          format: 'Historias Interactivas',
          topic: 'Resumen mensual y agradecimiento a la comunidad',
          hook: 'Gracias por otro mes increíble juntos en ' + (form.city || 'el barrio') + ' ✨',
          objective: 'Interacción',
          shortDescription: 'Encuesta: ¿Qué te gustaría que preparemos el próximo mes? para planificar futuros contenidos.',
        },
      ],
    },
  ];
}
