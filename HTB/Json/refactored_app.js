angular["module"]("json", [
    "ngCookies"
])["controller"]("loginController", [

    // parameters
    "$http",
    "$scope",
    "$cookies",

    function (http, scope, cookies) {
        sco = {
            UserName: "",
            Password: ""
        };
        scope["error"] = {
            message: "",
            show: false
        };

        var oauthcookie = cookies["get"]("OAuth2");

        if (oauthcookie) {
            window["location"]["href"] = "index.html"
        };

        // fired when submitting login form
        scope.login = function () {
            http.post("/api/token", scope["credentials"]).then(function (resp) {
                window["location"]["href"] = "index.html"
            }, function (err) {
                scope["error"]["message"] = "Invalid Credentials.";
                scope["error"]["show"] = true;
                console["log"](err)
            });
        }
    }

])["controller"]("principalController", [

    // parameters
    "$http",
    "$scope",
    "$cookies",

    function (http, scope, cookie) {
        var oauthcookie = cookie.get("OAuth2");

        if (oauthcookie) {
            // vulnerable endpoint
            http.get("/api/Account/", {
                headers: {
                    'Bearer': oauthcookie
                }
            }).then(function (resp) {
                scope["UserName"] = resp["data"]["Name"]
            }, function (err) {
                cookie["remove"]("OAuth2");
                window["location"]["href"] = "login.html"
            });
        } else {
            indow["location"]["href"] = "login.html"
        }
    }

])    