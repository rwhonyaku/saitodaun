import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteById, SITE_CATEGORIES, STATUS_SITES } from "@/lib/statusSites";
import StatusClient from "./StatusClient";
import { SITE } from "@/lib/siteMeta";
import IMobileAd from "@/components/ads/IMobileAd";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

const STATUS_SERVICE_MARKS: Record<string, string> = {
  teams: "MT",
  twitter: "X",
  notion: "N",
  steam: "S",
  line: "L",
  youtube: "▶",
  instagram: "IG",
  openai: "AI",
  discord: "D",
  slack: "S",
  zoom: "Z",
  google: "G",
  paypay: "P",
  "amazon-jp": "A",
  "yahoo-japan": "Y!",
  "microsoft-365": "M",
};

export function generateStaticParams() {
  return STATUS_SITES.map(({ id }) => ({ id }));
}

const STATUS_AD_ENABLED_IDS = new Set([
  "twitter",
  "line",
  "discord",
  "prime-video",
  "google",
  "youtube",
  "netflix",
  "amazon-jp",
  "rakuten",
  "mercari",
  "paypay",
  "instagram",
  "tiktok",
  "yahoo-japan",
  "gmail",
  "openai",
  "slack",
  "zoom",
  "notion",
  "teams",
  "steam",
  "microsoft-365",
  "aws",
  "jira",
]);

