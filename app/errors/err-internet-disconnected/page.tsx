import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "ERR_INTERNET_DISCONNECTEDとは？原因と対処 | サイトダウン",
  description:
    "ERR_INTERNET_DISCONNECTED の意味、Wi-Fi切断やルーター不調、回線障害、端末側の接続切れで起きる原因と、ユーザー側での切り分け方を実用的に解説します。",
};

export default function ErrInternetDisconnectedPage() {
  return (
    <EvergreenPageShell
      h1="ERR_INTERNET_DISCONNECTEDとは？原因と対処"
      updatedAt="2026-04-11"
      lead={[
        "ERR_INTERNET_DISCONNECTED は、ブラウザが『この端末は今インターネットにつながっていない』と判断したときに出るエラーです。",
        "特定サイトだけの問題ではなく、Wi-Fi切断、ルーター不調、回線障害、端末の接続切れなど、より手前の接続問題で起きることが多いのが特徴です。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "まず他のサイトも開けないかを確認し、サイト単位の問題ではないかを見る",
            "Wi-Fiアイコンやネットワーク状態を確認し、端末が本当に接続中かを見る",
            "スマホのモバイル回線では使えるなら、自宅Wi-Fiやルーター側を優先して疑う",
            "家のすべての端末で同時にだめなら、ルーターか回線障害の可能性が高い",
          ],
        },
        {
          type: "list",
          title: "このエラーで起きていること",
          items: [
            "ブラウザが、端末に有効なインターネット接続がないと判断している",
            "DNSやHTTPエラー以前の段階で止まっている",
            "原因はWi-Fi切断、LAN未接続、ルーター不調、回線障害、公共Wi-Fi未認証などが中心",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "Wi-Fiや有線LANが切れている",
            "ルーターやモデムの一時不具合",
            "ISPや回線事業者側の障害",
            "公共Wi-Fiのログイン未完了や認証切れ",
            "端末のネットワーク設定異常やスリープ復帰後の接続不良",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "複数サイトが全部開かないなら、特定サイト障害より接続全体の問題を疑う",
            "スマホのモバイル回線では正常なら、自宅Wi-Fiやルーター側の可能性が高い",
            "公共Wi-Fiだけで出るなら、回線断より認証切れやログイン誘導失敗を疑いやすい",
            "自分のPCだけなら、端末の接続設定や復帰不良の可能性もある",
          ],
        },
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) Wi-Fiや有線LANが本当に接続されているか確認する",
            "2) ルーターと端末を再接続・再起動する",
            "3) スマホのモバイル回線など別回線で比較する",
            "4) 公共Wi-Fiならログイン画面や認証状態を確認する",
            "5) 広域障害情報を確認して回線側の問題かを見る",
          ],
        },
        {
          type: "p",
          title: "特定サイトの障害とはどう違うか",
          body: [
            "ERR_INTERNET_DISCONNECTED は、特定のURLだけでなく複数サイトに広く出やすいエラーです。特定サイトだけ開かない場合のように、DNSやHTTPエラーを疑う段階まで進んでいないことが多いです。",
            <>
              もし一部サイトだけなら{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              のほうが近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "Wi-Fiやルーター側を優先して見るべきケース",
          body: [
            "自宅でよく出るなら、ブラウザより先に Wi-Fi とルーターを疑うほうが早いです。特に『Wi-Fiにはつながっている表示なのに開けない』『再起動で一時的に直る』なら、家庭内ネットワーク側の問題に近いです。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/wifi-not-working"
                className="underline hover:no-underline"
              >
                Wi-Fiがつながらない原因
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/router-not-working"
                className="underline hover:no-underline"
              >
                ルーターがつながらない原因
              </Link>{" "}
              を先に確認してください。
            </>,
          ],
        },
        {
          type: "p",
          title: "回線障害や公共Wi-Fiの影響もある",
          body: [
            "家全体で同時にだめなら、ルーターだけでなく回線障害も候補です。逆にホテル、空港、カフェなどでだけ出るなら、公共Wi-Fiの認証やセッション切れの可能性もあります。",
            <>
              回線障害なら{" "}
              <Link href="/outages/japan" className="underline hover:no-underline">
                ネット障害情報
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/router-vs-isp-problem"
                className="underline hover:no-underline"
              >
                ルーターが原因か回線障害か見分ける方法
              </Link>{" "}
              が役立ち、公共Wi-Fiなら{" "}
              <Link
                href="/troubleshooting/public-wifi-login-page-not-showing"
                className="underline hover:no-underline"
              >
                公共Wi-Fiでログイン画面が出ない原因
              </Link>{" "}
              が近いページです。
            </>,
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはサイト側の障害ですか？ → 多くは違います。端末がインターネット接続自体を失っています。",
            "Q. 自分だけ出ることはありますか？ → あります。端末のWi-Fi切断やスリープ復帰不良だけでも起きます。",
            "Q. DNSエラーとの違いは？ → DNSエラーは接続はあるが名前解決に失敗しています。これは接続そのものがない段階です。",
            "Q. すぐ直りますか？ → 一時的な切断なら再接続ですぐ直ることもありますが、回線障害なら復旧待ちになることがあります。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="err-internet-disconnected"
            />,
          ],
        },
      ]}
    />
  );
}
