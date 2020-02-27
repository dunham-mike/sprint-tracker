export const checkValidity = (value, rules) => { // TODO: Refactor this into its own utility function
    let isValid = true;
    const valueType = typeof value;

    if (!rules) {
        return true;
    }

    if (isValid && rules.required) {
        if (valueType === "string") {
            isValid = value.trim() !== ''; // Remove white space before and after and check that it's not blank
        } else {
            isValid = (value !== null);
        }
    }

    if (isValid && rules.minLength) {
        isValid = value.length >= rules.minLength;
    }

    if (isValid && rules.maxLength) {
        isValid = value.length <= rules.maxLength;
    }

    if (isValid && rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value);
    }

    if (isValid && rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value);
    }

    return isValid;
}