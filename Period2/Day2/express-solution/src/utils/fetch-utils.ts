export function catchHttpErrors(err: {
  status: number;
  fullError: Promise<any>;
}) {
  if (err.status) {
    err.fullError.then(e => {
      console.log(e.detail);
      alert(e.message);
    });
  } else {
    console.log("Network error");
  }
}

export function handleHttpErrors(res: Response) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  } else if (res.status !== 204) {
    return res.json();
  } else {
    return Promise.resolve({ rip: "" });
  }
}

export const makeOptions = (method: string, body?: any) => {
  //(method, addToken, body)
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body
  };
  /* if (addToken && loginFacade.loggedIn()) {
    opts.headers["x-access-token"] = loginFacade.getToken();
  } */
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};
