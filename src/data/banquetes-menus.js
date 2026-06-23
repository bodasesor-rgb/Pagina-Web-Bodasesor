// Banquet menu sub-pages — 16 entries (4 types × 4 formats)
// Regenerate: node scripts/generate-banquetes-menus.mjs

export const BANQUET_PARENTS = [
  {
    "slug": "banquetes",
    "name": "Banquete Formal",
    "shortName": "Formal",
    "href": "/banquetes",
    "img": "/images/banquete-hero.png",
    "theme": "formal"
  },
  {
    "slug": "banquete-kosher",
    "name": "Banquete Kosher",
    "shortName": "Kosher",
    "href": "/banquete-kosher",
    "img": "/images/banquete-kosher-hero.png",
    "theme": "kosher"
  },
  {
    "slug": "banquete-mexicano",
    "name": "Banquete Mexicano",
    "shortName": "Mexicano",
    "href": "/banquete-mexicano",
    "img": "/images/banquete-mexicano-hero.png",
    "theme": "mexicano"
  },
  {
    "slug": "banquete-navideno",
    "name": "Banquete Navideño",
    "shortName": "Navideño",
    "href": "/banquete-navideno",
    "img": "/images/banquete-navideno-hero.png",
    "theme": "navideno"
  }
]

export const BANQUET_MENU_FORMATS = [
  {
    "slug": "4-tiempos",
    "label": "4 Tiempos"
  },
  {
    "slug": "3-tiempos",
    "label": "3 Tiempos"
  },
  {
    "slug": "2-tiempos",
    "label": "2 Tiempos"
  },
  {
    "slug": "buffet",
    "label": "Buffet"
  }
]

export const banquetesNavItems = [
  {
    "name": "Banquete Formal",
    "href": "/banquetes",
    "children": [
      {
        "name": "4 Tiempos",
        "href": "/banquetes/4-tiempos"
      },
      {
        "name": "3 Tiempos",
        "href": "/banquetes/3-tiempos"
      },
      {
        "name": "2 Tiempos",
        "href": "/banquetes/2-tiempos"
      },
      {
        "name": "Buffet",
        "href": "/banquetes/buffet"
      }
    ]
  },
  {
    "name": "Banquete Kosher",
    "href": "/banquete-kosher",
    "children": [
      {
        "name": "4 Tiempos",
        "href": "/banquete-kosher/4-tiempos"
      },
      {
        "name": "3 Tiempos",
        "href": "/banquete-kosher/3-tiempos"
      },
      {
        "name": "2 Tiempos",
        "href": "/banquete-kosher/2-tiempos"
      },
      {
        "name": "Buffet",
        "href": "/banquete-kosher/buffet"
      }
    ]
  },
  {
    "name": "Banquete Mexicano",
    "href": "/banquete-mexicano",
    "children": [
      {
        "name": "4 Tiempos",
        "href": "/banquete-mexicano/4-tiempos"
      },
      {
        "name": "3 Tiempos",
        "href": "/banquete-mexicano/3-tiempos"
      },
      {
        "name": "2 Tiempos",
        "href": "/banquete-mexicano/2-tiempos"
      },
      {
        "name": "Buffet",
        "href": "/banquete-mexicano/buffet"
      }
    ]
  },
  {
    "name": "Banquete Navideño",
    "href": "/banquete-navideno",
    "children": [
      {
        "name": "4 Tiempos",
        "href": "/banquete-navideno/4-tiempos"
      },
      {
        "name": "3 Tiempos",
        "href": "/banquete-navideno/3-tiempos"
      },
      {
        "name": "2 Tiempos",
        "href": "/banquete-navideno/2-tiempos"
      },
      {
        "name": "Buffet",
        "href": "/banquete-navideno/buffet"
      }
    ]
  }
]

