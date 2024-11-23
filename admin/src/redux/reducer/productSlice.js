import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 154,
      createdAt: "2024-11-13T12:21:11.912759Z",
      updatedAt: "2024-11-13T12:21:22.917328Z",
      code: "SYLIQJLKQ5FD",
      status: 1,
      toName: "Dat Kieu",
      toPhone: "0818080927",
      toAddress: "FPT University",
      toWardName: "Thị trấn Núi Thành",
      toDistrictName: "Huyện Núi Thành",
      toProvinceName: "Quảng Nam",
      note: "Vui lòng giao trước ngày 20",
      totalAmount: 75.0,
      tax: 7.5,
      shippingCost: 4.0,
      totalPay: 87.0,
      paymentMethod: "PAYPAL",
      paymentStatus: 2,
      products: [
        {
          variantId: "ecb02819-3717-4fa5-ab78-52adb2528f08",
          variantDescription: "12",
          categoryName: "Paint",
          packageType: "Barrel",
          variantInventory: 94,
          priceSell: 75.0,
          itemQuantity: 1,
          productDetails: {
            productId: "a5d5047b-6095-41b8-94b7-639d175134c9",
            productName: "MYKOLOR GRAND GARNET FEEL",
            productDescription:
              "MYKOLOR GRAND GARNET FEEL is a product made from Polymer-based plastic components for bright, beautiful soap, scrubbed paint surface, easy to wipe off scars, suitable for decoration and protection of high-class interior decoration, townhouses, villas and high-class apartments.",
            productImage:
              "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/products%2FMYKOLOR%20GRAND%20GARNET%20FEEL.png?alt=media&token=13a15729-ab1d-42e2-a542-c05cb6875010",
            code: "KOLUX-0000001",
            paintDetails: {
              paintId: "22e41bc4-a63c-4bbc-b44f-206fe48eb9e9",
              colorId: "2846dac8-f046-42ca-bcf8-c8177f364d46",
              hex: "#ffc863",
            },
          },
        },
      ],
    },
    {
      id: 158,
      createdAt: "2024-11-13T12:49:37.225798Z",
      updatedAt: "2024-11-13T13:01:25.207847Z",
      code: "XVPCCMKOXYPY",
      status: 3,
      toName: "Dat Kieu",
      toPhone: "0818080927",
      toAddress: "FPT University",
      toWardName: "Thị trấn Núi Thành",
      toDistrictName: "Huyện Núi Thành",
      toProvinceName: "Quảng Nam",
      note: "Vui lòng giao trước 5h",
      totalAmount: 30.0,
      tax: 3.0,
      shippingCost: 4.0,
      totalPay: 37.0,
      paymentMethod: "CASH",
      paymentStatus: 1,
      products: [
        {
          variantId: "a074a079-6b9a-4399-be4c-6abf78f357e1",
          variantDescription: "5",
          categoryName: "Paint",
          packageType: "Barrel",
          variantInventory: 94,
          priceSell: 30.0,
          itemQuantity: 1,
          productDetails: {
            productId: "a5d5047b-6095-41b8-94b7-639d175134c9",
            productName: "MYKOLOR GRAND GARNET FEEL",
            productDescription:
              "MYKOLOR GRAND GARNET FEEL is a product made from Polymer-based plastic components for bright, beautiful soap, scrubbed paint surface, easy to wipe off scars, suitable for decoration and protection of high-class interior decoration, townhouses, villas and high-class apartments.",
            productImage:
              "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/products%2FMYKOLOR%20GRAND%20GARNET%20FEEL.png?alt=media&token=13a15729-ab1d-42e2-a542-c05cb6875010",
            code: "KOLUX-0000001",
            paintDetails: {
              paintId: "22e41bc4-a63c-4bbc-b44f-206fe48eb9e9",
              colorId: "2846dac8-f046-42ca-bcf8-c8177f364d46",
              hex: "#ffc863",
            },
          },
        },
      ],
    },
    {
      id: 161,
      createdAt: "2024-11-13T13:00:46.827188Z",
      updatedAt: "2024-11-13T13:00:56.245518Z",
      code: "H5HPI9DTVHDN",
      status: 1,
      toName: "Dat Kieu",
      toPhone: "0818080927",
      toAddress: "FPT University",
      toWardName: "Thị trấn Núi Thành",
      toDistrictName: "Huyện Núi Thành",
      toProvinceName: "Quảng Nam",
      note: "đá",
      totalAmount: 60.0,
      tax: 6.0,
      shippingCost: 4.0,
      totalPay: 70.0,
      paymentMethod: "CASH",
      paymentStatus: 3,
      products: [
        {
          variantId: "ef2066d0-4d11-4d49-8d6a-e4b10bf51c87",
          variantDescription: "8",
          categoryName: "Paint",
          packageType: "Barrel",
          variantInventory: 97,
          priceSell: 60.0,
          itemQuantity: 1,
          productDetails: {
            productId: "a5d5047b-6095-41b8-94b7-639d175134c9",
            productName: "MYKOLOR GRAND GARNET FEEL",
            productDescription:
              "MYKOLOR GRAND GARNET FEEL is a product made from Polymer-based plastic components for bright, beautiful soap, scrubbed paint surface, easy to wipe off scars, suitable for decoration and protection of high-class interior decoration, townhouses, villas and high-class apartments.",
            productImage:
              "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/products%2FMYKOLOR%20GRAND%20GARNET%20FEEL.png?alt=media&token=13a15729-ab1d-42e2-a542-c05cb6875010",
            code: "KOLUX-0000001",
            paintDetails: {
              paintId: "4ab14e3a-aa0a-4fb2-b41d-0452fd3d441d",
              colorId: "33677954-33cd-4af3-a281-5b655a8ccd72",
              hex: "#fbdca8",
            },
          },
        },
      ],
    },
    {
      id: 165,
      createdAt: "2024-11-13T13:52:10.200752Z",
      updatedAt: "2024-11-13T14:04:12.200169Z",
      code: "MV9OAKCGL7SL",
      status: 3,
      toName: "Kiều Hoàng Đạt",
      toPhone: "0818080927",
      toAddress: "436 Phạm Văn Đồng",
      toWardName: "Thị trấn Núi Thành",
      toDistrictName: "Huyện Núi Thành",
      toProvinceName: "Quảng Nam",
      note: "Vui lòng giao trước 5h",
      totalAmount: 80.0,
      tax: 8.0,
      shippingCost: 4.0,
      totalPay: 92.0,
      paymentMethod: "CASH",
      paymentStatus: 1,
      products: [
        {
          variantId: "17b82562-645d-418f-b3f4-9f904e7d9628",
          variantDescription: "15 x 2",
          categoryName: "Wallpaper",
          packageType: "Roll",
          variantInventory: 100,
          priceSell: 10.0,
          itemQuantity: 8,
          productDetails: {
            productId: "ae6ee3b8-b771-4f10-a3e3-3486bc9ed1d9",
            productName: "Xavia Wallpaper 3901-2",
            productDescription:
              "XAVIA wallpaper is manufactured by JYJ Wallpaper, Korean technology brings high quality products. XAVIA collection helps you easily choose your favorite color with a diverse color palette. In addition, XAVIA also brings modern, easy-to-apply patterns: imitation wood, imitation cement, imitation concrete, imitation stone, neoclassical patterns, cartoons for children's rooms...",
            productImage:
              "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/products%2FGi%E1%BA%A5y%20d%C3%A1n%20t%C6%B0%E1%BB%9Dng%20Xavia%203901-2.png?alt=media&token=5ea80c21-2902-4d18-8770-feed2d8b2033",
            code: "KOLUX-0000006",
            wallpaperDetails: {
              wallpaperId: "ecbf0506-6d95-4789-add7-0d01290e1220",
            },
          },
        },
      ],
    },
  ],
};

export const productsSlice = createSlice({
  name: "Products",
  initialState: initialState,
  reducers: {},
});

export default productsSlice.reducer;
