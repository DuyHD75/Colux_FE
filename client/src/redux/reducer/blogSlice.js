import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    blogs: [
        { id: 1, title: "HIGH QUALITY PU PAINT LINE FOR INTERIOR WOOD SURFACES", image: "https://images.akzonobel.com/akzonobel-flourish/dulux/vn/vi/sadolin-son-go-cao-cap/Top%20Banner%20-%20KV%20(w1920).jpg?impolicy=.auto&imwidth=1366", content: "Originating in the Scandinavian region of Europe more than a century ago, the Sadolin brand quickly grew and developed continuously, starting with a small scale of production in the art paint and ink industry in 1907." },
        { id: 2, title: "HIGH QUALITY PU PAINT LINE FOR INTERIOR WOOD SURFACES", image: "https://images.akzonobel.com/akzonobel-flourish/dulux/vn/vi/sadolin-son-go-cao-cap/Top%20Banner%20-%20KV%20(w1920).jpg?impolicy=.auto&imwidth=1366", content: "Originating in the Scandinavian region of Europe more than a century ago, the Sadolin brand quickly grew and developed continuously, starting with a small scale of production in the art paint and ink industry in 1907."  },
        { id: 3, title: "HIGH QUALITY PU PAINT LINE FOR INTERIOR WOOD SURFACES", image: "https://images.akzonobel.com/akzonobel-flourish/dulux/vn/vi/sadolin-son-go-cao-cap/Top%20Banner%20-%20KV%20(w1920).jpg?impolicy=.auto&imwidth=1366", content: "Originating in the Scandinavian region of Europe more than a century ago, the Sadolin brand quickly grew and developed continuously, starting with a small scale of production in the art paint and ink industry in 1907." },
        { id: 4, title: "HIGH QUALITY PU PAINT LINE FOR INTERIOR WOOD SURFACES", image: "https://images.akzonobel.com/akzonobel-flourish/dulux/vn/vi/sadolin-son-go-cao-cap/Top%20Banner%20-%20KV%20(w1920).jpg?impolicy=.auto&imwidth=1366", content: "Originating in the Scandinavian region of Europe more than a century ago, the Sadolin brand quickly grew and developed continuously, starting with a small scale of production in the art paint and ink industry in 1907."  },
        { id: 5, title: "HIGH QUALITY PU PAINT LINE FOR INTERIOR WOOD SURFACES", image: "https://images.akzonobel.com/akzonobel-flourish/dulux/vn/vi/sadolin-son-go-cao-cap/Top%20Banner%20-%20KV%20(w1920).jpg?impolicy=.auto&imwidth=1366", content: "Originating in the Scandinavian region of Europe more than a century ago, the Sadolin brand quickly grew and developed continuously, starting with a small scale of production in the art paint and ink industry in 1907." },
        { id: 6, title: "HIGH QUALITY PU PAINT LINE FOR INTERIOR WOOD SURFACES", image: "https://images.akzonobel.com/akzonobel-flourish/dulux/vn/vi/sadolin-son-go-cao-cap/Top%20Banner%20-%20KV%20(w1920).jpg?impolicy=.auto&imwidth=1366", content: "Originating in the Scandinavian region of Europe more than a century ago, the Sadolin brand quickly grew and developed continuously, starting with a small scale of production in the art paint and ink industry in 1907."  },

    ],
};

export const blogSlice = createSlice({
    name: "Blogs",
    initialState: initialState,
    reducers: {

    }
})

export default blogSlice.reducer;