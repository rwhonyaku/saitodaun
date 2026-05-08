import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteById, SITE_CATEGORIES } from "@/lib/statusSites";
import StatusClient from "./StatusClient";
import { SITE } from "@/lib/siteMeta";
import IMobileAd from "@/components/ads/IMobileAd";

type PageProps = {
  params: Promise<{ id: string }>;
};

const STATUS_AD_ENABLED_IDS = new Set(["twitter", "line", "discord", "prime-video"]);

function renderList(items?: string[]) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

const statusOverrides: Record<string, { title: string; description: string }> = {
  google: {
    title: "Google障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "Googleで障害や不具合が発生しているか、今の状況を確認できます。検索できない・表示されないなどのトラブルをすぐチェック。",
  },
  youtube: {
    title: "YouTube障害・不具合｜今日どうなってる？今の状況を確認",
    description:
      "YouTubeで障害や不具合が発生しているか、今日の状況を確認できます。見れない・再生できないなどのトラブルをすぐチェック。",
  },
  netflix: {
    title: "Netflix障害・不具合｜今日どうなってる？今の状況を確認",
    description:
      "Netflixで障害や不具合が発生しているか、今日の状況を確認できます。見れない・再生できない・止まるなどのトラブルをすぐチェック。",
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
    title: "メルカリ障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "メルカリで障害や不具合が発生しているか、今の状況を確認できます。表示されない・購入できない・ログインできないなどのトラブルをすぐチェック。",
  },
  paypay: {
    title: "PayPay障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "PayPayで障害や不具合が発生しているか、今の状況を確認できます。支払いできない・ログインできない・エラーなどのトラブルをすぐチェック。",
  },
  tiktok: {
    title: "TikTok障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "TikTokで障害や不具合が発生しているか、今の状況を確認できます。見れない・投稿できない・ログインできないなどのトラブルをすぐチェック。",
  },
  zoom: {
    title: "Zoom障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "Zoomで障害や不具合が発生しているか、今の状況を確認できます。つながらない・会議に入れない・ログインできないなどのトラブルをすぐチェック。",
  },
  notion: {
    title: "Notion障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "Notionで障害や不具合が発生しているか、今の状況を確認できます。開かない・同期できない・ログインできないなどのトラブルをすぐチェック。",
  },
  "microsoft-365": {
    title: "Microsoft 365障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "Microsoft 365で障害や不具合が発生しているか、今の状況を確認できます。OutlookやTeamsが使えない・ログインできないなどのトラブルをすぐチェック。",
  },
  discord: {
    title: "Discord障害・サーバー状況｜今どうなってる？リアルタイム確認",
    description:
      "Discordで障害・不具合が発生しているか、今の状況をリアルタイムで確認できます。サーバーの状態・接続トラブルの有無をすぐチェック。",
  },
  steam: {
    title: "Steam障害・サーバー状況｜今どうなってる？リアルタイム確認",
    description:
      "Steamで障害や不具合が発生しているか、今の状況をリアルタイムで確認できます。サーバー状態・接続エラー・重い状況をすぐチェック。",
  },
  teams: {
    title: "Teams障害情報・稼働状況｜今日どうなってる？リアルタイム確認",
    description:
      "Microsoft Teamsで障害や不具合が発生しているか、今日の状況をリアルタイムで確認できます。稼働状況・ログインや接続トラブルをすぐチェック。",
  },
  "prime-video": {
    title: "Amazonプライムビデオ障害・不具合｜今日どうなってる？リアルタイム確認",
    description:
      "Amazonプライムビデオが今日見れない・再生できない場合に、現在の障害・不具合状況をリアルタイムで確認できます。接続トラブルや視聴エラーをすぐチェック。",
  },
  line: {
    title: "LINE障害・不具合情報｜今日つながらない？今の状況を確認",
    description:
      "LINEで障害や不具合が起きているか、今日の状況を確認できます。通信障害・つながらない・トラブルの有無をすぐチェックできます。",
  },
  expedia: {
    title: "Expedia障害・不具合｜今日どうなってる？今の状況を確認",
    description:
      "Expediaで障害や不具合が発生しているか、今日の状況を確認できます。予約できない・検索できないなどのトラブルをすぐチェック。",
  },
  "yahoo-japan": {
    title: "Yahoo! JAPAN障害・不具合｜今どうなってる？リアルタイム確認",
    description:
      "Yahoo! JAPANで障害や不具合が発生しているか、今の状況を確認できます。繋がらない・表示されないなどのトラブルをすぐチェック。",
  },
  abema: {
    title: "ABEMA障害・不具合｜今日どうなってる？今の状況を確認",
    description:
      "ABEMAで不具合や障害が発生しているか、今日の状況を確認できます。見れない・再生できないなどのトラブルをすぐチェック。",
  },
  zozotown: {
    title: "ZOZOTOWN障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "ZOZOTOWNで障害や不具合が発生しているか、今の状況を確認できます。表示されない・注文できないなどのトラブルをすぐチェック。",
  },
  rakuten: {
    title: "楽天障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "楽天で障害や不具合が発生しているか、今の状況を確認できます。注文できない・ログインできない・決済エラーなどのトラブルをすぐチェック。",
  },
  instagram: {
    title: "Instagram障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "Instagramで障害や不具合が発生しているか、今の状況を確認できます。見れない・投稿できない・ログインできないなどのトラブルをすぐチェック。",
  },
  amazon: {
    title: "Amazon障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "Amazonで障害や不具合が発生しているか、今の状況を確認できます。注文できない・決済エラー・ログインできない・表示されないなどのトラブルをすぐチェック。",
  },
  twitter: {
    title: "X（旧Twitter）障害・不具合｜今どうなってる？現在の状況を確認",
    description:
      "X（旧Twitter）で障害や不具合が発生しているか、今の状況を確認できます。見れない・投稿できない・ログインできないなどのトラブルをすぐチェック。",
  },
};

