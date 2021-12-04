---
title: The vscode setup 2021
date: "2021-12-04T16:43:56.113Z"
slug: the-vscode-setup-2021
author: Ryan Setiagi
git: https://github.com/masbossun/masbossun-next/blob/main/_posts/the-vscode-setup-2021.md
---

I want to share my personal vscode setup, this one is updated and it is different compare to the previous one that i wrote two years ago. Have been coding while use this setups for about a year now, and i feel so comfortable and have no complaints whatsoever. This setup includes vscode settings, keyboard shortcuts, and some of the extensions to help me code faster and efficient.

## Settings

For settings mostly inspired by [Dan Abramov](https://twitter.com/dan_abramov), i like his vscode settings in terms of simplicity to achieve a minimum distractions.

```json
{
  "window.menuBarVisibility": "toggle",
  "editor.cursorBlinking": "solid",
  "editor.minimap.enabled": false,
  "editor.fontFamily": "JetBrainsMono Nerd Font Mono",
  "editor.fontSize": 13,
  "editor.lineHeight": 22,
  "editor.fontWeight": "500",
  "editor.fontLigatures": true,
  "editor.formatOnSave": true,
  "editor.folding": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.hideCursorInOverviewRuler": true,
  "editor.lineNumbers": "off",
  "editor.matchBrackets": "never",
  "editor.occurrencesHighlight": false,
  "editor.overviewRulerBorder": false,
  "editor.renderLineHighlight": "none",
  "editor.padding.top": 20,
  "editor.padding.bottom": 20,
  "editor.tabSize": 8,
  "editor.cursorStyle": "line",
  "editor.insertSpaces": false,
  "editor.wordSeparators": "/\\()\"':,.;<>~!@#$%^&*|+=[]{}`?-",
  "editor.wordWrap": "off",
  "editor.suggestSelection": "first",
  "editor.scrollBeyondLastLine": false,
  "editor.guides.indentation": false,
  "workbench.editor.enablePreview": false,
  "workbench.colorTheme": "Base16 Tomorrow",
  "workbench.list.openMode": "doubleClick",
  "workbench.iconTheme": null,
  "workbench.editor.showIcons": false,
  "workbench.startupEditor": "newUntitledFile",
  "workbench.statusBar.visible": true,
  "workbench.activityBar.visible": false,
  "workbench.panel.defaultLocation": "right",
  "explorer.openEditors.visible": 0,
  "terminal.integrated.fontFamily": "JetBrainsMono Nerd Font Mono",
  "terminal.integrated.lineHeight": 1.2,
  "terminal.integrated.tabs.enabled": false,
  "breadcrumbs.enabled": false,
  "git.autofetch": true,
  "git.ignoreMissingGitWarning": true,
  "scm.diffDecorations": "overview",
  "search.exclude": {
    "**/node_modules": false
  },
  "vim.statusBarColorControl": false,
  "vim.easymotion": true,
  "vim.incsearch": true,
  "vim.useSystemClipboard": true,
  "vim.hlsearch": true,
  "vim.leader": "<space>",
  "vim.smartcase": true,
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["<esc><esc>"],
      "commands": [":noh"]
    }
  ],
  "todohighlight.keywords": [
    {
      "text": "HACK",
      "color": "#FFFFFF",
      "backgroundColor": "#872608"
    }
  ]
}
```

What i mean by simple is that this settings declutter visual distractions, i have no mini-map, no line numbers, no icons, no activity bar, no folding, and no match-brackets. One that i want to hide but can't is the statusbar because i need it to see the vim command and vim mode 😢.

I usually keep my vscode view separated horizontally, so i have more space to scroll vertically. On the first column is a sidebar, second column is code editor, and the third column is panel/terminal. So when i toggle show the terminal panel on the right and the side bar on the left, i have more space for code in the middle, no distraction from above or bottom, everything are align side-by-side horizontally.

<figure>
<img alt="me, viewing the previous vscode setup article inside vscode" src="/images/post/vscode-ryan.png" />
<figcaption>me, viewing the previous vscode setup article inside vscode</figcaption>
</figure>

## Keyboard Shortcuts

To modify or add a new shortcut, open shortcut settings via `cmd + shift + p` search for "Preferences: Open Keyboard Shortcuts" then press `enter`. One thing i like on the shortcut settings is a feature to search by key combination, it help me a lot to modify and find the correct shortcuts. On vscode shortcuts, we can assign one key combinations for multiple usage, based on the condition.

I am a keyboard person, i feel like my movement is more faster and more accurate if i move around using a keyboard shortcuts rather than a mouse.

### Activity window movements

As i mention earlier on the settings section, i have no activity bar, i hide it to make more room for side bar, code, and terminal panel. So how i manage to move between activity like file explorer, search, git, even to the extension activity ? the answer is shortcuts, and most of it is already defined on the default settings.

| Action                | Keyboard Shortcut |
| --------------------- | ----------------- |
| View: Show Explorer   | `cmd + shift + e`   |
| View: Show Git        | `cmd + shift + g`   |
| View: Show Search     | `cmd + shift + f`   |
| View: Show Extensions | `cmd + shift + x`   |
| Toggle Terminal       | `cmd + shift + a`   |
| Toggle Sidebar        | `cmd + b`           |
| Go to File...         | `cmd + p`           |
| Show all commands     | `cmd + shift + p`   |

### Editor movements

For editor shortcuts, i don't have that many favorites since i use vim keybinding (i will explain more about vim down below). But one of the vscode shortcuts i like is to open definition on the side. That shortcut is a like a treasure for me, i really like how fast it is to open the definition and compare it side by side right away just only using one keystroke which is `t`.

| Action                      | Keyboard Shortcut | Condition                                                                                     |
| --------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| Split Editor                | `cmd + \`           |                                                                                               |
| Open definition on the side | t                 | editorHasDefinitionProvider && editorTextFocus && !isInEmbeddedEditor && vim.mode == 'Normal' |

<figure>
<img alt="open definition to side" src="/images/post/shortcut-open-to-side.gif" />
<figcaption>open definition to side</figcaption>
</figure>

### Tabs movements

I don't like to have a lot of tabs/editor open, that is why my favorite tabs shortcut is close current editor which `cmd + w`. If i feel don't really need the file to be opened i never let it open and stay. If i need i can always use `cmd + p` again to search & open the file and close it if i'm done.

| Action             | Keyboard Shortcut |
| ------------------ | ----------------- |
| Close Tabs/Editor  | `cmd + w`           |
| Reopen Closed Tabs | `cmd + shift + t`   |

### Terminal movements

Same case like tabs, i don't keep my terminal open. I usually toggle terminal to show if i need, and toggle again to hide. One feature that i use the most is split terminal, since i mainly working on react native and need to open multiple terminal. Inside terminal/panel column, I do split the view vertically, to keep the visual different from code editor.

| Action         | Keyboard Shortcut | Condition                                 |
| -------------- | ----------------- | ----------------------------------------- |
| Split Terminal | `cmd + \`           | `terminalFocus && terminalProcessSupported` |

### Vim Keybindings

Vim is my daily text editor, i have been using it for 3 years and it's amazing, i love it's quick and simplicity. For most people it's a nightmare because of how hard it is to just exit from vim, but for me personally, be able to move, modify and select around texts or codes with vim is so much fun. I can't go back to the basic text editor just because how fun the vim is.

So, why i use vscode instead of a terminal with vim to code as a daily driver? the anwer is because i love the source control management in vscode. I do code review a lot, and seeing changes in the source control inside vscode help me identify code smell faster. Even when i code for my own self, i usually go back and forth from Explorer to Source control just because i do care about code changes a lot. Luckily, since vim is a popular technology, there is an extensions to run and use vim inside vscode editor, thanks to [vim by vscodevim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) ✨

Vim itself has it's own shortcut or keybinding, but these are some of my favorites. Before that, i want to share another things that i like from vim, which is how clever the key combinations were sets, it's like every key combinations have a reason. For example `caw` is the keybinding to change around words, notice that `caw` is the acronym of the actions itself. See, cool right ? It also compatible to work on parentheses like curly braces, round braces, square braces, etc.

| Action                         | Vim Keybinding                         | Condition                                                                                                           |
| ------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Change around words            | `caw`                                    | Normal mode, cursor should be placed at the specific word                                                           |
| Delete around words            | `daw`                                    | Normal mode, cursor should be placed at the specific word                                                           |
| Yank(copy) around words        | `yaw`                                    | Normal mode, cursor should be placed at the specific word                                                           |
| Delete around parentheses      | the pattern is `da`-parentheses, e.g `da{` | Normal mode, cursor should be placed in between curly parentheses, "around" means the parentheses is also included. |
| Delete inside parentheses      | the pattern is `di`-parentheses, e.g `di{` | Normal mode, cursor should be placed in between parentheses, "inside" means only the text inside the parentheses.   |
| Yank(copy) around parentheses  | the pattern is `ya`-parentheses, e.g `ya{` | Normal mode, cursor should be placed in between curly parentheses, "around" means the parentheses is also included. |
| Yank(copy) inside parentheses  | the pattern is `yi`-parentheses, e.g `yi{` | Normal mode, cursor should be placed in between parentheses, "inside" means only the text inside the parentheses.   |
| Move between parentheses pairs | `#`                                      | Normal mode, cursor should be placed above the parentheses character                                                |

<figure>
<img alt="vim in action" src="/images/post/vim-in-action.gif" />
<figcaption>vim in action</figcaption>
</figure>

## Extensions

My installed extensions primarily used for coding usage, such as framework or language helper. For visualization, since i keep it as minimal as i can, i only install a type of theme for each light and dark mode. For dark theme i choose [Base16 Tomorrow from o4x](https://github.com/o4x/base16-tomorrow-vscode), i love the colors because it's not too vibrant and easy to distinguish, i also use this kind of theme on iTerm and i love to have the same mood on every apps. For light mode i install theme from [GitHub team](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme), i only use it whenever the sunlight on my room is too bright.

Other than that, obviously vim extensions, and then some basic code helper like auto rename, auto-close tag, color highlight, git blame, svg viewer and todo highlight.

## Final Thoughts

I found that vscode can do anything nowadays, it is accessible via web browser and i really like how vscode was integrated with github, we can inspect the public repositories with ease via vscode remote directly. Also the collaborative feature like live sharing for code pair session is really help us get the job done in this situation where we can't working together in the same room physically. Customization also the great plus, i really love how unlimited the customizations are. From changing a line of border to the complex functionality.
