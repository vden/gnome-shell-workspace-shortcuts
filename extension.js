const St = imports.gi.St;
const Meta = imports.gi.Meta;
const Main = imports.ui.main;
const Shell = imports.gi.Shell;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
const Utils = Me.imports.util;

let _lastWsCbId, _lastWsId = [];
let settings;


function init() {
    settings = Convenience.getSettings();
}

function _switchWorkspace() {
    let _currentWorkspace = Utils.DisplayWrapper.getWorkspaceManager().get_active_workspace().index();
    if (_lastWsId.length > 1) {
        _lastWsId.pop(); // current ws
        let lastWs = _lastWsId.pop();  // previous ws
        _lastWsId.push(_currentWorkspace); // push current ws back
        let metaWorkspace = Utils.DisplayWrapper.getWorkspaceManager().get_workspace_by_index(lastWs);  // switch to previous
        metaWorkspace.activate(global.get_current_time());
    }
}

function _findEmptyWorkspace() {
    let metaWorkspace;

    for (let i=0; i < Utils.DisplayWrapper.getWorkspaceManager().n_workspaces; i++) {
        metaWorkspace = Utils.DisplayWrapper.getWorkspaceManager().get_workspace_by_index(i);
        if (metaWorkspace.list_windows().length == 0) {
            metaWorkspace.activate(global.get_current_time());
            break;
        }
    }
}

function onWorkspaceSwitched() {
    let _currentWorkspace = Utils.DisplayWrapper.getWorkspaceManager().get_active_workspace().index();
    _lastWsId.push(_currentWorkspace);
}

function enable() {
    _lastWsCbId = Utils.DisplayWrapper.getWorkspaceManager().connect('workspace-switched', onWorkspaceSwitched);

    Main.wm.addKeybinding("switch-between-last-workspaces",
        settings,
        Meta.KeyBindingFlags.NONE,
        Shell.ActionMode.NORMAL,
        function(display, screen, window, binding) {
            _switchWorkspace();
        }
    ); 

    Main.wm.addKeybinding("switch-to-empty-workspace",
        settings,
        Meta.KeyBindingFlags.NONE,
        Shell.ActionMode.NORMAL,
        function(display, screen, window, binding) {
            _findEmptyWorkspace();
        }
    );
}

function disable() {
    global.display.disconnect(_lastWsCbId);
}
