export function fieldLense(object, form, field) {
    return object && !form[field] ? object[field] : form[field];
}

export function fieldDateLense(object, form, field) {
    if ((!object && !form[field]) || (!object[field] && !form[field])) return null;
    return object && object[field] ? new Date(object[field]) : new Date(form[field]);
}