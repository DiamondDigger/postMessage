const headersToAddToTheResponseFromDomainTwoServer = {
  "Access-Control-Allow-Origin": "domain.one",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const trustedDomainForDomainTwo = "domain.one";

window.addEventListener("message", messageHandler);

function messageHandler(event) {
  if (event.origin !== trustedDomainForDomainTwo) {
    return;
  } else {
    if (event.data) {
      const { action, key, value } = JSON.parse(event.data);
      const source = event.source;

      if (action === "save") {
        localStorage.setItem(key, value);

        sendResponseMessage(
          source,
          createResponse("setResponse", key, "written"),
          trustedDomainForDomainTwo
        );
      }
      if (action === "get") {
        const data = JSON.parse(localStorage.getItem(key));

        sendResponseMessage(
          source,
          createResponse("getResponse", key, data),
          trustedDomainForDomainTwo
        );
      }
      if (action === "delete") {
        localStorage.removeItem(key);

        sendResponseMessage(
          source,
          createResponse("deleteResponse", key, "removed"),
          trustedDomainForDomainTwo
        );
      }
    }
  }
}

function sendResponseMessage(source, data, targetOrigin) {
  source.postMessage(JSON.stringify(data), targetOrigin);
}

function createResponse(action, key, value) {
  return {
    action,
    key,
    value,
  };
}
