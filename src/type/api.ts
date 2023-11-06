export type QueryString = {
  limit?: number;
};

export interface QueryStringWText extends QueryString {
  searchText: string;
}
