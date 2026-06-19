 async function refreshToken() {

  const refreshToken =localStorage.getItem("refresh_token");

  const response = await fetch(
      "https://msa-auth.onrender.com/o/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          grant_type:"refresh_token",
          refresh_token:refreshToken,
          client_id:CLIENT_ID,
          client_secret:CLIENT_SECRET
        })

      }
    );

  if (!response.ok) {

    localStorage.clear();
    window.location.href ="/login.html";
    return null;
  }

  const data =await response.json();

  localStorage.setItem("access_token",data.access_token );

  return data.access_token;
}