<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link href="/assets/stylesheets/login.css" type="text/css" rel="stylesheet" >
    <script type="text/javascript" src="/assets/scripts/libs/jquery-2.1.3.js"></script>
</head>
<body>

<form class="form-login" method="post" role="form">
    <div id="input-line-email">
        <label for="login-input-email">Email: </label>
        <c:choose>
            <c:when test="${true == isNewUser}">
                <input id="login-input-email" type="text" name="email" placeholder="${email}" value="${email}"/>
            </c:when>
            <c:otherwise>
                <input id="login-input-email" type="text" name="email" placeholder="email address" />
            </c:otherwise>
        </c:choose>
    </div>
    <c:if test="${isNewUser == true}">
        <div id="select-area">
            <p>For the first time login, please select your team and role:</p>
            <div id="input-line-team">
                <label for="team-select">Your Team: </label>
                <select id="team-select" name="team">
                    <option value="team_swordfish">Swordfish</option>
                    <option value="team_terracotta">Terracotta</option>
                </select>
            </div>
            <div id="input-line-role">
                <label for="role-select">Your Role: </label>
                <div id="role-select">
                    <input id="radio-select-ba" type="radio" name="role" value="role_ba">BA</radio>
                    <input id="radio-select-qa" type="radio" name="role" value="role_qa">QA</radio>
                    <input id="radio-select-dev" type="radio" name="role" value="role_dev">DEV</radio>
                </div>
            </div>
            <div id="input-client-level">
                <label for="client-level">Your Client Team: </label>
                <select id="client-level" name="clientLevel">
                    <option value="level-grad">Grad</option>
                    <option value="level-junior">Junior</option>
                    <option value="level-senior">Senior</option>
                </select>
            </div>
            <div id="input-tech-level">
                <label for="tech-level">Your Tech Team: </label>
                <select id="tech-level" name="techLevel">
                    <option value="level-grad">Grad</option>
                    <option value="level-junior">Junior</option>
                    <option value="level-senior">Senior</option>
                </select>
            </div>
            <div id="input-process-level">
                <label for="process-level">Your Process Team: </label>
                <select id="process-level" name="processLevel">
                    <option value="level-grad">Grad</option>
                    <option value="level-junior">Junior</option>
                    <option value="level-senior">Senior</option>
                </select>
            </div>
            <div id="input-comm-level">
                <label for="comm-level">Your communication Team: </label>
                <select id="comm-level" name="commLevel">
                    <option value="level-grad">Grad</option>
                    <option value="level-junior">Junior</option>
                    <option value="level-senior">Senior</option>
                </select>
            </div>
        </div>
    </c:if>
    <button id="btn-login" class="login" type="submit">Log in</button><br/>
    <p>${error}</p>
</form>




</body>
</html>
