import type { Metadata } from "next";
import Link from "next/link";
import { getSiteById, SITE_CATEGORIES } from "@/lib/statusSites";
import StatusClient from "./StatusClient";
import { SITE } from "@/lib/siteMeta";
import ConoHaPromoCard from "@/components/ConoHaPromoCard";

// New Next.js 14 pattern
type PageProps = {
  params: Promise<{ id: string }>;
};

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

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const base = SITE.origin;
  const site = getSiteById(params.id);

  if (!site) {
    return {
      title: `ステータスが見つかりません｜${SITE.name}`,
      description: "指定されたサービスは見つかりませんでした。",
      alternates: { canonical: `${base}/status` },
    };
  }

  const title = `${site.name} は今落ちてる？（障害・稼働状況チェック）｜${SITE.name}`;
  const description = `${site.name} の稼働状況（オンライン／オフライン）を簡易チェック。HTTPステータスや応答時間も確認できます。`;

  return {
    title,
    description,
    alternates: { canonical: `${base}/status/sites/${site.id}` },
    openGraph: {
      title,
      description,
      url: `${base}/status/sites/${site.id}`,
      siteName: SITE.name,
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const site = getSiteById(params.id);

  if (!site) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">ステータスが見つかりません</h1>
        <p className="text-gray-700 mb-4">指定されたサービスは見つかりませんでした。</p>
        <Link className="text-sky-600 underline" href="/status">
          ← ステータス一覧へ
        </Link>
      </div>
    );
  }

  const categoryLabel = SITE_CATEGORIES[site.category];
  const ed = site.editorial;

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
        <h1 className="text-3xl font-bold mb-2">{site.name} の稼働状況</h1>
        <p className="text-gray-700">
          外部からの到達性を確認しつつ、障害時に「何が分かるか／分からないか」を整理します。
        </p>
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

      {/* --- HIGH UPSIDE PROMOTION --- */}
      <section className="mb-12">
        <ConoHaPromoCard />
      </section>
      {/* ----------------------------- */}

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          {site.name} で起きやすい不調パターン
        </h2>
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

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">同カテゴリも確認する</h2>
        <p className="text-gray-700 mb-2">
          同じカテゴリ（{categoryLabel}）で同時に不調が多発している場合、サービス個別ではなく回線・DNS・経路側の影響の可能性もあります。
        </p>
        <Link className="text-sky-600 underline" href={`/status/category/${site.category}`}>
          「{categoryLabel}」カテゴリ一覧へ →
        </Link>
      </section>
    </div>
  );
}