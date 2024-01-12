export type TypeListCard = {
  id: string;
  avatar: string;
  nameCompany: string;
  title: string;
  date: string;
  popularity: number;
} & (
  | {
      type: 'Instant';
      reWard: string;
      winnerSlot: number;
    }
  | {
      type: 'default';
      description: string;
    }
);
