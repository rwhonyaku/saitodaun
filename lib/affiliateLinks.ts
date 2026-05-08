export const AFFILIATE_LINKS = {
  conoha: {
    name: "ConoHa WING",
    // Replace the URL below with your Moshimo link once approved
    url: "https://www.conoha.jp/wing/", 
    isPlaceholder: true
  },
  xserver: {
    name: "エックスサーバー",
    url: "https://www.xserver.ne.jp/",
    isPlaceholder: true
  },
  millenvpn: {
    name: "MillenVPN",
    url: "https://millenvpn.jp/",
    isPlaceholder: true
  },
  nordvpn: {
    name: "NordVPN",
    url: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=145604&url_id=880",
    isPlaceholder: false
  },
  surfshark: {
    name: "Surfshark",
    url:
      process.env.NEXT_PUBLIC_SURFSHARK_AFFILIATE_URL ||
      "https://get.surfshark.net/aff_c?offer_id=926&aff_id=46200",
    isPlaceholder: false
  },
  expressvpn: {
    name: "ExpressVPN",
    url:
      process.env.NEXT_PUBLIC_EXPRESSVPN_AFFILIATE_URL ||
      "https://go.expressvpn.com/c/4281306/1697959/16063",
    isPlaceholder: false
  }
};
