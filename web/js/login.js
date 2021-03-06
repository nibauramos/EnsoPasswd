function performLogin()
{
    pageUrl = REST_SERVER_PATH + "auth/";
    $.ajax({
        type: "GET",
        dataType: "json",
        cache: false,
        data: {username: $("#edit-username-login").val(), password: $("#edit-password-login").val()},
        url: pageUrl,
        success: function (response) {
            loginInvalid = false;
            Cookies.set('sessionkey', response['sessionkey']);
            Cookies.set('actions', response['actions']);
            Cookies.set('username', response['username']);
            ensoConf.switchApp('passwd');
        },
        error: function (response) {
        }
    });
}

function validateSession()
{
valid= false;

    pageUrl = REST_SERVER_PATH + "validity/";
    $.ajax({
        type: "GET",
        dataType: "json",
        cache: false,
        async: false,
        data: {authusername: Cookies.get('username'), sessionkey: Cookies.get('sessionkey')},
        url: pageUrl,
        success: function (response) {
            if(response == "1")
                valid = true;
            
        },
        error: function (response) {
        }
    });

    return valid;
}

function checkCredentials()
{
    if (browserHasGoodCookies() && validateSession()) //Não há sessionkey, fazer login e desaparecer menus nav
    {
        ensoConf.switchApp('passwd');
    }
    else
    {
        resetSession();
    }
}

function resetSession()
{
        Cookies.remove('sessionkey');
        Cookies.remove('actions');
        Cookies.remove('username');
}

function browserHasGoodCookies() {
    return Cookies.get('sessionkey') !== undefined && Cookies.get('actions') !== undefined && Cookies.get('username') !== undefined;
}

$(document).ready(function ()
{
    checkCredentials();
    $("input").keypress(function (event) {

        if (event.keyCode == 13)
        {  
            performLogin();
        }
    });

    Materialize.updateTextFields();
});

