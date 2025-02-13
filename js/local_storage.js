"use strict";
const ls = {
    set(key, value) {
        if (!key) {
            return;
        }

        try {
            if (value == null) {
                ls.del(key);
                return;
            }

            if (typeof value === "object") {
                value = JSON.stringify(value);
            }

            localStorage.setItem(key, value);
        } catch (ignorable) {
        }
    },
    get(key) {
        if (!key) {
            return null;
        }

        try {
            const value = localStorage.getItem(key);
            try {
                return JSON.parse(value);
            } catch (ignorable) {
                return value;
            }
        } catch (ignorable) {
            return null;
        }
    },
    del(key) {
        if (!key) {
            return;
        }

        try {
            localStorage.removeItem(key);
        } catch (ignorable) {
        }
    }
};

export default ls;
