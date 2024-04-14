/**
 * The password length needs to be between 6 and 100 characters,
 * and must include both letters and numbers.
 */
export const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,100})/;
