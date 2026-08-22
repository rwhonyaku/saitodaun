export const AFFILIATE_LINKS = {
  conoha: {
    name: "ConoHa WING",
    url: "https://af.moshimo.com/af/c/click?a_id=5400008&p_id=2312&pc_id=4967&pl_id=92340",
    impressionUrl:
      "https://i.moshimo.com/af/i/impression?a_id=5400008&p_id=2312&pc_id=4967&pl_id=92340",
    isPlaceholder: false,
  },
  nordvpn: {
    name: "NordVPN",
    url: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=145604&url_id=880",
    isPlaceholder: false,
  },
  surfshark: {
    name: "Surfshark",
    url:
      process.env.NEXT_PUBLIC_SURFSHARK_AFFILIATE_URL ||
      "https://get.surfshark.net/aff_c?offer_id=926&aff_id=46200",
    isPlaceholder: false,
  },
  expressvpn: {
    name: "ExpressVPN",
    url:
      process.env.NEXT_PUBLIC_EXPRESSVPN_AFFILIATE_URL ||
      "https://go.expressvpn.com/c/4281306/1697959/16063",
    isPlaceholder: false,
  },
};
