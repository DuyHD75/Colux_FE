const rooms = [
  {
    id: 1,
    name: "Bathroom",
    code: "#536872",
    title: "Bathroom Colors",
    content:
      "Find the perfect bathroom paint color. Whether your vibe is serene or dramatic, create the refuge you want.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/01_sw-9658-fresh-eucalyptus-bathroom_tn.png",
    collections: [
      {
        id: 1,
        name: "Modern Bathroom",
        colors: [
          { id: 1, name: "Sky Blue", code: "#87ceeb" },
          { id: 2, name: "Mint Green", code: "#98ff98" },
          { id: 3, name: "Soft Gray", code: "#a8a8a8" },
        ],
      },
      {
        id: 2,
        name: "Classic Bathroom",
        colors: [
          { id: 4, name: "Ivory", code: "#fffff0" },
          { id: 5, name: "Navy Blue", code: "#000080" },
          { id: 6, name: "Charcoal", code: "#36454f" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Living Room",
    code: "#bba595",
    title: "Living Room Colors",
    content:
      "Get inspired by these versatile living room paint colors – and create the perfect space for entertaining or relaxing.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/02_sw7044-amazing-gray-living-room_tn.png",
    collections: [
      {
        id: 3,
        name: "Modern Living Room",
        colors: [
          { id: 7, name: "Beige", code: "#f5f5dc" },
          { id: 8, name: "Chocolate", code: "#7b3f00" },
          { id: 9, name: "Light Gray", code: "#d3d3d3" },
        ],
      },
      {
        id: 4,
        name: "Cozy Living Room",
        colors: [
          { id: 10, name: "Warm Red", code: "#b22222" },
          { id: 11, name: "Olive Green", code: "#808000" },
          { id: 12, name: "Mustard Yellow", code: "#ffdb58" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Bedroom",
    code: "#f0ece2",
    title: "Bedroom Colors",
    content:
      "Get inspired by these versatile living room paint colors – and create the perfect space for entertaining or relaxing.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/03_sw-9132-acacia-haze-bedroom_tn.png",
    collections: [
      {
        id: 5,
        name: "Modern Bedroom",
        colors: [
          { id: 13, name: "Soft White", code: "#f8f8ff" },
          { id: 14, name: "Slate Gray", code: "#708090" },
          { id: 15, name: "Lavender", code: "#e6e6fa" },
        ],
      },
      {
        id: 6,
        name: "Rustic Bedroom",
        colors: [
          { id: 16, name: "Earth Brown", code: "#a52a2a" },
          { id: 17, name: "Forest Green", code: "#228b22" },
          { id: 18, name: "Cranberry Red", code: "#9b111e" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Kitchen",
    code: "#a6b2b5",
    title: "Kitchen Colors",
    content:
      "Browse kitchen paint colors and bring some added life to your cooking and gathering space.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/04_sw-7666-fleur-de-sel-kitchen_tn.png",
    collections: [
      {
        id: 7,
        name: "Modern Kitchen",
        colors: [
          { id: 19, name: "Eggshell", code: "#f0ead6" },
          { id: 20, name: "Bright White", code: "#ffffff" },
          { id: 21, name: "Ocean Blue", code: "#4682b4" },
        ],
      },
      {
        id: 8,
        name: "Classic Kitchen",
        colors: [
          { id: 22, name: "Cherry Red", code: "#ff0800" },
          { id: 23, name: "Granite Gray", code: "#676767" },
          { id: 24, name: "Pine Green", code: "#01796f" },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Teen Bedroom",
    code: "#c2b6b6",
    title: "Teen Bedroom Colors",
    content:
      "These carefully selected teen room paint colors will help you and your teen pick a color that creates a welcoming retreat while best expressing their unique style.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/05_sw-9140-blustery-sky-teen-bedroom_tn.png",
    collections: [
      {
        id: 9,
        name: "Vibrant Teen Bedroom",
        colors: [
          { id: 25, name: "Electric Blue", code: "#7df9ff" },
          { id: 26, name: "Neon Green", code: "#39ff14" },
          { id: 27, name: "Hot Pink", code: "#ff69b4" },
        ],
      },
      {
        id: 10,
        name: "Cool Teen Bedroom",
        colors: [
          { id: 28, name: "Aqua", code: "#00ffff" },
          { id: 29, name: "Royal Purple", code: "#7851a9" },
          { id: 30, name: "Silver", code: "#c0c0c0" },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Dining Room",
    code: "#d6d3cc",
    title: "Dining Room Colors",
    content:
      "Browse dining room paint colors and bring the perfect balance of sophistication and comfort to this traditional hosting space.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/06_sw-7024-functional-gray-dining-room_tn.png",
    collections: [
      {
        id: 11,
        name: "Elegant Dining Room",
        colors: [
          { id: 31, name: "Wine Red", code: "#722f37" },
          { id: 32, name: "Champagne Gold", code: "#f7e7ce" },
          { id: 33, name: "Deep Plum", code: "#673147" },
        ],
      },
      {
        id: 12,
        name: "Cozy Dining Room",
        colors: [
          { id: 34, name: "Rustic Brown", code: "#8b4513" },
          { id: 35, name: "Burnt Orange", code: "#cc5500" },
          { id: 36, name: "Terracotta", code: "#e2725b" },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Home Office",
    code: "#b0b5b5",
    title: "Home Office Colors",
    content:
      "Discover the perfect mood-boosting office paint color. Transform your home office into an inviting yet functional space that can serve as a catalyst for increased productivity and creativity.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/07_sw-9107-uber-umber-office_tn.png",
    collections: [
      {
        id: 13,
        name: "Modern Home Office",
        colors: [
          { id: 37, name: "Steel Blue", code: "#4682b4" },
          { id: 38, name: "Graphite Gray", code: "#53565a" },
          { id: 39, name: "White", code: "#ffffff" },
        ],
      },
      {
        id: 14,
        name: "Minimalist Home Office",
        colors: [
          { id: 40, name: "Off White", code: "#f8f8ff" },
          { id: 41, name: "Matte Black", code: "#0a0a0a" },
          { id: 42, name: "Soft Beige", code: "#dcd0c0" },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Nursery",
    code: "#a4b7bd",
    title: "Nursery Colors",
    content:
      "These nursery paint colors can nourish calm and inspire fun – with hues from renewing greens to versatile neutrals to perky pinks.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/08_sw-6310-lotus-flower-nursery_tn.png",
    collections: [
      {
        id: 15,
        name: "Pastel Nursery",
        colors: [
          { id: 43, name: "Baby Blue", code: "#89cff0" },
          { id: 44, name: "Pale Pink", code: "#fadadd" },
          { id: 45, name: "Mint Green", code: "#98ff98" },
        ],
      },
      {
        id: 16,
        name: "Bright Nursery",
        colors: [
          { id: 46, name: "Sunshine Yellow", code: "#fff700" },
          { id: 47, name: "Bright Orange", code: "#ffae42" },
          { id: 48, name: "Bright Blue", code: "#1e90ff" },
        ],
      },
    ],
  },
];

const exteriors = [
  {
    id: 1,
    name: "Main Exterior",
    code: "#679199",
    title: "Exterior House Colors",
    content:
      "Choosing the right exterior house color for your home can heighten your curb appeal while highlighting your personal style.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/exterior-colors-main.jpg",
    collections: [
      {
        id: 1,
        name: "Modern Bathroom",
        colors: [
          { id: 1, name: "Sky Blue", code: "#87ceeb" },
          { id: 2, name: "Mint Green", code: "#98ff98" },
          { id: 3, name: "Soft Gray", code: "#a8a8a8" },
        ],
      },
      {
        id: 2,
        name: "Classic Bathroom",
        colors: [
          { id: 4, name: "Ivory", code: "#fffff0" },
          { id: 5, name: "Navy Blue", code: "#000080" },
          { id: 6, name: "Charcoal", code: "#36454f" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Front Door",
    code: "#2f2f30",
    title: "Exterior Front Door Colors",
    content:
      "By choosing a new front door paint color, you can quickly upgrade your exterior while infusing it with a splash of personal style.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/exterior-colors-front-doors.jpg",
    collections: [
      {
        id: 3,
        name: "Modern Living Room",
        colors: [
          { id: 7, name: "Beige", code: "#f5f5dc" },
          { id: 8, name: "Chocolate", code: "#7b3f00" },
          { id: 9, name: "Light Gray", code: "#d3d3d3" },
        ],
      },
      {
        id: 4,
        name: "Cozy Living Room",
        colors: [
          { id: 10, name: "Warm Red", code: "#b22222" },
          { id: 11, name: "Olive Green", code: "#808000" },
          { id: 12, name: "Mustard Yellow", code: "#ffdb58" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Garage Door",
    code: "#d7c5ae",
    title: "Exterior Garage Door Colors",
    content:
      "Browse garage door paint colors and boost your exterior style. Stand out with a contrasting hue choice or harmonize by coordinating with your home's exterior colors.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/exterior-colors-garage-doors.jpg",
    collections: [
      {
        id: 5,
        name: "Modern Bedroom",
        colors: [
          { id: 13, name: "Soft White", code: "#f8f8ff" },
          { id: 14, name: "Slate Gray", code: "#708090" },
          { id: 15, name: "Lavender", code: "#e6e6fa" },
        ],
      },
      {
        id: 6,
        name: "Rustic Bedroom",
        colors: [
          { id: 16, name: "Earth Brown", code: "#a52a2a" },
          { id: 17, name: "Forest Green", code: "#228b22" },
          { id: 18, name: "Cranberry Red", code: "#9b111e" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Accents",
    code: "#b9b292",
    title: "Exterior Accents Colors",
    content:
      "Use these exterior accent colors to complement your primary and trim paint colors, showcase your style and make a great first impression on visitors.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/exterior-colors-exterior-accents.jpg",
    collections: [
      {
        id: 7,
        name: "Modern Kitchen",
        colors: [
          { id: 19, name: "Eggshell", code: "#f0ead6" },
          { id: 20, name: "Bright White", code: "#ffffff" },
          { id: 21, name: "Ocean Blue", code: "#4682b4" },
        ],
      },
      {
        id: 8,
        name: "Classic Kitchen",
        colors: [
          { id: 22, name: "Cherry Red", code: "#ff0800" },
          { id: 23, name: "Granite Gray", code: "#676767" },
          { id: 24, name: "Pine Green", code: "#01796f" },
        ],
      },
    ],
  },
];

export default { rooms, exteriors };
