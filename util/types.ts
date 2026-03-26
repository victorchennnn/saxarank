export type Club = {
  id: number;
  name: string;
  description: string;
  category: string;
  elo: number;
  battles: bigint;
  website: string;
  image_url: string;
  previous_ranking: number;
};

export type Matchup = {
  data: Club[];
  token: string;
};
