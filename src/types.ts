
export interface Source {
  uri: string;
  title: string;
}

export interface NewsArticle {
  title: string;
  content: string;
  imageUrl: string;
  sources: Source[];
}

export interface TickerData {
  weather: {
    city: string;
    temperature: string;
    condition: string;
  };
  dollarRate: string;
  headlines: string[];
}
