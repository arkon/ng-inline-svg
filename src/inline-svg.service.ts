import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { InlineSVGDirective } from './inline-svg.directive';

@Injectable()
export class InlineSVGService {
  private _renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  insertEl(
    dir: InlineSVGDirective,
    parentEl: HTMLElement,
    content: Element,
    replaceContents: boolean,
    prepend: boolean) {
    if (replaceContents && !prepend) {
      const parentNode = dir._prevSVG && dir._prevSVG.parentNode;
      if (parentNode) {
        this._renderer.removeChild(parentNode, dir._prevSVG);
      }

      parentEl.innerHTML = '';
    }

    if (prepend) {
      this._renderer.insertBefore(parentEl, content, parentEl.firstChild);
    } else {
      this._renderer.appendChild(parentEl, content);
    }

    if (content.nodeName === 'svg') {
      dir._prevSVG = content as SVGElement;
    }
  }
}
