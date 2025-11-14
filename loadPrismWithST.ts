import { loadPrism } from "obsidian";



const applyPrismST = (Prism: any) => {

  const controlKeywordGroups = {

    ifStatementKeywords: ['IF', 'ELSIF', 'ELSE', 'THEN', 'END_IF'],
    caseStatementKeywords: ['CASE', 'OF', 'END_CASE'],
    forStateMentKeywords: ['FOR', 'TO', 'BY', 'DO', 'END_FOR'],
    whileStatementKeywords: ['WHILE', 'DO', 'END_WHILE'],
    repeatStatmentKeywords: ['REPEAT', 'UNTIL', 'END_REPEAT'],
    continueKeyword: ['CONTINUE'],
    exitStatementKeywords: ['EXIT'],
    returnStatementKeywords: ['RETURN']
  };

  const typedKeywordGroups = {
    intKeywords: ['USINT', 'SINT', 'UINT', 'INT', 'UDINT', 'DINT', 'ULINT', 'LINTT'],
    floatKeywords: ['REAL', 'LREAL'],
    boolKeywords: ['BOOL'],
    stringKeywords: ['STRING', 'WSTRING'],
    binKeywords: ['BYTE', 'WORD', 'DWORD', 'LWORD'],
    timeKeywords: ['TIME', 'LTIME']
  };

  const declarationKeywords = {
    variables: ['VAR', 'VAR_INPUT', 'VAR_OUTPUT', 'VAR_IN_OUT', 'VAR_TEMP', 'VAR_CONSTANT', 'END_VAR'],
    types: ['TYPE', 'END_TYPE', 'STRUCT', 'END_STRUCT'],
    functions: ['FUNCTION', 'END_FUNCTION', 'FUNCTION_BLOCK', 'END_FUNCTION_BLOCK']
  };

  const allKeywords = [
    ...Object.values(controlKeywordGroups).flat(),
    ...Object.values(typedKeywordGroups).flat(),
    ...Object.values(declarationKeywords).flat()
  ];

  const keywordRegex = new RegExp(`\\b(${allKeywords.join('|')})(?=$|\\s|[^\\w])`);

  Prism.languages.structuredtext = Prism.languages.extend('clike', {


    keyword: keywordRegex,
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
