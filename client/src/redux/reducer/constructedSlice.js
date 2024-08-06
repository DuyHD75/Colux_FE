import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    constructed: [
        { id: 1, name: "BA NA HILLS GOLF COURSE", 
        address: "Da Nang",
        image: "https://www.toagroup.com.vn/uploads/project/d148031bfdf49f-sangolfbanahinhlon.jpg", 
        content: "Ba Na Hills Golf Course is the first golf course designed by famous golfer Luke Donald, Sun Group as the investor and IMG as the management. The golf course has been honored with the World Golf Awards' Best New Golf Course in the World. ' The golf course includes a restaurant system, clubhouse, tool shop, and utilities that are perfect for busy businesspeople.Type of paint used: NanoShield exterior paint" },
        { id: 2, name: "VINPEARL NHA TRANG", 
        address: "Nha Trang",
        image: "https://www.toagroup.com.vn/uploads/project/e0b1dfa0ff7f07-mainpoolv14404069w902.jpg", 
        content: "Vinpearl or Hon Ngoc Viet Resort is a luxury resort of Nha Trang on the Hon Tre island , and and it belongs to the Vingroup. Vinpearl Land is currently one of the 30 most beautiful bays in the world - with four surfing waves, the natural beauty of the sunshine. To be a synchronous investment, high class and professional with the system of hotels and luxury resorts, Vinpearl deserves a paradise for visitors to enjoy the happiness of life.Type of paint used: NanoShield exterior paint and NanoClean interior paint." },
        { id: 3, name: "PHU MY THUAN APARTMENT – NHA BE", 
        address: "Ho Chi Minh City",
        image: "https://www.toagroup.com.vn/uploads/project/1cbf251f645a63-chungcuphumythuannhabe2.jpg", 
        content: "This apartment is placed on favorable location with 2 fronts: Huynh Tan Phat and Nguyen Binh where take 4.5 kilometer to My Hung.With unique U-shaped design, all apartments of Phu My Thuan receive the cool breeze blowing from park and river. At the high southern floors allow taking view of the beyond space to see the Nha Be River and the vast green of the Can Gio forest ecosystem." },
        { id: 4, name: "BUU LONG PAGODA - DISTRICT 9", 
        address: "Ho Chi Minh City",
        image: "https://www.toagroup.com.vn/uploads/project/93781bf9d9f435-chuabuulongquan92.jpg", 
        content: "ddress: 81 Nguyen Xien Street, Long Binh Ward, District 9, about 20 km from the center of Ho Chi Minh City.The Buu Long Pagoda is located on a hill the west of Dong Nai River. The temple stands out with its brilliant yellow stupa on the skyline, and its exquisite sculpture which looks as if you are lost in the Thai pagodas." },
        { id: 5, name: "HOANG ANH GIA LAI APARTMENT – DISTRICT 7", 
        address: "Ho Chi Minh City",
        image: "https://www.toagroup.com.vn/uploads/project/236ba0d1641ae0-chungcuhaglquan73.jpg", 
        content: "The Hoang Anh Gia Lai luxury apartment is located on the central of District 7. There are 3 frontispieces to be adjacent with Le Van Luong, Nguyen Thi Thap and 28th street. The interior of the apartment is equipped with the highest-quality building materials such as natural granite, peach wood, TOA high grade paints which are directly implemented by architects, engineers, skillful workers of Hoang Anh Gia Lai staff." },
        { id: 6, name: "NOVOTEL HOTEL – DA NANG", 
        address: "Da Nang",
        image: "https://www.toagroup.com.vn/uploads/project/fa305664791a83-novoteldanangpremierhinhlon.jpg", 
        content: "Novotel Da Nang is one of the five star hotels located on the banks of the poetic Han River. With 37 separate floors are supplied with a wide range of high quality leisure services to bring the most relaxing space.Highlights of the hotel are sky bar 36; international restaurant 'The Square', etc. bring the vibrant and comfortable feeling of a modern life." },
    ],
};

export const constructedSlice = createSlice({
    name: "Constructed",
    initialState: initialState,
    reducers: {

    }
})

export default constructedSlice.reducer;