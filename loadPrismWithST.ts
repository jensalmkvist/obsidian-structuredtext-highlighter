import { loadPrism } from "obsidian";

const applyPrismST = (Prism: any) => {
  Prism.languages.structuredtext = Prism.languages.extend('clike', {
    keyword: /\b(IF|THEN|ELSE|END_IF|FOR|TO|DO|END_FOR|WHILE|END_WHILE|CASE|OF|END_CASE|TYPE|END_TYPE|STRUCT|END_STRUCT|BOOL|INT|REAL)\b/,
    boolean: /\b(TRUE|FALSE)\b/,
    operator: /\b(AND|OR|NOT|XOR)\b|:=|<>|<=|>=|<|>/,
    number: /\b\d+(\.\d+)?\b/,
    punctuation: /[();,]/,
    identifier: /\b[A-Za-z_][A-Za-z0-9_]*\b/
  });

  Prism.hooks.add('wrap', (env: {
    type: string, attributes: { [x: string]: any };
    content: string
  }) => {
    if (env.type === 'entity') {
      env.attributes['title'] = env.content.replace(/&amp;/, '&');
    }
  });


};

const loadPrismWithST = async () => {
  try {
    const Prism = await loadPrism();
    applyPrismST(Prism);
    return Prism;
  } catch (error) {
    console.error("Failed to load Prism:", error);
    throw error;
  }
};


export default loadPrismWithST;
