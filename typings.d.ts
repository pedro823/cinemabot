interface Movie {
    title: string;
    path: string;
    rating: number;
    image: string;
    showtimes: Showtimes;
    synopsis: string;
}

interface Showtimes {
    [name: string]: string[]
}
