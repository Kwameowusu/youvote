import { useCallback, useEffect, useState } from 'react'

export const useStickyNavbar = (viewOverlay?: boolean) => {

  const [showani, setshowani] = useState<boolean | null>(null);
  const [prevScrollpos, setprevScrollpos] = useState<number>(0);

  // Show BottomNav on scroll
  const BottomNavScroll = useCallback(() => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      setshowani(true);
    } else {
      if (window.pageYOffset < 3) return;
      setshowani(false);
    }
    setprevScrollpos(currentScrollPos);
  }, [prevScrollpos]);

  // Hide BottomNav on scroll
  useEffect(() => {
    setprevScrollpos(window.pageYOffset);
    window.addEventListener("scroll", BottomNavScroll);
    return () => {
      window.removeEventListener("scroll", BottomNavScroll);
    };
  }, [BottomNavScroll]);


  // Prevent scrolling when overlay is open


  useEffect(() => {

    const body = document.querySelector("body");
    if (viewOverlay) {
      body!.style.overflow = "hidden";
      body!.style.pointerEvents = 'none'
    }
    if (!viewOverlay) {
      body!.style.overflow = "initial";
      body!.style.pointerEvents = 'auto'
    }
  }, [viewOverlay]);

  return {
    showani
  }
}
