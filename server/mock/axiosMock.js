import MockAdapter from 'axios-mock-adapter';

module.exports = function(axios) {
    const mock = new MockAdapter(axios);
    mock.onPost('/upload').reply(200, {
        data: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGRlNDUxNjllZWIzNzJmZTMwM2UyYjMiLCJyb2xlcyI6InVzZXIifQ.g0-xNDf0BcvPh3Njrm0uPkl_R_gwYr83ksUBNSm4lcg'
    });
};