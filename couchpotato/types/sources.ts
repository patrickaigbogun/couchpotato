export interface SourceUrls {
    movie: string;
    tv: string;
}

export interface Source {
    id: string;
    name: string;
    isFrench: boolean;
    urls: SourceUrls;
}