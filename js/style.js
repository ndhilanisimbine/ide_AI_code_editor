"use strict";
import configuration from "./configuration.js";
import { IS_ELECTRON } from "./electron.js";
import { IS_PUTER } from "./puter.js";

const style = {
    apply(name) {
        const resolvedName = configuration.OPTIONS.style.includes(name) ? name : configuration.DEFAULT.style;
        if (resolvedName !== "default") {
            style.apply("default");
            document.querySelectorAll(`.judge0-${resolvedName}-hidden`).forEach(e => {
                e.classList.add("judge0-style-hidden");
            });
        } else {
            configuration.OPTIONS.style.forEach(s => style.reverse(s));
        }

        configuration.OPTIONS.style.forEach(s => {
            document.querySelectorAll(`.judge0-${s}-visible`).forEach(e => {
                if (s === resolvedName) {
                    e.classList.remove("judge0-style-hidden");
                } else {
                    e.classList.add("judge0-style-hidden");
                }
            });
        });
    },
    reverse(name) {
        document.querySelectorAll(`.judge0-${name}-hidden`).forEach(e => {
            e.classList.remove("judge0-style-hidden");
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
        style.apply(configuration.get().style);
    }
});
