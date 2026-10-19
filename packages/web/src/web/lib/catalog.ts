export type Title = {
  id: string;
  name: string;
  image: string;
  year: number;
  kind: "Serie" | "Película";
  genre: string;
  match: number;
  maturity: string;
  seasons: string;
  description: string;
  cast: string[];
  character: string;
  characterDescription: string;
  trailer: string;
  featured?: boolean;
};

export const catalog: Title[] = [
  {
    id: "stranger",
    name: "Stranger Things",
    image: "/images/stranger.webp",
    year: 2025,
    kind: "Serie",
    genre: "Ciencia ficción",
    match: 98,
    maturity: "16+",
    seasons: "5 temporadas",
    description:
      "Hawkins se enfrenta a su última y más peligrosa batalla. El grupo vuelve a unirse para detener la oscuridad del Mundo del Revés.",
    cast: ["Eleven", "Mike Wheeler", "Dustin Henderson", "Will Byers"],
    character: "Eleven",
    characterDescription:
      "Una joven con poderes extraordinarios que lucha por proteger a su familia elegida.",
    trailer: "PssKpzB0Ah0",
    featured: true,
  },
  {
    id: "wednesday",
    name: "Miércoles",
    image: "/images/wednesday.webp",
    year: 2025,
    kind: "Serie",
    genre: "Fantasía",
    match: 96,
    maturity: "13+",
    seasons: "2 temporadas",
    description:
      "Miércoles Addams regresa a Nunca Más. Nuevos enemigos, secretos familiares y misterios sobrenaturales la esperan.",
    cast: ["Miércoles Addams", "Enid Sinclair", "Morticia Addams"],
    character: "Miércoles Addams",
    characterDescription: "Brillante, mordaz y decidida a resolver cada misterio a su manera.",
    trailer: "03u4xyj0TH4",
  },
  {
    id: "squid",
    name: "El juego del calamar",
    image: "/images/squid.webp",
    year: 2025,
    kind: "Serie",
    genre: "Suspenso",
    match: 95,
    maturity: "18+",
    seasons: "3 temporadas",
    description:
      "Gi-hun vuelve al juego decidido a acabar con quienes lo crearon, mientras una nueva ronda lleva todo al límite.",
    cast: ["Seong Gi-hun", "El Líder", "Hwang Jun-ho"],
    character: "Seong Gi-hun",
    characterDescription: "El jugador 456 regresa con una misión: detener el juego desde dentro.",
    trailer: "zgGTVaG2UiQ",
  },
  {
    id: "onepiece",
    name: "ONE PIECE",
    image: "/images/onepiece.webp",
    year: 2026,
    kind: "Serie",
    genre: "Aventura",
    match: 97,
    maturity: "13+",
    seasons: "2 temporadas",
    description:
      "Luffy y los Sombrero de Paja navegan hacia Grand Line en busca del tesoro más grande del mundo.",
    cast: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Sanji"],
    character: "Monkey D. Luffy",
    characterDescription:
      "Un capitán incansablemente optimista con el sueño de convertirse en el Rey de los Piratas.",
    trailer: "S-XxKVxZ2fU",
  },
  {
    id: "dark",
    name: "Dark",
    image: "/images/dark.webp",
    year: 2020,
    kind: "Serie",
    genre: "Ciencia ficción",
    match: 94,
    maturity: "16+",
    seasons: "3 temporadas",
    description:
      "La desaparición de un niño revela los secretos de cuatro familias y un misterio que atraviesa generaciones.",
    cast: ["Jonas Kahnwald", "Martha Nielsen", "Ulrich Nielsen"],
    character: "Jonas Kahnwald",
    characterDescription:
      "Un joven atrapado en un enigma donde pasado, presente y futuro se entrelazan.",
    trailer: "cq2iTHoLrt0",
  },
  {
    id: "witcher",
    name: "The Witcher",
    image: "/images/witcher.webp",
    year: 2025,
    kind: "Serie",
    genre: "Fantasía",
    match: 91,
    maturity: "18+",
    seasons: "4 temporadas",
    description:
      "En un continente desgarrado por la guerra, Geralt busca reencontrarse con Yennefer y Ciri.",
    cast: ["Geralt de Rivia", "Yennefer", "Ciri"],
    character: "Geralt de Rivia",
    characterDescription:
      "Un cazador de monstruos cuyo destino está unido al de una joven princesa.",
    trailer: "HK9dU6JIroU",
  },
  {
    id: "heist",
    name: "La casa de papel",
    image: "/images/heist.webp",
    year: 2021,
    kind: "Serie",
    genre: "Crimen",
    match: 93,
    maturity: "16+",
    seasons: "5 partes",
    description:
      "Un grupo de atracadores ejecuta un plan imposible bajo la dirección del enigmático Profesor.",
    cast: ["El Profesor", "Tokio", "Berlín", "Nairobi"],
    character: "El Profesor",
    characterDescription: "La mente detrás del golpe más ambicioso jamás planeado.",
    trailer: "_InqQJRqGW4",
  },
  {
    id: "arcane",
    name: "Arcane",
    image: "/images/arcane.webp",
    year: 2024,
    kind: "Serie",
    genre: "Animación",
    match: 99,
    maturity: "16+",
    seasons: "2 temporadas",
    description:
      "Dos hermanas enfrentadas se convierten en piezas clave de un conflicto entre las ciudades de Piltover y Zaun.",
    cast: ["Jinx", "Vi", "Caitlyn"],
    character: "Jinx",
    characterDescription: "Una fuerza caótica e impredecible marcada por el dolor y la lealtad.",
    trailer: "ysqiEC6bLUI",
  },
  {
    id: "sandman",
    name: "The Sandman",
    image: "/images/sandman.webp",
    year: 2025,
    kind: "Serie",
    genre: "Fantasía",
    match: 90,
    maturity: "16+",
    seasons: "2 temporadas",
    description:
      "Tras décadas de cautiverio, el Rey de los Sueños recorre mundos para recuperar lo que le fue arrebatado.",
    cast: ["Sueño", "Muerte", "Lucienne"],
    character: "Sueño",
    characterDescription: "El señor del reino de los sueños, tan poderoso como vulnerable.",
    trailer: "83ClbRPRDXU",
  },
  {
    id: "extraction",
    name: "Misión de rescate 2",
    image: "/images/extraction.webp",
    year: 2023,
    kind: "Película",
    genre: "Acción",
    match: 94,
    maturity: "18+",
    seasons: "2 h 03 min",
    description:
      "Tyler Rake regresa para una misión imposible: rescatar a la familia de un despiadado criminal.",
    cast: ["Tyler Rake", "Nik Khan"],
    character: "Tyler Rake",
    characterDescription:
      "Un mercenario dispuesto a arriesgarlo todo para salvar a quienes lo necesitan.",
    trailer: "Y274jZs5s7s",
  },
  {
    id: "adam",
    name: "El proyecto Adam",
    image: "/images/adam.webp",
    year: 2022,
    kind: "Película",
    genre: "Ciencia ficción",
    match: 92,
    maturity: "13+",
    seasons: "1 h 46 min",
    description:
      "Un piloto que viaja en el tiempo une fuerzas con su yo de doce años para salvar el futuro.",
    cast: ["Adam Reed", "Louis Reed", "Laura"],
    character: "Adam Reed",
    characterDescription:
      "Un viajero del tiempo que descubre que la aventura más difícil es reconciliarse con su pasado.",
    trailer: "IE8HIsIrq4o",
  },
  {
    id: "glass",
    name: "Glass Onion",
    image: "/images/glass.webp",
    year: 2022,
    kind: "Película",
    genre: "Misterio",
    match: 91,
    maturity: "13+",
    seasons: "2 h 19 min",
    description:
      "El detective Benoit Blanc viaja a Grecia para desentrañar un misterio en la isla de un multimillonario.",
    cast: ["Benoit Blanc", "Miles Bron", "Andi Brand"],
    character: "Benoit Blanc",
    characterDescription: "El ingenioso detective que siempre ve lo que los demás pasan por alto.",
    trailer: "gj5ibYSz8C0",
  },
];
