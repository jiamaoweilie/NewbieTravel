<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title>Login</title>
    <script type="text/javascript" src="/assets/scripts/libs/jquery-2.1.3.js"></script>
    <script type="text/javascript" src="/assets/scripts/login.js">
        $(document).ready(function(){
            login.initialise();
        });
    </script>
</head>
<body>

<form class="form-login" method="post" role="form">
    <c:choose>
        <c:when test="${true == isNewUser}">
            <input id="login-input-email" type="text" name="email" placeholder="${email}" value="${email}"/>
        </c:when>
        <c:otherwise>
            <input id="login-input-email" type="text" name="email" placeholder="email address" />
        </c:otherwise>
    </c:choose>
    <button id="btn-login" class="login" type="submit">Log in</button><br/>
    <c:if test="${isNewUser == true}">
        <p>For the first time login, you are asked to select your team and role, please:</p>
        <select name="team">
            <option value="team_common">Not Assigned</option>
            <option value="team_swordfish">Swordfish</option>
            <option value="team_terracotta">Terracotta</option>
        </select>
        <select name="role">
            <option value="role_common">Not Assigned</option>
            <option value="role_ba">BA</option>
            <option value="role_qa">QA</option>
            <option value="role_dev">Dev</option>
        </select>
    </c:if>
    <p>${error}</p>
</form>




</body>
</html>
