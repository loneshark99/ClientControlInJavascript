function HttpRequestClass(url, onSucceed, onFailed) {
    var http_request;
    if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    }
    else if (window.ActiveXObject) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { ; }
        }
    }
    http_request.onreadystatechange = function() {
        if (http_request.readyState == ReadyState.Complete) {
            if (http_request.status == 200) {
                if (onSucceed != null) {
                    onSucceed(http_request.responseText);
                }
            }
            else if (onFailed != null) {
                onFailed(http_request.status);
            }
        }
    }

    this.Get = function() {
        http_request.open('GET', url, true);
        http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        http_request.send(url);
    }
    this.Post = function(parameters) {
        http_request.open('POST', url, true);
        http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http_request.setRequestHeader("Content-length", parameters.length);
        http_request.setRequestHeader("Connection", "close");
        http_request.send(parameters);
    }
}

HttpRequestClass.MakeGetRequest = function(url, onSucceed, onFailed) {
    var httpGetRequest = new HttpRequestClass(url, onSucceed, onFailed);
    httpGetRequest.Get();
}

HttpRequestClass.MakePostRequest = function(url, parameters, onSucceed, onFailed) {
    var httpPostRequest = new HttpRequestClass(url, onSucceed, onFailed);
    httpPostRequest.Post(parameters);
}


function TestIsValidObject(objToTest) {
    if (null == objToTest) {
        return false;
    }
    if ("undefined" == typeof (objToTest)) {
        return false;
    }
    return true;

}

function GetParameter(name, requestUrl) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(requestUrl);
    if (results == null)
        return "";
    else
        return results[1];
}




function ReadyStateEnum() {
    this.Uninitialized = 0;
    this.Loading = 1;
    this.Loaded = 2;
    this.Interactive = 3;
    this.Complete = 4;
}
var ReadyState = new ReadyStateEnum();