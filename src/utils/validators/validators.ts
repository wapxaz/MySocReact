export type FieldValidatorType = (value: string) => string | undefined

//правила валидации форм

export const required: FieldValidatorType = (value) => {
    if(value) return undefined;

    return "Field is ruquired";
}
export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if(value.length > maxLength) return `Max length is ${maxLength} symbols`;

    return undefined;
}