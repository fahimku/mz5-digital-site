"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { PageLoadingScreen } from "@/components/layout/PageLoadingScreen";

const MIN_VISIBLE_MS = 350;

function isInternalNavigation(href: string, origin: string, pathname: string) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  try {
    const url = new URL(href, origin);
    if (url.origin !== origin) return false;
    if (url.pathname === pathname && !url.hash) return false;
    if (url.pathname === pathname && url.hash) return false;
    return true;
  } catch {
    return false;
  }
}

export function NavigationLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const pathnameRef = useRef(pathname);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownAtRef = useRef(0);

  const finishLoading = useCallback(() => {
    const elapsed = Date.now() - shownAtRef.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    hideTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      hideTimerRef.current = null;
    }, remaining);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      if (
        isInternalNavigation(href, window.location.origin, pathnameRef.current)
      ) {
        shownAtRef.current = Date.now();
        setIsLoading(true);
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (pathname === pathnameRef.current) return;

    pathnameRef.current = pathname;

    if (!isLoading) {
      shownAtRef.current = Date.now();
      setIsLoading(true);
    }

    finishLoading();

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [pathname, isLoading, finishLoading]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? <PageLoadingScreen key="page-loader" /> : null}
    </AnimatePresence>
  );
}
