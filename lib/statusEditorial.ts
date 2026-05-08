// lib/statusEditorial.ts

export type StatusEditorial = {
  /** Short plain-language summary shown near the top */
  humanSummary: string;

  /** 1) What does it mean if it's down? (service-specific framing) */
  whatItMeansIfDown: string | string[];

  /** 2) What users can check next (informational, non-advice tone) */
  whatToCheckNext: string[];

  /** 3) Where official confirmation lives + why it matters */
  officialConfirmation: {
    whyItMatters: string[];
    linksNote?: string;
  };

  /** 4) When this page is useful / not useful */
  usefulWhen: string[];
  notUsefulWhen: string[];

  /** 5) Service-specific outage patterns (must be unique per service) */
  serviceSpecific: {
    commonPatterns: string[];
    tendsToBreakFirst?: string[];
    siteUpButFeatureBrokenExamples?: string[];
  };

  /** Optional: internal linking copy (semantic, not “see more”) */
  internalLinks?: Array<{
    href: string;
    label: string;
    reason: string;
  }>;

  /** Optional: related ecosystem services */
  relatedServices?: Array<{
    href: string;
    label: string;
    note: string;
  }>;
};

const EDITORIAL_BY_ID: Record<string, StatusEditorial> = {
  "yahoo-japan": {
    humanSummary:
      "Yahoo! JAPAN の稼働状況を簡易的に確認し、公式情報の確認先やよくある障害パターンを整理しています。",

    whatItMeansIfDown: `「オフライン」になった場合、このページのチェック元（サーバー）から Yahoo! JAPAN に到達できていない状態を示します。
        ただし、Yahoo! JAPAN はトップが表示できても「ログイン」「一部機能」「一部ドメイン」だけが不安定になることがあり、全面停止とは限りません。
        また、あなたの回線・端末側だけの要因（DNS、拡張機能、企業ネットワークの制限など）で到達できないケースもあります。`,

    whatToCheckNext: [
      "「トップは開くが特定サービスが使えない」か、「トップ自体が開かない」かで状況の種類が変わります（部分障害か、広範囲か）。",
      "同じ Yahoo 系サービス（メール、ヤフオク、ショッピング等）も同時に不安定なら、Yahoo 側の影響範囲が広い可能性があります。",
      "他の大手サイトも同時に開きにくい場合、個別サービス障害ではなく回線・DNS 側の揺らぎの可能性も残ります。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式の障害告知は、影響範囲（どの機能が対象か）や復旧状況（作業中／復旧済み）を確認できるため、切り分けに有用です。",
        "このページは「到達できるか」を見る簡易チェックなので、公式の全体状況と一致しない場合があります（地域差・時間差・機能限定など）。",
      ],
      linksNote:
        "Yahoo! JAPAN の告知は、ヘルプ内の案内や関連サービス側の告知に分散して掲載されることがあります。",
    },

    usefulWhen: [
      "Yahoo! JAPAN のトップ（https://www.yahoo.co.jp）が「まったく開けない」状況のとき",
      "複数端末・複数回線でも同様に開けず、サービス側の可能性を短時間で当たり付けしたいとき",
      "SNS 等の憶測ではなく、まずは到達可否（HTTP）という事実ベースで確認したいとき",
    ],

    notUsefulWhen: [
      "ログイン後だけで起きる不具合（ID連携、ログインセッション、二段階認証など）",
      "アプリのみの不具合（アプリ内WebView、アプリ更新、端末依存の挙動）",
      "特定機能のみ（メール送信、ヤフオク取引ナビ、コメント表示など）の不具合",
      "あなたの環境だけの表示崩れ（拡張機能・キャッシュ・企業プロキシ等）",
    ],

    serviceSpecific: {
      commonPatterns: [
        "トップは表示されるが、メール・ヤフオク・ショッピング等の「個別サービス」だけが不安定になる（部分障害）",
        "検索やニュース見出しは見えるが、遷移先の詳細ページだけが開けない（サブドメイン・配信経路の差）",
        "ログイン・アカウント周りのみ遅延／失敗し、閲覧系は継続（認証系の混雑・制限）",
      ],
      tendsToBreakFirst: [
        "ログイン／本人確認（Yahoo! JAPAN ID関連）",
        "コメント・投稿などの書き込み系",
        "画像・広告などの外部配信要素（体感として「重い／白い」が出やすい）",
      ],
      siteUpButFeatureBrokenExamples: [
        "トップは開くが、メールが同期しない／送受信が不安定",
        "ヤフオクは閲覧できるが、取引ナビや支払い手続きだけ進まない",
        "ショッピングは表示できるが、カート／注文確定だけ失敗する",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/search_portal",
        label: "検索・ポータルの一覧",
        reason:
          "同カテゴリで複数サービスが同時に不安定な場合、個別障害ではなく回線・DNS 側の影響を疑う材料になります。",
      },
      {
        href: "/",
        label: "URL入力の接続チェック",
        reason:
          "Yahoo! 以外の特定URLでも同様に到達できないか確認することで、サービス固有か環境要因かの切り分けに使えます。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/yahoo-mail",
        label: "Yahoo!メール",
        note:
          "トップは開くがメールだけ不安定なとき、機能限定の影響が疑われます。",
      },
      {
        href: "/status/sites/yahoo-auctions",
        label: "Yahoo!オークション（ヤフオク!）",
        note:
          "取引・支払い周りだけ失敗する等の部分障害が出やすい領域です。",
      },
      {
        href: "/status/sites/yahoo-shopping",
        label: "Yahoo!ショッピング",
        note:
          "閲覧はできてもカート／注文確定のみ不安定、という切り分けに役立ちます。",
      },
      {
        href: "/status/sites/yahoo-news-jp",
        label: "Yahoo!ニュース",
        note:
          "見出しは出るが詳細だけ開けない等、遷移先の不具合の確認に使えます。",
      },
    ],
  },

  // ===== Batch #1 (12) — below Yahoo =====

  // 1) Google
  google: {
    humanSummary:
      "Googleは「全停止」よりも、検索・Gmail・Workspaceなど特定機能だけが遅い／開かない形で現れることが多いです。",

    whatItMeansIfDown:
      "このページが「オフライン」の場合でも、Google側の障害と断定はできません。回線・DNS・一時的な遮断（WAF／レート制限）などで、こちらのチェック元から到達できないだけのことがあります。逆に「オンライン」でも、ログインや特定サービスだけ不調の可能性があります。",

    whatToCheckNext: [
      "「検索トップは開くが周辺（画像・ニュース・地図）だけ失敗」かどうかで、影響の出方（機能限定か広範囲か）が変わります。",
      "Gmail/Workspaceは「ログインはできるが送受信だけ遅い」など段階的に症状が出ることがあります。",
      "端末や回線を変えると体感が変わる場合があり、地域／ISP単位の遅延が疑われます。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式のステータス告知は、影響範囲（どの機能が対象か）と復旧状況を確認でき、切り分けに役立ちます。",
        "このページは外形的な到達性（HTTP）の目安であり、アカウント・権限・機能内部の問題は反映されないことがあります。",
      ],
      linksNote:
        "Googleはサービスごとに告知先が分かれることがあります（Workspace、Gmail、Cloudなど）。該当プロダクトの公式ステータスを優先してください。",
    },

    usefulWhen: [
      "複数端末・複数回線で同様の症状があり、まず外形的に到達できるかを見たいとき",
      "“今この瞬間”の応答可否・応答時間の目安を取りたいとき",
    ],

    notUsefulWhen: [
      "アカウント固有（ログイン、2段階認証、権限）に起因する問題",
      "アプリ内だけの不具合（キャッシュ、バージョン、拡張機能）",
    ],

    serviceSpecific: {
      commonPatterns: [
        "検索トップは表示されるが、画像検索／ニュース／地図など周辺プロダクトだけ失敗する",
        "Gmail/Workspaceで「ログインはできるが送受信だけ遅い」「管理コンソールだけ遅い」など段階的に出る",
        "地域／ISP単位の遅延で、同じGoogleでも回線によって体感が変わる",
      ],
      tendsToBreakFirst: [
        "ログイン／認証（アカウント周り）",
        "メール送受信・同期（Gmail/Workspace）",
        "周辺プロダクト（画像・地図・ニュース等）",
      ],
      siteUpButFeatureBrokenExamples: [
        "検索はできるが、Google画像検索だけ結果が出ない／遅い",
        "Gmailは開くが、送信だけ失敗する／遅延する",
        "Workspaceは閲覧できるが、管理コンソール操作だけ反映が遅い",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/search_portal",
        label: "検索・ポータルの一覧",
        reason:
          "同カテゴリで複数サービスが同時に不安定なら、個別障害ではなく回線・DNS側の影響も切り分け候補になります。",
      },
      {
        href: "/",
        label: "URL入力の接続チェック",
        reason:
          "Google以外のURLでも同様に到達できないか確認すると、サービス固有か環境要因か整理しやすくなります。",
      },
    ],
  },

  // 2) Amazon.co.jp
  "amazon-jp": {
    humanSummary:
      "Amazonは「サイト表示」と「購入・決済・注文履歴」が別系統になりやすく、トップは開くのに購入だけ失敗する形がよく見られます。",

    whatItMeansIfDown:
      "このページが「オフライン」でも、Amazon側の障害とは限りません。CDN／回線／一時的なブロックで到達できない場合があります。「オンライン」でも、カート・決済・配送追跡など機能単位で問題が残ることがあります。",

    whatToCheckNext: [
      "トップ／検索は開くのに、カート投入〜注文確定だけ失敗していないか確認します（購入フローの局所問題）。",
      "注文履歴・配送状況・レビュー投稿など、アカウント系の画面だけ遅い／失敗する形になっていないか確認します。",
      "セール等で混雑する時間帯は、表示はできても裏側処理（在庫確定・決済）だけ遅延することがあります。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式告知があれば、影響範囲（購入／決済／配送など）と復旧見込みの把握に役立ちます。",
        "このページは到達性の目安であり、購入フロー内部の障害（決済・在庫等）を直接示すものではありません。",
      ],
      linksNote:
        "公式の案内はヘルプや公式アカウント等に分散することがあります。購入・決済系は公式の案内を優先してください。",
    },

    usefulWhen: [
      "Amazon全体に到達できるか（外形のHTTP到達性）を素早く確認したいとき",
      "障害っぽい体感があり、まず“外から見て落ちているか”の当たりを付けたいとき",
    ],

    notUsefulWhen: [
      "商品・出品者・配送地域など条件依存の問題",
      "アプリ固有の不具合、ログイン・決済手段・本人認証などアカウント要因",
    ],

    serviceSpecific: {
      commonPatterns: [
        "トップや検索は表示されるが、カート投入〜注文確定の途中だけエラーになる",
        "注文履歴・配送状況・レビューなど“アカウント系”だけ遅い／失敗する",
        "アクセス集中時に、表示はできても決済／在庫確定など裏側処理だけ遅延する",
      ],
      tendsToBreakFirst: [
        "注文確定／決済",
        "注文履歴／配送追跡",
        "レビュー投稿など書き込み系",
      ],
      siteUpButFeatureBrokenExamples: [
        "検索はできるが、注文確定だけエラーになる",
        "商品ページは開くが、支払い方法選択で進まない",
        "注文履歴は見えるが、配送追跡の更新だけ止まる",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/ecommerce_marketplace",
        label: "EC・通販の一覧",
        reason:
          "EC系で複数サービスが同時に不調なら、回線・DNS側や周辺（決済など）の影響も切り分け候補になります。",
      },
      {
        href: "/",
        label: "URL入力の接続チェック",
        reason:
          "Amazon以外のURLも同時に不安定かを見ることで、個別障害か環境要因か整理できます。",
      },
    ],
  },

  // 3) 楽天市場
  rakuten: {
    humanSummary:
      "楽天は「閲覧」と「ログイン／購入／決済」が分かれており、商品ページは見えても購入手続きだけ止まることがあります。",

    whatItMeansIfDown:
      "このページが「オフライン」でも、楽天側の障害とは限りません。回線・DNS・一時的な混雑で到達できない場合があります。「オンライン」でも、注文／決済／履歴などが部分的に不安定な可能性があります。",

    whatToCheckNext: [
      "商品ページは見えるのに、カート／注文確定だけ失敗していないか確認します。",
      "ポイント／クーポン表示など周辺機能の遅延として現れていないか確認します。",
      "アプリのみ不調／Webのみ不調など、症状がチャネルで分かれていないか確認します。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式の告知があれば、注文・決済など影響範囲を把握しやすくなります。",
        "このページは到達性の目安で、購入手続き内部のエラー（決済・認証等）を直接示しません。",
      ],
      linksNote:
        "楽天はサービス（市場・カード・ペイ等）ごとに案内が分かれることがあります。該当サービスの公式案内を優先してください。",
    },

    usefulWhen: [
      "楽天全体が外形的に到達できるかを確認したいとき",
      "“購入できない”体感の前に、まず到達性を切り分けたいとき",
    ],

    notUsefulWhen: [
      "特定ショップ／商品／配送条件に依存するエラー",
      "ログイン・本人確認・カード認証などアカウント／決済要因",
    ],

    serviceSpecific: {
      commonPatterns: [
        "閲覧は可能だが、カート／注文確定のみ失敗する（部分障害）",
        "ポイント／クーポン表示など周辺機能の遅延として現れる",
        "アプリだけ不調、またはWebだけ不調という形で分かれる",
      ],
      tendsToBreakFirst: ["注文確定／決済", "ログイン／本人確認", "ポイント・クーポン周り"],
      siteUpButFeatureBrokenExamples: [
        "商品ページは開くが、注文確定だけ進まない",
        "ログインはできるが、購入手続きだけエラーになる",
        "ポイント表示が崩れる／反映が遅れる",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/ecommerce_marketplace",
        label: "EC・通販の一覧",
        reason:
          "同カテゴリで複数サービスが同時に不調なら、回線・DNS・周辺（決済）側の影響も切り分け候補になります。",
      },
    ],
  },

  // 4) LINE
  line: {
    humanSummary:
      "LINEは「トーク送受信」と「通話／スタンプ／決済」等が分かれ、メッセージは届くのに通話だけ不安定…のような部分的な不具合が起きます。",

    whatItMeansIfDown:
      "このページが「オフライン」でも、LINE側の全体障害とは限りません。ネットワーク条件や一時的な通信失敗で到達できない場合があります。「オンライン」でも、機能単位の不具合が残ることがあります。",

    whatToCheckNext: [
      "メッセージ送受信はできるか、通話（音声／ビデオ）だけが失敗していないか確認します。",
      "通知が遅れて届く形（遅延）になっていないか確認します。",
      "スタンプ購入や決済連携など“周辺機能”だけ不安定になっていないか確認します。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式告知があれば、影響がトークなのか通話なのか等の範囲が把握しやすくなります。",
        "このページは到達性の目安で、アプリ内機能や通知経路の不具合を直接示すものではありません。",
      ],
      linksNote:
        "LINEはアプリ内のお知らせや公式アカウント等で告知されることがあります。該当する案内を優先してください。",
    },

    usefulWhen: [
      "複数端末／回線で同様の症状があり、外形的に到達できるかを確認したいとき",
      "SNS等の憶測より先に、まず到達可否の目安を取りたいとき",
    ],

    notUsefulWhen: [
      "友だち／グループ／端末設定など個別条件の問題",
      "アプリ更新・OS通知設定・省電力など端末依存の要因",
    ],

    serviceSpecific: {
      commonPatterns: [
        "メッセージは届くが、音声／ビデオ通話だけ接続できない",
        "通知が遅れる（届くが遅い）",
        "スタンプ購入や決済連携など周辺機能だけ不安定になる",
      ],
      tendsToBreakFirst: ["通話（音声／ビデオ）", "通知", "購入・決済など周辺機能"],
      siteUpButFeatureBrokenExamples: [
        "トークはできるが、通話だけ開始できない",
        "既読が付くまで遅い／通知だけ遅れる",
        "スタンプ購入だけ失敗する",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/social_messaging",
        label: "SNS・メッセージの一覧",
        reason:
          "同カテゴリで複数サービスが同時に不調なら、回線・DNS側の影響も切り分け候補になります。",
      },
    ],
  },

  // 5) X（旧Twitter）
  twitter: {
    humanSummary:
      "X（旧Twitter）は、まず「今広く落ちているか」を見て、そのうえで投稿・通知・DMなどの部分不具合か、自分の環境要因かを分けて考えるのが早いサービスです。",

    whatItMeansIfDown:
      "このページは X（旧Twitter） に外から到達できるかを見るためのものです。ここで広く落ちているように見えるなら全体障害の可能性があり、逆に広く落ちていないなら自分の回線・端末・アプリ・ログイン状態の切り分けが優先です。",

    whatToCheckNext: [
      "広く落ちていないのに使えないなら、/services/x/not-working で自分側の切り分けに進みます。",
      "タイムラインは表示されるが、投稿・通知・DMだけ不安定なら部分不具合として見ます。",
      "Wi-Fiとモバイル回線で差があるなら、サービス全体より回線・端末側を優先します。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式の障害案内があれば、投稿・DM等の影響範囲が確認できます。",
        "このページは到達性の目安で、アカウント制限や機能内部の不具合は別途切り分けが必要です。",
      ],
      linksNote:
        "公式の告知はヘルプや公式アカウント等に出ることがあります。該当する案内を優先してください。",
    },

    usefulWhen: [
      "外から見て X（旧Twitter） が今広く落ちているかの目安を見たいとき",
      "『自分だけか、全体か』を最初に分けたいとき",
    ],

    notUsefulWhen: [
      "アカウント制限／ロック／認証など個別アカウント要因",
      "アプリだけの不具合、拡張機能、キャッシュ、端末依存の不調",
    ],

    serviceSpecific: {
      commonPatterns: [
        "閲覧はできるが、投稿／リプライ／いいねの反映が遅れる",
        "通知だけ遅延、またはDMだけ不安定になる",
        "画像・動画などメディア配信だけ不安定になる",
      ],
      tendsToBreakFirst: ["投稿・反映", "通知", "DM"],
      siteUpButFeatureBrokenExamples: [
        "タイムラインは見えるが投稿だけ失敗する",
        "通知が来ない／遅いが閲覧はできる",
        "DMだけ送れない／開けない",
      ],
    },

    internalLinks: [
      {
        href: "/services/x/not-working",
        label: "X（旧Twitter）が使えないときの切り分け",
        reason:
          "広く落ちていないのに自分だけ使えない場合は、こちらでアプリ・ログイン・回線・端末側を切り分けた方が早いです。",
      },
      {
        href: "/status/category/social_messaging",
        label: "SNS・メッセージの一覧",
        reason:
          "同カテゴリで複数サービスが同時に不調なら、端末／回線側の要因も切り分け候補になります。",
      },
    ],
  },

  // 6) Instagram
  instagram: {
    humanSummary:
      "Instagramは「閲覧」と「投稿／ストーリーズ／DM」が分かれ、DMだけ落ちるなど局所的に起きやすいサービスです。",

    whatItMeansIfDown:
      "このページが「オフライン」でも、Instagram側の障害と断定はできません。回線や一時的な通信不良で到達できない場合があります。",

    whatToCheckNext: [
      "フィード閲覧はできるが、投稿やストーリーズ作成だけ失敗していないか確認します。",
      "DMだけ遅延・送れないなど、機能限定の形になっていないか確認します。",
      "画像／動画のアップロードだけ止まるなど、メディア処理側の症状がないか確認します。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式の案内があれば、投稿・DM等どの機能に影響が出ているか把握できます。",
        "このページは到達性の目安で、アプリ内部（投稿・アップロード等）の状態は直接示しません。",
      ],
      linksNote:
        "Meta系は告知の出方がサービスや地域で変わることがあります。該当する公式案内を優先してください。",
    },

    usefulWhen: [
      "Instagramに外形的に到達できるかを確認したいとき",
      "複数端末／回線で同様の症状があり、全体要因かを見たいとき",
    ],

    notUsefulWhen: [
      "アカウント／投稿権限／コミュニティ制限など個別要因",
      "アプリ固有の問題（更新／キャッシュ）",
    ],

    serviceSpecific: {
      commonPatterns: [
        "フィードは見えるが、投稿やストーリーズ作成だけ失敗する",
        "DMだけ遅延・送受信できない",
        "画像／動画アップロードだけ止まる（メディア処理の遅延）",
      ],
      tendsToBreakFirst: ["アップロード", "DM", "投稿作成"],
      siteUpButFeatureBrokenExamples: [
        "閲覧はできるが、投稿だけ失敗する",
        "DMだけ送れない／遅い",
        "ストーリーズだけ投稿できない",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/social_messaging",
        label: "SNS・メッセージの一覧",
        reason:
          "同カテゴリのサービスも同時に不調なら、回線・DNS側の要因も切り分け候補になります。",
      },
    ],
  },

  // 7) YouTube
  youtube: {
    humanSummary:
      "YouTubeは「視聴」と「アップロード／コメント／ライブ」が分かれ、ライブだけ不調など機能単位の障害が起きます。",

    whatItMeansIfDown:
      "このページが「オフライン」でも、YouTube側の障害とは限りません。回線やCDN経路の問題で到達できない場合があります。「オンライン」でも、再生／検索／ライブなど特定機能だけ不安定なことがあります。",

    whatToCheckNext: [
      "一覧や検索は出るのに、再生開始だけ失敗していないか確認します。",
      "ライブ配信／チャットだけ不調（通常視聴は可能）という形になっていないか確認します。",
      "アップロードや処理（エンコード）周りだけ遅延していないか確認します。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式案内があれば、視聴・ライブ・アップロードなど影響範囲が把握しやすくなります。",
        "このページは到達性の目安で、特定動画の制限や端末側の再生環境は別途切り分けが必要です。",
      ],
      linksNote:
        "YouTubeは地域差や回線品質の影響も受けやすいため、公式案内と併せて状況整理すると有用です。",
    },

    usefulWhen: [
      "YouTubeに到達できるかを確認したいとき",
      "“再生できない”体感の前に、まず外形到達性を見たいとき",
    ],

    notUsefulWhen: [
      "特定チャンネル／特定動画だけの問題（権利・地域制限等）",
      "端末の再生環境（ブラウザ／拡張／ネット品質）に依存する問題",
    ],

    serviceSpecific: {
      commonPatterns: [
        "一覧は出るが再生開始だけ失敗、または画質切替だけ不安定",
        "ライブ配信・チャットだけ不調（視聴は可能）",
        "アップロードや処理（エンコード）周りだけ遅延する",
      ],
      tendsToBreakFirst: ["再生開始", "ライブ", "アップロード"],
      siteUpButFeatureBrokenExamples: [
        "ページは開くが再生ボタンで止まる",
        "ライブだけ読み込めない",
        "アップロードだけ進まない／処理が終わらない",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/streaming_media",
        label: "動画・音楽の一覧",
        reason:
          "同カテゴリの他サービスも同時に不調なら、回線・DNS側の要因も切り分け候補になります。",
      },
    ],
  },

  // 8) PayPay
  paypay: {
    humanSummary:
      "PayPayは「アプリ起動／残高表示」と「決済処理」が分かれ、支払いだけ失敗する形が多いです。",

    whatItMeansIfDown:
      "このページが「オフライン」でも、PayPay側の障害と断定はできません。回線状態や一時的な通信失敗で到達できない場合があります。「オンライン」でも、決済・チャージ・残高反映など特定機能だけ不安定なことがあります。",

    whatToCheckNext: [
      "残高画面は開くが、支払い（コード決済／オンライン決済）だけ失敗していないか確認します。",
      "チャージや残高反映が遅れるなど、反映遅延の形になっていないか確認します。",
      "加盟店側の端末／ネットワーク要因で症状が見える場合もあり、サービス全体とは別に起きることがあります。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式告知があれば、決済・チャージ等どの機能に影響があるか確認できます。",
        "このページは到達性の目安で、加盟店端末や個別認証の問題は別途切り分けが必要です。",
      ],
      linksNote:
        "決済系は影響範囲が機能単位で出ることがあります。該当する公式案内を優先してください。",
    },

    usefulWhen: [
      "PayPayの外形到達性を確認したいとき",
      "障害っぽい体感時に、まず“全体が落ちているか”の目安を取りたいとき",
    ],

    notUsefulWhen: [
      "特定店舗の端末・通信環境に依存する決済失敗",
      "本人確認／認証／カード登録などアカウント要因",
    ],

    serviceSpecific: {
      commonPatterns: [
        "残高は見えるが、支払い（決済処理）だけ失敗する",
        "チャージや残高反映が遅れる（反映遅延）",
        "加盟店側の端末／ネットワーク要因で、店舗限定で失敗することがある",
      ],
      tendsToBreakFirst: ["決済処理", "チャージ／反映", "本人確認／認証"],
      siteUpButFeatureBrokenExamples: [
        "アプリは開くが、支払いだけ失敗する",
        "チャージはできたが反映が遅い",
        "特定店舗だけ決済が通らない",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/payments_finance",
        label: "決済・金融の一覧",
        reason:
          "同カテゴリの他サービスも併せて見ると、サービス側か周辺（回線・店舗側等）かの切り分け材料になります。",
      },
    ],
  },

  // 9) メルカリ
  mercari: {
    humanSummary:
      "メルカリは「閲覧／検索」と「購入／支払い／取引メッセージ」が分かれ、取引フローだけ止まることがあります。",

    whatItMeansIfDown:
      "このページが「オフライン」でも、メルカリ側障害とは限りません。回線や一時的な通信失敗で到達できない場合があります。「オンライン」でも、購入手続きや支払いなど部分的な不具合が残ることがあります。",

    whatToCheckNext: [
      "検索・閲覧はできるが、購入確定や支払いだけ失敗していないか確認します。",
      "取引メッセージ／通知だけ遅延するなど、コミュニケーション機能に偏っていないか確認します。",
      "出品（写真アップロード）だけ遅いなど、メディア処理で症状が出ていないか確認します。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式案内があれば、取引・支払い・通知など影響範囲の把握に役立ちます。",
        "このページは到達性の目安で、取引条件や本人確認など個別要因は別途切り分けが必要です。",
      ],
      linksNote:
        "取引・決済は影響が機能単位で出ることがあります。該当する公式案内を優先してください。",
    },

    usefulWhen: [
      "メルカリに到達できるかをまず確認したいとき",
      "複数端末／回線で同様の症状が出ており、全体要因かを見たいとき",
    ],

    notUsefulWhen: [
      "特定取引・特定商品・利用制限など条件依存",
      "本人確認／支払い手段／アカウント停止など個別要因",
    ],

    serviceSpecific: {
      commonPatterns: [
        "検索・閲覧はできるが、購入確定や支払いだけ失敗する",
        "取引メッセージ／通知だけ遅延する",
        "出品（写真アップロード）だけ遅い／失敗する",
      ],
      tendsToBreakFirst: ["購入／支払い", "取引メッセージ", "出品アップロード"],
      siteUpButFeatureBrokenExamples: [
        "閲覧はできるが、購入確定だけ進まない",
        "取引メッセージだけ送れない",
        "出品写真だけアップロードできない",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/ecommerce_marketplace",
        label: "EC・通販の一覧",
        reason:
          "同カテゴリで複数サービスが同時に不安定なら、回線・DNSや決済周辺の影響も切り分け候補になります。",
      },
    ],
  },

  // 10) Nintendo
  nintendo: {
    humanSummary:
      "任天堂は「公式サイト表示」と「オンライン機能／ストア／認証」が分かれ、ゲーム側だけ不調になることがあります。",

    whatItMeansIfDown:
      "このページが「オフライン」でも、任天堂側の全体停止とは限りません。回線や一時的な通信失敗で到達できない場合があります。「オンライン」でも、オンラインプレイやeショップなど機能単位で問題が残ることがあります。",

    whatToCheckNext: [
      "公式サイトは開くが、eショップやオンライン認証だけ不安定になっていないか確認します。",
      "タイトル／機能（対戦、フレンド、課金）単位で影響が分かれていないか確認します。",
      "メンテナンス時間帯は、到達できても機能制限が入ることがあります。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式告知があれば、メンテナンスか障害か、影響範囲（eショップ／オンライン等）を把握しやすくなります。",
        "このページは到達性の目安で、特定タイトルのサーバー状態や家庭内回線品質は別途切り分けが必要です。",
      ],
      linksNote:
        "任天堂はオンラインサービスやeショップ等で告知先が分かれることがあります。該当する公式案内を優先してください。",
    },

    usefulWhen: [
      "公式側に到達できるかの目安を取りたいとき",
      "オンライン機能不調時に、まず全体到達性を確認したいとき",
    ],

    notUsefulWhen: [
      "特定ゲームタイトルのサーバー問題（任天堂全体ではない）",
      "Switch本体設定／回線品質／家庭内ネットワーク要因",
    ],

    serviceSpecific: {
      commonPatterns: [
        "公式サイトは開くが、eショップやオンライン認証だけ不安定になる",
        "タイトル／機能単位で影響が分かれる（対戦、フレンド、課金）",
        "メンテナンスにより到達はできても機能が制限される",
      ],
      tendsToBreakFirst: ["eショップ", "オンライン認証", "オンライン対戦"],
      siteUpButFeatureBrokenExamples: [
        "公式サイトは見えるが、eショップだけ開けない",
        "オンライン対戦だけ接続できない",
        "フレンド機能だけ不安定",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/gaming",
        label: "ゲーム・エンタメの一覧",
        reason:
          "同カテゴリ（PSN、Steam等）も併せて見ると、サービス側か回線側かの切り分け材料になります。",
      },
    ],
  },

  // 11) Cloudflare
  cloudflare: {
    humanSummary:
      "Cloudflareはダッシュボードが見えても、DNS／CDN／WAFなど一部機能だけに影響が出ることがあります。",

    whatItMeansIfDown:
      "Cloudflareが不調だと、Cloudflare配下の多数サイトが連鎖的に影響を受ける可能性があります。一方でこのページの結果は“当サイトからの到達性”なので、地域／経路差が出ることもあります。",

    whatToCheckNext: [
      "DNSだけ、またはCDNだけなど機能別に影響が出ていないか整理します。",
      "管理画面は見えるが、キャッシュ更新／ルール反映だけ遅い等、運用系で症状が出ることがあります。",
      "エッジ経路の問題は地域差が出やすく、回線や場所で到達性が揺れることがあります。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式ステータスで、影響がDNSなのかCDNなのか等の機能単位で確認できるため、切り分けに有用です。",
        "このページは到達性の目安で、特定ゾーン／特定機能に限定された影響は別途公式情報が必要です。",
      ],
      linksNote:
        "Cloudflareはコンポーネント（DNS/CDN/WAF等）ごとに影響表示が分かれるため、該当機能の公式ステータス確認が有用です。",
    },

    usefulWhen: [
      "Cloudflare自体への到達性の目安を取りたいとき",
      "多数サイトが同時に不調なときに、基盤要因の切り分け材料にしたいとき",
    ],

    notUsefulWhen: [
      "特定サイトの設定ミス・オリジン障害（Cloudflare全体ではない）",
      "Cloudflare配下でも“一部ゾーン／一部機能”だけの問題",
    ],

    serviceSpecific: {
      commonPatterns: [
        "DNSだけ、またはCDNだけなど“機能別”に障害が出る",
        "管理画面は見えるが、キャッシュ更新／ルール反映だけ遅い",
        "エッジ経路の問題は地域差が出やすく、到達性が揺れる",
      ],
      tendsToBreakFirst: ["DNS", "CDN/キャッシュ", "WAF/ルール反映"],
      siteUpButFeatureBrokenExamples: [
        "ダッシュボードは開くが、DNS更新だけ反映が遅い",
        "サイト表示はできるが、特定地域でだけ遅い／落ちる",
        "WAFルールの反映だけ遅い",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/cloud_devops",
        label: "クラウド・開発基盤の一覧",
        reason:
          "AWS/GitHub/Vercel等も同時に見比べると、広域障害か個別障害かの判断材料になります。",
      },
    ],
  },

  // 12) AWS
  aws: {
    humanSummary:
      "AWSはリージョン／サービス単位で影響が出るため、「AWS全体が落ちる」より「特定リージョンの特定サービスだけ」が一般的です。",

    whatItMeansIfDown:
      "このページの結果はAWS全体ではなく、指定URLへの到達性の目安です。「オンライン」でも、特定リージョンや特定サービス（EC2/S3/Lambda等）で障害が起きている可能性があります。",

    whatToCheckNext: [
      "利用しているリージョンに限定して影響が出ていないか整理します。",
      "コンソールは開くがAPIだけ遅い／失敗など、操作面と実処理が分かれていないか確認します。",
      "依存先（Route 53／CloudFront等）を含め、周辺サービスから連鎖していないか確認します。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式ステータスはリージョン／サービス単位の影響が確認でき、切り分けに必須です。",
        "このページは到達性の目安で、特定サービス内部の状態（API障害等）を直接示すものではありません。",
      ],
      linksNote:
        "AWSはリージョンごとに影響が分かれるため、該当リージョンの公式ステータス確認が重要です。",
    },

    usefulWhen: [
      "AWS関連で広域障害が疑われるときに、まず到達性の目安を取りたいとき",
      "同カテゴリの他基盤（Cloudflare等）と並べて切り分けしたいとき",
    ],

    notUsefulWhen: [
      "自分のアカウント／権限（IAM）／請求状態に起因する問題",
      "特定リージョン／特定サービスだけの内部状態（公式ステータスで確認が必要）",
    ],

    serviceSpecific: {
      commonPatterns: [
        "リージョン単位の障害で、利用リージョンにだけ影響が出る",
        "コンソールは開くが、APIだけ遅い／失敗する",
        "依存先（Route 53/CloudFront等）から連鎖して影響が出る",
      ],
      tendsToBreakFirst: ["特定リージョンの特定サービス", "API（操作と実処理の分離）", "依存サービス連鎖"],
      siteUpButFeatureBrokenExamples: [
        "コンソールは開くが、S3の操作だけ失敗する",
        "特定リージョンのLambdaだけエラーになる",
        "CloudFront経由だけ遅い／失敗する",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/cloud_devops",
        label: "クラウド・開発基盤の一覧",
        reason:
          "基盤系で複数サービスが同時に不調なら、単独障害か連鎖障害かの判断材料になります。",
      },
    ],
  },
};

export function getEditorialById(id: string): StatusEditorial | null {
  return EDITORIAL_BY_ID[id] ?? null;
}
