/* eslint-disable react/no-undef */
export default (firstname, lastname, email) => {
  emailjs.send(`gmail`, `mskfact`, {
    name: `MSK`,
    notes: `Check this out!`,
    to: email,
    username: `${firstname} ${lastname}`
  })
    .then(function(response) {
      console.log(`SUCCESS. status=%d, text=%s`, response.status, response.text);
    }, function(err) {
      console.log(`FAILED. error=`, err);
    });
};
