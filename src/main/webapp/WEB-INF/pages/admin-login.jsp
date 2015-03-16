<%--
  Created by IntelliJ IDEA.
  User: wbzhao
  Date: 15-3-16
  Time: PM7:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Admin Login Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <script type="text/javascript" src="/assets/scripts/libs/jquery-2.1.3.js"></script>
</head>
<body>
    <form id="admin-login-form" role="form" method="get">

    </form>
    <input type="text" id="input-email" name="email" placeholder="admin email">
    <input type="button" id="btn-admin-login" value="Login">

    <script type="text/javascript">
        $(document).ready(function() {
            $("#btn-admin-login").bind("click", function(e){
                e.preventDefault();
                if($("#input-email").val() != "zyang@thoughtworks.com") {
                    $("body").append("<p>Not a valid admin account!</p>");
                    return;
                }
                window.location = "/admin";
            });
        });
    </script>
</body>
</html>
