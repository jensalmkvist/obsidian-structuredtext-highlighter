import { Decoration, DecorationSet, EditorView, PluginValue, ViewUpdate } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";
import loadPrismWithST from "loadPrismWithST";

export default class StructuredTextHighlight implements PluginValue {
  decorations: DecorationSet;
  prism: any;

  constructor(view: EditorView) {
    this.decorations = Decoration.none;
    this.loadPrism().then(() => {
      this.decorations = this.buildDecorations(view);
      view.update([]);
    });
  }

  update(update: ViewUpdate): void {
    if (update.viewportChanged || update.docChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }

  async loadPrism() {
    this.prism = await loadPrismWithST();
  }

  buildDecorations(view: EditorView): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();

    if (!this.prism) {
      return Decoration.none;
    }

    const text = view.state.doc.toString();
    const regex = /```structuredtext(?:[\s\S]*?)([\s\S]*?)\n```/gi;

    let match;
    while ((match = regex.exec(text)) !== null) {
      const codeBlock = match[1];
      const highlighted = this.prism.highlight(codeBlock, this.prism.languages.structuredtext, "structuredtext");

      const blockStart = match.index + match[0].indexOf(match[1]);
      this.applyHighlighting(highlighted, blockStart, builder);
    }

    return builder.finish();
  }

  applyHighlighting(highlighted: string, blockStart: number, builder: RangeSetBuilder<Decoration>) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(highlighted, "text/html");
    const tempEl = doc.body;

    let currentIndex = blockStart;
    const ranges: { start: number; end: number; className: string }[] = [];

    const traverse = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        currentIndex += text.length;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const className = element.className;

        const start = currentIndex;
        element.childNodes.forEach((child) => traverse(child));
        const end = currentIndex + 1;

        if (className && end > start) {
          ranges.push({ start, end, className });
        }
      }
    };

    tempEl.childNodes.forEach((child) => traverse(child));

    ranges.sort((a, b) => a.start - b.start);

    for (const range of ranges) {
      builder.add(range.start, range.end, Decoration.mark({ class: range.className }));
    }
  }
}

