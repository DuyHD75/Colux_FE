import { createSlice } from "@reduxjs/toolkit";
import { Content } from "antd/es/layout/layout";

const initialState = {
  posts: [
    {
      "id": 1,
      "title": "Why You Should Choose Waterproof Paint for Your Home",
      "slug": "why-choose-waterproof-paint-for-your-home",
      "expert": "Jane Smith",
      "content": "Waterproof paint is an essential solution for protecting your home from the harsh effects of weather, especially in regions with high humidity or heavy rainfall. These paints are specially formulated to create a protective barrier on walls, preventing water from seeping into the structure. Over time, this not only maintains the aesthetic appeal of your home but also extends the lifespan of the construction. \n\nWaterproof paints come with several benefits: \n- **Durability**: Ensures walls remain crack-free and resistant to mold or mildew. \n- **Cost Efficiency**: Reduces the need for frequent maintenance and repairs. \n- **Versatility**: Available in various colors and finishes to match your decor needs. \n\nWhen choosing waterproof paint, it’s crucial to consider the specific needs of your property. For example, exterior waterproof paints like Dulux WeatherShield provide excellent UV protection and resistance to extreme temperatures, while interior products such as Jotun Majestic Resist help maintain a clean and moisture-free environment indoors. Investing in high-quality waterproof paint is a smart decision that protects your property and ensures peace of mind for years to come.",
      "excerpt": "Discover why waterproof paint is a must-have for protecting your home against harsh weather and moisture damage.",
      "image": "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2FWhy%20You%20Should%20Choose%20Waterproof%20Paint%20for%20Your%20Home.webp?alt=media&token=7e21480f-15ae-4652-b889-5d08d4bc943d",
      "category": "Painting Tips",
      "createdAt": "2024-09-15",
      "type": "advice"
    },
    {
      "id": 2,
      "title": "Durable Interior Paints for Every Space",
      "slug": "durable-interior-paints-for-every-space",
      "expert": "Mark Johnson",
      "content": "Choosing the right interior paint can transform your living space, adding not only beauty but also functionality to your walls. Durable interior paints are designed to withstand daily wear and tear, making them ideal for high-traffic areas like living rooms, kitchens, and hallways. \n\nOne of the key features of high-quality interior paints is their ability to resist stains and scratches. For instance, paints with advanced washable formulas, such as Sherwin-Williams Emerald Interior, allow you to easily clean off smudges without damaging the finish. These paints also offer exceptional color retention, ensuring that your walls look fresh and vibrant for years. \n\nFor those looking to create a cozy and inviting atmosphere, matte and eggshell finishes work best, as they soften the light and hide imperfections on the surface. On the other hand, glossy and semi-gloss finishes are perfect for kitchens and bathrooms, where durability and moisture resistance are paramount. \n\nInvesting in durable interior paint is not just about aesthetics; it’s about making a smart, long-term decision for your home. Brands like Benjamin Moore Regal Select and Behr Marquee provide a perfect balance of style, durability, and easy maintenance, making them top choices for homeowners and professionals alike.",
      "excerpt": "Upgrade your interiors with paints that combine durability and elegance, suitable for every space in your home.",
      "image": "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2FDurable%20Interior%20Paints%20for%20Every%20Space.png?alt=media&token=58c96574-53c3-45d1-acfa-2222225bd67e",
      "category": "Home Decor",
      "createdAt": "2024-09-10",
      "type": "tips"
    },
    {
      "id": 3,
      "title": "The 2024 Color Trends You Need to Know",
      "slug": "2024-color-trends-you-need-to-know",
      "expert": "Emily Davis",
      "content": "As we step into 2024, the world of interior design and painting is embracing a bold new palette of colors that reflect optimism, serenity, and connection to nature. Color experts predict that this year's trends will focus on hues that evoke emotions and create a harmonious living environment. \n\nOne standout trend is the rise of natural greens and earthy tones, such as olive, sage, and terracotta. These colors bring a calming presence to any room and pair beautifully with wood accents and natural textures. Another popular choice is warm neutrals like beige and taupe, which add sophistication without overwhelming the space. For those looking to make a statement, deep jewel tones such as sapphire blue, emerald green, and ruby red are expected to dominate accent walls and furniture pieces. \n\nBeyond aesthetics, the 2024 trends emphasize sustainability, with eco-friendly paint options becoming more prevalent. Low-VOC and non-toxic paints are now available in a wide array of shades, allowing homeowners to prioritize both style and health. Brands like Farrow & Ball and Valspar have introduced collections inspired by these themes, ensuring that you can stay on trend while being environmentally conscious. \n\nWhether you’re renovating your living room or refreshing your workspace, the 2024 color trends provide endless inspiration for creating a space that feels both modern and timeless.",
      "excerpt": "Explore the top color trends of 2024 and how they can transform your living spaces with style and sustainability.",
      "image": "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2FThe%202024%20Color%20Trends%20You%20Need%20to%20Know.png?alt=media&token=a90d5666-7dd3-403c-8c03-d524fd739d78",
      "category": "Trending",
      "createdAt": "2024-09-12",
      "type": "advice"
    },
    // {
    //   "id": 4,
    //   "title": "How to Choose the Perfect Paint for Kitchens",
    //   "slug": "how-to-choose-perfect-paint-for-kitchens",
    //   "expert": "Sarah Green",
    //   "content": "Kitchens are one of the busiest spaces in any home, requiring paints that are not only beautiful but also durable and easy to clean. Choosing the right paint for your kitchen involves balancing aesthetics with practicality. \n\n**Why It Matters**: The kitchen walls are exposed to grease, steam, and frequent cleaning. Using regular paint may result in faded or peeling walls. To address these challenges, opt for high-quality, washable paints with moisture-resistant properties.\n\n**Key Features to Look For**:\n- **Scrub Resistance**: Ensures the walls can withstand repeated cleaning without losing their finish.\n- **Moisture Resistance**: Prevents mold and mildew in high-humidity environments.\n- **Grease Resistance**: Makes it easier to clean oil splatters and stains.\n\n**Popular Choices**: Eggshell or satin finishes work best for kitchens as they provide a slight sheen that repels moisture while remaining easy to clean. Brands like Behr Premium Plus Kitchen & Bath and Benjamin Moore Aura are highly recommended for their superior durability and stain resistance. \n\nTransform your kitchen into a functional yet stylish space by selecting paints that are as hardworking as the room itself.",
    //   "excerpt": "Find out how to select durable and stylish paints that meet the unique challenges of kitchen environments.",
    //   "image": "https://www.google.com/imgres?q=How%20to%20Choose%20the%20Perfect%20Paint%20for%20Kitchens&imgurl=https%3A%2F%2Fwww.marthastewart.com%2Fthmb%2FqhYShzZ2wVz2jHGrujbzo47bCoM%3D%2F1500x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fpowder-blue-kitchen-full-0120-opus-a65e6ce00fc44ca2ba0796f6848fea8e.jpg&imgrefurl=https%3A%2F%2Fwww.marthastewart.com%2F1035640%2Fkitchen-color-tips&docid=5u_EFjIv8NvhDM&tbnid=Si0AGFcebuZyzM&vet=12ahUKEwjDs52VioOKAxXislYBHV4CKi0QM3oECBgQAA..i&w=1500&h=1000&hcb=2&ved=2ahUKEwjDs52VioOKAxXislYBHV4CKi0QM3oECBgQAA",
    //   "category": "Practical Tips",
    //   "createdAt": "2024-09-20",
    //   "type": "tips"
    // },
    {
      "id": 5,
      "title": "Eco-Friendly Paints: A Sustainable Choice for Your Home",
      "slug": "eco-friendly-paints-sustainable-choice",
      "expert": "Michael Brown",
      "content": "As environmental awareness grows, eco-friendly paints have become a popular choice among homeowners. These paints are designed to reduce harmful emissions, ensuring a safer and healthier indoor environment for you and your family. \n\n**What Are Eco-Friendly Paints?**: These are paints with low or zero volatile organic compounds (VOCs), which are chemicals that can evaporate into the air and cause health problems. Eco-friendly options are made using natural ingredients, such as plant-based oils and water.\n\n**Benefits**:\n- Improved indoor air quality.\n- Reduced environmental impact.\n- Safe for sensitive individuals, including children and pets.\n\n**Brands to Explore**: Companies like ECOS Paints, Clare Paint, and Earthborn offer eco-friendly paints in a wide variety of colors and finishes. These products are also highly durable, proving that you don't have to compromise on quality for sustainability.\n\nChoosing eco-friendly paints is not just a trend; it's a step toward creating a better world. Whether you’re repainting your bedroom or revamping your living room, make the switch to paints that protect both your health and the planet.",
      "excerpt": "Learn why eco-friendly paints are the perfect combination of safety, style, and sustainability.",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsRhrh-EEDe4tDYu0tZd-3E1od99AIvZu9jA&s",
      "category": "Sustainability",
      "createdAt": "2024-09-22",
      "type": "advice"
    },
    {
      "id": 6,
      "title": "The Best Exterior Paints for Long-Lasting Protection",
      "slug": "best-exterior-paints-long-lasting-protection",
      "expert": "Emma White",
      "content": "Exterior paints play a vital role in protecting your home from harsh weather conditions while enhancing its curb appeal. Choosing the right paint for your exterior ensures that your home remains beautiful and protected for years to come.\n\n**Factors to Consider**:\n1. **Weather Resistance**: Exterior paints should withstand sun, rain, and snow. UV-resistant formulas help prevent fading.\n2. **Durability**: Look for paints with excellent adhesion and resistance to peeling and cracking.\n3. **Finish**: Satin and semi-gloss finishes are popular for exteriors, as they repel dirt and are easy to clean.\n\n**Recommended Products**:\n- **Dulux Weathershield**: Provides excellent protection against extreme weather conditions.\n- **Sherwin-Williams Duration**: Known for its long-lasting durability and mildew resistance.\n- **Behr Premium Plus Ultra**: Combines paint and primer for maximum coverage.\n\nWith the right exterior paint, you can maintain your home's aesthetic appeal while ensuring it remains resilient against the elements.",
      "excerpt": "Discover the top exterior paints that combine beauty with unparalleled durability and protection.",
      "image": "https://www.tricopainting.com/images/blog/The%20Best%20Exterior%20House%20Paint%202.jpg",
      "category": "Home Maintenance",
      "createdAt": "2024-09-18",
      "type": "tips"
    },
    {
      "id": 7,
      "title": "Top Paint Colors for Modern Living Rooms",
      "slug": "top-paint-colors-modern-living-rooms",
      "expert": "Sophia Lee",
      "content": "Living rooms are the heart of the home, and the right paint color can set the tone for the entire space. Modern trends focus on creating versatile and inviting environments using a mix of neutral and bold colors.\n\n**Color Recommendations**:\n- **Soft Greys**: Timeless and sophisticated, grey pairs beautifully with wood furniture and metallic accents.\n- **Deep Blues**: Create a cozy yet elegant atmosphere with navy or teal shades.\n- **Warm Beiges**: Add warmth and comfort to your living room with creamy beige tones.\n\n**Accent Ideas**: Pair neutral walls with bold accent colors on a single wall or through furniture and decor. For instance, a grey living room can be elevated with mustard yellow cushions or a navy feature wall.\n\nChoosing the right color palette is key to transforming your living room into a modern masterpiece. With the right shades and finishes, you can create a space that reflects both style and functionality.",
      "excerpt": "Explore the top paint colors that bring modern living rooms to life with elegance and style.",
      "image": "https://www.southernliving.com/thmb/-7OM9ZyWbIR-Ekm8mA3cQ6Stk8U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AngelaNewtonRoy-64e3b82a356c4b0cb1b0fd56c2771b8d.jpg",
      "category": "Trending",
      "createdAt": "2024-09-19",
      "type": "advice"
    },
    {
      "id": 8,
      "title": "The Ultimate Guide to Choosing Paint for Kids’ Rooms",
      "slug": "ultimate-guide-paint-kids-rooms",
      "expert": "Emily Carter",
      "content": "Decorating a child's room is not just about aesthetics; it’s about creating a safe, fun, and nurturing environment. The paint you choose plays a crucial role in achieving this. \n\n**Key Considerations**:\n- **Safety First**: Use low-VOC or zero-VOC paints to ensure minimal exposure to harmful chemicals.\n- **Durability**: Kids’ rooms are prone to spills and scribbles. Look for washable and scrubbable paint options.\n- **Color Psychology**: Bright yellows and blues encourage creativity, while soft greens and lavenders promote calmness.\n\n**Pro Tips**:\n- Add a chalkboard or whiteboard paint section to encourage creativity.\n- Use stencils or wall decals to create themed decor without permanent changes.\n\nBrands like Sherwin-Williams Harmony and Behr Ultra Scuff Defense are excellent choices for kids’ rooms. With these tips, you can transform your child’s space into a lively and safe haven.",
      "excerpt": "Learn how to pick the perfect paint for kids' rooms, balancing safety, style, and practicality.",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxqxRsAqGJEdo9R0BcYMrkteIxNVdgDqHt-A&s",
      "category": "Family Spaces",
      "createdAt": "2024-09-25",
      "type": "guide"
    },
    {
      "id": 9,
      "title": "A Review of the Best Matte Finish Paints",
      "slug": "review-best-matte-finish-paints",
      "expert": "Daniel Thomas",
      "content": "Matte finish paints are becoming increasingly popular for their sophisticated look and ability to hide imperfections. But which brands deliver the best results? Here’s a breakdown of the top contenders:\n\n**1. Benjamin Moore Aura**:\n- Features: Highly durable with a rich, velvety finish.\n- Pros: Superior coverage, low odor, and washable.\n- Cons: Higher price point.\n\n**2. Sherwin-Williams Emerald**:\n- Features: Eco-friendly with low-VOC content.\n- Pros: Exceptional stain resistance and color retention.\n- Cons: Limited availability in some regions.\n\n**3. Behr Premium Plus**:\n- Features: Affordable and widely available.\n- Pros: Excellent for DIY projects; easy to apply.\n- Cons: Not as durable as premium brands.\n\nWhen choosing a matte paint, consider the room's purpose and the amount of traffic it receives. For high-traffic areas, prioritize durability over cost.",
      "excerpt": "Dive into our comprehensive review of the best matte finish paints for your home.",
      "image": "https://www.nobroker.in/blog/wp-content/uploads/2024/01/Metallic-wall-paint.jpg",
      "category": "Product Reviews",
      "createdAt": "2024-09-27",
      "type": "review"
    },
    {
      "id": 10,
      "title": "Glossy vs. Matte: Which Paint Finish Is Right for You?",
      "slug": "glossy-vs-matte-paint-finish",
      "expert": "Rachel Nguyen",
      "content": "Choosing between glossy and matte finishes can be challenging. Each has its own strengths and works best in specific scenarios. Here's a quick comparison to help you decide:\n\n**Glossy Finish**:\n- Reflects light, making spaces appear brighter.\n- Highly durable and easy to clean.\n- Ideal for kitchens, bathrooms, and trim work.\n\n**Matte Finish**:\n- Absorbs light, creating a soft and elegant look.\n- Hides wall imperfections effectively.\n- Best suited for bedrooms, living rooms, and ceilings.\n\n**What to Consider**:\n- **Room Function**: High-traffic areas benefit from glossy finishes, while low-traffic spaces look great with matte.\n- **Aesthetic Goals**: For a modern vibe, opt for glossy. For a cozy atmosphere, choose matte.\n\nBy understanding these differences, you can confidently pick the finish that aligns with your home’s style and needs.",
      "excerpt": "Compare glossy and matte finishes to determine the perfect option for your home.",
      "image": "https://paintingdrive.com/blog/wp-content/uploads/2024/06/matte-finish.png",
      "category": "Comparisons",
      "createdAt": "2024-09-28",
      "type": "comparison"
    },
    {
      "id": 11,
      "title": "How Paint Colors Influence Your Mood: Insights from Psychology",
      "slug": "paint-colors-influence-mood",
      "expert": "Dr. Hannah Lee",
      "content": "Paint colors do more than decorate your home—they have the power to influence your emotions and mental well-being. Here’s how:\n\n**Warm Colors**:\n- **Red**: Boosts energy and passion; ideal for dining rooms.\n- **Yellow**: Evokes happiness and optimism; great for kitchens.\n\n**Cool Colors**:\n- **Blue**: Promotes calmness and focus; perfect for bedrooms and offices.\n- **Green**: Represents harmony and nature; works well in living rooms.\n\n**Neutral Colors**:\n- **White**: Offers a clean and refreshing feel.\n- **Grey**: Creates a sophisticated, balanced look.\n\n**Pro Tip**: Combine warm and cool colors to balance energy and relaxation in multi-purpose spaces. Paint is a powerful tool in shaping the mood of your home. Use it wisely!",
      "excerpt": "Discover how the psychology of colors can transform your home and mood.",
      "image": "https://media.licdn.com/dms/image/D5612AQFWKdVZer1GSg/article-cover_image-shrink_720_1280/0/1703262836910?e=2147483647&v=beta&t=T6CnOS_xJuiL0fVpur9U7mI0Cq79uicJW3n6OlsjQwo",
      "category": "Design Insights",
      "createdAt": "2024-09-29",
      "type": "insight"
    },
    // {
    //   "id": 12,
    //   "title": "Top 5 Paint Mistakes to Avoid During Renovation",
    //   "slug": "top-5-paint-mistakes-to-avoid",
    //   "expert": "Alex Carter",
    //   "content": "Painting seems simple, but common mistakes can lead to less-than-perfect results. Here are five pitfalls to avoid:\n\n1. **Skipping Primer**: Primer creates a smooth base and enhances paint adhesion. Skipping it can result in uneven coverage.\n2. **Choosing the Wrong Paint Type**: Using interior paint for exteriors or vice versa can lead to peeling and weather damage.\n3. **Ignoring Surface Prep**: Failing to clean and sand walls can cause paint to flake.\n4. **Overloading the Brush**: This leads to drips and uneven application. Always use thin, even coats.\n5. **Not Testing Colors**: Colors look different under various lighting. Test swatches on your wall before committing.\n\nAvoiding these mistakes will ensure your painting project is smooth and long-lasting.",
    //   "excerpt": "Learn the top painting mistakes and how to avoid them for flawless results.",
    //   "image": "https://via.placeholder.com/600x400",
    //   "category": "DIY Tips",
    //   "createdAt": "2024-09-30",
    //   "type": "tips"
    // }
  ],
  filteredPosts: [], // Thêm filteredPosts vào initialState
  selectedCategory: null, // Thêm selectedCategory vào initialState
  searchQuery: "", // Thêm trạng thái tìm kiếm
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Các hành động hiện tại
    filterPostsByCategory: (state, action) => {
      const category = action.payload;
      state.selectedCategory = category;
      state.filteredPosts = state.posts.filter(
        (post) => post.category === category
      );
    },
    clearCategoryFilter: (state) => {
      state.selectedCategory = null;
      state.filteredPosts = state.posts;
    },
    setSearchQuery: (state, action) => {
      const query = action.payload.toLowerCase();
      state.searchQuery = query;
      if (state.selectedCategory) {
        state.filteredPosts = state.posts.filter(
          (post) =>
            post.category === state.selectedCategory &&
            (post.title.toLowerCase().includes(query) ||
              post.excerpt.toLowerCase().includes(query))
        );
      } else {
        state.filteredPosts = state.posts.filter(
          (post) =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query)
        );
      }
    },
    clearSearchQuery: (state) => {
      state.searchQuery = "";
      if (state.selectedCategory) {
        state.filteredPosts = state.posts.filter(
          (post) => post.category === state.selectedCategory
        );
      } else {
        state.filteredPosts = state.posts;
      }
    },
    fetchPosts: (state, action) => {
      // Cập nhật trạng thái bài viết nếu cần
    },
  },
});

export const {
  filterPostsByCategory,
  clearCategoryFilter,
  setSearchQuery,
  clearSearchQuery,
  fetchPosts,
} = postsSlice.actions;

export const selectPosts = (state) => state.posts.filteredPosts;
export const selectSelectedCategory = (state) => state.posts.selectedCategory;
export const selectSearchQuery = (state) => state.posts.searchQuery;

export default postsSlice.reducer;
