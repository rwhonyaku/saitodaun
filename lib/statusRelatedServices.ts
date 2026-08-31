export type StatusRelatedService = {
  href: string;
  label: string;
  note: string;
};

const WORKPLACE_NOTE = "他の業務ツールも同時に不安定か確認すると、個別障害か社内回線・認証側の問題かを切り分けやすくなります。";
const COMMERCE_NOTE = "閲覧・ログイン・注文・決済のどこまで影響しているか、他の通販サービスと比較できます。";
const STREAMING_NOTE = "別の動画サービスも再生できない場合は、端末・回線・配信経路側の影響も疑えます。";
const MOBILE_NOTE = "別回線の状況と比較すると、特定キャリアだけの問題か端末側の問題かを判断しやすくなります。";
const PAYMENT_NOTE = "他の決済サービスが使えるか比較すると、店舗・端末・回線・決済事業者のどこに問題があるかを絞れます。";

const link = (id: string, label: string, note: string): StatusRelatedService => ({
  href: `/status/sites/${id}`,
  label,
  note,
});

const RELATED: Record<string, StatusRelatedService[]> = {
  chatwork: [link("teams", "Microsoft Teams", WORKPLACE_NOTE), link("slack", "Slack", WORKPLACE_NOTE), link("notion", "Notion", WORKPLACE_NOTE)],

  shopify: [link("qoo10", "Qoo10", COMMERCE_NOTE), link("zozotown", "ZOZOTOWN", COMMERCE_NOTE), link("mercari", "メルカリ", COMMERCE_NOTE)],
  qoo10: [link("zozotown", "ZOZOTOWN", COMMERCE_NOTE), link("mercari", "メルカリ", COMMERCE_NOTE), link("shopify", "Shopify", COMMERCE_NOTE)],
  zozotown: [link("qoo10", "Qoo10", COMMERCE_NOTE), link("mercari", "メルカリ", COMMERCE_NOTE), link("shopify", "Shopify", COMMERCE_NOTE)],
  mercari: [link("qoo10", "Qoo10", COMMERCE_NOTE), link("zozotown", "ZOZOTOWN", COMMERCE_NOTE), link("shopify", "Shopify", COMMERCE_NOTE)],

  netflix: [link("abema", "ABEMA", STREAMING_NOTE), link("u-next", "U-NEXT", STREAMING_NOTE), link("disney-plus", "Disney+", STREAMING_NOTE)],
  abema: [link("netflix", "Netflix", STREAMING_NOTE), link("u-next", "U-NEXT", STREAMING_NOTE), link("prime-video", "Prime Video", STREAMING_NOTE)],
  "u-next": [link("netflix", "Netflix", STREAMING_NOTE), link("abema", "ABEMA", STREAMING_NOTE), link("disney-plus", "Disney+", STREAMING_NOTE)],
  "disney-plus": [link("netflix", "Netflix", STREAMING_NOTE), link("u-next", "U-NEXT", STREAMING_NOTE), link("prime-video", "Prime Video", STREAMING_NOTE)],
  "prime-video": [link("netflix", "Netflix", STREAMING_NOTE), link("abema", "ABEMA", STREAMING_NOTE), link("u-next", "U-NEXT", STREAMING_NOTE)],

  docomo: [link("au", "au", MOBILE_NOTE), link("softbank", "SoftBank", MOBILE_NOTE), link("rakuten-mobile", "楽天モバイル", MOBILE_NOTE)],
  au: [link("docomo", "ドコモ", MOBILE_NOTE), link("softbank", "SoftBank", MOBILE_NOTE), link("rakuten-mobile", "楽天モバイル", MOBILE_NOTE)],
  softbank: [link("docomo", "ドコモ", MOBILE_NOTE), link("au", "au", MOBILE_NOTE), link("rakuten-mobile", "楽天モバイル", MOBILE_NOTE)],
  "rakuten-mobile": [link("docomo", "ドコモ", MOBILE_NOTE), link("au", "au", MOBILE_NOTE), link("softbank", "SoftBank", MOBILE_NOTE)],

  paypay: [link("rakuten-pay", "楽天ペイ", PAYMENT_NOTE), link("au-pay", "au PAY", PAYMENT_NOTE)],
  "rakuten-pay": [link("paypay", "PayPay", PAYMENT_NOTE), link("au-pay", "au PAY", PAYMENT_NOTE)],
  "au-pay": [link("paypay", "PayPay", PAYMENT_NOTE), link("rakuten-pay", "楽天ペイ", PAYMENT_NOTE)],
};

export function getStatusRelatedServices(serviceId: string) {
  return RELATED[serviceId] ?? [];
}
