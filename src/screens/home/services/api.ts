import axios from 'axios'

export const api =axios.create({
baseURL: "https://api.themoviedb.org/3",
params: {
    api_key : "0ad07647d444e15d8f05eb3343fb0d16",
    language: "pt-BR",
    include_adult: true,
},
});