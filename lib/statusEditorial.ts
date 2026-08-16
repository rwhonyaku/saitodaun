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
        "公式の障害告知は、影響範囲（どの機能が対象か）や復旧状況（作業中／復旧済み）を確認できるため、確認に有用です。",
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
          "Yahoo! 以外の特定URLでも同様に到達できないか確認することで、サービス固有か環境要因かの確認に使えます。",
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
          "閲覧はできてもカート／注文確定のみ不安定、という確認に役立ちます。",
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
        "公式のステータス告知は、影響範囲（どの機能が対象か）と復旧状況を確認でき、確認に役立ちます。",
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
          "同カテゴリで複数サービスが同時に不安定なら、個別障害ではなく回線・DNS側の影響も確認候補になります。",
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
          "EC系で複数サービスが同時に不調なら、回線・DNS側や周辺（決済など）の影響も確認候補になります。",
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
      "“購入できない”体感の前に、まず到達性を確認したいとき",
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
          "同カテゴリで複数サービスが同時に不調なら、回線・DNS・周辺（決済）側の影響も確認候補になります。",
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
          "同カテゴリで複数サービスが同時に不調なら、回線・DNS側の影響も確認候補になります。",
      },
    ],
  },

  // 5) X（旧Twitter）
  twitter: {
    humanSummary:
      "X（旧Twitter）は、まず「今広く落ちているか」を見て、そのうえで投稿・通知・DMなどの部分不具合か、自分の環境要因かを分けて考えるのが早いサービスです。",

    whatItMeansIfDown:
      "このページは X（旧Twitter） に外から到達できるかを見るためのものです。ここで広く落ちているように見えるなら全体障害の可能性があり、逆に広く落ちていないなら自分の回線・端末・アプリ・ログイン状態の確認が優先です。",

    whatToCheckNext: [
      "広く落ちていないのに使えないなら、/services/x/not-working で自分側の確認に進みます。",
      "タイムラインは表示されるが、投稿・通知・DMだけ不安定なら部分不具合として見ます。",
      "Wi-Fiとモバイル回線で差があるなら、サービス全体より回線・端末側を優先します。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "公式の障害案内があれば、投稿・DM等の影響範囲が確認できます。",
        "このページは到達性の目安で、アカウント制限や機能内部の不具合は別途確認が必要です。",
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
        label: "X（旧Twitter）が使えないときの確認",
        reason:
          "広く落ちていないのに自分だけ使えない場合は、こちらでアプリ・ログイン・回線・端末側を確認した方が早いです。",
      },
      {
        href: "/status/category/social_messaging",
        label: "SNS・メッセージの一覧",
        reason:
          "同カテゴリで複数サービスが同時に不調なら、端末／回線側の要因も確認候補になります。",
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
          "同カテゴリのサービスも同時に不調なら、回線・DNS側の要因も確認候補になります。",
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
        "このページは到達性の目安で、特定動画の制限や端末側の再生環境は別途確認が必要です。",
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
          "同カテゴリの他サービスも同時に不調なら、回線・DNS側の要因も確認候補になります。",
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
        "このページは到達性の目安で、加盟店端末や個別認証の問題は別途確認が必要です。",
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
          "同カテゴリの他サービスも併せて見ると、サービス側か周辺（回線・店舗側等）かの確認材料になります。",
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
        "このページは到達性の目安で、取引条件や本人確認など個別要因は別途確認が必要です。",
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
          "同カテゴリで複数サービスが同時に不安定なら、回線・DNSや決済周辺の影響も確認候補になります。",
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
        "このページは到達性の目安で、特定タイトルのサーバー状態や家庭内回線品質は別途確認が必要です。",
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
          "同カテゴリ（PSN、Steam等）も併せて見ると、サービス側か回線側かの確認材料になります。",
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
        "公式ステータスで、影響がDNSなのかCDNなのか等の機能単位で確認できるため、確認に有用です。",
        "このページは到達性の目安で、特定ゾーン／特定機能に限定された影響は別途公式情報が必要です。",
      ],
      linksNote:
        "Cloudflareはコンポーネント（DNS/CDN/WAF等）ごとに影響表示が分かれるため、該当機能の公式ステータス確認が有用です。",
    },

    usefulWhen: [
      "Cloudflare自体への到達性の目安を取りたいとき",
      "多数サイトが同時に不調なときに、基盤要因の確認材料にしたいとき",
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

  // 12) Jira
  jira: {
    humanSummary:
      "Jiraは全体が開かない障害だけでなく、課題更新、コメント、通知、検索、添付、ログインだけが不安定になることがあります。",

    whatItMeansIfDown:
      "このページの結果はJiraへの到達性の目安です。「オンライン」でも、課題は見えるが更新できない、コメントだけ失敗する、通知だけ遅い、検索だけ返らないといった部分的な不具合は残ります。",

    whatToCheckNext: [
      "閲覧、課題更新、コメント、通知、検索、添付、ログインのどこで止まっているかを確認します。",
      "会社アカウント、SSO、Atlassian Access、プロジェクト権限、社内VPN、プロキシの影響範囲を確認します。",
      "Confluenceや他のSaaSも同時に不安定なら、Jira単体ではなくAtlassian側や社内ネットワーク側の広い影響として見ます。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "Jiraは課題表示、更新、通知、検索、添付、連携など機能ごとに影響が分かれるため、Atlassian公式情報で対象範囲を確認することが有用です。",
        "このページは到達性の目安なので、プロジェクト権限、ワークフロー設定、組織SSO、個別ブラウザセッションの問題までは直接判定できません。",
      ],
      linksNote:
        "閲覧はできるが更新だけ失敗する、通知だけ来ない、ログインだけ失敗する場合は、公式ステータスと組織管理者側の案内を合わせて確認すると状況を見分けやすくなります。",
    },

    usefulWhen: [
      "Jiraが広く不安定か、まず外形的な状況を確認したいとき",
      "課題更新、コメント、通知、検索、ログインのどこに影響が出ているかを整理したいとき",
      "自分の会社アカウントやプロジェクトだけの問題か、Atlassian側の障害かを確認したいとき",
    ],

    notUsefulWhen: [
      "特定プロジェクトの権限、ワークフロー、画面設定、フィールド設定に起因する問題",
      "特定ユーザーのアカウント停止、ライセンス、グループ権限に起因する問題",
      "社内VPN、プロキシ、ファイアウォールだけで起きている接続制限",
    ],

    serviceSpecific: {
      commonPatterns: [
        "課題一覧は開くが、更新や保存だけ失敗する",
        "コメントや添付ファイルだけ反映されない",
        "通知や検索だけ遅く、閲覧自体はできる",
      ],
      tendsToBreakFirst: ["課題更新", "コメント／添付", "通知", "検索", "ログイン／SSO"],
      siteUpButFeatureBrokenExamples: [
        "Jiraは開くが、ステータス変更だけ保存できない",
        "課題は見えるが、コメント投稿だけ失敗する",
        "検索結果だけ返らず、直接URLの課題は開ける",
      ],
    },

    internalLinks: [
      {
        href: "/services/jira/not-working",
        label: "Jiraが使えないときの確認",
        reason:
          "広く障害が出ていない場合は、更新・通知・ログイン・会社ネットワーク別に自分側の原因を確認できます。",
      },
      {
        href: "/troubleshooting/cant-log-in",
        label: "ログインできないときの確認",
        reason:
          "SSO、Atlassian Access、認証ループが疑われる場合は、ログイン症状から原因を確認できます。",
      },
      {
        href: "/troubleshooting/website-blocked",
        label: "サイトがブロックされているときの確認",
        reason:
          "会社VPNや社内Wi-FiでだけJiraが失敗する場合は、ファイアウォールやアクセス制限も確認対象になります。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/confluence",
        label: "Confluence",
        note:
          "Atlassian系サービスが同時に不安定なら、Jira単体ではない影響を比較できます。",
      },
      {
        href: "/status/sites/slack",
        label: "Slack",
        note:
          "通知連携や業務チャットも同時に不安定なら、社内ネットワークや広域障害の確認材料になります。",
      },
      {
        href: "/status/category/productivity_saas",
        label: "業務・SaaSの一覧",
        note:
          "複数の業務ツールを並べて見ると、個別障害か会社側環境かを確認しやすくなります。",
      },
    ],
  },

  // 13) Outlook
  outlook: {
    humanSummary:
      "Outlookは全体が開かない障害だけでなく、メール送信だけ失敗する、受信だけ遅い、予定表だけ同期しない、ログインだけ失敗する形で出ることがあります。",

    whatItMeansIfDown:
      "このページの結果はOutlookへの到達性の目安です。「オンライン」でも、メール送受信、予定表、添付ファイル、検索、ログイン認証など一部機能だけ不安定な場合があります。",

    whatToCheckNext: [
      "送信、受信、予定表、添付ファイル、検索、ログインのどこで止まっているかを確認します。",
      "会社アカウント、SSO、多要素認証、条件付きアクセス、社内VPN、プロキシの影響範囲を確認します。",
      "TeamsやMicrosoft 365全体も同時に不安定なら、Outlook単体ではなくMicrosoft側の広い影響として見ます。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "Outlookはメール、予定表、認証、添付ファイルなど機能ごとに影響が分かれることがあるため、公式情報で対象範囲を確認することが有用です。",
        "このページは到達性の目安なので、会社テナント固有のポリシー、メールボックス容量、端末アプリのキャッシュ不整合までは直接判定できません。",
      ],
      linksNote:
        "送信だけ失敗する、受信だけ遅い、予定表だけ同期しない場合は、Microsoft 365全体の状態と会社側の案内を合わせて確認すると状況を見分けやすくなります。",
    },

    usefulWhen: [
      "Outlookが広く不安定か、まず外形的な状況を確認したいとき",
      "送信、受信、予定表、ログインのどこに影響が出ているかを整理したいとき",
      "自分の会社アカウントやアプリだけの問題か、Microsoft側の障害かを確認したいとき",
    ],

    notUsefulWhen: [
      "特定メールボックスの容量、ルール、迷惑メール設定、送信制限など個別設定に起因する問題",
      "Outlookアプリだけのキャッシュ、プロファイル破損、端末同期設定の問題",
      "社内VPN、プロキシ、ファイアウォールだけで起きている接続制限",
    ],

    serviceSpecific: {
      commonPatterns: [
        "Outlookは開くが、送信だけ失敗する",
        "受信や同期だけ遅く、既存メールの閲覧はできる",
        "予定表や会議招待だけ反映されない",
      ],
      tendsToBreakFirst: ["メール送信", "受信／同期", "ログイン／認証", "予定表", "添付ファイル"],
      siteUpButFeatureBrokenExamples: [
        "Web版は開くが、デスクトップアプリだけ同期しない",
        "メール一覧は見えるが、新規送信だけエラーになる",
        "予定表は開くが、会議招待だけ反映されない",
      ],
    },

    internalLinks: [
      {
        href: "/services/outlook/not-working",
        label: "Outlookが使えないときの確認",
        reason:
          "広く障害が出ていない場合は、送受信・ログイン・アプリ別に自分側の原因を確認できます。",
      },
      {
        href: "/services/microsoft365/not-working",
        label: "Microsoft 365が使えないときの確認",
        reason:
          "TeamsやOneDriveも同時に不安定なら、Outlook単体ではなくMicrosoft 365全体の影響を確認できます。",
      },
      {
        href: "/troubleshooting/cant-log-in",
        label: "ログインできないときの確認",
        reason:
          "SSO、MFA、条件付きアクセス、認証ループが疑われる場合は、ログイン症状から原因を確認できます。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/microsoft-365",
        label: "Microsoft 365",
        note:
          "Outlook以外のMicrosoft 365機能も不安定な場合、全体の影響を確認できます。",
      },
      {
        href: "/status/sites/teams",
        label: "Microsoft Teams",
        note:
          "予定表や会議招待とTeams会議が同時に不安定な場合、Teams側の状態も比較できます。",
      },
      {
        href: "/status/category/productivity_saas",
        label: "業務・SaaSの一覧",
        note:
          "SlackやNotionなど他の業務ツールも同時に不安定なら、社内ネットワークや広域障害の確認材料になります。",
      },
    ],
  },

  // 14) Microsoft 365
  "microsoft-365": {
    humanSummary:
      "Microsoft 365は、全体障害だけでなく、Outlookだけ送受信できない、Teamsだけ不安定、OneDriveだけ同期しない、ログインだけ失敗する形で出ることがあります。",

    whatItMeansIfDown:
      "このページの結果はMicrosoft 365への到達性の目安です。「オンライン」でも、Outlook、Teams、OneDrive、Office Web、認証まわりなど一部機能だけ不安定な場合があります。",

    whatToCheckNext: [
      "Outlook、Teams、OneDrive、Office Web、ログイン認証のどこで止まっているかを確認します。",
      "会社アカウント、SSO、多要素認証、条件付きアクセス、社内VPN、プロキシの影響範囲を確認します。",
      "Outlookだけ、Teamsだけの症状なら、Microsoft 365全体ではなく個別サービス側の確認にも進みます。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "Microsoft 365はサービス単位で影響範囲が分かれるため、公式情報でOutlook、Teams、認証など対象コンポーネントを確認することが有用です。",
        "このページは到達性の目安なので、会社テナント固有のポリシー、MFA、権限、端末アプリの不調までは直接判定できません。",
      ],
      linksNote:
        "ログインだけ失敗する、OutlookやTeamsだけ不安定な場合は、Microsoft 365全体の状態と会社側の案内を合わせて確認すると状況を見分けやすくなります。",
    },

    usefulWhen: [
      "Microsoft 365が広く不安定か、まず外形的な状況を確認したいとき",
      "Outlook、Teams、OneDrive、ログインのどこに影響が出ているかを整理したいとき",
      "自分の会社アカウントや社内ネットワークだけの問題か、Microsoft側の障害かを確認したいとき",
    ],

    notUsefulWhen: [
      "特定テナントの管理者制限、ライセンス、条件付きアクセスなど組織内設定に起因する問題",
      "OutlookアプリやTeamsアプリだけのキャッシュ・端末権限・アプリ更新問題",
      "社内VPN、プロキシ、ファイアウォールだけで起きている接続制限",
    ],

    serviceSpecific: {
      commonPatterns: [
        "Microsoft 365トップは開くが、Outlookの送受信だけ失敗する",
        "Outlookは使えるが、Teamsの会議やチャットだけ不安定になる",
        "ログインやMFAだけ止まり、アプリ本体には進めない",
      ],
      tendsToBreakFirst: ["ログイン／認証", "Outlook送受信", "Teams会議／チャット", "OneDrive同期"],
      siteUpButFeatureBrokenExamples: [
        "Office Webは開くが、Outlookだけ送信できない",
        "Teamsは開くが、会議参加やチャット送信だけ失敗する",
        "OneDriveだけ同期が止まり、他のMicrosoft 365機能は使える",
      ],
    },

    internalLinks: [
      {
        href: "/services/microsoft365/not-working",
        label: "Microsoft 365が使えないときの確認",
        reason:
          "広く障害が出ていない場合は、ログイン・Outlook・Teams・社内ネットワーク別に自分側の原因を確認できます。",
      },
      {
        href: "/services/outlook/not-working",
        label: "Outlookが使えないときの確認",
        reason:
          "メール送受信やOutlookだけの症状なら、Microsoft 365全体ではなくOutlook側の確認が有効です。",
      },
      {
        href: "/services/teams/not-working",
        label: "Teamsが使えないときの確認",
        reason:
          "会議・チャット・ログインだけの症状なら、Teams側の原因を確認できます。",
      },
      {
        href: "/troubleshooting/cant-log-in",
        label: "ログインできないときの確認",
        reason:
          "SSO、MFA、条件付きアクセス、認証ループが疑われる場合は、ログイン症状から原因を確認できます。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/microsoft-365",
        label: "Outlook",
        note:
          "メール送受信や予定表だけ不安定な場合、Outlook側の状態を比較できます。",
      },
      {
        href: "/status/sites/teams",
        label: "Microsoft Teams",
        note:
          "会議やチャットだけ不安定な場合、Teams側の状態を確認できます。",
      },
      {
        href: "/status/category/productivity_saas",
        label: "業務・SaaSの一覧",
        note:
          "SlackやNotionなど他の業務ツールも同時に不安定なら、社内ネットワークや広域障害の確認材料になります。",
      },
    ],
  },

  // 15) Notion
  notion: {
    humanSummary:
      "Notionは全体が落ちるだけでなく、特定ページ、データベース、同期、検索、ログインだけが不安定になることがあります。",

    whatItMeansIfDown:
      "このページの結果はNotionへの到達性の目安です。「オンライン」でも、ワークスペースは開くが特定ページだけ重い、データベースだけ表示されない、同期だけ止まる、ログインだけ失敗するといった部分的な不具合は残ります。",

    whatToCheckNext: [
      "ワークスペース全体、特定ページ、データベース、検索、同期、ログインのどこで止まっているかを確認します。",
      "会社アカウント、SSO、ワークスペース権限、社内VPN、プロキシ、ファイアウォールの影響範囲を確認します。",
      "SlackやTeamsなど他の業務ツールも同時に不安定なら、Notion単体ではなく社内ネットワークや広域障害の可能性も見ます。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "Notionはページ表示、同期、検索、AI、ログインなど機能ごとに影響が分かれることがあるため、公式情報で対象範囲を確認することが有用です。",
        "このページは到達性の目安なので、ワークスペース権限、共有設定、特定ページの重さ、端末側アプリ不具合までは直接判定できません。",
      ],
      linksNote:
        "特定ページだけ重い、同期だけ止まる、ログインだけ失敗する場合は、公式ステータスとワークスペース管理者側の案内を合わせて確認すると状況を見分けやすくなります。",
    },

    usefulWhen: [
      "Notionが広く不安定か、まず外形的な状況を確認したいとき",
      "開かない、重い、同期できない、ログインできないなど症状の範囲を整理したいとき",
      "自分のワークスペースや会社ネットワークだけの問題か、Notion側の障害かを確認したいとき",
    ],

    notUsefulWhen: [
      "特定ページの権限、共有設定、データベースフィルターなどワークスペース内設定に起因する問題",
      "ページ内コンテンツが重い、埋め込みが壊れているなど個別ページだけの問題",
      "社内VPN、プロキシ、ファイアウォールだけで起きている接続制限",
    ],

    serviceSpecific: {
      commonPatterns: [
        "ワークスペースは開くが、特定ページやデータベースだけ重い",
        "編集はできるが、同期や検索だけ遅れる",
        "ブラウザ版は使えるが、デスクトップアプリだけ同期しない",
      ],
      tendsToBreakFirst: ["ページ読み込み", "データベース表示", "同期", "検索", "ログイン／SSO"],
      siteUpButFeatureBrokenExamples: [
        "トップは開くが、特定ページだけ読み込み続ける",
        "データベースは見えるが、フィルターや検索だけ反応しない",
        "アプリ版だけ古い内容のまま同期されない",
      ],
    },

    internalLinks: [
      {
        href: "/services/notion/not-working",
        label: "Notionが使えないときの確認",
        reason:
          "広く障害が出ていない場合は、ページ・同期・ログイン・アプリ別に自分側の原因を確認できます。",
      },
      {
        href: "/troubleshooting/cant-log-in",
        label: "ログインできないときの確認",
        reason:
          "SSO、ワークスペース参加、認証ループが疑われる場合は、ログイン症状から原因を確認できます。",
      },
      {
        href: "/troubleshooting/website-blocked",
        label: "サイトがブロックされているときの確認",
        reason:
          "会社VPNや社内Wi-FiでだけNotionが失敗する場合は、ファイアウォールやアクセス制限も確認対象になります。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/slack",
        label: "Slack",
        note:
          "ワークスペース系SaaSが同時に不安定なら、社内ネットワークや広域障害の確認材料になります。",
      },
      {
        href: "/status/sites/teams",
        label: "Microsoft Teams",
        note:
          "業務チャットや会議も同時に不安定なら、Notion単体ではない影響を比較できます。",
      },
      {
        href: "/status/category/productivity_saas",
        label: "業務・SaaSの一覧",
        note:
          "複数の業務ツールを並べて見ると、個別障害か会社側環境かを確認しやすくなります。",
      },
    ],
  },

  // 16) Slack
  slack: {
    humanSummary:
      "Slackは全体が開かない障害だけでなく、メッセージ送信、通知、検索、ワークスペース切り替え、ログインだけが不安定になることがあります。",

    whatItMeansIfDown:
      "このページの結果はSlackへの到達性の目安です。「オンライン」でも、メッセージだけ送れない、通知だけ来ない、検索だけ遅い、ワークスペース切り替えだけ失敗するといった部分的な不具合は残ります。",

    whatToCheckNext: [
      "メッセージ送信、通知、検索、ワークスペース切り替え、ログインのどこで止まっているかを確認します。",
      "会社アカウント、SSO、社内VPN、プロキシ、ファイアウォールの影響範囲を確認します。",
      "TeamsやNotionなど他の業務ツールも同時に不安定なら、Slack単体ではなく社内ネットワークや広域障害の可能性も見ます。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "Slackはメッセージ、通知、ファイル、検索、ログインなど機能ごとに影響が分かれるため、公式情報で対象範囲を確認することが有用です。",
        "このページは到達性の目安なので、通知設定、ワークスペース権限、組織SSO、端末側アプリ不具合までは直接判定できません。",
      ],
      linksNote:
        "送信だけ失敗する、通知だけ来ない、ワークスペースだけ入れない場合は、公式ステータスと会社側の案内を合わせて確認すると状況を見分けやすくなります。",
    },

    usefulWhen: [
      "Slackが広く不安定か、まず外形的な状況を確認したいとき",
      "送れない、通知が来ない、ログインできないなど症状の範囲を整理したいとき",
      "自分の端末や会社ネットワークだけの問題か、Slack側の障害かを確認したいとき",
    ],

    notUsefulWhen: [
      "特定ワークスペースの権限、チャンネル参加権限、アカウント停止など個別設定に起因する問題",
      "OS通知設定、集中モード、省電力、アプリ権限など端末側だけの問題",
      "社内VPN、プロキシ、ファイアウォールだけで起きている接続制限",
    ],

    serviceSpecific: {
      commonPatterns: [
        "画面は開くが、メッセージ送信だけ失敗する",
        "メッセージは見えるが、通知だけ届かない／遅れる",
        "特定ワークスペースへの切り替えやログインだけ失敗する",
      ],
      tendsToBreakFirst: ["メッセージ送信", "通知", "検索", "ワークスペース切り替え", "ログイン／SSO"],
      siteUpButFeatureBrokenExamples: [
        "Slackは開くが、新規メッセージだけ送れない",
        "投稿は見えるが、通知だけ来ない",
        "ブラウザ版は使えるが、デスクトップアプリだけ同期しない",
      ],
    },

    internalLinks: [
      {
        href: "/services/slack/not-working",
        label: "Slackが使えないときの確認",
        reason:
          "広く障害が出ていない場合は、送信・通知・ログイン・アプリ別に自分側の原因を確認できます。",
      },
      {
        href: "/troubleshooting/cant-log-in",
        label: "ログインできないときの確認",
        reason:
          "SSO、ワークスペース参加、認証ループが疑われる場合は、ログイン症状から原因を確認できます。",
      },
      {
        href: "/troubleshooting/website-blocked",
        label: "サイトがブロックされているときの確認",
        reason:
          "会社VPNや社内Wi-FiでだけSlackが失敗する場合は、ファイアウォールやアクセス制限も確認対象になります。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/teams",
        label: "Microsoft Teams",
        note:
          "チャットや会議系ツールが同時に不安定なら、社内ネットワークや広域障害の確認材料になります。",
      },
      {
        href: "/status/sites/notion",
        label: "Notion",
        note:
          "ワークスペース系SaaSが同時に重い場合、Slack単体ではない影響を比較できます。",
      },
      {
        href: "/status/category/productivity_saas",
        label: "業務・SaaSの一覧",
        note:
          "複数の業務ツールを並べて見ると、個別障害か会社側環境かを確認しやすくなります。",
      },
    ],
  },

  // 17) Microsoft Teams
  teams: {
    humanSummary:
      "Microsoft Teamsは、サービス全体の障害だけでなく、会議だけ入れない、チャットだけ送れない、ログインだけ失敗するなど部分的な不具合として出ることがあります。",

    whatItMeansIfDown:
      "このページの結果はMicrosoft Teamsへの到達性の目安です。「オンライン」でも、会議参加、通話、チャット送信、予定表、ログイン認証など一部機能だけ不安定な場合があります。",

    whatToCheckNext: [
      "会議、チャット、通話、予定表、ログインのどこで止まっているかを確認します。",
      "会社アカウント、SSO、条件付きアクセス、社内VPN、ファイアウォールの影響範囲を確認します。",
      "OutlookやMicrosoft 365全体も同時に不安定なら、Teams単体ではなくMicrosoft側の広い影響として見ます。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "Teamsは会議・チャット・認証など機能ごとに影響が分かれるため、公式情報で対象範囲を確認することが有用です。",
        "このページは到達性の目安なので、組織ポリシー、端末権限、社内ネットワーク制限までは直接判定できません。",
      ],
      linksNote:
        "会議だけ入れない、チャットだけ送れない、ログインだけ失敗する場合は、Microsoft 365全体の状態と会社側の案内も合わせて確認すると状況を見分けやすくなります。",
    },

    usefulWhen: [
      "Teamsが広く不安定か、まず外形的な状況を確認したいとき",
      "会議・チャット・ログインのどれが止まっているかを整理したいとき",
      "自分の組織や端末だけの問題か、Microsoft側の障害かを確認したいとき",
    ],

    notUsefulWhen: [
      "会議URL、招待権限、組織ポリシーなど特定テナント内の設定に起因する問題",
      "マイク・カメラ・スピーカーなど端末権限や周辺機器だけの問題",
      "社内VPN、プロキシ、ファイアウォールだけで起きている接続制限",
    ],

    serviceSpecific: {
      commonPatterns: [
        "チャットや予定表は開くが、会議だけ参加できない",
        "画面は開くが、チャット送信や通知だけ遅れる",
        "Microsoft 365には入れるが、Teamsだけログインや同期で止まる",
      ],
      tendsToBreakFirst: ["会議参加／通話", "チャット送信", "ログイン／SSO", "通知／同期"],
      siteUpButFeatureBrokenExamples: [
        "Teamsは開くが、会議参加ボタンの後で止まる",
        "チャット一覧は見えるが、新規メッセージだけ送れない",
        "ブラウザ版は使えるが、デスクトップアプリだけログインを繰り返す",
      ],
    },

    internalLinks: [
      {
        href: "/services/teams/not-working",
        label: "Teamsが使えないときの確認",
        reason:
          "広く障害が出ていない場合は、会議・チャット・ログイン別に自分側の原因を確認できます。",
      },
      {
        href: "/services/microsoft365/not-working",
        label: "Microsoft 365が使えないときの確認",
        reason:
          "OutlookやOneDriveも同時に不安定なら、Teams単体ではなくMicrosoft 365全体の影響を確認できます。",
      },
      {
        href: "/troubleshooting/cant-log-in",
        label: "ログインできないときの確認",
        reason:
          "SSO、条件付きアクセス、認証ループが疑われる場合は、ログイン症状から原因を確認できます。",
      },
      {
        href: "/troubleshooting/website-blocked",
        label: "サイトがブロックされているときの確認",
        reason:
          "会社VPNや社内Wi-Fiでだけ失敗する場合は、ファイアウォールやアクセス制限も確認対象になります。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/microsoft-365",
        label: "Microsoft 365",
        note:
          "TeamsだけでなくOutlookやOneDriveも不安定な場合、Microsoft 365全体の影響を確認できます。",
      },
      {
        href: "/status/sites/microsoft-365",
        label: "Outlook",
        note:
          "会議招待や予定表、メール通知も同時に不安定なら、Outlook側の状態も比較できます。",
      },
      {
        href: "/status/category/productivity_saas",
        label: "業務・SaaSの一覧",
        note:
          "SlackやZoomなど他の業務ツールも不安定なら、社内ネットワークや広域障害の確認材料になります。",
      },
    ],
  },

  // 18) Udemy Business
  "udemy-business": {
    humanSummary:
      "Udemy Businessは、サービス全体の障害だけでなく、SSO、会社アカウント、社内ネットワーク、動画配信だけの不調として出ることがあります。",

    whatItMeansIfDown:
      "このページの結果はUdemy Businessトップへの到達性の目安です。「オンライン」でも、ログインだけ失敗する、SSOで止まる、コース一覧だけ開かない、動画だけ再生できないといった部分的な不具合は残ります。",

    whatToCheckNext: [
      "ログイン前に開けないのか、ログイン後のコース一覧や動画だけ不安定なのかを確認します。",
      "会社アカウント、SSO、多要素認証、社内VPN、プロキシ、ファイアウォールの影響範囲を確認します。",
      "個人向けUdemyや他の学習サービスも同時に不安定なら、動画配信・DNS・ネットワーク側の影響も疑います。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "Udemy Businessは組織ごとの認証設定やSSOの影響を受けるため、全体障害と会社側の認証問題を分けて確認する必要があります。",
        "このページは到達性の目安なので、会社アカウント固有の権限、SSO設定、受講割り当ての問題は直接判定できません。",
      ],
      linksNote:
        "ログインや視聴だけ失敗する場合は、Udemyのサポート情報に加えて、社内のIT管理者側の案内も確認すると状況を見分けやすくなります。",
    },

    usefulWhen: [
      "Udemy Businessが広く開けない、または社内で複数人が同時に使えないとき",
      "SSO、ログイン、コース一覧、動画再生のどこで止まっているかを最初に整理したいとき",
      "会社側の認証やネットワーク環境の問題か、Udemy側の障害かを確認したいとき",
    ],

    notUsefulWhen: [
      "受講権限、ライセンス割り当て、コース公開範囲など組織内設定に起因する問題",
      "自社SSO、社内VPN、プロキシ、ファイアウォールだけで起きている接続制限",
      "特定コースだけ非公開、期限切れ、地域制限など個別コンテンツに起因する問題",
    ],

    serviceSpecific: {
      commonPatterns: [
        "サイトは開くが、SSOや会社アカウントのログインだけ失敗する",
        "コース一覧は出るが、動画だけ読み込めない／再生開始で止まる",
        "個人向けUdemyは使えるが、Udemy Businessの組織ログインだけ不安定になる",
      ],
      tendsToBreakFirst: ["SSO／会社アカウント認証", "動画再生", "コース一覧／検索", "社内ネットワーク経由の接続"],
      siteUpButFeatureBrokenExamples: [
        "トップは開くが、SSOログイン後に戻される",
        "コースページは開くが、動画だけ再生できない",
        "自宅回線では見れるが、会社VPN経由だけ失敗する",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/education_exam",
        label: "教育・試験サービスの一覧",
        reason:
          "Udemy以外の学習サービスも同時に不安定なら、動画配信やネットワーク側の影響を確認しやすくなります。",
      },
      {
        href: "/troubleshooting/cant-log-in",
        label: "ログインできないときの確認",
        reason:
          "SSO、認証ループ、アカウント制限が疑われる場合は、ログイン症状から原因を確認できます。",
      },
      {
        href: "/troubleshooting-dns",
        label: "DNS・接続エラーの確認",
        reason:
          "会社ネットワークやVPN経由だけ開けない場合、DNSや接続経路の問題も確認対象になります。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/udemy",
        label: "Udemy",
        note:
          "個人向けUdemyも同時に不安定なら、Udemy側または動画配信側の影響を確認できます。",
      },
      {
        href: "/status/sites/coursera",
        label: "Coursera",
        note:
          "学習サービス全般で動画やログインが不安定なら、回線・DNS・動画配信側の影響も比較できます。",
      },
    ],
  },

  // 19) GitHub
  github: {
    humanSummary:
      "GitHubはサイト全体が落ちるより、push、Actions、Packages、API、ログインなど一部機能だけ不安定になることが多いサービスです。",

    whatItMeansIfDown:
      "このページの結果はGitHubトップへの到達性の目安です。「オンライン」でも、pushだけ失敗する、Actionsだけ遅い、APIだけ不安定、ログインだけできないといった部分的な障害は残ります。",

    whatToCheckNext: [
      "リポジトリ閲覧、push/pull、Actions、API、ログインのどこで止まっているかを確認します。",
      "会社ネットワーク、VPN、プロキシ、SSO利用環境では、自分の組織側だけ失敗していないかも確認します。",
      "GitHub以外の開発基盤も同時に不安定なら、クラウド・DNS・CDN側の広域影響も疑います。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "GitHubの公式ステータスは、Git Operations、Actions、API、Packagesなど機能別の影響を確認できます。",
        "このページは到達性の目安なので、特定機能だけの障害や復旧済みの遅延とはずれる場合があります。",
      ],
      linksNote:
        "pushやActionsだけ失敗する場合は、公式ステータスで該当コンポーネントの状態を見るのが有用です。",
    },

    usefulWhen: [
      "GitHub全体にアクセスしづらい、または広い障害が疑われるとき",
      "push、Actions、ログイン、APIの不調がGitHub側か自分の環境かを最初に確認したいとき",
      "開発基盤の複数サービスと並べて、広域障害か個別障害かを見たいとき",
    ],

    notUsefulWhen: [
      "特定リポジトリの権限、branch protection、token権限に起因する問題",
      "自社SSO、社内VPN、プロキシ、ファイアウォールだけで起きている接続制限",
      "ワークフロー定義やrunner設定など、個別リポジトリ内のActions設定ミス",
    ],

    serviceSpecific: {
      commonPatterns: [
        "Web画面は開くが、push/pullなどGit操作だけ失敗する",
        "リポジトリ閲覧はできるが、Actionsの起動やログ表示だけ遅い",
        "APIやPackagesだけ不安定で、Web UIは通常どおり見える",
      ],
      tendsToBreakFirst: ["Git Operations", "Actions", "API/Packages", "ログイン／認証"],
      siteUpButFeatureBrokenExamples: [
        "リポジトリは見えるが、pushだけ rejected になる",
        "Actionsの一覧は見えるが、job開始やログ表示だけ止まる",
        "Webは開くが、API連携やCLI操作だけ失敗する",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/cloud_devops",
        label: "クラウド・開発基盤の一覧",
        reason:
          "GitHub、AWS、Cloudflare、Vercelなどを並べて見ると、個別障害か基盤側の広域影響かを確認しやすくなります。",
      },
      {
        href: "/troubleshooting-dns",
        label: "DNS・接続エラーの確認",
        reason:
          "GitHub以外のサイトも名前解決や接続で失敗する場合は、DNSやネットワーク側の確認が先です。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/aws",
        label: "AWS",
        note:
          "Actionsや外部連携の失敗が、依存先クラウド側の不調と重なっていないか確認できます。",
      },
      {
        href: "/status/sites/cloudflare",
        label: "Cloudflare",
        note:
          "複数の開発サービスで表示や接続が揺れる場合、CDNやDNS側の影響も比較できます。",
      },
      {
        href: "/status/sites/vercel",
        label: "Vercel",
        note:
          "GitHub連携のデプロイだけ失敗する時、GitHub側かVercel側かを見比べる材料になります。",
      },
    ],
  },

  // 20) Vercel
  vercel: {
    humanSummary:
      "Vercelはサイト表示が正常でも、ビルド、デプロイ、Git連携、Edge Functions、管理画面だけが不安定になることがあります。",

    whatItMeansIfDown:
      "このページの結果はVercel本体への到達性の目安です。オンラインでも、特定リージョン、ビルドキュー、デプロイ反映、Functions、管理画面、GitHub連携など一部だけに影響が出る場合があります。",

    whatToCheckNext: [
      "既存サイトの表示だけか、新規デプロイ、プレビュー、管理画面、Functions/APIまで影響しているかを確認します。",
      "GitHub連携のデプロイだけ失敗する場合は、Vercel側だけでなくGitHub側の障害や権限変更も確認します。",
      "特定のページだけ502/504になる場合は、Vercel全体障害ではなく、Functions、外部API、DNS、環境変数、直近デプロイの問題も候補になります。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "Vercelの公式ステータスは、Builds、Deployments、Edge Network、Functions、Dashboardなど機能別の影響を確認できます。",
        "このページは到達性の目安なので、デプロイだけ失敗する、管理画面だけ遅い、特定リージョンだけ不安定といった部分障害とはずれる場合があります。",
      ],
      linksNote:
        "既存サイト表示、ビルド、デプロイ、Functions、Dashboardのどこに影響が出ているかを公式ステータスのコンポーネントと見比べると確認しやすくなります。",
    },

    usefulWhen: [
      "Vercelの管理画面や公式サイト自体にアクセスしづらいとき",
      "デプロイ、ビルド、プレビュー、Functionsの不調がVercel側か自分のプロジェクト側か確認したいとき",
      "GitHub、AWS、Cloudflareなど周辺基盤と並べて、広域障害か個別障害かを確認したいとき",
    ],

    notUsefulWhen: [
      "特定プロジェクトのビルドエラー、環境変数不足、依存関係エラー、設定ミスが原因のとき",
      "独自ドメインのDNS設定、SSL証明書、CNAME/Aレコードだけに問題があるとき",
      "GitHub権限、リポジトリ連携、Organization権限など、Vercel以外の認証・権限が原因のとき",
    ],

    serviceSpecific: {
      commonPatterns: [
        "既存サイトは表示されるが、新しいデプロイだけ進まない",
        "Dashboardは開くが、Build LogsやDeploymentsの表示だけ遅い",
        "一部のEdge FunctionsやAPI Routesだけ502/504になる",
        "GitHub連携のプレビューだけ作成されない、または反映が遅い",
      ],
      tendsToBreakFirst: ["Builds/Deployments", "Dashboard", "Edge Functions/API Routes", "Git連携"],
      siteUpButFeatureBrokenExamples: [
        "本番サイトは見えるが、Preview Deploymentだけ作成されない",
        "Dashboardは開くが、ログ表示やデプロイ履歴だけ読み込めない",
        "静的ページは見えるが、API Routesだけ502または504になる",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/cloud_devops",
        label: "クラウド・開発基盤の一覧",
        reason:
          "GitHub、AWS、Cloudflare、Vercelなどを並べて確認すると、Vercel単体か周辺基盤の影響かを見分けやすくなります。",
      },
      {
        href: "/troubleshooting-dns",
        label: "DNS・接続エラーの確認",
        reason:
          "独自ドメインや一部環境だけでVercelサイトが開かない場合は、DNS設定や名前解決の確認が先です。",
      },
      {
        href: "/errors/502-bad-gateway",
        label: "502 Bad Gateway",
        reason:
          "Functionsや外部API連携だけが失敗する場合は、Vercel全体ではなく上流応答の問題として確認できます。",
      },
      {
        href: "/errors/504-gateway-timeout",
        label: "504 Gateway Timeout",
        reason:
          "API RoutesやServerless Functionsが待ち時間切れになる場合の確認先になります。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/github",
        label: "GitHub",
        note:
          "Git連携やPreview Deploymentだけ失敗する場合、Vercel側かGitHub側かを確認できます。",
      },
      {
        href: "/status/sites/cloudflare",
        label: "Cloudflare",
        note:
          "DNS、CDN、WAF、独自ドメイン経由だけの不調がある場合に比較できます。",
      },
      {
        href: "/status/sites/aws",
        label: "AWS",
        note:
          "周辺クラウド基盤の広域影響が疑われるときに確認できます。",
      },
      {
        href: "/status/sites/netlify",
        label: "Netlify",
        note:
          "ホスティング/CDN系で複数サービスが揺れているか比較できます。",
      },
    ],
  },

  // 21) Netlify
  netlify: {
    humanSummary:
      "Netlifyはサイト表示が正常でも、Deploys、Builds、Functions、Forms、Identity、管理画面だけが不安定になることがあります。",

    whatItMeansIfDown:
      "このページの結果はNetlify本体への到達性の目安です。オンラインでも、既存サイトは見えるが新しいデプロイだけ進まない、フォーム送信だけ失敗する、Functionsだけ502/504になるといった部分的な影響は残ります。",

    whatToCheckNext: [
      "既存サイト表示、Deploys、Builds、Functions、Forms、Identity、管理画面のどこで止まっているかを確認します。",
      "Git連携のデプロイだけ失敗する場合は、Netlify側だけでなくGitHub側の障害や権限変更も確認します。",
      "独自ドメインだけ開かない場合は、Netlify全体ではなくDNS、SSL、CNAME、ネームサーバー設定を先に確認します。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "Netlifyの公式ステータスは、Deploys、Builds、Functions、Forms、Identity、CDNなど機能別の影響を確認できます。",
        "このページは到達性の目安なので、サイト表示は正常でもデプロイ、フォーム、Functionsだけ不安定な部分障害とはずれる場合があります。",
      ],
      linksNote:
        "表示、デプロイ、フォーム送信、Functions、管理画面のどこに影響が出ているかを公式ステータスのコンポーネントと見比べると確認しやすくなります。",
    },

    usefulWhen: [
      "Netlifyの管理画面や公式サイト自体にアクセスしづらいとき",
      "デプロイ、ビルド、フォーム送信、Functionsの不調がNetlify側か自分のサイト側か確認したいとき",
      "Vercel、GitHub、Cloudflareなど周辺基盤と並べて、広域障害か個別障害かを確認したいとき",
    ],

    notUsefulWhen: [
      "特定サイトのビルドエラー、依存関係エラー、環境変数不足、設定ミスが原因のとき",
      "フォーム名、spam設定、reCAPTCHA、Identity設定など特定サイト内の機能設定が原因のとき",
      "独自ドメインのDNS、SSL証明書、CNAME、ネームサーバーだけに問題があるとき",
    ],

    serviceSpecific: {
      commonPatterns: [
        "既存サイトは表示されるが、新しいDeployだけ進まない",
        "管理画面は開くが、Build LogsやDeploy履歴だけ読み込めない",
        "静的ページは見えるが、Functionsだけ502/504になる",
        "サイトは開くが、FormsやIdentityだけ送信・ログインに失敗する",
      ],
      tendsToBreakFirst: ["Deploys/Builds", "Functions", "Forms/Identity", "CDN/独自ドメイン"],
      siteUpButFeatureBrokenExamples: [
        "本番サイトは見えるが、Deploy Previewだけ作成されない",
        "ページは開くが、フォーム送信だけ失敗する",
        "静的ページは正常だが、Functions経由のAPIだけタイムアウトする",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/cloud_devops",
        label: "クラウド・開発基盤の一覧",
        reason:
          "Netlify、Vercel、GitHub、Cloudflareを並べて確認すると、単体障害か周辺基盤の影響かを見分けやすくなります。",
      },
      {
        href: "/troubleshooting-dns",
        label: "DNS・接続エラーの確認",
        reason:
          "独自ドメインや一部環境だけでNetlifyサイトが開かない場合は、DNS設定や名前解決の確認が先です。",
      },
      {
        href: "/errors/502-bad-gateway",
        label: "502 Bad Gateway",
        reason:
          "Functionsや外部API連携だけが失敗する場合は、上流応答の問題として確認できます。",
      },
      {
        href: "/errors/504-gateway-timeout",
        label: "504 Gateway Timeout",
        reason:
          "Functionsや外部APIが待ち時間切れになる場合の確認先になります。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/vercel",
        label: "Vercel",
        note:
          "ホスティング/CDN系で複数サービスが揺れているか比較できます。",
      },
      {
        href: "/status/sites/github",
        label: "GitHub",
        note:
          "Git連携のDeployだけ失敗する場合、Netlify側かGitHub側かを確認できます。",
      },
      {
        href: "/status/sites/cloudflare",
        label: "Cloudflare",
        note:
          "DNS、CDN、WAF、独自ドメイン経由だけの不調がある場合に比較できます。",
      },
      {
        href: "/status/sites/aws",
        label: "AWS",
        note:
          "周辺クラウド基盤の広域影響が疑われるときに確認できます。",
      },
    ],
  },

  // 22) Microsoft Azure
  azure: {
    humanSummary:
      "Microsoft Azureは全体停止より、特定リージョン、サブスクリプション、Azure Portal、認証、個別サービスだけに影響が出ることが多い基盤です。",

    whatItMeansIfDown:
      "このページの結果はAzure公式サイトへの到達性の目安です。オンラインでも、Azure Portalだけ遅い、特定リージョンのApp Serviceだけ失敗する、StorageやFunctionsだけ不安定、Entra ID認証だけ通らないといった部分的な障害は残ります。",

    whatToCheckNext: [
      "Azure Portal、ARM/API、対象リージョン、対象サービス、Entra ID認証のどこに影響が出ているかを確認します。",
      "自分のサブスクリプション、リソースグループ、リージョンだけの問題か、Azure側の広い影響かを確認します。",
      "Microsoft 365やTeamsも同時にログインできない場合は、Azure単体ではなくMicrosoft側の認証・基盤影響も候補になります。",
    ],

    officialConfirmation: {
      whyItMatters: [
        "Azureの公式ステータスは、リージョンとサービス単位で影響を確認できるため、Portal表示だけでは分からない範囲を見られます。",
        "このページは到達性の目安なので、特定サブスクリプション、特定リージョン、個別リソースの障害までは直接判定できません。",
      ],
      linksNote:
        "Portal、ARM/API、Entra ID、App Service、Functions、Storageなど、影響が出ているコンポーネントを公式ステータスと見比べると確認しやすくなります。",
    },

    usefulWhen: [
      "Azure Portalや公式サイト自体にアクセスしづらいとき",
      "特定リージョンや特定サービスの不調がAzure側か自分の構成側か確認したいとき",
      "AWS、Google Cloud、Microsoft 365など周辺基盤と並べて、広域障害か個別障害かを確認したいとき",
    ],

    notUsefulWhen: [
      "特定リソースの設定、SKU制限、クォータ、権限、課金状態が原因のとき",
      "自分のアプリ、Functions、App Service、Storage接続文字列、環境変数だけに問題があるとき",
      "社内ネットワーク、VPN、プロキシ、ファイアウォールだけでAzure PortalやAPIが遮断されているとき",
    ],

    serviceSpecific: {
      commonPatterns: [
        "Portalは開くが、特定リソースの一覧やメトリクスだけ読み込めない",
        "ARM/API操作だけ失敗し、既存アプリの表示は続いている",
        "特定リージョンのApp Service、Functions、Storageだけ不安定になる",
        "Microsoft 365やTeamsと同時に、Entra IDログインだけ失敗する",
      ],
      tendsToBreakFirst: ["Azure Portal", "ARM/API", "Entra ID認証", "App Service/Functions", "Storage/Networking"],
      siteUpButFeatureBrokenExamples: [
        "Portalは開くが、デプロイや設定変更だけ反映されない",
        "アプリは表示されるが、Functions経由のAPIだけ502/504になる",
        "一部リージョンのStorageだけ遅く、別リージョンは正常に見える",
      ],
    },

    internalLinks: [
      {
        href: "/status/category/cloud_devops",
        label: "クラウド・開発基盤の一覧",
        reason:
          "Azure、AWS、Google Cloud、Cloudflareなどを並べて確認すると、単体障害か周辺基盤の影響かを見分けやすくなります。",
      },
      {
        href: "/troubleshooting-dns",
        label: "DNS・接続エラーの確認",
        reason:
          "独自ドメインや一部環境だけでAzure上のサイトが開かない場合は、DNSや名前解決の確認が先です。",
      },
      {
        href: "/errors/502-bad-gateway",
        label: "502 Bad Gateway",
        reason:
          "App ServiceやFunctionsの背後で上流応答が失敗している場合の確認先になります。",
      },
      {
        href: "/errors/504-gateway-timeout",
        label: "504 Gateway Timeout",
        reason:
          "Functions、API、外部依存先が待ち時間切れになる場合の確認先になります。",
      },
    ],

    relatedServices: [
      {
        href: "/status/sites/microsoft-365",
        label: "Microsoft 365",
        note:
          "認証やMicrosoft側基盤の影響が広い場合、Microsoft 365側にも症状が出ることがあります。",
      },
      {
        href: "/status/sites/teams",
        label: "Microsoft Teams",
        note:
          "会議やログインも同時に不安定なら、Microsoft側の認証・基盤影響を比較できます。",
      },
      {
        href: "/status/sites/aws",
        label: "AWS",
        note:
          "クラウド基盤全体で複数サービスが揺れているか比較できます。",
      },
      {
        href: "/status/sites/gcp",
        label: "Google Cloud",
        note:
          "他クラウド基盤との比較で、個別障害か広域ネットワーク影響かを確認できます。",
      },
    ],
  },

  // 23) AWS
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
        "公式ステータスはリージョン／サービス単位の影響が確認でき、確認に必須です。",
        "このページは到達性の目安で、特定サービス内部の状態（API障害等）を直接示すものではありません。",
      ],
      linksNote:
        "AWSはリージョンごとに影響が分かれるため、該当リージョンの公式ステータス確認が重要です。",
    },

    usefulWhen: [
      "AWS関連で広域障害が疑われるときに、まず到達性の目安を取りたいとき",
      "同カテゴリの他基盤（Cloudflare等）と並べて確認したいとき",
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
