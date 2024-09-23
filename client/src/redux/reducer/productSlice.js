import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Bóng",
      image:
        "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/145ae29faf40e5b0cecf0b37839d9813.png",
      description:
        "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
      features: [
        "Bảo vệ bề mặt gỗ đến 5 năm",
        "Chống trầy xước",
        "Chống bám bẩn",
      ],
      link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-bóng",
      categoryId: 1,
      rating: 4, 
      surface: "Stucco", 
    },
    {
      id: 2,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ",
      image:
        "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/70c0382cb5045410d72c3a1d3e6d24ac.png",
      description:
        "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
      features: [
        "Bảo vệ bề mặt gỗ đến 5 năm",
        "Chống trầy xước",
        "Chống bám bẩn",
      ],
      link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-mờ",
      categoryId: 1,
      rating: 4, 
      surface: "Wood", 
    },
    {
      id: 3,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Bóng",
      image:
        "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/145ae29faf40e5b0cecf0b37839d9813.png",
      description:
        "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
      features: [
        "Bảo vệ bề mặt gỗ đến 5 năm",
        "Chống trầy xước",
        "Chống bám bẩn",
      ],
      link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-bóng",
      categoryId: 2,
      rating: 4, 
      surface: "Wood", 
    },
    {
      id: 4,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ",
      image:
        "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/70c0382cb5045410d72c3a1d3e6d24ac.png",
      description:
        "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
      features: [
        "Bảo vệ bề mặt gỗ đến 5 năm",
        "Chống trầy xước",
        "Chống bám bẩn",
      ],
      link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-mờ",
      categoryId: 1,
      rating: 3, 
      surface: "Wood", 
    },
    {
      id: 5,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Bóng",
      image:
        "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/145ae29faf40e5b0cecf0b37839d9813.png",
      description:
        "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
      features: [
        "Bảo vệ bề mặt gỗ đến 5 năm",
        "Chống trầy xước",
        "Chống bám bẩn",
      ],
      link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-bóng",
      categoryId: 3,
      rating: 3, 
      surface: "Wood", 
    },
    {
      id: 6,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ",
      image:
        "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/70c0382cb5045410d72c3a1d3e6d24ac.png",
      description:
        "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
      features: [
        "Bảo vệ bề mặt gỗ đến 5 năm",
        "Chống trầy xước",
        "Chống bám bẩn",
        "Chống rạn nứt",
      ],
      link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-mờ",
      categoryId: 4,
      rating: 5, 
      surface: "Wood", 
    },
    {
      id: 7,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Bóng",
      image:
        "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/145ae29faf40e5b0cecf0b37839d9813.png",
      description:
        "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
      features: [
        "Bảo vệ bề mặt gỗ đến 5 năm",
        "Chống trầy xước",
        "Chống bám bẩn",
        "Chống rạn nứt",
      ],
      link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-bóng",
      categoryId: 5,
      rating: 5,
      surface: "Wood",
    },
    {
      id: 8,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ",
      image:
        "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/70c0382cb5045410d72c3a1d3e6d24ac.png",
      description:
        "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
      features: [
        "Bảo vệ bề mặt gỗ đến 5 năm",
        "Chống trầy xước",
        "Chống bám bẩn",
        "Chống rạn nứt",
      ],
      link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-mờ",
      categoryId: 5,
      rating: 4,
      surface: "Wood",
    },
    {
      id: 9,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ",
      image:
        "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/70c0382cb5045410d72c3a1d3e6d24ac.png",
      description:
        "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
      features: [
        "Bảo vệ bề mặt gỗ đến 5 năm",
        "Chống trầy xước",
        "Chống bám bẩn",
        "Chống rạn nứt",
      ],
      link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-mờ",
      categoryId: 4,
      rating: 4,
      surface: "Wood", 
    },
    {
      id: 10,
      name: "Decal Dán Tường Phòng Khách Hoa Văn",
      image:
        "https://stc.subi.vn/image/1/171208/2200/20ca3ac8ec8e1c20c2f18fc2e1429afc.jpg",
      description:
        "Decal dán tường hoa văn, dễ dàng dán và bóc, không để lại keo, tạo phong cách sang trọng cho phòng khách.",
      features: [
        "Dễ dàng dán và bóc",
        "Không để lại keo",
        "Phong cách sang trọng",
      ],
      link: "/vi/san-pham/decal-dán-tường-phòng-khách-hoa-văn",
      categoryId: 8,
      rating: 4,
      surface: "Wall", 
    },
    {
      id: 11,
      name: "Decal Dán Tường Phòng Ngủ Hoạt Hình",
      image:
        "https://stc.subi.vn/image/1/171208/2200/20ca3ac8ec8e1c20c2f18fc2e1429afc.jpg",
      description:
        "Decal dán tường với các nhân vật hoạt hình, tạo không gian vui tươi và sinh động cho phòng ngủ trẻ em.",
      features: [
        "Nhân vật hoạt hình dễ thương",
        "Dễ dàng dán và bóc",
        "Phù hợp với phòng ngủ trẻ em",
      ],
      link: "/vi/san-pham/decal-dán-tường-phòng-ngủ-hoạt-hình",
      categoryId: 8,
      rating: 5, // Đánh giá sao
      surface: "Wall", // Bề mặt áp dụng
    },
    {
      id: 12,
      name: "Sàn Gỗ Công Nghiệp Chống Thấm Nước",
      image:
        "https://sangogiahoang.com/uploads/noidung/images/san-nhua-gia-go-vinyl-fo304-hot-giahoang.jpg",
      description:
        "Sàn gỗ công nghiệp chống thấm nước, độ bền cao, dễ lắp đặt và bảo trì, phù hợp cho mọi không gian.",
      features: ["Chống thấm nước", "Độ bền cao", "Dễ lắp đặt và bảo trì"],
      link: "/vi/san-pham/sàn-gỗ-công-nghiệp-chống-thấm-nước",
      categoryId: 7,
      rating: 4, 
      surface: "Floor",
    },
    {
      id: 13,
      name: "Sàn Nhựa Vinyl Giả Gỗ",
      image:
        "https://sangogiahoang.com/uploads/noidung/images/san-nhua-gia-go-vinyl-fo304-hot-giahoang.jpg",
      description:
        "Sàn nhựa Vinyl giả gỗ, chống trầy xước, chống thấm nước, bề mặt mềm mại, dễ vệ sinh.",
      features: ["Giả gỗ tự nhiên", "Chống trầy xước", "Dễ vệ sinh"],
      link: "/vi/san-pham/sàn-nhựa-vinyl-giả-gỗ",
      categoryId: 7,
      rating: 5, 
      surface: "Floor", 
    },
  ],
};

export const productsSlice = createSlice({
  name: "Products",
  initialState: initialState,
  reducers: {},
});

export default productsSlice.reducer;
