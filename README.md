# gnome-shell-workspace-shortcuts
This gnome-shell extension adds useful shortcuts to work with workspaces more effectively.

# Manual installation

```
$ mkdir -p ~/.local/share/gnome-shell/extensions
$ git clone git://github.com/vden/gnome-shell-workspace-shortcuts \
  ~/.local/share/gnome-shell/extensions/Additional_Workspace_Shortcuts@denis.voskvitsov.gmail.com```
```

And restart gnome-shell either with `Alt-F2 / r` or `killall -3 gnome-shell`

# Default shortcuts

`Alt-Escape` switches between last used workspaces

`Alt-f` switches to first empty workspace

Keybindings can be changed with `dconf-editor` under `org.gnome.shell.extensions.additional-workspace-shortcuts`.

