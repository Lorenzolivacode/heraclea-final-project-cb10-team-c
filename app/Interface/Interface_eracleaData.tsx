
export interface ITxtTraslate {
  italian: string;
  english: string;
  french: string;
  spanish: string;
}

export interface ISubObj {
  id: string;
  title: ITxtTraslate;
  images: string[];
  description: ITxtTraslate;
}

export interface IEracleaDataObj {
  id: string;
  title: ITxtTraslate;
  images: string;
  roadmap: string;
  subcategory: ISubObj;
}

export interface IEventObj {
  id: string;
  name: ITxtTraslate;
  image: string;
  description: ITxtTraslate;
}

export interface IEventData {
  events: IEventObj[];
}
