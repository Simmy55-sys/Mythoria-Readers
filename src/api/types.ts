export interface LatestChapterResponse {
  id: string;
  title: string;
  chapterNumber: number;
  publishDate: string;
  seriesId: string;
  series: {
    id: string;
    title: string;
    slug: string;
    featuredImage: string;
    categories: string[];
  };
  contentPreview: string;
}

export interface LatestSeriesChapterResponse {
  id: string;
  chapterNumber: number;
  isPremium: boolean;
  publishDate: string;
}

export interface LatestSeriesResponse {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  recentChapters: LatestSeriesChapterResponse[];
}

export interface PopularSeriesResponse {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  categories: string[];
}

export interface AllSeriesChapterResponse {
  id: string;
  chapterNumber: number;
  isPremium: boolean;
  publishDate: string;
}

export interface AllSeriesResponse {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  status: string;
  novelType: string;
  categories: string[];
  averageRating: number;
  recentChapters: AllSeriesChapterResponse[];
}

export interface AllSeriesListResponse {
  data: AllSeriesResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SeriesDetailsChapterResponse {
  id: string;
  title: string;
  chapterNumber: number;
  isPremium: boolean;
  publishDate: string;
  priceInCoins: number;
}

export interface SeriesDetailsResponse {
  id: string;
  title: string;
  slug: string;
  author: string;
  translatorName: string;
  description: string;
  featuredImage: string;
  status: string;
  novelType: string;
  originalLanguage: string;
  categories: string[];
  averageRating: number;
  totalRatings: number;
  totalViews: number;
  totalBookmarks: number;
  totalLikes: number;
  totalChapters: number;
}

export interface SeriesDetailsListResponse {
  series: SeriesDetailsResponse;
  chapters: SeriesDetailsChapterResponse[];
  totalChapters: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ChapterNavigationResponse {
  id: string;
  chapterNumber: number;
  title: string;
  isPremium: boolean;
}

export interface ChapterReaderResponse {
  chapter: {
    id: string;
    title: string;
    chapterNumber: number;
    isPremium: boolean;
    publishDate: string;
    language: string;
    priceInCoins: number;
    notes: string | null;
    content?: string;
  };
  prevChapter: ChapterNavigationResponse | null;
  nextChapter: ChapterNavigationResponse | null;
  series: {
    id: string;
    title: string;
    slug: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface BookmarkResponse {
  id: string;
  userId: string;
  seriesId: string;
  bookmarkedAt: string;
  series?: {
    id: string;
    title: string;
    slug: string;
    featuredImage: string;
    categories: { name: string }[];
  };
}

export interface BookmarkCheckResponse {
  isBookmarked: boolean;
}

export interface LikeResponse {
  id: string;
  userId: string;
  seriesId: string;
  likedAt: string;
}

export interface LikeCheckResponse {
  isLiked: boolean;
}

export interface PurchaseChapterResponse {
  id: string;
  chapterId: string;
  purchaseDate: string;
  remainingBalance: number;
}

export interface CreateCoinPurchaseOrderRequest {
  coinAmount: number;
  amountPaid: number;
}

export interface CreateCoinPurchaseOrderResponse {
  purchaseId: string;
  orderId: string;
  approvalUrl: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  coinPurchase: {
    id: string;
    coinAmount: number;
    amountPaid: number;
    status: string;
  };
  newBalance: number;
}

export interface CoinPurchaseResponse {
  id: string;
  coinAmount: number;
  amountPaid: number;
  paymentProvider: string;
  paymentId: string | null;
  orderId: string | null;
  status: "pending" | "completed" | "failed" | "cancelled";
  purchaseDate: string;
}
