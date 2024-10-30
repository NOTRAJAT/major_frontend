export const ValidateRegNo = (input) => {
    // Regular expression to match the pattern
    const regex = /^(20[0-9]{2})([a-zA-Z]{2})([0-9]{2})(f)$/;

    // Check if input matches the regex pattern

    return regex.test(input);
}


export const ParseYear = (input) => {

    switch (input) {
        case 'Year':
            return 0
        case 'First':
            return 1
        case 'Second':
            return 2
        case 'Third':
            return 3
        case 'Fourth':
            return 4

        default:

    }

}

export function ValidatePasswordRegex(password) {

    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

    return regex.test(password)
}

export function ValidateEmail(email) {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}
export const Decoder = new TextDecoder("utf-8");
export const ObjectMap = (obj, fn) =>
    Object.fromEntries(
        Object.entries(obj).map(
            ([k, v], i) => [k, fn(v, k, i)]
        )
    )