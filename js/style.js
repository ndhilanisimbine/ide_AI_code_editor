"use strict";
import configuration from "./configuration.js";
import { IS_ELECTRON } from "./electron.js";
import { IS_PUTER } from "./puter.js";

const style = {
    apply(name) {
        const resolvedName = configuration.LEGAL_VALUES.style.includes(name) ? name : configuration.DEFAULT.style;

        const styleOptions = configuration.STYLE_OPTIONS[resolvedName];
        Object.keys(styleOptions).forEach(styleOption => {
            const value = String(styleOptions[styleOption]).toLowerCase();
            if (["false", "0"].includes(value)) {
                document.querySelectorAll(`.judge0-${styleOption}`).forEach(e => {
                    e.classList.add("judge0-style-hidden");
                });
            } else {
                document.querySelectorAll(`.judge0-${styleOption}`).forEach(e => {
                    e.classList.remove("judge0-style-hidden");
                });
            }
        });

        Object.keys(configuration.getConfig().styleOptions).forEach(styleOption => {
            const value = String(configuration.getConfig().styleOptions[styleOption]).toLowerCase();
            if (["false", "0"].includes(value)) {
                document.querySelectorAll(`.judge0-${styleOption}`).forEach(e => {
                    e.classList.add("judge0-style-hidden");
                });
            } else if (["true", "1"].includes(value)) {
                document.querySelectorAll(`.judge0-${styleOption}`).forEach(e => {
                    e.classList.remove("judge0-style-hidden");
                });
            }
        });
    }
};

export default style;

document.addEventListener("DOMContentLoaded", function () {
    if (IS_ELECTRON) {
        style.apply("electron");
    } else if (IS_PUTER) {
        style.apply("puter");
    } else {
        style.apply(configuration.getConfig().style);
    }
});
