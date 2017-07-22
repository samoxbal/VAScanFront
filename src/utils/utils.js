export function fieldLense(object, form, field) {
    return object && !form[field] ? object[field] : form[field];
}