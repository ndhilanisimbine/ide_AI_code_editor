"use strict";
import query from "./query.js";
import ls from "./local_storage.js";

const STYLE_OPTIONS = {
    null: {
        showLogo: null,
        showFileMenu: null,
        showHelpMenu: null,
        showSelectLanguage: null,
        showCompilerOptions: null,
        showCommandLineArguments: null,
        showRunButton: null,
        showThemeButton: null,
        showPuterSignInOutButton: null,
        showStatusLine: null,
        showCopyright: null
    },
    default: {
        showLogo: true,
        showFileMenu: true,
        showHelpMenu: true,
        showSelectLanguage: true,
        showCompilerOptions: true,
        showCommandLineArguments: true,
        showRunButton: true,
        showThemeButton: true,
        showPuterSignInOutButton: true,
        showStatusLine: true,
        showCopyright: true
    },
    minimal: {
        showLogo: false,
        showFileMenu: false,
        showHelpMenu: false,
        showSelectLanguage: true,
        showCompilerOptions: false,
        showCommandLineArguments: false,
        showRunButton: true,
        showThemeButton: false,
        showPuterSignInOutButton: false,
        showStatusLine: false,
        showCopyright: false
    },
    standalone: {
        showLogo: false,
        showFileMenu: true,
        showHelpMenu: true,
        showSelectLanguage: true,
        showCompilerOptions: true,
        showCommandLineArguments: true,
        showRunButton: true,
        showThemeButton: true,
        showPuterSignInOutButton: true,
        showStatusLine: true,
        showCopyright: false
    },
    electron: {
        showLogo: false,
        showFileMenu: true,
        showHelpMenu: true,
        showSelectLanguage: true,
        showCompilerOptions: true,
        showCommandLineArguments: true,
        showRunButton: true,
        showThemeButton: true,
        showPuterSignInOutButton: true,
        showStatusLine: true,
        showCopyright: false
    },
    puter: {
        showLogo: false,
        showFileMenu: true,
        showHelpMenu: true,
        showSelectLanguage: true,
        showCompilerOptions: true,
        showCommandLineArguments: true,
        showRunButton: true,
        showThemeButton: true,
        showPuterSignInOutButton: false,
        showStatusLine: true,
        showCopyright: true
    }
};

const APP_OPTIONS = {
    null: {
        showAIAssistant: null
    },
    default: {
        showAIAssistant: true
    },
    minimal: {
        showAIAssistant: false
    },
    standalone: {
        showAIAssistant: true
    },
    electron: {
        showAIAssistant: true
    },
    puter: {
        showAIAssistant: true
    }
};

const configuration = {
    STYLE_OPTIONS: STYLE_OPTIONS,
    APP_OPTIONS: APP_OPTIONS,
    DEFAULT: {
        theme: "system",
        style: "default",
        styleOptions: STYLE_OPTIONS.null,
        appOptions: APP_OPTIONS.null
    },
    LEGAL_VALUES: {
        theme: ["system", "reverse-system", "light", "dark"],
        style: Object.keys(STYLE_OPTIONS)
    },
    CONFIGURATION: null,
    load() {
        if (!configuration.CONFIGURATION) {
            configuration.CONFIGURATION = JSON.parse(JSON.stringify(configuration.DEFAULT));
            for (const key of configuration.getKeys()) {
                const val = query.get(`${ls.PREFIX}${key}`) || ls.get(key);
                if (val) {
                    configuration.set(key, val, false);
                }
            }
        }
        return configuration.CONFIGURATION;
    },
    getConfig() {
        return configuration.load();
    },
    get(key) {
        if (!key) {
            return null;
        }

        let config = configuration.getConfig();
        for (const k of key.split(".")) {
            config = config[k];
            if (!config) {
                break;
            }
        }

        return config || ls.get(key);
    },
    set(key, val, save = true) {
        if (!key) {
            return;
        }

        let config = configuration.getConfig();

        const keys = key.split(".");
        for (let i = 0; i < keys.length - 1; i++) {
            if (!config[keys[i]]) {
                config[keys[i]] = {};
            }
            config = config[keys[i]];
        }
        config[keys[keys.length - 1]] = val;

        if (save) {
            ls.set(key, val);
        }
    },
    getKeys(obj = configuration.getConfig(), prefix = "") {
        return Object.keys(obj).flatMap(key => {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === "object" && obj[key]) {
                return configuration.getKeys(obj[key], fullKey);
            }
            return fullKey;
        });
    }
};

configuration.load();

export default configuration;
