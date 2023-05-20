let users = JSON.parse(localStorage.getItem("users")) || [];

export function configureFakeBackend() {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    const { method, headers } = opts;
    const body = opts.body && JSON.parse(opts?.body);

    return new Promise((resolve, reject) => {
      setTimeout(handleRoute, 500);
      function handleRoute() {
        switch (true) {
          case url.endsWith("/users/register") && method === "POST":
          case url.endsWith("/register") && method === "POST":
            return register();
          case url.endsWith("/users") && method === "GET":
            return getUsers();
          default:
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      }

      // Initially, i had planned to show the lists of users after login but for the sake of simplicity, I have decided to skip the auth process as it was beyond the scope of the task
      function authenticate() {
        const {
          username,
          password,
          accountType,
          serverAddress,
          serverPath,
          useSSL,
          port,
        } = body;
        const user = users.find(
          (x) => x.username === username && x.password === password
        );
        if (!user) return error("Username or password is incorrect");
        return ok({
          id: user.id,
          username: user.username,
          password: user.password,
          accountType: user.accountType,
          serverAddress: user.serverAddress,
          serverPath: user.serverPath,
          port: user.port,
          useSSL: user.useSSL,
          token: "fake-jwt-token",
        });
      }

      function register() {
        const user = body;
        if (users.find((x) => x.username === user.username)) {
          return error(`Username  ${user.username} is already taken`);
        }
        user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        return ok();
      }

      function getUsers() {
        return ok(users);
      }

      function ok(body) {
        resolve({
          ok: true,
          text: () => Promise.resolve(JSON.stringify(body)),
        });
      }

      function error(message) {
        resolve({
          status: 400,
          text: () => Promise.resolve(JSON.stringify({ message })),
        });
      }
    });
  };
}