const statusOverrides: Record<string, { title: string; description: string }> = {
  google: {
    title: "Google障害・不具合｜検索できない・各サービスの現在状況",
    description:
      "Googleで障害や不具合が起きているか確認できます。検索できない、ログインできない、Gmail・マップ・Driveなど一部サービスだけ開かない時に影響範囲を確認します。",
  },
  slack: {
    title: "Slack障害・不具合｜繋がらない・メッセージ送れない時の現在状況",
    description:
      "Slackで現在広い障害や不具合が起きているか確認できます。繋がらない、メッセージが送れない、通知だけ遅い、通話だけ不安定な場合は影響範囲も確認できます。",
  },
  aws: {
    title: "AWS障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "AWSで障害や不具合が発生しているか、今の状況を確認できます。リージョン障害・API エラー・コンソール不調などをすぐチェック。",
  },
  jira: {
    title: "Jira障害・不具合｜更新できない・遅い時の現在状況",
    description:
      "Jiraで現在広い障害や不具合が起きているか確認できます。課題の表示・更新・通知・APIだけ不安定な場合は、一部機能の問題かも確認できます。",
  },
  github: {
    title: "GitHub障害・不具合｜push・Actions・ログインできない時の現在状況",
    description:
      "GitHubで障害や不具合が起きているか確認できます。pushできない、Actionsが遅い、ログインできない、APIだけ不安定な時に影響範囲を確認します。",
  },
  "udemy-business": {
    title: "Udemy Business障害・不具合｜ログイン・視聴できない時の現在状況",
    description:
      "Udemy Businessで障害や不具合が起きているか確認できます。ログインできない、SSOで止まる、コースや動画だけ開けない時に影響範囲を確認します。",
  },
  youtube: {
    title: "YouTube障害・不具合｜今日見れない・繋がらない時の状況",
    description:
      "YouTubeが今日見れない、繋がらない時に、通信障害やサーバーダウン、メンテナンスの可能性を確認できます。動画やライブ配信だけの不具合にも対応します。",
  },
  netflix: {
    title: "Netflix（ネトフリ）障害・不具合｜今日見れない時の状況",
    description:
      "Netflix（ネトフリ）が今日見れない、再生できない、繋がらない時に、通信障害やサーバーダウン、メンテナンスの可能性を確認できます。ログインだけの不具合にも対応します。",
  },
  "disney-plus": {
    title: "Disney+（ディズニープラス）障害｜今日見れない時の状況",
    description:
      "Disney+（ディズニープラス）が今日見れない、繋がらない時に、通信障害やサーバーダウン、メンテナンスの可能性を確認できます。再生だけの不具合にも対応します。",
  },
  "hulu-jp": {
    title: "Hulu障害・不具合｜今日見れない・繋がらない時の状況",
    description:
      "Huluが今日見れない、繋がらない時に、通信障害やサーバーダウン、メンテナンスの可能性を確認できます。再生やアプリだけの不具合にも対応します。",
  },
  "u-next": {
    title: "U-NEXT障害・不具合｜見れない・再生できない時の現在状況",
    description:
      "U-NEXT（ユーネクスト）が見れない、再生できない、繋がらない時に、通信障害やサーバーダウン、メンテナンスの可能性を確認できます。購入だけの不具合にも対応します。",
  },
  "tv-tver": {
    title: "TVer障害・不具合｜見逃し配信が見れない・再生できない時の状況",
    description:
      "TVerが見れない、再生できない、見逃し配信や広告読み込みで止まる時に、通信障害やサーバーダウン、メンテナンスの可能性を確認できます。",
  },
  wowow: {
    title: "WOWOW障害・不具合｜今日見れない・繋がらない時の状況",
    description:
      "WOWOWが今日見れない、繋がらない時に、通信障害やサーバーダウン、メンテナンスの可能性を確認できます。オンデマンド再生やログインだけの不具合にも対応します。",
  },
  "apple-tv": {
    title: "Apple TV障害・不具合｜今日見れない・再生できない時の状況",
    description:
      "Apple TVやApple TV+が今日見れない、繋がらない時に、通信障害やサーバーダウン、メンテナンスの可能性を確認できます。アプリや再生だけの不具合にも対応します。",
  },
  openai: {
    title: "ChatGPT障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "ChatGPTで障害や不具合が発生しているか、今の状況を確認できます。使えない・ログインできない・エラーなどのトラブルをすぐチェック。",
  },
  gmail: {
    title: "Gmail障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "Gmailで障害や不具合が発生しているか、今の状況を確認できます。送れない・受信できない・ログインできないなどのトラブルをすぐチェック。",
  },
  mercari: {
    title: "メルカリ障害・不具合｜出品できない・購入できない時の現在状況",
    description:
      "メルカリで現在広い障害や不具合が起きているか確認できます。出品、購入、取引画面、決済だけ使えない場合は、一部機能やアプリ側の問題かも確認できます。",
  },
  paypay: {
    title: "PayPay障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "PayPayで障害や不具合が発生しているか、今の状況を確認できます。支払いできない・決済できない・チャージできない・ログインできないなどのトラブルをすぐチェック。",
  },
  tiktok: {
    title: "TikTok障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "TikTokで障害や不具合が発生しているか、今の状況を確認できます。今日見れない・投稿できない・ログインできないなどのトラブルをすぐチェック。",
  },
  zoom: {
    title: "Zoom障害・不具合｜会議に繋がらない・遅い時の現在状況",
    description:
      "Zoomで現在広い障害や不具合が起きているか確認できます。会議に繋がらない、音声や映像だけ不安定な場合は、一部機能や地域限定の問題かも確認できます。",
  },
  notion: {
    title: "Notion障害・不具合｜落ちてる・サーバーダウン時の現在状況",
    description:
      "Notionが現在落ちているか、サーバーダウンやDB障害が起きているかをリアルタイムで確認できます。広い障害でなければページやワークスペース側も確認できます。",
  },
  "microsoft-365": {
    title: "Microsoft 365障害・不具合｜Outlook・Teams・ログインの現在状況",
    description:
      "Microsoft 365で障害や不具合が起きているか確認できます。Outlookだけ送受信できない、Teamsだけ不安定、ログインだけ失敗する時に影響範囲を確認します。",
  },
  outlook: {
    title: "Outlook障害・不具合｜送受信・ログインできない時の現在状況",
    description:
      "Outlookで障害や不具合が起きているか確認できます。メール送受信だけ失敗する、ログインできない、予定表だけ不安定な時に影響範囲を確認します。",
  },
  discord: {
    title: "Discordは今落ちてる？（障害・接続状況チェック）",
    description:
      "Discordで障害や不具合が起きているか確認できます。接続できない、サーバーに入れない、ログインできない、メッセージやボイスチャットだけ使えない時に影響範囲を確認します。",
  },
  steam: {
    title: "Steam障害・サーバー状況｜落ちてる・ログインできない時の現在状況",
    description:
      "Steamが落ちてる、ログインできない、接続できない、ストアが重い、ダウンロードやフレンド機能だけ不安定な時に、障害か自分側の問題かを確認できます。",
  },
  teams: {
    title: "Microsoft Teams障害・不具合｜会議に入れない時の現在状況",
    description:
      "Microsoft Teamsで今日障害や不具合が起きているか確認できます。会議に入れない、チャットや通話、ログイン、接続だけ不安定な場合は影響範囲も確認できます。",
  },
  chatwork: {
    title: "Chatwork障害・不具合｜落ちてる・サーバーダウン時の現在状況",
    description:
      "Chatworkが現在落ちているか、サーバーダウンや障害が起きているかを確認できます。メッセージ送信、通知、ログインだけ不安定な場合も確認できます。",
  },
  shopify: {
    title: "Shopify障害・不具合｜リアルタイムで現在状況を確認",
    description:
      "Shopifyで現在障害やサーバーダウンが起きているかリアルタイムで確認できます。ストア表示、管理画面、決済、チェックアウトだけ不安定な場合も確認できます。",
  },
  base: {
    title: "BASE障害・不具合｜リアルタイムで現在状況を確認",
    description:
      "BASEで現在広い障害や不具合が起きているか確認できます。ショップ表示、管理画面、商品購入、決済だけ不安定な場合も確認できます。",
  },
  stores: {
    title: "STORES障害・不具合｜管理画面・注文処理の現在状況",
    description:
      "STORESで現在広い障害や不具合が起きているか確認できます。ショップ表示、管理画面、注文処理、決済だけ不安定な場合も確認できます。",
  },
  makeshop: {
    title: "MakeShop障害・不具合｜管理画面・注文処理の現在状況",
    description:
      "MakeShopで現在広い障害や不具合が起きているか確認できます。管理画面へのログイン、ショップ表示、注文処理だけ不安定な場合も確認できます。",
  },
  "ec-cube": {
    title: "EC-CUBE障害・不具合｜管理画面・サイト接続の現在状況",
    description:
      "EC-CUBEで現在広い障害や不具合が起きているか確認できます。管理画面、ショップ表示、プラグイン連携だけ不安定な場合も確認できます。",
  },
  qoo10: {
    title: "Qoo10障害・不具合｜開かない・システムエラー時の現在状況",
    description:
      "Qoo10で現在アクセス障害やシステムエラーが起きているか確認できます。開かない、繋がらない、注文や決済でエラーになる場合にも対応します。",
  },
  "yahoo-shopping": {
    title: "Yahoo!ショッピング障害・不具合｜注文できない・決済エラー時の現在状況",
    description:
      "Yahoo!ショッピングで現在広い障害や不具合が起きているか確認できます。商品ページ、カート、注文確定、決済だけ失敗する場合も確認できます。",
  },
  "yahoo-auctions": {
    title: "Yahoo!オークション障害・不具合｜入札・取引できない時の現在状況",
    description:
      "Yahoo!オークション（ヤフオク）で現在広い障害や不具合が起きているか確認できます。入札、購入手続き、取引ナビ、支払いだけ使えない場合も確認できます。",
  },
  yodobashi: {
    title: "ヨドバシ.com障害・不具合｜注文できない・開かない時の現在状況",
    description:
      "ヨドバシ.comで現在広い障害や不具合が起きているか確認できます。商品ページ、カート、注文確定、決済だけ失敗する場合も確認できます。",
  },
  biccamera: {
    title: "ビックカメラ.com障害・不具合｜注文・決済できない時の現在状況",
    description:
      "ビックカメラ.comで現在広い障害や不具合が起きているか確認できます。在庫表示、カート、注文、決済だけ不安定な場合も確認できます。",
  },
  lohaco: {
    title: "LOHACO障害・不具合｜注文できない・開かない時の現在状況",
    description:
      "LOHACOで現在広い障害や不具合が起きているか確認できます。商品表示、カート、注文確定、決済だけ失敗する場合も確認できます。",
  },
  nissen: {
    title: "ニッセン障害・不具合｜注文できない・ログインできない時の現在状況",
    description:
      "ニッセンで現在広い障害や不具合が起きているか確認できます。商品表示、会員ログイン、注文処理、決済だけ不安定な場合も確認できます。",
  },
  "line-works": {
    title: "LINE WORKS障害・不具合｜繋がらない・遅い時の現在状況",
    description:
      "LINE WORKSで現在広い障害や不具合が起きているか確認できます。メッセージ、ファイル共有、管理機能だけ不安定な場合は影響範囲も確認できます。",
  },
  cybozu: {
    title: "Cybozu障害・不具合｜各サービスの現在状況を確認",
    description:
      "Cybozuで現在障害や不具合が起きているか確認できます。kintoneなど一部サービスだけ不安定な場合は、影響を受けている範囲も確認できます。",
  },
  kintone: {
    title: "kintone障害・不具合｜開かない・更新できない時の現在状況",
    description:
      "kintoneで現在広い障害や不具合が起きているか確認できます。アプリ表示、レコード更新、APIだけ失敗する場合は、一部機能の問題かも確認できます。",
  },
  confluence: {
    title: "Confluence障害・不具合｜開かない・編集できない時の現在状況",
    description:
      "Confluenceで現在広い障害や不具合が起きているか確認できます。ページ表示、検索、編集だけ不安定な場合は、一部機能の問題かも確認できます。",
  },
  asana: {
    title: "Asana障害・不具合｜開かない・更新できない時の現在状況",
    description:
      "Asanaで現在広い障害や不具合が起きているか確認できます。タスク表示、更新、通知だけ遅い場合は、一部機能の問題かも確認できます。",
  },
  trello: {
    title: "Trello障害・不具合｜開かない・カード更新できない時の現在状況",
    description:
      "Trelloで現在広い障害や不具合が起きているか確認できます。ボードは開くがカード編集や同期だけ失敗する場合は、一部機能の問題かも確認できます。",
  },
  "prime-video": {
    title: "Amazon Prime Videoは今見れない？（障害・再生状況チェック）",
    description:
      "Prime Videoが今日見れない、再生できない、読み込めない、テレビアプリだけ止まる時に、Amazon側の障害か端末・回線側の問題かを確認できます。",
  },
  line: {
    title: "LINE障害・不具合｜今日繋がらない・送れない時の現在状況",
    description:
      "LINEで障害や不具合が起きているか確認できます。繋がらない、メッセージが送れない、通話だけできない、通知だけ来ない、画像やスタンプ送信だけ失敗する時に影響範囲を確認します。",
  },
  expedia: {
    title: "Expedia障害・不具合｜今日どうなってる？今の状況を確認",
    description:
      "Expediaで障害や不具合が発生しているか、今日の状況を確認できます。予約できない・検索できないなどのトラブルをすぐチェック。",
  },
  "yahoo-japan": {
    title: "Yahoo! JAPAN（ヤフー）障害｜今日の不具合・現在状況を確認",
    description:
      "Yahoo! JAPAN（ヤフー）で今日障害や不具合が起きているか確認できます。繋がらない、遅い、接続障害やサーバーダウンのほか、一部サービスだけの問題も確認できます。",
  },
  abema: {
    title: "ABEMA障害・不具合｜今繋がらない・見れない時の現在状況",
    description:
      "ABEMAが今繋がらない、見れない、再生できない時に、広い障害か一部機能だけの不具合かを確認できます。生放送やコメントだけ不安定な場合も確認できます。",
  },
  zozotown: {
    title: "ZOZOTOWN障害・不具合｜購入手続き・最終確認に進まない時の現在状況",
    description:
      "ZOZOTOWNで今日システム障害や不具合が起きているか確認できます。商品は見られるが購入手続きや最終確認に進まない、注文できない場合にも対応します。",
  },
  rakuten: {
    title: "楽天市場障害・不具合｜注文できない・決済できない時の現在状況",
    description:
      "楽天市場で現在広い障害や不具合が起きているか確認できます。商品ページ、ログイン、注文、決済、購入履歴だけ不安定な場合も確認できます。",
  },
  instagram: {
    title: "Instagram（インスタ）障害｜見れない・開かない時の現在状況",
    description:
      "Instagram（インスタ）が見れない、開かない、投稿できない、ログインできない、DMやストーリーズだけ不安定な時に、広い障害か自分側かを確認できます。",
  },
  "amazon-jp": {
    title: "Amazon.co.jp障害・不具合｜注文できない・開かない時の現在状況",
    description:
      "Amazon.co.jpで現在広い障害や不具合が起きているか確認できます。商品表示、ログイン、注文、決済、購入履歴だけ不安定な場合も確認できます。",
  },
  twitter: {
    title: "X（旧Twitter）は今落ちてる？Twitter障害・鯖落ちの現在状況",
    description:
      "X（旧Twitter / Twitter）が今落ちてる、落ちた、繋がらない時に、接続結果と日本の利用者報告から、鯖落ち・通信障害か自分側の不具合かを確認できます。",
  },
  jalan: {
    title: "じゃらん障害・不具合｜予約できない・検索できない時の現在状況",
    description:
      "じゃらんで現在障害や不具合が起きているか確認できます。宿泊検索、ログイン、予約手続き、決済だけ失敗する場合も確認できます。",
  },
};

