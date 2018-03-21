export function checkSVGSupport(): boolean {
  return typeof SVGRect !== 'undefined';
}
