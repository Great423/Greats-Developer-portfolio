import { useEffect } from "react";

const SITE = "Onyenokwe Great Chukwuka";
const DEFAULT_TITLE = `${SITE} | Electrical & Electronics Engineer and Lead Frontend Developer`;

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : DEFAULT_TITLE;
  }, [title]);
}