type StatusHero = {
  heading: string;
  lead: string;
  reinforcement: string;
  secondaryReinforcement?: string;
  symptomChips?: string[];
  relatedStatusLinks?: { label: string; href: string }[];
  notWorkingHref: string;
  notWorkingLabel: string;
};

const statusHero: Record<string, StatusHero> = {
  google: {
    heading: "Google障害・不具合",
    lead: "Google全体ではなく、どのサービスが不安定かをまず確認します。",
    reinforcement:
      "検索、Gmail、Google マップ、Drive、Analyticsなど、Google内の一部サービスだけ不安定になる場合があります。",
    secondaryReinforcement:
      "検索だけ使えないのか、ログインやWorkspace系まで影響しているのかを見て、自分側かGoogle側かを確認します。",
    symptomChips: [
      "障害",
      "検索できない",
      "検索",
      "Gmail",
      "Drive",
      "Maps",
      "Analytics",
      "Search Console",
    ],
    relatedStatusLinks: [
      { label: "Gmail", href: "/status/sites/gmail" },
      { label: "YouTube", href: "/status/sites/youtube" },
      { label: "Google マップ", href: "/status/sites/google-maps" },
      { label: "Google Drive", href: "/status/sites/google-drive" },
      { label: "Search Console", href: "/status/sites/google-search-console" },
      { label: "Analytics", href: "/status/sites/google-analytics" },
    ],
    notWorkingHref: "/services/google/not-working",
    notWorkingLabel: "Googleが開かない時の確認",
  },
  slack: {
    heading: "Slack障害・不具合",
    lead: "Slackが今繋がらない、メッセージが送れない原因が広い障害かを確認します。",
    reinforcement:
      "画面は開くがメッセージや通知だけ遅い、通話やログインだけ失敗するなど、部分的な不具合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・ブラウザ・回線・ログイン状態を確認します。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "繋がらない",
      "送れない",
      "メッセージ遅延",
      "通知が遅い",
      "ログイン",
    ],
    relatedStatusLinks: [
      { label: "Chatwork", href: "/status/sites/chatwork" },
      { label: "Microsoft Teams", href: "/status/sites/teams" },
      { label: "LINE WORKS", href: "/status/sites/line-works" },
    ],
    notWorkingHref: "/services/slack/not-working",
    notWorkingLabel: "Slackが使えない時の確認",
  },
  aws: {
    heading: "AWS障害・不具合",
    lead: "現在のAWSの障害・不具合状況を確認できます。",
    reinforcement:
      "「リージョン障害」「API エラー」「コンソールに入れない」などの不具合をすぐ判断できます。",
    notWorkingHref: "/services/aws/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  jira: {
    heading: "Jira障害・不具合",
    lead: "Jiraで現在広い障害や不具合が起きているか、リアルタイムの状況を確認します。",
    reinforcement:
      "課題一覧は開くが更新だけ失敗する、通知やAPIだけ遅いなど、一部機能だけ不安定な場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、ブラウザ・会社側の認証・ネットワーク環境を確認します。",
    symptomChips: [
      "障害情報",
      "リアルタイム",
      "更新できない",
      "表示が遅い",
      "通知が遅い",
      "API不具合",
    ],
    relatedStatusLinks: [
      { label: "Confluence", href: "/status/sites/confluence" },
      { label: "Trello", href: "/status/sites/trello" },
      { label: "Asana", href: "/status/sites/asana" },
    ],
    notWorkingHref: "/services/jira/not-working",
    notWorkingLabel: "Jiraが使えない時の確認",
  },
  github: {
    heading: "GitHub障害・不具合",
    lead: "GitHubが広く不安定になっているかを確認します。",
    reinforcement:
      "サイトは開くがpushだけ失敗する、Actionsだけ遅い、ログインだけできない、APIだけ不安定といった部分的な不具合もあります。",
    secondaryReinforcement:
      "まず影響範囲を確認し、自分の環境だけの問題か見分けます。",
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  "udemy-business": {
    heading: "Udemy Business障害・不具合",
    lead: "Udemy Businessが広く使えない状態かを確認します。",
    reinforcement:
      "サイトは開くがログインだけできない、SSOで止まる、コース一覧だけ表示されない、動画だけ再生できない場合があります。",
    secondaryReinforcement:
      "全体障害か、会社側の認証やネットワーク環境の問題かを確認します。",
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  youtube: {
    heading: "YouTube障害・不具合",
    lead: "YouTubeが今見れない・繋がらない原因が、広い障害か一部機能の不具合かを確認します。",
    reinforcement:
      "通信障害・サーバーダウン・メンテナンスのほか、動画やライブ配信だけ再生できない場合もあります。",
    symptomChips: [
      "見れない",
      "繋がらない",
      "再生できない",
      "ライブだけ",
      "メンテナンス",
      "サーバーダウン",
    ],
    notWorkingHref: "/services/youtube/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  netflix: {
    heading: "Netflix（ネトフリ）障害・不具合",
    lead: "Netflixが今見れない・再生できない原因が、広い障害か一部機能の不具合かを確認します。",
    reinforcement:
      "通信障害・サーバーダウン・メンテナンスのほか、再生やログイン、特定端末だけ使えない場合もあります。",
    symptomChips: [
      "見れない",
      "繋がらない",
      "再生できない",
      "ログインできない",
      "メンテナンス",
      "通信障害",
    ],
    relatedStatusLinks: [
      { label: "Prime Video", href: "/status/sites/prime-video" },
      { label: "Disney+", href: "/status/sites/disney-plus" },
      { label: "TVer", href: "/status/sites/tv-tver" },
    ],
    notWorkingHref: "/services/netflix/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  "disney-plus": {
    heading: "Disney+（ディズニープラス）障害・不具合",
    lead: "Disney+が今見れない・繋がらない原因が、広い障害か視聴機能だけの不具合かを確認します。",
    reinforcement:
      "通信障害・サーバーダウン・メンテナンスのほか、ログイン後の再生開始や画質切替だけ失敗する場合もあります。",
    symptomChips: [
      "見れない",
      "繋がらない",
      "再生できない",
      "アプリだけ",
      "メンテナンス",
      "サーバーダウン",
    ],
    relatedStatusLinks: [
      { label: "Netflix", href: "/status/sites/netflix" },
      { label: "Prime Video", href: "/status/sites/prime-video" },
      { label: "U-NEXT", href: "/status/sites/u-next" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  "hulu-jp": {
    heading: "Hulu障害・不具合",
    lead: "Huluが今見れない・繋がらない原因が、広い障害か一部環境の不具合かを確認します。",
    reinforcement:
      "通信障害・サーバーダウン・メンテナンスのほか、再生やログイン、特定のアプリだけ使えない場合もあります。",
    symptomChips: [
      "見れない",
      "繋がらない",
      "再生できない",
      "ログインできない",
      "メンテナンス",
      "通信障害",
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  "u-next": {
    heading: "U-NEXT障害・不具合",
    lead: "U-NEXT（ユーネクスト）が今見れない・再生できない原因が、広い障害か一部機能の不具合かを確認します。",
    reinforcement:
      "通信障害・サーバーダウン・メンテナンスのほか、再生開始や作品購入だけ失敗する場合もあります。",
    symptomChips: [
      "見れない",
      "繋がらない",
      "再生できない",
      "購入できない",
      "メンテナンス",
      "サーバーダウン",
    ],
    relatedStatusLinks: [
      { label: "Netflix", href: "/status/sites/netflix" },
      { label: "Disney+", href: "/status/sites/disney-plus" },
      { label: "TVer", href: "/status/sites/tv-tver" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  "tv-tver": {
    heading: "TVer障害・不具合",
    lead: "TVerが今見れない、見逃し配信が再生できない原因が広い障害かを確認します。",
    reinforcement:
      "通信障害・サーバーダウン・メンテナンスのほか、番組は開くが再生や広告読み込みだけ止まる場合もあります。",
    symptomChips: [
      "見れない",
      "繋がらない",
      "再生できない",
      "広告で止まる",
      "メンテナンス",
      "通信障害",
    ],
    relatedStatusLinks: [
      { label: "ABEMA", href: "/status/sites/abema" },
      { label: "U-NEXT", href: "/status/sites/u-next" },
      { label: "YouTube", href: "/status/sites/youtube" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  wowow: {
    heading: "WOWOW障害・不具合",
    lead: "WOWOWが今見れない・繋がらない原因が、広い障害かオンデマンド側の不具合かを確認します。",
    reinforcement:
      "通信障害・サーバーダウン・メンテナンスのほか、オンデマンド再生やログインだけ使えない場合もあります。",
    symptomChips: [
      "見れない",
      "繋がらない",
      "再生できない",
      "オンデマンド",
      "メンテナンス",
      "サーバーダウン",
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  "apple-tv": {
    heading: "Apple TV障害・不具合",
    lead: "Apple TVやApple TV+が今見れない・繋がらない原因が、広い障害かアプリ側の不具合かを確認します。",
    reinforcement:
      "通信障害・サーバーダウン・メンテナンスのほか、作品一覧は開くが再生だけ失敗する場合もあります。",
    symptomChips: [
      "見れない",
      "繋がらない",
      "再生できない",
      "アプリだけ",
      "メンテナンス",
      "通信障害",
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  openai: {
    heading: "ChatGPT障害・不具合",
    lead: "現在のChatGPTの障害・不具合状況を確認できます。",
    reinforcement: "「使えない」「ログインできない」「エラーが出る」と感じた時に今の状況をすぐ確認できます。",
    notWorkingHref: "/services/chatgpt/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  gmail: {
    heading: "Gmail障害・不具合",
    lead: "現在のGmailの障害・不具合状況を確認できます。",
    reinforcement: "「送れない」「受信できない」「ログインできない」などの不具合をすぐ判断できます。",
    notWorkingHref: "/services/gmail/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  mercari: {
    heading: "メルカリ障害・不具合",
    lead: "メルカリで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "出品、購入、コメント、取引画面、決済など、一部機能だけ使えない場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・ブラウザ・アカウント・支払い方法側を確認します。",
    symptomChips: [
      "障害",
      "出品できない",
      "購入できない",
      "取引画面",
      "決済",
      "ログイン",
    ],
    relatedStatusLinks: [
      { label: "Yahoo!オークション", href: "/status/sites/yahoo-auctions" },
      { label: "楽天市場", href: "/status/sites/rakuten" },
      { label: "Qoo10", href: "/status/sites/qoo10" },
    ],
    notWorkingHref: "/services/mercari/not-working",
    notWorkingLabel: "メルカリが使えない時の確認",
  },
  paypay: {
    heading: "PayPay障害・不具合",
    lead: "現在のPayPayの障害・不具合状況を確認できます。",
    reinforcement: "「支払いできない」「決済できない」「チャージできない」「ログインできない」と感じた時に今の状況をすぐ確認できます。",
    notWorkingHref: "/services/paypay/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  tiktok: {
    heading: "TikTok障害・不具合",
    lead: "現在のTikTokの障害・不具合状況を確認できます。",
    reinforcement: "「今日見れない」「投稿できない」「ログインできない」などの不具合をすぐ判断できます。",
    notWorkingHref: "/services/tiktok/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  zoom: {
    heading: "Zoom障害・不具合",
    lead: "Zoomで現在広い障害や不具合が起きているか、接続状況を確認します。",
    reinforcement:
      "会議には入れるが音声や映像だけ不安定、特定地域や時間帯だけ繋がりにくい場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・端末・マイク設定・回線側を確認します。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "会議に入れない",
      "繋がらない",
      "音声が途切れる",
      "映像が遅い",
    ],
    relatedStatusLinks: [
      { label: "Microsoft Teams", href: "/status/sites/teams" },
      { label: "Slack", href: "/status/sites/slack" },
    ],
    notWorkingHref: "/services/zoom/not-working",
    notWorkingLabel: "Zoomが使えない時の確認",
  },
  notion: {
    heading: "Notion障害・不具合",
    lead: "Notionが現在落ちているか、サーバーダウンやDB関連の障害が起きているかを確認します。",
    reinforcement:
      "ワークスペースは開くが特定ページ、データベース、検索、同期だけ不安定な場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、ページ・ワークスペース・ブラウザ・ネットワーク側を確認します。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "サーバーダウン",
      "落ちてる",
      "DB障害",
      "不具合",
    ],
    relatedStatusLinks: [
      { label: "Slack", href: "/status/sites/slack" },
      { label: "Asana", href: "/status/sites/asana" },
      { label: "Confluence", href: "/status/sites/confluence" },
    ],
    notWorkingHref: "/services/notion/not-working",
    notWorkingLabel: "Notionが開かない時の確認",
  },
  "microsoft-365": {
    heading: "Microsoft 365障害・不具合",
    lead: "Microsoft 365全体ではなく、どのサービスに影響が出ているかを確認します。",
    reinforcement:
      "Outlookだけ送受信できない、Teamsだけ会議・チャットが不安定、OneDriveだけ同期できないなど、部分的な不具合もあります。",
    secondaryReinforcement:
      "Microsoft側の広い障害か、会社側の認証・端末・ネットワーク環境かを確認します。",
    symptomChips: [
      "Outlook",
      "Teams",
      "OneDrive",
      "ログイン",
      "メール",
      "会議",
    ],
    relatedStatusLinks: [
      { label: "Teams", href: "/status/sites/teams" },
      { label: "OneDrive", href: "/status/sites/onedrive" },
    ],
    notWorkingHref: "/services/microsoft365/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  outlook: {
    heading: "Outlook障害・不具合",
    lead: "Outlookが広く不安定になっているかを確認します。",
    reinforcement:
      "メール送信だけ失敗する、受信だけ遅い、予定表だけ同期しない、ログインだけ失敗するなど、部分的な不具合もあります。",
    secondaryReinforcement:
      "まず影響範囲を確認し、Microsoft側の障害か会社アカウント・アプリ・ネットワーク環境かを見分けます。",
    notWorkingHref: "/services/outlook/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  discord: {
    heading: "Discord障害・不具合",
    lead: "Discordが今接続できない、サーバーに入れない原因が広い障害かを確認します。",
    reinforcement:
      "ログインだけ失敗する、メッセージだけ送れない、ボイスチャットだけ接続できない、通知だけ遅いなど、一部機能だけの不具合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・ブラウザ・VPN・端末・通話品質側の原因を確認します。",
    symptomChips: [
      "接続できない",
      "サーバーに入れない",
      "ログインできない",
      "メッセージ不可",
      "通話できない",
      "通知が遅い",
    ],
    relatedStatusLinks: [
      { label: "Slack", href: "/status/sites/slack" },
      { label: "LINE", href: "/status/sites/line" },
      { label: "Telegram", href: "/status/sites/telegram" },
    ],
    notWorkingHref: "/services/discord/not-working",
    notWorkingLabel: "Discordがつながらない時の確認",
  },
  steam: {
    heading: "Steam障害・サーバー状況",
    lead: "Steamが今落ちてるか、ログインや接続に広い障害が出ているかを確認します。",
    reinforcement:
      "ログインだけ失敗する、ストアだけ重い、ダウンロードだけ進まない、フレンドやチャットだけ不安定な場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・回線・DNS・Steamクライアント側の原因を確認します。",
    symptomChips: [
      "落ちてる",
      "ログインできない",
      "接続できない",
      "ストアが重い",
      "ダウンロード不可",
      "フレンド不安定",
      "エラー",
    ],
    relatedStatusLinks: [
      { label: "PlayStation Network", href: "/status/sites/playstation-network" },
      { label: "Nintendo", href: "/status/sites/nintendo" },
      { label: "Epic Games", href: "/status/sites/epic-games" },
    ],
    notWorkingHref: "/services/steam/not-working",
    notWorkingLabel: "Steamが使えない時の確認",
  },
  teams: {
    heading: "Teams障害情報・稼働状況",
    lead: "Microsoft Teamsで現在障害や不具合が起きているか、リアルタイムの接続状況を確認します。",
    reinforcement:
      "会議、チャット、通話、ログインなど、一部機能だけ不安定な場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、自分の組織・端末・アプリ・ネットワーク側を確認します。",
    symptomChips: [
      "障害情報",
      "リアルタイム",
      "今日",
      "会議",
      "チャット",
      "繋がらない",
      "遅い",
    ],
    relatedStatusLinks: [
      { label: "Microsoft 365", href: "/status/sites/microsoft-365" },
      { label: "OneDrive", href: "/status/sites/onedrive" },
      { label: "Zoom", href: "/status/sites/zoom" },
    ],
    notWorkingHref: "/services/teams/not-working",
    notWorkingLabel: "Teamsが使えない時の確認",
  },
  chatwork: {
    heading: "Chatwork障害・不具合",
    lead: "Chatworkが現在広い範囲で落ちているか、サーバーダウンや障害が起きているかを確認します。",
    reinforcement:
      "画面や履歴は開くが、メッセージ送信や通知だけ失敗するなど、部分的な不具合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・ブラウザ・回線・ログイン状態を確認します。",
    symptomChips: [
      "障害",
      "落ちてる",
      "メッセージ送れない",
      "通知が来ない",
      "ログインできない",
      "履歴が重い",
    ],
    relatedStatusLinks: [
      { label: "Slack", href: "/status/sites/slack" },
      { label: "Microsoft Teams", href: "/status/sites/teams" },
      { label: "LINE WORKS", href: "/status/sites/line-works" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  shopify: {
    heading: "Shopify障害・不具合",
    lead: "Shopifyで現在障害やサーバーダウンが起きているか、リアルタイムの状況を確認します。",
    reinforcement:
      "ストア表示、管理画面、決済、チェックアウトなど、一部機能だけ不安定な場合もあります。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "サーバーダウン",
      "管理画面",
      "ストア表示",
      "決済",
    ],
    relatedStatusLinks: [
      { label: "BASE", href: "/status/sites/base" },
      { label: "STORES", href: "/status/sites/stores" },
      { label: "MakeShop", href: "/status/sites/makeshop" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  base: {
    heading: "BASE障害・不具合",
    lead: "BASEで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "ショップは開くが、管理画面、商品購入、注文処理、決済だけ不安定な場合もあります。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "ショップ表示",
      "管理画面",
      "注文できない",
      "決済",
    ],
    relatedStatusLinks: [
      { label: "Shopify", href: "/status/sites/shopify" },
      { label: "STORES", href: "/status/sites/stores" },
      { label: "MakeShop", href: "/status/sites/makeshop" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  stores: {
    heading: "STORES障害・不具合",
    lead: "STORESで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "ショップ表示、管理画面、注文処理、決済など、一部機能だけ不安定な場合もあります。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "管理画面",
      "ショップ表示",
      "注文処理",
      "決済",
    ],
    relatedStatusLinks: [
      { label: "Shopify", href: "/status/sites/shopify" },
      { label: "BASE", href: "/status/sites/base" },
      { label: "MakeShop", href: "/status/sites/makeshop" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  makeshop: {
    heading: "MakeShop障害・不具合",
    lead: "MakeShopで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "ショップは開くが、管理画面へのログインや注文処理だけ失敗する場合もあります。",
    symptomChips: [
      "障害情報",
      "リアルタイム",
      "管理画面",
      "ログイン",
      "注文処理",
      "ショップ表示",
    ],
    relatedStatusLinks: [
      { label: "Shopify", href: "/status/sites/shopify" },
      { label: "BASE", href: "/status/sites/base" },
      { label: "EC-CUBE", href: "/status/sites/ec-cube" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  "ec-cube": {
    heading: "EC-CUBE障害・不具合",
    lead: "EC-CUBEで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "ショップは表示できるが、管理画面やプラグイン連携だけ不安定な場合もあります。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "管理画面",
      "サイト接続",
      "プラグイン",
      "不具合",
    ],
    relatedStatusLinks: [
      { label: "Shopify", href: "/status/sites/shopify" },
      { label: "MakeShop", href: "/status/sites/makeshop" },
      { label: "BASE", href: "/status/sites/base" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  qoo10: {
    heading: "Qoo10障害・不具合",
    lead: "Qoo10で現在アクセス障害やシステムエラーが起きているかを確認します。",
    reinforcement:
      "サイトが開かない、繋がらない、商品は見られるが注文や決済でエラーになる場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・ブラウザ・ログイン状態・支払い方法側を確認します。",
    symptomChips: [
      "アクセス障害",
      "システムエラー",
      "開かない",
      "繋がらない",
      "注文できない",
      "決済エラー",
    ],
    relatedStatusLinks: [
      { label: "楽天市場", href: "/status/sites/rakuten" },
      { label: "Yahoo!ショッピング", href: "/status/sites/yahoo-shopping" },
      { label: "ZOZOTOWN", href: "/status/sites/zozotown" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  "yahoo-shopping": {
    heading: "Yahoo!ショッピング障害・不具合",
    lead: "Yahoo!ショッピングで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "商品ページは見られるが、カート、注文確定、決済だけ失敗する場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、ブラウザ・ログイン状態・支払い方法側を確認します。",
    symptomChips: [
      "障害",
      "注文できない",
      "決済エラー",
      "カート",
      "ログイン",
      "商品ページ",
    ],
    relatedStatusLinks: [
      { label: "Yahoo!オークション", href: "/status/sites/yahoo-auctions" },
      { label: "LOHACO", href: "/status/sites/lohaco" },
      { label: "楽天市場", href: "/status/sites/rakuten" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  "yahoo-auctions": {
    heading: "Yahoo!オークション障害・不具合",
    lead: "Yahoo!オークション（ヤフオク）で現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "商品は見られるが、入札、購入手続き、取引ナビ、支払いだけ使えない場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、ブラウザ・ログイン状態・支払い方法側を確認します。",
    symptomChips: [
      "障害",
      "入札できない",
      "購入できない",
      "取引ナビ",
      "支払い",
      "ログイン",
    ],
    relatedStatusLinks: [
      { label: "メルカリ", href: "/status/sites/mercari" },
      { label: "Yahoo!ショッピング", href: "/status/sites/yahoo-shopping" },
      { label: "Qoo10", href: "/status/sites/qoo10" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  yodobashi: {
    heading: "ヨドバシ.com障害・不具合",
    lead: "ヨドバシ.comで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "商品ページは見られるが、カート、注文確定、決済だけ失敗する場合もあります。",
    symptomChips: [
      "障害",
      "開かない",
      "注文できない",
      "決済エラー",
      "カート",
      "商品ページ",
    ],
    relatedStatusLinks: [
      { label: "ビックカメラ.com", href: "/status/sites/biccamera" },
      { label: "Amazon.co.jp", href: "/status/sites/amazon-jp" },
      { label: "楽天市場", href: "/status/sites/rakuten" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  biccamera: {
    heading: "ビックカメラ.com障害・不具合",
    lead: "ビックカメラ.comで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "商品ページは見られるが、在庫表示、カート、注文、決済だけ不安定な場合もあります。",
    symptomChips: [
      "障害",
      "開かない",
      "在庫表示",
      "注文できない",
      "決済エラー",
      "カート",
    ],
    relatedStatusLinks: [
      { label: "ヨドバシ.com", href: "/status/sites/yodobashi" },
      { label: "Amazon.co.jp", href: "/status/sites/amazon-jp" },
      { label: "楽天市場", href: "/status/sites/rakuten" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  lohaco: {
    heading: "LOHACO障害・不具合",
    lead: "LOHACOで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "商品は見られるが、カート、注文確定、決済だけ失敗する場合もあります。",
    symptomChips: [
      "障害",
      "開かない",
      "注文できない",
      "決済エラー",
      "カート",
      "ログイン",
    ],
    relatedStatusLinks: [
      { label: "Yahoo!ショッピング", href: "/status/sites/yahoo-shopping" },
      { label: "楽天市場", href: "/status/sites/rakuten" },
      { label: "Amazon.co.jp", href: "/status/sites/amazon-jp" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  nissen: {
    heading: "ニッセン障害・不具合",
    lead: "ニッセンで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "商品ページは見られるが、会員ログイン、注文処理、決済だけ不安定な場合もあります。",
    symptomChips: [
      "障害",
      "開かない",
      "注文できない",
      "ログイン",
      "決済エラー",
      "商品ページ",
    ],
    relatedStatusLinks: [
      { label: "ZOZOTOWN", href: "/status/sites/zozotown" },
      { label: "楽天市場", href: "/status/sites/rakuten" },
      { label: "Yahoo!ショッピング", href: "/status/sites/yahoo-shopping" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  "line-works": {
    heading: "LINE WORKS障害・不具合",
    lead: "LINE WORKSで現在広い障害や不具合が起きているか、接続状況を確認します。",
    reinforcement:
      "メッセージは使えるが、ファイル共有・通知・管理機能だけ不安定な場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・会社側の認証・端末・ネットワーク環境を確認します。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "繋がらない",
      "ログイン",
      "メッセージ",
      "ファイル共有",
    ],
    relatedStatusLinks: [
      { label: "Chatwork", href: "/status/sites/chatwork" },
      { label: "Slack", href: "/status/sites/slack" },
      { label: "Microsoft Teams", href: "/status/sites/teams" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  cybozu: {
    heading: "Cybozu障害・不具合",
    lead: "Cybozu内のどのサービスで現在障害や不具合が起きているかを確認します。",
    reinforcement:
      "Cybozu全体ではなく、kintoneなど一部サービスや機能だけ影響を受ける場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、利用中のサービス・会社側の認証・ネットワーク環境を確認します。",
    symptomChips: [
      "障害情報",
      "リアルタイム",
      "kintone",
      "ログイン",
      "接続できない",
      "不具合",
    ],
    relatedStatusLinks: [
      { label: "kintone", href: "/status/sites/kintone" },
      { label: "Microsoft 365", href: "/status/sites/microsoft-365" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  kintone: {
    heading: "kintone障害・不具合",
    lead: "kintoneで現在広い障害や不具合が起きているか、リアルタイムの状況を確認します。",
    reinforcement:
      "アプリは開くがレコード更新やAPIだけ失敗するなど、一部機能だけ不安定な場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ設定・権限・会社側の認証・ネットワーク環境を確認します。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "開かない",
      "更新できない",
      "API不具合",
      "ログイン",
    ],
    relatedStatusLinks: [
      { label: "Cybozu", href: "/status/sites/cybozu" },
      { label: "Jira", href: "/status/sites/jira" },
      { label: "Asana", href: "/status/sites/asana" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  confluence: {
    heading: "Confluence障害・不具合",
    lead: "Confluenceで現在広い障害や不具合が起きているか、リアルタイムの状況を確認します。",
    reinforcement:
      "ページは表示できるが検索や編集だけ失敗するなど、一部機能だけ不安定な場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、ブラウザ・会社側の認証・ネットワーク環境を確認します。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "開かない",
      "編集できない",
      "検索できない",
      "遅い",
    ],
    relatedStatusLinks: [
      { label: "Jira", href: "/status/sites/jira" },
      { label: "Trello", href: "/status/sites/trello" },
      { label: "Notion", href: "/status/sites/notion" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  asana: {
    heading: "Asana障害・不具合",
    lead: "Asanaで現在広い障害や不具合が起きているか、リアルタイムの状況を確認します。",
    reinforcement:
      "画面は開くがタスク更新や通知だけ遅いなど、一部機能だけ不安定な場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、ブラウザ・アプリ・会社側の認証・ネットワーク環境を確認します。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "開かない",
      "更新できない",
      "通知が遅い",
      "重い",
    ],
    relatedStatusLinks: [
      { label: "Trello", href: "/status/sites/trello" },
      { label: "Jira", href: "/status/sites/jira" },
      { label: "Notion", href: "/status/sites/notion" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  trello: {
    heading: "Trello障害・不具合",
    lead: "Trelloで現在広い障害や不具合が起きているか、リアルタイムの状況を確認します。",
    reinforcement:
      "ボードは開くがカード編集や同期だけ失敗するなど、一部機能だけ不安定な場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、ブラウザ・アプリ・会社側の認証・ネットワーク環境を確認します。",
    symptomChips: [
      "障害",
      "リアルタイム",
      "ボードが開かない",
      "カード更新不可",
      "同期できない",
      "重い",
    ],
    relatedStatusLinks: [
      { label: "Jira", href: "/status/sites/jira" },
      { label: "Confluence", href: "/status/sites/confluence" },
      { label: "Asana", href: "/status/sites/asana" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  "prime-video": {
    heading: "Amazonプライムビデオ障害・不具合",
    lead: "Prime Video（アマプラ・Amazonプライムビデオ）で現在障害や不具合が発生しているか確認できます。",
    reinforcement:
      "作品一覧は開くが再生だけ失敗する、テレビアプリだけ止まる、ログイン後の視聴開始でエラーになる場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、端末・アプリ・回線・地域差の原因を確認します。",
    symptomChips: [
      "見れない",
      "再生できない",
      "読み込めない",
      "テレビだけ",
      "アプリだけ",
      "エラー",
      "ログインできない",
    ],
    relatedStatusLinks: [
      { label: "ABEMA", href: "/status/sites/abema" },
      { label: "Netflix", href: "/status/sites/netflix" },
      { label: "YouTube", href: "/status/sites/youtube" },
    ],
    notWorkingHref: "/services/prime-video/not-working",
    notWorkingLabel: "Prime Videoが見れない時の確認",
  },
  line: {
    heading: "LINE障害・不具合情報",
    lead: "LINEが今広く不安定になっているか確認します。",
    reinforcement:
      "メッセージは送れるが通話だけできない、通知だけ来ない、画像やスタンプ送信だけ失敗するなど、部分的な不具合もあります。",
    secondaryReinforcement:
      "まず影響範囲を確認し、自分の端末・回線・アプリだけの問題か見分けます。",
    symptomChips: [
      "繋がらない",
      "送れない",
      "通話できない",
      "通知が来ない",
      "画像だけ",
      "スタンプだけ",
      "ログインできない",
    ],
    relatedStatusLinks: [
      { label: "X（旧Twitter）", href: "/status/sites/twitter" },
      { label: "Instagram", href: "/status/sites/instagram" },
      { label: "Discord", href: "/status/sites/discord" },
    ],
    notWorkingHref: "/services/line/not-working",
    notWorkingLabel: "LINEが使えない・送れない時の確認",
  },
  expedia: {
    heading: "Expedia障害・不具合",
    lead: "現在のExpediaの障害・不具合状況を確認できます。",
    reinforcement: "「予約できない」「検索できない」「今日の不具合」をすぐ判断できます。",
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  "yahoo-japan": {
    heading: "Yahoo! JAPAN障害・不具合",
    lead: "Yahoo! JAPANが現在繋がらない・遅い状態か、広い障害やサーバーダウンが起きているかを確認します。",
    reinforcement:
      "トップは開くが検索だけできない、Yahoo!ニュースだけ表示されない、Yahoo!メール・ヤフオク・ショッピングだけ不安定な場合もあります。",
    secondaryReinforcement:
      "Yahoo!全体の障害か、一部サービスだけの不具合か、自分側の回線・DNS・ブラウザかを確認します。",
    symptomChips: [
      "障害",
      "今日",
      "繋がらない",
      "遅い",
      "検索できない",
      "接続障害",
      "サーバーダウン",
    ],
    relatedStatusLinks: [
      { label: "Yahoo!メール", href: "/status/sites/yahoo-mail" },
      { label: "Yahoo!ニュース", href: "/status/sites/yahoo-news-jp" },
      { label: "ヤフオク", href: "/status/sites/yahoo-auctions" },
      { label: "Yahoo!ショッピング", href: "/status/sites/yahoo-shopping" },
    ],
    notWorkingHref: "/services/yahoo/not-working",
    notWorkingLabel: "Yahoo! JAPANが開かない時の確認",
  },
  abema: {
    heading: "ABEMAは今繋がらない？障害・不具合",
    lead: "ABEMAが今繋がらない、見れない、再生できない時に、広い障害か一部機能だけの不具合かを確認します。",
    reinforcement:
      "番組一覧は開くが再生開始だけ止まる、生放送だけ重い、コメントだけ使えない場合は部分的な不具合の可能性があります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・ブラウザ・回線・DNS・端末側の条件を切り分けます。",
    symptomChips: [
      "今繋がらない",
      "今日見れない",
      "再生できない",
      "生放送",
      "コメントできない",
      "通信障害",
      "メンテナンス",
    ],
    relatedStatusLinks: [
      { label: "Prime Video", href: "/status/sites/prime-video" },
      { label: "YouTube", href: "/status/sites/youtube" },
      { label: "Netflix", href: "/status/sites/netflix" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  zozotown: {
    heading: "ZOZOTOWN障害・不具合",
    lead: "ZOZOTOWNで現在システム障害や不具合が起きているかを確認します。",
    reinforcement:
      "商品ページは見られるが、購入手続きや最終確認に進まない、注文確定だけ失敗する場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・ブラウザ・ログイン状態・支払い方法側を確認します。",
    symptomChips: [
      "システム障害",
      "最終確認",
      "購入手続き",
      "繋がらない",
      "バグ",
      "注文できない",
    ],
    relatedStatusLinks: [
      { label: "楽天市場", href: "/status/sites/rakuten" },
      { label: "Yahoo!ショッピング", href: "/status/sites/yahoo-shopping" },
      { label: "Qoo10", href: "/status/sites/qoo10" },
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  rakuten: {
    heading: "楽天市場障害・不具合",
    lead: "楽天市場で現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "商品ページ、ログイン、注文、決済、購入履歴など、一部機能だけ不安定な場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・ブラウザ・アカウント・支払い方法側を確認します。",
    symptomChips: [
      "障害",
      "注文できない",
      "決済できない",
      "ログイン",
      "商品ページ",
      "購入履歴",
    ],
    relatedStatusLinks: [
      { label: "Amazon.co.jp", href: "/status/sites/amazon-jp" },
      { label: "Yahoo!ショッピング", href: "/status/sites/yahoo-shopping" },
      { label: "Qoo10", href: "/status/sites/qoo10" },
    ],
    notWorkingHref: "/services/rakuten/not-working",
    notWorkingLabel: "楽天市場が使えない時の確認",
  },
  instagram: {
    heading: "Instagram障害・不具合",
    lead: "Instagram（インスタ）が今見れない・開かない原因が、広い障害か一部機能の不具合かを確認します。",
    reinforcement:
      "フィードは見れるが投稿だけ失敗する、DMやストーリーズだけ読み込めない、ログインだけできない場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・回線・キャッシュ・アカウント側の原因を確認します。",
    symptomChips: [
      "インスタ",
      "見れない",
      "投稿できない",
      "ログインできない",
      "DM",
      "ストーリーズ",
      "読み込めない",
    ],
    relatedStatusLinks: [
      { label: "X（旧Twitter）", href: "/status/sites/twitter" },
      { label: "Threads", href: "/status/sites/threads" },
      { label: "LINE", href: "/status/sites/line" },
    ],
    notWorkingHref: "/services/instagram/not-working",
    notWorkingLabel: "Instagramが使えない時の確認",
  },
  "amazon-jp": {
    heading: "Amazon.co.jp障害・不具合",
    lead: "Amazon.co.jpで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "商品表示、ログイン、注文、決済、購入履歴など、買い物機能の一部だけ不安定になる場合があります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・ブラウザ・アカウント・支払い方法側を確認します。",
    symptomChips: [
      "開かない",
      "注文できない",
      "決済エラー",
      "ログイン",
      "商品ページ",
      "購入履歴",
    ],
    relatedStatusLinks: [
      { label: "楽天市場", href: "/status/sites/rakuten" },
      { label: "Yahoo!ショッピング", href: "/status/sites/yahoo-shopping" },
      { label: "ヨドバシ.com", href: "/status/sites/yodobashi" },
    ],
    notWorkingHref: "/services/amazon/not-working",
    notWorkingLabel: "Amazon.co.jpが使えない時の確認",
  },
  twitter: {
    heading: "X（旧Twitter）は今落ちてる？Twitter障害・鯖落ち",
    lead: "X（旧Twitter / Twitter）が今落ちた・繋がらない時に、接続結果と日本の利用者報告から広い障害かを確認します。",
    reinforcement:
      "タイムラインは開くが投稿だけ失敗する、通知だけ遅い、DMや画像だけ読み込めない場合は、一部機能だけの不具合の可能性があります。",
    secondaryReinforcement:
      "広い障害でなければ、アプリ・ログイン状態・回線・端末側の原因を確認します。",
    symptomChips: [
      "Twitter障害",
      "通信障害",
      "落ちた",
      "鯖落ち",
      "今日",
      "見れない",
      "投稿できない",
      "繋がらない",
    ],
    relatedStatusLinks: [
      { label: "Instagram", href: "/status/sites/instagram" },
      { label: "LINE", href: "/status/sites/line" },
      { label: "Threads", href: "/status/sites/threads" },
    ],
    notWorkingHref: "/services/x/not-working",
    notWorkingLabel: "X（旧Twitter）が使えない時の確認",
  },
  jalan: {
    heading: "じゃらん障害・不具合",
    lead: "じゃらんで現在広い障害や不具合が起きているかを確認します。",
    reinforcement:
      "宿泊検索はできるが予約手続き、ログイン、決済だけ失敗するなど、一部機能だけ不安定な場合もあります。",
    secondaryReinforcement:
      "広い障害でなければ、ブラウザ・アプリ・回線・アカウント・支払い方法側を確認します。",
    symptomChips: [
      "障害",
      "予約できない",
      "検索できない",
      "ログインできない",
      "決済できない",
      "メンテナンス",
    ],
    notWorkingHref: "",
    notWorkingLabel: "",
  },
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const base = SITE.origin;
  const site = getSiteById(params.id);

  if (!site) {
    return {
      title: "ステータスが見つかりません",
      description: "指定されたサービスは見つかりませんでした。",
      alternates: { canonical: `${base}/status` },
      robots: { index: false, follow: false },
    };
  }

  const effectiveTitle =
    statusOverrides[site.id]?.title ?? `${site.name} は今落ちてる？（障害・稼働状況チェック）`;
  const effectiveDescription =
    statusOverrides[site.id]?.description ??
    `${site.name} の稼働状況（オンライン／オフライン）を簡易チェック。HTTPステータスや応答時間も確認できます。`;

  return {
    title: effectiveTitle,
    description: effectiveDescription,
    alternates: { canonical: `${base}/status/sites/${site.id}` },
    openGraph: {
      title: effectiveTitle,
      description: effectiveDescription,
      url: `${base}/status/sites/${site.id}`,
      siteName: SITE.name,
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: effectiveTitle,
      description: effectiveDescription,
    },
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const site = getSiteById(params.id);

  if (!site) {
    notFound();
  }

  const categoryLabel = SITE_CATEGORIES[site.category];
  const isTwitterStatus = site.id === "twitter";
  const isLineStatus = site.id === "line";
  const isNotionStatus = site.id === "notion";
  const activeHero = statusHero[site.id];
  const serviceLabel = isTwitterStatus ? "X（旧Twitter）" : site.name;
  const serviceMark = STATUS_SERVICE_MARKS[site.id] ?? serviceLabel.slice(0, 2);
  const showStatusAd = STATUS_AD_ENABLED_IDS.has(site.id);

  return (
    <main className="bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <div className="relative mb-5 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-lg sm:p-7">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(14,165,233,0.24),transparent_35%)]" />
        <div className="relative flex items-start gap-4 sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-lg font-black text-white shadow-inner sm:h-14 sm:w-14">
            {serviceMark}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-300">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-sky-400/10 px-2.5 py-1 text-sky-200">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                LIVE STATUS
              </span>
              <span>{categoryLabel}</span>
            </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-4xl">
          {activeHero
            ? activeHero.heading
            : isNotionStatus
            ? "Notion 障害？今開かない？現在の状況"
            : `${serviceLabel} の稼働状況`}
        </h1>
        {activeHero ? (
          <>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{activeHero.lead}</p>
            <p className="mt-2 max-w-3xl text-xs leading-5 text-slate-400 sm:text-sm">{activeHero.reinforcement}</p>
            {activeHero.symptomChips?.length ? (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="よくある症状">
                {activeHero.symptomChips.slice(0, 5).map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-slate-200"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            ) : null}
            {activeHero.relatedStatusLinks?.length ? (
              <div className="mt-3 flex flex-wrap gap-2" aria-label="関連するステータスページ">
                {activeHero.relatedStatusLinks.map((link) => (
                  <Link
                    key={link.href}
                    prefetch={false}
                    className="rounded-full border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 text-xs font-medium text-sky-200 hover:border-sky-300/50 hover:bg-sky-400/15"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
            {activeHero.notWorkingHref ? (
              <p className="mt-2">
                <Link prefetch={false} className="text-sm font-medium text-sky-300 underline underline-offset-2" href={activeHero.notWorkingHref}>
                  {activeHero.notWorkingLabel}
                </Link>
              </p>
            ) : null}
          </>
        ) : (
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            {isLineStatus
              ? "このページは、LINEで今日つながらない時に今の状況や通信障害の有無を確認するためのページです。全体障害か、自分だけの不具合かを最初に分けます。"
              : isNotionStatus
              ? "Notion が今、広く障害状態かどうかを確認します。全体障害か、自分だけの不具合か、一部機能だけの問題かをすぐに分けられます。"
              : "外部からの到達性を確認しつつ、障害時に「何が分かるか／分からないか」を整理します。"}
          </p>
        )}
          </div>
        </div>
      </div>

      <section className="mb-8">
        <StatusClient
          id={site.id}
          selfCheckHref={activeHero?.notWorkingHref || undefined}
          selfCheckLabel={activeHero?.notWorkingLabel || undefined}
        />
      </section>

      {showStatusAd ? <IMobileAd slot="status_mid" /> : null}
      </div>
    </main>
  );
}
