export class InlineSVGConfig {
  baseUrl?: string;
  clientOnly?: boolean;
  bypassHttpClientInterceptorChain?: boolean;
}

export const enum SVGScriptEvalMode {
  ALWAYS = 'always',
  ONCE = 'once',
  NEVER = 'never'
}
