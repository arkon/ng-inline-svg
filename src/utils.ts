import { InlineSVGDirective } from './inline-svg.directive';

export function checkSVGSupport() {
  return typeof SVGRect !== 'undefined';
}

export function insertEl(
  dir: InlineSVGDirective, parentEl: HTMLElement, content: Element, replaceContents: boolean, prepend: boolean) {
  if (replaceContents && !prepend) {
    const parentNode = dir._prevSVG && dir._prevSVG.parentNode;
    if (parentNode) {
      parentNode.removeChild(dir._prevSVG);
    }

    parentEl.innerHTML = '';
  }

  if (prepend) {
    parentEl.insertBefore(content, parentEl.firstChild);
  } else {
    parentEl.appendChild(content);
  }

  if (content.nodeName === 'svg') {
    dir._prevSVG = content as SVGElement;
  }
}

/**
 * Detects whether or not we are running in a browser context or not.
 * From https://stackoverflow.com/a/31090240
 *
 * @return {boolean} Whether this is a browser or a server.
 */
export function isBrowser(): boolean {
  return new Function('try{return this===window;}catch(e){return false;}')();
}
