export interface TypeTasks {
  id: number;
  title?: string;
  require?: boolean;
  platForm: {
    name: string;
    type: string;
  };
}
