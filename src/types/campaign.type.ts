export type TaskType =
  | {
      platForm: 'web';
      websiteURL: string;
      type?: 'NONE';
    }
  | {
      platForm: 'line';
      linkLine: string;
      type?: 'NONE';
    }
  | {
      platForm: 'tiktok';
      type: 'letThemWatch';
      linkWatch: string;
    }
  | {
      platForm: 'tiktok';
      type: 'makeYouFollow';
      linkFollow: string;
    }
  | {
      platForm: 'telegram';
      type: 'joinChannel';
      linkChannel: string;
    }
  | {
      platForm: 'telegram';
      type: 'viewPost';
      linkPost: string;
    }
  | {
      platForm: 'discord';
      type: 'joinServer';
      inviteLink: string;
    }
  | {
      platForm: 'twitter';
      type: 'follow';
      userFollow: string;
    }
  | {
      platForm: 'twitter';
      type: 'retweet';
      postURL: string;
    }
  | {
      platForm: 'twitter';
      type: 'retweetTheQuote';
      quotePost: string;
      postURLQuote: string;
    }
  | {
      platForm: 'twitter';
      type: 'postsWithSpecifiedHashtags';
      taskTitle: string;
      taskDescription: string;
      defaultPostText?: string;
    }
  | {
      platForm: 'twitter';
      type: 'postSpecifiedText';
      designatedClassicalChinese: string;
    };

export type TypeResponseFormCampaign = {
  campainName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thumbnail?: any;
  category?: string;
  explanatoryText?: string;
  startDate?: string;
  endDate?: string;
  noDate?: boolean;
  requireTask?: TaskType;
  optionTasks?: {
    task1: TaskType;
  };
  typeWinner?: 'AUTO_PRIZEE_DRAW' | 'MANUAL_SELECTION';
  numberOfParticipants?: number;
  compensationSummary?: string;
  reWard?: {
    reWard1: {
      money: number;
      tiketWinning: string;
      receivingMethod: {
        amazon: boolean;
        paypay: boolean;
      };
    };
  };
  statusCampaign?: boolean;
  totalReWard?: number;
  totalTicket?: number;
};
