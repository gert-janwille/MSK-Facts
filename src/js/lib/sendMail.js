/* eslint-disable react/no-undef */
export default (firstname, lastname, email) => {
  emailjs.send(`gmail`, `mskfact`, {
    name: `MSK`,
    notes: `Check this out!`,
    to: email,
    username: `${firstname} ${lastname}`
  });
};
