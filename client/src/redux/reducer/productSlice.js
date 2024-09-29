import { createSlice } from "@reduxjs/toolkit";

// image,
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
      rating: 4, // Thêm đánh giá sao
      surface: "Stucco", // Thêm thông tin surface
      price: 100,
      stock: 50,
      paintId: 1,
      wallpaperId: null,
      floorId: null,
      colorIds: [1, 2, 3, 4],
      volume: 18,             
      coverage: 10,            
      dryingTime: "2 hours",    
      layers: 2  
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
      rating: 4, // Thêm đánh giá sao
      surface: "Wood", // Thêm thông tin surface
      price: 200,
      stock: 50,
      paintId: 1,
      wallpaperId: null,
      floorId: null,
      colorIds: [1, 2, 3, 4],
      volume: 18, // lít            
      coverage: 8,  // lít/m vuông        
      dryingTime: "2 hours",    
      layers: 2  // lớp
    },
    {
      id: 3,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Bóng 2",
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
      rating: 4, // Thêm đánh giá sao
      surface: "Wood", // Thêm thông tin surface
      price: 200,
      stock: 50,
      paintId: 1,
      wallpaperId: null,
      floorId: null,
      colorIds: [1, 2, 3, 4],
      volume: 18,             
      coverage: 9,            
      dryingTime: "2 hours",    
      layers: 2  
    },
    {
      id: 4,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ 2",
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
      rating: 3, // Thêm đánh giá sao
      surface: "Wood", // Thêm thông tin surface
      price: 200,
      stock: 50,
      paintId: 1,
      wallpaperId: null,
      floorId: null,
      colorIds: [1, 2, 3, 4],
      volume: 18,             
      coverage: 7,            
      dryingTime: "2 hours",    
      layers: 2  
    },
    {
      id: 5,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Bóng 3",
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
      rating: 3, // Thêm đánh giá sao
      surface: "Wood", // Thêm thông tin surface
      price: 200,
      stock: 50,
      paintId: 1,
      wallpaperId: null,
      floorId: null,
      colorIds: [1, 2, 3, 4],
      volume: 18,             
      coverage: 12,            
      dryingTime: "2 hours",    
      layers: 2  
    },
    {
      id: 6,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ 3",
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
      rating: 5, // Thêm đánh giá sao
      surface: "Wood", // Thêm thông tin surface
      price: 200,
      stock: 50,
      paintId: 1,
      wallpaperId: null,
      floorId: null,
      colorIds: [1, 2, 3, 4],
      volume: 18,             
      coverage: 12,            
      dryingTime: "2 hours",    
      layers: 2  
    },
    {
      id: 7,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Bóng 4",
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
      rating: 5, // Thêm đánh giá sao
      surface: "Wood", // Thêm thông tin surface
      price: 200,
      stock: 50,
      paintId: 1,
      wallpaperId: null,
      floorId: null,
      colorIds: [1, 2, 3, 4],
      volume: 18,             
      coverage: 12,            
      dryingTime: "2 hours",    
      layers: 2  
    },
    {
      id: 8,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ 4",
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
      rating: 4, // Thêm đánh giá sao
      surface: "Wood", // Thêm thông tin surface
      price: 200,
      stock: 50,
      paintId: 1,
      wallpaperId: null,
      floorId: null,
      colorIds: [1, 2, 3, 4],
      volume: 18,             
      coverage: 12,            
      dryingTime: "2 hours",    
      layers: 2  
    },
    {
      id: 9,
      name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ 5",
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
      rating: 4, // Thêm đánh giá sao
      surface: "Wood", // Thêm thông tin surface
      price: 200,
      stock: 50,
      paintId: 1,
      wallpaperId: null,
      floorId: null,
      colorIds: [1, 2, 3, 4],
      volume: 18,             
      coverage: 12,            
      dryingTime: "2 hours",    
      layers: 2  
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
      rating: 4, // Đánh giá sao
      surface: "Wall", // Bề mặt áp dụng
      price: 150,
      stock: 80,
      paintId: null,
      wallpaperId: 1,
      floorId: null,
      size: 10 
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
      price: 150,
      stock: 80,
      paintId: null,
      wallpaperId: 1,
      floorId: null,
      size: 10 
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
      rating: 4, // Đánh giá sao
      surface: "Floor", // Bề mặt áp dụng
      price: 100,
      stock: 123,
      paintId: null,
      wallpaperId: null,
      floorId: 1,
      size: 2
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
      rating: 5, // Đánh giá sao
      surface: "Floor", // Bề mặt áp dụng
      price: 100,
      stock: 123,
      paintId: null,
      wallpaperId: null,
      floorId: 1,
      size: 2
    },
    
    {
      id: 16,
      name: "Sàn Nhựa Vinyl Giả Gỗ 2",
      image: "https://sangogiahoang.com/uploads/noidung/images/san-nhua-gia-go-vinyl-fo304-hot-giahoang.jpg",
      description: "Sàn nhựa Vinyl giả gỗ, chống trầy xước, chống thấm nước, bề mặt mềm mại, dễ vệ sinh.",
      features: ["Giả gỗ tự nhiên", "Chống trầy xước", "Dễ vệ sinh"],
      link: "/vi/san-pham/sàn-nhựa-vinyl-giả-gỗ",
      categoryId: 7,
      rating: 5,
      surface: "Floor",
      price: 100,
      stock: 123,
      paintId: null,
      wallpaperId: null,
      floorId: 1,
      size: 2 //m vuông
    },
    {
      id: 14,
      name: "Sơn Tường Nội Thất",
      image: "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/70c0382cb5045410d72c3a1d3e6d24ac.png",
      description: "Sơn tường nội thất chất lượng cao, độ phủ tốt, thời gian khô nhanh, bền màu.",
      features: ["Độ phủ cao", "Thời gian khô nhanh", "Bền màu"],
      link: "/vi/san-pham/son-noi-that",
      categoryId: 1,
      rating: 4.5,
      surface: "Wall",
      price: 200,
      stock: 50,
      paintId: 1,
      wallpaperId: null,
      floorId: null,
      colorIds: [1, 2, 3, 4],
      volume: 18,             
      coverage: 12,            
      dryingTime: "2 hours",    
      layers: 2                
    },
    {
      id: 15,
      name: "Giấy Dán Tường Hoa Văn",
      image: "https://stc.subi.vn/image/1/171208/2200/20ca3ac8ec8e1c20c2f18fc2e1429afc.jpg",
      description: "Giấy dán tường hoa văn cao cấp, chống thấm, dễ dàng thi công và vệ sinh.",
      features: ["Hoa văn tinh tế", "Chống thấm", "Dễ thi công"],
      link: "/vi/san-pham/giay-dan-tuong-hoa-van",
      categoryId: 2,
      rating: 4.8,
      surface: "Wall",
      price: 150,
      stock: 80,
      paintId: null,
      wallpaperId: 1,
      floorId: null,
      size: 10,
    }
  ],
};

export const productsSlice = createSlice({
  name: "Products",
  initialState: initialState,
  reducers: {},
});

export default productsSlice.reducer;
