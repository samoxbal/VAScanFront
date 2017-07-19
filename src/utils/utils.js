export function mapOid(item) {
    const { _id: { $oid }, ...rest } = item;
    return { ...{ _id: $oid }, ...rest };
}

export function fieldLense(object, form, field) {
    return object && !form[field] ? object[field] : form[field];
}