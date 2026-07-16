// Products extracted from bodasesor.com live bundle — full data restored
const DEFAULT_PRODUCT = {
  related: [],
  included: [],
  whyUs: [],
  varieties: [],
  menuExample: [],
  serviceTiers: [],
  integralServices: [],
};

const PRODUCTS = [
    {
      slug: "banquetes",
      title: "Banquete Formal para Eventos",
      headline: "Gastronomía de lujo para tu celebración más importante",
      seoTitle: "Banquetes para Eventos en México | Bodasesor",
      seoDescription: "Banquetes formales de alta cocina para bodas, xv años, graduaciones y corporativos. Menús gourmet, servicio de meseros y presentación impecable.",
      description: [
        "Nuestros banquetes formales elevan cualquier celebración al más alto nivel gastronómico. Combinamos técnicas culinarias de vanguardia con los mejores ingredientes para crear experiencias que tus invitados recordarán por años.",
        "Cada banquete incluye servicio de meseros profesionales, montaje de mesas con cristalería fina y presentación cuidada en cada platillo. Nos adaptamos a cualquier estilo: desde el banquete más íntimo hasta los grandes eventos de 1,000 comensales.",
        "Nuestros chefs diseñan el menú junto contigo, considerando restricciones dietéticas, preferencias regionales y la temática de tu evento. El resultado: una experiencia gastronómica que refleja tu personalidad."
      ],
      category: "banquetes",
      categoryLabel: "Banquetes",
      categoryHref: "/banquetes-catering",
      related: [
        {
          name: "Banquete Formal",
          href: "/banquetes"
        },
        {
          name: "Banquete Kosher",
          href: "/banquete-kosher"
        },
        {
          name: "Banquete Mexicano",
          href: "/banquete-mexicano"
        },
        {
          name: "Banquete Navideño",
          href: "/banquete-navideno"
        }
      ],
      included: [
        {
          icon: "👨‍🍳",
          title: "Chef ejecutivo",
          desc: "Supervisión de un chef ejecutivo certificado durante toda la preparación y servicio."
        },
        {
          icon: "🍽️",
          title: "Servicio de meseros",
          desc: "Personal uniformado y capacitado: un mesero por cada 10 comensales."
        },
        {
          icon: "🥂",
          title: "Cristalería y vajilla",
          desc: "Copas de cristal, vajilla fina y cubiertos de acero inoxidable premium."
        },
        {
          icon: "🌹",
          title: "Centro de mesa",
          desc: "Arreglo floral básico incluido en cada mesa de invitados."
        },
        {
          icon: "🎂",
          title: "Pastel de celebración",
          desc: "Pastel personalizado de hasta 3 pisos incluido en paquetes completos."
        },
        {
          icon: "📋",
          title: "Coordinación logística",
          desc: "Un coordinador de banquete dedicado para la organización del día."
        }
      ],
      varieties: [
        {
          name: "Banquete de 4 tiempos",
          desc: "Sopa, entrada, plato fuerte y postre. Elegante y completo para cenas de gala.",
          href: "/banquetes/4-tiempos"
        },
        {
          name: "Banquete de 3 tiempos",
          desc: "Entrada, plato fuerte y postre. Ideal para eventos de 2 a 3 horas.",
          href: "/banquetes/3-tiempos"
        },
        {
          name: "Banquete de 2 tiempos",
          desc: "Plato fuerte y postre. Práctico para eventos de mediodía o cenas ejecutivas.",
          href: "/banquetes/2-tiempos"
        },
        {
          name: "Banquete buffet",
          desc: "Amplia variedad de platillos servidos en estaciones. Dinámico y abundante.",
          href: "/banquetes/buffet"
        }
      ],
      menuExample: [
        "Aperitivo: Blinis de salmón ahumado con crema fraîche",
        "Sopa: Crema de elote rostizado con aceite de trufa",
        "Entrada: Ensalada de arúgula con peras caramelizadas y queso de cabra",
        "Plato fuerte: Filete de res en salsa de vino tinto con puré de papa trufado",
        "Postre: Coulant de chocolate con helado de vainilla de Madagascar"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "banquete-kosher",
      title: "Banquete Kosher para Eventos",
      headline: "Gastronomía certificada Kosher para tu evento",
      seoTitle: "Banquete Kosher en México | Bodasesor",
      seoDescription: "Servicio de banquetes Kosher certificado para bodas y eventos judíos. Supervisión rabínica, ingredientes certificados y menús tradicionales.",
      description: [
        "Bodasesor ofrece banquetes Kosher con certificación rabínica para garantizar el cumplimiento de todas las normas dietéticas de la tradición judía. Nuestro equipo tiene amplia experiencia en la organización de eventos bajo estándares Kosher.",
        "Desde la selección de ingredientes certificados hasta la separación de lácteos y cárnicos, cuidamos cada detalle del proceso. Trabajamos con supervisores rabínicos reconocidos por las principales comunidades judías de México.",
        "Ofrecemos menús que combinan la tradición culinaria judía con técnicas gastronómicas contemporáneas, logrando platillos que deleitarán a todos tus invitados."
      ],
      category: "banquetes",
      categoryLabel: "Banquetes",
      categoryHref: "/banquetes-catering",
      related: [
        {
          name: "Banquete Formal",
          href: "/banquetes"
        },
        {
          name: "Banquete Kosher",
          href: "/banquete-kosher"
        },
        {
          name: "Banquete Mexicano",
          href: "/banquete-mexicano"
        },
        {
          name: "Banquete Navideño",
          href: "/banquete-navideno"
        }
      ],
      included: [
        {
          icon: "✡️",
          title: "Certificación rabínica",
          desc: "Supervisión de un mashguiaj (supervisor rabínico) durante toda la preparación."
        },
        {
          icon: "🧂",
          title: "Ingredientes certificados",
          desc: "Todos los insumos cuentan con sello Kosher de organismos reconocidos."
        },
        {
          icon: "🍽️",
          title: "Vajilla separada",
          desc: "Uso de vajilla exclusiva para cárnicos y lácteos, nunca mezclados."
        },
        {
          icon: "👨‍🍳",
          title: "Chef especializado",
          desc: "Chef con formación en cocina Kosher y amplia experiencia en comunidades judías."
        },
        {
          icon: "📋",
          title: "Menú aprobado",
          desc: "El menú completo es revisado y aprobado por el supervisor rabínico antes del evento."
        },
        {
          icon: "🚚",
          title: "Transporte controlado",
          desc: "Traslado de alimentos en vehículos refrigerados y embalaje Kosher certificado."
        }
      ],
      varieties: [
        {
          name: "Banquete Kosher de 4 tiempos",
          desc: "Sopa, entrada, plato fuerte y postre bajo certificación rabínica.",
          href: "/banquete-kosher/4-tiempos"
        },
        {
          name: "Banquete Kosher de 3 tiempos",
          desc: "Entrada, plato fuerte y postre Kosher. Ideal para bodas y eventos judíos.",
          href: "/banquete-kosher/3-tiempos"
        },
        {
          name: "Banquete Kosher de 2 tiempos",
          desc: "Plato fuerte y postre Parve o cárnico. Opción ágil y certificada.",
          href: "/banquete-kosher/2-tiempos"
        },
        {
          name: "Buffet Kosher",
          desc: "Estaciones separadas correctamente con amplia variedad certificada.",
          href: "/banquete-kosher/buffet"
        }
      ],
      menuExample: [
        "Aperitivo: Hummus artesanal con pita tostada y aceitunas marinadas",
        "Sopa: Caldo de pollo con kneidlach (bolitas de matzá)",
        "Entrada: Ensalada israelí con tahini de limón",
        "Plato fuerte (cárnico): Pechuga de pollo rellena en salsa de hierbas con arroz árabe",
        "Postre: Baklava artesanal y frutas frescas de temporada"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "banquete-mexicano",
      title: "Banquete Mexicano para Eventos",
      headline: "Los sabores de México en tu celebración",
      seoTitle: "Banquete Mexicano para Eventos | Bodasesor",
      seoDescription: "Banquetes con los auténticos sabores de la cocina mexicana: moles, carnitas, chiles en nogada y más. Ideal para bodas, fiestas patrias y eventos temáticos.",
      description: [
        "Celebra con los sabores que nos definen. Nuestros banquetes mexicanos rescatan recetas tradicionales preparadas con técnicas modernas, usando chiles, especias y ingredientes endémicos de las distintas regiones del país.",
        "Desde un mole negro oaxaqueño hasta unas carnitas michoacanas o chiles en nogada de temporada, nuestros chefs especializados en cocina mexicana crean experiencias que honran nuestra gastronomía patrimonio de la humanidad.",
        "Ideal para bodas con temática mexicana, fiestas patrias, eventos corporativos y celebraciones donde quieras destacar la riqueza culinaria de México ante tus invitados nacionales e internacionales."
      ],
      category: "banquetes",
      categoryLabel: "Banquetes",
      categoryHref: "/banquetes-catering",
      related: [
        {
          name: "Banquete Formal",
          href: "/banquetes"
        },
        {
          name: "Banquete Kosher",
          href: "/banquete-kosher"
        },
        {
          name: "Banquete Mexicano",
          href: "/banquete-mexicano"
        },
        {
          name: "Banquete Navideño",
          href: "/banquete-navideno"
        }
      ],
      included: [
        {
          icon: "🌶️",
          title: "Recetas regionales",
          desc: "Platillos auténticos de diferentes estados: Oaxaca, Puebla, Veracruz, Yucatán y más."
        },
        {
          icon: "🌽",
          title: "Ingredientes locales",
          desc: "Chiles secos, especias, hierbas y productos del campo mexicano de primera calidad."
        },
        {
          icon: "🍽️",
          title: "Servicio de meseros",
          desc: "Personal uniformado con trajes típicos opcionales para ambientar el evento."
        },
        {
          icon: "🫙",
          title: "Salsas artesanales",
          desc: "Hasta 5 tipos de salsas caseras preparadas el mismo día del evento."
        },
        {
          icon: "🌮",
          title: "Tortillas hechas a mano",
          desc: "Tortillera en sitio para servir tortillas frescas durante toda la cena."
        },
        {
          icon: "🍹",
          title: "Agua de jamaica y tamarindo",
          desc: "Bebidas tradicionales incluidas sin costo adicional."
        }
      ],
      varieties: [
        {
          name: "Banquete Mexicano de 4 tiempos",
          desc: "Sopa, entrada, plato fuerte y postre con sabores auténticos de México.",
          href: "/banquete-mexicano/4-tiempos"
        },
        {
          name: "Banquete Mexicano de 3 tiempos",
          desc: "Entrada, plato fuerte y postre con recetas regionales tradicionales.",
          href: "/banquete-mexicano/3-tiempos"
        },
        {
          name: "Banquete Mexicano de 2 tiempos",
          desc: "Plato fuerte y postre mexicano. Ideal para fiestas patrias y eventos temáticos.",
          href: "/banquete-mexicano/2-tiempos"
        },
        {
          name: "Buffet Mexicano",
          desc: "Tacos, carnitas, antojitos y guisados en estaciones al estilo mexicano.",
          href: "/banquete-mexicano/buffet"
        }
      ],
      menuExample: [
        "Aperitivo: Tostaditas con guacamole y chicharrón en salsa verde",
        "Sopa: Pozole rojo con todos sus acompañantes",
        "Entrada: Ensalada de nopales con queso panela y epazote",
        "Plato fuerte: Pollo en mole negro con arroz rojo y frijoles de olla",
        "Postre: Tres leches o arroz con leche con canela"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "banquete-navideno",
      title: "Banquete Navideño para Eventos",
      headline: "La cena de Navidad perfecta para tu empresa o familia",
      seoTitle: "Banquete Navideño Corporativo y Familiar | Bodasesor",
      seoDescription: "Banquetes navideños para cenas de empresa, posadas y reuniones familiares. Pavo relleno, bacalao, romeritos y los clásicos de la temporada.",
      description: [
        "La temporada navideña merece una cena excepcional. Nuestros banquetes navideños combinan los clásicos de la cocina navideña mexicana —pavo relleno, bacalao a la vizcaína, romeritos— con toques contemporáneos que elevan la experiencia.",
        "Atendemos desde íntimas cenas familiares de 20 personas hasta grandes posadas corporativas de 500 comensales. Nuestro equipo se encarga de todo: preparación, montaje, servicio y limpieza final.",
        "Contrata con anticipación para asegurar disponibilidad en las fechas de mayor demanda: 16 al 24 de diciembre y 31 de diciembre. Ofrecemos paquetes especiales para posadas, cenas de Navidad y brindis de Año Nuevo."
      ],
      category: "banquetes",
      categoryLabel: "Banquetes",
      categoryHref: "/banquetes-catering",
      related: [
        {
          name: "Banquete Formal",
          href: "/banquetes"
        },
        {
          name: "Banquete Kosher",
          href: "/banquete-kosher"
        },
        {
          name: "Banquete Mexicano",
          href: "/banquete-mexicano"
        },
        {
          name: "Banquete Navideño",
          href: "/banquete-navideno"
        }
      ],
      included: [
        {
          icon: "🦃",
          title: "Pavo o bacalao",
          desc: "Elige entre pavo relleno al horno o bacalao a la vizcaína como plato estrella."
        },
        {
          icon: "🎄",
          title: "Decoración navideña",
          desc: "Centros de mesa temáticos y arreglos navideños incluidos en el montaje."
        },
        {
          icon: "🍷",
          title: "Brindis de bienvenida",
          desc: "Sidra o ponche de frutas para el brindis de inicio de la cena."
        },
        {
          icon: "🍽️",
          title: "Servicio completo",
          desc: "Meseros uniformados y coordinador de servicio durante toda la cena."
        },
        {
          icon: "🎊",
          title: "Sorpresa navideña",
          desc: "Detalle de Navidad para cada invitado: chocolates, turrones o almendras garapiñadas."
        },
        {
          icon: "🎵",
          title: "Ambiente musical",
          desc: "Playlist navideña curada o mariachi opcional para ambientar la velada."
        }
      ],
      varieties: [
        {
          name: "Banquete Navideño de 4 tiempos",
          desc: "Sopa, entrada, pavo o pierna y postre navideño. La cena de gala completa.",
          href: "/banquete-navideno/4-tiempos"
        },
        {
          name: "Banquete Navideño de 3 tiempos",
          desc: "Entrada, plato fuerte y postre con clásicos de Nochebuena y Navidad.",
          href: "/banquete-navideno/3-tiempos"
        },
        {
          name: "Banquete Navideño de 2 tiempos",
          desc: "Plato fuerte y postre navideño. Ideal para posadas y cenas familiares.",
          href: "/banquete-navideno/2-tiempos"
        },
        {
          name: "Buffet Navideño",
          desc: "Estaciones con pavo, romeritos, bacalao, ponche y postres de temporada.",
          href: "/banquete-navideno/buffet"
        }
      ],
      menuExample: [
        "Aperitivo: Ponche de frutas caliente y rompope artesanal",
        "Entrada: Ensalada de Nochebuena con betabel, naranja y cacahuate",
        "Sopa: Crema de castañas con aceite de trufa",
        "Plato fuerte: Pavo relleno con manzana y ciruela pasa, puré de camote y romeritos",
        "Postre: Buñuelos con miel de piloncillo y canela"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "pozole-tostadas",
      title: "Pozole y Tostadas para Eventos",
      headline: "El sabor más tradicional de México para tus invitados",
      seoTitle: "Servicio de Pozole y Tostadas para Eventos | Bodasesor",
      seoDescription: "Servicio de pozole rojo, blanco y verde con tostadas para eventos, fiestas, bodas y corporativos. Personal, equipamiento y montaje incluidos.",
      description: [
        "El pozole es uno de los platillos más queridos y celebrados de la gastronomía mexicana. Nuestro servicio de pozole y tostadas lleva a tu evento la auténtica receta de maíz cacahuazintle con caldo perfecto, servido en grandes ollas de barro con todos los acompañantes tradicionales.",
        "Ofrecemos tres variedades: rojo (con chile guajillo y ancho), blanco (el caldo natural sin chile seco) y verde (con tomatillo, epazote y chile serrano). El maíz es cocido desde cero, con el proceso completo de nixtamalización para garantizar un pozole honesto y delicioso.",
        "El servicio incluye personal, vajilla desechable o de loza, y estación completa con todos los toppings. Es una opción perfecta para bodas, XV años, posadas, fiestas familiares y eventos corporativos donde quieras ofrecer algo diferente y memorable."
      ],
      category: "catering",
      categoryLabel: "Catering",
      categoryHref: "/pozole-tostadas",
      related: [
        {
          name: "Pozole y Tostadas",
          href: "/pozole-tostadas"
        },
        {
          name: "Paella",
          href: "/paella"
        },
        {
          name: "Comida Corrida",
          href: "/comida-corrida"
        },
        {
          name: "Coffee Break",
          href: "/coffee-break"
        },
        {
          name: "Bocadillos",
          href: "/bocadillos"
        },
        {
          name: "Canapés Premium",
          href: "/canapes-premium"
        },
        {
          name: "Desayuno Social",
          href: "/desayuno-social"
        }
      ],
      included: [
        {
          icon: "🍲",
          title: "Pozole servido en olla",
          desc: "Preparado en olla de barro o acero inoxidable de gran capacidad, servido caliente."
        },
        {
          icon: "🌽",
          title: "Maíz cacahuazintle",
          desc: "Usamos exclusivamente maíz cacahuazintle de la mejor calidad, cosido al punto exacto."
        },
        {
          icon: "🥬",
          title: "8 toppings tradicionales",
          desc: "Lechuga, orégano, cebolla, chile, tostadas, limón, rábanos y chicharrón."
        },
        {
          icon: "🫙",
          title: "Salsas caseras",
          desc: "Salsa roja, verde y habanero preparadas en el momento para los más atrevidos."
        },
        {
          icon: "🍽️",
          title: "Tostadas variadas",
          desc: "Tostadas de tinga, pata, frijoles, pollo y aguacate servidas en canastas."
        },
        {
          icon: "👨‍🍳",
          title: "Personal de servicio",
          desc: "Cocinero y mesero(s) según el número de comensales. Uniformados y capacitados."
        }
      ],
      varieties: [
        {
          name: "Pozole Rojo",
          desc: "Caldo de chile guajillo y ancho con cerdo. Intenso, reconfortante y el más pedido."
        },
        {
          name: "Pozole Blanco",
          desc: "Caldo natural de cerdo sin chile seco. Ligero y perfecto con todos los toppings."
        },
        {
          name: "Pozole Verde",
          desc: "Con tomatillo, epazote y chile serrano. Fresco y con carácter propio."
        },
        {
          name: "Tostadas crujientes",
          desc: "Estación de tostadas con frijoles, pollo, tinga, pata y papa con chorizo."
        }
      ],
      menuExample: [
        "Pozole: Rojo o blanco de cerdo con maíz cacahuazintle",
        "Toppings: Lechuga, cebolla, rábanos, orégano, chile y limón",
        "Tostadas: De frijoles con pollo, tinga con pollo y pata (manitas)",
        "Salsa: Roja, verde y habanero preparadas en el momento",
        "Bebida: Agua de Jamaica o tamarindo natural"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "paella",
      title: "Paella para Eventos",
      headline: "El espectáculo gastronómico más aplaudido de España en tu mesa",
      seoTitle: "Servicio de Paella para Eventos en México | Bodasesor",
      seoDescription: "Paella valenciana, mixta y de mariscos para eventos, bodas y corporativos. Cocinada en vivo en paelleras gigantes. Espectáculo y sabor en un solo platillo.",
      description: [
        "La paella no es solo un platillo: es un espectáculo. Nuestros chefs especializados preparan la paella en vivo frente a tus invitados, en paelleras de acero de hasta 100cm de diámetro, con el aroma y el sizzle característico que hace agua la boca.",
        "Utilizamos arroz bomba importado de España, azafrán auténtico de La Mancha, y los mejores ingredientes del mar y la tierra: camarones, mejillones, pulpo, costillas, chorizo y pollo de calidad superior.",
        "El servicio puede montarse en cualquier espacio: jardines, salones de eventos, terrazas y espacios corporativos. La paella en vivo es perfecta para hacer del momento de la comida un evento dentro del evento."
      ],
      category: "catering",
      categoryLabel: "Catering",
      categoryHref: "/paella",
      related: [
        {
          name: "Pozole y Tostadas",
          href: "/pozole-tostadas"
        },
        {
          name: "Paella",
          href: "/paella"
        },
        {
          name: "Comida Corrida",
          href: "/comida-corrida"
        },
        {
          name: "Coffee Break",
          href: "/coffee-break"
        },
        {
          name: "Bocadillos",
          href: "/bocadillos"
        },
        {
          name: "Canapés Premium",
          href: "/canapes-premium"
        },
        {
          name: "Desayuno Social",
          href: "/desayuno-social"
        }
      ],
      included: [
        {
          icon: "🥘",
          title: "Cocinado en vivo",
          desc: "Preparación completa frente a tus invitados. El proceso es parte del espectáculo."
        },
        {
          icon: "🦐",
          title: "Mariscos frescos",
          desc: "Camarones, mejillones, almejas y calamar. Todo seleccionado el día del evento."
        },
        {
          icon: "🧡",
          title: "Azafrán auténtico",
          desc: "Usamos azafrán de hebra importado de España para el color y sabor genuino."
        },
        {
          icon: "🍋",
          title: "Alioli y limón",
          desc: "Servida con alioli artesanal y gajos de limón. La combinación perfecta."
        },
        {
          icon: "🍽️",
          title: "Servicio de mesa",
          desc: "Personal para servir en platos o en formato de estación self-service."
        },
        {
          icon: "🫓",
          title: "Pan artesanal",
          desc: "Pan rústico para acompañar el caldo y los jugos de la paella."
        }
      ],
      varieties: [
        {
          name: "Paella valenciana",
          desc: "La receta original: pollo, conejo, judías verdes, garrofón y romero. Tradición pura."
        },
        {
          name: "Paella mixta",
          desc: "La favorita: pollo, chorizo, camarones y mejillones en un mismo plato."
        },
        {
          name: "Paella de mariscos",
          desc: "Solo frutos del mar: camarones, mejillones, almejas, calamar y pulpo."
        },
        {
          name: "Paella negra",
          desc: "Con tinta de calamar. Visualmente impactante, de sabor intenso a mar."
        }
      ],
      menuExample: [
        "Aperitivo: Pan con tomate y jamón serrano",
        "Plato principal: Paella mixta con pollo, chorizo y mariscos",
        "Ensalada: Ensalada verde con vinagreta mediterránea",
        "Postre: Flan de naranja con caramelo",
        "Bebida: Sangría de vino blanco o agua mineral"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
        slug: "comida-corrida",
        title: "Comida Corrida para Empresas y Eventos",
        headline: "Alimentación completa y nutritiva para tu equipo",
        seoTitle: "Servicio de Comida Corrida Empresarial | Bodasesor",
        seoDescription: "Comida corrida ejecutiva para comedores de empresas, capacitaciones y eventos corporativos. Menú completo de 3 tiempos con alta calidad nutricional.",
        description: [
          "La comida corrida de Bodasesor es la solución perfecta para empresas, comedores industriales y eventos corporativos que requieren alimentación de calidad en gran volumen. Ofrecemos menús balanceados de 3 tiempos con variedad semanal.",
          "Trabajamos con nutriólogos para diseñar menús que combinen sabor y valor nutricional. Desde 20 hasta 500 raciones diarias, garantizamos puntualidad, temperatura adecuada y presentación cuidada.",
          "Ideal para: comedores de oficina, capacitaciones, juntas de trabajo, seminarios y cualquier evento donde el equipo necesite una comida satisfactoria y profesional."
        ],
        category: "catering",
        categoryLabel: "Catering",
        categoryHref: "/comida-corrida",
        related: [
          {
            name: "Pozole y Tostadas",
            href: "/pozole-tostadas"
          },
          {
            name: "Paella",
            href: "/paella"
          },
          {
            name: "Comida Corrida",
            href: "/comida-corrida"
          },
          {
            name: "Coffee Break",
            href: "/coffee-break"
          },
          {
            name: "Bocadillos",
            href: "/bocadillos"
          },
          {
            name: "Canapés Premium",
            href: "/canapes-premium"
          },
          {
            name: "Desayuno Social",
            href: "/desayuno-social"
          }
        ],
        included: [
          {
            icon: "🥣",
            title: "Sopa o crema",
            desc: "Sopas de pasta, cremas de verduras o consommé según el menú del día."
          },
          {
            icon: "🥗",
            title: "Guisado principal",
            desc: "Proteína (pollo, res, cerdo o pescado) con guarnición de verduras y/o arroz."
          },
          {
            icon: "🍚",
            title: "Arroz y frijoles",
            desc: "Siempre incluidos como guarnición. Recetas caseras sin conservadores."
          },
          {
            icon: "🍹",
            title: "Agua fresca del día",
            desc: "Jamaica, limón, pepino u otra agua de sabor natural preparada en el lugar."
          },
          {
            icon: "🥖",
            title: "Pan o tortillas",
            desc: "Tortillas calientes o pan de mesa para acompañar el guisado."
          },
          {
            icon: "🍮",
            title: "Postre sencillo",
            desc: "Fruta de temporada, gelatina, flan o arroz con leche para cerrar."
          }
        ],
        varieties: [
          {
            name: "Menú estándar",
            desc: "Sopa, guisado con arroz, frijoles, agua y postre. El completo de siempre."
          },
          {
            name: "Menú ejecutivo",
            desc: "Versión premium: ensalada, sopa, proteína gourmet y postre de pastelería."
          },
          {
            name: "Menú vegetariano",
            desc: "Opciones 100% vegetales sin sacrificar sabor ni valor nutricional."
          },
          {
            name: "Menú dietético",
            desc: "Bajo en carbohidratos, azúcar y sodio. Diseñado con asesoría nutricional."
          }
        ],
        menuExample: [
          "Sopa: Sopa de fideos al jitomate o crema de zanahoria",
          "Guisado: Pollo en salsa verde con chícharos",
          "Guarnición: Arroz a la mexicana y frijoles de olla",
          "Bebida: Agua de Jamaica natural",
          "Postre: Gelatina de leche o fruta de temporada"
        ],
        serviceTiers: [
          {
            name: "Básico",
            items: [
              "Meseros: 1 c/20 personas · 5 horas",
              "Personal de cocina",
              "Vajilla blanca + cubertería",
              "Cristalería: copa + vaso",
              "Silla Tiffany",
              "Centro de mesa con flores de temporada",
              "Barra: vitroleros (2 sabores) + agua + café",
              "Barman 1 c/50 personas · charolas · hielo"
            ]
          },
          {
            name: "Tradicional",
            items: [
              "Meseros: 1 c/15 personas · 5 horas",
              "Personal de cocina",
              "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
              "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
              "Silla Tiffany + camino de mesa",
              "Centro de mesa con flores de temporada",
              "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
              "Barman 1 c/50 personas · charolas · hielo"
            ]
          },
          {
            name: "Premium",
            popular: true,
            items: [
              "Meseros: 1 c/10 personas · 5 horas",
              "Personal de cocina especializado",
              "Vajilla blanca + cubertería + plato base decorativo + copas de color",
              "Cristalería completa premium",
              "Silla Tiffany / Crossback / Avantgarde",
              "Mesa de madera opcional (redonda, cuadrada o rectangular)",
              "Centro de mesa con flores de temporada",
              "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
              "Barman 1 c/50 personas · charolas · hielo"
            ]
          }
        ],
        whyUs: [
          {
            icon: "👨‍🍳",
            title: "Chefs certificados",
            desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
          },
          {
            icon: "🌿",
            title: "Ingredientes frescos",
            desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
          },
          {
            icon: "📋",
            title: "Menú personalizado",
            desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
          }
        ],
        integralServices: [
          {
            name: "Coffee Break",
            href: "/coffee-break",
            icon: "☕"
          },
          {
            name: "Box Lunch Ejecutivo",
            href: "/bocadillos",
            icon: "🥪"
          },
          {
            name: "Mesas y Sillas",
            href: "/mesas-sillas",
            icon: "🪑"
          },
          {
            name: "Canapés Premium",
            href: "/canapes-premium",
            icon: "🫙"
          },
          {
            name: "Barras de Bebidas",
            href: "/barra-bebidas",
            icon: "🍹"
          },
          {
            name: "Desayuno Corporativo",
            href: "/desayuno-social",
            icon: "🥐"
          }
        ]
      },
    {
        slug: "coffee-break",
        title: "Coffee Break para Eventos Corporativos",
        headline: "La pausa perfecta que recarga energías y conecta equipos",
        seoTitle: "Coffee Break Corporativo y Empresarial | Bodasesor",
        seoDescription: "Servicio de coffee break para congresos, capacitaciones, juntas y eventos empresariales. Café de especialidad, bocadillos gourmet y presentación impecable.",
        description: [
          "Un buen coffee break transforma cualquier pausa en una experiencia gourmet. Nuestro servicio combina café de especialidad seleccionado de origen, con una selección de bocadillos dulces y salados que dejan una impresión duradera.",
          "Atendemos desde pequeñas juntas de consejo hasta grandes congresos con miles de asistentes. Nuestro equipo llega con tiempo de anticipación, monta la estación en el espacio asignado y se encarga del servicio durante toda la sesión.",
          "Ofrecemos opciones de café espresso, americano, cappuccino, té de hierbas y bebidas frías, acompañados de una selección de pastelería artesanal, sándwiches miniatura, fruta fresca y opciones sin gluten."
        ],
        category: "catering",
        categoryLabel: "Catering",
        categoryHref: "/coffee-break",
        related: [
          {
            name: "Pozole y Tostadas",
            href: "/pozole-tostadas"
          },
          {
            name: "Paella",
            href: "/paella"
          },
          {
            name: "Comida Corrida",
            href: "/comida-corrida"
          },
          {
            name: "Coffee Break",
            href: "/coffee-break"
          },
          {
            name: "Bocadillos",
            href: "/bocadillos"
          },
          {
            name: "Canapés Premium",
            href: "/canapes-premium"
          },
          {
            name: "Desayuno Social",
            href: "/desayuno-social"
          }
        ],
        included: [
          {
            icon: "☕",
            title: "Café de especialidad",
            desc: "Café de origen seleccionado, preparado en máquina espresso profesional."
          },
          {
            icon: "🫖",
            title: "Variedad de tés",
            desc: "Mínimo 4 tipos de té: negro, verde, menta y frutos rojos."
          },
          {
            icon: "🥐",
            title: "Pastelería artesanal",
            desc: "Croissants, muffins, scones, pan dulce y galletas hechos el mismo día."
          },
          {
            icon: "🥪",
            title: "Sándwiches mini",
            desc: "Opción salada: sándwiches miniatura surtidos con variedad de rellenos."
          },
          {
            icon: "🍓",
            title: "Fruta fresca",
            desc: "Fruta cortada de temporada en presentación elegante con dips opcionales."
          },
          {
            icon: "🧃",
            title: "Jugos naturales",
            desc: "Jugo de naranja exprimido y agua infusionada con pepino y menta."
          }
        ],
        varieties: [
          {
            name: "Coffee Break 1",
            desc: "Café, té, agua y galletas selectas. La pausa esencial para reuniones cortas."
          },
          {
            name: "Coffee Break 2",
            desc: "Café, té, agua, refrescos, galletas gourmet y pan dulce artesanal."
          },
          {
            name: "Coffee Break 3",
            desc: "Todo el CB2 más jugo natural, yogurt individual y fruta fresca de temporada."
          },
          {
            name: "Coffee Break Gourmet 5",
            desc: "Versión ejecutiva: sandwich, chapata o croissant relleno además de todo lo anterior."
          },
          {
            name: "Coffee Break Gourmet 6",
            desc: "El más completo: incluye chilaquiles, molletes o huevo al gusto. Ideal para jornadas largas."
          }
        ],
        menuExample: [
          "Café: Americano, espresso, cappuccino y latte",
          "Tés: Negro, verde, menta y frutos rojos",
          "Dulce: Croissant, pan dulce artesanal y galletas selectas",
          "Salado (Gourmet 5): Chapata de pavo y brie o sandwich mixto",
          "Caliente (Gourmet 6): Chilaquiles verdes con queso o molletes con frijoles"
        ],
        serviceTiers: [
          {
            name: "Básico",
            items: [
              "Meseros: 1 c/20 personas · 5 horas",
              "Personal de cocina",
              "Vajilla blanca + cubertería",
              "Cristalería: copa + vaso",
              "Silla Tiffany",
              "Centro de mesa con flores de temporada",
              "Barra: vitroleros (2 sabores) + agua + café",
              "Barman 1 c/50 personas · charolas · hielo"
            ]
          },
          {
            name: "Tradicional",
            items: [
              "Meseros: 1 c/15 personas · 5 horas",
              "Personal de cocina",
              "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
              "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
              "Silla Tiffany + camino de mesa",
              "Centro de mesa con flores de temporada",
              "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
              "Barman 1 c/50 personas · charolas · hielo"
            ]
          },
          {
            name: "Premium",
            popular: true,
            items: [
              "Meseros: 1 c/10 personas · 5 horas",
              "Personal de cocina especializado",
              "Vajilla blanca + cubertería + plato base decorativo + copas de color",
              "Cristalería completa premium",
              "Silla Tiffany / Crossback / Avantgarde",
              "Mesa de madera opcional (redonda, cuadrada o rectangular)",
              "Centro de mesa con flores de temporada",
              "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
              "Barman 1 c/50 personas · charolas · hielo"
            ]
          }
        ],
        whyUs: [
          {
            icon: "🏆",
            title: "+1,000 eventos realizados",
            desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
          },
          {
            icon: "✅",
            title: "Proveedores verificados",
            desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
          },
          {
            icon: "💬",
            title: "Atención personalizada",
            desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
          }
        ],
        integralServices: [
          {
            name: "Comida Corrida",
            href: "/comida-corrida",
            icon: "🍽️"
          },
          {
            name: "Desayuno Corporativo",
            href: "/desayuno-social",
            icon: "🥐"
          },
          {
            name: "Canapés Premium",
            href: "/canapes-premium",
            icon: "🫙"
          },
          {
            name: "Alimentos Empresas",
            href: "/alimentos-empresas",
            icon: "🏢"
          },
          {
            name: "Bocadillos",
            href: "/bocadillos",
            icon: "🥪"
          },
          {
            name: "Mesas y Sillas",
            href: "/mesas-sillas",
            icon: "🪑"
          }
        ]
      },
    {
      slug: "bocadillos",
      title: "Bocadillos para Eventos",
      headline: "Pequeños bocados, grandes momentos",
      seoTitle: "Bocadillos y Canapés para Eventos en México | Bodasesor",
      seoDescription: "Servicio de bocadillos y finger food para cócteles, bodas, corporativos y fiestas. Presentación elegante y sabores que sorprenden.",
      description: [
        "Los bocadillos o finger food son la opción perfecta para cócteles, recepciones, networking y cualquier evento donde la socialización es la protagonista. Nuestro equipo prepara piezas individuales elegantes que se disfrutan de un solo bocado.",
        "Combinamos técnicas de alta cocina en formato miniatura: tartaletas, bruschetas, cucharas gourmet, pinchos, y bocados de autor. Cada pieza es una pequeña obra de arte que comunica la calidad de tu evento.",
        "El servicio puede ofrecerse en estaciones tipo buffet o con meseros que circulan entre los invitados con charolas elegantes. Recomendamos de 8 a 12 piezas por persona para eventos de 1.5 a 2 horas."
      ],
      category: "catering",
      categoryLabel: "Catering",
      categoryHref: "/bocadillos",
      related: [
        {
          name: "Pozole y Tostadas",
          href: "/pozole-tostadas"
        },
        {
          name: "Paella",
          href: "/paella"
        },
        {
          name: "Comida Corrida",
          href: "/comida-corrida"
        },
        {
          name: "Coffee Break",
          href: "/coffee-break"
        },
        {
          name: "Bocadillos",
          href: "/bocadillos"
        },
        {
          name: "Canapés Premium",
          href: "/canapes-premium"
        },
        {
          name: "Desayuno Social",
          href: "/desayuno-social"
        }
      ],
      included: [
        {
          icon: "🫙",
          title: "Selección de 8+ variedades",
          desc: "Mínimo 8 tipos de bocadillos diferentes, equilibrando opciones dulces y saladas."
        },
        {
          icon: "🍽️",
          title: "Servicio en charola",
          desc: "Meseros uniformados circulando con charolas elegantes entre los invitados."
        },
        {
          icon: "🌿",
          title: "Opciones vegetarianas",
          desc: "Al menos 3 opciones 100% vegetarianas incluidas en todos los paquetes."
        },
        {
          icon: "❄️",
          title: "Temperatura controlada",
          desc: "Los bocadillos fríos y calientes llegan en temperatura ideal gracias a nuestro equipo."
        },
        {
          icon: "🍽️",
          title: "Vajilla elegante",
          desc: "Servidos en cucharas de cerámica, mini platos de pizarra o charolas plateadas."
        },
        {
          icon: "🥂",
          title: "Maridaje sugerido",
          desc: "Recomendación de vinos, cócteles o maridajes que complementen cada bocadillo."
        }
      ],
      varieties: [
        {
          name: "Bocadillos clásicos",
          desc: "Bruschetas, croquetas, mini quiches, pinchos y vol-au-vent. Siempre elegantes."
        },
        {
          name: "Bocadillos mexicanos",
          desc: "Sopes miniatura, tlayudas pequeñas, quesadillitas y gorditas gourmet."
        },
        {
          name: "Bocadillos de mar",
          desc: "Ceviches en copa, camarones coctel mini, ostiones y tartar de atún."
        },
        {
          name: "Bocadillos de autor",
          desc: "Creaciones exclusivas del chef: combinaciones inesperadas y presentaciones únicas."
        }
      ],
      menuExample: [
        "Frío: Bruscheta de tomate cherry y burrata con albahaca",
        "Frío: Tartar de atún rojo con aguacate y sésamo",
        "Caliente: Croqueta de jamón serrano con aioli de trufa",
        "Caliente: Mini quesito fundido con chorizo ibérico",
        "Dulce: Tartaleta de frutos rojos con crema pastelera"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "canapes-premium",
      title: "Canapés Premium para Eventos",
      headline: "Alta cocina en formato de un solo bocado",
      seoTitle: "Canapés Gourmet para Bodas y Eventos | Bodasesor",
      seoDescription: "Canapés premium y finger food gourmet para bodas, eventos corporativos y recepciones de alto nivel. Chefs especializados y presentación de 5 estrellas.",
      description: [
        "Los canapés premium de Bodasesor son la joya de cualquier recepción de alto nivel. Creados por chefs con formación internacional, cada pieza combina ingredientes de primera como caviar, foie gras, trufa negra, langosta y jamón ibérico.",
        "Son la apertura perfecta para una boda elegante, una cena de gala, el brindis de un lanzamiento corporativo o cualquier evento donde quieras demostrar que los detalles importan. La presentación cuida hasta el más mínimo aspecto visual.",
        "Servimos los canapés mediante un sistema de butler service: meseros de guante blanco circulan discretamente entre los invitados, ofreciendo cada variedad con una breve descripción del ingrediente estrella."
      ],
      category: "catering",
      categoryLabel: "Catering",
      categoryHref: "/canapes-premium",
      related: [
        {
          name: "Pozole y Tostadas",
          href: "/pozole-tostadas"
        },
        {
          name: "Paella",
          href: "/paella"
        },
        {
          name: "Comida Corrida",
          href: "/comida-corrida"
        },
        {
          name: "Coffee Break",
          href: "/coffee-break"
        },
        {
          name: "Bocadillos",
          href: "/bocadillos"
        },
        {
          name: "Canapés Premium",
          href: "/canapes-premium"
        },
        {
          name: "Desayuno Social",
          href: "/desayuno-social"
        }
      ],
      included: [
        {
          icon: "👑",
          title: "Ingredientes de lujo",
          desc: "Caviar, trufa, foie gras, langosta, jamón ibérico y quesos de importación."
        },
        {
          icon: "🤵",
          title: "Butler service",
          desc: "Meseros de guante blanco con descripción verbal de cada pieza."
        },
        {
          icon: "🎨",
          title: "Emplatado de autor",
          desc: "Cada canapé es un mini cuadro: colores, texturas y alturas perfectamente balanceadas."
        },
        {
          icon: "❄️",
          title: "Logística de temperatura",
          desc: "Transporte en cajas isotérmicas y servicio en tiempo perfecto para cada pieza."
        },
        {
          icon: "🍾",
          title: "Maridaje con champagne",
          desc: "Recomendación y coordinación con el sommelier para el maridaje correcto."
        },
        {
          icon: "📝",
          title: "Menú impreso",
          desc: "Tarjetas de menú personalizadas con descripción de cada canapé para los invitados."
        }
      ],
      varieties: [
        {
          name: "Canapés de mar",
          desc: "Ostras Gillardeau, tartar de bogavante, caviar oscietra y sashimi de calidad premium."
        },
        {
          name: "Canapés de tierra",
          desc: "Foie gras mi-cuit, jamón ibérico de bellota, trufa negra y quesos de afinador."
        },
        {
          name: "Canapés fusión",
          desc: "Técnicas de vanguardia con ingredientes locales: huitlacoche, chinicuil y flor de calabaza."
        },
        {
          name: "Canapés dulces",
          desc: "Bombones de chocolate, macarons de sabores inusuales y mini pasteles de autor."
        }
      ],
      menuExample: [
        "Ostión Gillardeau con mignonette de frambuesa y perla de champagne",
        "Tartaleta de foie gras con mermelada de higo y fleur de sel",
        "Brioche tostado con caviar oscietra y crème fraîche de trufa",
        "Tataki de atún rojo con guacamole de jalapeño y microgreens",
        "Bombón de chocolate 70% con fleur de sel y oro comestible"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "desayuno-social",
      title: "Desayuno Social y Corporativo",
      headline: "El mejor comienzo para tu evento o jornada de trabajo",
      seoTitle: "Desayuno Corporativo para Eventos y Empresas | Bodasesor",
      seoDescription: "Servicio de desayunos corporativos y sociales para juntas, congresos, bodas de mañana y reuniones empresariales. Menús completos con chef en sitio.",
      description: [
        "Un desayuno de calidad marca el tono del día. Nuestro servicio de desayunos sociales y corporativos ofrece desde el tradicional desayuno mexicano —chilaquiles, huevos rancheros, tamales— hasta opciones internacionales como waffles belgas, avocado toast y smoothie bowls.",
        "Contamos con chef en sitio para la preparación de elementos calientes: huevos al momento, crepas, molletes y más. La presentación es impecable: buffet ordenado, estaciones bien organizadas y personal atento.",
        "Ideal para: juntas matutinas, desayunos de trabajo, presentaciones de proyectos, bodas de día, graduaciones matutinas y cualquier evento que comience entre las 7:00 y las 12:00 del mediodía."
      ],
      category: "catering",
      categoryLabel: "Catering",
      categoryHref: "/desayuno-social",
      related: [
        {
          name: "Pozole y Tostadas",
          href: "/pozole-tostadas"
        },
        {
          name: "Paella",
          href: "/paella"
        },
        {
          name: "Comida Corrida",
          href: "/comida-corrida"
        },
        {
          name: "Coffee Break",
          href: "/coffee-break"
        },
        {
          name: "Bocadillos",
          href: "/bocadillos"
        },
        {
          name: "Canapés Premium",
          href: "/canapes-premium"
        },
        {
          name: "Desayuno Social",
          href: "/desayuno-social"
        }
      ],
      included: [
        {
          icon: "🥚",
          title: "Estación de huevos",
          desc: "Huevos al gusto: revueltos, estrellados, benedictinos y en salsa. Cocinados al momento."
        },
        {
          icon: "☕",
          title: "Café y bebidas calientes",
          desc: "Café americano, espresso, té, atole y chocolate caliente. Todo incluido."
        },
        {
          icon: "🥞",
          title: "Hotcakes o waffles",
          desc: "Con mantequilla, miel de abeja, cajeta, fresas y crema batida."
        },
        {
          icon: "🍊",
          title: "Jugo de naranja",
          desc: "Exprimido al momento en estación visible para los invitados."
        },
        {
          icon: "🥐",
          title: "Pan dulce y pan de mesa",
          desc: "Surtido de bollería, conchas, cuernos, croissants y pan tostado."
        },
        {
          icon: "🍓",
          title: "Fruta de temporada",
          desc: "Fruta fresca cortada en el lugar, presentada en charolas o vasitos."
        }
      ],
      varieties: [
        {
          name: "Desayuno mexicano",
          desc: "Chilaquiles verdes/rojos, tamales, enchiladas mineras, huevos rancheros y frijoles."
        },
        {
          name: "Desayuno continental",
          desc: "Croissants, mermeladas, quesos, jamón, yogurt con granola y fruta."
        },
        {
          name: "Desayuno americano",
          desc: "Pancakes, huevos, tocino, salchichas y hash browns. El clásico completo."
        },
        {
          name: "Desayuno saludable",
          desc: "Avocado toast, smoothie bowls, semillas, proteína vegetal y frutas exóticas."
        }
      ],
      menuExample: [
        "Bebidas: Café americano, capuccino, jugo de naranja y agua mineral",
        "Estación caliente: Huevos revueltos con champiñones, chilaquiles verdes con pollo",
        "Panadería: Croissants mantequilla, conchas, muffin de arándano y pan integral",
        "Fruta: Melón, fresa, kiwi y naranja en vasitos",
        "Extra: Tamales de rajas y elote con crema"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "barra-crepas",
      title: "Barra de Crepas Premium para Eventos",
      headline: "Crepas dulces y saladas preparadas al momento con ingredientes premium para tu evento",
      seoTitle: "Barra de Crepas Premium para Eventos y Bodas | Bodasesor",
      seoDescription: "Barra de crepas premium para bodas, XV años y eventos. Más de 20 sabores dulces y salados preparados en vivo. Personal, equipo y montaje elegante incluidos.",
      description: [
        "En Bodasesor ofrecemos una experiencia gastronómica única con nuestra Barra de Crepas Premium, ideal para bodas, eventos corporativos y celebraciones especiales. Cada crepa se prepara en vivo frente a los invitados utilizando ingredientes frescos y recetas artesanales que combinan sabores clásicos y gourmet.",
        "Nuestra selección combina recetas tradicionales y opciones gourmet: crepas dulces clásicas (Nutella con plátano, cajeta y nuez, Philadelphia con berries), crepas dulces gourmet (S'mores, Selva negra, Mazapán), y crepas saladas (jamón y queso, champiñones al ajillo, pollo al chipotle, tres quesos, serrano y queso).",
        "Nuestra barra de crepas transforma cualquier evento en una experiencia cálida, visual y memorable con opciones personalizables para todos los gustos. La barra puede adaptarse a brunch, postres o eventos casual gourmet, y combinarse con barra de café o bebidas."
      ],
      category: "barras-alimentos",
      categoryLabel: "Barras de Alimentos",
      categoryHref: "/barra-crepas",
      related: [
        {
          name: "Barra de Crepas",
          href: "/barra-crepas"
        },
        {
          name: "Barra de Sushi",
          href: "/barra-sushi"
        },
        {
          name: "Barra de Mariscos",
          href: "/barra-mariscos"
        },
        {
          name: "Barra de Paninis",
          href: "/barra-paninis"
        },
        {
          name: "Barra de Pastas",
          href: "/barra-pastas"
        },
        {
          name: "Barra de Pizzas",
          href: "/barra-pizzas"
        },
        {
          name: "Barra Americana",
          href: "/barra-americana"
        },
        {
          name: "Barra Yucateca",
          href: "/barra-yucateca"
        }
      ],
      included: [
        {
          icon: "🥞",
          title: "Preparación en vivo",
          desc: "Cada crepa preparada frente a los invitados en plancha profesional. Masa fresca del día."
        },
        {
          icon: "🍫",
          title: "Más de 20 sabores artesanales",
          desc: "Opciones dulces y saladas clásicas, gourmet y especiales para todos los gustos."
        },
        {
          icon: "🧀",
          title: "Dulces y saladas",
          desc: "Nutella, cajeta, S'mores, Selva negra + jamón y queso, pollo al chipotle, tres quesos."
        },
        {
          icon: "🍓",
          title: "Toppings premium",
          desc: "Fresas frescas, crema batida, helado de vainilla, frutos secos y mermeladas artesanales."
        },
        {
          icon: "👨‍🍳",
          title: "Personal profesional",
          desc: "Crepero capacitado que prepara cada crepa con precisión y rapidez para todos los invitados."
        },
        {
          icon: "✨",
          title: "Montaje elegante",
          desc: "Mesa estilizada con iluminación, letreros y decoración que armoniza con tu evento."
        }
      ],
      varieties: [
        {
          name: "Crepas dulces clásicas",
          desc: "Nutella con plátano, cajeta y nuez, lechera con fresa, Philadelphia con berries y manzana canela."
        },
        {
          name: "Crepas dulces gourmet",
          desc: "S'mores, Selva negra, Tropical, Mazapán y Cookies & Cream. Las más fotografiadas."
        },
        {
          name: "Crepas saladas clásicas",
          desc: "Jamón y queso, pizza crepa y tres quesos. Perfectas para quienes prefieren salado."
        },
        {
          name: "Crepas saladas gourmet",
          desc: "Champiñones al ajillo, pollo al chipotle y serrano con queso. Sabores de autor."
        }
      ],
      menuExample: [
        "Menú Dulce Tradicional: Nutella con plátano · Cajeta con nuez · Lechera con fresa · Philadelphia con berries · Manzana canela",
        "Menú Gourmet: S'mores · Selva negra · Tropical · Mazapán · Cookies & Cream",
        "Menú Mixto: Jamón y queso · Pizza crepa · Pollo al chipotle · Tres quesos · Serrano y queso",
        "Combinación recomendada: Barra de Crepas + Barra de Café Premium",
        "Combinación recomendada: Banquete + Barra de Crepas como estación de postres interactiva"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "barra-sushi",
      title: "Barra de Sushi y Poke Bowl para Eventos",
      headline: "La experiencia japonesa que conquista a tus invitados",
      seoTitle: "Barra de Sushi para Eventos y Bodas | Bodasesor",
      seoDescription: "Sushi, rolls, nigiri y poke bowls preparados en vivo para eventos, bodas y corporativos. Chef japonés certificado, ingredientes de primera calidad.",
      description: [
        "Nuestra barra de sushi lleva la experiencia de un restaurante japonés de lujo directamente a tu evento. Un chef especializado en cocina japonesa prepara cada pieza en vivo, garantizando frescura absoluta y la técnica correcta.",
        "Usamos arroz de sushi japonés auténtico, nori de primera calidad, salmón noruego, atún de grado sashimi, aguacate Hass y la selección más amplia de ingredientes premium. El resultado es sushi que rivaliza con los mejores restaurantes de la ciudad.",
        "La estación de poke bowl es la adición perfecta para eventos más contemporáneos: base de arroz o quinoa, proteína de elección y hasta 12 toppings para personalizar. Ideal para bodas, corporativos y eventos donde la modernidad es importante."
      ],
      category: "barras-alimentos",
      categoryLabel: "Barras de Alimentos",
      categoryHref: "/barra-sushi",
      related: [
        {
          name: "Barra de Crepas",
          href: "/barra-crepas"
        },
        {
          name: "Barra de Sushi",
          href: "/barra-sushi"
        },
        {
          name: "Barra de Mariscos",
          href: "/barra-mariscos"
        },
        {
          name: "Barra de Paninis",
          href: "/barra-paninis"
        },
        {
          name: "Barra de Pastas",
          href: "/barra-pastas"
        },
        {
          name: "Barra de Pizzas",
          href: "/barra-pizzas"
        },
        {
          name: "Barra Americana",
          href: "/barra-americana"
        },
        {
          name: "Barra Yucateca",
          href: "/barra-yucateca"
        }
      ],
      included: [
        {
          icon: "🍣",
          title: "Chef japonés certificado",
          desc: "Especialista con formación en técnica nipona y experiencia en eventos de alto nivel."
        },
        {
          icon: "🐟",
          title: "Pescado grado sashimi",
          desc: "Salmón noruego, atún aleta amarilla y anguila de la más alta calidad."
        },
        {
          icon: "🍚",
          title: "Arroz de sushi auténtico",
          desc: "Arroz japonés koshihikari adobado con vinagre de arroz, azúcar y sal."
        },
        {
          icon: "🥑",
          title: "12+ toppings de poke",
          desc: "Edamame, mango, aguacate, pepino, masago, teriyaki y mucho más."
        },
        {
          icon: "🫙",
          title: "Salsas artesanales",
          desc: "Soya, sriracha, mayo spicy, teriyaki, ponzu y eel sauce preparadas en sitio."
        },
        {
          icon: "🧊",
          title: "Presentación en hielo",
          desc: "Display en hielo seco con iluminación para resaltar la frescura del producto."
        }
      ],
      varieties: [
        {
          name: "Rolls clásicos",
          desc: "California, Philadelphia, Spicy Tuna, Dragon Roll y Dynamite Roll."
        },
        {
          name: "Nigiri y sashimi",
          desc: "Salmón, atún, camarón, pulpo y anguila. Los puristas lo agradecen."
        },
        {
          name: "Rolls de autor",
          desc: "Creaciones exclusivas del chef con ingredientes fusión: mango, chipotle y más."
        },
        {
          name: "Poke Bowl",
          desc: "Base de arroz o quinoa + proteína + toppings personalizados. Sano y delicioso."
        }
      ],
      menuExample: [
        "Roll: Beso de Ángel — salmón, mango, pepino y crema de chipotle",
        "Nigiri: Salmón premium con aceite de trufa y fleur de sel",
        "Sashimi: Atún tataki con ponzu y microgreens",
        "Poke: Salmón + edamame + aguacate + masago + salsa teriyaki",
        "Especial: Temaki (hand roll) de langostino con mayo spicy"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "barra-mariscos",
      title: "Barra de Mariscos para Eventos",
      headline: "El frescor del océano directo a tu celebración",
      seoTitle: "Barra de Mariscos para Eventos y Bodas | Bodasesor",
      seoDescription: "Servicio de barra de mariscos: cocteles, tostadas, aguachile, ostiones y ceviches para bodas, eventos y corporativos. Mariscos frescos del día.",
      description: [
        "La barra de mariscos de Bodasesor es un festín del mar que impresiona desde el primer momento. Todo el producto llega fresco el mismo día del evento, seleccionado de proveedores de confianza de los principales puertos mexicanos.",
        "Nuestros cocineros especializados en cocina de mar preparan en vivo: ceviches, aguachiles, cocteles y tostadas. El hielo seco mantiene la exhibición visualmente impactante y garantiza la temperatura perfecta durante todo el servicio.",
        "Ideal para eventos de verano, bodas en la playa, eventos corporativos de alto perfil y cualquier celebración donde quieras ofrecer algo extraordinario que hable de calidad y buen gusto."
      ],
      category: "barras-alimentos",
      categoryLabel: "Barras de Alimentos",
      categoryHref: "/barra-mariscos",
      related: [
        {
          name: "Barra de Crepas",
          href: "/barra-crepas"
        },
        {
          name: "Barra de Sushi",
          href: "/barra-sushi"
        },
        {
          name: "Barra de Mariscos",
          href: "/barra-mariscos"
        },
        {
          name: "Barra de Paninis",
          href: "/barra-paninis"
        },
        {
          name: "Barra de Pastas",
          href: "/barra-pastas"
        },
        {
          name: "Barra de Pizzas",
          href: "/barra-pizzas"
        },
        {
          name: "Barra Americana",
          href: "/barra-americana"
        },
        {
          name: "Barra Yucateca",
          href: "/barra-yucateca"
        }
      ],
      included: [
        {
          icon: "🦐",
          title: "Camarones frescos del día",
          desc: "Camarón jumbo y U15 del Pacífico, cocido y frío, para cocteles y tostadas."
        },
        {
          icon: "🦪",
          title: "Ostiones",
          desc: "Ostiones al natural o preparados, servidos en hielo con mignonette y limón."
        },
        {
          icon: "🐟",
          title: "Ceviche en vivo",
          desc: "Ceviche de mero, camarón o pulpo preparado al momento con limón verde."
        },
        {
          icon: "🌶️",
          title: "Aguachile negro y verde",
          desc: "El clásico sinaloense: camarón en jugo de limón, chile y verdura fresca."
        },
        {
          icon: "🫙",
          title: "Salsas de la casa",
          desc: "Clamato casero, valentina, salsa macha, habanero tatemado y más."
        },
        {
          icon: "🍋",
          title: "Tostadas y totopos",
          desc: "Tostadas de maíz artesanales y totopos recién hechos para los ceviches."
        }
      ],
      varieties: [
        {
          name: "Ceviches",
          desc: "Ceviche de camarón, ceviche mixto y ceviche de pescado preparados en el momento."
        },
        {
          name: "Tacos de mar",
          desc: "Tacos gobernador, tacos de marlín ahumado y tacos de pulpo al ajillo."
        },
        {
          name: "Tostadas premium",
          desc: "Tostadas de atún, tostadas de salmón y aguachiles negros y verdes."
        },
        {
          name: "Brochetas y especiales",
          desc: "Brochetas de camarón a la parrilla y camarones tropicales. El favorito del evento."
        }
      ],
      menuExample: [
        "Ceviche: Camarón fresco con limón, pepino, jitomate y cilantro",
        "Tacos: Gobernador de camarón y queso y tacos de marlín ahumado",
        "Tostadas: De atún y salmón con aguacate y salsa macha",
        "Aguachile: Verde y negro de camarón U15 con pepino y cebolla morada",
        "Extra: Brochetas de camarón a la parrilla con mantequilla y ajo"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "barra-paninis",
      title: "Barra de Paninis para Eventos",
      headline: "Sándwiches italianos gourmet prensados al momento",
      seoTitle: "Barra de Paninis Gourmet para Eventos | Bodasesor",
      seoDescription: "Barra de paninis artesanales para bodas, corporativos y eventos. Pan ciabatta tostado, rellenos gourmet y servicio en vivo. Opción deliciosa para cualquier evento.",
      description: [
        "Los paninis son la combinación perfecta de confort food y gastronomía de calidad. Nuestro servicio de barra de paninis ofrece pan ciabatta artesanal, selección de embutidos importados, quesos de denominación de origen y vegetales frescos.",
        "Cada panini se prensa en el momento en planchas de hierro fundido, logrando la combinación perfecta de exterior crujiente y relleno fundido. La preparación en vivo hace del proceso un espectáculo atractivo para los invitados.",
        "Es una opción versátil que funciona como aperitivo, como parte de un buffet o como estación independiente. Especialmente popular en eventos corporativos, juntas de trabajo, lanzamientos de producto y eventos donde la comodidad de comer de pie es importante."
      ],
      category: "barras-alimentos",
      categoryLabel: "Barras de Alimentos",
      categoryHref: "/barra-paninis",
      related: [
        {
          name: "Barra de Crepas",
          href: "/barra-crepas"
        },
        {
          name: "Barra de Sushi",
          href: "/barra-sushi"
        },
        {
          name: "Barra de Mariscos",
          href: "/barra-mariscos"
        },
        {
          name: "Barra de Paninis",
          href: "/barra-paninis"
        },
        {
          name: "Barra de Pastas",
          href: "/barra-pastas"
        },
        {
          name: "Barra de Pizzas",
          href: "/barra-pizzas"
        },
        {
          name: "Barra Americana",
          href: "/barra-americana"
        },
        {
          name: "Barra Yucateca",
          href: "/barra-yucateca"
        }
      ],
      included: [
        {
          icon: "🥖",
          title: "Pan ciabatta artesanal",
          desc: "Horneado en el día, con corteza crujiente y miga aireada. También disponible integral."
        },
        {
          icon: "🧀",
          title: "Quesos de origen",
          desc: "Mozzarella italiana, manchego español, brie francés y cheddar inglés."
        },
        {
          icon: "🥩",
          title: "Embutidos premium",
          desc: "Jamón serrano, salami genovés, pechuga de pavo premium y roast beef."
        },
        {
          icon: "🫒",
          title: "Vegetales asados",
          desc: "Pimientos, calabaza, berenjena y cebolla asados en oliva extra virgen."
        },
        {
          icon: "🔥",
          title: "Prensado en vivo",
          desc: "Plancha de hierro fundido para el prensado perfecto en el momento."
        },
        {
          icon: "🥗",
          title: "Ensalada complementaria",
          desc: "Mini ensalada verde o pasta fría incluida como guarnición."
        }
      ],
      varieties: [
        {
          name: "Caprese",
          desc: "Mozzarella fresca, jitomate, albahaca y aceite de oliva. El clásico italiano."
        },
        {
          name: "Pollo a la parrilla",
          desc: "Pollo asado, queso manchego, pimientos asados y mostaza Dijon."
        },
        {
          name: "Roast beef",
          desc: "Roast beef en láminas, rúcula, parmesano y mostaza de grano."
        },
        {
          name: "Pavo y aguacate",
          desc: "Pechuga de pavo, aguacate, jitomate seco, lechuga y vinagreta."
        },
        {
          name: "Panini poblano",
          desc: "Pollo al chipotle, queso Oaxaca, rajas y mayonesa de cilantro."
        },
        {
          name: "Vegetariano",
          desc: "Berenjena, zucchini, pimientos asados, queso de cabra y tapenade."
        }
      ],
      menuExample: [
        "Clásico: Caprese con mozzarella, jitomate y pesto de albahaca fresca",
        "Premium: Roast beef con rúcula, parmesano y mostaza de grano",
        "Firma: Pavo y aguacate con jitomate seco y lechuga baby",
        "Acompañante (Ensalada): César, frutal, manzana y miel o ensalada BC",
        "Veggie: Berenjena y zucchini a la parrilla con queso de cabra"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "barra-pastas",
      title: "Barra de Pastas y Ensaladas para Eventos",
      headline: "La versatilidad italiana que agrada a todos tus invitados",
      seoTitle: "Barra de Pastas para Eventos en México | Bodasesor",
      seoDescription: "Barra de pastas frescas y ensaladas para bodas, corporativos y eventos. Pastas al momento con salsas artesanales y ensaladas gourmet.",
      description: [
        "Las pastas siempre son un éxito. Nuestra barra de pastas frescas ofrece una variedad de formatos —spaghetti, penne, rigatoni, fettuccine— con al menos 6 salsas artesanales preparadas en el momento. Es abundante, versátil y agrada a prácticamente todos.",
        "Complementamos con una estación de ensaladas: verde, caprese, de pasta fría y tabule, para quienes prefieren opciones más ligeras. El conjunto equilibra perfectamente las necesidades de todos los invitados.",
        "Servicio en estación tipo buffet o con chef que sirve porciones personalizadas. Funciona perfectamente como plato fuerte para eventos de mediodía o como opción de segunda vuelta en eventos nocturnos."
      ],
      category: "barras-alimentos",
      categoryLabel: "Barras de Alimentos",
      categoryHref: "/barra-pastas",
      related: [
        {
          name: "Barra de Crepas",
          href: "/barra-crepas"
        },
        {
          name: "Barra de Sushi",
          href: "/barra-sushi"
        },
        {
          name: "Barra de Mariscos",
          href: "/barra-mariscos"
        },
        {
          name: "Barra de Paninis",
          href: "/barra-paninis"
        },
        {
          name: "Barra de Pastas",
          href: "/barra-pastas"
        },
        {
          name: "Barra de Pizzas",
          href: "/barra-pizzas"
        },
        {
          name: "Barra Americana",
          href: "/barra-americana"
        },
        {
          name: "Barra Yucateca",
          href: "/barra-yucateca"
        }
      ],
      included: [
        {
          icon: "🍝",
          title: "4 formatos de pasta",
          desc: "Spaghetti, penne, fettuccine y rigatoni disponibles simultáneamente."
        },
        {
          icon: "🍅",
          title: "6 salsas artesanales",
          desc: "Boloñesa, alfredo, al pesto, arrabiata, carbonara y pomodoro fresco."
        },
        {
          icon: "🫒",
          title: "Aceite de oliva extra virgen",
          desc: "AOVE italiano de primera presión en frío para terminar cada plato."
        },
        {
          icon: "🧀",
          title: "Parmigiano Reggiano",
          desc: "Queso parmesano auténtico rallado en el momento sobre cada plato."
        },
        {
          icon: "🥗",
          title: "Estación de ensaladas",
          desc: "Verde, caprese y pasta fría disponibles como opción ligera."
        },
        {
          icon: "🍞",
          title: "Pan de ajo artesanal",
          desc: "Pan baguette con mantequilla de ajo al horno, servido caliente."
        }
      ],
      varieties: [
        {
          name: "Boloñesa",
          desc: "Carne de res y cerdo en salsa de jitomate italiana. La más clásica y amada."
        },
        {
          name: "Alfredo",
          desc: "Mantequilla, parmesano y crema. Indulgente y suave, perfecta con fettuccine."
        },
        {
          name: "Al pesto",
          desc: "Albahaca fresca, piñones, ajo y parmesano. Fresco y aromático."
        },
        {
          name: "Arrabiata",
          desc: "Pomodoro, ajo y chile rojo. Para los que disfrutan del picante italiano."
        }
      ],
      menuExample: [
        "Pasta: Spaghetti al pomodoro fresco con albahaca y pecorino",
        "Pasta: Penne boloñesa con carne de res y cerdo",
        "Pasta: Fettuccine alfredo con setas porcini y trufa negra",
        "Ensalada: Caprese con mozzarella di buffala y tomate heirloom",
        "Complemento: Pan de ajo artesanal con mantequilla de hierbas"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "barra-pizzas",
      title: "Barra de Pizzas para Eventos",
      headline: "Pizza artesanal al horno de leña en tu evento",
      seoTitle: "Barra de Pizzas Artesanales para Eventos | Bodasesor",
      seoDescription: "Barra de pizzas artesanales al horno de leña para bodas, XV años y eventos. Masa de fermentación lenta, ingredientes importados y pizzero en vivo.",
      description: [
        "Nuestra barra de pizzas artesanales es sinónimo de espectáculo y sabor. Montamos un horno portátil de leña o gas de alta temperatura (450°C) en el espacio de tu evento, donde nuestro pizzero profesional estira la masa y hornea cada pizza en menos de 90 segundos.",
        "La masa es de fermentación lenta (72 horas), lo que desarrolla un sabor profundo y una textura perfecta: crujiente por fuera, aireada y suave por dentro. Usamos harina tipo 00 importada de Italia y salsa de jitomate San Marzano.",
        "Las pizzas pueden ser clásicas italianas o de estilo gourmet con ingredientes inusuales. Es el elemento festivo perfecto para bodas, XV años, eventos corporativos y cualquier celebración que quiera algo diferente y delicioso."
      ],
      category: "barras-alimentos",
      categoryLabel: "Barras de Alimentos",
      categoryHref: "/barra-pizzas",
      related: [
        {
          name: "Barra de Crepas",
          href: "/barra-crepas"
        },
        {
          name: "Barra de Sushi",
          href: "/barra-sushi"
        },
        {
          name: "Barra de Mariscos",
          href: "/barra-mariscos"
        },
        {
          name: "Barra de Paninis",
          href: "/barra-paninis"
        },
        {
          name: "Barra de Pastas",
          href: "/barra-pastas"
        },
        {
          name: "Barra de Pizzas",
          href: "/barra-pizzas"
        },
        {
          name: "Barra Americana",
          href: "/barra-americana"
        },
        {
          name: "Barra Yucateca",
          href: "/barra-yucateca"
        }
      ],
      included: [
        {
          icon: "🍕",
          title: "Pizzero en vivo",
          desc: "Pizzero profesional que estira, prepara y hornea cada pizza frente a tus invitados."
        },
        {
          icon: "🔥",
          title: "Horno portátil a 450°C",
          desc: "Horno de leña o gas de alta temperatura para cocción perfecta en 90 segundos."
        },
        {
          icon: "🌾",
          title: "Masa de fermentación lenta",
          desc: "72 horas de fermentación con harina tipo 00 de Nápoles. El secreto está en la masa."
        },
        {
          icon: "🍅",
          title: "Salsa San Marzano",
          desc: "Jitomate San Marzano DOP importado de Italia. Sin espesantes ni aditivos."
        },
        {
          icon: "🧀",
          title: "Mozzarella fior di latte",
          desc: "Mozzarella fresca producida en México bajo estándares italianos."
        },
        {
          icon: "🫒",
          title: "Aceite de oliva premium",
          desc: "Terminado con AOVE siciliano, albahaca fresca y chile al gusto."
        }
      ],
      varieties: [
        {
          name: "Clásicas",
          desc: "Pepperoni, Margarita, Hawaiana y Salami. Las favoritas que nunca fallan."
        },
        {
          name: "Especiales",
          desc: "Italiana Spicy, Pera Azul con queso gorgonzola, Fresca y Caprichosa."
        },
        {
          name: "Gourmet",
          desc: "Mar (mariscos), Vegetariana, Portobello y Alcachofa, y Margarita da Vinci."
        },
        {
          name: "Mexicanas",
          desc: "Cochinita pibil, Spicy Pepperoni con jalapeño y salsa taquera de la casa."
        },
        {
          name: "Dulces",
          desc: "Pizza de Nutella con fruta fresca y cajeta con nuez y fresas para el postre."
        }
      ],
      menuExample: [
        "Clásica: Margarita con mozzarella fior di latte y albahaca fresca",
        "Especial: Pera Azul con gorgonzola, pera caramelizada y nuez",
        "Gourmet: Portobello y Alcachofa con aceite de trufa y parmesano",
        "Mexicana: Cochinita pibil con habanero, cebolla morada y cilantro",
        "Dulce: Nutella con fresas frescas, plátano y azúcar glass"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "barra-americana",
      title: "Barra Americana para Eventos",
      headline: "Experiencias casuales y deliciosas estilo americano para tu celebración",
      seoTitle: "Barra Americana para Eventos y Bodas | Bodasesor",
      seoDescription: "Barra americana con mini hamburguesas, sliders, alitas, nachos, boneless y más para eventos, bodas y corporativos. Servicio profesional con montaje incluido.",
      description: [
        "En Bodasesor creamos experiencias gastronómicas dinámicas y divertidas con una selección de alimentos estilo americano preparados al momento y presentados con montaje profesional. Nuestra Barra Americana combina sabor, variedad y servicio de alta calidad para crear eventos memorables.",
        "Ofrecemos alimentos estilo casual preparados con ingredientes frescos y presentaciones modernas para adaptarse a eventos relajados y dinámicos: mini hamburguesas y sliders, alitas y boneless con diferentes salsas, nachos con queso cheddar y jalapeños, mini hot dogs y corn dogs, y papas con acompañamientos americanos.",
        "Perfecta para bodas informales, cumpleaños, eventos corporativos de team building y cualquier celebración donde quieras un ambiente descomplicado y lleno de sabor. Elige entre diferentes modalidades de servicio según el tipo de experiencia que deseas para tu evento."
      ],
      category: "barras-alimentos",
      categoryLabel: "Barras de Alimentos",
      categoryHref: "/barra-americana",
      related: [
        {
          name: "Barra de Crepas",
          href: "/barra-crepas"
        },
        {
          name: "Barra de Sushi",
          href: "/barra-sushi"
        },
        {
          name: "Barra de Mariscos",
          href: "/barra-mariscos"
        },
        {
          name: "Barra de Paninis",
          href: "/barra-paninis"
        },
        {
          name: "Barra de Pastas",
          href: "/barra-pastas"
        },
        {
          name: "Barra de Pizzas",
          href: "/barra-pizzas"
        },
        {
          name: "Barra Americana",
          href: "/barra-americana"
        },
        {
          name: "Barra Yucateca",
          href: "/barra-yucateca"
        }
      ],
      included: [
        {
          icon: "🍔",
          title: "Mini hamburguesas y sliders",
          desc: "Sliders de res artesanal en pan brioche con queso, lechuga, jitomate y pepinillos."
        },
        {
          icon: "🍗",
          title: "Alitas y boneless",
          desc: "Alitas y boneless con salsas BBQ, búfalo, honey-garlic y ranch dip."
        },
        {
          icon: "🍟",
          title: "Nachos y papas americanas",
          desc: "Nachos con queso cheddar fundido y jalapeños + papas a la francesa y papas gajo."
        },
        {
          icon: "🌭",
          title: "Mini hot dogs y corn dogs",
          desc: "Hot dogs miniatura y corn dogs con mostaza, catsup y salsas artesanales."
        },
        {
          icon: "🫙",
          title: "Salsas de la casa",
          desc: "BBQ ahumado, cheddar fundido, ranch, chipotle mayo, mustard honey y búfalo."
        },
        {
          icon: "🍽️",
          title: "Servicio profesional con montaje",
          desc: "Personal uniformado, montaje de barra completo y duración según el paquete."
        }
      ],
      varieties: [
        {
          name: "Mini hamburguesas y sliders",
          desc: "Sliders de res, pollo y vegetariano. El favorito para eventos casuales."
        },
        {
          name: "Alitas y boneless",
          desc: "Con salsas BBQ, búfalo, miel-mostaza y honey-garlic. Todas con dip incluido."
        },
        {
          name: "Nachos + papas",
          desc: "Nachos con queso cheddar y jalapeños, papas a la francesa y papas gajo."
        },
        {
          name: "Barra completa",
          desc: "Mini pizzas, mac & cheese, burritos tex-mex, mozzarella sticks, onion rings y chili con carne."
        }
      ],
      menuExample: [
        "Menú 1: Mini hamburguesas, papas a la francesa, alitas BBQ, nachos con queso y mozzarella sticks",
        "Menú 2: Mini hot dogs, boneless búfalo, onion rings, mac & cheese y chili con carne",
        "Menú 3: Mini pizzas, burritos tex-mex, papas gajo, elotes en vaso y palomitas gourmet",
        "Salsas: BBQ, búfalo, ranch, cheddar fundido y chipotle mayo",
        "Acompañante: Coleslaw cremosa y palomitas gourmet de caramelo"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "barra-yucateca",
      title: "Barra Yucateca para Eventos",
      headline: "La cocina del sureste en toda su riqueza y color",
      seoTitle: "Barra Yucateca para Eventos en México | Bodasesor",
      seoDescription: "Cochinita pibil, salbutes, panuchos y poc chuc para eventos y bodas. La cocina yucateca auténtica llevada a tu celebración con todo el sabor del sureste.",
      description: [
        "La cocina yucateca es una de las más complejas y aromáticas de México, con influencias mayas, españolas y del Caribe. Nuestra barra yucateca rescata recetas originales preparadas con los ingredientes característicos: achiote, naranja agria, xcatic y habanero.",
        "Cocinamos la cochinita pibil en horno de pib (bajo tierra o en horno de leña), para lograr el color y la textura inconfundibles. Los panuchos y salbutes se fríen al momento, con sus rellenos generosos y garnachas de frijol espelón.",
        "El resultado es una mesa llena de colores, aromas y sabores únicos que transportan a los invitados al corazón de Mérida. Ideal para eventos temáticos regionales, bodas de parejas enamoradas del sureste o cualquier evento que quiera destacar por originalidad."
      ],
      category: "barras-alimentos",
      categoryLabel: "Barras de Alimentos",
      categoryHref: "/barra-yucateca",
      related: [
        {
          name: "Barra de Crepas",
          href: "/barra-crepas"
        },
        {
          name: "Barra de Sushi",
          href: "/barra-sushi"
        },
        {
          name: "Barra de Mariscos",
          href: "/barra-mariscos"
        },
        {
          name: "Barra de Paninis",
          href: "/barra-paninis"
        },
        {
          name: "Barra de Pastas",
          href: "/barra-pastas"
        },
        {
          name: "Barra de Pizzas",
          href: "/barra-pizzas"
        },
        {
          name: "Barra Americana",
          href: "/barra-americana"
        },
        {
          name: "Barra Yucateca",
          href: "/barra-yucateca"
        }
      ],
      included: [
        {
          icon: "🐷",
          title: "Cochinita pibil auténtica",
          desc: "Cerdo marinado en achiote, naranja agria y especias, cocinado en hoja de plátano."
        },
        {
          icon: "🌮",
          title: "Panuchos y salbutes",
          desc: "Fritos al momento con frijol espelón, rellenos de cochinita o pollo con escabeche."
        },
        {
          icon: "🧅",
          title: "Cebolla morada encurtida",
          desc: "El acompañante inseparable: cebolla en vinagre de naranja agria y orégano yucateco."
        },
        {
          icon: "🌶️",
          title: "Habanero en todas sus formas",
          desc: "Salsa de habanero fresca, xcatic en escabeche y habanero asado. Para los valientes."
        },
        {
          icon: "🍋",
          title: "Agua de Jamaica y Chaya",
          desc: "Aguas regionales del sureste: de jamaica, chaya con piña y horchata de coco."
        },
        {
          icon: "🎭",
          title: "Decoración yucateca",
          desc: "Manteles bordados, servilletas de terno y flores de heliconias para ambientar."
        }
      ],
      varieties: [
        {
          name: "Cochinita pibil",
          desc: "El ícono yucateco: cerdo en achiote con naranja agria y hierbas de la región."
        },
        {
          name: "Poc Chuc",
          desc: "Cerdo asado a la leña marinado en naranja agria. Jugoso y aromático."
        },
        {
          name: "Relleno negro",
          desc: "El platillo más elaborado: pavo en salsa negra con chirmole, huevo y especias."
        },
        {
          name: "Sopa de lima",
          desc: "Caldo de lima yucateco con tiras de tortilla frita, pollo y cilantro."
        }
      ],
      menuExample: [
        "Sopa: Sopa de lima con tortilla frita y pollo deshebrado",
        "Plato fuerte: Cochinita pibil con salbutes, panuchos y cebolla morada",
        "Guarnición: Frijoles colados con epazote y chile ancho",
        "Postre: Marquesita de Nutella y queso gouda rallado",
        "Bebida: Agua de chaya con piña y limón natural"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "parrillada",
      title: "Parrillada para Eventos",
      headline: "Asado en vivo: mexicana tradicional o argentina premium",
      seoTitle: "Parrillada para Eventos y Bodas en México | Bodasesor",
      seoDescription: "Servicio de parrillada para bodas y eventos en México. Elige parrillada tradicional mexicana o argentina con asador profesional, cortes premium y montaje completo.",
      description: [
        "La parrillada es una de las estaciones más pedidas en bodas, XV años y eventos corporativos. En Bodasesor ofrecemos dos estilos listos para montar: la parrillada tradicional mexicana y la parrillada argentina, ambas con asador profesional y servicio completo.",
        "Puedes combinar cortes, guarniciones y estación en vivo según el número de invitados y el tipo de celebración. Incluimos equipo de parrilla, mise en place, montaje y retiro para que solo te preocupes por disfrutar.",
        "Cotiza sin compromiso y te recomendamos la mejor opción —tradicional o argentina— según tu menú, espacio y presupuesto."
      ],
      category: "estaciones",
      categoryLabel: "Estaciones de Comida",
      categoryHref: "/parrillada",
      related: [
        { name: "Parrillada Tradicional", href: "/parrillada-tradicional" },
        { name: "Parrillada Argentina", href: "/parrillada-argentina" },
        { name: "Taquiza de Guisados", href: "/taquiza-guisados" },
        { name: "Puestos de Antojitos", href: "/puestos-antojitos" },
        { name: "Barra de Bebidas", href: "/barras-de-bebidas" },
        { name: "Banquetes y Catering", href: "/banquetes-catering" }
      ],
      included: [
        { icon: "🥩", title: "Dos estilos de parrillada", desc: "Tradicional mexicana o argentina premium, con cortes seleccionados." },
        { icon: "🔥", title: "Asador profesional", desc: "Cocción en vivo con técnica y punto exacto para cada corte." },
        { icon: "🍽️", title: "Servicio completo", desc: "Equipo, montaje, personal y retiro incluidos en la cotización." },
        { icon: "📋", title: "Menú a medida", desc: "Adaptamos porciones y acompañamientos al número de invitados." }
      ],
      faqs: [
        { q: "¿Qué tipos de parrillada ofrecen?", a: "Parrillada tradicional mexicana y parrillada argentina. Ambas con asador profesional." },
        { q: "¿Cuál me conviene para mi evento?", a: "La mexicana es ideal para reuniones familiares y corporativos; la argentina destaca en bodas y eventos de mayor producción. Te asesoramos al cotizar." },
        { q: "¿Incluye montaje?", a: "Sí: equipo de parrilla, mise en place, personal y retiro al finalizar." }
      ],
      services: [
        { name: "Parrillada Tradicional", href: "/parrillada-tradicional", icon: "🌮" },
        { name: "Parrillada Argentina", href: "/parrillada-argentina", icon: "🥩" },
        { name: "Taquiza de Guisados", href: "/taquiza-guisados", icon: "🌮" },
        { name: "Banquetes", href: "/banquetes-catering", icon: "🍽️" }
      ]
    },
    {
      slug: "parrillada-argentina",
      title: "Parrillada Argentina para Eventos",
      headline: "Los mejores cortes del sur del continente en tu celebración",
      seoTitle: "Parrillada Argentina para Eventos en México | Bodasesor",
      seoDescription: "Servicio de parrillada argentina para bodas y eventos. Asado de tira, entraña, chorizo criollo y chimichurri artesanal. Asador profesional en vivo.",
      description: [
        "La parrillada argentina es un evento dentro del evento. Nuestro asador profesional —parrillero con técnica bonaerense— prepara los cortes con el fuego lento y el tiempo necesario para lograr la cocción perfecta en cada pieza.",
        "Trabajamos con cortes importados de Argentina y Uruguay: asado de tira, entraña, vacío, riñones y chorizo criollo, todos a temperatura ideal de la parrilla. El chimichurri es artesanal, preparado el mismo día con hierbas frescas.",
        "El humo, el olor y el espectáculo del fuego crean una atmósfera festiva que nadie olvida. La parrillada argentina es perfecta para eventos de cualquier magnitud, desde reuniones de 30 personas hasta grandes celebraciones de 500."
      ],
      category: "estaciones",
      categoryLabel: "Estaciones de Comida",
      categoryHref: "/parrillada-argentina",
      related: [
        {
          name: "Parrillada Argentina",
          href: "/parrillada-argentina"
        },
        {
          name: "Parrillada Tradicional",
          href: "/parrillada-tradicional"
        },
        {
          name: "Taquiza de Guisados",
          href: "/taquiza-guisados"
        },
        {
          name: "Puestos de Antojitos",
          href: "/puestos-antojitos"
        },
        {
          name: "Puestos de Quesadillas",
          href: "/puestos-quesadillas"
        },
        {
          name: "Carrito de Snacks",
          href: "/carrito-snacks"
        }
      ],
      included: [
        {
          icon: "🥩",
          title: "Cortes argentinos premium",
          desc: "Asado de tira, entraña, vacío, bife de chorizo y tira de costilla."
        },
        {
          icon: "🌿",
          title: "Chimichurri artesanal",
          desc: "Preparado el mismo día con perejil, orégano, ajo, vinagre y ají molido."
        },
        {
          icon: "🔥",
          title: "Parrillero en vivo",
          desc: "Asador profesional con técnica argentina. El espectáculo es parte del servicio."
        },
        {
          icon: "🥗",
          title: "Ensalada criolla",
          desc: "Jitomate, pimiento verde, cebolla, zanahoria y vinagreta de limón."
        },
        {
          icon: "🥖",
          title: "Pan de campo",
          desc: "Pan rústico artesanal para acompañar la carne con chimichurri."
        },
        {
          icon: "🍷",
          title: "Maridaje con Malbec",
          desc: "Opción de incluir servicio de vino Malbec argentino coordinado con la carne."
        }
      ],
      varieties: [
        {
          name: "Cortes premium",
          desc: "Picaña, New York, Arrachera y Rib eye. Los mejores cortes a las brasas."
        },
        {
          name: "Parrillada completa",
          desc: "Cortes premium + Pollo BBQ, Chorizo, Chistorra y Piña asada caramelizada."
        },
        {
          name: "Montado español",
          desc: "Chistorra al vino, Croquetas de Serrano, Tortilla Española y Paella en vivo."
        },
        {
          name: "Parrillada vegetariana",
          desc: "Verduras de temporada, provoleta a la parrilla, champiñones y pimientos asados."
        }
      ],
      menuExample: [
        "Aperitivo: Chistorra al vino con croquetas de jamón serrano",
        "Principal: Picaña y New York a las brasas con chimichurri de la casa",
        "Grill: Arrachera marinada y Rib eye al punto",
        "Embutido: Chorizo criollo y pollo BBQ con pan de campo",
        "Extra: Piña asada caramelizada y ensalada criolla"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "parrillada-tradicional",
      title: "Parrillada Tradicional Mexicana",
      headline: "El asado mexicano en toda su tradición y sabor",
      seoTitle: "Parrillada Tradicional para Eventos en México | Bodasesor",
      seoDescription: "Parrillada mexicana tradicional para eventos y bodas. Arrachera, costilla, chistorra, chuletas y cebollas cambray. El sabor auténtico del norte de México.",
      description: [
        "La parrillada tradicional mexicana es el corazón de cualquier reunión familiar o empresarial. Arrachera marinada, costilla de res, chuletas ahumadas y cebollas cambray asadas, todo cocinado en carbón y con los condimentos que hacen única nuestra cocina del asado.",
        "Nuestra marinación de arrachera es receta propia, con jugo de limón, ajo, cilantro y especias secretas que llevan en Bodasesor más de 10 años. La carne llega al punto exacto: jugosa, con el char perfecto y la suavidad que todos esperan.",
        "El servicio incluye asador profesional, todo el equipo de parrilla y la mise en place completa. Solo necesitas el espacio, los invitados y las ganas de disfrutar."
      ],
      category: "estaciones",
      categoryLabel: "Estaciones de Comida",
      categoryHref: "/parrillada-tradicional",
      related: [
        {
          name: "Parrillada Argentina",
          href: "/parrillada-argentina"
        },
        {
          name: "Parrillada Tradicional",
          href: "/parrillada-tradicional"
        },
        {
          name: "Taquiza de Guisados",
          href: "/taquiza-guisados"
        },
        {
          name: "Puestos de Antojitos",
          href: "/puestos-antojitos"
        },
        {
          name: "Puestos de Quesadillas",
          href: "/puestos-quesadillas"
        },
        {
          name: "Carrito de Snacks",
          href: "/carrito-snacks"
        }
      ],
      included: [
        {
          icon: "🥩",
          title: "Arrachera marinada",
          desc: "Arrachera de res marinada 12 horas en receta propia. Suave y jugosa al punto."
        },
        {
          icon: "🦴",
          title: "Costilla de res",
          desc: "Costillas corte americano, en salsa BBQ ahumada preparada en casa."
        },
        {
          icon: "🧅",
          title: "Cebollas cambray",
          desc: "Asadas directamente en la parrilla con aceite de oliva y sal gruesa."
        },
        {
          icon: "🌶️",
          title: "Chiles toreados",
          desc: "Chiles güeros y jalapeños asados. Complemento infaltable del asado mexicano."
        },
        {
          icon: "🫙",
          title: "Salsas caseras",
          desc: "Tres tipos: verde tomatillo, roja molcajeteada y habanero para valientes."
        },
        {
          icon: "🌮",
          title: "Tortillas de maíz y harina",
          desc: "Tortillas calientes para hacer taquitos. El complemento perfecto."
        }
      ],
      varieties: [
        {
          name: "Parrillada norteña",
          desc: "Arrachera, cabrito, chuletas y costilla. El estilo Monterrey en tu mesa."
        },
        {
          name: "Parrillada completa",
          desc: "Arrachera, costilla, chuleta, chistorra, chorizo y cebollas. Todo incluido."
        },
        {
          name: "Parrillada campirana",
          desc: "Nopales asados, elotes, carne asada, frijoles charros y salsa ranchera."
        },
        {
          name: "Parrillada mixta familiar",
          desc: "Arrachera + pollo entero + salchichas para los niños. Para todas las edades."
        }
      ],
      menuExample: [
        "Entrada: Queso panela asado con epazote y jalapeño",
        "Principal: Arrachera marinada con cebollas cambray y chiles toreados",
        "Segundo: Costilla de res BBQ con puré de papa rústico",
        "Complemento: Frijoles charros de olla con chorizo y tocino",
        "Tortillas calientes y salsas de la casa al gusto"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "taquiza-guisados",
      title: "Taquiza de Guisados para Eventos",
      headline: "La auténtica taquiza de guisado que todos aman",
      seoTitle: "Taquiza de Guisados para Eventos y Bodas | Bodasesor",
      seoDescription: "Servicio de taquiza de guisados para bodas, XV años, fiestas y corporativos. 8 guisados diferentes, tortillas a mano y salsas caseras. El favorito de siempre.",
      description: [
        "La taquiza de guisados es el servicio más solicitado de Bodasesor, y con razón: convierte cualquier evento en una fiesta auténtica con el sabor de los mejores guisados caseros de México, preparados con recetas que llevan décadas probadas.",
        "Ofrecemos hasta 8 guisados diferentes servidos en cazuelas de barro, con tortillas hechas a mano en comal directamente en el evento. Cada taquero tiene experiencia en eventos de más de 200 personas, garantizando rapidez y calidad constante.",
        "El concepto es sencillo y efectivo: comida que todos conocen y aman, preparada con ingredientes de primera calidad. Funciona perfectamente a cualquier hora: al mediodía como plato fuerte o a la medianoche como \"segunda cena\" para reactivar la fiesta."
      ],
      category: "estaciones",
      categoryLabel: "Estaciones de Comida",
      categoryHref: "/taquiza-guisados",
      related: [
        {
          name: "Parrillada Argentina",
          href: "/parrillada-argentina"
        },
        {
          name: "Parrillada Tradicional",
          href: "/parrillada-tradicional"
        },
        {
          name: "Taquiza de Guisados",
          href: "/taquiza-guisados"
        },
        {
          name: "Puestos de Antojitos",
          href: "/puestos-antojitos"
        },
        {
          name: "Puestos de Quesadillas",
          href: "/puestos-quesadillas"
        },
        {
          name: "Carrito de Snacks",
          href: "/carrito-snacks"
        }
      ],
      included: [
        {
          icon: "🌮",
          title: "8 guisados diferentes",
          desc: "Hasta 8 opciones rotando: tinga, rajas, chicharrón, frijoles, mole y más."
        },
        {
          icon: "🫓",
          title: "Tortillas hechas a mano",
          desc: "Tortillera en sitio con comal de barro. Tortillas calientes todo el tiempo."
        },
        {
          icon: "🫙",
          title: "5 salsas caseras",
          desc: "Verde, roja, habanero, macha y pico de gallo. Preparadas en el lugar."
        },
        {
          icon: "🧅",
          title: "Guarniciones completas",
          desc: "Cilantro, cebolla, nopales, aguacate, chicharrón prensado y crema."
        },
        {
          icon: "👨‍🍳",
          title: "Taquero profesional",
          desc: "Con comal, cazuelas de barro y uniforme. El toque auténtico del street food."
        },
        {
          icon: "🍹",
          title: "Agua de sabor incluida",
          desc: "Jamaica o tamarindo preparados en olla grande. El complemento perfecto."
        }
      ],
      varieties: [
        {
          name: "Tinga de pollo",
          desc: "Pollo deshebrado en jitomate, cebolla y chipotle. El favorito de México."
        },
        {
          name: "Rajas con crema",
          desc: "Chile poblano, elote, crema y queso Oaxaca. Irresistible en tortilla caliente."
        },
        {
          name: "Chicharrón en salsa",
          desc: "Chicharrón suave en salsa verde tomatillo o roja guajillo."
        },
        {
          name: "Frijoles charros",
          desc: "Frijoles de olla con chorizo, tocino, cebolla y cilantro."
        },
        {
          name: "Picadillo de res",
          desc: "Carne de res molida con papa, zanahoria, jitomate y especias."
        },
        {
          name: "Mole rojo con pollo",
          desc: "Pollo en mole rojo de guajillo, mulato y ancho. El más festivo."
        },
        {
          name: "Calabacitas con queso",
          desc: "Calabacita tierna con elote, jitomate y queso panela. Opción vegetariana."
        },
        {
          name: "Hongos al ajillo",
          desc: "Champiñones y setas salteados con ajo, epazote y chile de árbol."
        }
      ],
      menuExample: [
        "Guisado 1: Tinga de pollo con chipotle y cebolla morada",
        "Guisado 2: Rajas con crema, elote y queso Oaxaca",
        "Guisado 3: Chicharrón en salsa verde tomatillo",
        "Guisado 4: Frijoles charros con chorizo y tocino",
        "Guisado 5: Mole rojo de pollo con ajonjolí tostado"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "puestos-antojitos",
      title: "Puestos de Antojitos para Eventos",
      headline: "Lo mejor del street food mexicano en tu celebración",
      seoTitle: "Puestos de Antojitos para Eventos en México | Bodasesor",
      seoDescription: "Antojitos mexicanos para eventos y bodas: tlayudas, tlacoyos, gorditas, sopes y memelas. El sabor auténtico de la calle con presentación premium.",
      description: [
        "Los antojitos mexicanos son sinónimo de fiesta. Nuestros puestos de antojitos recrean la mejor experiencia del street food de México, pero con estándares de higiene y calidad que superan cualquier expectativa para eventos.",
        "Cada puesto está a cargo de especialistas que dominan el arte de preparar gorditas, tlacoyos, sopes, memelas y tlayudas en comal de barro, con los rellenos y acompañantes que los hacen únicos en cada región.",
        "Es la opción perfecta para bodas temáticas, XV años con toque tradicional, eventos corporativos que quieren algo auténtico y cualquier celebración donde la comida mexicana sea la protagonista."
      ],
      category: "estaciones",
      categoryLabel: "Estaciones de Comida",
      categoryHref: "/puestos-antojitos",
      related: [
        {
          name: "Parrillada Argentina",
          href: "/parrillada-argentina"
        },
        {
          name: "Parrillada Tradicional",
          href: "/parrillada-tradicional"
        },
        {
          name: "Taquiza de Guisados",
          href: "/taquiza-guisados"
        },
        {
          name: "Puestos de Antojitos",
          href: "/puestos-antojitos"
        },
        {
          name: "Puestos de Quesadillas",
          href: "/puestos-quesadillas"
        },
        {
          name: "Carrito de Snacks",
          href: "/carrito-snacks"
        }
      ],
      included: [
        {
          icon: "🥙",
          title: "Gorditas y sopes",
          desc: "Hechas a mano en el momento con masa fresca. Rellenos a elección."
        },
        {
          icon: "🌽",
          title: "Tlacoyos y memelas",
          desc: "Tlacoyos de frijol, habas y requesón. Memelas de maíz azul y blanco."
        },
        {
          icon: "🧀",
          title: "Quesadillas de comal",
          desc: "Con flor de calabaza, huitlacoche, champiñones, chicharrón y queso Oaxaca."
        },
        {
          icon: "🫙",
          title: "Guarniciones completas",
          desc: "Salsa verde, salsa roja, crema, queso, cebolla, cilantro y nopales."
        },
        {
          icon: "🌮",
          title: "Tamales de barro",
          desc: "Opción de incluir tamales de hoja de maíz: rajas, elote, dulce y mole."
        },
        {
          icon: "☕",
          title: "Atole o champurrado",
          desc: "Para los eventos matutinos o nocturnos: atole de guayaba o champurrado."
        }
      ],
      varieties: [
        {
          name: "Gorditas",
          desc: "De chicharrón, frijoles con queso, picadillo, rajas o queso de hebra."
        },
        {
          name: "Tlacoyos",
          desc: "De frijol negro, habas con epazote o requeson. Cubiertos de nopal y salsa."
        },
        {
          name: "Sopes",
          desc: "Con frijoles, carne, lechuga, salsa y crema. El antojito más completo."
        },
        {
          name: "Quesadillas huitlacoche",
          desc: "El maíz azul mexicano con huitlacoche, flor de calabaza y epazote."
        }
      ],
      menuExample: [
        "Gordita: De chicharrón prensado con salsa verde y queso cotija",
        "Tlacoyo: De frijol negro con nopal asado y salsa roja",
        "Sopa: Sopa de tortilla con pasilla y epazote",
        "Quesadilla: De huitlacoche con flor de calabaza en comal de barro",
        "Bebida: Atole de guayaba o agua de Jamaica natural"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "puestos-quesadillas",
      title: "Puestos de Quesadillas para Eventos",
      headline: "Quesadillas artesanales hechas a mano en tu evento",
      seoTitle: "Puestos de Quesadillas para Eventos y Bodas | Bodasesor",
      seoDescription: "Quesadillas de comal artesanales para eventos y bodas. Variedad de rellenos gourmet y tradicionales, masa recién hecha y salsas caseras.",
      description: [
        "Las quesadillas son el antojito mexicano por excelencia. Nuestro servicio de puesto de quesadillas lleva a tu evento la experiencia completa: masa fresca hecha en el momento, comal de barro caliente y una selección de rellenos que combina tradición con tendencias gastronómicas.",
        "Tenemos desde los clásicos —queso Oaxaca, huitlacoche, flor de calabaza— hasta opciones gourmet como setas al ajillo con trufa, tinga de langosta o queso de cabra con jitomate deshidratado. La calidad del relleno es tan importante como la masa.",
        "Este servicio funciona perfectamente como entrante, como opción durante el cóctel de bienvenida o como complemento nocturno de la fiesta. Los invitados siempre regresan por más."
      ],
      category: "estaciones",
      categoryLabel: "Estaciones de Comida",
      categoryHref: "/puestos-quesadillas",
      related: [
        {
          name: "Parrillada Argentina",
          href: "/parrillada-argentina"
        },
        {
          name: "Parrillada Tradicional",
          href: "/parrillada-tradicional"
        },
        {
          name: "Taquiza de Guisados",
          href: "/taquiza-guisados"
        },
        {
          name: "Puestos de Antojitos",
          href: "/puestos-antojitos"
        },
        {
          name: "Puestos de Quesadillas",
          href: "/puestos-quesadillas"
        },
        {
          name: "Carrito de Snacks",
          href: "/carrito-snacks"
        }
      ],
      included: [
        {
          icon: "🌽",
          title: "Masa fresca artesanal",
          desc: "Preparada con maíz nixtamalizado el mismo día. Sin harina ni conservadores."
        },
        {
          icon: "🧀",
          title: "Queso Oaxaca de hebra",
          desc: "Queso genuino de la región, importado directamente de Oaxaca."
        },
        {
          icon: "🌸",
          title: "Flores de calabaza frescas",
          desc: "Flor de calabaza y huitlacoche en temporada. El relleno más mexicano."
        },
        {
          icon: "🍄",
          title: "Champiñones y setas",
          desc: "Portobellos, setas y champiñones salteados al ajo con epazote."
        },
        {
          icon: "🫙",
          title: "4 salsas caseras",
          desc: "Verde, roja, pico de gallo y salsa de chile de árbol. Molcajeteadas."
        },
        {
          icon: "🥑",
          title: "Guacamole fresco",
          desc: "Hecho al momento con aguacate Hass, cilantro, chile y limón."
        }
      ],
      varieties: [
        {
          name: "Clásica de queso",
          desc: "Solo queso Oaxaca y epazote. Simple y perfecta. La favorita de siempre."
        },
        {
          name: "Huitlacoche",
          desc: "El \"caviar mexicano\": huitlacoche con epazote, cebolla y queso de cabra."
        },
        {
          name: "Flor de calabaza",
          desc: "Flor fresca, queso de hebra y rajas de poblano. Ligera y deliciosa."
        },
        {
          name: "Setas al ajillo",
          desc: "Setas y champiñones salteados con ajo, chile y epazote. Opción vegana."
        }
      ],
      menuExample: [
        "Favorita: Queso Oaxaca con huitlacoche y flor de calabaza",
        "Gourmet: Setas al ajillo con trufa, epazote y queso de cabra",
        "Tradicional: Tinga de pollo con chile chipotle y crema",
        "Vegana: Rajas con elote, cebolla caramelizada y crema de anacardo",
        "Con todo: Chicharrón en salsa verde con queso asadero"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "carrito-snacks",
      title: "Carrito de Snacks para Eventos",
      headline: "La estación de snacks más divertida de tu celebración",
      seoTitle: "Carrito de Snacks para Eventos y Fiestas | Bodasesor",
      seoDescription: "Carrito de snacks para eventos, bodas y fiestas. Palomitas gourmet, fruta con chile, pepinos, jícamas y elotes con todos sus acompañantes.",
      description: [
        "El carrito de snacks es el toque festivo y descomplicado que todo evento necesita. Inspirado en los tradicionales carritos callejeros de México, ofrecemos fruta con chile, elotes esquites, pepinos y jícamas con las combinaciones que todos amamos.",
        "Montamos un carrito decorado al estilo vintage o moderno, según tu temática, con iluminación y letrero personalizado. Es una estación que siempre genera fotos y comentarios positivos, y que hace que los invitados sonrían desde el primer momento.",
        "Ideal como complemento de cualquier servicio de alimentos, como entretención durante el cóctel de espera o como snack nocturno para mantener a los invitados con energía hasta el final de la fiesta."
      ],
      category: "estaciones",
      categoryLabel: "Estaciones de Comida",
      categoryHref: "/carrito-snacks",
      related: [
        {
          name: "Parrillada Argentina",
          href: "/parrillada-argentina"
        },
        {
          name: "Parrillada Tradicional",
          href: "/parrillada-tradicional"
        },
        {
          name: "Taquiza de Guisados",
          href: "/taquiza-guisados"
        },
        {
          name: "Puestos de Antojitos",
          href: "/puestos-antojitos"
        },
        {
          name: "Puestos de Quesadillas",
          href: "/puestos-quesadillas"
        },
        {
          name: "Carrito de Snacks",
          href: "/carrito-snacks"
        }
      ],
      included: [
        {
          icon: "🌽",
          title: "Elotes y esquites",
          desc: "Elote en vaso o mazorca con mayonesa, queso, chile y limón. Todos los acompañantes."
        },
        {
          icon: "🍎",
          title: "Fruta picada con chile",
          desc: "Sandía, mango, melón y pepino con chamoy, chile en polvo y limón."
        },
        {
          icon: "🥒",
          title: "Pepinos y jícama",
          desc: "Pepino y jícama en bastones con salsa valentina, limón y sal de gusano."
        },
        {
          icon: "🍿",
          title: "Palomitas gourmet",
          desc: "Mantequilla artesanal, caramelo, cheddar, trufa y chile piquín."
        },
        {
          icon: "🫙",
          title: "Salsas y condimentos",
          desc: "Chamoy, valentina, tajín, sal de gusano, mayonesa y limones. Todo incluido."
        },
        {
          icon: "🎪",
          title: "Carrito decorativo",
          desc: "Carrito estilizado con iluminación y personalización del nombre del evento."
        }
      ],
      varieties: [
        {
          name: "Carrito de fruta",
          desc: "Sandía, mango, piña, pepino y jícama con todas las salsas."
        },
        {
          name: "Carrito de elotes",
          desc: "Elote en vaso y mazorca con todos los toppings. El clásico perfecto."
        },
        {
          name: "Carrito de palomitas",
          desc: "4 sabores de palomitas gourmet + agua mineral o refrescos artesanales."
        },
        {
          name: "Carrito completo",
          desc: "Todos: fruta, elotes, palomitas y bebidas. El favorito para fiestas largas."
        }
      ],
      menuExample: [
        "Fruta: Mango manila con chamoy, tajín y crema de elote",
        "Elote: En vaso con mayonesa, queso cotija, chile piquín y limón",
        "Pepino: En bastones con sal de gusano, limón y valentina",
        "Palomitas: Caramelo salado con mantequilla artesanal",
        "Extra: Jícama con tamarindo y chile habanero para los más atrevidos"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "barra-bebidas",
      title: "Barra de Bebidas para Eventos",
      headline: "Servicio profesional de bebidas con alcohol y sin alcohol para cualquier celebración",
      seoTitle: "Barra de Bebidas para Eventos y Bodas | Bodasesor",
      seoDescription: "Servicio profesional de barra de bebidas para bodas, XV años, corporativos y fiestas. Bartenders certificados, cristalería premium y opciones con y sin alcohol.",
      description: [
        "En Bodasesor ofrecemos barras de bebidas diseñadas para complementar cualquier tipo de evento con servicio profesional, cristalería premium y atención especializada. Creamos experiencias elegantes y dinámicas con bebidas preparadas al momento y servicio continuo durante todo el evento.",
        "Ofrecemos diferentes opciones de barras para adaptarse al estilo de cada celebración: barra sin alcohol con margaritas, aguas frescas gourmet y jugos naturales; coctelería clásica; barra premium con gin y mixología; o una barra completamente personalizada para tu evento.",
        "Nuestras barras están diseñadas para adaptarse tanto a eventos casuales como celebraciones premium, manteniendo siempre una presentación elegante y un servicio impecable. El servicio incluye barra de madera elegante, cristalería completa, hielo incluido y bartenders profesionales."
      ],
      category: "bebidas",
      categoryLabel: "Barras de Bebidas",
      categoryHref: "/barra-bebidas",
      related: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas"
        },
        {
          name: "Barra de Mocteles",
          href: "/barra-mocteles"
        },
        {
          name: "Cocteles y Mixología",
          href: "/cocteles-mixologia"
        },
        {
          name: "Barra de Café Premium",
          href: "/barra-cafe-premium"
        },
        {
          name: "Paletas y Helados",
          href: "/paletas-helados"
        }
      ],
      included: [
        {
          icon: "🍹",
          title: "Bartenders certificados",
          desc: "Servicio profesional con formación en coctelería clásica y mixología contemporánea."
        },
        {
          icon: "🥃",
          title: "Barra de madera elegante",
          desc: "Montaje de barra profesional con cristalería completa incluida."
        },
        {
          icon: "🍷",
          title: "Vinos y espumosos",
          desc: "Selección de vinos tintos, blancos, rosados y cava para los brindis."
        },
        {
          icon: "🧊",
          title: "Hielo incluido",
          desc: "Hielo en cubos, picado y en esfera. Servicio continuo durante todo el evento."
        },
        {
          icon: "🧃",
          title: "Opciones sin alcohol",
          desc: "Margaritas sin alcohol, aguas frescas gourmet, café, té y jugos naturales."
        },
        {
          icon: "🍸",
          title: "Coctelería personalizada",
          desc: "Mezcal, gin, cócteles de autor y mixología especial según el estilo del evento."
        }
      ],
      varieties: [
        {
          name: "Barra sin alcohol",
          desc: "Refrescos, agua mineral, aguas frescas gourmet, margaritas sin alcohol, café y té."
        },
        {
          name: "Barra de coctelería clásica",
          desc: "Ron, tequila, vodka, whisky y mixers premium. Los clásicos siempre funcionan."
        },
        {
          name: "Barra premium",
          desc: "Gin premium, mezcal, whisky premium, jugos naturales y cócteles especiales."
        },
        {
          name: "Barra con gin y mixología",
          desc: "Experiencia de mixología con gin de autor, mezcal artesanal y técnicas especiales."
        },
        {
          name: "Barra personalizada",
          desc: "Marcas específicas, cócteles personalizados y bebidas premium según tus preferencias."
        }
      ],
      menuExample: [
        "Barra 1 (Sin alcohol): Refrescos variados, agua mineral, aguas frescas gourmet, margaritas sin alcohol, café y té",
        "Barra 2 (Tradicional): Coctelería clásica, ron, tequila, vodka, whisky y mixers premium",
        "Barra 3 (Premium): Gin premium, mezcal, whisky premium, jugos naturales y cócteles especiales",
        "Personalizada: Marcas específicas, cócteles con el nombre del evento y mixología de autor",
        "Brindis: Copa de espumoso para el momento más especial de la noche"
      ],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Banquetes y Catering",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Barras de Alimentos",
          href: "/barra-crepas",
          icon: "🥗"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Decoración y Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Shows y Entretenimiento",
          href: "/shows",
          icon: "🎭"
        }
      ]
    },
    {
      slug: "barra-mocteles",
      title: "Barra de Mocteles para Eventos",
      headline: "Todo el sabor y la elegancia, sin alcohol",
      seoTitle: "Barra de Mocteles Sin Alcohol para Eventos | Bodasesor",
      seoDescription: "Servicio de barra de mocteles (cócteles sin alcohol) para bodas, baby showers, eventos infantiles y corporativos. Sabores sofisticados y presentación impecable.",
      description: [
        "Los mocteles (cócteles sin alcohol) son la respuesta perfecta para eventos donde la inclusividad es una prioridad: eventos infantiles y familiares, baby showers, eventos corporativos, bodas con invitados que no consumen alcohol o simplemente para complementar la barra libre.",
        "Nuestros mixólogos crean mocteles con la misma atención y creatividad que los cócteles con alcohol: capas de sabor, presentaciones visuales impactantes, hierbas frescas, aguas aromatizadas y garnishes elaborados. La diferencia es que todos pueden disfrutarlos.",
        "Cada moctel es una obra de arte: colores vibrantes, aromas irresistibles y sabores que sorprenden. Perfectos para el cóctel de bienvenida, para el brindis o como opción permanente en eventos donde se quiere cuidar a todos los invitados."
      ],
      category: "bebidas",
      categoryLabel: "Barras de Bebidas",
      categoryHref: "/barra-mocteles",
      related: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas"
        },
        {
          name: "Barra de Mocteles",
          href: "/barra-mocteles"
        },
        {
          name: "Cocteles y Mixología",
          href: "/cocteles-mixologia"
        },
        {
          name: "Barra de Café Premium",
          href: "/barra-cafe-premium"
        },
        {
          name: "Paletas y Helados",
          href: "/paletas-helados"
        }
      ],
      included: [
        {
          icon: "🧃",
          title: "Jugos naturales de base",
          desc: "Naranja, limón, maracuyá, tamarindo y sandía exprimidos en el momento."
        },
        {
          icon: "🌿",
          title: "Hierbas y especias frescas",
          desc: "Albahaca, menta, romero, jengibre y lavanda para aromatizar y decorar."
        },
        {
          icon: "🫧",
          title: "Agua mineral y tónica",
          desc: "Agua mineral, tónica y agua de Jamaica para las bases espumantes."
        },
        {
          icon: "🍓",
          title: "Frutas frescas y exóticas",
          desc: "Fresas, mango, maracuyá, guayaba, lichee y más. Según la temporada."
        },
        {
          icon: "🧊",
          title: "Hielo artesanal",
          desc: "Cubos grandes y esferas de hielo claro para presentaciones premium."
        },
        {
          icon: "🎨",
          title: "Garnishes elaborados",
          desc: "Flores comestibles, rodajas deshidratadas, sal de colores y azúcar saborizada."
        }
      ],
      varieties: [
        {
          name: "Hibiscus Cooler",
          desc: "Jamaica concentrada, cítricos y agua mineral. Refrescante y visualmente impactante."
        },
        {
          name: "Té Verde Citrus",
          desc: "Té verde frío con naranja, limón y menta fresca. Sofisticado y ligero."
        },
        {
          name: "Lavanda Limonada",
          desc: "Limonada con infusión de lavanda, miel de abeja y agua mineral."
        },
        {
          name: "Matcha Mint Fizz",
          desc: "Matcha japonés con menta fresca, limón y tónica. Tendencia gourmet."
        },
        {
          name: "Nojito",
          desc: "Versión sin alcohol del mojito clásico: menta, lima, azúcar y agua mineral."
        },
        {
          name: "Virgin Mule",
          desc: "Jengibre fresco, lima y ginger beer artesanal. Picante y refrescante."
        },
        {
          name: "Sunset Tropical",
          desc: "Maracuyá, mango y tamarindo en capas con agua mineral y hielo de esfera."
        },
        {
          name: "Sparkling Piña Jalapeño",
          desc: "Piña natural con jalapeño macerado y tónica. El más atrevido del menú."
        }
      ],
      menuExample: [
        "Bienvenida: Hibiscus Cooler con cítricos y agua mineral espumante",
        "Fino: Lavanda Limonada con miel de abeja y flores comestibles",
        "Refrescante: Nojito de menta y lima con garnish de pepino",
        "Gourmet: Matcha Mint Fizz con tónica premium y menta fresca",
        "Picante: Sparkling Piña Jalapeño para los más atrevidos"
      ],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Banquetes y Catering",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Barras de Alimentos",
          href: "/barra-crepas",
          icon: "🥗"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Decoración y Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Shows y Entretenimiento",
          href: "/shows",
          icon: "🎭"
        }
      ]
    },
    {
      slug: "cocteles-mixologia",
      title: "Cócteles y Mixología para Eventos",
      headline: "El arte de la coctelería de autor en tu evento",
      seoTitle: "Mixología y Cócteles de Autor para Eventos | Bodasesor",
      seoDescription: "Servicio de mixología y coctelería de autor para bodas, lanzamientos y eventos de lujo. Bartenders con técnica internacional, ingredientes premium y show en vivo.",
      description: [
        "La mixología de autor lleva la coctelería a un nivel artístico. Nuestros mixólogos combinan técnicas internacionales —smoke, fat washing, clarificación, fermentación— con ingredientes mexicanos únicos para crear cócteles que son conversación obligada entre invitados.",
        "Cada evento recibe un menú de cócteles diseñado específicamente: desde el cóctel de bienvenida hasta la copa de cierre, con coherencia de sabores, colores y presentación que refleja la identidad del evento.",
        "Ofrecemos también show bartending: técnicas de flair, preparación en vivo con ingredientes inusuales y explicaciones breves que educan y entretienen. Es la opción perfecta para lanzamientos de producto, bodas premium y eventos corporativos de alto perfil."
      ],
      category: "bebidas",
      categoryLabel: "Barras de Bebidas",
      categoryHref: "/cocteles-mixologia",
      related: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas"
        },
        {
          name: "Barra de Mocteles",
          href: "/barra-mocteles"
        },
        {
          name: "Cocteles y Mixología",
          href: "/cocteles-mixologia"
        },
        {
          name: "Barra de Café Premium",
          href: "/barra-cafe-premium"
        },
        {
          name: "Paletas y Helados",
          href: "/paletas-helados"
        }
      ],
      included: [
        {
          icon: "🎓",
          title: "Mixólogos certificados",
          desc: "Con formación en escuelas internacionales de coctelería y experiencia comprobada."
        },
        {
          icon: "🔥",
          title: "Técnicas de vanguardia",
          desc: "Smoke, fat washing, sous vide, infusiones en frío y clarificación."
        },
        {
          icon: "🌿",
          title: "Ingredientes mexicanos",
          desc: "Mezcal, pulque, tepache, tamarindo, hibiscus y chiles para cócteles únicos."
        },
        {
          icon: "📋",
          title: "Menú de autor personalizado",
          desc: "Diseñamos un menú exclusivo para tu evento, con nombre y historia de cada trago."
        },
        {
          icon: "🎭",
          title: "Show en vivo",
          desc: "Preparación espectacular con fuego, humo, nitrógeno o flair según el paquete."
        },
        {
          icon: "📸",
          title: "Presentación fotogénica",
          desc: "Cócteles diseñados para la era de las redes sociales. Cada copa es una foto."
        }
      ],
      varieties: [
        {
          name: "Cócteles clásicos",
          desc: "Negroni, Old Fashioned, Margarita, Daiquiri y Manhattan. La escuela clásica."
        },
        {
          name: "Cócteles mexicanos",
          desc: "Paloma, Mezcal Negroni, Tepache Spritz y Margarita de Mole Negro."
        },
        {
          name: "Cócteles de vanguardia",
          desc: "Smoke Old Fashioned, Fat-Washed Martini y Smash con nitrógeno líquido."
        },
        {
          name: "Cóctel de autor del evento",
          desc: "Un cóctel exclusivo creado para tu evento, con nombre, historia y receta."
        }
      ],
      menuExample: [
        "Bienvenida: Mezcal Negroni con mezcal joven, vermouth rojo y Campari",
        "De autor: \"La Novia\" — gin de pepino, elder flower, limón y hibiscus espumante",
        "Clásico mexicano: Paloma con tequila blanco, toronja fresca y sal de gusano",
        "Vanguardia: Old Fashioned ahumado con whisky bourbon y humo de roble",
        "Cierre: Espresso Martini con vodka, licor de café y espuma de café"
      ],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Banquetes y Catering",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Barras de Alimentos",
          href: "/barra-crepas",
          icon: "🥗"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Decoración y Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Shows y Entretenimiento",
          href: "/shows",
          icon: "🎭"
        }
      ]
    },
    {
      slug: "barra-cafe-premium",
      title: "Barra de Café Premium para Eventos",
      headline: "Baristas profesionales, café de altura y más de 20 bebidas artesanales para tu celebración",
      seoTitle: "Barra de Café Premium para Eventos y Bodas | Bodasesor",
      seoDescription: "Baristas profesionales, café de altura tostado tipo italiano y más de 20 bebidas artesanales para bodas, eventos corporativos y celebraciones especiales.",
      description: [
        "En Bodasesor transformamos cada evento en una experiencia sensorial única con nuestra exclusiva Barra de Café Premium. Ofrecemos bebidas artesanales preparadas al momento por baristas profesionales utilizando café de altura tostado tipo italiano y una amplia variedad de opciones sofisticadas.",
        "Nuestra carta incluye más de 20 bebidas: cafés clásicos (espresso, americano, latte, cappuccino), capuchinos de sabor (vainilla, cajeta, chocolate blanco, moka), frappés y bebidas frías, tés selectos artesanales y chocolate caliente gourmet. Nadie se queda sin su bebida favorita.",
        "Nuestra propuesta combina calidad excepcional, presentación elegante y una experiencia cálida y memorable para todos tus invitados. El servicio incluye baristas profesionales, equipamiento profesional, montaje y desmontaje completo."
      ],
      category: "bebidas",
      categoryLabel: "Barras de Bebidas",
      categoryHref: "/barra-cafe-premium",
      related: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas"
        },
        {
          name: "Barra de Mocteles",
          href: "/barra-mocteles"
        },
        {
          name: "Cocteles y Mixología",
          href: "/cocteles-mixologia"
        },
        {
          name: "Barra de Café Premium",
          href: "/barra-cafe-premium"
        },
        {
          name: "Paletas y Helados",
          href: "/paletas-helados"
        }
      ],
      included: [
        {
          icon: "☕",
          title: "Baristas profesionales",
          desc: "Personal capacitado y certificado con experiencia en eventos de alto nivel."
        },
        {
          icon: "🌱",
          title: "Café de altura premium",
          desc: "Café tostado tipo italiano de origen seleccionado. Granos de la más alta calidad."
        },
        {
          icon: "🥛",
          title: "Más de 20 bebidas artesanales",
          desc: "Espresso, latte, cappuccino, moka, matcha, chai, frappuccino, tés y chocolate."
        },
        {
          icon: "🎨",
          title: "Equipamiento profesional",
          desc: "Máquina espresso profesional, molino, vaporizador y todo el equipo necesario."
        },
        {
          icon: "⏰",
          title: "Servicio continuo",
          desc: "Bebidas preparadas al momento durante toda la duración del evento."
        },
        {
          icon: "✨",
          title: "Montaje y desmontaje",
          desc: "Instalación y retiro del equipo incluidos. Sin preocupaciones para el organizador."
        }
      ],
      varieties: [
        {
          name: "Cafés clásicos",
          desc: "Espresso, americano, latte y cappuccino clásico. La base que todos conocen y aman."
        },
        {
          name: "Capuchinos de sabor",
          desc: "Vainilla, cajeta, moka, chocolate blanco y capuchino especial de temporada."
        },
        {
          name: "Frappés y bebidas frías",
          desc: "Frappuccino, iced latte, cold brew y frappé de temporada. Perfectos para el verano."
        },
        {
          name: "Tés y bebidas especiales",
          desc: "Tés selectos artesanales, chai latte, matcha latte y chocolate caliente gourmet."
        }
      ],
      menuExample: [
        "Experiencia Café Clásico: Espresso · Americano · Latte · Cappuccino clásico · Té artesanal",
        "Experiencia Gourmet: Moka · Cappuccino vainilla · Chocolate caliente · Chai latte · Matcha latte",
        "Experiencia Premium: Frappuccino · Chocolate blanco · Cajeta · Tés selectos · Cappuccino especial",
        "Barra Rústica: Estilo madera natural para bodas campestres y eventos al aire libre",
        "Barra Elegante o Moderna: Tonos oscuros o acabados minimalistas para eventos formales y corporativos"
      ],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Banquetes y Catering",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Barras de Alimentos",
          href: "/barra-crepas",
          icon: "🥗"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Decoración y Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Shows y Entretenimiento",
          href: "/shows",
          icon: "🎭"
        }
      ]
    },
    {
      slug: "paletas-helados",
      title: "Paletas y Helados para Eventos",
      headline: "El dulce final que todos esperaban",
      seoTitle: "Paletas y Helados Artesanales para Eventos | Bodasesor",
      seoDescription: "Servicio de paletas artesanales y helados para bodas, XV años, baby showers y eventos. Carritos decorados, sabores gourmet y personalización del packaging.",
      description: [
        "Las paletas artesanales son el cierre perfecto para cualquier celebración. Nuestro servicio incluye carrito decorado, selección de más de 20 sabores y presentación en nitrógeno líquido para sorprender visualmente a los invitados.",
        "Trabajamos con productores artesanales locales que usan frutas de temporada y no incorporan colorantes ni saborizantes artificiales. Los sabores van desde los clásicos —fresa, limón, tamarindo— hasta creaciones gourmet como paleta de mezcal con sal, hibiscus con champagne y café con crema brûlée.",
        "Las paletas pueden personalizarse con el nombre del evento en el palito y el packaging. Es también un detalle que los invitados se llevan a casa: cada paleta empaquetada con tu logo o el nombre de la boda es un recuerdo único."
      ],
      category: "bebidas",
      categoryLabel: "Barras de Bebidas",
      categoryHref: "/paletas-helados",
      related: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas"
        },
        {
          name: "Barra de Mocteles",
          href: "/barra-mocteles"
        },
        {
          name: "Cocteles y Mixología",
          href: "/cocteles-mixologia"
        },
        {
          name: "Barra de Café Premium",
          href: "/barra-cafe-premium"
        },
        {
          name: "Paletas y Helados",
          href: "/paletas-helados"
        }
      ],
      included: [
        {
          icon: "🧊",
          title: "20+ sabores artesanales",
          desc: "Paletas de agua y de leche en sabores clásicos, tropicales y gourmet."
        },
        {
          icon: "🛒",
          title: "Carrito decorativo",
          desc: "Carrito vintage o moderno personalizado con el nombre de tu evento."
        },
        {
          icon: "🌫️",
          title: "Nitrógeno líquido opcional",
          desc: "Preparación dramática de helados al momento con nitrógeno líquido."
        },
        {
          icon: "🎁",
          title: "Packaging personalizado",
          desc: "Empaque individual con el nombre del evento, fecha o logo. Detalle para llevar."
        },
        {
          icon: "🌿",
          title: "Ingredientes naturales",
          desc: "Sin colorantes artificiales. Solo frutas de temporada y sabores naturales."
        },
        {
          icon: "🍦",
          title: "Opción de helados",
          desc: "Helado artesanal servido en cono o vasito como complemento."
        }
      ],
      varieties: [
        {
          name: "Paletas de agua",
          desc: "Fresa, mango, tamarindo, limón, sandía y hibiscus. Los clásicos sin falla."
        },
        {
          name: "Paletas de leche",
          desc: "Coco, cajeta, nuez, chocolate suizo y cookies & cream."
        },
        {
          name: "Paletas gourmet",
          desc: "Mezcal y sal, hibiscus con champagne, café con crema brûlée y matcha."
        },
        {
          name: "Nitrógeno al momento",
          desc: "Helado preparado frente a los invitados con nitrógeno líquido. El espectáculo."
        }
      ],
      menuExample: [
        "Clásica: Fresa con leche condensada y semillas de chía",
        "Tropical: Mango manila con chile piquín y sal de gusano",
        "Gourmet: Mezcal con sal de gusano y notas de agave ahumado",
        "Premium: Chocolate belga 70% con frambuesa liofilizada",
        "Especial: Hibiscus con champagne y pétalos comestibles"
      ],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Banquetes y Catering",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Barras de Alimentos",
          href: "/barra-crepas",
          icon: "🥗"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Decoración y Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Shows y Entretenimiento",
          href: "/shows",
          icon: "🎭"
        }
      ]
    },
    {
      slug: "mesa-dulces",
      title: "Mesa de Dulces para Eventos",
      headline: "El rincón más dulce y fotografiado de tu celebración",
      seoTitle: "Mesa de Dulces para Bodas y Eventos | Bodasesor",
      seoDescription: "Mesas de dulces decoradas para bodas, XV años, baby showers y fiestas. Diseño personalizado, dulces artesanales y presentación que impresiona.",
      description: [
        "La mesa de dulces es el corazón visual de cualquier celebración. No es solo un conjunto de golosinas: es una instalación decorativa temática que combina colores, alturas, texturas y dulces artesanales en una composición digna de revista.",
        "Nuestro equipo de diseño trabaja contigo para crear la mesa que refleje perfectamente el estilo de tu evento: romántica, moderna, vintage, tropical o temática personalizada. Cada elemento —desde el letrero hasta la jarra de los dulces— está pensado para el conjunto.",
        "Trabajamos con dulcerías artesanales seleccionadas que garantizan producto de alta calidad: chocolates belgas, malvaviscos artesanales, caramelos sin conservadores y dulces mexicanos de las mejores marcas regionales."
      ],
      category: "mesas-personalizadas",
      categoryLabel: "Mesas Personalizadas",
      categoryHref: "/mesa-dulces",
      related: [
        {
          name: "Mesa de Dulces",
          href: "/mesa-dulces"
        },
        {
          name: "Mesa de Postres",
          href: "/mesa-postres"
        },
        {
          name: "Mesa de Quesos",
          href: "/mesa-quesos"
        },
        {
          name: "Cupcakes Gourmet",
          href: "/cupcakes-gourmet"
        },
        {
          name: "Carrito de Snacks",
          href: "/carrito-snacks"
        }
      ],
      included: [
        {
          icon: "🍭",
          title: "Dulces artesanales",
          desc: "Selección premium: chocolates, malvaviscos, caramelos, gomitas y dulces regionales."
        },
        {
          icon: "🎨",
          title: "Diseño temático",
          desc: "Mesa diseñada a tu medida: colores, alturas, materiales y elementos decorativos."
        },
        {
          icon: "🏺",
          title: "Jarras y recipientes decorativos",
          desc: "Jarras de vidrio, fuentes, portarretratos y estructuras para exhibir los dulces."
        },
        {
          icon: "🪧",
          title: "Letrero personalizado",
          desc: "Letrero con el nombre del evento, frase especial o logo. Incluido en todos los paquetes."
        },
        {
          icon: "🎁",
          title: "Bolsas para llevar",
          desc: "Bolsitas personalizadas para que los invitados lleven sus dulces favoritos."
        },
        {
          icon: "👩‍🎨",
          title: "Asesoría de diseño",
          desc: "Reunión previa para definir paleta de colores, temática y selección de dulces."
        }
      ],
      varieties: [
        {
          name: "Mesa romántica",
          desc: "Tonos rosados, rojos y dorados. Chocolates, rosas de azúcar y macarons."
        },
        {
          name: "Mesa moderna",
          desc: "Blanco y negro con detalles metálicos. Minimalista y sofisticada."
        },
        {
          name: "Mesa infantil",
          desc: "Colores brillantes, gominolas gigantes, piruletas y dulces de caricaturas."
        },
        {
          name: "Mesa temática",
          desc: "Adaptada a cualquier temática: jardín, playa, París, vintage o mexicana."
        }
      ],
      menuExample: [
        "Chocolates: Trufas de chocolate belga en 3 sabores + mendiants de frutos secos",
        "Caramelos: Paletas de caramelo artesanal + caramelos duros de frutas",
        "Golosinas: Malvaviscos de vainilla y fresa + gominolas de importación",
        "Dulce mexicano: Cajeta, jamoncillo, alegrías y pulparindo gourmet",
        "Detalle: Macarons franceses en los colores del evento"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Mesa de Postres",
          href: "/mesa-postres",
          icon: "🍰"
        },
        {
          name: "Mesa de Quesos",
          href: "/mesa-quesos",
          icon: "🧀"
        },
        {
          name: "Cupcakes Gourmet",
          href: "/cupcakes-gourmet",
          icon: "🧁"
        },
        {
          name: "Barras de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Canapés Premium",
          href: "/canapes-premium",
          icon: "🫙"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        }
      ]
    },
    {
      slug: "mesa-postres",
      title: "Mesa de Postres para Eventos",
      headline: "La clausura perfecta para cualquier celebración",
      seoTitle: "Mesa de Postres para Bodas y Eventos | Bodasesor",
      seoDescription: "Mesas de postres artesanales para bodas, XV años y eventos. Pasteles, mousses, tartaletas, macarons y postres de autor. Presentación elegante e impresionante.",
      description: [
        "La mesa de postres es el gran final gastronómico de tu evento. A diferencia de la mesa de dulces, aquí el protagonismo es de los postres elaborados: pasteles de múltiples pisos, mousses, panna cotta, tartaletas de frutas, éclairs y la selección de macarons más elegante que hayas visto.",
        "Nuestros pasteleros artesanales preparan todo en las 24 horas previas al evento para garantizar frescura máxima. El montaje incluye estands de diferentes alturas, iluminación estratégica y decoración floral que hace de la mesa una obra de arte comestible.",
        "Trabajamos según las restricciones de tus invitados: opciones sin gluten, sin azúcar añadida, veganas y sin lácteos. Todo sin sacrificar sabor ni presentación."
      ],
      category: "mesas-personalizadas",
      categoryLabel: "Mesas Personalizadas",
      categoryHref: "/mesa-postres",
      related: [
        {
          name: "Mesa de Dulces",
          href: "/mesa-dulces"
        },
        {
          name: "Mesa de Postres",
          href: "/mesa-postres"
        },
        {
          name: "Mesa de Quesos",
          href: "/mesa-quesos"
        },
        {
          name: "Cupcakes Gourmet",
          href: "/cupcakes-gourmet"
        },
        {
          name: "Carrito de Snacks",
          href: "/carrito-snacks"
        }
      ],
      included: [
        {
          icon: "🎂",
          title: "Pastel principal",
          desc: "Pastel de pisos personalizado en sabores y decoración a elegir."
        },
        {
          icon: "🍮",
          title: "6+ variedades de postres",
          desc: "Mousse, panna cotta, tartaletas, éclairs, mini pavlovas y más."
        },
        {
          icon: "🌸",
          title: "Decoración floral",
          desc: "Flores comestibles y no comestibles para decorar la mesa y los postres."
        },
        {
          icon: "🏗️",
          title: "Estands y arquitectura",
          desc: "Estructuras de metal, madera o acrílico para crear alturas y perspectiva."
        },
        {
          icon: "🧁",
          title: "Macarons de autor",
          desc: "Mínimo 3 sabores de macarons. El detalle más fotografiado de la mesa."
        },
        {
          icon: "🍽️",
          title: "Platos y cubiertos elegantes",
          desc: "Mini platos de porcelana y tenedores de postre para servirse."
        }
      ],
      varieties: [
        {
          name: "Pasteles Signature",
          desc: "Cappuccino Cheesecake, Ópera, Brownie, Queso con Blueberry, Chocoplátano, Caprice y Sacher."
        },
        {
          name: "Tartas artesanales",
          desc: "Manzana, Limón, Linzert, Frambuesa con Chocolate Blanco, Pera con Almendra y Maracuyá."
        },
        {
          name: "Postres tradicionales",
          desc: "Pavlova con frutos rojos, Mousses de mamey y chocolate, Panna cotta y mini cheesecakes."
        },
        {
          name: "Mesa clásica francesa",
          desc: "Macarons de autor, éclairs, tartaletas y petit fours. El glamour de la pâtisserie."
        }
      ],
      menuExample: [
        "Pastel Signature: Cappuccino Cheesecake o Ópera con ganache de chocolate",
        "Tarta: Frambuesa con Chocolate Blanco o Linzert de almendra",
        "Tradicional: Pavlova con frutos rojos y crema chantilly",
        "Cremoso: Mousse de mamey o chocolate belga en vasito individual",
        "Detalle: Macarons de sabores de temporada en torre de presentación"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Mesa de Dulces",
          href: "/mesa-dulces",
          icon: "🍭"
        },
        {
          name: "Mesa de Quesos",
          href: "/mesa-quesos",
          icon: "🧀"
        },
        {
          name: "Cupcakes Gourmet",
          href: "/cupcakes-gourmet",
          icon: "🧁"
        },
        {
          name: "Barra de Café",
          href: "/barra-cafe-premium",
          icon: "☕"
        },
        {
          name: "Repostería",
          href: "/reposteria",
          icon: "🎂"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        }
      ]
    },
    {
      slug: "mesa-quesos",
      title: "Mesa de Quesos para Eventos",
      headline: "La madurez perfecta en cada corte, para paladares exigentes",
      seoTitle: "Mesa de Quesos Gourmet para Eventos | Bodasesor",
      seoDescription: "Mesas de quesos artesanales y de importación para bodas, cenas y eventos corporativos. Tablas de quesos, embutidos, mermeladas y panes especiales.",
      description: [
        "La mesa de quesos es el centro de atención del cóctel de cualquier evento de alto nivel. Una cuidada selección de quesos artesanales nacionales y de importación, acompañados de embutidos, mermeladas artesanales, nueces y panes especiales, crea una experiencia gastronómica sofisticada.",
        "Nuestro afinador de quesos selecciona personalmente cada pieza según la temporada y los sabores disponibles. Combinamos quesos de diferente intensidad: frescos, semicurados, curados y añejos, para ofrecer un recorrido completo por las texturas y sabores del mundo del queso.",
        "El montaje en tablas de madera, piedra o pizarra crea una presentación visual que fascina y tienta. Cada mesa incluye etiquetas descriptivas de cada queso y una guía de maridaje para que los invitados disfruten al máximo."
      ],
      category: "mesas-personalizadas",
      categoryLabel: "Mesas Personalizadas",
      categoryHref: "/mesa-quesos",
      related: [
        {
          name: "Mesa de Dulces",
          href: "/mesa-dulces"
        },
        {
          name: "Mesa de Postres",
          href: "/mesa-postres"
        },
        {
          name: "Mesa de Quesos",
          href: "/mesa-quesos"
        },
        {
          name: "Cupcakes Gourmet",
          href: "/cupcakes-gourmet"
        },
        {
          name: "Carrito de Snacks",
          href: "/carrito-snacks"
        }
      ],
      included: [
        {
          icon: "🧀",
          title: "Selección de 11 quesos",
          desc: "Gruyere suizo, Manchego español, Gouda holandés, Camembert, Brie, Provolone, Queso de cabra, Oaxaca y 3 quesos premium de temporada."
        },
        {
          icon: "🥩",
          title: "Carnes frías y embutidos",
          desc: "Salami, chorizo español, jamón serrano, jamón de pierna y jamón de pavo en láminas finas."
        },
        {
          icon: "🍯",
          title: "Complementos dulces",
          desc: "Dulce de membrillo, uvas frescas, higos y mermeladas artesanales de temporada."
        },
        {
          icon: "🥜",
          title: "Frutos secos",
          desc: "Nueces pecanas, almendras tostadas, pistaches y semillas variadas."
        },
        {
          icon: "🍞",
          title: "Panes artesanales",
          desc: "Baguette recién horneada, crackers de semillas, pan de oliva y pan de nuez."
        },
        {
          icon: "📋",
          title: "Guía de maridaje",
          desc: "Tarjetas con nombre, origen, notas de sabor y maridaje sugerido para cada queso."
        }
      ],
      varieties: [
        {
          name: "Quesos europeos",
          desc: "Gruyere suizo, Manchego español, Gouda holandés, Camembert y Brie franceses."
        },
        {
          name: "Quesos suaves",
          desc: "Provolone italiano, Queso de cabra fresco y Brie. Ideales para empezar la degustación."
        },
        {
          name: "Quesos mexicanos",
          desc: "Queso Oaxaca artesanal, Manchego nacional, Cotija y Chihuahua de productores locales."
        },
        {
          name: "Mesa completa",
          desc: "Los 11 quesos de la selección + embutidos + complementos + panes. La experiencia total."
        }
      ],
      menuExample: [
        "Fresco: Brie francés con mermelada de higo y nueces sobre pan de oliva",
        "Semicurado: Manchego español con dulce de membrillo y uvas frescas",
        "Curado: Gruyere suizo con almendras tostadas y mostaza de Dijon",
        "Mexicano: Queso Oaxaca con jalapeño encurtido y salsa de chile de árbol",
        "Embutido: Jamón serrano y chorizo español con crackers de semillas"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Canapés Premium",
          href: "/canapes-premium",
          icon: "🫙"
        },
        {
          name: "Mesa de Postres",
          href: "/mesa-postres",
          icon: "🍰"
        },
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mixología",
          href: "/cocteles-mixologia",
          icon: "🍸"
        },
        {
          name: "Mesa de Dulces",
          href: "/mesa-dulces",
          icon: "🍭"
        },
        {
          name: "Bocadillos",
          href: "/bocadillos",
          icon: "🥪"
        }
      ]
    },
    {
      slug: "cupcakes-gourmet",
      title: "Cupcakes Gourmet para Eventos",
      headline: "El detalle dulce que enamora a los invitados",
      seoTitle: "Cupcakes Gourmet para Bodas y Eventos | Bodasesor",
      seoDescription: "Cupcakes artesanales gourmet para bodas, XV años, baby showers y corporativos. Decoración personalizada, sabores únicos y presentación de pastelería de lujo.",
      description: [
        "Los cupcakes gourmet de Bodasesor no son cupcakes ordinarios. Son pequeñas obras de arte que combinan masa esponjosa, frosting de mantequilla suiza y decoración en fondant o buttercream que puede replicar el logo de tu empresa, el diseño de tu vestido o cualquier elemento especial de tu evento.",
        "Cada cupcake es horneado en las 24 horas previas al evento para garantizar frescura. El frosting se prepara artesanalmente con mantequilla de alta calidad y aromatizado según el sabor elegido: vainilla de Tahití, café de especialidad, limón siciliano y más.",
        "Pueden servirse como parte de la mesa de postres, como detalle individual empaquetado para cada invitado, o en torre de cupcakes como alternativa al pastel tradicional. La personalización no tiene límite."
      ],
      category: "mesas-personalizadas",
      categoryLabel: "Mesas Personalizadas",
      categoryHref: "/cupcakes-gourmet",
      related: [
        {
          name: "Mesa de Dulces",
          href: "/mesa-dulces"
        },
        {
          name: "Mesa de Postres",
          href: "/mesa-postres"
        },
        {
          name: "Mesa de Quesos",
          href: "/mesa-quesos"
        },
        {
          name: "Cupcakes Gourmet",
          href: "/cupcakes-gourmet"
        },
        {
          name: "Carrito de Snacks",
          href: "/carrito-snacks"
        }
      ],
      included: [
        {
          icon: "🧁",
          title: "Masa artesanal premium",
          desc: "Harina de trigo de primera, mantequilla sin sal europea y huevos de rancho."
        },
        {
          icon: "🎨",
          title: "Decoración personalizada",
          desc: "Diseño en fondant o buttercream replicando la temática del evento."
        },
        {
          icon: "🌿",
          title: "Sabores de autor",
          desc: "Vainilla de Tahití, chocolate belga 70%, limón siciliano, café y matcha."
        },
        {
          icon: "🎁",
          title: "Empaque individual",
          desc: "Caja individual con cinta personalizada y tarjeta del evento."
        },
        {
          icon: "🏗️",
          title: "Torre de cupcakes",
          desc: "Estructura para presentar los cupcakes como alternativa visual al pastel."
        },
        {
          icon: "🚫",
          title: "Opciones especiales",
          desc: "Sin gluten, sin azúcar y veganos. Sin sacrificar sabor ni calidad."
        }
      ],
      varieties: [
        {
          name: "Clásico Red Velvet",
          desc: "Terciopelo rojo con frosting de queso crema. El rey de los cupcakes."
        },
        {
          name: "Chocolate y frambuesa",
          desc: "Chocolate belga 70% con ganache de frambuesa y frambuesas frescas."
        },
        {
          name: "Limón y lavanda",
          desc: "Masa de limón siciliano con buttercream de lavanda y zest de limón."
        },
        {
          name: "Personalizado del evento",
          desc: "Diseño único que refleja los colores, logo o temática de tu celebración."
        }
      ],
      menuExample: [
        "Favorito: Red Velvet con frosting de queso crema y glasé de frambuesa",
        "Chocolate: Brownie cupcake con ganache de chocolate 70% y sal",
        "Fresco: Limón con buttercream de limón y flor de lavanda",
        "Café: Espresso cupcake con frosting de moka y granos de café",
        "Premium: Vainilla de Tahití con flores comestibles y hoja de oro"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Mesa de Dulces",
          href: "/mesa-dulces",
          icon: "🍭"
        },
        {
          name: "Mesa de Postres",
          href: "/mesa-postres",
          icon: "🍰"
        },
        {
          name: "Repostería",
          href: "/reposteria",
          icon: "🎂"
        },
        {
          name: "Barra de Café",
          href: "/barra-cafe-premium",
          icon: "☕"
        },
        {
          name: "Mesa de Quesos",
          href: "/mesa-quesos",
          icon: "🧀"
        },
        {
          name: "Canapés Premium",
          href: "/canapes-premium",
          icon: "🫙"
        }
      ]
    },
    {
      slug: "mesas-sillas",
      title: "Renta de Mesas y Sillas para Eventos",
      headline: "El mobiliario que transforma cualquier espacio en un evento memorable",
      seoTitle: "Renta de Mesas y Sillas para Eventos en México | Bodasesor",
      seoDescription: "Renta de mesas y sillas para eventos, bodas, XV años y corporativos. Más de 20 modelos de sillas y mesas en múltiples estilos. Entrega, montaje y retiro incluidos.",
      description: [
        "La elección correcta de mesas y sillas puede transformar radicalmente la percepción de cualquier espacio. En Bodasesor contamos con el catálogo más amplio de mobiliario para eventos de México: desde la clásica silla Tiffany hasta diseños de autor que marcan tendencia.",
        "Ofrecemos más de 20 modelos de sillas y 10 tipos de mesas para adaptarnos a cualquier estilo: bodas románticas, eventos corporativos modernos, fiestas temáticas o reuniones íntimas. Todo el mobiliario es mantenido en estado perfecto entre cada evento.",
        "El servicio incluye traslado, armado, configuración según tu plano de mesa y retiro al finalizar. Nuestro equipo de instalación trabaja con rapidez y discreción para tener todo listo antes de que lleguen tus invitados."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Salas y Periqueras",
          href: "/salas-periqueras"
        },
        {
          name: "Barras",
          href: "/barras"
        },
        {
          name: "Combinaciones",
          href: "/combinaciones-mesas-sillas"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas"
        }
      ],
      included: [
        {
          icon: "🚚",
          title: "Entrega y retiro",
          desc: "Trasladamos el mobiliario al venue, lo armamos y lo retiramos al finalizar."
        },
        {
          icon: "📐",
          title: "Configuración de plano",
          desc: "Seguimos el plano de tu evento para configurar mesas y sillas perfectamente."
        },
        {
          icon: "🧹",
          title: "Limpieza previa",
          desc: "Todo el mobiliario llega limpio, sin polvo, sin manchas y en estado impecable."
        },
        {
          icon: "🔧",
          title: "Soporte en evento",
          desc: "Técnico disponible durante el evento para cualquier ajuste de último momento."
        },
        {
          icon: "📦",
          title: "Inventario garantizado",
          desc: "Garantizamos el número exacto de piezas solicitadas. Sin sorpresas."
        },
        {
          icon: "🤝",
          title: "Coordinación con venue",
          desc: "Coordinamos directamente con el salón o espacio para tiempos de montaje."
        }
      ],
      varieties: [
        {
          name: "Paquete básico",
          desc: "Sillas Tiffany o Versalles con mesa redonda de 1.8m. El estándar para bodas."
        },
        {
          name: "Paquete elegante",
          desc: "Sillas Crossback o Ghost con mesas de madera. Para eventos con personalidad."
        },
        {
          name: "Paquete corporativo",
          desc: "Sillas ergonómicas con mesas rectangulares. Funcional y profesional."
        },
        {
          name: "Paquete personalizado",
          desc: "Combinación libre de modelos según tu visión. El catálogo completo a disposición."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "✨",
          title: "Mobiliario premium",
          desc: "Contamos con las últimas tendencias en mobiliario para eventos: diseños modernos, clásicos y de autor."
        },
        {
          icon: "🚚",
          title: "Entrega y montaje",
          desc: "Nos encargamos del traslado, instalación y retiro del mobiliario. Tú solo disfrutas el evento."
        },
        {
          icon: "📐",
          title: "Personalización total",
          desc: "Armamos la configuración exacta que necesitas: número de mesas, distribución y combinación de estilos."
        }
      ],
      integralServices: [
        {
          name: "Banquetes y Catering",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas",
          icon: "🎵"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        }
      ]
    },
    {
      slug: "salas-periqueras",
      title: "Salas y Periqueras para Eventos",
      headline: "Espacios lounge que invitan a la conversación",
      seoTitle: "Renta de Salas y Periqueras para Eventos | Bodasesor",
      seoDescription: "Renta de salas lounge y periqueras para eventos, bodas y corporativos. Mobiliario moderno y elegante para crear zonas de descanso y socialización en tu evento.",
      description: [
        "Las salas lounge y periqueras son el elemento diferenciador en eventos modernos. Crean zonas de descanso y conversación que rompen con el formato tradicional de mesa y silla, invitando a los invitados a moverse, socializar y disfrutar de una experiencia más dinámica.",
        "Contamos con salas completas en estilos chesterfield, vintage, modern lounge, led y rústico. Cada sala incluye sofá, sillones, mesa de centro y decoración coordinada. Las periqueras son perfectas para eventos más informales o como complemento del área de cócteles.",
        "La combinación de salas lounge con periqueras da a tu evento una dimensión de lounge bar de lujo que hace que los invitados no quieran irse. Ideal para bodas, lanzamientos de producto y eventos corporativos de networking."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/salas-periqueras",
      related: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas"
        },
        {
          name: "Salas y Periqueras",
          href: "/salas-periqueras"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo"
        },
        {
          name: "Colgantes Premium",
          href: "/colgantes-premium"
        }
      ],
      included: [
        {
          icon: "🛋️",
          title: "Sofá y sillones",
          desc: "Juego completo de sala con sofá de 3 plazas, 2 sillones y mesa de centro."
        },
        {
          icon: "💡",
          title: "Iluminación lounge",
          desc: "Lámparas de pie y de mesa coordinadas para crear el ambiente correcto."
        },
        {
          icon: "🪑",
          title: "Periqueras y taburetes",
          desc: "Mesas altas tipo bar con 2 o 4 taburetes según el modelo."
        },
        {
          icon: "🎨",
          title: "Paleta de colores",
          desc: "Múltiples opciones de color y acabado para coordinar con la decoración."
        },
        {
          icon: "🚚",
          title: "Entrega y montaje",
          desc: "Trasladamos y armamos todo en el venue. Retiro al finalizar."
        },
        {
          icon: "📐",
          title: "Asesoría de distribución",
          desc: "Sugerimos la mejor disposición de salas y periqueras según tu espacio."
        }
      ],
      varieties: [
        {
          name: "Sala Chesterfield",
          desc: "Clásica y elegante, en terciopelo verde o azul. Ideal para bodas."
        },
        {
          name: "Sala Vintage",
          desc: "Madera envejecida y tapizado en tonos tierra. Calidez y personalidad."
        },
        {
          name: "Sala LED",
          desc: "Con iluminación LED integrada. Impactante para fiestas nocturnas."
        },
        {
          name: "Periquera Industrial",
          desc: "Metal y madera reciclada. Moderna y descomplicada para cualquier espacio."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "✨",
          title: "Mobiliario premium",
          desc: "Contamos con las últimas tendencias en mobiliario para eventos: diseños modernos, clásicos y de autor."
        },
        {
          icon: "🚚",
          title: "Entrega y montaje",
          desc: "Nos encargamos del traslado, instalación y retiro del mobiliario. Tú solo disfrutas el evento."
        },
        {
          icon: "📐",
          title: "Personalización total",
          desc: "Armamos la configuración exacta que necesitas: número de mesas, distribución y combinación de estilos."
        }
      ],
      integralServices: [
        {
          name: "Banquetes y Catering",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas",
          icon: "🎵"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        }
      ]
    },
    {
      slug: "pistas-tarimas",
      title: "Pistas de Baile y Tarimas para Eventos",
      headline: "La pista que todos quieren estrenar",
      seoTitle: "Renta de Pistas de Baile y Tarimas para Eventos | Bodasesor",
      seoDescription: "Renta de pistas de baile y tarimas para eventos, bodas y XV años. Madera, LED, iluminada y espejada. Instalación profesional y tamaños personalizados.",
      description: [
        "La pista de baile es el corazón de toda fiesta. Una buena pista marca la diferencia entre un evento donde todos se quedan sentados y uno donde el último en irse es el más cansado. Contamos con 6 modelos diferentes para cada estilo de evento.",
        "Desde la clásica pista de madera de parquet hasta la espectacular pista LED con iluminación programable, pasando por la pista espejo que duplica visualmente el espacio. Fabricamos y rentamos en tamaños desde 4x4m hasta 12x12m según tus necesidades.",
        "Nuestras tarimas son la solución perfecta para elevar al DJ, la banda, el maestro de ceremonias o la mesa de honor. Construidas en madera sólida con acabados que combinan con cualquier decoración."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/pistas-tarimas",
      related: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas"
        },
        {
          name: "Salas y Periqueras",
          href: "/salas-periqueras"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo"
        },
        {
          name: "Colgantes Premium",
          href: "/colgantes-premium"
        }
      ],
      included: [
        {
          icon: "🔧",
          title: "Instalación profesional",
          desc: "Equipo especializado en armado y desmontaje de pistas. Hasta 4 horas de armado."
        },
        {
          icon: "📏",
          title: "Tamaños personalizados",
          desc: "Modular desde 4x4m hasta 12x12m. Configuración adaptada a tu espacio."
        },
        {
          icon: "💡",
          title: "Iluminación integrada",
          desc: "En los modelos LED: iluminación programable con miles de combinaciones."
        },
        {
          icon: "🛡️",
          title: "Bordes y esquineros",
          desc: "Bordes de seguridad en todos los modelos para evitar caídas."
        },
        {
          icon: "🚚",
          title: "Traslado incluido",
          desc: "Transporte al venue, instalación y retiro. Sin cargos adicionales."
        },
        {
          icon: "🎛️",
          title: "Controlador LED",
          desc: "En modelos iluminados: controlador inalámbrico para cambiar efectos."
        }
      ],
      varieties: [
        {
          name: "Pista de madera",
          desc: "Parquet de madera clásico. Elegante y atemporal para cualquier evento."
        },
        {
          name: "Pista iluminada",
          desc: "Módulos iluminados desde abajo con luz blanca cálida. Efecto dramático."
        },
        {
          name: "Pista LED",
          desc: "Programable con miles de colores. Sincronizable con la música del evento."
        },
        {
          name: "Tarima DJ/Banda",
          desc: "Plataforma elevada de madera con faldón negro. Para 1 a 10 músicos."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "✨",
          title: "Mobiliario premium",
          desc: "Contamos con las últimas tendencias en mobiliario para eventos: diseños modernos, clásicos y de autor."
        },
        {
          icon: "🚚",
          title: "Entrega y montaje",
          desc: "Nos encargamos del traslado, instalación y retiro del mobiliario. Tú solo disfrutas el evento."
        },
        {
          icon: "📐",
          title: "Personalización total",
          desc: "Armamos la configuración exacta que necesitas: número de mesas, distribución y combinación de estilos."
        }
      ],
      integralServices: [
        {
          name: "Salas y Periqueras",
          href: "/salas-periqueras",
          icon: "🛋️"
        },
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        },
        {
          name: "Shows y Entretenimiento",
          href: "/shows",
          icon: "🎭"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        }
      ]
    },
    {
      slug: "vajillas-estilo",
      title: "Vajillas y Estilo para Eventos",
      headline: "La vajilla que eleva cada platillo a obra de arte",
      seoTitle: "Renta de Vajillas Elegantes para Eventos | Bodasesor",
      seoDescription: "Renta de vajillas, cristalería y cubiertos para bodas y eventos. Porcelana fina, copas de cristal, charolas y centros de mesa. Presentación impecable.",
      description: [
        "La vajilla es el marco donde se presenta el arte culinario de tu evento. Una vajilla de porcelana fina, con cristalería de calidad y cubiertos brillantes, transforma cada platillo en una experiencia visual que anticipa el sabor.",
        "Contamos con servicio completo de vajillería para eventos: platos base, platos de presentación, platos de postre, copas de vino y agua, flautas de champagne, cubiertos de acero inoxidable, charolas y todos los elementos de mesa necesarios.",
        "Todo el servicio llega perfectamente lavado, pulido y sin manchas. Nuestro equipo se encarga del conteo, traslado, entrega y retiro, así como el lavado posterior al evento."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/vajillas-estilo",
      related: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas"
        },
        {
          name: "Salas y Periqueras",
          href: "/salas-periqueras"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo"
        },
        {
          name: "Colgantes Premium",
          href: "/colgantes-premium"
        }
      ],
      included: [
        {
          icon: "🍽️",
          title: "Servicio completo de mesa",
          desc: "Plato base, plato de presentación, hondo, tendido, postre y pan."
        },
        {
          icon: "🥂",
          title: "Cristalería de calidad",
          desc: "Copa de agua, de vino tinto, blanco y flauta de champagne."
        },
        {
          icon: "🥄",
          title: "Cubiertos de acero",
          desc: "Tenedor, cuchillo, cuchara, tenedor de postre y cucharita de café."
        },
        {
          icon: "🧺",
          title: "Servilleteros y charolas",
          desc: "Servilleteros metálicos, charolas de servicio y porta-menús."
        },
        {
          icon: "🫙",
          title: "Saleros y pimenteros",
          desc: "Juegos de sal y pimienta para cada mesa o sección."
        },
        {
          icon: "🌹",
          title: "Coordinación con catering",
          desc: "Coordinamos directamente con tu proveedor de catering para el montaje."
        }
      ],
      varieties: [
        {
          name: "Vajilla blanca clásica",
          desc: "Porcelana blanca pura. Atemporal, elegante y versátil."
        },
        {
          name: "Vajilla dorada",
          desc: "Bordes dorados en porcelana blanca. Glamour para bodas y galas."
        },
        {
          name: "Vajilla rústica",
          desc: "Cerámica artesanal en tonos tierra. Perfecta para eventos campestres."
        },
        {
          name: "Vajilla moderna",
          desc: "Diseño minimalista en colores neutros: gris, negro y blanco mate."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "✨",
          title: "Mobiliario premium",
          desc: "Contamos con las últimas tendencias en mobiliario para eventos: diseños modernos, clásicos y de autor."
        },
        {
          icon: "🚚",
          title: "Entrega y montaje",
          desc: "Nos encargamos del traslado, instalación y retiro del mobiliario. Tú solo disfrutas el evento."
        },
        {
          icon: "📐",
          title: "Personalización total",
          desc: "Armamos la configuración exacta que necesitas: número de mesas, distribución y combinación de estilos."
        }
      ],
      integralServices: [
        {
          name: "Banquetes y Catering",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas",
          icon: "🎵"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        }
      ]
    },
    {
      slug: "colgantes-premium",
      title: "Colgantes Premium para Eventos",
      headline: "La decoración que crea atmósferas únicas desde el techo",
      seoTitle: "Colgantes y Decoración Aérea para Eventos | Bodasesor",
      seoDescription: "Colgantes y decoración aérea premium para bodas y eventos. Lámparas, globos, flores suspendidas, luces y telas para crear ambientes únicos e impresionantes.",
      description: [
        "La decoración aérea es el elemento que transforma un espacio ordinario en un escenario mágico. Nuestros colgantes premium van desde lámparas de cristal y araña hasta instalaciones de flores suspendidas, telones de luces y cortinas de tela que crean atmósferas únicas.",
        "Cada instalación es diseñada y ejecutada por nuestro equipo de artistas decoradores, que evalúa el espacio, la temática y el presupuesto para proponer la solución que maximice el impacto visual. Trabajamos en alturas de hasta 8 metros.",
        "Los colgantes son especialmente impresionantes en la fotografía y el video: crean un fondo visualmente rico que hace que cada foto del evento sea extraordinaria. Invertir en decoración aérea multiplica el valor de cada imagen."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/colgantes-premium",
      related: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas"
        },
        {
          name: "Salas y Periqueras",
          href: "/salas-periqueras"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo"
        },
        {
          name: "Colgantes Premium",
          href: "/colgantes-premium"
        }
      ],
      included: [
        {
          icon: "💫",
          title: "Diseño personalizado",
          desc: "Propuesta visual adaptada a la temática, colores y espacio de tu evento."
        },
        {
          icon: "🔧",
          title: "Instalación profesional",
          desc: "Equipo especializado en trabajo en altura con arneses certificados."
        },
        {
          icon: "💡",
          title: "Iluminación integrada",
          desc: "Muchos de nuestros colgantes incluyen iluminación LED integrada o guirnaldas."
        },
        {
          icon: "🌸",
          title: "Flores y botánica",
          desc: "Instalaciones florales suspendidas con flores naturales o artificiales premium."
        },
        {
          icon: "🪡",
          title: "Telas y velos",
          desc: "Cortinas de gasa, tul, seda o terciopelo. Cada tejido crea un efecto diferente."
        },
        {
          icon: "🚚",
          title: "Montaje y desmontaje",
          desc: "Llegamos con anticipación y retiramos todo al finalizar el evento."
        }
      ],
      varieties: [
        {
          name: "Araña de cristal",
          desc: "Lámpara de cristal o acrílico para el punto focal del salón."
        },
        {
          name: "Guirnaldas de luz",
          desc: "Cientos de focos cálidos creando un cielo de luces sobre los invitados."
        },
        {
          name: "Flores suspendidas",
          desc: "Instalación botánica en el techo: flores, hojas y ramas que sorprenden."
        },
        {
          name: "Velos y telas",
          desc: "Cortinas de gasa o tul que crean paredes y techos de tela. Mágico."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "✨",
          title: "Mobiliario premium",
          desc: "Contamos con las últimas tendencias en mobiliario para eventos: diseños modernos, clásicos y de autor."
        },
        {
          icon: "🚚",
          title: "Entrega y montaje",
          desc: "Nos encargamos del traslado, instalación y retiro del mobiliario. Tú solo disfrutas el evento."
        },
        {
          icon: "📐",
          title: "Personalización total",
          desc: "Armamos la configuración exacta que necesitas: número de mesas, distribución y combinación de estilos."
        }
      ],
      integralServices: [
        {
          name: "Banquetes y Catering",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas",
          icon: "🎵"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        }
      ]
    },
    {
      slug: "silla-tiffany",
      title: "Silla Tiffany para Eventos",
      headline: "El ícono atemporal de la elegancia en eventos",
      seoTitle: "Renta de Silla Tiffany para Eventos y Bodas | Bodasesor",
      seoDescription: "Renta de silla Tiffany para eventos, bodas y XV años. Diseño clásico en acrílico transparente o coloreado. La silla más elegante y fotogénica para celebraciones.",
      description: [
        "La Silla Tiffany es la silla más icónica de los eventos. Su diseño en resina transparente permite que la decoración del evento sea visible a través de ella, creando una sensación de espacio y luminosidad única. Es elegante, ligera y extremadamente fotogénica.",
        "Disponible en transparente puro, rosa, azul, verde y dorado. Cada pieza es mantenida en perfecto estado, sin rayaduras ni manchas, para garantizar que luzca impecable en cada evento.",
        "Perfecta para bodas románticas, XV años, baby showers y cualquier evento donde se busque un toque de glamour y modernidad que complementa cualquier tipo de decoración."
      ],
      category: "sillas",
      categoryLabel: "Catálogo de Sillas",
      categoryHref: "/sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Cabos",
          href: "/sillas/cabos"
        },
        {
          name: "Silla Caroline",
          href: "/sillas/caroline"
        },
        {
          name: "Silla María",
          href: "/sillas/maria"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        },
        {
          name: "Silla Avant Garde",
          href: "/sillas/avant-garde"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Mariantonieta",
          href: "/sillas/mariantonieta"
        },
        {
          name: "Sillón de Novios",
          href: "/sillas/sillon-novios"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Gamma",
          href: "/sillas/gamma"
        },
        {
          name: "Silla Tiffany Infantil",
          href: "/sillas/tiffany-infantil"
        }
      ],
      included: [
        {
          icon: "✨",
          title: "Estado impecable",
          desc: "Cada silla revisada y pulida antes de entregarse. Sin rayaduras ni manchas."
        },
        {
          icon: "🎨",
          title: "Múltiples colores",
          desc: "Transparente, rosa, azul cielo, verde menta y dorado. Elige el tuyo."
        },
        {
          icon: "💪",
          title: "Resistencia garantizada",
          desc: "Resina de alta densidad. Soporta hasta 120kg sin deformarse."
        },
        {
          icon: "🚚",
          title: "Entrega y retiro",
          desc: "Traslado al venue, posicionamiento y retiro al finalizar el evento."
        },
        {
          icon: "🪑",
          title: "Cojines opcionales",
          desc: "Cojín tapizado en tela coordinada con la decoración, disponible por costo adicional."
        },
        {
          icon: "📦",
          title: "Inventario garantizado",
          desc: "Comprometemos el número exacto de sillas desde el momento de la cotización."
        }
      ],
      varieties: [
        {
          name: "Tiffany transparente",
          desc: "El clásico puro: invisible y elegante. Deja brillar la decoración del venue."
        },
        {
          name: "Tiffany rosa",
          desc: "Suave y romántica. La favorita para baby showers y quinceañeras."
        },
        {
          name: "Tiffany dorado",
          desc: "Con destellos dorados. Perfecta para eventos de gala y bodas de lujo."
        },
        {
          name: "Tiffany azul",
          desc: "Fresca y moderna. Ideal para eventos de verano y bodas en playa."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "✨",
          title: "Mobiliario premium",
          desc: "Contamos con las últimas tendencias en mobiliario para eventos: diseños modernos, clásicos y de autor."
        },
        {
          icon: "🚚",
          title: "Entrega y montaje",
          desc: "Nos encargamos del traslado, instalación y retiro del mobiliario. Tú solo disfrutas el evento."
        },
        {
          icon: "📐",
          title: "Personalización total",
          desc: "Armamos la configuración exacta que necesitas: número de mesas, distribución y combinación de estilos."
        }
      ],
      integralServices: [
        {
          name: "Banquetes y Catering",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas",
          icon: "🎵"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        }
      ]
    },
    {
      slug: "alimentos-empresas",
      title: "Alimentos para Empresas y Comedores Industriales",
      headline: "La solución completa para la alimentación de tu empresa",
      seoTitle: "Catering Empresarial y Comedores Industriales | Bodasesor",
      seoDescription: "Servicio de alimentos para empresas, comedores industriales y concesiones. Menús balanceados, volúmenes desde 50 hasta 5,000 raciones diarias.",
      description: [
        "Bodasesor es el aliado de cientos de empresas que necesitan una solución de alimentación eficiente, deliciosa y con los más altos estándares de higiene. Atendemos comedores industriales desde 50 hasta 5,000 comensales por turno.",
        "Nuestro servicio va más allá del catering tradicional: ofrecemos administración integral del comedor, diseño de menús con asesoría nutricional, manejo de inventarios, personal capacitado y toda la infraestructura necesaria.",
        "Tenemos experiencia en empresas de manufactura, corporativos, hospitales, universidades y cualquier organización que requiera alimentación constante, puntual y de calidad. Contamos con certificaciones de inocuidad alimentaria."
      ],
      category: "servicios",
      categoryLabel: "Servicios",
      categoryHref: "/alimentos-empresas",
      related: [
        {
          name: "Coffee Break",
          href: "/coffee-break"
        },
        {
          name: "Comida Corrida",
          href: "/comida-corrida"
        },
        {
          name: "Canapés Premium",
          href: "/canapes-premium"
        },
        {
          name: "Desayuno Corporativo",
          href: "/desayuno-social"
        }
      ],
      included: [
        {
          icon: "🏭",
          title: "Administración de comedor",
          desc: "Gestión integral: personal, inventario, menús, higiene y reportes mensuales."
        },
        {
          icon: "👨‍⚕️",
          title: "Asesoría nutricional",
          desc: "Nutriólogo en equipo para diseñar menús balanceados adaptados a tu fuerza laboral."
        },
        {
          icon: "📊",
          title: "Control de costos",
          desc: "Reportes de costo por ración, desperdicio y optimización mensual."
        },
        {
          icon: "🧹",
          title: "Limpieza e higiene",
          desc: "Protocolos HACCP implementados. Auditorías de higiene mensuales."
        },
        {
          icon: "🔄",
          title: "Menú rotativo",
          desc: "Menú con rotación semanal de 4 semanas para evitar la monotonía."
        },
        {
          icon: "🚗",
          title: "Logística de viandas",
          desc: "Servicio de viandas transportadas para oficinas sin comedor propio."
        }
      ],
      varieties: [
        {
          name: "Comedor industrial",
          desc: "Administración completa del comedor con infraestructura y personal propio."
        },
        {
          name: "Catering a domicilio",
          desc: "Entrega diaria de alimentos en términos isotérmicos sin necesitar comedor."
        },
        {
          name: "Coffee break corporativo",
          desc: "Pausas con café de especialidad y bocadillos para juntas y capacitaciones."
        },
        {
          name: "Eventos de empresa",
          desc: "Posadas, días de campo, celebraciones y eventos especiales de la empresa."
        }
      ],
      menuExample: [
        "Desayuno: Chilaquiles con huevo y café americano",
        "Comida: Sopa, guisado del día, arroz, frijoles y agua fresca",
        "Cena: Plato ligero: sándwich integral, ensalada y fruta",
        "Coffee break: Café espresso, pan dulce y fruta del día",
        "Menú especial: Buffet temático mensual para eventos corporativos internos"
      ],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Coffee Break",
          href: "/coffee-break",
          icon: "☕"
        },
        {
          name: "Comida Corrida",
          href: "/comida-corrida",
          icon: "🍽️"
        },
        {
          name: "Desayuno Corporativo",
          href: "/desayuno-social",
          icon: "🥐"
        },
        {
          name: "Bocadillos",
          href: "/bocadillos",
          icon: "🥪"
        },
        {
          name: "Canapés",
          href: "/canapes-premium",
          icon: "🫙"
        },
        {
          name: "Paella para Eventos",
          href: "/paella",
          icon: "🥘"
        }
      ]
    },
    {
      slug: "espacios-eventos",
      title: "Espacios para Eventos",
      headline: "El lugar perfecto para que tu celebración tome vida",
      seoTitle: "Renta de Espacios para Eventos en México | Bodasesor",
      seoDescription: "Espacios y salones para bodas, XV años, corporativos y fiestas. Jardines, salones de cristal, haciendas y terrenos para eventos en toda la república mexicana.",
      description: [
        "Encontrar el espacio perfecto es el primer y más importante paso en la organización de cualquier evento. Bodasesor tiene alianzas con los mejores venues de México: jardines, haciendas, salones de cristal, rooftops y espacios industriales convertidos.",
        "Te asesoramos según el tipo de evento, número de invitados, fecha y presupuesto para identificar el espacio que mejor se adapta a tu visión. Negociamos en tu nombre para obtener las mejores condiciones.",
        "Nuestro servicio incluye visitas guiadas a los espacios preseleccionados, asesoría en la negociación del contrato y apoyo en la logística de montaje. Somos el puente entre ti y el venue ideal."
      ],
      category: "servicios",
      categoryLabel: "Servicios",
      categoryHref: "/espacios-eventos",
      related: [
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video"
        },
        {
          name: "Inflables y Juegos",
          href: "/inflables"
        },
        {
          name: "Música y DJ",
          href: "/musica"
        }
      ],
      included: [
        {
          icon: "🏛️",
          title: "Catálogo de venues",
          desc: "+200 espacios aliados en CDMX, GDL, MTY, QRO y principales ciudades."
        },
        {
          icon: "🗺️",
          title: "Visitas guiadas",
          desc: "Organizamos las visitas a los espacios y te acompañamos en el recorrido."
        },
        {
          icon: "📋",
          title: "Revisión de contrato",
          desc: "Revisamos el contrato del venue para proteger tus intereses y fechas."
        },
        {
          icon: "💰",
          title: "Negociación de precio",
          desc: "Negociamos en tu nombre con los venues para obtener las mejores condiciones."
        },
        {
          icon: "📅",
          title: "Gestión de fechas",
          desc: "Confirmamos disponibilidad y reservamos la fecha con anticipación."
        },
        {
          icon: "🔧",
          title: "Logística de montaje",
          desc: "Coordinamos todos los proveedores para el día de montaje en el venue."
        }
      ],
      varieties: [
        {
          name: "Jardín y al aire libre",
          desc: "Espacios verdes con capacidad de 50 a 2,000 personas."
        },
        {
          name: "Salón de eventos",
          desc: "Interiores climatizados con equipamiento completo."
        },
        {
          name: "Hacienda y quinta",
          desc: "Espacios históricos con jardines, capillas y arquitectura única."
        },
        {
          name: "Rooftop y terrazas",
          desc: "Vistas panorámicas de la ciudad para eventos con vista espectacular."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "floreria-decoracion",
      title: "Florería y Decoración para Eventos",
      headline: "Flores y decoración que crean la atmósfera que sueñas",
      seoTitle: "Florería y Decoración para Bodas y Eventos | Bodasesor",
      seoDescription: "Servicio de florería y decoración para bodas, XV años y eventos. Arreglos florales, centros de mesa, arcos, coronas y decoración temática completa.",
      description: [
        "Las flores son el lenguaje de las emociones. Nuestro equipo de floristas y decoradores trabaja para materializar la visión de tu evento, desde el arreglo floral más pequeño hasta instalaciones botánicas de gran escala que transforman completamente un espacio.",
        "Trabajamos con flores frescas de temporada seleccionadas en los mejores mercados de flores de México. Nuestros arreglos combinan flores locales con especies importadas para lograr el balance perfecto entre costo y resultado visual.",
        "Ofrecemos servicio integral de decoración: flores, iluminación, mobiliario decorativo, telas, globos, letreros personalizados y todo el arte visual que convierte un espacio en el escenario de un recuerdo eterno."
      ],
      category: "servicios",
      categoryLabel: "Servicios",
      categoryHref: "/floreria-decoracion",
      related: [
        {
          name: "Espacios para Eventos",
          href: "/espacios-eventos"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video"
        },
        {
          name: "Inflables y Juegos",
          href: "/inflables"
        },
        {
          name: "Música y DJ",
          href: "/musica"
        }
      ],
      included: [
        {
          icon: "🌸",
          title: "Ramos y bouquets",
          desc: "Ramo de novia, ramos de damas, boutonnières y accesorios florales."
        },
        {
          icon: "🌹",
          title: "Centros de mesa",
          desc: "Desde el arreglo más sencillo hasta las creaciones más elaboradas."
        },
        {
          icon: "🌿",
          title: "Arco y altar floral",
          desc: "Arco de flores para la ceremonia o foto call del evento."
        },
        {
          icon: "💐",
          title: "Decoración del venue",
          desc: "Entrada, pasillos, mesas de dulces, escaleras y todos los puntos del espacio."
        },
        {
          icon: "🎁",
          title: "Detalles para invitados",
          desc: "Flores en las sillas, pétalos de rosa y detalles florales personalizados."
        },
        {
          icon: "🎨",
          title: "Asesoría de diseño",
          desc: "Reunión previa para definir paleta floral, estilo y presupuesto."
        }
      ],
      varieties: [
        {
          name: "Estilo romántico",
          desc: "Rosas, peonías, hortensias y eucalipto en tonos rosados, cremas y blancos."
        },
        {
          name: "Estilo silvestre",
          desc: "Flores silvestres, follaje tropical, textura orgánica y paleta de temporada."
        },
        {
          name: "Estilo minimalista",
          desc: "Una sola variedad floral en arreglos depurados. Impacto con pocos elementos."
        },
        {
          name: "Estilo tropical",
          desc: "Heliconias, aves del paraíso, anturios y follaje exuberante."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🌸",
          title: "Floristas certificadas",
          desc: "Con formación en diseño floral, color y composición. Arte en cada arreglo."
        },
        {
          icon: "🌿",
          title: "Flores de temporada",
          desc: "Trabajamos con los mejores mercados para conseguir la flor más fresca."
        },
        {
          icon: "🎨",
          title: "Diseño personalizado",
          desc: "Cada evento es único. Diseñamos para ti, no para nadie más."
        }
      ],
      integralServices: [
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Banquetes y Catering",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Colgantes Premium",
          href: "/colgantes-premium",
          icon: "✨"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "fotografia-video",
      title: "Fotografía y Video para Eventos",
      headline: "Los recuerdos más importantes de tu vida, eternizados",
      seoTitle: "Fotografía y Video para Bodas y Eventos | Bodasesor",
      seoDescription: "Servicio de fotografía y video profesional para bodas, XV años y eventos. Fotógrafos certificados, edición premium y álbumes de lujo.",
      description: [
        "La fotografía y el video de tu evento son el único recurso que queda después de que las flores se marchitan y los invitados se van. Nuestros fotógrafos y videógrafos capturan los momentos más genuinos, las emociones más intensas y los detalles más preciados de tu celebración.",
        "Trabajamos con equipos de última generación: cámaras Sony A7 y Canon R5, lentes de máxima apertura, drones para tomas aéreas y equipos de iluminación continua para ambientes oscuros. El resultado: imágenes con calidad de editorial de revista.",
        "La entrega incluye galería digital con acceso ilimitado, álbum impreso de lujo y video cinematográfico con edición musical. Todo entregado en máximo 6 semanas tras el evento."
      ],
      category: "servicios",
      categoryLabel: "Servicios",
      categoryHref: "/fotografia-video",
      related: [
        {
          name: "Espacios para Eventos",
          href: "/espacios-eventos"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion"
        },
        {
          name: "Inflables y Juegos",
          href: "/inflables"
        },
        {
          name: "Música y DJ",
          href: "/musica"
        }
      ],
      included: [
        {
          icon: "📸",
          title: "Fotógrafo principal + asistente",
          desc: "Dos fotógrafos en simultáneo para no perder ningún ángulo."
        },
        {
          icon: "🎬",
          title: "Video cinematic 4K",
          desc: "Video con edición cinematográfica, música seleccionada y color grading profesional."
        },
        {
          icon: "🚁",
          title: "Drone aéreo",
          desc: "Tomas aéreas del venue, la llegada de los invitados y los momentos especiales."
        },
        {
          icon: "🖼️",
          title: "Álbum impreso de lujo",
          desc: "Álbum en tapa dura con papel fotográfico de lujo y diseño editorial."
        },
        {
          icon: "💻",
          title: "Galería digital",
          desc: "Galería en línea con descarga ilimitada, compartible con todos los invitados."
        },
        {
          icon: "⏱️",
          title: "Entrega en 6 semanas",
          desc: "Galería preliminar en 2 semanas, entrega final completa en 6 semanas."
        }
      ],
      varieties: [
        {
          name: "Paquete básico",
          desc: "Fotógrafo por 8 horas + galería digital + 100 fotos editadas."
        },
        {
          name: "Paquete completo",
          desc: "Foto + video + drone por 10 horas + galería + álbum + video cinematográfico."
        },
        {
          name: "Paquete premium",
          desc: "Todo el completo + segundo fotógrafo + fotografía aérea + cámara 360."
        },
        {
          name: "Only video",
          desc: "Cobertura de video con 2 camarógrafos + drone + video de 10 minutos."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "📷",
          title: "Equipo profesional",
          desc: "Equipos Sony y Canon de última generación. Drones DJI certificados."
        },
        {
          icon: "🎨",
          title: "Edición de autor",
          desc: "Cada foto es editada individualmente. No usamos presets masivos ni IA."
        },
        {
          icon: "💌",
          title: "Experiencia única",
          desc: "Más de 500 bodas fotografiadas. Sabemos capturar los momentos que importan."
        }
      ],
      integralServices: [
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Shows",
          href: "/shows",
          icon: "🎭"
        },
        {
          name: "Música",
          href: "/musica",
          icon: "🎵"
        },
        {
          name: "Banquetes",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        }
      ]
    },
    {
      slug: "inflables",
      title: "Inflables para Eventos",
      headline: "La diversión garantizada para los más pequeños",
      seoTitle: "Renta de Inflables para Fiestas y Eventos | Bodasesor",
      seoDescription: "Renta de inflables para fiestas infantiles, bodas y eventos familiares. Castillos inflables, albercas, resbaladillas y juegos inflables de todos los tamaños.",
      description: [
        "Los inflables son la garantía de diversión en cualquier evento familiar. Desde el clásico castillo inflable hasta las resbaladillas gigantes, albercas de pelotas y juegos de obstáculos, tenemos la opción perfecta para entretener a los más pequeños (y a los grandes aventureros).",
        "Todo nuestro catálogo cumple con las normas de seguridad: materiales ignífugos, seguros para niños, con malla protectora y supervisión recomendada durante el uso. El equipo llega limpio, inspeccionado y con todo el equipo de inflado.",
        "El servicio incluye traslado, inflado, supervisión durante el evento y deflado final. Solo necesitas el espacio y los niños con energía."
      ],
      category: "servicios",
      categoryLabel: "Servicios",
      categoryHref: "/inflables",
      related: [
        {
          name: "Espacios para Eventos",
          href: "/espacios-eventos"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video"
        },
        {
          name: "Música y DJ",
          href: "/musica"
        }
      ],
      included: [
        {
          icon: "🏰",
          title: "Castillos y toboganes",
          desc: "Modelos de 3x3m hasta 6x6m. Para 10 a 30 niños simultáneamente."
        },
        {
          icon: "💦",
          title: "Albercas y water slides",
          desc: "Para eventos de verano: tobogán de agua y alberca inflable de diversión."
        },
        {
          icon: "⚡",
          title: "Motor de inflado incluido",
          desc: "Motor de 2HP instalado en el lugar. Sin costo adicional."
        },
        {
          icon: "🛡️",
          title: "Materiales certificados",
          desc: "PVC ignífugo y atóxico. Costuras reforzadas de doble hilera."
        },
        {
          icon: "🧹",
          title: "Limpieza garantizada",
          desc: "Cada inflable llega desinfectado y en perfectas condiciones."
        },
        {
          icon: "📞",
          title: "Soporte durante el evento",
          desc: "Técnico disponible vía telefónica durante toda la duración del evento."
        }
      ],
      varieties: [
        {
          name: "Castillo inflable",
          desc: "Clásico y favorito. 4x4m, con malla de seguridad y tobogán lateral."
        },
        {
          name: "Combo con tobogán",
          desc: "Castillo + tobogán largo. La combinación más solicitada para fiestas."
        },
        {
          name: "Pista de obstáculos",
          desc: "Recorrido de retos físicos: túneles, paredes de escalar y rampas."
        },
        {
          name: "Tobogán de agua",
          desc: "Para días de calor: tobogán largo con alberca al final. Diversión acuática."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Shows y Entretenimiento",
          href: "/shows",
          icon: "🎭"
        },
        {
          name: "Música DJ",
          href: "/musica",
          icon: "🎵"
        },
        {
          name: "Catering para Fiestas",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Mesa de Dulces",
          href: "/mesa-dulces",
          icon: "🍭"
        },
        {
          name: "Fotografía",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        }
      ]
    },
    {
      slug: "musica",
      title: "Música y DJ para Eventos",
      headline: "La banda sonora perfecta para cada momento de tu celebración",
      seoTitle: "DJ y Música para Bodas y Eventos en México | Bodasesor",
      seoDescription: "Servicio de DJ y música en vivo para bodas, XV años, corporativos y fiestas. DJs certificados, equipo profesional de sonido y luz, y repertorio para todos los gustos.",
      description: [
        "La música define el alma de cualquier evento. Un DJ experto sabe leer el ambiente, controlar la energía del salón y mantener a todos bailando hasta el final. Nuestros DJs tienen más de 1,000 horas de experiencia en eventos y son especialistas en bodas, XV años y fiestas corporativas.",
        "Ofrecemos DJ, bandas en vivo, mariachis, tríos románticos y combinaciones de todo lo anterior. El equipo de sonido y luz que incluimos está a la altura de cualquier venue y garantiza una experiencia de audio de primer nivel.",
        "Cada contratación incluye reunión previa para definir el playlist, los momentos especiales (primer baile, vals, canciones de cierre) y las preferencias musicales de los novios o los organizadores."
      ],
      category: "servicios",
      categoryLabel: "Servicios",
      categoryHref: "/musica",
      related: [
        {
          name: "Espacios para Eventos",
          href: "/espacios-eventos"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video"
        },
        {
          name: "Inflables y Juegos",
          href: "/inflables"
        }
      ],
      included: [
        {
          icon: "🎧",
          title: "DJ profesional certificado",
          desc: "Con experiencia en bodas, corporativos y fiestas de alto perfil."
        },
        {
          icon: "🔊",
          title: "Sistema de sonido profesional",
          desc: "Parlantes L-Acoustics o similar. Ideal para 50 a 1,000 personas."
        },
        {
          icon: "💡",
          title: "Iluminación de espectáculo",
          desc: "Leds, movers, láseres, máquina de humo y cañón de confetti."
        },
        {
          icon: "🎤",
          title: "Micrófonos y maestro de ceremonias",
          desc: "Micrófonos inalámbricos incluidos. Opcional: conductor de la noche."
        },
        {
          icon: "📋",
          title: "Reunión de playlist",
          desc: "Reunión previa para definir el repertorio, los momentos especiales y los temas prohibidos."
        },
        {
          icon: "🎵",
          title: "Biblioteca de +100,000 canciones",
          desc: "Todos los géneros, décadas y solitudes especiales de los invitados."
        }
      ],
      varieties: [
        {
          name: "DJ + equipo básico",
          desc: "DJ con equipo de sonido y luz. Perfecto para eventos de hasta 200 personas."
        },
        {
          name: "DJ + equipo premium",
          desc: "Equipo de alto rendimiento con show de luces completo. Hasta 1,000 personas."
        },
        {
          name: "Banda de covers",
          desc: "Banda en vivo de 5 a 10 músicos con repertorio de rock, pop y baladas."
        },
        {
          name: "Mariachi",
          desc: "Mariachi de 6 a 12 integrantes. El toque mexicano que nadie olvida."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🎵",
          title: "Leer la pista",
          desc: "Sabemos cuándo subir y bajar el ritmo para mantener la energía perfecta."
        },
        {
          icon: "🎤",
          title: "Experiencia en bodas",
          desc: "Más de 500 bodas. Conocemos todos los momentos especiales y cómo manejarlos."
        },
        {
          icon: "🔊",
          title: "Equipo de primera",
          desc: "Invertimos en equipo profesional porque el sonido lo es todo en una fiesta."
        }
      ],
      integralServices: [
        {
          name: "Shows y Entretenimiento",
          href: "/shows",
          icon: "🎭"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas",
          icon: "🎶"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Banquetes",
          href: "/banquetes",
          icon: "🍽️"
        }
      ]
    },
    {
      slug: "reposteria",
      title: "Repostería para Eventos",
      headline: "El dulce arte que cierra cada celebración con un gran sabor",
      seoTitle: "Repostería Artesanal para Eventos y Bodas | Bodasesor",
      seoDescription: "Pasteles artesanales, macarons, tartaletas y repostería gourmet para bodas, XV años y eventos. Maestros reposteros y diseño de lujo.",
      description: [
        "La repostería artesanal es la firma dulce de cualquier celebración memorable. Nuestros maestros reposteros dominan desde la pastelería francesa clásica hasta las tendencias más actuales de diseño de tortas, combinando técnica impecable con creatividad sin límites.",
        "Cada pieza es elaborada con los mejores ingredientes: mantequilla europea de alta calidad, chocolate belga de cobertura, frutos frescos de temporada y extractos naturales. El resultado: sabor que sorprende y presentación que emociona.",
        "Diseñamos tu pastel de bodas, torre de cupcakes, mesa de postres o selección de petit fours según tu estilo, paleta de colores y presupuesto. Trabajamos con degustaciones previas para que elijas el sabor perfecto."
      ],
      category: "servicios",
      categoryLabel: "Servicios",
      categoryHref: "/reposteria",
      related: [
        {
          name: "Espacios para Eventos",
          href: "/espacios-eventos"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video"
        },
        {
          name: "Inflables y Juegos",
          href: "/inflables"
        }
      ],
      included: [
        {
          icon: "🎂",
          title: "Pastel principal personalizado",
          desc: "Diseño exclusivo a discutir. Desde 1 hasta 5 pisos. Cualquier sabor."
        },
        {
          icon: "🧁",
          title: "Macarons de autor",
          desc: "En los colores del evento. Mínimo 5 sabores diferentes."
        },
        {
          icon: "🍰",
          title: "Petit fours y tartaletas",
          desc: "Bocados de repostería fina para complementar la mesa de postres."
        },
        {
          icon: "🌸",
          title: "Decoración floral comestible",
          desc: "Flores de azúcar, fondant y oblea. Arte en cada capa del pastel."
        },
        {
          icon: "🚚",
          title: "Entrega y montaje",
          desc: "Transportamos y ensamblamos el pastel en el venue el día del evento."
        },
        {
          icon: "🧾",
          title: "Degustación previa",
          desc: "Cita de degustación de sabores antes de confirmar el pedido final."
        }
      ],
      varieties: [
        {
          name: "Pastel de bodas",
          desc: "Desde naked cake hasta diseños de alta costelería. Tu visión, nuestras manos."
        },
        {
          name: "Tower of cupcakes",
          desc: "Torre de 50 a 200 cupcakes decorados como alternativa al pastel tradicional."
        },
        {
          name: "Mesa de postres completa",
          desc: "Pastel + macarons + tartaletas + éclairs + bombones en presentación impresionante."
        },
        {
          name: "Postres individuales",
          desc: "Porciones para servir en mesa: mousse, panna cotta, pavlova y tiramisú."
        }
      ],
      menuExample: [
        "Pastel: 3 pisos de vainilla de Madagascar con ganache de frutos rojos",
        "Macarons: Frambuesa, pistache, limón, lavanda y champagne",
        "Tartaletas: Limón con merengue italiano y maracuyá con crema de coco",
        "Éclairs: Chocolate y café con crema pastelera",
        "Petit fours: Bombones belgas y financiers de almendra"
      ],
      whyUs: [
        {
          icon: "🎂",
          title: "Maestros reposteros",
          desc: "Formación en escuelas de pastelería francesa. Arte y técnica en cada pieza."
        },
        {
          icon: "🌿",
          title: "Ingredientes premium",
          desc: "Chocolate belga, mantequilla europea y frutas de temporada sin aditivos."
        },
        {
          icon: "🎨",
          title: "Diseño sin límites",
          desc: "Si lo puedes imaginar, lo podemos crear. Mostramos portafolio en la reunión."
        }
      ],
      integralServices: [
        {
          name: "Mesa de Postres",
          href: "/mesa-postres",
          icon: "🍰"
        },
        {
          name: "Mesa de Dulces",
          href: "/mesa-dulces",
          icon: "🍭"
        },
        {
          name: "Cupcakes Gourmet",
          href: "/cupcakes-gourmet",
          icon: "🧁"
        },
        {
          name: "Barra de Café",
          href: "/barra-cafe-premium",
          icon: "☕"
        },
        {
          name: "Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "shows",
      title: "Shows y Entretenimiento para Eventos",
      headline: "El momento WOW que nadie olvidará de tu evento",
      seoTitle: "Shows y Entretenimiento para Bodas y Eventos | Bodasesor",
      seoDescription: "Shows de entretenimiento para bodas, XV años y eventos corporativos. Bailarines, magos, comediantes, circo, fuegos artificiales y más.",
      description: [
        "Los shows de entretenimiento son los momentos que transforman un buen evento en uno EXTRAORDINARIO. Esos instantes donde todos los invitados dejan sus conversaciones, se giran hacia el centro del salón y quedan con la boca abierta.",
        "Nuestro catálogo incluye: bailarines profesionales (folclórico, contemporáneo, burlesque), magos ilusionistas, comediantes, shows de circo, espectáculos de fuego, danza árabe, grupos de percusión y sorpresas musicales.",
        "Coordinamos la actuación para los momentos más impactantes: la entrada del festejado, la primera vuelta, el pastel o el cierre de la noche. Cada show incluye reunión previa para coordinar música, espacio y timing exacto."
      ],
      category: "servicios",
      categoryLabel: "Servicios",
      categoryHref: "/shows",
      related: [
        {
          name: "Espacios para Eventos",
          href: "/espacios-eventos"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video"
        },
        {
          name: "Inflables y Juegos",
          href: "/inflables"
        }
      ],
      included: [
        {
          icon: "🎭",
          title: "Variedad de categorías",
          desc: "Bailarines, magos, comediantes, acróbatas y shows temáticos."
        },
        {
          icon: "🎵",
          title: "Coordinación musical",
          desc: "Coordinamos con el DJ o la banda para el acompañamiento musical del show."
        },
        {
          icon: "💡",
          title: "Iluminación especial",
          desc: "Focos especiales para el show coordinados con el equipo de luz del evento."
        },
        {
          icon: "📋",
          title: "Reunión de coordinación",
          desc: "Reunión previa para definir el timing, el espacio y los momentos especiales."
        },
        {
          icon: "🎪",
          title: "Vestuario incluido",
          desc: "Los artistas incluyen vestuario y accesorios propios del show."
        },
        {
          icon: "🔄",
          title: "Plan B garantizado",
          desc: "Siempre tenemos un artista de respaldo por cualquier contingencia."
        }
      ],
      varieties: [
        {
          name: "Ballet folclórico",
          desc: "Danzas regionales de México: jalisco, veracruz, oaxaca y más."
        },
        {
          name: "Show de magia",
          desc: "Ilusionista profesional con 45 minutos de close-up magic y grandes ilusiones."
        },
        {
          name: "Show de fuego",
          desc: "Bailarines de fuego: poi, bastones y telares. Impresionante y seguro."
        },
        {
          name: "Comediante de stand-up",
          desc: "Comediante adaptado al evento. Material exclusivo para la ocasión."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Pistas y Tarimas",
          href: "/pistas-tarimas",
          icon: "🎶"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Inflables",
          href: "/inflables",
          icon: "🎈"
        }
      ]
    },
    {
      slug: "wedding-planner",
      title: "Wedding Planner — Organización de Bodas",
      headline: "Tu boda soñada, sin el estrés",
      seoTitle: "Wedding Planner en México | Bodasesor",
      seoDescription: "Servicio de wedding planner y coordinación de bodas en México. Organización completa o parcial, gestión de proveedores y coordinación el día de la boda.",
      description: [
        "Organizar una boda es uno de los proyectos más complejos y emocionalmente cargados de la vida. Un wedding planner no solo te quita el estrés logístico: te ayuda a tener claridad sobre tu visión, maximiza tu presupuesto y garantiza que el gran día salga perfecto.",
        "Nuestros wedding planners tienen más de 5 años de experiencia, una red de proveedores de confianza y la capacidad de coordinar simultáneamente decenas de variables: catering, flores, música, fotos, transporte, alojamiento y todo lo que hace que una boda sea perfecta.",
        "Ofrecemos tres niveles de servicio: organización completa (de la propuesta al último baile), coordinación de proveedores (si ya tienes los proveedores elegidos) o solo coordinación del día (para que puedas disfrutar sin preocupaciones)."
      ],
      category: "servicios",
      categoryLabel: "Servicios",
      categoryHref: "/wedding-planner",
      related: [
        {
          name: "Espacios para Eventos",
          href: "/espacios-eventos"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video"
        },
        {
          name: "Inflables y Juegos",
          href: "/inflables"
        }
      ],
      included: [
        {
          icon: "👰",
          title: "Reuniones de planeación",
          desc: "Mínimo 8 reuniones durante la planeación para revisar avances y tomar decisiones."
        },
        {
          icon: "📋",
          title: "Gestión de proveedores",
          desc: "Seleccionamos, cotizamos, negociamos y coordinamos todos los proveedores."
        },
        {
          icon: "💰",
          title: "Control de presupuesto",
          desc: "Hoja de control mensual para que sepas en tiempo real en qué y cuánto vas."
        },
        {
          icon: "📅",
          title: "Cronograma del día",
          desc: "Minuto a minuto del día de la boda, compartido con todos los proveedores."
        },
        {
          icon: "📞",
          title: "Coordinación el día de la boda",
          desc: "Planner presente 12 horas. Se encarga de TODO para que tú solo disfrutes."
        },
        {
          icon: "🎨",
          title: "Diseño conceptual",
          desc: "Moodboard, paleta de colores y concepto visual de la boda. Todo en coherencia."
        }
      ],
      varieties: [
        {
          name: "Organización completa",
          desc: "Desde la propuesta hasta el último baile. De 12 a 18 meses de planeación."
        },
        {
          name: "Coordinación de proveedores",
          desc: "Ya tienes tus proveedores. Nosotros los coordinamos para ti."
        },
        {
          name: "Día de la boda",
          desc: "Solo coordinación el día del evento. 12 horas de presencia para que no te preocupes."
        },
        {
          name: "Asesoría puntual",
          desc: "Sesiones de consulta para resolver preguntas específicas en cualquier etapa."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "👰",
          title: "+200 bodas coordinadas",
          desc: "Experiencia real que se traduce en tranquilidad para ti."
        },
        {
          icon: "🤝",
          title: "Red de proveedores",
          desc: "Acceso a los mejores proveedores con precios preferenciales por volumen."
        },
        {
          icon: "💆",
          title: "Sin estrés garantizado",
          desc: "Nuestro trabajo es que tú solo tengas que llegar, enamorarte y bailar."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "bodas",
      title: "Servicios para Bodas en México",
      headline: "Todo lo que necesitas para la boda de tus sueños en un solo lugar",
      seoTitle: "Servicios Completos para Bodas en México | Bodasesor",
      seoDescription: "Banquetes, flores, música, fotografía, mobiliario y wedding planner para bodas en toda la república. Bodasesor: el aliado de las novias más exigentes.",
      description: [
        "Una boda es mucho más que un evento: es la celebración del amor y el comienzo de una nueva historia. Bodasesor nació para acompañar a las parejas en la organización de su día más importante, ofreciendo acceso a los mejores proveedores de México en un solo lugar.",
        "Desde el banquete gourmet hasta la decoración floral, desde el DJ que mantiene la fiesta hasta el fotógrafo que eterniza cada emoción: coordinamos todos los elementos para que tu boda sea exactamente como la imaginaste.",
        "Hemos acompañado más de 1,000 bodas en todo México. Sabemos que cada una es única, y por eso nuestra propuesta siempre comienza escuchándote a ti."
      ],
      category: "eventos",
      categoryLabel: "Tipo de Evento",
      categoryHref: "/bodas",
      related: [
        {
          name: "Baby Shower",
          href: "/baby-shower"
        },
        {
          name: "Bodas",
          href: "/bodas"
        },
        {
          name: "Cenas",
          href: "/cenas"
        },
        {
          name: "Corporativos",
          href: "/corporativos"
        },
        {
          name: "Cumpleaños",
          href: "/cumpleanos"
        },
        {
          name: "XV Años",
          href: "/xv-anos"
        },
        {
          name: "Graduaciones",
          href: "/graduaciones"
        },
        {
          name: "Primera Comunión",
          href: "/primera-comunion"
        }
      ],
      included: [
        {
          icon: "🍽️",
          title: "Banquete y catering",
          desc: "Desde el aperitivo de bienvenida hasta la cena completa y el pastel."
        },
        {
          icon: "💐",
          title: "Flores y decoración",
          desc: "Ramos, centros de mesa, arco floral y decoración completa del venue."
        },
        {
          icon: "📸",
          title: "Fotografía y video",
          desc: "Cobertura completa con galería digital, álbum y video cinematográfico."
        },
        {
          icon: "🎵",
          title: "Música y DJ",
          desc: "Desde el vals hasta el cierre de la fiesta. DJ o banda en vivo."
        },
        {
          icon: "🪑",
          title: "Mobiliario premium",
          desc: "Sillas de diseño, mesas, pistas de baile, salas lounge y más."
        },
        {
          icon: "👰",
          title: "Wedding Planner",
          desc: "Coordinación completa o solo el día. Tú decides cuánto apoyo necesitas."
        }
      ],
      varieties: [
        {
          name: "Boda íntima",
          desc: "Hasta 50 invitados. Atención personalizada y servicios de alta gama."
        },
        {
          name: "Boda estándar",
          desc: "De 100 a 200 invitados. El formato más solicitado en México."
        },
        {
          name: "Boda gran escala",
          desc: "Más de 300 invitados. Logística compleja que manejamos con experiencia."
        },
        {
          name: "Boda destino",
          desc: "En Cancún, Los Cabos, Valle de Bravo o donde tú elijas. Coordinamos desde lejos."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "xv-anos",
      title: "Servicios para XV Años",
      headline: "La fiesta de quince que toda niña merece",
      seoTitle: "Servicios para Quinceañeras en México | Bodasesor",
      seoDescription: "Organización completa de quinceañeras: banquetes, flores, música, inflables, shows, mesa de dulces y coordinación. XV años perfectos con Bodasesor.",
      description: [
        "Los quince años son un momento único en la vida de toda niña. Es la celebración de una etapa que merece ser recordada con alegría, lujo y los detalles que hacen única a cada quinceañera. Bodasesor tiene todo lo que necesitas para organizarlos en un solo lugar.",
        "Coordinamos el banquete, la decoración y florería, la música y el DJ para el vals y la fiesta, el show de entretenimiento, la mesa de dulces, el pastel y todos los elementos que hacen que una quinceañera sea extraordinaria.",
        "Trabajamos directamente con la quinceañera y su familia desde los primeros meses de planeación, escuchando su visión y proponiéndole opciones que se ajusten a su personalidad y presupuesto."
      ],
      category: "eventos",
      categoryLabel: "Tipo de Evento",
      categoryHref: "/xv-anos",
      related: [
        {
          name: "Baby Shower",
          href: "/baby-shower"
        },
        {
          name: "Bodas",
          href: "/bodas"
        },
        {
          name: "Cenas",
          href: "/cenas"
        },
        {
          name: "Corporativos",
          href: "/corporativos"
        },
        {
          name: "Cumpleaños",
          href: "/cumpleanos"
        },
        {
          name: "XV Años",
          href: "/xv-anos"
        },
        {
          name: "Graduaciones",
          href: "/graduaciones"
        },
        {
          name: "Primera Comunión",
          href: "/primera-comunion"
        }
      ],
      included: [
        {
          icon: "🎂",
          title: "Pastel de quinceañera",
          desc: "Diseñado a medida en los colores y temática elegidos."
        },
        {
          icon: "🍽️",
          title: "Banquete para invitados",
          desc: "Cena completa con servicio de meseros y presentación impecable."
        },
        {
          icon: "💐",
          title: "Decoración y flores",
          desc: "Arreglo completo del salón: mesa principal, centros de mesa y entrada."
        },
        {
          icon: "🎵",
          title: "DJ y vals",
          desc: "DJ con repertorio para el vals y la fiesta, coordinando cada momento especial."
        },
        {
          icon: "🍭",
          title: "Mesa de dulces",
          desc: "Diseñada en los colores del evento con los dulces favoritos de la quinceañera."
        },
        {
          icon: "📸",
          title: "Fotografía y video",
          desc: "Cobertura del día completo: misa, llegada, vals y fiesta."
        }
      ],
      varieties: [
        {
          name: "Quinceañera clásica",
          desc: "Vals, banquete, pastel, DJ y lo esencial bien hecho."
        },
        {
          name: "Quinceañera premium",
          desc: "Todo el clásico más shows, mesa de dulces, cámara 360 y photobooth."
        },
        {
          name: "Quinceañera íntima",
          desc: "Para 50 a 80 personas. Íntima, elegante y memorable."
        },
        {
          name: "Quinceañera temática",
          desc: "Con temática de viajes, París, playa, princesa o cualquier otro universo."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "corporativos",
      title: "Servicios para Eventos Corporativos",
      headline: "Eventos empresariales que proyectan la imagen que tu marca merece",
      seoTitle: "Eventos Corporativos Profesionales en México | Bodasesor",
      seoDescription: "Organización de eventos corporativos: lanzamientos, congresos, cenas de gala, team building y posadas empresariales. Calidad ejecutiva en cada detalle.",
      description: [
        "Los eventos corporativos son la carta de presentación de tu empresa ante clientes, socios y colaboradores. Un evento empresarial bien ejecutado transmite profesionalismo, solidez y la atención al detalle que define a las organizaciones de primer nivel.",
        "Desde coffee breaks para juntas hasta congresos de 5,000 personas, pasando por cenas de gala, lanzamientos de producto y posadas navideñas empresariales: Bodasesor tiene la experiencia y los proveedores para hacerlo impecable.",
        "Entendemos los tiempos corporativos, la necesidad de discretion, los presupuestos ajustados y la importancia de la puntualidad. Somos el socio de confianza para tu área de eventos."
      ],
      category: "eventos",
      categoryLabel: "Tipo de Evento",
      categoryHref: "/corporativos",
      related: [
        {
          name: "Baby Shower",
          href: "/baby-shower"
        },
        {
          name: "Bodas",
          href: "/bodas"
        },
        {
          name: "Cenas",
          href: "/cenas"
        },
        {
          name: "Corporativos",
          href: "/corporativos"
        },
        {
          name: "Cumpleaños",
          href: "/cumpleanos"
        },
        {
          name: "XV Años",
          href: "/xv-anos"
        },
        {
          name: "Graduaciones",
          href: "/graduaciones"
        },
        {
          name: "Primera Comunión",
          href: "/primera-comunion"
        }
      ],
      included: [
        {
          icon: "☕",
          title: "Coffee Break ejecutivo",
          desc: "Pausas con café de especialidad y bocadillos gourmet para cualquier junta."
        },
        {
          icon: "🍽️",
          title: "Catering corporativo",
          desc: "Comidas de trabajo, cenas de gala y buffets para eventos de empresa."
        },
        {
          icon: "🎵",
          title: "Entretenimiento corporativo",
          desc: "DJ, músicos, shows y animadores para eventos de integración y premiaciones."
        },
        {
          icon: "📸",
          title: "Cobertura fotográfica",
          desc: "Fotógrafo corporativo para comunicación interna y redes sociales."
        },
        {
          icon: "🪑",
          title: "Mobiliario ejecutivo",
          desc: "Mesas, sillas, periqueras y lounge para cualquier formato de evento."
        },
        {
          icon: "💐",
          title: "Decoración corporativa",
          desc: "Decoración con identidad de marca, señalética y elementos de branding."
        }
      ],
      varieties: [
        {
          name: "Junta y coffee break",
          desc: "Pausa con café de especialidad y bocadillos para equipos de trabajo."
        },
        {
          name: "Lanzamiento de producto",
          desc: "Evento de presentación con canapés, barra, shows y fotografía."
        },
        {
          name: "Cena de gala",
          desc: "Banquete formal con meseros, dress code y protocolo ejecutivo."
        },
        {
          name: "Posada empresarial",
          desc: "Navidad corporativa: catering, música, entretenimiento y detalles."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "baby-shower",
      title: "Servicios para Baby Shower",
      headline: "La bienvenida más dulce para el bebé más esperado",
      seoTitle: "Baby Shower Premium en México | Bodasesor",
      seoDescription: "Organización de baby showers: decoración, catering, mesa de dulces, mesas personalizadas y fotografía. El baby shower más lindo para mamá y bebé.",
      description: [
        "El baby shower es una celebración llena de ternura, amor y anticipación. Es el momento en que familia y amigos se reúnen para rodear a la futura mamá de cariño y para darle la bienvenida a una nueva vida que está por llegar.",
        "Bodasesor convierte el baby shower en una experiencia mágica: decoración temática, catering ligero y elegante, mesa de dulces en los colores del bebé, juegos divertidos y la fotografía que eterniza cada momento.",
        "Trabajamos con las tendencias más actuales: boho chic, jardín encantado, arcoíris, niña en rosa, niño en azul o neutro. Cada elemento es pensado para crear el ambiente más especial para mamá."
      ],
      category: "eventos",
      categoryLabel: "Tipo de Evento",
      categoryHref: "/baby-shower",
      related: [
        {
          name: "Baby Shower",
          href: "/baby-shower"
        },
        {
          name: "Bodas",
          href: "/bodas"
        },
        {
          name: "Cenas",
          href: "/cenas"
        },
        {
          name: "Corporativos",
          href: "/corporativos"
        },
        {
          name: "Cumpleaños",
          href: "/cumpleanos"
        },
        {
          name: "XV Años",
          href: "/xv-anos"
        },
        {
          name: "Graduaciones",
          href: "/graduaciones"
        },
        {
          name: "Primera Comunión",
          href: "/primera-comunion"
        }
      ],
      included: [
        {
          icon: "🎀",
          title: "Decoración temática",
          desc: "Globos, flores, letreros, centros de mesa y decoración del área de apertura de regalos."
        },
        {
          icon: "🍰",
          title: "Pastel de baby shower",
          desc: "Diseñado con el nombre y la temática del bebé."
        },
        {
          icon: "🍭",
          title: "Mesa de dulces",
          desc: "Diseñada en los colores elegidos con dulces personalizados."
        },
        {
          icon: "🥐",
          title: "Catering ligero",
          desc: "Sándwiches, quiches, ensaladas, fruta y bebidas para la tarde."
        },
        {
          icon: "📸",
          title: "Fotografía",
          desc: "Cobertura del evento y sesión de fotos con props para mamá."
        },
        {
          icon: "🎁",
          title: "Detallitos para invitadas",
          desc: "Souvenirs personalizados para que cada invitada lleve un recuerdo."
        }
      ],
      varieties: [
        {
          name: "Baby shower íntimo",
          desc: "Para 20 a 30 personas. Desayuno o brunch con amigas cercanas."
        },
        {
          name: "Baby shower garden",
          desc: "Al aire libre con decoración floral y mesas de madera rústica."
        },
        {
          name: "Baby shower de lujo",
          desc: "Con planner, catering completo, shows y cobertura fotográfica."
        },
        {
          name: "Baby shower virtual",
          desc: "Para cuando la familia está en otro estado o país. Digital y emotivo."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Mesa de Dulces",
          href: "/mesa-dulces",
          icon: "🍭"
        },
        {
          name: "Mesa de Postres",
          href: "/mesa-postres",
          icon: "🍰"
        },
        {
          name: "Barra de Mocteles",
          href: "/barra-mocteles",
          icon: "🧃"
        },
        {
          name: "Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Cupcakes Gourmet",
          href: "/cupcakes-gourmet",
          icon: "🧁"
        }
      ]
    },
    {
      slug: "cumpleanos",
      title: "Servicios para Cumpleaños",
      headline: "La fiesta de cumpleaños que todos recordarán",
      seoTitle: "Organización de Fiestas de Cumpleaños | Bodasesor",
      seoDescription: "Servicios completos para fiestas de cumpleaños: catering, música, inflables, mesa de dulces, decoración y fotografía para todas las edades.",
      description: [
        "Un cumpleaños es la celebración más personal del año. Ya sea un primer año de vida o los 50 años de un ser querido, merece ser festejado con todos los elementos que hacen memorable un evento: buena comida, música, decoración y los seres queridos alrededor.",
        "Bodasesor tiene servicios para cumpleaños de todas las edades: inflables y shows para los pequeños, barras de bebidas y DJ para los jóvenes, cenas elegantes para adultos y todo lo intermedio.",
        "Coordinamos todos los proveedores para que tú solo te preocupes de disfrutar el día. Desde la taquiza hasta el DJ, desde los inflables hasta el fotógrafo: un solo contacto para todo."
      ],
      category: "eventos",
      categoryLabel: "Tipo de Evento",
      categoryHref: "/cumpleanos",
      related: [
        {
          name: "Baby Shower",
          href: "/baby-shower"
        },
        {
          name: "Bodas",
          href: "/bodas"
        },
        {
          name: "Cenas",
          href: "/cenas"
        },
        {
          name: "Corporativos",
          href: "/corporativos"
        },
        {
          name: "Cumpleaños",
          href: "/cumpleanos"
        },
        {
          name: "XV Años",
          href: "/xv-anos"
        },
        {
          name: "Graduaciones",
          href: "/graduaciones"
        },
        {
          name: "Primera Comunión",
          href: "/primera-comunion"
        }
      ],
      included: [
        {
          icon: "🎂",
          title: "Pastel personalizado",
          desc: "Pastel diseñado para el festejado: sabor favorito y decoración a medida."
        },
        {
          icon: "🍽️",
          title: "Catering a tu medida",
          desc: "Desde tacos y taquizas hasta buffet gourmet. Cualquier estilo, cualquier edad."
        },
        {
          icon: "🎵",
          title: "Música y ambiente",
          desc: "DJ, mariachi, banda, o los shows que sean ideales para la edad del festejado."
        },
        {
          icon: "💐",
          title: "Decoración temática",
          desc: "Globos, flores, letreros y centros de mesa coordinados con la temática."
        },
        {
          icon: "📸",
          title: "Fotografía",
          desc: "Cobertura del evento con sesión de fotos y galería digital."
        },
        {
          icon: "🎁",
          title: "Detalles para invitados",
          desc: "Bolsitas de recuerdo personalizadas con el nombre y fecha del evento."
        }
      ],
      varieties: [
        {
          name: "Cumpleaños infantil",
          desc: "Inflables, shows de payaso o magia, taquiza y mesa de dulces."
        },
        {
          name: "Cumpleaños adolescente",
          desc: "DJ, barra de bebidas sin alcohol, fotobooth y catering para jovenes."
        },
        {
          name: "Cumpleaños adultos",
          desc: "Cena elegante, barra libre, música de ambiente y cobertura fotográfica."
        },
        {
          name: "Cumpleaños garden party",
          desc: "Al aire libre con decoración floral, catering tipo brunch y música acústica."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "graduaciones",
      title: "Servicios para Graduaciones",
      headline: "El inicio del siguiente capítulo, celebrado como merece",
      seoTitle: "Organización de Graduaciones en México | Bodasesor",
      seoDescription: "Catering, música, decoración y fotografía para fiestas de graduación. Desde graduaciones universitarias hasta de preparatoria y posgrado.",
      description: [
        "Una graduación es el final de una etapa de esfuerzo y el inicio de uno lleno de posibilidades. Merece ser celebrada con una fiesta que esté a la altura del logro: buena comida, música que mantenga a todos bailando y una fotografía que capture la alegría del momento.",
        "Bodasesor organiza graduaciones de todos los niveles: preparatoria, universidad, maestría y doctorado. Coordinamos con colegios y universidades para los eventos colectivos, y también atendemos fiestas familiares de graduación de cualquier escala.",
        "Desde el catering del evento de entrega de diplomas hasta la fiesta nocturna con DJ: tenemos todo."
      ],
      category: "eventos",
      categoryLabel: "Tipo de Evento",
      categoryHref: "/graduaciones",
      related: [
        {
          name: "Baby Shower",
          href: "/baby-shower"
        },
        {
          name: "Bodas",
          href: "/bodas"
        },
        {
          name: "Cenas",
          href: "/cenas"
        },
        {
          name: "Corporativos",
          href: "/corporativos"
        },
        {
          name: "Cumpleaños",
          href: "/cumpleanos"
        },
        {
          name: "XV Años",
          href: "/xv-anos"
        },
        {
          name: "Graduaciones",
          href: "/graduaciones"
        },
        {
          name: "Primera Comunión",
          href: "/primera-comunion"
        }
      ],
      included: [
        {
          icon: "🎓",
          title: "Catering para el evento",
          desc: "Desde cocktail post-ceremonia hasta cena de gala con los egresados."
        },
        {
          icon: "🎵",
          title: "DJ y música",
          desc: "Repertorio adaptado a la generación que está graduándose."
        },
        {
          icon: "💐",
          title: "Decoración institucional",
          desc: "Con los colores y logo de la institución. Orgulloso y elegante."
        },
        {
          icon: "📸",
          title: "Fotografía y video",
          desc: "Cobertura de la ceremonia y la fiesta. Galería para todos los egresados."
        },
        {
          icon: "🍹",
          title: "Barra de bebidas",
          desc: "Coctelería artesanal y barra libre para los mayores de edad."
        },
        {
          icon: "🎊",
          title: "Shows y animación",
          desc: "Fotobooth, cámara 360 y artistas de entretenimiento para animar la noche."
        }
      ],
      varieties: [
        {
          name: "Cóctel post-ceremonia",
          desc: "Canapés, barra de bebidas y brindis después de la entrega de diplomas."
        },
        {
          name: "Cena de gala",
          desc: "Cena formal con meseros, vajilla fina y musica de fondo para egresados."
        },
        {
          name: "Fiesta nocturna",
          desc: "DJ, barra libre, shows y la noche de celebración que todos esperaron."
        },
        {
          name: "Paquete completo",
          desc: "Ceremonia + cena + fiesta. El paquete más solicitado por universidades."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "primera-comunion",
      title: "Servicios para Primera Comunión",
      headline: "Un día sagrado que merece la celebración más especial",
      seoTitle: "Organización de Primera Comunión en México | Bodasesor",
      seoDescription: "Catering, decoración, mesa de dulces y fotografía para fiestas de Primera Comunión. Celebraciones elegantes y memorables para este día tan especial.",
      description: [
        "La Primera Comunión es uno de los momentos más significativos en la vida de un niño y de toda la familia. Es un día sagrado que merece ser celebrado con una fiesta que combine la solemnidad del momento con la alegría de la celebración.",
        "Bodasesor organiza recepciones de Primera Comunión con el nivel de detalle y elegancia que el día merece. Desde el brindis posterior a la misa hasta la fiesta familiar completa, coordinamos todo para que la familia solo tenga que vivir el momento.",
        "Trabajamos con los colores tradicionales —blanco y dorado— y también con los colores favoritos del niño para darle un toque personal. El resultado: un evento a la altura de la celebración."
      ],
      category: "eventos",
      categoryLabel: "Tipo de Evento",
      categoryHref: "/primera-comunion",
      related: [
        {
          name: "Baby Shower",
          href: "/baby-shower"
        },
        {
          name: "Bodas",
          href: "/bodas"
        },
        {
          name: "Cenas",
          href: "/cenas"
        },
        {
          name: "Corporativos",
          href: "/corporativos"
        },
        {
          name: "Cumpleaños",
          href: "/cumpleanos"
        },
        {
          name: "XV Años",
          href: "/xv-anos"
        },
        {
          name: "Graduaciones",
          href: "/graduaciones"
        },
        {
          name: "Primera Comunión",
          href: "/primera-comunion"
        }
      ],
      included: [
        {
          icon: "✝️",
          title: "Decoración sacra y festiva",
          desc: "Globos blancos y dorados, flores, centros de mesa y detalle religiosos."
        },
        {
          icon: "🍽️",
          title: "Catering elegante",
          desc: "Desde el brindis post-misa hasta la comida completa con meseros."
        },
        {
          icon: "🎂",
          title: "Pastel de Primera Comunión",
          desc: "Con diseño religioso y los colores del evento."
        },
        {
          icon: "🍭",
          title: "Mesa de dulces",
          desc: "En blanco y dorado con dulces y detalles alusivos al sacramento."
        },
        {
          icon: "📸",
          title: "Fotografía y video",
          desc: "Cobertura de la misa, el evento y los momentos familiares más especiales."
        },
        {
          icon: "🎁",
          title: "Recuerdos para invitados",
          desc: "Detalles personalizados con el nombre y fecha del sacramento."
        }
      ],
      varieties: [
        {
          name: "Recepción íntima",
          desc: "Para familia cercana: catering ligero, pastel y decoración sencilla."
        },
        {
          name: "Fiesta completa",
          desc: "Comida, música, mesa de dulces y cobertura fotográfica."
        },
        {
          name: "Evento garden",
          desc: "Al aire libre en jardín familiar con decoración blanca y flores."
        },
        {
          name: "Paquete todo incluido",
          desc: "Coordinación completa desde la iglesia hasta el final de la fiesta."
        }
      ],
      menuExample: [],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Mesa de Dulces",
          href: "/mesa-dulces",
          icon: "🍭"
        },
        {
          name: "Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Repostería",
          href: "/reposteria",
          icon: "🎂"
        },
        {
          name: "Música",
          href: "/musica",
          icon: "🎵"
        },
        {
          name: "Canapés",
          href: "/canapes-premium",
          icon: "🫙"
        }
      ]
    },
    {
      slug: "cenas",
      title: "Catering para Cenas y Cenas de Gala",
      headline: "La cena que convierte una noche ordinaria en extraordinaria",
      seoTitle: "Catering para Cenas y Cenas de Gala | Bodasesor",
      seoDescription: "Servicio de catering para cenas privadas, cenas de empresa y cenas de gala. Menús gourmet, servicio de protocolo y ambientación impecable.",
      description: [
        "Una cena es el formato más íntimo y sofisticado para celebrar. Sea una cena romántica de 10 personas, una cena familiar de 50 o una gala empresarial de 500, Bodasesor tiene el servicio adecuado para hacerla memorable.",
        "Nuestros menús para cenas están diseñados para crear una experiencia gastronómica completa: la entrada que despierta el apetito, el plato fuerte que enamora y el postre que deja un recuerdo dulce de la noche.",
        "El servicio de protocolo incluye meseros de guante blanco, sommelier, montaje con cristalería fina y coordinación de tiempos para que cada plato llegue en el momento perfecto."
      ],
      category: "eventos",
      categoryLabel: "Tipo de Evento",
      categoryHref: "/cenas",
      related: [
        {
          name: "Baby Shower",
          href: "/baby-shower"
        },
        {
          name: "Bodas",
          href: "/bodas"
        },
        {
          name: "Cenas",
          href: "/cenas"
        },
        {
          name: "Corporativos",
          href: "/corporativos"
        },
        {
          name: "Cumpleaños",
          href: "/cumpleanos"
        },
        {
          name: "XV Años",
          href: "/xv-anos"
        },
        {
          name: "Graduaciones",
          href: "/graduaciones"
        },
        {
          name: "Primera Comunión",
          href: "/primera-comunion"
        }
      ],
      included: [
        {
          icon: "🍽️",
          title: "Menú de 3 a 5 tiempos",
          desc: "Diseñado a medida según el estilo y el presupuesto de la cena."
        },
        {
          icon: "🤵",
          title: "Servicio de protocolo",
          desc: "Meseros de guante blanco con servicio sincroniazdo para todos los comensales."
        },
        {
          icon: "🥂",
          title: "Sommelier",
          desc: "Recomendación y servicio de vinos para el maridaje perfecto."
        },
        {
          icon: "🕯️",
          title: "Montaje con velas",
          desc: "Ambientación con velas, flores y cristalería fina."
        },
        {
          icon: "🎵",
          title: "Música de ambiente",
          desc: "Músico en vivo o playlist curada según el estilo de la cena."
        },
        {
          icon: "🌿",
          title: "Centro de mesa floral",
          desc: "Arreglo floral para cada mesa incluido en el servicio."
        }
      ],
      varieties: [
        {
          name: "Cena íntima",
          desc: "De 10 a 30 personas. Chef privado, servicio personalizado y menú de autor."
        },
        {
          name: "Cena privada",
          desc: "Para 30 a 100 personas en venue exclusivo o en tu propio espacio."
        },
        {
          name: "Cena de gala",
          desc: "Con todo el protocolo: dress code, sommelier, menú impreso y músico en vivo."
        },
        {
          name: "Cena temática",
          desc: "Con ambientación específica: italiana, francesa, japonesa o mexicana."
        }
      ],
      menuExample: [
        "Aperitivo: Blinis de salmón con crème fraîche y perla de alcaparra",
        "Entrada: Ensalada de arúgula con peras, nueces pecanas y vinagreta de trufa",
        "Sopa: Bisque de langostinos con nata montada y aceite de cebollín",
        "Plato fuerte: Filete Wellington con duxelles de champiñones y salsa de vino tinto",
        "Postre: Tarta Tatin de manzana con helado de vainilla de Tahití"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "comidas",
      title: "Catering para Comidas y Almuerzos",
      headline: "El mejor mediodía empieza con la mejor comida",
      seoTitle: "Catering para Comidas y Almuerzos en México | Bodasesor",
      seoDescription: "Servicio de catering para comidas familiares, almuerzos de trabajo y celebraciones de mediodía. Menús completos, servicio profesional y presentación impecable.",
      description: [
        "La comida del mediodía es la reunión más frecuente en la vida familiar y empresarial. Un buen servicio de catering para comidas transforma cualquier evento diurno en una experiencia gastronómica memorable que los comensales recordarán.",
        "Ya sea una comida familiar de domingo, un almuerzo de negocios o la recepción de una boda de día, Bodasesor tiene el menú correcto y el servicio adecuado para hacer del mediodía el mejor momento del día.",
        "Nuestros menús de mediodía son más ligeros que los banquetes nocturnos pero igual de elaborados: ensaladas, sopas, platillos principales con proteínas de primera y postres frescos que cierran la experiencia de manera perfecta."
      ],
      category: "eventos",
      categoryLabel: "Tipo de Evento",
      categoryHref: "/comidas",
      related: [
        {
          name: "Baby Shower",
          href: "/baby-shower"
        },
        {
          name: "Bodas",
          href: "/bodas"
        },
        {
          name: "Cenas",
          href: "/cenas"
        },
        {
          name: "Corporativos",
          href: "/corporativos"
        },
        {
          name: "Cumpleaños",
          href: "/cumpleanos"
        },
        {
          name: "XV Años",
          href: "/xv-anos"
        },
        {
          name: "Graduaciones",
          href: "/graduaciones"
        },
        {
          name: "Primera Comunión",
          href: "/primera-comunion"
        }
      ],
      included: [
        {
          icon: "🥗",
          title: "Ensalada de entrada",
          desc: "Verde, caprese, niçoise o de autor. Ligera y fresca para empezar."
        },
        {
          icon: "🍲",
          title: "Sopa o crema",
          desc: "Gazpacho, crema de verduras o consommé según la estación."
        },
        {
          icon: "🍖",
          title: "Plato fuerte",
          desc: "Proteína de primera: pollo, res, pescado o pasta según el menú elegido."
        },
        {
          icon: "🍮",
          title: "Postre de mediodía",
          desc: "Fruta fresca, panna cotta o mousse. Ligero y perfecto para el cierre."
        },
        {
          icon: "🍹",
          title: "Aguas frescas",
          desc: "Variedad de aguas artesanales: jamaica, horchata, limón y pepino."
        },
        {
          icon: "🍽️",
          title: "Servicio de meseros",
          desc: "Personal uniformado para servicio a la mesa o buffet según el formato."
        }
      ],
      varieties: [
        {
          name: "Comida familiar",
          desc: "Buffet abundante con variedad para que cada quien elija su favorito."
        },
        {
          name: "Almuerzo ejecutivo",
          desc: "Menú fijo de 3 tiempos con servicio ágil para reuniones de trabajo."
        },
        {
          name: "Brunch de celebración",
          desc: "Combinación de desayuno y almuerzo para eventos entre 11:00 y 14:00."
        },
        {
          name: "Lunch box ejecutivo",
          desc: "Caja individual con ensalada, sandwich gourmet y postre para eventos al aire libre."
        }
      ],
      menuExample: [
        "Ensalada: Niçoise con atún sellado, aceitunas, jitomate cherry y vinagreta de mostaza",
        "Sopa: Gazpacho andaluz con brunoise de pepino y aceite de oliva",
        "Plato: Pechuga de pollo rellena con espinacas y queso manchego",
        "Postre: Panna cotta de vainilla con coulis de frutos rojos",
        "Bebida: Agua de pepino con menta o limonada natural"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "desayunos",
      title: "Catering para Desayunos y Brunch",
      headline: "La reunión más fresca del día, con el mejor sabor",
      seoTitle: "Catering para Desayunos y Brunch en México | Bodasesor",
      seoDescription: "Servicio de catering para desayunos empresariales, brunch de bodas y reuniones matutinas. Chef en sitio, café de especialidad y presentación impecable.",
      description: [
        "El desayuno es el evento más íntimo y cálido. Nadie se pone corbata para un desayuno, y eso hace que las conversaciones sean más auténticas y los momentos más especiales. Nuestro servicio de desayunos y brunch captura esa energía de la mañana con el mejor sabor.",
        "Atendemos desde desayunos de trabajo de 10 personas hasta brunch de bodas de 300 invitados. El formato siempre incluye estaciones de chef en vivo —huevos al momento, crepas, hotcakes— para que la preparación sea parte del espectáculo.",
        "El café de especialidad es el protagonista: barista certificado con máquina espresso profesional en sitio, preparando cada taza con atención y técnica. Porque un buen desayuno empieza con un buen café."
      ],
      category: "eventos",
      categoryLabel: "Tipo de Evento",
      categoryHref: "/desayunos",
      related: [
        {
          name: "Baby Shower",
          href: "/baby-shower"
        },
        {
          name: "Bodas",
          href: "/bodas"
        },
        {
          name: "Cenas",
          href: "/cenas"
        },
        {
          name: "Corporativos",
          href: "/corporativos"
        },
        {
          name: "Cumpleaños",
          href: "/cumpleanos"
        },
        {
          name: "XV Años",
          href: "/xv-anos"
        },
        {
          name: "Graduaciones",
          href: "/graduaciones"
        },
        {
          name: "Primera Comunión",
          href: "/primera-comunion"
        }
      ],
      included: [
        {
          icon: "🥚",
          title: "Estación de huevos al momento",
          desc: "Huevos a gusto: revueltos, estrellados, benedictinos y en salsa."
        },
        {
          icon: "☕",
          title: "Barista en sitio",
          desc: "Café de especialidad con máquina profesional. Americano, capuccino y más."
        },
        {
          icon: "🥞",
          title: "Hotcakes o waffles",
          desc: "Con mantequilla, miel, fresas y crema batida. Para todos."
        },
        {
          icon: "🍊",
          title: "Jugos exprimidos",
          desc: "Naranja y pomelo recién exprimidos frente a los invitados."
        },
        {
          icon: "🥐",
          title: "Pan dulce y de mesa",
          desc: "Surtido artesanal: croissants, conchas, cuernos y pan integral."
        },
        {
          icon: "🍓",
          title: "Fruta de temporada",
          desc: "Fruta cortada y presentada de manera atractiva con dips de yogurt."
        }
      ],
      varieties: [
        {
          name: "Desayuno mexicano",
          desc: "Chilaquiles, tamales, huevos rancheros, frijoles y agua de sabor."
        },
        {
          name: "Brunch americano",
          desc: "Pancakes, huevos, tocino, hash browns y café americano."
        },
        {
          name: "Brunch de boda",
          desc: "Formato elegante con servicio de meseros, estaciones y champagne."
        },
        {
          name: "Desayuno corporativo",
          desc: "Rápido, nutritivo y profesional para equipos de trabajo."
        }
      ],
      menuExample: [
        "Bebidas: Americano, capuccino, jugo de naranja y agua mineral",
        "Estación: Huevos al gusto + chilaquiles verdes con crema y queso",
        "Pan: Croissant mantequilla, conchas de vainilla y muffin de arándano",
        "Fruta: Melón, fresa y kiwi en vasitos con yogurt y granola",
        "Extra: Tamales de rajas y elote con crema de la casa"
      ],
      serviceTiers: [
        {
          name: "Básico",
          items: [
            "Meseros: 1 c/20 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería",
            "Cristalería: copa + vaso",
            "Silla Tiffany",
            "Centro de mesa con flores de temporada",
            "Barra: vitroleros (2 sabores) + agua + café",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Tradicional",
          items: [
            "Meseros: 1 c/15 personas · 5 horas",
            "Personal de cocina",
            "Vajilla blanca + cubertería + plato base decorativo (dorado, plateado, gris garigoleado, rosa o palma)",
            "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
            "Silla Tiffany + camino de mesa",
            "Centro de mesa con flores de temporada",
            "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        },
        {
          name: "Premium",
          popular: true,
          items: [
            "Meseros: 1 c/10 personas · 5 horas",
            "Personal de cocina especializado",
            "Vajilla blanca + cubertería + plato base decorativo + copas de color",
            "Cristalería completa premium",
            "Silla Tiffany / Crossback / Avantgarde",
            "Mesa de madera opcional (redonda, cuadrada o rectangular)",
            "Centro de mesa con flores de temporada",
            "Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
            "Barman 1 c/50 personas · charolas · hielo"
          ]
        }
      ],
      whyUs: [
        {
          icon: "👨‍🍳",
          title: "Chefs certificados",
          desc: "Nuestros chefs tienen formación en escuelas gastronómicas de primer nivel y experiencia en eventos de alto perfil."
        },
        {
          icon: "🌿",
          title: "Ingredientes frescos",
          desc: "Trabajamos con proveedores locales seleccionados para garantizar productos de temporada y máxima frescura."
        },
        {
          icon: "📋",
          title: "Menú personalizado",
          desc: "Adaptamos cada propuesta a tu gusto, número de invitados, tipo de evento y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Barra de Bebidas",
          href: "/barra-bebidas",
          icon: "🍹"
        },
        {
          name: "Mobiliario para Eventos",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Música y DJ",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "lanzamientos",
      title: "Catering para Lanzamientos de Producto",
      headline: "El lanzamiento que posiciona tu producto desde el primer bocado",
      seoTitle: "Catering para Lanzamientos de Producto | Bodasesor",
      seoDescription: "Catering y organización de eventos para lanzamientos de producto, presentaciones de marca y ruedas de prensa. Elegante, puntual y coordinado con tu brand.",
      description: [
        "Un lanzamiento de producto es la primera impresión que el mercado tiene de tu marca. Todo comunica: la presentación, la mesa de canapés, los cócteles, la decoración. Bodasesor entiende que en un lanzamiento, la gastronomía también es branding.",
        "Diseñamos el catering del evento en coherencia con la identidad de tu producto: si lanzas una bebida premium, los canapés deben ser premium. Si lanzas una marca de moda mexicana, la comida debe ser mexicana contemporánea. Todo en sintonía.",
        "Atendemos ruedas de prensa, cocteles de lanzamiento, presentaciones a clientes y desayunos de prensa con la puntualidad y el nivel de detalle que los medios y los clientes esperan."
      ],
      category: "eventos",
      categoryLabel: "Tipo de Evento",
      categoryHref: "/lanzamientos",
      related: [
        {
          name: "Baby Shower",
          href: "/baby-shower"
        },
        {
          name: "Bodas",
          href: "/bodas"
        },
        {
          name: "Cenas",
          href: "/cenas"
        },
        {
          name: "Corporativos",
          href: "/corporativos"
        },
        {
          name: "Cumpleaños",
          href: "/cumpleanos"
        },
        {
          name: "XV Años",
          href: "/xv-anos"
        },
        {
          name: "Graduaciones",
          href: "/graduaciones"
        },
        {
          name: "Primera Comunión",
          href: "/primera-comunion"
        }
      ],
      included: [
        {
          icon: "🫙",
          title: "Canapés de autor",
          desc: "Bocados gourmet coordinados con la identidad de marca del producto."
        },
        {
          icon: "🍸",
          title: "Cóctel de bienvenida",
          desc: "Bebida signature del evento diseñada en coordinación con el equipo de marketing."
        },
        {
          icon: "💐",
          title: "Decoración de marca",
          desc: "Flores y elementos decorativos en los colores corporativos del producto."
        },
        {
          icon: "🎤",
          title: "Montaje para presentación",
          desc: "Disposición del espacio para facilitar el discurso, la demo y la foto."
        },
        {
          icon: "📸",
          title: "Cobertura fotográfica",
          desc: "Fotógrafo para el evento y sesión de producto con los ejecutivos."
        },
        {
          icon: "🚀",
          title: "Timing preciso",
          desc: "Coordinamos servicio para que nunca interfiera con los momentos clave."
        }
      ],
      varieties: [
        {
          name: "Cocktail de lanzamiento",
          desc: "Canapés y bebidas para 1.5 horas de networking post-presentación."
        },
        {
          name: "Desayuno de prensa",
          desc: "Desayuno ejecutivo para medios con menú coordinado con la temática."
        },
        {
          name: "Evento de presentación",
          desc: "Formato completo: presentación + canapés + cena + show."
        },
        {
          name: "Rueda de prensa",
          desc: "Breve y puntual: coffee break o mini bocadillos para periodistas."
        }
      ],
      menuExample: [
        "Cóctel firma: Bebida signature con el nombre y colores del producto",
        "Canapé 1: Bruscheta de ingrediente en tendencia con el lanzamiento",
        "Canapé 2: Mini taco de autor con ingrediente representativo",
        "Cierre: Petite fours en los colores corporativos del brand",
        "Bebida: Agua mineral premium y tónica artesanal en toda la velada"
      ],
      whyUs: [
        {
          icon: "🏆",
          title: "+1,000 eventos realizados",
          desc: "Más de una década organizando bodas, corporativos y fiestas en toda la república mexicana."
        },
        {
          icon: "✅",
          title: "Proveedores verificados",
          desc: "Solo trabajamos con profesionales seleccionados que cumplen nuestros estándares de calidad y puntualidad."
        },
        {
          icon: "💬",
          title: "Atención personalizada",
          desc: "Un asesor dedicado te acompaña desde la cotización hasta el día del evento, sin costos extra."
        }
      ],
      integralServices: [
        {
          name: "Canapés Premium",
          href: "/canapes-premium",
          icon: "🫙"
        },
        {
          name: "Cócteles",
          href: "/cocteles-mixologia",
          icon: "🍸"
        },
        {
          name: "Fotografía",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Shows",
          href: "/shows",
          icon: "🎭"
        },
        {
          name: "Música",
          href: "/musica",
          icon: "🎵"
        }
      ]
    },
    {
      slug: "silla-tiffany-infantil",
      title: "Silla Tiffany Infantil",
      headline: "El espacio perfecto para que los niños disfruten con comodidad",
      seoTitle: "Silla Tiffany Infantil para Eventos | Bodasesor",
      seoDescription: "Renta de Silla Tiffany Infantil en CDMX. Dimensiones adaptadas para niños, ideal para bodas, quinceañeras y cualquier evento con invitados pequeños.",
      description: [
        "La Silla Tiffany Infantil está diseñada específicamente para los más pequeños. Con dimensiones adaptadas a su estatura, es la opción perfecta para que los niños disfruten cómodamente de cualquier evento sin sentirse apretados en sillas de adulto.",
        "Comparte el diseño icónico de la Silla Tiffany clásica, por lo que combina perfectamente con el resto del mobiliario del evento. No importa si hay 5 o 50 niños: los atendemos con el mismo cuidado y calidad.",
        "Perfecta para la mesa de los niños en bodas, la mesa de cumpleaños o cualquier evento familiar donde los pequeños merecen su propio espacio especial."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "👶",
          title: "Dimensiones para niños",
          desc: "Proporciones adaptadas para niños de 3 a 12 años aproximadamente."
        },
        {
          icon: "🎨",
          title: "Diseño armónico",
          desc: "Mismo estilo Tiffany que el resto del mobiliario del evento."
        },
        {
          icon: "✅",
          title: "Seguridad",
          desc: "Revisada y limpia. Sin bordes afilados ni daños."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Coordinamos la entrega junto con el resto del mobiliario."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-ghost",
      title: "Silla Ghost",
      headline: "Modernidad transparente que amplía visualmente cualquier espacio",
      seoTitle: "Silla Ghost para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Ghost transparente en CDMX. Aporta modernidad y amplitud visual a bodas, eventos corporativos y celebraciones exclusivas.",
      description: [
        "La Silla Ghost es un ícono del diseño contemporáneo que aporta un toque de modernidad y sofisticación inconfundible. Su cuerpo completamente transparente crea una sensación de amplitud y ligereza visual, ideal para espacios donde no se quiere recargar la decoración.",
        "Se adapta a cualquier esquema de color precisamente porque es neutra: deja ver las flores, los manteles y la iluminación sin competir con ellos. En bodas y eventos de lujo, crea una atmósfera etérea y muy fotogénica.",
        "A $195 por unidad, representa una inversión en distinción. Con nuestra Silla Ghost, cada foto del evento tendrá ese toque editorial que la diferencia."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "✨",
          title: "Transparencia total",
          desc: "Acrílico transparente que no interrumpe la línea visual del espacio."
        },
        {
          icon: "📸",
          title: "Muy fotogénica",
          desc: "Ideal para eventos donde la fotografía es importante."
        },
        {
          icon: "✅",
          title: "Sin rayaduras",
          desc: "Cada unidad revisada para garantizar perfecta transparencia."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Transportamos con cuidado para evitar rayones."
        }
      ],
      varieties: [
        {
          name: "Ghost Transparente",
          desc: "El clásico completamente claro. El más versátil para cualquier decoración."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-smith",
      title: "Silla Smith",
      headline: "Elegancia contemporánea en tres colores para cualquier evento moderno",
      seoTitle: "Silla Smith para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Smith en CDMX. Disponible en negro, rosa y beige. Diseño contemporáneo con líneas limpias para bodas, eventos y celebraciones modernas.",
      description: [
        "La Silla Smith combina elegancia y comodidad en un diseño contemporáneo de líneas limpias. Su estructura firme y su asiento confortable la hacen perfecta para eventos donde los invitados permanecerán sentados por periodos prolongados.",
        "Disponible en tres colores cuidadosamente seleccionados —negro, rosa y beige— puede coordinar tanto con esquemas de color románticos y delicados como con ambientaciones más modernas y sofisticadas.",
        "A $170 por unidad, la Silla Smith ofrece una excelente relación entre estética, comodidad y precio, convirtiéndola en una de las favoritas de organizadores de eventos en toda la ciudad."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "Colores",
          desc: "Negro, rosa y beige. Para eventos modernos y románticos."
        },
        {
          icon: "🛋️",
          title: "Comodidad",
          desc: "Diseño ergonómico que garantiza confort en eventos largos."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y limpia para cada evento."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Instalamos en el venue acordado."
        }
      ],
      varieties: [
        {
          name: "Negro",
          desc: "Elegante y versátil para cualquier tipo de evento."
        },
        {
          name: "Rosa",
          desc: "Romántico y delicado, ideal para bodas y baby showers."
        },
        {
          name: "Beige",
          desc: "Neutro y sofisticado, combina con paletas naturales."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-camila",
      title: "Silla Camila",
      headline: "Elegancia sobria que añade distinción a cualquier espacio",
      seoTitle: "Silla Camila para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Camila en negro y blanco en CDMX. Diseño contemporáneo de elegancia sobria para bodas, eventos corporativos y celebraciones elegantes.",
      description: [
        "La Silla Camila es sinónimo de elegancia sobria y carácter contemporáneo. Su diseño depurado, con respaldo de diseño y asiento tapizado, añade un toque de distinción sin sobrecargar la decoración del evento.",
        "Disponible en negro y blanco, la Silla Camila es perfecta para eventos que buscan una estética limpia y moderna. El negro aporta sofisticación a galas corporativas; el blanco, pureza y luminosidad a bodas y ceremonias.",
        "Con disponibilidad de hasta 300 unidades, podemos atender eventos de cualquier tamaño. La Silla Camila también es protagonista en los famosos conjuntos \"Mesa Black Shine & Silla Camila\" para eventos de altísimo impacto visual."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "Colores",
          desc: "Negro y blanco. Clásica bitonalidad para eventos contemporáneos."
        },
        {
          icon: "🛋️",
          title: "Asiento acolchado",
          desc: "Tapizado cómodo que garantiza confort durante todo el evento."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y limpia. Tapizado sin manchas."
        },
        {
          icon: "🔢",
          title: "Gran disponibilidad",
          desc: "Hasta 300 unidades para eventos grandes."
        }
      ],
      varieties: [
        {
          name: "Negra",
          desc: "Sofisticada y elegante para galas, corporativos y eventos de noche."
        },
        {
          name: "Blanca",
          desc: "Luminosa y elegante, perfecta para bodas y eventos diurnos."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-basket",
      title: "Silla Basket",
      headline: "Originalidad y textura que aporta carácter único a tu evento",
      seoTitle: "Silla Basket para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Basket en arena, nude y gris en CDMX. Diseño original con textura de canasta para bodas boho, eventos al aire libre y celebraciones con personalidad.",
      description: [
        "La Silla Basket destaca por su originalidad y textura singular, brindando un estilo distintivo que la diferencia de cualquier otra opción. Su cuerpo con efecto de canasta trenzada le da un carácter orgánico y cálido, muy en tendencia en eventos boho, campestres y rústicos contemporáneos.",
        "Disponible en tres tonos tierra —arena, nude y gris— la Silla Basket se integra perfectamente con decoraciones de flores silvestres, pilas de madera, mantelería de lino y ambientaciones naturales.",
        "Gran comodidad y diseño se unen en un modelo que ya es favorito de decoradores y wedding planners de toda la Ciudad de México para eventos al aire libre y salones con luz natural."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "Colores",
          desc: "Arena, nude y gris. Perfectos para paletas neutras y naturales."
        },
        {
          icon: "🌿",
          title: "Estilo orgánico",
          desc: "Textura de canasta que complementa decoraciones naturales y boho."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y limpia antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Instalamos en el venue acordado."
        }
      ],
      varieties: [
        {
          name: "Arena",
          desc: "El tono más cálido. Ideal para eventos boho y campestres."
        },
        {
          name: "Nude",
          desc: "Suave y femenino, complementa paletas rosadas y polvosas."
        },
        {
          name: "Gris",
          desc: "Más urbano y contemporáneo para eventos modernos."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-antonella",
      title: "Silla Antonella",
      headline: "Sofisticación versátil en colores delicados para cualquier ocasión",
      seoTitle: "Silla Antonella para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Antonella en nude, negra y rosa en CDMX. Modelo sofisticado y versátil para bodas, quinceañeras, baby showers y todo tipo de celebraciones.",
      description: [
        "La Silla Antonella es un modelo sofisticado y versátil que se adapta con gracia a diversos ambientes gracias a su paleta de colores delicados. Su línea elegante y su asiento confortable la hacen perfecta para eventos donde el detalle y la estética son prioritarios.",
        "Disponible en nude, negra y rosa, la Silla Antonella puede protagonizar tanto un evento romántico de boda como una quinceañera moderna o un baby shower con estilo. Su diseño equilibrado es tan femenino como formal.",
        "La combinación de Mesa Redonda con Mantel y Silla Antonella es una de las más solicitadas en nuestro catálogo, creando montajes visualmente impactantes para cualquier tipo de celebración."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "Colores",
          desc: "Nude, negra y rosa. Versatilidad para cualquier tipo de evento."
        },
        {
          icon: "🛋️",
          title: "Comodidad",
          desc: "Asiento tapizado que garantiza confort durante todo el evento."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Tapizado sin manchas, revisado antes de cada entrega."
        },
        {
          icon: "🔢",
          title: "Disponibilidad",
          desc: "Hasta 100 unidades por color."
        }
      ],
      varieties: [
        {
          name: "Nude",
          desc: "Delicado y romántico, perfecto para bodas y baby showers."
        },
        {
          name: "Negra",
          desc: "Elegante y contemporánea para eventos formales."
        },
        {
          name: "Rosa",
          desc: "Festiva y femenina para quinceañeras y celebraciones especiales."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-cabos",
      title: "Silla Cabos",
      headline: "Líneas curvas y estructura metálica para un estilo moderno inconfundible",
      seoTitle: "Silla Cabos para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Cabos en beige y negro en CDMX. Diseño contemporáneo con estructura metálica negra y tapizado suave para eventos modernos y elegantes.",
      description: [
        "La Silla Cabos presenta un diseño contemporáneo de líneas curvas y elegantes que la distinguen al instante. Su estructura metálica negra contrasta perfectamente con el tapizado suave del asiento, ofreciendo comodidad y estilo moderno en una sola pieza.",
        "Disponible en beige y negro, la Silla Cabos es ideal para eventos con una estética industrial-chic, moderna o cosmopolita. La combinación de metal y tapizado suave es uno de los contrastes más llamativos del diseño contemporáneo.",
        "A $150 por unidad, la Silla Cabos representa una opción de alto impacto visual a un precio muy competitivo dentro de nuestra colección premium."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "Colores",
          desc: "Beige y negro. Contraste elegante de metal y tapizado."
        },
        {
          icon: "🔩",
          title: "Estructura metálica",
          desc: "Base de metal negro resistente y de larga durabilidad."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y limpia. Sin rayones en la estructura."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Instalamos en el venue acordado."
        }
      ],
      varieties: [
        {
          name: "Beige",
          desc: "Tapizado beige con estructura negra. Contraste cálido y moderno."
        },
        {
          name: "Negro",
          desc: "Totalmente negro para una estética industrial y sofisticada."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-caroline",
      title: "Silla Caroline",
      headline: "Minimalismo sofisticado en negro para espacios con diseño de autor",
      seoTitle: "Silla Caroline para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Caroline en negro en CDMX. Estética minimalista y sofisticada para complementar cualquier diseño de interiores o ambientación de evento.",
      description: [
        "La Silla Caroline destaca por su estética minimalista y sofisticada. Su acabado en negro ofrece una línea depurada y moderna que se integra con elegancia en cualquier diseño de interiores o ambientación de evento, sin competir con la decoración.",
        "Su forma distintiva —con respaldo de líneas geométricas y silueta equilibrada— la convierte en una elección versátil y chic para bodas elegantes, eventos corporativos de alto nivel y celebraciones nocturnas.",
        "La Silla Caroline es la opción para quienes buscan un mobiliario que sea parte del concepto estético del evento, no solo una solución funcional. A $170 por unidad, es diseño de autor accesible."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "Color",
          desc: "Negro elegante, minimalista y versátil."
        },
        {
          icon: "🏛️",
          title: "Diseño de autor",
          desc: "Silueta única con forma distintiva y respaldo geométrico."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y limpia antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Instalamos en el venue acordado."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-maria",
      title: "Silla María",
      headline: "Solidez y elegancia clásica en negro para eventos de cualquier índole",
      seoTitle: "Silla María para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla María en negro en CDMX. Diseño robusto y atemporal que combina elegancia clásica con practicidad para eventos formales y casuales.",
      description: [
        "La Silla María combina la robustez con la elegancia en un diseño atemporal de color negro. Su construcción sólida garantiza durabilidad y estabilidad durante todo el evento, mientras que su silueta clásica se integra armoniosamente con cualquier decoración.",
        "Versátil y chic, la Silla María funciona igual de bien en una boda formal que en una reunión corporativa o una cena privada. Su color negro la hace neutra frente a cualquier paleta de colores y estilo decorativo.",
        "A $170 por unidad, la Silla María representa una inversión sensata: diseño limpio, durabilidad probada y estética que no falla. Disponible en cantidad suficiente para eventos de hasta 500 personas."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "Color",
          desc: "Negro elegante y atemporal para cualquier tipo de evento."
        },
        {
          icon: "🔩",
          title: "Construcción robusta",
          desc: "Estructura firme que garantiza estabilidad y durabilidad."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y limpia antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Instalamos en el venue acordado."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-tolix",
      title: "Silla Tolix",
      headline: "El clásico del diseño industrial que da carácter a cualquier evento",
      seoTitle: "Silla Tolix para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Tolix en CDMX. Diseño industrial icónico, resistente y atemporal para bodas, eventos al aire libre, corporativos y celebraciones con personalidad.",
      description: [
        "La Silla Tolix es un clásico indiscutible del diseño industrial que aporta un toque contemporáneo y con personalidad a cualquier evento. Su origen en la Francia de los años 30 y su presencia en los cafés y restaurantes más icónicos del mundo la convierten en un ícono reconocible al instante.",
        "Su estructura metálica la hace extremadamente resistente y duradera, ideal para eventos al aire libre donde se requiere un mobiliario que soporte las condiciones del exterior sin perder estética.",
        "A $195 por unidad, la Silla Tolix es perfecta para eventos con tema industrial, vintage, hipster o simplemente para quien quiere añadir un toque de originalidad sin perder funcionalidad. Ligera, apilable y siempre elegante."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🔩",
          title: "Metal resistente",
          desc: "Estructura metálica de alta durabilidad, ideal para exteriores."
        },
        {
          icon: "🏛️",
          title: "Diseño icónico",
          desc: "El clásico industrial reconocido a nivel mundial."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y sin óxido ni daños antes de cada evento."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Instalamos en el venue acordado."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-avant-garde",
      title: "Silla Avant Garde",
      headline: "Diseño sencillo y versátil a precio imbatible para eventos de cualquier escala",
      seoTitle: "Silla Avant Garde para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Avant Garde en CDMX. Diseño sencillo pero elegante a $70 por unidad. Ideal para eventos grandes, bodas campestres y celebraciones al aire libre.",
      description: [
        "La Silla Avant Garde ofrece una excelente relación calidad-precio que la convierte en la opción favorita para eventos de gran escala. A solo $70 por unidad, es la silla más accesible de nuestra colección sin sacrificar estilo ni calidad.",
        "Su diseño sencillo pero elegante es muy versátil: funciona igualmente bien en un banquete campestre que en un evento al aire libre, una boda rústica o una celebración familiar. Su acabado rústico natural la hace especialmente popular para eventos con temática natural u orgánica.",
        "Con disponibilidad de hasta 500 unidades, es la solución perfecta para eventos de gran aforo donde se necesita cantidad sin comprometer la estética. Los organizadores más experimentados la eligen para complementar mesas rectangulares rústicas."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "💰",
          title: "Precio imbatible",
          desc: "$70 por unidad. La mejor relación calidad-precio de la colección."
        },
        {
          icon: "🔢",
          title: "Gran disponibilidad",
          desc: "Hasta 500 unidades para eventos de cualquier escala."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y limpia antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Instalamos en el venue acordado."
        }
      ],
      varieties: [
        {
          name: "Rústica Natural",
          desc: "El acabado más popular para bodas campestres y eventos al aire libre."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-crossback",
      title: "Silla Crossback",
      headline: "El toque rústico y vintage que aporta personalidad única a tu evento",
      seoTitle: "Silla Crossback para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Crossback en caoba y natural en CDMX. El respaldo en X aporta personalidad rústica y vintage para bodas campestres y eventos con carácter.",
      description: [
        "La Silla Crossback es perfecta para eventos que buscan un toque rústico o vintage inconfundible. Su respaldo en forma de X le confiere un carácter especial que aporta personalidad y calidez a cualquier decoración, diferenciando el evento del montaje estándar.",
        "Disponible en caoba y natural, la Silla Crossback es la protagonista indiscutible de las bodas campestres, eventos al aire libre y celebraciones con temática boho o rústica contemporánea. Combine con mesas de madera rústica para un resultado espectacular.",
        "A $95 por unidad, con disponibilidad de hasta 800 unidades en caoba y 500 en natural, la Silla Crossback es perfecta para eventos de gran escala con estética diferenciada."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "Colores",
          desc: "Caoba y natural. Calidez de madera para eventos con personalidad."
        },
        {
          icon: "🔢",
          title: "Gran disponibilidad",
          desc: "Hasta 800 unidades en caoba y 500 en natural."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y limpia antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Instalamos en el venue acordado."
        }
      ],
      varieties: [
        {
          name: "Caoba",
          desc: "El tono más rico y profundo. Perfecto para bodas y eventos formales campestres."
        },
        {
          name: "Natural",
          desc: "Más claro y rústico, ideal para eventos boho y celebraciones al aire libre."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-wishbone",
      title: "Silla Wishbone",
      headline: "El ícono del diseño escandinavo que aporta sofisticación auténtica",
      seoTitle: "Silla Wishbone para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Wishbone en CDMX. Diseño escandinavo con respaldo en Y y asiento de cuerda tejida. Para eventos donde el diseño de autor marca la diferencia.",
      description: [
        "La Silla Wishbone —también conocida como Silla Y o CH24— es un ícono del diseño escandinavo moderno, creada originalmente por Hans Wegner en 1949. Su característico respaldo en forma de Y y su asiento de cuerda tejida la convierten en una pieza de diseño de autor que distingue inmediatamente a un evento con criterio estético.",
        "Su elegancia es discreta pero poderosa: quienes conocen de diseño la reconocen al instante como una elección sofisticada y culta. Para bodas y eventos donde los invitados aprecian el detalle, la Wishbone es la elección que marca la diferencia.",
        "A $215 por unidad, es la silla más premium de nuestra colección y refleja esa inversión en elegancia atemporal e inteligente."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🏛️",
          title: "Diseño de autor",
          desc: "Ícono del diseño escandinavo del siglo XX."
        },
        {
          icon: "🎨",
          title: "Asiento tejido",
          desc: "Cuerda trenzada artesanalmente que aporta textura y calidez."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y sin daños en el tejido antes de cada evento."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Instalamos con cuidado en el venue acordado."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-louis-xv",
      title: "Silla Louis XV",
      headline: "Refinamiento clásico inspirado en la corte francesa del siglo XVIII",
      seoTitle: "Silla Louis XV para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Louis XV en CDMX. Elegancia barroca francesa para bodas de lujo, quinceañeras de princesa y eventos de alto nivel en toda la área metropolitana.",
      description: [
        "La Silla Louis XV es sinónimo de elegancia clásica y refinamiento. Su diseño inspirado en el estilo francés del siglo XVIII aporta un toque de distinción y lujo a cualquier evento, especialmente bodas de lujo y celebraciones formales donde se busca crear un ambiente de excepción.",
        "Sus patas torneadas, el respaldo ornamentado y el tapizado en colores nobles como beige crean una atmósfera que transporta a los invitados a los salones de la corte de Versalles. Para quinceañeras de ensueño y bodas de cuento, no hay silla más apropiada.",
        "La combinación de Mesa Redonda con Mantel y Silla Luis XV Beige es una de las más fotografiadas y elegidas en México para eventos de alto presupuesto. A $200 por unidad, representa el lujo accesible en toda su expresión."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "👑",
          title: "Estilo barroco",
          desc: "Patas torneadas y respaldo ornamentado estilo corte francesa."
        },
        {
          icon: "🎨",
          title: "Tapizado noble",
          desc: "Beige elegante que complementa cualquier paleta de evento de lujo."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Tapizado sin manchas, estructura sin daños."
        },
        {
          icon: "🔢",
          title: "Disponibilidad",
          desc: "Hasta 100 unidades para eventos de lujo."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-mariantonieta",
      title: "Silla Mariantonieta",
      headline: "Elegancia clásica con diseño sofisticado en tres acabados de madera",
      seoTitle: "Silla Mariantonieta para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Mariantonieta en negro, natural y caoba en CDMX. Diseño clásico sofisticado para bodas formales, galas y eventos que buscan distinción.",
      description: [
        "La Silla Mariantonieta combina elegancia clásica con diseño sofisticado, siendo perfecta para eventos formales y bodas que buscan un toque de distinción genuina. Su silueta inspirada en las sillas de salón europeas del siglo XIX la dota de un carácter romántico y noble.",
        "Disponible en negro, natural y caoba, la Mariantonieta adapta su personalidad según el acabado: el negro la hace contemporánea y dramática; el natural, cálida y rústica; la caoba, rica y tradicional.",
        "La combinación de Mesa Rectangular Rústica con Silla Mariantonieta Caoba es uno de los montajes más solicitados para bodas campestres y eventos de campo con alto nivel de detalle."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "Colores",
          desc: "Negro, natural y caoba. Tres personalidades en un solo modelo."
        },
        {
          icon: "🔢",
          title: "Disponibilidad",
          desc: "Hasta 200 unidades para eventos de gran escala."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y limpia antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Instalamos en el venue acordado."
        }
      ],
      varieties: [
        {
          name: "Negro",
          desc: "Contemporánea y dramática para eventos nocturnos y galas."
        },
        {
          name: "Natural",
          desc: "Cálida y rústica para bodas campestres y eventos al aire libre."
        },
        {
          name: "Caoba",
          desc: "Tradicional y elegante, el acabado más solicitado del modelo."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "silla-sillon-novios",
      title: "Sillón de Novios",
      headline: "El trono para los protagonistas del día más especial de su vida",
      seoTitle: "Sillón de Novios para Bodas | Renta | Bodasesor",
      seoDescription: "Renta de Sillón de Novios en CDMX. Diseñado para ser el centro de atención en la mesa principal de bodas. Elegante, cómodo y memorable para los novios.",
      description: [
        "Nuestro Sillón de Novios está diseñado específicamente para ser el centro de atención en la mesa principal de bodas. Con un diseño más grande, ornamentado y majestuoso que una silla convencional, coloca a los novios en una posición visual privilegiada que todos los invitados notarán.",
        "Su tapizado premium y su estructura cuidadosamente elaborada permiten a los novios pasar horas sentados con comodidad durante el banquete y la celebración, sin sacrificar ni un ápice de la elegancia que el momento merece.",
        "A $610 por unidad (generalmente se rentan en par), el Sillón de Novios es la inversión más importante en el mobiliario de la boda. Los protagonistas del día lo merecen."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "👑",
          title: "Diseño majestuoso",
          desc: "Más grande y ornamentado para destacar a los novios visualmente."
        },
        {
          icon: "🛋️",
          title: "Confort premium",
          desc: "Tapizado de alta calidad para horas de uso sin incomodidad."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisado minuciosamente antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Instalamos en la posición acordada de la mesa principal."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany",
          icon: "🪑"
        },
        {
          name: "Florería",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía",
          href: "/fotografia-video",
          icon: "📸"
        },
        {
          name: "Vajillas",
          href: "/vajillas-estilo",
          icon: "🍴"
        }
      ]
    },
    {
      slug: "silla-gamma",
      title: "Silla Gamma",
      headline: "Comodidad y estilo contemporáneo en tono arena para eventos modernos",
      seoTitle: "Silla Gamma para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Silla Gamma en arena en CDMX. Diseño contemporáneo y confortable para bodas, eventos al aire libre y celebraciones que buscan armonía con la naturaleza.",
      description: [
        "La Silla Gamma combina comodidad y estilo contemporáneo en un tono arena cálido que armoniza con casi cualquier decoración. Su diseño equilibrado, con respaldo ergonómico y asiento generoso, garantiza confort durante eventos prolongados.",
        "Su color arena la convierte en la compañera perfecta de mesas de madera rústica, tablones de caoba o cualquier superficie natural. Los organizadores la eligen frecuentemente para bodas al aire libre y eventos donde la paleta de colores sigue tonos tierra y naturales.",
        "Con 200 unidades disponibles en este modelo, podemos atender eventos medianos y grandes con la consistencia visual que todo evento bien cuidado requiere."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Silla Tiffany",
          href: "/sillas/tiffany"
        },
        {
          name: "Silla Ghost",
          href: "/sillas/ghost"
        },
        {
          name: "Silla Smith",
          href: "/sillas/smith"
        },
        {
          name: "Silla Camila",
          href: "/sillas/camila"
        },
        {
          name: "Silla Basket",
          href: "/sillas/basket"
        },
        {
          name: "Silla Antonella",
          href: "/sillas/antonella"
        },
        {
          name: "Silla Crossback",
          href: "/sillas/crossback"
        },
        {
          name: "Silla Louis XV",
          href: "/sillas/louis-xv"
        },
        {
          name: "Silla Wishbone",
          href: "/sillas/wishbone"
        },
        {
          name: "Silla Tolix",
          href: "/sillas/tolix"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "Color",
          desc: "Arena cálido. Armoniza con paletas naturales y terrosas."
        },
        {
          icon: "🛋️",
          title: "Comodidad",
          desc: "Respaldo ergonómico para eventos de larga duración."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisada y limpia antes de cada entrega."
        },
        {
          icon: "🔢",
          title: "Disponibilidad",
          desc: "200 unidades disponibles."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "mesa-redonda",
      title: "Mesa Redonda",
      headline: "La configuración clásica que favorece la convivencia en bodas y banquetes",
      seoTitle: "Mesa Redonda para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Mesa Redonda en CDMX y área metropolitana. Disponible en caoba y mármol. Ideal para bodas, quinceañeras y eventos corporativos.",
      description: [
        "La Mesa Redonda es la elección por excelencia para bodas y banquetes formales en México. Su forma circular facilita la conversación entre los invitados y crea una distribución equitativa del espacio en cualquier salón o jardín.",
        "Disponible en acabado caoba natural y mármol blanco, la Mesa Redonda puede combinarse con cualquiera de nuestras sillas del catálogo para crear el conjunto perfecto. Ofrecemos manteles coordinados para complementar la decoración.",
        "Con capacidad para 8 a 10 personas por mesa, es la opción más popular para eventos de más de 100 comensales. Contamos con amplio stock para abastecer bodas grandes sin problema."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Mesa Cuadrada",
          href: "/mesas/cuadrada"
        },
        {
          name: "Tablón",
          href: "/mesas/tablon"
        },
        {
          name: "Mesa Serpentina",
          href: "/mesas/serpentina"
        },
        {
          name: "Mesa de Picnic",
          href: "/mesas/picnic"
        },
        {
          name: "Tablón Infantil",
          href: "/mesas/tablon-infantil"
        }
      ],
      included: [
        {
          icon: "🪑",
          title: "Acabados",
          desc: "Caoba natural y mármol blanco. Perfectas para cualquier tema decorativo."
        },
        {
          icon: "👥",
          title: "Capacidad",
          desc: "8 a 10 personas por mesa. Ideal para bodas y banquetes."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Transportamos y montamos las mesas en el venue acordado."
        },
        {
          icon: "📋",
          title: "Mantelería",
          desc: "Pregúntanos por opciones de manteles coordinados."
        }
      ],
      varieties: [
        {
          name: "Caoba Natural",
          desc: "Clásica y versátil. Combina con sillas de cualquier estilo."
        },
        {
          name: "Mármol Blanco",
          desc: "Elegante y luminosa. Perfecta para bodas contemporáneas."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "mesa-cuadrada",
      title: "Mesa Cuadrada",
      headline: "Estilo moderno y versátil para eventos íntimos o corporativos",
      seoTitle: "Mesa Cuadrada para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Mesa Cuadrada en CDMX. Disponible en Black Trendy, Caoba, Mármol Negro, Mármol Blanco y Vintage. Para bodas, corporativos y eventos modernos.",
      description: [
        "La Mesa Cuadrada es la opción preferida para eventos con un estilo más contemporáneo o industrial. Su geometría perfecta permite distribuciones originales en el salón y crea ambientes más íntimos y exclusivos.",
        "Disponible en cinco acabados —Black Trendy, Caoba, Mármol Negro, Mármol Blanco y Vintage—, cada una comunica una personalidad distinta y se adapta a diferentes temas decorativos, desde bodas glamorosas hasta eventos corporativos.",
        "Perfecta para mesas de 4 personas, también se pueden unir para crear largas tabletas o configuraciones en forma de U. Su versatilidad la convierte en la favorita de wedding planners y coordinadores de eventos."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Mesa Redonda",
          href: "/mesas/redonda"
        },
        {
          name: "Tablón",
          href: "/mesas/tablon"
        },
        {
          name: "Mesa Serpentina",
          href: "/mesas/serpentina"
        },
        {
          name: "Mesa de Picnic",
          href: "/mesas/picnic"
        },
        {
          name: "Tablón Infantil",
          href: "/mesas/tablon-infantil"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "5 acabados",
          desc: "Black Trendy, Caoba, Mármol Negro, Mármol Blanco y Vintage."
        },
        {
          icon: "🔀",
          title: "Configurable",
          desc: "Se pueden unir para crear tablones largos o mesas en U."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Montamos y desmontamos las mesas en tu venue."
        },
        {
          icon: "✅",
          title: "Impecable",
          desc: "Revisadas y limpias antes de cada entrega."
        }
      ],
      varieties: [
        {
          name: "Black Trendy",
          desc: "Negra con acabado brillante. Para eventos glamorosos y nocturnos."
        },
        {
          name: "Caoba",
          desc: "Clásica y cálida. Compatible con cualquier decoración."
        },
        {
          name: "Mármol Negro",
          desc: "Sofisticada y dramática. Para eventos de lujo."
        },
        {
          name: "Mármol Blanco",
          desc: "Limpia y luminosa. Perfecta para bodas y eventos de día."
        },
        {
          name: "Vintage",
          desc: "Rústica y con carácter. Ideal para eventos bohemios o campestres."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "mesa-tablon",
      title: "Tablón",
      headline: "Mesas largas y elegantes para banquetes y bodas de estilo europeo",
      seoTitle: "Tablón Mesa Rectangular para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Tablones y Mesas Rectangulares en CDMX. En caoba, mármol, vintage y edición novios. Para bodas campestres, banquetes y eventos estilo europeo.",
      description: [
        "El Tablón o Mesa Rectangular es el símbolo de los grandes banquetes y bodas de estilo europeo. Su formato alargado permite que todos los comensales compartan un mismo espacio, creando una atmósfera cálida y communal.",
        "Disponible en Caoba Natural, Mármol Blanco, Mármol Negro, Vintage y la exclusiva versión para Novios. También contamos con Tablón de Picnic en Caoba y Vintage para eventos al aire libre.",
        "Ideal para bodas estilo civil, celebraciones campestres y eventos corporativos que buscan un ambiente diferente al tradicional salón con mesas redondas. Con capacidad para 10 a 20 personas por tablón."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Mesa Redonda",
          href: "/mesas/redonda"
        },
        {
          name: "Mesa Cuadrada",
          href: "/mesas/cuadrada"
        },
        {
          name: "Mesa Serpentina",
          href: "/mesas/serpentina"
        },
        {
          name: "Mesa de Picnic",
          href: "/mesas/picnic"
        },
        {
          name: "Tablón Infantil",
          href: "/mesas/tablon-infantil"
        }
      ],
      included: [
        {
          icon: "🎨",
          title: "Variedades",
          desc: "Caoba, Mármol Blanco, Mármol Negro, Vintage y edición Novios."
        },
        {
          icon: "👥",
          title: "Capacidad",
          desc: "10 a 20 personas por tablón según la configuración."
        },
        {
          icon: "🌿",
          title: "Ideal para exteriores",
          desc: "Perfectos para jardines, haciendas y bodas campestres."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Montamos y colocamos los tablones en el venue."
        }
      ],
      varieties: [
        {
          name: "Caoba Natural",
          desc: "Cálido y versátil. El clásico para bodas campestres."
        },
        {
          name: "Mármol Blanco",
          desc: "Elegante y contemporáneo. Ideal para bodas modernas."
        },
        {
          name: "Mármol Negro",
          desc: "Dramático y lujoso. Para eventos de noche o formales."
        },
        {
          name: "Vintage",
          desc: "Con carácter y textura. Para ambientes boho y rústicos."
        },
        {
          name: "Novios",
          desc: "Edición especial para la mesa de los novios. Sofisticada y memorable."
        },
        {
          name: "Picnic Caoba",
          desc: "Con bancas integradas. Para eventos al aire libre."
        },
        {
          name: "Picnic Vintage",
          desc: "Versión rústica con bancas. Para festivales y bodas en jardín."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "mesa-serpentina",
      title: "Mesa Serpentina",
      headline: "La mesa más original del mercado para espacios únicos e impactantes",
      seoTitle: "Mesa Serpentina para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Mesa Serpentina en CDMX. Diseño sinuoso que crea configuraciones únicas para bodas y eventos de alto impacto visual.",
      description: [
        "La Mesa Serpentina es una de las propuestas de mobiliario más innovadoras del mercado de eventos en México. Su diseño sinuoso y curvilíneo crea configuraciones que ninguna mesa convencional puede lograr.",
        "Perfecta para eventos que buscan destacar visualmente, la Mesa Serpentina convierte el salón de banquetes en una experiencia estética completa. Ideal para novios y anfitriones que quieren romper con la tradición.",
        "Con mantelería y florería adecuadas, la Mesa Serpentina se transforma en la pieza artística central del evento. Disponible para renta en CDMX y área metropolitana."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Mesa Redonda",
          href: "/mesas/redonda"
        },
        {
          name: "Mesa Cuadrada",
          href: "/mesas/cuadrada"
        },
        {
          name: "Tablón",
          href: "/mesas/tablon"
        },
        {
          name: "Mesa de Picnic",
          href: "/mesas/picnic"
        },
        {
          name: "Tablón Infantil",
          href: "/mesas/tablon-infantil"
        }
      ],
      included: [
        {
          icon: "✨",
          title: "Diseño único",
          desc: "Forma sinuosa que crea el WOW factor en cualquier evento."
        },
        {
          icon: "🎨",
          title: "Personalizable",
          desc: "Admite mantelería, florería y montajes creativos."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Montaje completo en tu venue con nuestro equipo."
        },
        {
          icon: "📋",
          title: "Asesoría incluida",
          desc: "Te orientamos sobre la mejor configuración para tu espacio."
        }
      ],
      varieties: [
        {
          name: "Configuración Estándar",
          desc: "La curva característica que convierte la mesa en una obra de arte."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "mesa-picnic",
      title: "Mesa de Picnic",
      headline: "El toque casual y desenfadado para eventos al aire libre",
      seoTitle: "Mesa de Picnic para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Mesa de Picnic en CDMX. Con bancas integradas, ideal para baby showers, cumpleaños y eventos al aire libre en jardines y parques.",
      description: [
        "La Mesa de Picnic es la opción perfecta para eventos casuales y celebraciones al aire libre. Con bancas integradas y sin necesidad de sillas adicionales, simplifica la logística y crea un ambiente desenfadado y cómodo.",
        "Ideal para baby showers en jardín, cumpleaños infantiles, graduaciones al aire libre y bodas civiles con ambiente bohemio. Su formato invita a la convivencia relajada.",
        "Disponible en mesa individual o en versión tablón con bancas para grupos más grandes. Perfecta para combinar con decoración floral, guirnaldas y ambientación natural."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Mesa Redonda",
          href: "/mesas/redonda"
        },
        {
          name: "Mesa Cuadrada",
          href: "/mesas/cuadrada"
        },
        {
          name: "Tablón",
          href: "/mesas/tablon"
        },
        {
          name: "Mesa Serpentina",
          href: "/mesas/serpentina"
        },
        {
          name: "Tablón Infantil",
          href: "/mesas/tablon-infantil"
        }
      ],
      included: [
        {
          icon: "🌿",
          title: "Ideal para exterior",
          desc: "Diseñada para eventos en jardín, parque o terraza."
        },
        {
          icon: "👶",
          title: "Perfecta para niños",
          desc: "Segura y cómoda para los más pequeños del evento."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Llevamos y colocamos las mesas en tu locación."
        },
        {
          icon: "🎨",
          title: "Versátil",
          desc: "Combina con cualquier estilo de decoración casual o boho."
        }
      ],
      varieties: [
        {
          name: "Mesa Picnic Individual",
          desc: "Para 4 personas. Con bancas integradas a ambos lados."
        },
        {
          name: "Tablón Picnic Caoba",
          desc: "Versión larga en caoba. Para grupos de 8 a 12 personas."
        },
        {
          name: "Tablón Picnic Vintage",
          desc: "Versión rústica. Perfecta para eventos bohemios y campestres."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "mesa-tablon-infantil",
      title: "Tablón Infantil",
      headline: "La mesa especial para que los niños disfruten con comodidad y seguridad",
      seoTitle: "Tablón Infantil para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Tablón Infantil en CDMX. Mesa rectangular a altura de niño, ideal para la zona infantil en bodas, quinceañeras y eventos familiares.",
      description: [
        "El Tablón Infantil está diseñado específicamente para los más pequeños. Con altura adaptada a su estatura, es la solución perfecta para crear la zona infantil en bodas, quinceañeras y eventos familiares.",
        "Se recomienda combinar con nuestras Sillas Tiffany Infantiles para un conjunto completo y visualmente armónico. Podemos montar una zona infantil completa con mantelería coordinada y decoración temática.",
        "Disponible en diferentes cantidades según el número de niños en tu evento. Contáctanos y diseñamos el setup perfecto para tu celebración."
      ],
      category: "mobiliario",
      categoryLabel: "Mobiliario",
      categoryHref: "/mesas-sillas",
      related: [
        {
          name: "Mesa Redonda",
          href: "/mesas/redonda"
        },
        {
          name: "Mesa Cuadrada",
          href: "/mesas/cuadrada"
        },
        {
          name: "Tablón",
          href: "/mesas/tablon"
        },
        {
          name: "Mesa de Picnic",
          href: "/mesas/picnic"
        }
      ],
      included: [
        {
          icon: "👶",
          title: "Altura adaptada",
          desc: "Diseñado para niños. Cómodo y seguro para los más pequeños."
        },
        {
          icon: "🪑",
          title: "Combina con",
          desc: "Perfecto con Sillas Tiffany Infantiles para un conjunto completo."
        },
        {
          icon: "🎨",
          title: "Decoración",
          desc: "Admite mantelería y decoración temática para la zona infantil."
        },
        {
          icon: "🚚",
          title: "Entrega incluida",
          desc: "Montamos la zona infantil completa en tu venue."
        }
      ],
      varieties: [
        {
          name: "Tablón Infantil Estándar",
          desc: "Mesa rectangular a altura de niño. Para 6 a 8 pequeños."
        }
      ],
      whyUs: [
        {
          icon: "🎨",
          title: "Variedad de estilos",
          desc: "Más de 18 modelos de sillas distintos para complementar cualquier decoración o temática de evento."
        },
        {
          icon: "✅",
          title: "Calidad garantizada",
          desc: "Mobiliario en perfectas condiciones, limpio y revisado antes de cada entrega."
        },
        {
          icon: "🚚",
          title: "Entrega e instalación",
          desc: "Llevamos el mobiliario a tu venue y lo instalamos para que tú solo te preocupes de disfrutar."
        },
        {
          icon: "📋",
          title: "Asesoría personalizada",
          desc: "Te ayudamos a elegir el modelo que mejor combina con tu decoración, tema y presupuesto."
        }
      ],
      integralServices: [
        {
          name: "Mesas y Sillas",
          href: "/mesas-sillas",
          icon: "🪑"
        },
        {
          name: "Banquete Formal",
          href: "/banquetes",
          icon: "🍽️"
        },
        {
          name: "Florería y Decoración",
          href: "/floreria-decoracion",
          icon: "💐"
        },
        {
          name: "Vajillas y Estilo",
          href: "/vajillas-estilo",
          icon: "🍴"
        },
        {
          name: "Wedding Planner",
          href: "/wedding-planner",
          icon: "📋"
        },
        {
          name: "Fotografía y Video",
          href: "/fotografia-video",
          icon: "📸"
        }
      ]
    },
    {
      slug: "barra-clasica-blanca",
      title: "Barra Clásica Blanca",
      headline: "Barra de servicio elegante en blanco para cócteles, brindis y estaciones",
      seoTitle: "Barra Clásica Blanca para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Barra Clásica Blanca en CDMX. Mobiliario de barra para bodas, XV años y eventos corporativos. Entrega e instalación incluidas.",
      description: [
        "La Barra Clásica Blanca es la pieza de mobiliario ideal para montar una estación de bebidas, cócteles o un punto de recepción elegante. Su acabado blanco limpio combina con ambientaciones modernas, románticas y corporativas.",
        "Forma parte del catálogo de Barras de Bodasesor (Mobiliario y Decoración). Ideal junto a sillas Tiffany, Camila o Avant Garde, y como complemento de salas y periqueras en la zona lounge.",
        "Incluimos entrega, armado y retiro. Cotiza por WhatsApp la cantidad de barras según aforo y tipo de servicio (cóctel, open bar o estación de bienvenida)."
      ],
      category: "mobiliario",
      categoryLabel: "Barras",
      categoryHref: "/barras",
      related: [
        { name: "Barra XL Clásica Negra", href: "/barras/xl-clasica-negra" },
        { name: "Barra Rústica", href: "/barras/rustica" },
        { name: "Barra Industrial", href: "/barras/industrial" },
        { name: "Mesas y Sillas", href: "/mesas-sillas" },
        { name: "Salas y Periqueras", href: "/salas-periqueras" }
      ],
      included: [
        { icon: "🍸", title: "Uso ideal", desc: "Cócteles, open bar, estación de bienvenida o postres." },
        { icon: "🤍", title: "Acabado blanco", desc: "Luminoso y versátil para bodas y corporativos." },
        { icon: "✅", title: "Impecable", desc: "Revisada y limpia antes de cada evento." },
        { icon: "🚚", title: "Entrega incluida", desc: "Montamos la barra en el venue acordado." }
      ],
      varieties: [
        { name: "Barra Clásica Blanca", desc: "Formato estándar para estaciones de bebidas y recepción." }
      ],
      whyUs: [
        { icon: "🎨", title: "Catálogo completo", desc: "Barras, mesas, sillas y combinaciones coordinadas en un solo proveedor." },
        { icon: "✅", title: "Calidad garantizada", desc: "Mobiliario en perfectas condiciones, limpio y revisado." },
        { icon: "🚚", title: "Entrega e instalación", desc: "Llevamos e instalamos para que tú solo disfrutes." },
        { icon: "📋", title: "Asesoría", desc: "Te ayudamos a elegir barra según aforo y estilo del evento." }
      ],
      integralServices: [
        { name: "Mesas y Sillas", href: "/mesas-sillas", icon: "🪑" },
        { name: "Banquete Formal", href: "/banquetes", icon: "🍽️" },
        { name: "Barras de Bebidas", href: "/barra-bebidas", icon: "🍹" },
        { name: "Florería y Decoración", href: "/floreria-decoracion", icon: "💐" },
        { name: "Salas y Periqueras", href: "/salas-periqueras", icon: "🛋️" },
        { name: "Wedding Planner", href: "/wedding-planner", icon: "📋" }
      ]
    },
    {
      slug: "barra-xl-clasica-negra",
      title: "Barra XL Clásica Negra",
      headline: "Barra XL en negro para open bar de alto impacto visual",
      seoTitle: "Barra XL Clásica Negra para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Barra XL Clásica Negra en CDMX. Formato amplio para open bar, galas y eventos corporativos. Entrega e instalación incluidas.",
      description: [
        "La Barra XL Clásica Negra ofrece mayor frente de servicio para open bar, galas y eventos con alto flujo de invitados. El acabado negro aporta contraste y sofisticación en salones y loft.",
        "Está en el catálogo de Barras junto a la versión clásica blanca. Combina especialmente con Mesa Black Shine, Silla Camila negra y ambientaciones evening.",
        "Te ayudamos a dimensionar cuántas Barras XL necesitas según aforo y tipo de barra (cócteles, mezcal, champagne). Entrega, armado y retiro incluidos."
      ],
      category: "mobiliario",
      categoryLabel: "Barras",
      categoryHref: "/barras",
      related: [
        { name: "Barra Clásica Blanca", href: "/barras/clasica-blanca" },
        { name: "Barra Industrial", href: "/barras/industrial" },
        { name: "Barra Rústica", href: "/barras/rustica" },
        { name: "Silla Camila", href: "/sillas/camila" },
        { name: "Mesas y Sillas", href: "/mesas-sillas" }
      ],
      included: [
        { icon: "⬛", title: "Formato XL", desc: "Mayor frente de atención para eventos grandes." },
        { icon: "🖤", title: "Acabado negro", desc: "Sofisticado para galas, after parties y corporativos." },
        { icon: "✅", title: "Impecable", desc: "Revisada y limpia antes de cada evento." },
        { icon: "🚚", title: "Entrega incluida", desc: "Montaje profesional en tu venue." }
      ],
      varieties: [
        { name: "Barra XL Clásica Negra", desc: "Versión amplia para open bar y estaciones premium." }
      ],
      whyUs: [
        { icon: "🎨", title: "Catálogo completo", desc: "Barras, mesas, sillas y combinaciones coordinadas." },
        { icon: "✅", title: "Calidad garantizada", desc: "Mobiliario limpio y revisado." },
        { icon: "🚚", title: "Entrega e instalación", desc: "Montaje incluido." },
        { icon: "📋", title: "Asesoría", desc: "Dimensionamos barras según aforo y servicio." }
      ],
      integralServices: [
        { name: "Mesas y Sillas", href: "/mesas-sillas", icon: "🪑" },
        { name: "Banquete Formal", href: "/banquetes", icon: "🍽️" },
        { name: "Cocteles y Mixología", href: "/cocteles-mixologia", icon: "🍸" },
        { name: "Salas y Periqueras", href: "/salas-periqueras", icon: "🛋️" },
        { name: "Audio e Iluminación", href: "/audio-iluminacion-video", icon: "💡" },
        { name: "Wedding Planner", href: "/wedding-planner", icon: "📋" }
      ]
    },
    {
      slug: "barra-rustica",
      title: "Barra Rústica",
      headline: "Barra de madera para bodas en jardín, hacienda y estilo campestre",
      seoTitle: "Barra Rústica para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Barra Rústica en CDMX. Ideal para bodas en jardín, haciendas y eventos campestres. Entrega e instalación incluidas.",
      description: [
        "La Barra Rústica aporta calidez y textura de madera a la zona de bebidas. Es la favorita para bodas en jardín, haciendas, ranchos y celebraciones con estética natural.",
        "Pertenece al catálogo de Barras de Mobiliario y Decoración. Combina muy bien con Tablón Caoba, Silla Crossback y ambientaciones boho o campestres.",
        "Cotiza el set completo: barra + sillas altas o periqueras + iluminación. Entrega, armado y retiro incluidos en toda la cobertura Bodasesor."
      ],
      category: "mobiliario",
      categoryLabel: "Barras",
      categoryHref: "/barras",
      related: [
        { name: "Barra Industrial", href: "/barras/industrial" },
        { name: "Barra Clásica Blanca", href: "/barras/clasica-blanca" },
        { name: "Tablón", href: "/mesas/tablon" },
        { name: "Silla Crossback", href: "/sillas/crossback" },
        { name: "Mesas y Sillas", href: "/mesas-sillas" }
      ],
      included: [
        { icon: "🪵", title: "Acabado madera", desc: "Look rústico-chic para exteriores e interiores." },
        { icon: "🌿", title: "Ideal para", desc: "Jardines, haciendas, ranchos y bodas campestres." },
        { icon: "✅", title: "Impecable", desc: "Lista y revisada para cada montaje." },
        { icon: "🚚", title: "Entrega incluida", desc: "Instalamos en tu venue." }
      ],
      varieties: [
        { name: "Barra Rústica", desc: "Diseño en madera para estaciones de bebidas con estilo natural." }
      ],
      whyUs: [
        { icon: "🎨", title: "Catálogo completo", desc: "Barras coordinadas con mesas y sillas del mismo estilo." },
        { icon: "✅", title: "Calidad garantizada", desc: "Mobiliario limpio y en buen estado." },
        { icon: "🚚", title: "Entrega e instalación", desc: "Montaje profesional incluido." },
        { icon: "📋", title: "Asesoría", desc: "Armamos el set rústico completo para tu evento." }
      ],
      integralServices: [
        { name: "Mesas y Sillas", href: "/mesas-sillas", icon: "🪑" },
        { name: "Banquete Mexicano", href: "/banquete-mexicano", icon: "🌮" },
        { name: "Florería y Decoración", href: "/floreria-decoracion", icon: "💐" },
        { name: "Salas y Periqueras", href: "/salas-periqueras", icon: "🛋️" },
        { name: "Entelados", href: "/entelados", icon: "✨" },
        { name: "Wedding Planner", href: "/wedding-planner", icon: "📋" }
      ]
    },
    {
      slug: "barra-industrial",
      title: "Barra Industrial",
      headline: "Barra metal y madera para loft, after party y ambientaciones urbanas",
      seoTitle: "Barra Industrial para Eventos | Renta | Bodasesor",
      seoDescription: "Renta de Barra Industrial en CDMX. Estilo loft/urbano para after parties, brandings y bodas contemporáneas. Entrega e instalación incluidas.",
      description: [
        "La Barra Industrial combina estructura metálica y madera para un look loft contemporáneo. Perfecta para after parties, activaciones de marca, bodas urbanas y espacios con concreto o ladrillo a la vista.",
        "Forma parte del catálogo de Barras de Mobiliario y Decoración. Combina con Silla Tolix, Silla Avant Garde y periqueras industriales del catálogo de salas.",
        "Te asesoramos en iluminación puntual y recorrido de invitados para que la barra sea un punto de atracción. Entrega, armado y retiro incluidos."
      ],
      category: "mobiliario",
      categoryLabel: "Barras",
      categoryHref: "/barras",
      related: [
        { name: "Barra Rústica", href: "/barras/rustica" },
        { name: "Barra XL Clásica Negra", href: "/barras/xl-clasica-negra" },
        { name: "Silla Tolix", href: "/sillas/tolix" },
        { name: "Silla Avant Garde", href: "/sillas/avant-garde" },
        { name: "Mesas y Sillas", href: "/mesas-sillas" }
      ],
      included: [
        { icon: "⚙️", title: "Estilo loft", desc: "Metal y madera para ambientaciones urbanas." },
        { icon: "🏙️", title: "Ideal para", desc: "After parties, brandings y bodas contemporáneas." },
        { icon: "✅", title: "Impecable", desc: "Revisada y lista para montaje." },
        { icon: "🚚", title: "Entrega incluida", desc: "Instalación profesional en tu venue." }
      ],
      varieties: [
        { name: "Barra Industrial", desc: "Diseño urbano para estaciones de bebidas de alto impacto." }
      ],
      whyUs: [
        { icon: "🎨", title: "Catálogo completo", desc: "Coordinamos barra, sillas y lounge en el mismo estilo." },
        { icon: "✅", title: "Calidad garantizada", desc: "Mobiliario limpio y revisado." },
        { icon: "🚚", title: "Entrega e instalación", desc: "Montaje incluido." },
        { icon: "📋", title: "Asesoría", desc: "Diseñamos la zona de barra con iluminación y flujo." }
      ],
      integralServices: [
        { name: "Mesas y Sillas", href: "/mesas-sillas", icon: "🪑" },
        { name: "Audio e Iluminación", href: "/audio-iluminacion-video", icon: "💡" },
        { name: "Cocteles y Mixología", href: "/cocteles-mixologia", icon: "🍸" },
        { name: "Salas y Periqueras", href: "/salas-periqueras", icon: "🛋️" },
        { name: "Shows", href: "/shows", icon: "🎭" },
        { name: "Wedding Planner", href: "/wedding-planner", icon: "📋" }
      ]
    },
    {
      slug: "como-organizar-boda-perfecta-mexico",
      title: "Cómo Organizar la Boda Perfecta en México: Guía Completa 2026",
      date: "2026-03-10",
      category: "Bodas",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
      excerpt: "Guía paso a paso para planear la boda de tus sueños: desde elegir el salón hasta el menú ideal.",
      body: [
        "El <strong>organización de boda</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>bodas en México</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>boda perfecta</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>organización de boda</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>wedding planner</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>bodas en México</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>salón de bodas</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>boda perfecta</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>flores para boda</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>catering nupcial</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>boda perfecta</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>wedding planner</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>organización de boda</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>fotografía de bodas</strong> en el contexto de <strong>bodas en México</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>salón de bodas</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>boda perfecta</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>wedding planner</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>catering nupcial</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>organización de boda</strong> y en la organización integral de <strong>bodas en México</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "banquetes-xv-anos-guia-completa",
      title: "Banquetes para Quinceañera: Guía Completa de Menús y Servicios 2026",
      date: "2026-02-14",
      category: "Banquetes",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
      excerpt: "Todo para elegir el banquete ideal en una quinceañera: menús, cantidades y tendencias.",
      body: [
        "El <strong>banquete para quinceañera</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>quinceañeras en México</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>catering para quinceañeras</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>banquete para quinceañera</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>menú de quinceañera</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>quinceañeras en México</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>pastel de quince años</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>catering para quinceañeras</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>servicio de meseros</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>bebidas para quinceañera</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>catering para quinceañeras</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>menú de quinceañera</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>banquete para quinceañera</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>proveedor de catering</strong> en el contexto de <strong>quinceañeras en México</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>pastel de quince años</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>catering para quinceañeras</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>menú de quinceañera</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>bebidas para quinceañera</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>banquete para quinceañera</strong> y en la organización integral de <strong>quinceañeras en México</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "tendencias-decoracion-floral-eventos-2025",
      title: "Tendencias en Decoración Floral para Eventos 2026: Flores que Transforman",
      date: "2026-01-20",
      category: "Decoración",
      image: "https://images.unsplash.com/photo-1487530811015-780880679a78?w=1200&q=80",
      excerpt: "Las propuestas florales más buscadas: de los arcos de flores a los jardines verticales.",
      body: [
        "El <strong>decoración floral</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>arcos florales para bodas</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>flores para eventos</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>decoración floral</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>centros de mesa florales</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>arcos florales para bodas</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>rosas de jardín</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>flores para eventos</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>floristería para eventos</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>dalias nacionales</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>flores para eventos</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>centros de mesa florales</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>decoración floral</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>decoración sostenible</strong> en el contexto de <strong>arcos florales para bodas</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>rosas de jardín</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>flores para eventos</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>centros de mesa florales</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>dalias nacionales</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>decoración floral</strong> y en la organización integral de <strong>arcos florales para bodas</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "catering-corporativo-todo-lo-que-debes-saber",
      title: "Catering Corporativo: Todo lo que Debes Saber para tu Evento",
      date: "2026-03-22",
      category: "Empresarial",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80",
      excerpt: "Cómo elegir el servicio de catering correcto para juntas, lanzamientos y convenciones.",
      body: [
        "El <strong>catering corporativo</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>eventos empresariales</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>coffee break corporativo</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>catering corporativo</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>menú para empresas</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>eventos empresariales</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>proveedor de catering</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>coffee break corporativo</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>catering de calidad</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>logística de catering</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>coffee break corporativo</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>menú para empresas</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>catering corporativo</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>servicio empresarial</strong> en el contexto de <strong>eventos empresariales</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>proveedor de catering</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>coffee break corporativo</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>menú para empresas</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>logística de catering</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>catering corporativo</strong> y en la organización integral de <strong>eventos empresariales</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "musica-perfecta-para-tu-boda",
      title: "La Música Perfecta para tu Boda: DJ, Grupo en Vivo o Mariachi",
      date: "2026-02-28",
      category: "Bodas",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=80",
      excerpt: "DJ, mariachi, banda o grupo en vivo: ventajas de cada opción y cómo combinarlas.",
      body: [
        "El <strong>música para bodas</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>DJ profesional de bodas</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>mariachi en bodas</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>música para bodas</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>grupos musicales en vivo</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>DJ profesional de bodas</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>ceremonía de boda musical</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>mariachi en bodas</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>lista de reproducción boda</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>sonido para eventos</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>mariachi en bodas</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>grupos musicales en vivo</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>música para bodas</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>equipo de audio</strong> en el contexto de <strong>DJ profesional de bodas</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>ceremonía de boda musical</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>mariachi en bodas</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>grupos musicales en vivo</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>sonido para eventos</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>música para bodas</strong> y en la organización integral de <strong>DJ profesional de bodas</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "ideas-baby-shower-originales-2025",
      title: "Ideas para un Baby Shower Original en 2026: Tendencias y Decoración",
      date: "2026-01-15",
      category: "Celebraciones",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
      excerpt: "Decoración, menú y actividades que harán del baby shower una fiesta memorable.",
      body: [
        "El <strong>baby shower original</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>decoración baby shower</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>menú de baby shower</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>baby shower original</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>actividades baby shower</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>decoración baby shower</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>gender reveal</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>menú de baby shower</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>recuerdos para invitadas</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>pastel baby shower</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>menú de baby shower</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>actividades baby shower</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>baby shower original</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>decoración botánica</strong> en el contexto de <strong>decoración baby shower</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>gender reveal</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>menú de baby shower</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>actividades baby shower</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>pastel baby shower</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>baby shower original</strong> y en la organización integral de <strong>decoración baby shower</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "mejores-espacios-para-eventos-en-mexico",
      title: "Los Mejores Espacios para Eventos en México: Salones, Haciendas y Jardines",
      date: "2026-02-05",
      category: "Espacios",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
      excerpt: "Salones, haciendas, jardines y terrazas: cómo elegir el venue ideal.",
      body: [
        "El <strong>espacios para eventos</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>salones de eventos CDMX</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>haciendas para bodas</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>espacios para eventos</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>jardines para eventos</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>salones de eventos CDMX</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>venue de boda</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>haciendas para bodas</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>renta de salón</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>terraza para eventos</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>haciendas para bodas</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>jardines para eventos</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>espacios para eventos</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>espacio de celebración</strong> en el contexto de <strong>salones de eventos CDMX</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>venue de boda</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>haciendas para bodas</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>jardines para eventos</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>terraza para eventos</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>espacios para eventos</strong> y en la organización integral de <strong>salones de eventos CDMX</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "fotografia-de-bodas-consejos-esenciales",
      title: "Fotografía de Bodas: Consejos Esenciales para Elegir al Fotógrafo Ideal",
      date: "2026-03-15",
      category: "Bodas",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=80",
      excerpt: "Cómo elegir al fotógrafo correcto, qué momentos no pueden faltar y cómo prepararte.",
      body: [
        "El <strong>fotografía de bodas</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>fotógrafo de bodas</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>estilos de fotografía nupcial</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>fotografía de bodas</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>sesión de novios</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>fotógrafo de bodas</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>video de bodas</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>estilos de fotografía nupcial</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>reportaje de boda</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>álbum nupcial</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>estilos de fotografía nupcial</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>sesión de novios</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>fotografía de bodas</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>cineastas de boda</strong> en el contexto de <strong>fotógrafo de bodas</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>video de bodas</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>estilos de fotografía nupcial</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>sesión de novios</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>álbum nupcial</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>fotografía de bodas</strong> y en la organización integral de <strong>fotógrafo de bodas</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "pasteles-de-boda-tendencias-2025",
      title: "Pasteles de Boda 2026: Tendencias, Sabores y Todo lo que Necesitas",
      date: "2026-02-20",
      category: "Bodas",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1200&q=80",
      excerpt: "De los naked cakes a los pasteles de múltiples pisos: todo sobre repostería nupcial.",
      body: [
        "El <strong>pasteles de boda</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>naked cake nupcial</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>sabores de pastel de boda</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>pasteles de boda</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>pastelero de bodas</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>naked cake nupcial</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>prueba de pastel</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>sabores de pastel de boda</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>decoración de pastel</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>buttercream artesanal</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>sabores de pastel de boda</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>pastelero de bodas</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>pasteles de boda</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>repostería nupcial</strong> en el contexto de <strong>naked cake nupcial</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>prueba de pastel</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>sabores de pastel de boda</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>pastelero de bodas</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>buttercream artesanal</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>pasteles de boda</strong> y en la organización integral de <strong>naked cake nupcial</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "carpas-para-eventos-al-aire-libre",
      title: "Carpas para Eventos al Aire Libre: Tipos, Instalación y Tendencias 2026",
      date: "2026-01-25",
      category: "Mobiliario",
      image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1200&q=80",
      excerpt: "Todo sobre carpas: tipos, instalación, pisos e iluminación para una celebración perfecta.",
      body: [
        "El <strong>carpas para eventos</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>carpa transparente para boda</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>instalación de carpas</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>carpas para eventos</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>piso para carpas</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>carpa transparente para boda</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>iluminación de carpas</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>instalación de carpas</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>renta de carpas</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>carpa pagoda</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>instalación de carpas</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>piso para carpas</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>carpas para eventos</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>carpa de cristal</strong> en el contexto de <strong>carpa transparente para boda</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>iluminación de carpas</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>instalación de carpas</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>piso para carpas</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>carpa pagoda</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>carpas para eventos</strong> y en la organización integral de <strong>carpa transparente para boda</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "votos-matrimoniales-2024",
      title: "Votos Matrimoniales 2026: Palabras que Quedan para Siempre",
      date: "2026-03-01",
      category: "Bodas",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
      excerpt: "Guía para escribir los votos matrimoniales más emotivos y auténticos de tu boda.",
      body: [
        "El <strong>votos matrimoniales</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>promesas nupciales</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>ceremonia de boda</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>votos matrimoniales</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>boda en México</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>promesas nupciales</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>votos personalizados</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>ceremonia de boda</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>boda religiosa</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>palabras de amor</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>ceremonia de boda</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>boda en México</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>votos matrimoniales</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>wedding planner México</strong> en el contexto de <strong>promesas nupciales</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>votos personalizados</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>ceremonia de boda</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>boda en México</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>palabras de amor</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>votos matrimoniales</strong> y en la organización integral de <strong>promesas nupciales</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "traje-de-novio-2024",
      title: "Traje de Novio 2026: Tendencias y Cómo Elegir el Perfecto",
      date: "2026-02-10",
      category: "Bodas",
      image: "https://images.unsplash.com/photo-1594938298603-3f4fdb1cad5e?w=1200&q=80",
      excerpt: "Guía completa para que el novio luzca impecable: corte, color, tela y accesorios ideales.",
      body: [
        "El <strong>traje de novio</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>moda nupcial masculina</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>esmoquin de boda</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>traje de novio</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>traje formal México</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>moda nupcial masculina</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>look de novio</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>esmoquin de boda</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>estilismo nupcial</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>ropa de boda</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>esmoquin de boda</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>traje formal México</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>traje de novio</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>sastrería para boda</strong> en el contexto de <strong>moda nupcial masculina</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>look de novio</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>esmoquin de boda</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>traje formal México</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>ropa de boda</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>traje de novio</strong> y en la organización integral de <strong>moda nupcial masculina</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "tipos-de-mobiliario-2025",
      title: "Tipos de Mobiliario para Eventos: Guía Completa 2026",
      date: "2026-01-30",
      category: "Mobiliario",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
      excerpt: "Descubre todos los tipos de mobiliario para eventos: mesas, sillas, periqueras y más.",
      body: [
        "El <strong>mobiliario para eventos</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>tipos de mobiliario</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>renta de mobiliario</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>mobiliario para eventos</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>mesas para eventos</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>tipos de mobiliario</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>sillas para eventos</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>renta de mobiliario</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>muebles lounge</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>periqueras de bar</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>renta de mobiliario</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>mesas para eventos</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>mobiliario para eventos</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>mobiliario de diseño</strong> en el contexto de <strong>tipos de mobiliario</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>sillas para eventos</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>renta de mobiliario</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>mesas para eventos</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>periqueras de bar</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>mobiliario para eventos</strong> y en la organización integral de <strong>tipos de mobiliario</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "tiempos-banquete",
      title: "Tiempos del Banquete: Cómo Organizar el Timing Perfecto",
      date: "2026-03-05",
      category: "Banquetes",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
      excerpt: "Todo sobre los tiempos correctos del banquete: desde el coctel hasta el postre.",
      body: [
        "El <strong>tiempos de banquete</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>coordinación de banquete</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>flujo del evento</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>tiempos de banquete</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>coctel de bienvenida</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>coordinación de banquete</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>menú de banquete</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>flujo del evento</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>timing de bodas</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>servicio de meseros</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>flujo del evento</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>coctel de bienvenida</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>tiempos de banquete</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>cronograma de evento</strong> en el contexto de <strong>coordinación de banquete</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>menú de banquete</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>flujo del evento</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>coctel de bienvenida</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>servicio de meseros</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>tiempos de banquete</strong> y en la organización integral de <strong>coordinación de banquete</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "tiempo-perfecto-de-una-boda-2024",
      title: "El Tiempo Perfecto de una Boda: Cómo Organizar tu Timeline",
      date: "2026-02-25",
      category: "Bodas",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
      excerpt: "Cómo estructurar el horario perfecto de tu boda para que todo fluya sin contratiempos.",
      body: [
        "El <strong>timeline de boda</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>horario de boda</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>wedding planner México</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>timeline de boda</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>coordinación nupcial</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>horario de boda</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>flujo del evento</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>wedding planner México</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>ceremonial de bodas</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>organización de boda</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>wedding planner México</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>coordinación nupcial</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>timeline de boda</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>planificación nupcial</strong> en el contexto de <strong>horario de boda</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>flujo del evento</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>wedding planner México</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>coordinación nupcial</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>organización de boda</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>timeline de boda</strong> y en la organización integral de <strong>horario de boda</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    },
    {
      slug: "tendencias-en-un-baby-shower",
      title: "Tendencias en Baby Shower 2026: Todo lo que Está de Moda",
      date: "2026-01-10",
      category: "Celebraciones",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
      excerpt: "Las tendencias más actuales en decoración, menú y actividades para baby showers.",
      body: [
        "El <strong>tendencias baby shower</strong> es uno de los pilares fundamentales en la organización de eventos en México. Cuando hablamos de <strong>decoración baby shower</strong>, nos referimos a un conjunto de elementos que van mucho más allá de lo que se ve a primera vista: involucra planificación detallada, coordinación entre múltiples proveedores y la capacidad de resolver imprevistos con profesionalismo. En Bodasesor llevamos más de una década especializándonos en crear experiencias únicas y hemos aprendido que cada decisión relacionada con <strong>baby shower 2026</strong> tiene un impacto directo en la satisfacción de los invitados. La diferencia entre un evento ordinario y uno extraordinario está en los detalles, en la calidad de los materiales, en el sabor de la comida y en la calidez del servicio que se presta a lo largo de toda la celebración.",
        "Al momento de planificar cualquier evento que involucre <strong>tendencias baby shower</strong>, es indispensable comenzar con suficiente anticipación para asegurar las mejores opciones del mercado. Los proveedores de mayor reputación en México tienen sus agendas reservadas con meses de antelación, especialmente durante la temporada alta que va de abril a junio y de septiembre a noviembre. El proceso de selección de <strong>menú baby shower</strong> debe incluir al menos tres cotizaciones comparables, visitas previas a las instalaciones, revisión de portafolios con eventos similares al tuyo, y conversaciones con clientes anteriores que puedan dar referencias verificables. Esta investigación inicial puede parecer laboriosa, pero es la base sobre la que descansa el éxito de toda la planificación y la tranquilidad de saber que se trabaja con los mejores profesionales disponibles en el mercado.",
        "Las tendencias actuales en <strong>decoración baby shower</strong> para 2026 reflejan un movimiento hacia experiencias más auténticas, personalizadas y conscientes. Los clientes ya no buscan replicar el evento de alguien más: quieren celebraciones que cuenten su propia historia y reflejen sus valores. En este contexto, el <strong>gender reveal</strong> ha evolucionado significativamente para ofrecer soluciones completamente a medida que se adaptan al presupuesto, al estilo y a las necesidades específicas de cada cliente. La gastronomía local, la decoración con materiales naturales y la tecnología integrada son algunos de los elementos que definen los eventos más recordados del año. Las parejas y familias mexicanas que celebran con <strong>baby shower 2026</strong> como prioridad crean memorias que perduran décadas.",
        "La sostenibilidad es un valor central que está transformando la industria de los eventos en México. El uso de <strong>celebraciones México</strong> de origen local y temporal, la reducción de plásticos de un solo uso, la gestión responsable de los residuos y la preferencia por <strong>decoración floral</strong> con prácticas ambientalmente responsables son tendencias que los organizadores más conscientes adoptan activamente. Estas prácticas no solo reducen el impacto ambiental de las celebraciones sino que también conectan profundamente con los valores de las nuevas generaciones, que son cada vez más conscientes de su huella ecológica y exigen que los eventos estén alineados con sus principios de respeto al medio ambiente y a las comunidades locales.",
        "Un aspecto que frecuentemente se subestima en la planificación de <strong>baby shower 2026</strong> es la importancia de los contratos detallados como herramienta de protección y comunicación. Un buen contrato de <strong>menú baby shower</strong> especifica con precisión los servicios a entregar, las cantidades acordadas, los horarios de montaje y desmontaje, el número de personal asignado, los equipamentos incluidos y excluidos, las condiciones de pago escalonado y la política de cancelación en diferentes escenarios. Revisar el contrato con detenimiento antes de firmar, solicitar modificaciones cuando algo no quede claro, y mantener comunicación constante durante toda la planificación son prácticas que ahorran malentendidos y garantizan que el nivel de servicio esperado se entregue puntualmente.",
        "La coordinación logística de <strong>tendencias baby shower</strong> requiere una comunicación constante entre todos los proveedores del evento. El coordinador actúa como el director de orquesta que asegura que cada elemento entre en el momento preciso: el floristero llega para el montaje antes que los invitados, el personal de cocina comienza con horas de anticipación, el equipo de audio y sonido hace sus pruebas sin interrumpir el flujo del evento. Esta <strong>coordinación profesional</strong> es lo que hace que una celebración parezca perfectamente natural desde la perspectiva de los invitados, que disfrutan sin darse cuenta del enorme trabajo que hay detrás de cada detalle cuidadosamente ejecutado.",
        "El <strong>fiesta de bebé</strong> en el contexto de <strong>decoración baby shower</strong> es un elemento diferenciador que separa a los mejores proveedores del resto. Al buscar un servicio de calidad en México considera: la experiencia demostrable en eventos similares, la capacidad operativa del equipo, el cumplimiento de normativas sanitarias y de seguridad, la transparencia en los precios, la solidez de su comunicación durante la cotización, y la calidad de sus referencias verificables. Los proveedores que destacan en todos estos criterios son quienes pueden garantizar que tu <strong>gender reveal</strong> será un éxito desde el primer momento hasta que el último invitado se despida satisfecho.",
        "El presupuesto es siempre un factor determinante en la planificación de <strong>baby shower 2026</strong>. La clave no está en gastar lo más posible, sino en distribuir inteligentemente los recursos disponibles en los elementos que mayor impacto tienen en la experiencia de los invitados. El <strong>menú baby shower</strong> suele representar entre el 35% y el 40% del presupuesto total de un evento social importante. Optimizar el gasto en <strong>decoración floral</strong> sin sacrificar calidad es posible cuando se trabaja con proveedores con experiencia que conocen dónde invertir y dónde ser más creativos para maximizar el resultado final dentro de los recursos disponibles.",
        "En Bodasesor somos expertos en <strong>tendencias baby shower</strong> y en la organización integral de <strong>decoración baby shower</strong> para todo tipo de celebraciones en Ciudad de México y área metropolitana. Nuestro equipo de profesionales está disponible para acompañarte desde la reunión inicial de concepto hasta la coordinación del día del evento. Nos enorgullece mantener relaciones de largo plazo con nuestros clientes, muchos de los cuales regresan para nuevas celebraciones y nos refieren con su familia y amigos. Contáctanos hoy mismo a través de nuestro <strong>WhatsApp</strong> y recibe una consulta inicial gratuita donde exploraremos las mejores opciones para hacer de tu evento una experiencia verdaderamente única que supere todas tus expectativas."
      ]
    }
  ];

function normalizeForServicePage(p) {
  if (!p) return null;
  if (p.title && Array.isArray(p.description)) return p;
  if (!p.name) return p;
  return {
    ...p,
    title: p.title || p.name,
    headline: p.headline || p.tagline || p.name,
    description: Array.isArray(p.description)
      ? p.description
      : [p.desc, p.short].filter(Boolean),
    seoTitle: p.seoTitle || `${p.name} | Bodasesor`,
    seoDescription: p.seoDescription || p.short || p.desc || '',
    included: p.included ?? (Array.isArray(p.incluye)
      ? p.incluye.map((text) => ({ icon: '✓', title: text, desc: text }))
      : []),
    category: p.category || 'catering',
    categoryLabel: p.categoryLabel || 'Catering',
    categoryHref: p.categoryHref || '/banquetes-catering',
  };
}

export function getProductBySlug(slug) {
  if (!slug) return null;

  let p = PRODUCTS.find(p => p.slug === slug);
  if (p) return normalizeForServicePage({ ...DEFAULT_PRODUCT, ...p });

  const citySuffixes = [
    'san-miguel-allende','san-luis-potosi','ciudad-de-mexico','estado-de-mexico',
    'puerto-vallarta','los-cabos','aguascalientes','guadalajara','monterrey',
    'cancun','cuernavaca','tijuana','veracruz','morelia','oaxaca','pachuca',
    'queretaro','toluca','torreon','merida','puebla','leon','acapulco',
    'valle-de-bravo','cozumel','vallarta','cdmx',
  ].sort((a, b) => b.length - a.length);

  for (const city of citySuffixes) {
    if (slug.endsWith('-' + city) && slug.length > city.length + 1) {
      p = PRODUCTS.find(p => p.slug === slug.slice(0, -(city.length + 1)));
      if (p) return normalizeForServicePage({ ...DEFAULT_PRODUCT, ...p, slug });
    }
    if (slug.endsWith(city) && slug.length > city.length) {
      const base = slug.slice(0, -city.length).replace(/-+$/, '');
      p = PRODUCTS.find(p => p.slug === base);
      if (p) return normalizeForServicePage({ ...DEFAULT_PRODUCT, ...p, slug });
    }
    if (slug.endsWith('-en-' + city)) {
      p = PRODUCTS.find(p => p.slug === slug.slice(0, -(city.length + 4)));
      if (p) return normalizeForServicePage({ ...DEFAULT_PRODUCT, ...p, slug });
    }
  }
  return null;
}

export function getRelatedProducts(slug, limit = 4) {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return PRODUCTS
    .filter(p => p.slug !== slug && p.category === product.category)
    .slice(0, limit);
}

export function getBlogPostBySlug(slug) { return null; }
export const ProductData = {};
export const products = PRODUCTS;