type StatusHero = {
  heading: string;
  lead: string;
  reinforcement: string;
  secondaryReinforcement?: string;
  notWorkingHref: string;
  notWorkingLabel: string;
};

const statusHero: Record<string, StatusHero> = {
  google: {
    heading: "Google障害・不具合",
    lead: "現在のGoogleの障害・不具合状況を確認できます。",
    reinforcement: "「検索できない」「表示されない」「今の不具合」をすぐ判断できます。",
    notWorkingHref: "/services/google/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  youtube: {
    heading: "YouTube障害・不具合",
    lead: "現在のYouTubeの障害・不具合状況を確認できます。",
    reinforcement: "「今日見れない」「再生できない」「読み込めない」をすぐ判断できます。",
    notWorkingHref: "/services/youtube/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  netflix: {
    heading: "Netflix障害・不具合",
    lead: "現在のNetflixの障害・不具合状況を確認できます。",
    reinforcement: "「今日見れない」「再生できない」「止まる」と感じた時に今の状況をすぐ確認できます。",
    notWorkingHref: "/services/netflix/not-working",
    notWorkingLabel: "使えない場合はこちら",
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
    lead: "現在のメルカリの障害・不具合状況を確認できます。",
    reinforcement: "「表示されない」「購入できない」「ログインできない」などの不具合をすぐ判断できます。",
    notWorkingHref: "/services/mercari/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  paypay: {
    heading: "PayPay障害・不具合",
    lead: "現在のPayPayの障害・不具合状況を確認できます。",
    reinforcement: "「支払いできない」「ログインできない」「エラーが出る」と感じた時に今の状況をすぐ確認できます。",
    notWorkingHref: "/services/paypay/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  tiktok: {
    heading: "TikTok障害・不具合",
    lead: "現在のTikTokの障害・不具合状況を確認できます。",
    reinforcement: "「見れない」「投稿できない」「ログインできない」などの不具合をすぐ判断できます。",
    notWorkingHref: "/services/tiktok/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  zoom: {
    heading: "Zoom障害・不具合",
    lead: "現在のZoomの障害・不具合状況を確認できます。",
    reinforcement: "「つながらない」「会議に入れない」「ログインできない」と感じた時に今の状況をすぐ確認できます。",
    notWorkingHref: "/services/zoom/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  notion: {
    heading: "Notion障害・不具合",
    lead: "現在のNotionの障害・不具合状況を確認できます。",
    reinforcement: "「開かない」「同期できない」「ログインできない」と感じた時に今の状況をすぐ確認できます。",
    notWorkingHref: "/services/notion/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  "microsoft-365": {
    heading: "Microsoft 365障害・不具合",
    lead: "現在のMicrosoft 365の障害・不具合状況を確認できます。",
    reinforcement: "「Outlookが使えない」「Teamsが使えない」「ログインできない」と感じた時に今の状況をすぐ確認できます。",
    notWorkingHref: "/services/microsoft365/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  discord: {
    heading: "Discord障害・サーバー状況",
    lead: "現在のDiscordの障害・サーバー状況をリアルタイムで確認できます。",
    reinforcement: "「今つながらない」「サーバーが落ちているか」をすぐ判断できます。",
    secondaryReinforcement:
      "「ログインできない」「接続できない」「メッセージが送れない」「ボイスチャットが使えない」などの症状も含めて、現在の不具合状況を確認できます。",
    notWorkingHref: "/services/discord/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  steam: {
    heading: "Steam障害・サーバー状況",
    lead: "現在のSteamの障害・サーバー状況をリアルタイムで確認できます。",
    reinforcement: "「今つながらない」「重い」「ログインできない」状況をすぐ判断できます。",
    notWorkingHref: "/services/steam/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  teams: {
    heading: "Teams障害情報・稼働状況",
    lead: "現在のMicrosoft Teamsの障害情報・稼働状況をリアルタイムで確認できます。",
    reinforcement: "「ログインできない」「接続できない」「現在の障害」をすぐ判断できます。",
    notWorkingHref: "/services/teams/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  "prime-video": {
    heading: "Amazonプライムビデオ障害・不具合",
    lead: "現在のAmazonプライムビデオの障害・不具合状況を確認できます。",
    reinforcement:
      "「今日見れない」「再生できない」「アプリが開かない」など、現在起きている不具合の確認に使えます。",
    notWorkingHref: "/services/prime-video/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  line: {
    heading: "LINE障害・不具合情報",
    lead: "現在のLINEの障害・不具合状況を確認できます。",
    reinforcement:
      "「今日つながらない」「通信障害かも」と感じた時に、今の状況をすぐ確認できます。",
    secondaryReinforcement:
      "「メッセージが送れない」「通知が来ない」「電話できない」などの症状も含めて、現在の不具合状況を確認できます。",
    notWorkingHref: "/services/line/not-working",
    notWorkingLabel: "使えない場合はこちら",
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
    lead: "現在のYahoo! JAPANの障害・不具合状況を確認できます。",
    reinforcement: "「繋がらない」「表示されない」「今の障害」をすぐ判断できます。",
    notWorkingHref: "/services/yahoo/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  abema: {
    heading: "ABEMA障害・不具合",
    lead: "現在のABEMAの障害・不具合状況を確認できます。",
    reinforcement: "「見れない」「再生できない」「今日の不具合」をすぐ判断できます。",
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  zozotown: {
    heading: "ZOZOTOWN障害・不具合",
    lead: "現在のZOZOTOWNの障害・不具合状況を確認できます。",
    reinforcement: "「表示されない」「注文できない」「今の不具合」をすぐ判断できます。",
    notWorkingHref: "",
    notWorkingLabel: "",
  },
  rakuten: {
    heading: "楽天障害・不具合",
    lead: "現在の楽天の障害・不具合状況を確認できます。",
    reinforcement:
      "「注文できない」「ログインできない」「決済エラー」「今の不具合」をすぐ判断できます。",
    notWorkingHref: "/services/rakuten/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  instagram: {
    heading: "Instagram障害・不具合",
    lead: "現在のInstagramの障害・不具合状況を確認できます。",
    reinforcement:
      "「見れない」「投稿できない」「ログインできない」「今の不具合」をすぐ判断できます。",
    notWorkingHref: "/services/instagram/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  amazon: {
    heading: "Amazon障害・不具合",
    lead: "現在のAmazonの障害・不具合状況を確認できます。",
    reinforcement:
      "「注文できない」「決済できない」「ログインできない」「表示されない」などの不具合をすぐ判断できます。",
    notWorkingHref: "/services/amazon/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
  twitter: {
    heading: "X（旧Twitter）障害・不具合",
    lead: "現在のX（旧Twitter）の障害・不具合状況を確認できます。",
    reinforcement:
      "「見れない」「投稿できない」「ログインできない」「今の不具合」をすぐ判断できます。",
    notWorkingHref: "/services/x/not-working",
    notWorkingLabel: "使えない場合はこちら",
  },
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const base = SITE.origin;
  const site = getSiteById(params.id);

  if (!site) {
    return {
      title: `ステータスが見つかりません｜${SITE.name}`,
      description: "指定されたサービスは見つかりませんでした。",
      alternates: { canonical: `${base}/status` },
      robots: { index: false, follow: false },
    };
  }

  const effectiveTitle =
    statusOverrides[site.id]?.title ?? `${site.name} は今落ちてる？（障害・稼働状況チェック）｜${SITE.name}`;
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
  const ed = site.editorial;
  const isTwitterStatus = site.id === "twitter";
  const isLineStatus = site.id === "line";
  const isNotionStatus = site.id === "notion";
  const isLeanRouter = isTwitterStatus || isLineStatus || isNotionStatus;
  const activeHero = statusHero[site.id];
  const serviceLabel = isTwitterStatus ? "X（旧Twitter）" : site.name;
  const showStatusAd = STATUS_AD_ENABLED_IDS.has(site.id);

  const officialLinks =
    ed?.officialConfirmation?.length
      ? ed.officialConfirmation
      : [
          ...(site.officialStatusUrl
            ? [{ label: "公式ステータス/障害情報", url: site.officialStatusUrl }]
            : []),
          ...(site.supportUrl ? [{ label: "公式サポート", url: site.supportUrl }] : []),
          ...(site.xUrl ? [{ label: "公式X（旧Twitter）", url: site.xUrl }] : []),
        ];

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-900">
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-2">カテゴリ：{categoryLabel}</div>
        <h1 className="text-3xl font-bold mb-2">
          {activeHero
            ? activeHero.heading
            : isNotionStatus
            ? "Notion 障害？今開かない？現在の状況"
            : `${serviceLabel} の稼働状況`}
        </h1>
        {activeHero ? (
          <>
            <p className="text-gray-700">{activeHero.lead}</p>
            <p className="mt-2 text-sm text-gray-600">{activeHero.reinforcement}</p>
            {activeHero.secondaryReinforcement ? (
              <p className="mt-2 text-sm text-gray-600">{activeHero.secondaryReinforcement}</p>
            ) : null}
            {activeHero.notWorkingHref ? (
              <p className="mt-2">
                <Link className="text-sky-600 underline" href={activeHero.notWorkingHref}>
                  {activeHero.notWorkingLabel}
                </Link>
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-gray-700">
            {isLineStatus
              ? "このページは、LINEで今日つながらない時に今の状況や通信障害の有無を確認するためのページです。全体障害か、自分だけの不具合かを最初に分けます。"
              : isNotionStatus
              ? "Notion が今、広く障害状態かどうかを確認します。全体障害か、自分だけの不具合か、一部機能だけの問題かをすぐに分けられます。"
              : "外部からの到達性を確認しつつ、障害時に「何が分かるか／分からないか」を整理します。"}
          </p>
        )}
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">このページで分かること</h2>
        {ed ? (
          renderList(ed.whatThisCheckMeans)
        ) : (
          <p className="text-gray-700">
            このページは「外部から到達できるか」を確認します。ログイン後の画面やアプリ内機能は判定できません。
          </p>
        )}
      </section>

      <section className="mb-10">
        <StatusClient id={site.id} />
      </section>

      {showStatusAd ? <IMobileAd slot="status_mid" /> : null}

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{site.name} で起きやすい不調パターン</h2>
        {ed ? renderList(ed.commonOutagePatterns) : <p className="text-gray-700">{site.serviceNote}</p>}
      </section>

      {ed?.affectedAreasFirst?.length ? (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">影響が出やすい機能・導線</h2>
          {renderList(ed.affectedAreasFirst)}
        </section>
      ) : null}

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">このページが役立つ／役立たないケース</h2>
        <div className="grid gap-4">
          <div className="rounded-lg border p-4">
            <div className="font-semibold mb-2">役立つとき</div>
            {ed ? (
              renderList(ed.usefulWhen)
            ) : (
              <p className="text-gray-700">複数環境で開けないなど、到達性の切り分けに使えます。</p>
            )}
          </div>
          <div className="rounded-lg border p-4">
            <div className="font-semibold mb-2">このページだけでは不十分なとき</div>
            {ed ? (
              renderList(ed.notSufficientWhen)
            ) : (
              <p className="text-gray-700">ログインや特定機能の不具合は、このチェックだけでは判定できません。</p>
            )}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">公式確認先（障害・メンテ情報）</h2>
        <ul className="list-disc pl-5 space-y-1">
          {officialLinks.map((l) => (
            <li key={l.url}>
              <a className="text-sky-600 underline" href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 mt-3">
          公式情報は「影響範囲」「復旧見込み」「メンテ予定」など、このページの到達性チェックでは分からない情報を補完します。
        </p>
      </section>

      {!isLeanRouter ? (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">同カテゴリも確認する</h2>
          <p className="text-gray-700 mb-2">
            同じカテゴリ（{categoryLabel}）で同時に不調が多発している場合、サービス個別ではなく回線・DNS・経路側の影響の可能性もあります。
          </p>
          <Link className="text-sky-600 underline" href={`/status/category/${site.category}`}>
            「{categoryLabel}」カテゴリ一覧へ →
          </Link>
        </section>
      ) : null}
    </div>
  );
}
