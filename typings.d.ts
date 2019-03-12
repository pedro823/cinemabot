interface Movie {
    title: string;
    path: string;
    rating: number;
    image: string;
    showtimes: Showtimes;
}

interface Showtimes {
    [name: string]: string[]
}
