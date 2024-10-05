// thêm roomType, content thay bằng description
const rooms = [
  {
    id: 1,
    name: "Bathroom",
    hex: "#536872",
    title: "Bathroom Colors",
    content:
      "Find the perfect bathroom paint color. Whether your vibe is serene or dramatic, create the refuge you want.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/01_sw-9658-fresh-eucalyptus-bathroom_tn.png",
    collections: [
      {
        id: 1,
        name: "Modern Bathroom",
        colors: [
          { id: 1, name: "Sky Blue", hex: "#87ceeb" },
          { id: 2, name: "Mint Green", hex: "#98ff98" },
          { id: 3, name: "Soft Gray", hex: "#a8a8a8" },
        ],
      },
      {
        id: 2,
        name: "Classic Bathroom",
        colors: [
          { id: 4, name: "Ivory", hex: "#fffff0" },
          { id: 5, name: "Navy Blue", hex: "#000080" },
          { id: 6, name: "Charcoal", hex: "#36454f" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Living Room",
    hex: "#bba595",
    title: "Living Room Colors",
    content:
      "Get inspired by these versatile living room paint colors – and create the perfect space for entertaining or relaxing.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/02_sw7044-amazing-gray-living-room_tn.png",
    collections: [
      {
        id: 3,
        name: "Modern Living Room",
        colors: [
          { id: 7, name: "Beige", hex: "#f5f5dc" },
          { id: 8, name: "Chocolate", hex: "#7b3f00" },
          { id: 9, name: "Light Gray", hex: "#d3d3d3" },
        ],
      },
      {
        id: 4,
        name: "Cozy Living Room",
        colors: [
          { id: 10, name: "Warm Red", hex: "#b22222" },
          { id: 11, name: "Olive Green", hex: "#808000" },
          { id: 12, name: "Mustard Yellow", hex: "#ffdb58" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Bedroom",
    hex: "#f0ece2",
    title: "Bedroom Colors",
    content:
      "Get inspired by these versatile living room paint colors – and create the perfect space for entertaining or relaxing.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/03_sw-9132-acacia-haze-bedroom_tn.png",
    collections: [
      {
        id: 5,
        name: "Modern Bedroom",
        colors: [
          { id: 13, name: "Soft White", hex: "#f8f8ff" },
          { id: 14, name: "Slate Gray", hex: "#708090" },
          { id: 15, name: "Lavender", hex: "#e6e6fa" },
        ],
      },
      {
        id: 6,
        name: "Rustic Bedroom",
        colors: [
          { id: 16, name: "Earth Brown", hex: "#a52a2a" },
          { id: 17, name: "Forest Green", hex: "#228b22" },
          { id: 18, name: "Cranberry Red", hex: "#9b111e" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Kitchen",
    hex: "#a6b2b5",
    title: "Kitchen Colors",
    content:
      "Browse kitchen paint colors and bring some added life to your cooking and gathering space.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/04_sw-7666-fleur-de-sel-kitchen_tn.png",
    collections: [
      {
        id: 7,
        name: "Modern Kitchen",
        colors: [
          { id: 19, name: "Eggshell", hex: "#f0ead6" },
          { id: 20, name: "Bright White", hex: "#ffffff" },
          { id: 21, name: "Ocean Blue", hex: "#4682b4" },
        ],
      },
      {
        id: 8,
        name: "Classic Kitchen",
        colors: [
          { id: 22, name: "Cherry Red", hex: "#ff0800" },
          { id: 23, name: "Granite Gray", hex: "#676767" },
          { id: 24, name: "Pine Green", hex: "#01796f" },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Teen Bedroom",
    hex: "#c2b6b6",
    title: "Teen Bedroom Colors",
    content:
      "These carefully selected teen room paint colors will help you and your teen pick a color that creates a welcoming retreat while best expressing their unique style.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/05_sw-9140-blustery-sky-teen-bedroom_tn.png",
    collections: [
      {
        id: 9,
        name: "Vibrant Teen Bedroom",
        colors: [
          { id: 25, name: "Electric Blue", hex: "#7df9ff" },
          { id: 26, name: "Neon Green", hex: "#39ff14" },
          { id: 27, name: "Hot Pink", hex: "#ff69b4" },
        ],
      },
      {
        id: 10,
        name: "Cool Teen Bedroom",
        colors: [
          { id: 28, name: "Aqua", hex: "#00ffff" },
          { id: 29, name: "Royal Purple", hex: "#7851a9" },
          { id: 30, name: "Silver", hex: "#c0c0c0" },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Dining Room",
    hex: "#d6d3cc",
    title: "Dining Room Colors",
    content:
      "Browse dining room paint colors and bring the perfect balance of sophistication and comfort to this traditional hosting space.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/06_sw-7024-functional-gray-dining-room_tn.png",
    collections: [
      {
        id: 11,
        name: "Elegant Dining Room",
        colors: [
          { id: 31, name: "Wine Red", hex: "#722f37" },
          { id: 32, name: "Champagne Gold", hex: "#f7e7ce" },
          { id: 33, name: "Deep Plum", hex: "#673147" },
        ],
      },
      {
        id: 12,
        name: "Cozy Dining Room",
        colors: [
          { id: 34, name: "Rustic Brown", hex: "#8b4513" },
          { id: 35, name: "Burnt Orange", hex: "#cc5500" },
          { id: 36, name: "Terracotta", hex: "#e2725b" },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Home Office",
    hex: "#b0b5b5",
    title: "Home Office Colors",
    content:
      "Discover the perfect mood-boosting office paint color. Transform your home office into an inviting yet functional space that can serve as a catalyst for increased productivity and creativity.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/07_sw-9107-uber-umber-office_tn.png",
    collections: [
      {
        id: 13,
        name: "Modern Home Office",
        colors: [
          { id: 37, name: "Steel Blue", hex: "#4682b4" },
          { id: 38, name: "Graphite Gray", hex: "#53565a" },
          { id: 39, name: "White", hex: "#ffffff" },
        ],
      },
      {
        id: 14,
        name: "Minimalist Home Office",
        colors: [
          { id: 40, name: "Off White", hex: "#f8f8ff" },
          { id: 41, name: "Matte Black", hex: "#0a0a0a" },
          { id: 42, name: "Soft Beige", hex: "#dcd0c0" },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Nursery",
    hex: "#a4b7bd",
    title: "Nursery Colors",
    content:
      "These nursery paint colors can nourish calm and inspire fun – with hues from renewing greens to versatile neutrals to perky pinks.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/08_sw-6310-lotus-flower-nursery_tn.png",
    collections: [
      {
        id: 15,
        name: "Pastel Nursery",
        colors: [
          { id: 43, name: "Baby Blue", hex: "#89cff0" },
          { id: 44, name: "Pale Pink", hex: "#fadadd" },
          { id: 45, name: "Mint Green", hex: "#98ff98" },
        ],
      },
      {
        id: 16,
        name: "Bright Nursery",
        colors: [
          { id: 46, name: "Sunshine Yellow", hex: "#fff700" },
          { id: 47, name: "Bright Orange", hex: "#ffae42" },
          { id: 48, name: "Bright Blue", hex: "#1e90ff" },
        ],
      },
    ],
  },
];

const exteriors = [
  {
    id: 1,
    name: "Main Exterior",
    hex: "#679199",
    title: "Exterior House Colors",
    content:
      "Choosing the right exterior house color for your home can heighten your curb appeal while highlighting your personal style.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/exterior-colors-main.jpg",
    collections: [
      {
        id: 1,
        name: "Modern Bathroom",
        colors: [
          { id: 1, name: "Sky Blue", hex: "#87ceeb" },
          { id: 2, name: "Mint Green", hex: "#98ff98" },
          { id: 3, name: "Soft Gray", hex: "#a8a8a8" },
        ],
      },
      {
        id: 2,
        name: "Classic Bathroom",
        colors: [
          { id: 4, name: "Ivory", hex: "#fffff0" },
          { id: 5, name: "Navy Blue", hex: "#000080" },
          { id: 6, name: "Charcoal", hex: "#36454f" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Front Door",
    hex: "#2f2f30",
    title: "Exterior Front Door Colors",
    content:
      "By choosing a new front door paint color, you can quickly upgrade your exterior while infusing it with a splash of personal style.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/exterior-colors-front-doors.jpg",
    collections: [
      {
        id: 3,
        name: "Modern Living Room",
        colors: [
          { id: 7, name: "Beige", hex: "#f5f5dc" },
          { id: 8, name: "Chocolate", hex: "#7b3f00" },
          { id: 9, name: "Light Gray", hex: "#d3d3d3" },
        ],
      },
      {
        id: 4,
        name: "Cozy Living Room",
        colors: [
          { id: 10, name: "Warm Red", hex: "#b22222" },
          { id: 11, name: "Olive Green", hex: "#808000" },
          { id: 12, name: "Mustard Yellow", hex: "#ffdb58" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Garage Door",
    hex: "#d7c5ae",
    title: "Exterior Garage Door Colors",
    content:
      "Browse garage door paint colors and boost your exterior style. Stand out with a contrasting hue choice or harmonize by coordinating with your home's exterior colors.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/exterior-colors-garage-doors.jpg",
    collections: [
      {
        id: 5,
        name: "Modern Bedroom",
        colors: [
          { id: 13, name: "Soft White", hex: "#f8f8ff" },
          { id: 14, name: "Slate Gray", hex: "#708090" },
          { id: 15, name: "Lavender", hex: "#e6e6fa" },
        ],
      },
      {
        id: 6,
        name: "Rustic Bedroom",
        colors: [
          { id: 16, name: "Earth Brown", hex: "#a52a2a" },
          { id: 17, name: "Forest Green", hex: "#228b22" },
          { id: 18, name: "Cranberry Red", hex: "#9b111e" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Accents",
    hex: "#b9b292",
    title: "Exterior Accents Colors",
    content:
      "Use these exterior accent colors to complement your primary and trim paint colors, showcase your style and make a great first impression on visitors.",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/exterior-colors-exterior-accents.jpg",
    collections: [
      {
        id: 7,
        name: "Modern Kitchen",
        colors: [
          { id: 19, name: "Eggshell", hex: "#f0ead6" },
          { id: 20, name: "Bright White", hex: "#ffffff" },
          { id: 21, name: "Ocean Blue", hex: "#4682b4" },
        ],
      },
      {
        id: 8,
        name: "Classic Kitchen",
        colors: [
          { id: 22, name: "Cherry Red", hex: "#ff0800" },
          { id: 23, name: "Granite Gray", hex: "#676767" },
          { id: 24, name: "Pine Green", hex: "#01796f" },
        ],
      },
    ],
  },
];

//desc = description
const colors = [
  {
    id: 1,
    name: "Crimson",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#dc143c",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 2,
    name: "Maroon",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: true,
    colorFamily: 1,
    hex: "#800000",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 3,
    name: "Burgundy",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#800020",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 4,
    name: "Dark Scarlet",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#560319",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 5,
    name: "Blood Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#660000",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 6,
    name: "Ruby",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#e0115f",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 7,
    name: "Wine",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#722f37",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 8,
    name: "Cardinal",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#c41e3a",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 9,
    name: "Raspberry",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#e30b5d",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 10,
    name: "Dark Cherry",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#900020",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 11,
    name: "Pink",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ffc0cb",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 12,
    name: "Salmon",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#fa8072",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 13,
    name: "Coral",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ff7f50",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 14,
    name: "Rose",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ff007f",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 15,
    name: "Tomato",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ff6347",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 16,
    name: "Cherry Blossom",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ffb7c5",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 17,
    name: "Watermelon",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#fc6c85",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 18,
    name: "Strawberry",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ff5470",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 19,
    name: "Blush",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#de5d83",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 20,
    name: "Carnation",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ff69b4",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 21,
    name: "Scarlet",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ff2400",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 22,
    name: "Fire Brick",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#b22222",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 23,
    name: "Dark Crimson",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#8b0000",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 24,
    name: "Bordeaux",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#800020",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 25,
    name: "Rust",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#b7410e",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 26,
    name: "Mahogany",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#420a1d",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 27,
    name: "Blood Orange",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#d1001c",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 28,
    name: "Vermilion",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#d9381e",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 29,
    name: "Pomegranate",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#c11b17",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 30,
    name: "Ruby Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#9b111e",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 31,
    name: "Ruby",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#e0115f",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 32,
    name: "Garnet",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#733635",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 33,
    name: "Wine Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#8b0000",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 34,
    name: "Maroon",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#800000",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 35,
    name: "Brick Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#b22222",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 36,
    name: "Fire Engine Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ce2029",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 37,
    name: "Crimson Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#990000",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 38,
    name: "Raspberry Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#e30b5d",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 39,
    name: "Deep Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#8b0000",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 40,
    name: "Burgundy",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#800020",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 41,
    name: "Vermilion",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#d9381e",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 42,
    name: "Coral",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ff7f50",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 43,
    name: "Tomato Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ff6347",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 44,
    name: "Crimson",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#dc143c",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 45,
    name: "Ruby",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#e0115f",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 46,
    name: "Scarlet",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ff2400",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 47,
    name: "Fire Engine Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ce2029",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 48,
    name: "Cherry Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#ff0800",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 49,
    name: "Pomegranate",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#c11b17",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
  {
    id: 50,
    name: "Blood Red",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-6871-positive-red-living-room-600x408-optimized?qlt=82&wid=1024&ts=1707235216129&dpr=off",
    code: "SV-2220",
    LRV: 60,
    collection: [1, 2],
    interior: true,
    exterior: false,
    colorFamily: 1,
    hex: "#660000",
    desc: "Undertones of wheat and a tinge of green lend a soft warm body to this neutral that makes it stand out. Encourage a sense of well-being in your space.",
  },
];

const customerRoom = [
  {
    id : 1,
    userId: 2,
    colorId: 2, 
    name: "Red Paint for Room",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/CoJo_ColorFamilyPage_UGC_Red_Image1_@maelutzz_372x372_desktop_2x?qlt=82&wid=320&ts=1704842194228&dpr=off",
  },
  {
    id : 2,
    userId: 1,
    colorId: 3, 
    name: "Red Paint for Room",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/CoJo_ColorFamilyPage_UGC_Red_Image2_@househomemade_372x372_desktop_2x?qlt=82&wid=320&ts=1704842208627&dpr=off",
  },
  {
    id : 3,
    userId: 1,
    colorId: 1, 
    name: "Red Paint for Room",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/CoJo_ColorFamilyPage_UGC_Red_Image3_@home_ec_op_372x372_desktop_2x?qlt=82&wid=320&ts=1704842202946&dpr=off",
  },
  {
    id : 4,
    userId: 3,
    colorId: 4, 
    name: "Red Paint for Room",
    img: "https://s7d2.scene7.com/is/image/sherwinwilliams/CoJo_ColorFamilyPage_UGC_Red_Image4_@suzannekrytondesigns_372x372_desktop_2x?qlt=82&wid=320&ts=1704842195441&dpr=off",
  }
];

const blogs = [
  {
    id: 1,
    title: "Cozy Beige for Living Room",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/02_sw7044-amazing-gray-living-room_tn.png",
    expert: "John Doe",
    roomId: 2,
    description: "Perfect for a warm, welcoming living room.",
    type: "tips"
  },
  {
    id: 2,
    title: "Ocean Blue for Bedroom",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/03_sw-9132-acacia-haze-bedroom_tn.png",
    expert: "Jane Smith",
    roomId: 3,
    description: "Ideal for a calming bedroom.",
    type: "advice"
  },
  {
    id: 3,
    title: "Mint Green for Bathroom",
    img: "https://www.sherwin-williams.com/content/dam/sherwin/tag/us/en_us/color-journey/color-collections/01_sw-9658-fresh-eucalyptus-bathroom_tn.png",
    expert: "Alex Green",
    roomId: 1,
    description: "Bright and refreshing for bathrooms.",
    type: "tips"
  },
];

const reviews = [
  {
    id: 1,
    user: "Alice",
    rating: 5,
    comment: "Great product, very satisfied!",
    productId: 16,
    date: "2024-08-15",
  },
  {
    id: 2,
    user: "Bob",
    rating: 4,
    comment: "Good quality, but delivery was slow.",
    productId: 16,
    date: "2024-08-15",
  },
  {
    id: 3,
    user: "Charlie",
    rating: 3,
    comment: "Product is okay, but could be better.",
    productId: 14,
    date: "2024-08-15",
  },
  {
    id: 4,
    user: "David",
    rating: 4.5,
    comment: "The product was amazing, highly recommended!",
    productId: 14,
    date: "2024-08-15",
  },
  {
    id: 5,
    user: "Eva",
    rating: 5,
    comment: "Absolutely love this wallpaper, looks great in my living room.",
    productId: 15,
    date: "2024-08-15",
  },
  {
    id: 6,
    user: "Fiona",
    rating: 4.2,
    comment: "Good product, easy to install.",
    productId: 15,
    date: "2024-08-15",
  },
  {
    id: 7,
    user: "George",
    rating: 4.8,
    comment: "This paint color changed the vibe of my bedroom!",
    productId: 14,
    date: "2024-08-15",
  },
];


export default { rooms, exteriors, colors, customerRoom, blogs, reviews };
