export interface TypeTasks {
  id: number;
  title?: string;
  require?: boolean;
  platForm: {
    name: string;
    type: string;
  };
  config?: {
    id: number;
    campaignId: string;
    type: string;
    taskActionType: string;
    taskTemplateId: number;
    updatedAt: string;
    createdAt: string;
    taskTemplate: {
      id: number;
      userName: string;
      extra: string | null;
      config: TypeConfig;
      link: string;
      quote: string | null;
      required: boolean;
      updatedAt: string;
      createdAt: string;
    };
    isRequired?: boolean;
    point?: number;
  };
}
export type TypeConfig = (
  | {
      type: 'formatSingle' | 'formatMultiple' | 'freeAnswer';
      title: string;
      listChoice?: { listChoice1: string };
      description: string;
      questionText: string;
      platForm: 'CUSTOM';
    }
  | {
      platForm: 'VISIT_PAGE';
      url: string;
      type: string;
    }
  | {
      platForm: 'LINE';
      url: string;
      type: string;
    }
  | {
      platForm: 'TIKTOK';
      type: 'letThemWatch';
      linkWatch: string;
    }
  | {
      platForm: 'TIKTOK';
      type: 'makeYouFollow';
      linkFollow: string;
    }
  | {
      platForm: 'TELEGRAM';
      type: 'joinChannel';
      linkChannel: string;
    }
  | {
      platForm: 'TELEGRAM';
      type: 'viewPost';
      linkPost: string;
    }
  | {
      platForm: 'DISCORD';
      type: 'discord_invite';
      inviteLink: string;
    }
  | {
      platForm: 'TWITTER';
      type: 'twitter_follow';
      userFollow: string;
    }
  | {
      platForm: 'TWITTER';
      type: 'twitter_repost';
      postURL: string;
    }
  | {
      platForm: 'TWITTER';
      type: 'twitter_repost_quote';
      quotePost: string;
      postURLQuote: string;
    }
  | {
      platForm: 'TWITTER';
      type: 'twitter_make_post_with_hashtags';
      taskTitle: string;
      taskDescription: string;
      defaultPostText: string;
    }
  | {
      platForm: 'TWITTER';
      type: 'twitter_make_post';
      designatedClassicalChinese: string;
    }
) & { requireTask: boolean };
