# obsidian-structuredtext-highlighter
Provides syntax highlighting for the IEC 61131-3 Strucutured Text programming language.

This plugin is heavily based on the [obsidian-svelte-syntax-highlighter](https://github.com/typhoon-kim/obsidian-svelte-syntax-highlighter) by typhoon-kim. jit is basically just a rewrite from that code but with Structured Text tokens. If you enjoy this plugin, please feel free to extend any thanks or support to them and not me. Link to their Github [typhoon-kim](https://github.com/typhoon-kim)

## Installation
### Manual installation
Clone this repo or manually download the follwoing files:
- main.js
- manifest.json

Navigate to your Obsidian vault location. Then navigate to `.obsidian\plugins` and create a new folder. The name of the folder of the does not matter, but i recommend naming it *obsidian-structuredtext-highlighter* to keep things clear. Then paste the above mentioned files into this folder.

Open Obsidian and go to Settings -> Community Plugins. In the list below, there should now be a plugin called *Structured Text Highlighter*. Enable it and you are done.

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
