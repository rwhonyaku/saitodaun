// lib/statusSites.ts

export type SiteConfig = {
  /** URL slug & stable identifier (SEO-critical) */
  id: string;

  /** 表示名（日本語・公式表記） */
  name: string;

  /** 実際に接続チェックするURL */
  url: string;

  /** 公式ステータスページ（あれば） */
  officialStatusUrl?: string;

  /** 公式サポート・ヘルプページ */
  supportUrl?: string;

  /** 公式X（旧Twitter）アカウント */
  xUrl?: string;

  /** サービス固有の注意点・よくある障害パターン（SEO差別化の核） */
  serviceNote: string;

  /** 日本語検索で使われやすい別名・旧名 */
  aliases?: string[];
};

export const STATUS_SITES: SiteConfig[] = [
  {
    id: "google",
    name: "Google",
    url: "https://www.google.com",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/",
    xUrl: "https://x.com/google",
    serviceNote:
      "検索・Gmail・Google Workspace など複数サービスが同時に影響を受けることがあります。ログイン周りや一部地域のみの障害として発生するケースも多いです。",
    aliases: ["グーグル"],
  },
  {
    id: "yahoo-japan",
    name: "Yahoo! JAPAN",
    url: "https://www.yahoo.co.jp",
    officialStatusUrl:
      "https://www.yahoo-help.jp/app/answers/detail/p/537/a_id/40959",
    supportUrl: "https://support.yahoo-net.jp/",
    serviceNote:
      "トップページは表示されても、メールやオークションなど一部機能のみ利用できない障害が発生することがあります。",
    aliases: ["ヤフー"],
  },
  {
    id: "rakuten",
    name: "楽天市場",
    url: "https://www.rakuten.co.jp",
    officialStatusUrl: "https://status.rakuten.co.jp/",
    supportUrl: "https://ichiba.faq.rakuten.net/",
    serviceNote:
      "決済や注文履歴の表示に問題が出るケースが多く、アプリのみ影響する障害も報告されています。",
  },
  {
    id: "amazon-jp",
    name: "Amazon.co.jp",
    url: "https://www.amazon.co.jp",
    officialStatusUrl: "https://health.aws.amazon.com/health/status",
    supportUrl: "https://www.amazon.co.jp/hz/contact-us",
    serviceNote:
      "サイト自体は表示されても、購入・決済・注文履歴が正常に動作しない場合は一時的な障害の可能性があります。",
    aliases: ["アマゾン"],
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/youtube/",
    serviceNote:
      "動画の読み込み不良やライブ配信のみ視聴できないなど、機能限定の障害が発生することがあります。",
  },
  {
    id: "twitter",
    name: "X（旧Twitter）",
    url: "https://twitter.com",
    officialStatusUrl: "https://api.twitterstat.us/",
    supportUrl: "https://help.x.com/",
    xUrl: "https://x.com/x",
    serviceNote:
      "タイムラインは表示されても投稿や通知が遅延するなど、部分的な障害として現れるケースが多いです。",
    aliases: ["ツイッター", "Twitter"],
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com",
    officialStatusUrl: "https://metastatus.com/instagram",
    supportUrl: "https://help.instagram.com/",
    serviceNote:
      "投稿・ストーリーズ・DM のいずれかのみが利用できない障害が発生することがあります。",
  },
  {
    id: "line",
    name: "LINE",
    url: "https://line.me",
    officialStatusUrl: "https://line-status.github.io/",
    supportUrl: "https://help.line.me/",
    serviceNote:
      "メッセージ送信は可能でも通話やスタンプ購入が利用できないなど、機能限定の障害が起きやすいです。",
  },
  {
    id: "mercari",
    name: "メルカリ",
    url: "https://www.mercari.com/jp/",
    officialStatusUrl: "https://help.jp.mercari.com/guide/articles/865/",
    supportUrl: "https://help.jp.mercari.com/",
    serviceNote:
      "検索や出品は可能でも、購入手続きや支払い処理が正常に完了しない障害が発生することがあります。",
  },
  {
    id: "paypay",
    name: "PayPay",
    url: "https://paypay.ne.jp",
    officialStatusUrl: "https://www.paypay.ne.jp/notice/",
    supportUrl: "https://paypay.ne.jp/help/",
    serviceNote:
      "決済エラーや残高反映の遅延など、支払い関連に限定した障害が発生するケースが多いです。",
  },
];

export function getSiteById(id: string): SiteConfig | undefined {
  return STATUS_SITES.find((s) => s.id === id);
}
