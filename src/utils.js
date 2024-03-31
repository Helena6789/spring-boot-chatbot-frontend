
const domain = "http://localhost:8080";

export const login = (credential) => {
  const loginUrl = `${domain}/authenticate`;
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to log in");
    }

    return response.json();
  });
};

export const register = (credential) => {
  const registerUrl = `${domain}/register`;
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};

export async function processMessageToChatGPT(chatMessage) { 
  const apiRequestBody = {
    "model": "gpt-4",
    "text": chatMessage
  }

  const registerUrl = `${domain}/chat`;
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiRequestBody),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to chat");
    }
    return response.json();
  });
}