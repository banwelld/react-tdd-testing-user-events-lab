import React from 'react';
import { useState } from 'react';

function App() {

  const [name, setName] = useState({first: '', last: ''});
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [submission, setSubmission] = useState({name: {first: '', last: ''}, email: '', interests: []});

  const interestOptions = [
    'reading',
    'painting',
    'photography',
    'cooking',
    'traveling',
    'hiking',
    'gaming',
    'television',
    'movies',
    'fitness'
  ];

  const sortedInterests = interestOptions.sort()

  function handleNameChange(e) {
    const { id, value } = e.target;
    setName(oldName => ({ ...oldName, [id]: value }));
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handleInterestChange(e) {
    if (interests.includes(e.target.id)) {
      setInterests(interests.filter(interest => interest !== e.target.id));
    } else {
      setInterests([...interests, e.target.id]);
    };
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    setSubmission(oldSubmission => ({
      ...oldSubmission,
      name: { first: name.first, last: name.last },
      email: email,
      interests: interests
    }));
    setName(oldName => ({ ...oldName, first: '', last: '' }));
    setEmail('');
    setInterests([]);
  };

  function validEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const naughtyWords = /[(ph)f]uck|[s$]h[i!1][t+]|[c¢]un[t+]|bi[t+][c¢]h|pu[s$]{2}y/i

  function emailWarning() {
    let warningArr = []
    
    if (!validEmail()) warningArr = [...warningArr, 'Not a valid email address format']
    if (email.includes(' ')) warningArr = [...warningArr, 'Spaces not permitted in email address'];
    if (validEmail()) warningArr = ['Valid email format']
    if (naughtyWords.test(email)) warningArr = [...warningArr, 'Whoa! Do you email your mother with that address?'];
    if (email.length < 6) warningArr = []

    return warningArr;
  };

  function emailWarningList() {
    const elements = (warning, index) => <small style={{color: warning[0].toLowerCase() === 'v' ? 'green' : 'red'}} key={'warning' + index.toString()}>{warning}</small>
    const warningMessages = emailWarning().map(elements);
    return warningMessages;
  }

  function hasAllData() {
    return name.first && name.last && validEmail() && interests.length > 0;
  };

  function capString(str) {
    const firstLowercase = /^[a-z]/.test(str[0]);
    return firstLowercase ? str[0].toUpperCase() + str.slice(1) : str;
  };

  function interestList() {
    const itemElement = interest => <li key={interest + 'Li'}>{capString(interest)}</li>
    return submission.interests.map(itemElement);
  };

  function interestBoxes() {
    const checkboxElement = interest => {
      const isChecked = interests.includes(interest);
      return (
        <div key={interest + 'Box'} style={{display: "flex", flexDirection: "row", marginRight: "15px"}}>
          <input id={interest} type="checkbox" checked={isChecked} onChange={handleInterestChange} />
          <label htmlFor={interest}>{capString(interest)}</label>
        </div>
      )
    };

    return sortedInterests.map(checkboxElement);
  };

  function successMsg() {
    if (submission.email) {
      return(
        <div style={{color: "purple", paddingLeft: "40px"}}>
          <h3>Thanks, {submission.name.first}! You've successfully registered for our newsletter!</h3>
          <p>You'll be the first to know when we have any news on:</p>
          <ul style={{display: "grid", gridTemplateColumns: "auto auto auto"}}>
            {interestList()}
          </ul>
        </div>
      );
    }
    return false;
  };

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{display: "flex", flexDirection: "column", width: "350px"}}>
          <h3>
            Sign up for our newsletter!
          </h3>
          <form aria-label="newsletter sign-up form" onSubmit={handleFormSubmit} style={{display: "flex", flexDirection: "column"}}>
            <div style={{marginBottom: "0px"}}>
              <label htmlFor="first">Name</label><span style={{color: "red"}}> *</span>
            </div>
            <div style={{display: "flex", flexDirection: "row", margin: "0px"}}>
              <div style={{display: "flex", flexDirection: "column"}}>
                <input id="first" name="first" value={name.first} type="text" onChange={handleNameChange} style={{width: "150px"}} />
                <label htmlFor="first"><small>First</small></label>
              </div>
              <div style={{display: "flex", flexDirection: "column", marginLeft: "30px"}}>
                <input id="last" name="last" value={name.last} type="text" onChange={handleNameChange} style={{width: "150px"}} />
                <label htmlFor="last"><small>Last</small></label>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", marginTop: "0px"}}>
              <div>
                <label htmlFor="email">Email</label><span style={{color: "red"}}> *</span>
              </div>
              <input
                id="email"
                name="email"
                value={email}
                type="text"
                onChange={handleEmailChange}
                placeholder="e.g., johnsmith@example.com"
                style={{width: "340px"}}
              />
              {emailWarningList()}
            </div>
            <div>
              <div style={{marginBottom: "0px"}}>
                <strong>What interests you? </strong>
                <small>(Select at leaast one)</small><span style={{color: "red"}}> *</span>
              </div>
              <div style={{margin: "0px"}}>
              </div>
              <div style={{display: "grid", gridTemplateColumns: "auto auto auto", marginTop: "0px"}}>
                {interestBoxes()}
              </div>
              <button type="submit" disabled={!hasAllData()}>Submit</button>
            </div>
          </form>
        </div>
        {successMsg()}
      </div>
    </main>
  );
}

export default App;