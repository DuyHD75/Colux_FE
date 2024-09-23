import { createSlice } from "@reduxjs/toolkit";
import { Content } from "antd/es/layout/layout";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Hướng dẫn chọn màu sơn cho phòng khách",
      slug: "huong-dan-chon-mau-son-cho-phong-khach",
      content:
        "Đây là nội dung chi tiết của bài viết về chọn màu sơn cho phòng khách...",
      excerpt: "Bài viết này giúp bạn chọn màu sơn phù hợp cho phòng khách...",
      image: "https://via.placeholder.com/600x400",
      category: "Painting Tips",
      createdAt: "2024-09-05",
    },
    {
      id: 2,
      title: "Xu hướng màu sơn năm 2024",
      slug: "xu-huong-mau-son-nam-2024",
      content: "Nội dung bài viết về xu hướng màu sơn trong năm 2024...",
      excerpt: "Khám phá các màu sơn đang thịnh hành trong năm 2024...",
      image: "https://thietkethicongdn.com/wp-content/uploads/2019/01/10-m%C3%A0u-s%C6%A1n-nh%C3%A0-hi%E1%BB%87n-%C4%91%E1%BA%A1i-m%E1%BB%9Bi-nh%E1%BA%A5t-%C4%91%E1%BA%A7u-n%C4%83m-20191.png",
      category: "Trending",
      createdAt: "2024-09-01",
    },
    {
      id: 3,
      title: "Dòng sơn PU cao cấp dành cho bề mặt gỗ nội thất",
      slug: "dong-son-pu-cao-cap-danh-cho-be-mat-go-noi-that",
      content: [
        "Khởi nguyên từ vùng Scandinavia ở Châu Âu hơn một thế kỷ trước, thương hiệu Sadolin nhanh chóng lớn mạnh và phát triển không ngừng, xuất phát điểm với quy mô sản xuất nhỏ trong ngành sơn và mực mỹ thuật vào năm 1907.",
        " Tập đoàn AkzoNobel (trước đó là tập đoàn Nobel Industries) chính thức mua lại Sadolin vào năm 1987. Đến nay, Sadolin được biết đến là chuyên gia hàng đầu trong ngành sơn cho bề mặt gỗ tại nhiều quốc gia trên thế giới như Phần Lan, Oman, Úc, Ấn Độ và Các tiểu vương quốc Ả Rập Thống Nhất.",
        " Với niềm đam mê dành cho sơn và gỗ, Sadolin cam kết mang đến những sản phẩm vượt trội, được ứng dụng công nghệ tiên tiến trong ngành sơn và chất phủ. Sadolin hứa hẹn mang cho các chuyên gia ngành gỗ và thợ mộc tại Việt Nam những sản phẩm tiêu chuẩn châu Âu; giúp bảo vệ và tôn vinh vẻ đẹp vốn có của bề mặt gỗ. Hơn thế nữa, Sadolin còn mang đến cho những người yêu thích đồ gỗ nội thất các sản phẩm cao cấp, sang trọng, được bảo vệ vững bền theo thời gian.",
      ],
      excerpt: "Bảo vệ và tôn vinh nét đẹp của bề mặt gỗ",
      image:
        "https://www.megavietnam.vn/uploads/plugin/news/254/s-n-pu-quy-trinh-s-n-pu-g-pu-son-go.jpg",
      category: "Trending",
      createdAt: "2024-09-01",
    },
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
