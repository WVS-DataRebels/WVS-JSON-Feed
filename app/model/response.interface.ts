export default interface ResponseInterface {
    success: boolean;
    feedURL: string;
    message?: string;
    item?: ResponseItem[];
}

export interface ResponseItem {
    impediments: Impediment[];
    snippets: string[];
    author: string;
    link: string;
    pubDate: Date;
}

export interface Impediment {
    time?: string | null;
    lesson?: string | null;
    room?: string | null;
    happening?: string;
}
