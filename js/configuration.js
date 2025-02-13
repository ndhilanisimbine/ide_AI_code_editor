"use strict";
import query from "./query.js";
import ls from "./local_storage.js";

const configuration = {
    DEFAULT: {
        theme: "system",
        style: "default"
    },
    OPTIONS: {
        theme: ["system", "reverse-system", "light", "dark"],
        style: ["default", "minimal", "standalone", "electron", "puter"]
    },
    STORAGE: {
        theme: "JUDGE0_THEME"
    },
    ALTS: {
        theme: "t",
        style: "s"
    },
    CONFIGURATION: null,
    load() {
        if (!configuration.CONFIGURATION) {
            configuration.CONFIGURATION = JSON.parse(JSON.stringify(configuration.DEFAULT));
            for (const key in configuration.DEFAULT) {
                const val = query.get(key) || query.get(configuration.ALTS[key]) || ls.get(configuration.STORAGE[key]);
                if (val) {
                    configuration.CONFIGURATION[key] = val;
                }
            }
        }
        return configuration.CONFIGURATION;
    },
    get() {
        return configuration.load();
    },
    set(key, val) {
        const config = configuration.load();
        config[key] = val;
        ls.set(configuration.STORAGE[key], val);
    }
};

configuration.load();

export default configuration;
