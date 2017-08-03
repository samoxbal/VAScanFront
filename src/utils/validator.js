export default function validator(validateObj, fieldsToValidate = []) {
    const invalidFields = {};
    fieldsToValidate.forEach(field => {
        if (!validateObj[field]) {
            invalidFields[field] = 'Это поле обязательно!';
        }
    });
    return invalidFields;
}