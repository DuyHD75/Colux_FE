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
            link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-bóng",
        },
        {
            id: 2,
            name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ",
            image:
                "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/70c0382cb5045410d72c3a1d3e6d24ac.png",
            description:
                "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
            link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-mờ",
        },
        {
            id: 3,
            name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Bóng",
            image:
                "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/145ae29faf40e5b0cecf0b37839d9813.png",
            description:
                "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
            link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-bóng",
        },
        {
            id: 4,
            name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ",
            image:
                "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/70c0382cb5045410d72c3a1d3e6d24ac.png",
            description:
                "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
            link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-mờ",
        },
        {
            id: 5,
            name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Bóng",
            image:
                "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/145ae29faf40e5b0cecf0b37839d9813.png",
            description:
                "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
            link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-bóng",
        },
        {
            id: 6,
            name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ",
            image:
                "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/70c0382cb5045410d72c3a1d3e6d24ac.png",
            description:
                "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
            link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-mờ",
        },
        {
            id: 7,
            name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Bóng",
            image:
                "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/145ae29faf40e5b0cecf0b37839d9813.png",
            description:
                "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
            link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-bóng",
        },
        {
            id: 8,
            name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ",
            image:
                "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/70c0382cb5045410d72c3a1d3e6d24ac.png",
            description:
                "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
            link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-mờ",
        },
        {
            id: 9,
            name: "Sơn Phủ PU Nội Thất Cao Cấp Sadolin Mờ",
            image:
                "https://msp.images.akzonobel.com/prd/dh/avndlx/packshots/70c0382cb5045410d72c3a1d3e6d24ac.png",
            description:
                "Bảo vệ bề mặt gỗ đến 5 năm, chống trầy xước, chống bám bẩn, chống rạn nứt, chống nóng chảy màng sơn và chống thấm nước.",
            link: "/vi/san-pham/sơn-phủ-pu-nội-thất-cao-cấp-sadolin-–-mờ",
        },
    ],
};

export const productsSlice = createSlice({
    name: "Products",
    initialState: initialState,
    reducers: {

    }
})

export default productsSlice.reducer;