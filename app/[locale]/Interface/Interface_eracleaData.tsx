export interface ITxtTraslate {
  italian: string;
  english: string;
  french: string;
  spanish: string;
}

export interface ISubObj {
  id: string;
  title: string;
  images: string[];
  description: string;
}

export interface IEracleaDataObj {
  id: string;
  title: string;
  titleDetails: string;
  image: string;
  roadmap: string;
  subcategory: ISubObj;
}

export interface IEventObj {
  id: string;
  title: string;
  credits: string;
  roadmap: string;
  image: string;
  description: string;
}

export interface IEventData {
  events: IEventObj[];
}
