"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";

type AffiliateLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "onClick"
> & {
  href: string;
  product: string;
  placement: string;
  children: ReactNode;
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters: Record<string, string | number>
    ) => void;
  }
}

export default function AffiliateLink({
  href,
  product,
  placement,
  children,
  rel,
  target = "_blank",
  ...props
}: AffiliateLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    if (!link || typeof IntersectionObserver === "undefined") {
      return;
    }

    let hasTrackedView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTrackedView) {
          return;
        }

        hasTrackedView = true;
        window.gtag?.("event", "affiliate_offer_view", {
          affiliate_product: product,
          affiliate_placement: placement,
          source_path: window.location.pathname,
          visible_ratio: Math.round(entry.intersectionRatio * 100),
        });
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(link);
    return () => observer.disconnect();
  }, [placement, product]);

  const handleClick = () => {
    window.gtag?.("event", "affiliate_click", {
      affiliate_product: product,
      affiliate_placement: placement,
      source_path: window.location.pathname,
      link_url: href,
    });
  };

  return (
    <a
      {...props}
      ref={linkRef}
      href={href}
      target={target}
      rel={rel ?? "noopener noreferrer nofollow sponsored"}
      data-affiliate-product={product}
      data-affiliate-placement={placement}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