export const BANQUET_MENUS = [
  {
    "parentSlug": "banquetes",
    "parentName": "Banquete Formal",
    "parentHref": "/banquetes",
    "parentImg": "/images/banquete-hero.png",
    "slug": "4-tiempos",
    "name": "Banquete Formal de 4 Tiempos",
    "label": "4 Tiempos",
    "headline": "Sopa, entrada, plato fuerte y postre — la experiencia completa",
    "seoTitle": "Banquete Formal de 4 Tiempos | Bodasesor",
    "seoDescription": "Menú servido a la mesa con cuatro tiempos. Ideal para bodas, XV años y cenas de gala de 3 a 4 horas. Banquete Formal para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Menú servido a la mesa con cuatro tiempos. Ideal para bodas, XV años y cenas de gala de 3 a 4 horas.",
      "Nuestro banquete formal de 4 tiempos combina la excelencia de banquete formal con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Sopa: Crema de elote rostizado con aceite de trufa",
      "Entrada: Ensalada de arúgula con peras caramelizadas y queso de cabra",
      "Plato fuerte: Filete de res en salsa de vino tinto con puré trufado",
      "Postre: Coulant de chocolate con helado de vainilla"
    ],
    "duration": "3.5 – 4 horas",
    "included": [
      "Chef ejecutivo y servicio de meseros profesionales",
      "Vajilla fina, cristalería y cubiertos premium",
      "Centro de mesa floral básico incluido",
      "Coordinador de banquete el día del evento"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquetes",
    "parentName": "Banquete Formal",
    "parentHref": "/banquetes",
    "parentImg": "/images/banquete-hero.png",
    "slug": "3-tiempos",
    "name": "Banquete Formal de 3 Tiempos",
    "label": "3 Tiempos",
    "headline": "Entrada, plato fuerte y postre con servicio elegante",
    "seoTitle": "Banquete Formal de 3 Tiempos | Bodasesor",
    "seoDescription": "Formato clásico de tres tiempos. Perfecto para eventos de 2 a 3 horas con excelente relación calidad-tiempo. Banquete Formal para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Formato clásico de tres tiempos. Perfecto para eventos de 2 a 3 horas con excelente relación calidad-tiempo.",
      "Nuestro banquete formal de 3 tiempos combina la excelencia de banquete formal con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Entrada: Carpaccio de res con rúcula, parmesano y reducción balsámica",
      "Plato fuerte: Pechuga rellena de espinacas en salsa de champiñones",
      "Postre: Tarta tatin de manzana con crema inglesa"
    ],
    "duration": "2.5 – 3 horas",
    "included": [
      "Chef ejecutivo y servicio de meseros profesionales",
      "Vajilla fina, cristalería y cubiertos premium",
      "Centro de mesa floral básico incluido",
      "Coordinador de banquete el día del evento"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquetes",
    "parentName": "Banquete Formal",
    "parentHref": "/banquetes",
    "parentImg": "/images/banquete-hero.png",
    "slug": "2-tiempos",
    "name": "Banquete Formal de 2 Tiempos",
    "label": "2 Tiempos",
    "headline": "Plato fuerte y postre — práctico y sofisticado",
    "seoTitle": "Banquete Formal de 2 Tiempos | Bodasesor",
    "seoDescription": "Opción ágil para eventos de mediodía, graduaciones o cenas ejecutivas de 1.5 a 2 horas. Banquete Formal para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Opción ágil para eventos de mediodía, graduaciones o cenas ejecutivas de 1.5 a 2 horas.",
      "Nuestro banquete formal de 2 tiempos combina la excelencia de banquete formal con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Plato fuerte: Salmón en costra de hierbas con vegetales asados",
      "Postre: Mousse de frutos rojos en copa"
    ],
    "duration": "1.5 – 2 horas",
    "included": [
      "Chef ejecutivo y servicio de meseros profesionales",
      "Vajilla fina, cristalería y cubiertos premium",
      "Centro de mesa floral básico incluido",
      "Coordinador de banquete el día del evento"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquetes",
    "parentName": "Banquete Formal",
    "parentHref": "/banquetes",
    "parentImg": "/images/banquete-hero.png",
    "slug": "buffet",
    "name": "Banquete Formal Buffet",
    "label": "Buffet",
    "headline": "Estaciones abundantes con servicio dinámico",
    "seoTitle": "Banquete Formal Buffet | Bodasesor",
    "seoDescription": "Amplia variedad en estaciones calientes y frías. Ideal para eventos grandes, posadas y recepciones informales. Banquete Formal para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Amplia variedad en estaciones calientes y frías. Ideal para eventos grandes, posadas y recepciones informales.",
      "Nuestro banquete formal buffet combina la excelencia de banquete formal con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Estación fría: Ensaladas gourmet, quesos importados y panes artesanales",
      "Estación caliente: Res en salsa de vino, pollo al limón y pasta alfredo",
      "Estación internacional: Sushi rolls, ceviche y brochetas mediterráneas",
      "Postres: Barra de pasteles, fruta fresca y mini postres de autor"
    ],
    "duration": "2 – 3 horas",
    "included": [
      "Chef ejecutivo y servicio de meseros profesionales",
      "Vajilla fina, cristalería y cubiertos premium",
      "Centro de mesa floral básico incluido",
      "Coordinador de banquete el día del evento"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-kosher",
    "parentName": "Banquete Kosher",
    "parentHref": "/banquete-kosher",
    "parentImg": "/images/banquete-kosher-hero.png",
    "slug": "4-tiempos",
    "name": "Banquete Kosher de 4 Tiempos",
    "label": "4 Tiempos",
    "headline": "Sopa, entrada, plato fuerte y postre — la experiencia completa",
    "seoTitle": "Banquete Kosher de 4 Tiempos | Bodasesor",
    "seoDescription": "Menú servido a la mesa con cuatro tiempos. Ideal para bodas, XV años y cenas de gala de 3 a 4 horas. Banquete Kosher para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Menú servido a la mesa con cuatro tiempos. Ideal para bodas, XV años y cenas de gala de 3 a 4 horas.",
      "Nuestro banquete kosher de 4 tiempos combina la excelencia de banquete kosher con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Sopa: Caldo de pollo con kneidlach (bolitas de matzá)",
      "Entrada: Ensalada israelí con tahini de limón",
      "Plato fuerte: Pechuga de pollo rellena en salsa de hierbas con arroz árabe",
      "Postre: Baklava artesanal y frutas frescas de temporada"
    ],
    "duration": "3.5 – 4 horas",
    "included": [
      "Supervisión rabínica (mashguiaj) durante la preparación",
      "Ingredientes con certificación Kosher",
      "Vajilla separada para cárnicos y lácteos",
      "Menú revisado y aprobado antes del evento"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-kosher",
    "parentName": "Banquete Kosher",
    "parentHref": "/banquete-kosher",
    "parentImg": "/images/banquete-kosher-hero.png",
    "slug": "3-tiempos",
    "name": "Banquete Kosher de 3 Tiempos",
    "label": "3 Tiempos",
    "headline": "Entrada, plato fuerte y postre con servicio elegante",
    "seoTitle": "Banquete Kosher de 3 Tiempos | Bodasesor",
    "seoDescription": "Formato clásico de tres tiempos. Perfecto para eventos de 2 a 3 horas con excelente relación calidad-tiempo. Banquete Kosher para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Formato clásico de tres tiempos. Perfecto para eventos de 2 a 3 horas con excelente relación calidad-tiempo.",
      "Nuestro banquete kosher de 3 tiempos combina la excelencia de banquete kosher con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Entrada: Hummus artesanal con pita tostada y aceitunas marinadas",
      "Plato fuerte: Brisket cocinado lentamente con papas y zanahorias glaseadas",
      "Postre: Rugelach casero y fruta de temporada"
    ],
    "duration": "2.5 – 3 horas",
    "included": [
      "Supervisión rabínica (mashguiaj) durante la preparación",
      "Ingredientes con certificación Kosher",
      "Vajilla separada para cárnicos y lácteos",
      "Menú revisado y aprobado antes del evento"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-kosher",
    "parentName": "Banquete Kosher",
    "parentHref": "/banquete-kosher",
    "parentImg": "/images/banquete-kosher-hero.png",
    "slug": "2-tiempos",
    "name": "Banquete Kosher de 2 Tiempos",
    "label": "2 Tiempos",
    "headline": "Plato fuerte y postre — práctico y sofisticado",
    "seoTitle": "Banquete Kosher de 2 Tiempos | Bodasesor",
    "seoDescription": "Opción ágil para eventos de mediodía, graduaciones o cenas ejecutivas de 1.5 a 2 horas. Banquete Kosher para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Opción ágil para eventos de mediodía, graduaciones o cenas ejecutivas de 1.5 a 2 horas.",
      "Nuestro banquete kosher de 2 tiempos combina la excelencia de banquete kosher con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Plato fuerte: Pescado al horno con hierbas y vegetales asados (Parve)",
      "Postre: Halva con miel y nueces"
    ],
    "duration": "1.5 – 2 horas",
    "included": [
      "Supervisión rabínica (mashguiaj) durante la preparación",
      "Ingredientes con certificación Kosher",
      "Vajilla separada para cárnicos y lácteos",
      "Menú revisado y aprobado antes del evento"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-kosher",
    "parentName": "Banquete Kosher",
    "parentHref": "/banquete-kosher",
    "parentImg": "/images/banquete-kosher-hero.png",
    "slug": "buffet",
    "name": "Banquete Kosher Buffet",
    "label": "Buffet",
    "headline": "Estaciones abundantes con servicio dinámico",
    "seoTitle": "Banquete Kosher Buffet | Bodasesor",
    "seoDescription": "Amplia variedad en estaciones calientes y frías. Ideal para eventos grandes, posadas y recepciones informales. Banquete Kosher para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Amplia variedad en estaciones calientes y frías. Ideal para eventos grandes, posadas y recepciones informales.",
      "Nuestro banquete kosher buffet combina la excelencia de banquete kosher con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Estación fría: Ensaladas, dips Kosher y pita recién horneada",
      "Estación cárnica: Pollo asado, kebabs y guarniciones sin lácteos",
      "Estación láctea: Quiches, quesos Kosher y pastas con crema",
      "Postres: Baklava, fruta fresca y galletas Kosher"
    ],
    "duration": "2 – 3 horas",
    "included": [
      "Supervisión rabínica (mashguiaj) durante la preparación",
      "Ingredientes con certificación Kosher",
      "Vajilla separada para cárnicos y lácteos",
      "Menú revisado y aprobado antes del evento"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-mexicano",
    "parentName": "Banquete Mexicano",
    "parentHref": "/banquete-mexicano",
    "parentImg": "/images/banquete-mexicano-hero.png",
    "slug": "4-tiempos",
    "name": "Banquete Mexicano de 4 Tiempos",
    "label": "4 Tiempos",
    "headline": "Sopa, entrada, plato fuerte y postre — la experiencia completa",
    "seoTitle": "Banquete Mexicano de 4 Tiempos | Bodasesor",
    "seoDescription": "Menú servido a la mesa con cuatro tiempos. Ideal para bodas, XV años y cenas de gala de 3 a 4 horas. Banquete Mexicano para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Menú servido a la mesa con cuatro tiempos. Ideal para bodas, XV años y cenas de gala de 3 a 4 horas.",
      "Nuestro banquete mexicano de 4 tiempos combina la excelencia de banquete mexicano con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Sopa: Pozole rojo tradicional con todos sus acompañantes",
      "Entrada: Ensalada de nopales con queso panela y epazote",
      "Plato fuerte: Pollo en mole negro oaxaqueño con arroz rojo",
      "Postre: Tres leches con canela o capirotada de temporada"
    ],
    "duration": "3.5 – 4 horas",
    "included": [
      "Recetas regionales auténticas con ingredientes locales",
      "Salsas artesanales y tortillas hechas a mano",
      "Servicio de meseros con uniforme tradicional opcional",
      "Aguas frescas de jamaica y tamarindo incluidas"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-mexicano",
    "parentName": "Banquete Mexicano",
    "parentHref": "/banquete-mexicano",
    "parentImg": "/images/banquete-mexicano-hero.png",
    "slug": "3-tiempos",
    "name": "Banquete Mexicano de 3 Tiempos",
    "label": "3 Tiempos",
    "headline": "Entrada, plato fuerte y postre con servicio elegante",
    "seoTitle": "Banquete Mexicano de 3 Tiempos | Bodasesor",
    "seoDescription": "Formato clásico de tres tiempos. Perfecto para eventos de 2 a 3 horas con excelente relación calidad-tiempo. Banquete Mexicano para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Formato clásico de tres tiempos. Perfecto para eventos de 2 a 3 horas con excelente relación calidad-tiempo.",
      "Nuestro banquete mexicano de 3 tiempos combina la excelencia de banquete mexicano con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Entrada: Tostaditas con guacamole, chapulines y queso cotija",
      "Plato fuerte: Chiles en nogada con arroz blanco y frijoles de olla",
      "Postre: Arroz con leche artesanal y ate de guayaba"
    ],
    "duration": "2.5 – 3 horas",
    "included": [
      "Recetas regionales auténticas con ingredientes locales",
      "Salsas artesanales y tortillas hechas a mano",
      "Servicio de meseros con uniforme tradicional opcional",
      "Aguas frescas de jamaica y tamarindo incluidas"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-mexicano",
    "parentName": "Banquete Mexicano",
    "parentHref": "/banquete-mexicano",
    "parentImg": "/images/banquete-mexicano-hero.png",
    "slug": "2-tiempos",
    "name": "Banquete Mexicano de 2 Tiempos",
    "label": "2 Tiempos",
    "headline": "Plato fuerte y postre — práctico y sofisticado",
    "seoTitle": "Banquete Mexicano de 2 Tiempos | Bodasesor",
    "seoDescription": "Opción ágil para eventos de mediodía, graduaciones o cenas ejecutivas de 1.5 a 2 horas. Banquete Mexicano para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Opción ágil para eventos de mediodía, graduaciones o cenas ejecutivas de 1.5 a 2 horas.",
      "Nuestro banquete mexicano de 2 tiempos combina la excelencia de banquete mexicano con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Plato fuerte: Cochinita pibil con cebolla morada y tortillas hechas a mano",
      "Postre: Flan napolitano con cajeta"
    ],
    "duration": "1.5 – 2 horas",
    "included": [
      "Recetas regionales auténticas con ingredientes locales",
      "Salsas artesanales y tortillas hechas a mano",
      "Servicio de meseros con uniforme tradicional opcional",
      "Aguas frescas de jamaica y tamarindo incluidas"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-mexicano",
    "parentName": "Banquete Mexicano",
    "parentHref": "/banquete-mexicano",
    "parentImg": "/images/banquete-mexicano-hero.png",
    "slug": "buffet",
    "name": "Banquete Mexicano Buffet",
    "label": "Buffet",
    "headline": "Estaciones abundantes con servicio dinámico",
    "seoTitle": "Banquete Mexicano Buffet | Bodasesor",
    "seoDescription": "Amplia variedad en estaciones calientes y frías. Ideal para eventos grandes, posadas y recepciones informales. Banquete Mexicano para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Amplia variedad en estaciones calientes y frías. Ideal para eventos grandes, posadas y recepciones informales.",
      "Nuestro banquete mexicano buffet combina la excelencia de banquete mexicano con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Estación de tacos: Suadero, pastor, bistec y guisados del día",
      "Estación regional: Carnitas michoacanas, barbacoa y mixiotes",
      "Antojitos: Quesadillas, sopes, gorditas y elotes preparados",
      "Postres: Churros, capirotada, dulces típicos y aguas frescas"
    ],
    "duration": "2 – 3 horas",
    "included": [
      "Recetas regionales auténticas con ingredientes locales",
      "Salsas artesanales y tortillas hechas a mano",
      "Servicio de meseros con uniforme tradicional opcional",
      "Aguas frescas de jamaica y tamarindo incluidas"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-navideno",
    "parentName": "Banquete Navideño",
    "parentHref": "/banquete-navideno",
    "parentImg": "/images/banquete-navideno-hero.png",
    "slug": "4-tiempos",
    "name": "Banquete Navideño de 4 Tiempos",
    "label": "4 Tiempos",
    "headline": "Sopa, entrada, plato fuerte y postre — la experiencia completa",
    "seoTitle": "Banquete Navideño de 4 Tiempos | Bodasesor",
    "seoDescription": "Menú servido a la mesa con cuatro tiempos. Ideal para bodas, XV años y cenas de gala de 3 a 4 horas. Banquete Navideño para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Menú servido a la mesa con cuatro tiempos. Ideal para bodas, XV años y cenas de gala de 3 a 4 horas.",
      "Nuestro banquete navideño de 4 tiempos combina la excelencia de banquete navideño con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Sopa: Crema de calabaza con semillas tostadas",
      "Entrada: Ensalada navideña con nuez, granada y vinagreta de miel",
      "Plato fuerte: Pavo relleno tradicional con puré de papa y gravy",
      "Postre: Buñuelos con piloncillo o rosca de reyes (temporada)"
    ],
    "duration": "3.5 – 4 horas",
    "included": [
      "Menú con clásicos navideños mexicanos e internacionales",
      "Montaje temático navideño en mesas",
      "Servicio completo: preparación, montaje y limpieza",
      "Disponibilidad prioritaria en temporada (dic. 16–31)"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-navideno",
    "parentName": "Banquete Navideño",
    "parentHref": "/banquete-navideno",
    "parentImg": "/images/banquete-navideno-hero.png",
    "slug": "3-tiempos",
    "name": "Banquete Navideño de 3 Tiempos",
    "label": "3 Tiempos",
    "headline": "Entrada, plato fuerte y postre con servicio elegante",
    "seoTitle": "Banquete Navideño de 3 Tiempos | Bodasesor",
    "seoDescription": "Formato clásico de tres tiempos. Perfecto para eventos de 2 a 3 horas con excelente relación calidad-tiempo. Banquete Navideño para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Formato clásico de tres tiempos. Perfecto para eventos de 2 a 3 horas con excelente relación calidad-tiempo.",
      "Nuestro banquete navideño de 3 tiempos combina la excelencia de banquete navideño con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Entrada: Ensalada de betabel con queso de cabra y nuez",
      "Plato fuerte: Bacalao a la vizcaína con arroz blanco y aceitunas",
      "Postre: Ponche de frutas servido caliente y galletas navideñas"
    ],
    "duration": "2.5 – 3 horas",
    "included": [
      "Menú con clásicos navideños mexicanos e internacionales",
      "Montaje temático navideño en mesas",
      "Servicio completo: preparación, montaje y limpieza",
      "Disponibilidad prioritaria en temporada (dic. 16–31)"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-navideno",
    "parentName": "Banquete Navideño",
    "parentHref": "/banquete-navideno",
    "parentImg": "/images/banquete-navideno-hero.png",
    "slug": "2-tiempos",
    "name": "Banquete Navideño de 2 Tiempos",
    "label": "2 Tiempos",
    "headline": "Plato fuerte y postre — práctico y sofisticado",
    "seoTitle": "Banquete Navideño de 2 Tiempos | Bodasesor",
    "seoDescription": "Opción ágil para eventos de mediodía, graduaciones o cenas ejecutivas de 1.5 a 2 horas. Banquete Navideño para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Opción ágil para eventos de mediodía, graduaciones o cenas ejecutivas de 1.5 a 2 horas.",
      "Nuestro banquete navideño de 2 tiempos combina la excelencia de banquete navideño con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Plato fuerte: Pierna de cerdo al horno con romeritos y papas",
      "Postre: Rosca de reyes o turrón artesanal"
    ],
    "duration": "1.5 – 2 horas",
    "included": [
      "Menú con clásicos navideños mexicanos e internacionales",
      "Montaje temático navideño en mesas",
      "Servicio completo: preparación, montaje y limpieza",
      "Disponibilidad prioritaria en temporada (dic. 16–31)"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  },
  {
    "parentSlug": "banquete-navideno",
    "parentName": "Banquete Navideño",
    "parentHref": "/banquete-navideno",
    "parentImg": "/images/banquete-navideno-hero.png",
    "slug": "buffet",
    "name": "Banquete Navideño Buffet",
    "label": "Buffet",
    "headline": "Estaciones abundantes con servicio dinámico",
    "seoTitle": "Banquete Navideño Buffet | Bodasesor",
    "seoDescription": "Amplia variedad en estaciones calientes y frías. Ideal para eventos grandes, posadas y recepciones informales. Banquete Navideño para bodas, XV años, corporativos y celebraciones en México.",
    "description": [
      "Amplia variedad en estaciones calientes y frías. Ideal para eventos grandes, posadas y recepciones informales.",
      "Nuestro banquete navideño buffet combina la excelencia de banquete navideño con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.",
      "Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida."
    ],
    "menuExample": [
      "Estación caliente: Pavo, pierna de cerdo, romeritos y bacalao",
      "Estación mexicana: Pozole, tamales y atole de temporada",
      "Estación internacional: Jamón, quesos y panes especiales",
      "Postres: Buñuelos, rosca, fruta de temporada y chocolate caliente"
    ],
    "duration": "2 – 3 horas",
    "included": [
      "Menú con clásicos navideños mexicanos e internacionales",
      "Montaje temático navideño en mesas",
      "Servicio completo: preparación, montaje y limpieza",
      "Disponibilidad prioritaria en temporada (dic. 16–31)"
    ],
    "serviceTiers": [
      {
        "name": "Básico",
        "items": [
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
        "name": "Tradicional",
        "items": [
          "Meseros: 1 c/15 personas · 5 horas",
          "Personal de cocina",
          "Vajilla blanca + cubertería + plato base decorativo",
          "Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras",
          "Silla Tiffany + camino de mesa",
          "Centro de mesa con flores de temporada",
          "Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua",
          "Barman 1 c/50 personas · charolas · hielo"
        ]
      },
      {
        "name": "Premium",
        "popular": true,
        "items": [
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
    "idealPara": [
      "Bodas",
      "XV Años",
      "Eventos corporativos",
      "Graduaciones",
      "Cenas de gala"
    ]
  }
]

export function getBanquetMenu(parentSlug, menuSlug) {
  if (!parentSlug || !menuSlug) return null
  return BANQUET_MENUS.find((m) => m.parentSlug === parentSlug && m.slug === menuSlug) ?? null
}

export function getMenusForParent(parentSlug) {
  return BANQUET_MENUS.filter((m) => m.parentSlug === parentSlug)
}

export function getBanquetParent(slug) {
  return BANQUET_PARENTS.find((p) => p.slug === slug) ?? null
}
