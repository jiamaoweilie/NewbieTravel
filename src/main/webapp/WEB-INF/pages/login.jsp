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
    <script type="text/javascript" src="/assets/scripts/libs/jquery.transit.js"></script>

</head>
<body>
    <section id="login-page-1" class="login-page">
        <div class="login_banner">Newbie Challenge</div>
        <form class="form-login" method="post" role="form">
            <div class="login-box-top">
                <img src="/assets/images/loginbox_edge_top_green.jpg">
            </div>
            <div class="form_body">
                <div class="input_line">
                    <label for="email-1" class="login_label">Email: </label>
                    <c:choose>
                        <c:when test="${true == isNewUser}">
                            <input id="email-1" class="login-input-email" type="text" name="email" placeholder="${email}" value="${email}"/>
                        </c:when>
                        <c:otherwise>
                            <input id="email-1" class="login-input-email" type="text" name="email" placeholder="email address" />
                        </c:otherwise>
                    </c:choose>
                </div>
                <button id="btn-login-1" class="btn_login" type="submit">Log in</button><br/>
                <p>${error}</p>
            </div>
            <div class="login-box-bottom">
                <img src="/assets/images/loginbox_edge_bottom_green.jpg">
            </div>
        </form>
        <div class="login_footer">
            <img src="/assets/images/tw_logo_white.png">
        </div>
    </section>

    <c:if test="${isNewUser == true}">
        <section id="login-page-2" class="login-page">
            <div class="login_banner">Newbie Challenge</div>
            <form class="form-login" method="post" role="form">
                <div class="login-box-top">
                    <img src="/assets/images/loginbox_edge_top_red.jpg">
                </div>
                <div class="form_body">
                    <div class="input_line">
                        <label for="email-2" class="login_label">Email: </label>
                        <c:choose>
                            <c:when test="${true == isNewUser}">
                                <input id="email-2" class="login-input-email" type="text" name="email" placeholder="${email}" value="${email}"/>
                            </c:when>
                            <c:otherwise>
                                <input id="email-2" class="login-input-email" type="text" name="email" placeholder="email address" />
                            </c:otherwise>
                        </c:choose>
                    </div>
                    <p style="font-size: 15px; line-height: 100%">For the first time login, please select your team and role:</p>
                    <div id="input-line-team" class="input_line">
                        <label for="team-select" class="login_label">Team: </label>
                        <select id="team-select" name="team">
                            <option value="team_swordfish">Swordfish</option>
                            <option value="team_terracotta">Terracotta</option>
                        </select>
                    </div>
                    <div id="input-line-role" class="input_line">
                        <label for="role-select" class="login_label">Role: </label>
                        <div id="role-select">
                            <div class="input_radio">
                                <label for="radio-select-dev" class="label_radio">
                                    <input id="radio-select-dev" type="radio" name="role" value="role_dev" checked="true"/>DEV
                                </label>
                            </div>
                            <div class="input_radio">
                                <label for="radio-select-qa" class="label_radio">
                                    <input id="radio-select-qa" type="radio" name="role" value="role_qa"/>QA
                                </label>
                            </div>
                            <div class="input_radio">
                                <label for="radio-select-ba" class="label_radio">
                                    <input id="radio-select-ba" type="radio" name="role" value="role_ba"/>BA
                                </label>
                            </div>
                        </div>
                    </div>
                    <button id="btn-login-2" class="btn_login" type="submit">Log in</button><br/>
                    <p>${error}</p>
                </div>
                <div class="login-box-bottom">
                    <img src="/assets/images/loginbox_edge_bottom_red.jpg">
                </div>
            </form>
            <div class="login_footer">
                <img src="/assets/images/tw_logo_white.png">
            </div>
        </section>
        <script>
            $(document).ready(function() {
                $(".login-page").transition({y: '-100%'});
            });
        </script>
    </c:if>
</body>
</html>
