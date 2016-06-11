using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace ClientControlExUsingClosure
{
    /// <summary>
    /// Summary description for $codebehindclassname$
    /// </summary>
    public class Query : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            List<string> list = new List<string>();
            context.Response.ContentType = "text/plain";
            if (string.Compare(context.Request.Form["query"],"Games",true) == 0)
            {
                list.Add("FootBall");
                list.Add("Soccer");
                list.Add("PingPong");
            }
            else if (string.Compare(context.Request.Form["query"], "Players", true) == 0)
            {
                list.Add("D Maradona");
                list.Add("P Sampras");
                list.Add("A Agassi");
            }
            else
            {
                list.Add("No results returned");
            }
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            context.Response.Write(serializer.Serialize(list));
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
