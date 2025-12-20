
export interface Source {
  uri: string;
  title: string;
}

export interface NewsArticle {
  id?: string;
  timestamp?: string;
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
