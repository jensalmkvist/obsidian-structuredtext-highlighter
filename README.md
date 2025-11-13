# obsidian-structuredtext-highlighter
Provides syntax highlighting for the IEC 61131-3 Strucutured Text programming language.

The main feature is a syntax highlighter for Structured Text (ST) to be used inside Obsidians code blocks.

## Installation
### Manual installation

### From inside Obsidian
Not supportet yet.

## Usage
With the plugin installed and enabled, usage is straightforward. Just specify ´structuredtext´ as the language for the code block. When exiting source mode and entering view mode, the syntax will be highlighted.

```structuredtext
IF condition1 OR condition2 THEN
    actuator := TRUE;
ELSE
    Actuator := FALSE;
END_IF;
```
