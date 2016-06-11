using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

namespace ClientControlExUsingClosure.Controls
{
    public class QueryControl : WebControl
    {
        public string HelpText { get; set; }

        public int PostFix { get; set; }

        protected override void Render(System.Web.UI.HtmlTextWriter writer)
        {
            string controlId = "QueryControl_" +  this.UniqueID + "_" + PostFix; 
            base.Render(writer);
            writer.Write("<fieldset>");
            writer.Write("<legend> Query Control");
            writer.Write("<br />");
            writer.Write("<br />");
            writer.Write("<div class='placeHolder' id='"+ controlId + "_placeHolder" + "'>");
            writer.Write("</div>");
            writer.Write("<input type='text' style='padding-right:20px' id='" + controlId + "_txt" + "'></input>");
            writer.Write("<input type='button' style='padding-left:20px' value='Query Data!!' id='" + controlId + "_btn" + "'></input>");
            writer.Write("</legend>");
            writer.Write("<script language='javascript'>var " + controlId + " = new ClientControlExUsingClosure.QueryControl('" + controlId + "');</script>");
            writer.Write("</fieldset>");
        }
    }
}
