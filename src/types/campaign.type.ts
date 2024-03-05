export type TaskType = (
  | {
      platForm: 'web';
      websiteURL?: string;
      type: 'NONE' | string;
    }
  | {
      platForm: 'line';
      linkLine?: string;
      type: 'NONE' | string;
    }
  | {
      platForm: 'tiktok';
      type: 'letThemWatch' | string;
      linkWatch?: string;
    }
  | {
      platForm: 'tiktok';
      type: 'makeYouFollow' | string;
      linkFollow?: string;
    }
  | {
      platForm: 'telegram';
      type: 'joinChannel' | string;
      linkChannel?: string;
    }
  | {
      platForm: 'telegram';
      type: 'viewPost' | string;
      linkPost?: string;
    }
  | {
      platForm: 'discord';
      type: 'joinServer' | string;
      inviteLink?: string;
    }
  | {
      platForm: 'twitter';
      type: 'follow' | string;
      userFollow?: string;
    }
  | {
      platForm: 'twitter';
      type: 'retweet' | string;
      postURL?: string;
    }
  | {
      platForm: 'twitter';
      type: 'retweetTheQuote' | string;
      quotePost?: string;
      postURLQuote?: string;
    }
  | {
      platForm: 'twitter';
      type: 'postsWithSpecifiedHashtags' | string;
      taskTitle?: string;
      taskDescription?: string;
      defaultPostText?: string;
    }
  | {
      platForm: 'twitter';
      type: 'postSpecifiedText' | string;
      designatedClassicalChinese?: string;
    }
) & { taskId: string; isRequiredTask?: boolean; pointsAwarded?: string };

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
  typeWinnerFormReWard?: 'AUTO_PRIZEE_DRAW' | 'MANUAL_SELECTION';
  typeWinner?: 'AUTO_PRIZEE_DRAW' | 'MANUAL_SELECTION';
  numberOfParticipants?: number;
  compensationSummary?: string;
  reWard?: {
    reWard1: {
      reWardId?: number;
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
  price?: number;
  priceWithTax?: number;
  usePoint?: boolean;
};
