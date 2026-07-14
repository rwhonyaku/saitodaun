"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbyimobile?: Array<Record<string, unknown>>;
  }
}

type IMobileSlot = "status_mid" | "notworking_mid";

const IMOBILE_SCRIPT_SRC = "https://imp-adedge.i-mobile.co.jp/script/v1/spot.js?20220104";
const COLLAPSE_AFTER_MS = 4000;

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

function hasAdContent(element: HTMLElement | null) {
  if (!element) return false;

  const renderedAd = element.querySelector("iframe, img, a, ins, object, embed");
  if (renderedAd) return true;

  return element.childElementCount > 0 && element.textContent?.trim() !== "";
}

type AdState = "pending" | "loaded" | "collapsed";

export default function IMobileAd({ slot }: Props) {
  const { elementId, asid } = SLOT_CONFIG[slot];
  const adRef = useRef<HTMLDivElement | null>(null);
  const [adState, setAdState] = useState<AdState>("pending");

  useEffect(() => {
    let collapseTimer: number | undefined;
    let observer: MutationObserver | undefined;

    const markLoadedIfReady = () => {
      if (hasAdContent(adRef.current)) {
        setAdState("loaded");
        return true;
      }
      return false;
    };

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

      observer = new MutationObserver(() => {
        markLoadedIfReady();
      });

      if (adRef.current) {
        observer.observe(adRef.current, {
          childList: true,
          subtree: true,
          attributes: true,
        });
      }

      collapseTimer = window.setTimeout(() => {
        if (!markLoadedIfReady()) {
          setAdState("collapsed");
        }
      }, COLLAPSE_AFTER_MS);
    } catch {
      setAdState("collapsed");
    }

    return () => {
      if (collapseTimer) window.clearTimeout(collapseTimer);
      observer?.disconnect();
    };
  }, [asid, elementId]);

  const isLoaded = adState === "loaded";
  const isCollapsed = adState === "collapsed";

  return (
    <aside
      className={`flex justify-center transition-all duration-300 ${
        isCollapsed ? "my-2 min-h-0" : "my-8"
      }`}
      aria-label="広告"
    >
      <div
        className={`w-full max-w-[336px] overflow-hidden transition-all duration-300 ${
          isLoaded
            ? "min-h-[250px] opacity-100"
            : isCollapsed
            ? "max-h-2 opacity-0"
            : "min-h-[250px] opacity-100"
        }`}
      >
        {!isCollapsed ? (
          <p className="mb-2 text-center text-xs text-neutral-500">広告</p>
        ) : null}
        <div
          className={`mx-auto w-full max-w-[336px] rounded-lg bg-neutral-50 transition-all duration-300 ${
            isCollapsed ? "min-h-0" : "min-h-[250px]"
          }`}
        >
          <div
            id={elementId}
            ref={adRef}
            className={`mx-auto transition-all duration-300 ${
              isCollapsed ? "min-h-0 min-w-0" : "min-h-[250px] min-w-[300px]"
            }`}
            style={{ maxWidth: "336px" }}
          />
        </div>
      </div>
    </aside>
  );
};
