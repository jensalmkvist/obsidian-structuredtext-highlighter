Prism.languages.structuredtext = {
  'comment': {
    pattern: /\(\*[\s\S]*?\*\)/,
    greedy: true
  },
  'keyword': /\b(IF|THEN|ELSE|END_IF|FOR|TO|DO|END_FOR|WHILE|END_WHILE|CASE|OF|END_CASE)\b/,
  'boolean': /\b(TRUE|FALSE)\b/,
  'operator': /\b(AND|OR|NOT|XOR)\b|:=|<>|<=|>=|<|>/,
  'number': /\b\d+(\.\d+)?\b/,
  'punctuation': /[();,]/,
  'identifier': /\b[A-Za-z_][A-Za-z0-9_]*\b/
};
