import { Plugin } from 'obsidian';
import loadPrismWithST from 'loadPrismWithST';
import StructuredTextHighlighter from 'structuredtextHighlighter';
import { ViewPlugin } from '@codemirror/view';

console.log("StructuredText plugin file loaded");
export default class StructuredTextSyntaxHighlighterPlugin extends Plugin {
  obsidianPrism: any;

  async onload() {
    console.log('Reached onload');
    try {
      console.log('Loading Structured Text Highlighter Plugin');
      this.obsidianPrism = await loadPrismWithST();
      console.log('prism loaded');

      this.registerMarkdownPostProcessor((el, ctx) => {
        el.querySelectorAll('pre > code.language-structuredtext').forEach((block) => {
          this.obsidianPrism.highlightElement(block);
        });
      });

      this.registerEditorExtension(
        ViewPlugin.fromClass(StructuredTextHighlighter, {
          decorations: (plugin) => plugin.decorations,
        })
      );

      this.app.workspace.updateOptions();
    } catch (error) {
      console.error('Failed to load Prism: ', error);
    }
  }

  onunload() {
    console.log('Unloading Structured Text Syntax Highlighter Plugin');

    if (this.obsidianPrism && this.obsidianPrism.languages.structuredtext) {
      delete this.obsidianPrism.languages.structuredtext;
    }
  }
}
