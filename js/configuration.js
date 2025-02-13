"use strict";
import query from "./query.js";
import ls from "./local_storage.js";

const OptionState = Object.freeze({
    TRUE: "true",
    FALSE: "false",
    DEFAULT: "default"
});

function parseOptionState(value) {
    if (value == null || value === "") {
        return OptionState.DEFAULT;
    }

    if (["true", "1", "yes"].includes(value.toLowerCase())) {
        return OptionState.TRUE;
    }

    return OptionState.FALSE;
}

const configuration = {
    DEFAULT: {
        theme: "system",
        style: "default",
        styleOptions: {
            showLogo: "default",
        }
    },
    OPTIONS: {
        theme: ["system", "reverse-system", "light", "dark"],
        style: ["default", "minimal", "standalone", "electron", "puter"]
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
