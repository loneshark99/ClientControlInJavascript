//Creating the NameSpace here.....
var ClientControlExUsingClosure = ClientControlExUsingClosure || {};

//Helper Method for Adding event CallBack Method
ClientControlExUsingClosure.AddEvent = function(element, eventName, CallBackFunction) {
if (element.attachEvent) {
    element.attachEvent("on" + eventName, CallBackFunction);
    }
    else {
        element.addEventListener(eventName, CallBackFunction, true);
    }
}

//Helper Method for Removing event CallBack Method
ClientControlExUsingClosure.DetachEvent = function(element, eventName, CallBackFunction){
    if (element.detachEvent) {
        element.detachEvent("on" + eventName, CallBackFunction); 
    }
    else {
        element.removeEventListener(eventName, CallBackFunction, true);
    }
}

//Defining QueryCollection Class
//This class will hold all the instances of QueryCollection
ClientControlExUsingClosure.QueryControlCollection = function() {
};
//Adding Prototype for QueryCollection Class
ClientControlExUsingClosure.QueryControlCollection.prototype = {
    //Internal Collection to hold the QueryControls
    Collection: new Array(),
    //Method to register the QueryControl
    Register: function(id, obj) {
        this.Collection[id] = obj;
    },
    //Method which returns the stored QueryCollection
    GetQueryControl: function(id) {
        return this.Collection[id];
    }
};

//Defining QueryControl Class
ClientControlExUsingClosure.QueryControl = function(id) {
    //When someone creates a new QueryControl, following steps will be called.
    //1)Control will be initialized
    //2)QueryControl will be registered to the Control Collection
    //3)Appropriate Events will be attached
    this.Initialize(id);
    ClientControlExUsingClosure.controlCollection.Register(id, this);
    this.AttachEvents();
};
//Adding Prototype for QueryCollection Class
ClientControlExUsingClosure.QueryControl.prototype = {
    //Initializes the QueryControl
    Initialize: function(id) {
        this.id = id;
        //THIS IS DONE TO STORE THE ACTUAL QUERYCONTROL INSTANCE, WHEN THE CALLBACK FUNCTION IS CALLED
        //IT WILL STILL HAVE THE QUERYCONTROL INSTANCE
        var that = this;
        this.GetOutput = function() { that.GetData(); };
        //AJAX SUCCESS CALLBACK FUNCTION, THIS RETURNS A FUNCTION, I.E FUNCTION AS DATA, Very important use of closure
        this.AjaxSuccessCallBackFunction = function() {
        return function(x) {
            //-- Using Closure -- here
                that.ShowData(x);
            }
        };
    },
    //Makes a Ajax Call to get the data..
    GetData: function(query, params) {
        var value = document.getElementById(this.id + "_txt").value;
        var params = "Query=" + value;
        var url = "http://localhost:46679/Query.ashx";
        HttpRequestClass.MakePostRequest(url, params, this.AjaxSuccessCallBackFunction(), function(errorCode) { alert('Error Occured'); });
    },
    //Methods appends the Ajax response to the UI..
    ShowData: function(obj) {
        var id = this.id;
        var elem = document.getElementById(this.id + "_placeHolder");
        elem.innerHTML = obj.toString();
    },
    //Attaches Control Events..
    AttachEvents: function() {
        var elementId = this.id + "_btn";
        var element = document.getElementById(elementId);
        ClientControlExUsingClosure.AddEvent(element, "click", this.GetOutput);
    }

};

if (!ClientControlExUsingClosure.controlCollection) {
    ClientControlExUsingClosure.controlCollection = new ClientControlExUsingClosure.QueryControlCollection();
}




