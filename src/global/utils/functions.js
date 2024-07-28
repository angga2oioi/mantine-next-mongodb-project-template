//@ts-check
import { UNKNOWN_ERR_CODE, UNKNOWN_ERR_MESSAGE } from "./constant";
import axios from "axios";

const buildError = ({ error, message }) => {
    const err = new Error(message || UNKNOWN_ERR_CODE);
    err.error = error || UNKNOWN_ERR_MESSAGE;

    return err;
};

export const HttpError = (error, message) => {
    if (error.hasOwnProperty("error")) {
        return buildError(error);
    }

    let msg = message || UNKNOWN_ERR_MESSAGE;

    if (typeof message === typeof {}) {
        let key = Object.keys(message)[0];
        msg = message[key].message;
    }

    return buildError({ error, message: msg });
};

export const parseError = (e) => {
    return {
        error: e.error || UNKNOWN_ERR_CODE,
        message: e?.response?.data?.message || e.message || UNKNOWN_ERR_MESSAGE,
    };
};

export const sanitizeObject = (params) => {
    let obj = { ...params };

    Object.keys(obj).forEach(
        (k) => (obj[k] === undefined || obj[k] === null) && delete obj[k]
    );

    return obj;
};

export const stringifyObjectValues = (params) => {
    let obj = { ...params };

    Object.keys(obj).forEach(
        (k) => (obj[k] = obj[k]?.toString())
    );

    return obj;
};

export const num2Int = (number) => {
    if (isNaN(number)) {
        return 0;
    }

    return parseInt(number);
};

export const minMaxNum = (limit, min, max) => {

    limit = num2Int(limit);

    if (min && limit < num2Int(min)) {
        return num2Int(min);
    }

    if (max && limit > num2Int(max)) {
        return num2Int(max);
    }

    return limit;
};

export const createSlug = (string) => {
    return string
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/-{2,}/g, "-");
};

export const getAllValuesFromJSON = (jsonObject) => {
    const values = [];

    function retrieveValues(obj) {
        for (const key in obj) {
            if (typeof obj[key] === "object") {
                retrieveValues(obj[key]);
            } else {
                values.push(obj[key]);
            }
        }
    }

    retrieveValues(jsonObject);
    return values.join("\n");
};

export const isUrlExists = async (url) => {
    let res;
    try {
        await axios.get(url, {
            timeout: 30000,
        });
        res = true;
    } catch (e) {
        res = false;
    }
    return res;
};

export const shuffleArray = (array) => {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

export const isDomainValid = (domain) => {
    // Define a regular expression pattern for domain validation
    var pattern = /^(?!:\/\/)([a-z0-9-]+\.)+[a-z]{2,}$/i;

    // Test the domain against the pattern
    return pattern.test(domain);
};


export const parseSortBy = (sortBy) => {
    let sortField = {}

    sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':')
        sortField[key] = order === 'desc' ? -1 : 1
    })

    return sortField
}


export const generateInitials = (input = "User") => {
    if (!input || typeof input !== 'string') {
        return 'U';
    }

    // Split the input into words
    const words = input.split(/\s+/);

    // Extract the first letter from each word
    const initials = words.map(word => word.charAt(0).toUpperCase());

    // Join the initials to form the result
    const result = initials.join('');

    return result;
}

export const hideEmail = (email) => {
    const [name, domain] = email?.split("@")

    let arrname = name.split("")
    let first = arrname?.shift()
    let last = arrname?.pop()

    let newName = `${first}${arrname?.map((n)=>{return "*"})?.join("")}${last}@${domain}`
    return newName
}

export const sec2MMSS = (totalSeconds = 0) => {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return minutes?.toString()?.padStart(2, "0") + ":" + seconds?.toString()?.padStart(2, "0");
  }