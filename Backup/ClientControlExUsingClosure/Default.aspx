<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ClientControlExUsingClosure._Default" %>

<%@ Register Assembly="ClientControlExUsingClosure" Namespace="ClientControlExUsingClosure.Controls"
    TagPrefix="Custom" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript"  src="Scripts/Scripts.js"></script>
    <script type="text/javascript" src="Scripts/QueryControl.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <Custom:QueryControl runat="server"  PostFix="1"/>
        <br />
        <Custom:QueryControl runat="server" PostFix="2"/>
        <br />
        Please enter either Games or Players as the search query, to view the results.
    </div>
    </form>
</body>
</html>
