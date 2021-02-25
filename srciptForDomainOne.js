const headersToAddToTheResponseFromDomainOneServer = {
  "Access-Control-Allow-Origin": "domain.two",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const domainTwo = "domain.two";
const trustedDomainForDomainOne = domainTwo;

function createRequestToRemoteLocalStorage(action, key, value = null) {
  return JSON.stringify({
    action,
    key,
    value,
  });
}

window.onload = () => {
  const receiver = document.getElementById("#receiver");

  const btn = document.getElementById("#sent");

  const sentMessage = (data) => {
    e.preventDefault();
    postMessage(data, "domain.two");

    receiver.postMessage(
      createRequestToRemoteLocalStorage("get", "user_data"),
      trustedDomainForDomainOne
    );
  };
};

window.addEventListener("message", eventMessageHandler);

function eventMessageHandler(e) {
  if (e.origin !== trustedDomainForDomainOne) {
    return;
  } else {
    if (e.data) {
      logger(e.data);
    }
  }
}

function logger(data) {
  const { action, key, value } = JSON.parse(data);
  console.log(`key ${key} : value ${value}`);
}
