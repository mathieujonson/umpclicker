export const createGame = async (home, away) => {
  console.log("home", home);
  console.log("away", away);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      home: home,
      away: away
    })
  };
  return await fetch("https://umpclicker.com/api/game", options).then(
    response => {
      if (response.ok) {
        return response.json().then(json => {
          return json;
        });
      }
    }
  );
};
