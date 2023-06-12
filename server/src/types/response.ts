export type ResponseType = {
  message: string;
  data?: any;
  error?: string[];
};

export type PaginateResponse = {
  message: string;
  totalPage: number;
  currentPage: number;
  data?: any;
};

export type InfiniteScrollResponse = {
  message: string;
  hasMoreData: boolean;
  data?: any;
};
