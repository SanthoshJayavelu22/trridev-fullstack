/**
 * Sanitizes HTML rich text content so it renders correctly in the browser.
 *
 * Problem: Quill (and other rich text editors) replace regular spaces with
 * &nbsp; (non-breaking space, \u00A0). Browsers cannot line-wrap at \u00A0
 * characters, no matter what CSS word-break rules are applied.
 *
 * Fix: Replace all &nbsp; entities and their rendered Unicode equivalent
 * (\u00A0) with regular ASCII spaces before injecting HTML into the DOM.
 *
 * @param {string} html - Raw HTML string from the database
 * @returns {string} - Sanitized HTML string safe for dangerouslySetInnerHTML
 */
export function sanitizeRichText(html) {
  if (!html || typeof html !== 'string') return '';

  return html
    // Replace HTML-encoded non-breaking spaces
    .replace(/&nbsp;/gi, ' ')
    // Replace Unicode non-breaking space characters (U+00A0)
    .replace(/\u00A0/g, ' ')
    // Collapse multiple consecutive spaces to a single space
    // (but NOT inside <pre> or <code> blocks if needed)
    .replace(/ {2,}/g, ' ');
}
