import React from "react";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";

// Computed at module-init time (server), never during Client Component render.
// suppressHydrationWarning on the <p> handles any locale-based SSR/client diff.
const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="flex w-full shrink-0 items-center justify-between border-t border-border px-4 py-6 md:px-6">
      <p className="text-xs text-gray-500 dark:text-gray-400" suppressHydrationWarning>
        © {CURRENT_YEAR} {config.author}. All rights reserved.
      </p>
      <SocialMediaButtons />
    </footer>
  );
}

export default Footer;
