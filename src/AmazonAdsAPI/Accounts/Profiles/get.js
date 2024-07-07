export async function get(clientId, accesToken) {
    const response = await fetch("https://advertising-api-fe.amazon.com/v2/profiles/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accesToken,
        "Amazon-Advertising-API-ClientId": clientId,
      },
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };