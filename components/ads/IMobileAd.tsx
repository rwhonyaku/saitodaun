"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbyimobile?: Array<Record<string, unknown>>;
  }
}

type IMobileSlot = "status_mid" | "notworking_mid";

const IMOBILE_SCRIPT_SRC = "https://imp-adedge.i-mobile.co.jp/script/v1/spot.js?20220104";

const SLOT_CONFIG: Record<
  IMobileSlot,
  {
    elementId: string;
    asid: number;
  }
> = {
  status_mid: {
    elementId: "im-cac2a55f32ff4d2aa98bc477354f5d74",
    asid: 1930211,
  },
  notworking_mid: {
    elementId: "im-90c293b90fdf4f5ebc16a503533f26b1",
    asid: 1930212,
  },
};

type Props = {
  slot: IMobileSlot;
};

function ensureIMobileScript() {
  if (document.querySelector('script[data-imobile-spot-loader="true"]')) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = IMOBILE_SCRIPT_SRC;
  script.dataset.imobileSpotLoader = "true";
  document.body.appendChild(script);
}

export default function IMobileAd({ slot }: Props) {
  const { elementId, asid } = SLOT_CONFIG[slot];

  useEffect(() => {
    try {
      ensureIMobileScript();
      window.adsbyimobile = window.adsbyimobile || [];
      window.adsbyimobile.push({
        pid: 84875,
        mid: 592630,
        asid,
        type: "banner",
        display: "inline",
        elementid: elementId,
      });
    } catch {
      // Fail silently so blocked ad scripts never affect page rendering.
    }
  }, [asid, elementId]);

  return (
    <aside className="my-8 flex justify-center" aria-label="広告">
      <div className="w-full max-w-[336px]">
        <p className="mb-2 text-center text-xs text-neutral-500">広告</p>
        <div className="mx-auto min-h-[250px] w-full max-w-[336px] rounded-lg bg-neutral-50">
          <div
            id={elementId}
            className="mx-auto min-h-[250px] min-w-[300px]"
            style={{ maxWidth: "336px" }}
          />
        </div>
      </div>
    </aside>
  );
}
