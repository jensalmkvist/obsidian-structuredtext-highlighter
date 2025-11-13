import { Plugin } from 'obsidian';
import Prism from 'prismjs'

Prism.languages.structuredtext = {
    'comment': {
        pattern: /\(\*[\s\S]*?\*\)/,
        greedy: true
    },
    'keyword': /\b(IF|THEN|ELSE|END_IF|FOR|TO|DO|END_FOR|WHILE|END_WHILE|CASE|OF|END_CASE|TYPE|END_TYPE|STRUCT|END_STRUCT|BOOL|INT|REAL)\b/,
    'boolean': /\b(TRUE|FALSE)\b/,
    'operator': /\b(AND|OR|NOT|XOR)\b|:=|<>|<=|>=|<|>/,
    'number': /\b\d+(\.\d+)?\b/,
    'punctuation': /[();,]/,
    'identifier': /\b[A-Za-z_][A-Za-z0-9_]*\b/
};

class StructuredTextHighlighter extends Plugin {
    async onload() {
        console.log('Structured Text Highlighter plugin loaded');

        this.registerMarkdownPostProcessor((element) => {
            element.querySelectorAll('pre code').forEach((block) => {
                // Apply highlighting using Prism
                Prism.highlightElement(block);
            });
        });

    }

    onunload() {
        console.log('Structured Text Highlighter plugin unloaded');
    }
}

module.exports = StructuredTextHighlighter;

