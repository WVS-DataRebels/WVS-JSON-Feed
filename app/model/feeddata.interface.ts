export default interface FeedData {
    items: Item[];
    feedUrl: string;
    image: Image;
    title: string;
    description: string;
    link: string;
    language: string;
    lastBuildDate: string;
};;;;;;;;;;

export interface Image {
    link: string;
    url: string;
    title: string;
    width: string;
    height: string;
}

export interface Item {
    creator: string;
    title: string;
    link: string;
    pubDate: string;
    author: string;
    content: string;
    contentSnippet: string;
    guid: string;
    isoDate: Date;
}
