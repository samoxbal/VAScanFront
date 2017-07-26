export function fieldLense(object, form, field) {
    return object && !form[field] ? object[field] : form[field];
}

export function fieldDateLense(object, form, field) {
    if ((!object && !form[field]) || (object && !object[field] && !form[field])) return null;
    return form[field] ? new Date(form[field]) : new Date(object[field]);
}