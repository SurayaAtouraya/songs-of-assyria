function validateUsername (username) {
    return /^[a-z0-9_]+$/i.test(username);
}

console.log(validateUsername("t1__es_t_"));