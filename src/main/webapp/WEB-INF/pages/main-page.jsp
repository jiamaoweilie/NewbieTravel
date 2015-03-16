<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
<head>
    <title>Main Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link href="/assets/stylesheets/style.css" type="text/css" rel="stylesheet" >
    <link href="/assets/stylesheets/guideline.css" type="text/css" rel="stylesheet">
    <link href="/assets/stylesheets/infobar.css" type="text/css" rel="stylesheet">
    <link href="/assets/stylesheets/lightbox.css" type="text/css" rel="stylesheet">
    <link href="/assets/stylesheets/taskmaps.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="/assets/scripts/libs/jquery-2.1.3.js"></script>
    <script type="text/javascript" src="/assets/scripts/libs/jquery.transit.js"></script>
</head>
<body>
    <div class="banner">
        <div id="newbie-camp-title">Newbie Challenge</div>
        <div id="tw-logo">
            <img src="/assets/images/tw_logo_white.png">
        </div>
    </div>

    <!-- new user guideline -->
    <%@include file="new-user-guide.jsp"%>

    <!-- light box -->
    <section id="sect-light-box" class="light_box">
        <div id="" class="lb_task_id"></div>
        <div class="light_box_border">
            <div id="lb-task-header"></div>
            <div id="lb-task-description">
                <div id="lb-task-content"></div>
                <div id="lb-task-img">
                    <img src="/assets/images/example_avatar.jpg" alt="" class="img_lightbox">
                </div>
            </div>
            <div id="lb-task-footer">
                <div id="lb-task-guard"></div>
                <div id="lb-buttons" class="lightbox_button_box">
                    <img src="/assets/images/lb_btn_y.jpg" id="btn-lightbox-accept" value="Accept" class="btn_lightbox">
                    <img src="/assets/images/lb_btn_n.jpg" id="btn-lightbox-back" value="Back" class="btn_lightbox">
                </div>
            </div>
        </div>
    </section>
    <div id="light-box-bg"></div>

    <!-- newbie information -->
    <div class="preface"><p>Let us start an amazing newbie journey with the awesome Game</p></div>

    <section id="sect-user-info" class="information">
        <div id="info-avatar" class="avatar">
            <img src="/assets/images/example_avatar.jpg" alt="" class="img_avatar"/>
        </div>
        <div id="info-profile" class="profile">
            <p>Name: <br><span id="user-name">${user.getEmail()}</span></p>
            <script type="text/javascript">
                $("#user-name").text($("#user-name").text().split("@")[0]);
            </script>
            <ul>Achievements:<br>
                <c:forEach items="${user.getAchievement()}" var="achievement">
                    <li>${achievement}</li>
                </c:forEach>
            </ul>
        </div>
        <div id="info-tasks-accepted" value="0" class="tasks_accepted">
            <%@include file="/assets/parts/accepted-tasks.jsp" %>
        </div>

    </section>

    <!-- task maps -->
    <section id="sect-task-maps" class="task_maps">
        <section id="sect-client-taskmap" class="task_map client">
            <div class="task_map_header">
                <div class="task_map_title">Client</div>
                <div class="task_map_icon">
                    <span class="icon-user"></span>
                </div>
            </div>
            <%@include file="/assets/parts/client-taskmap.jsp" %>
        </section>

        <section id="sect-tech-taskmap"class="task_map technical">
            <div class="task_map_header">
                <div class="task_map_title">Technical</div>
                <div class="task_map_icon">
                    <span class="icon-lab"></span>
                </div>
            </div>
            <%@include file="/assets/parts/tech-taskmap.jsp" %>
        </section>

        <section id="sect-process-taskmap" class="task_map process">
            <div class="task_map_header">
                <div class="task_map_title">Process</div>
                <div class="task_map_icon">
                    <span class="icon-shuffle"></span>
                </div>
            </div>
            <%@include file="/assets/parts/process-taskmap.jsp" %>
        </section>

        <section id="sec-comm-taskmap" class="task_map communication">
            <div class="task_map_header">
                <div class="task_map_title">Communication</div>
                <div class="task_map_icon">
                    <span class="icon-bubbles"></span>
                </div>
            </div>
            <%@include file="/assets/parts/comm-taskmap.jsp" %>
        </section>

    </section>

    <div class="footer"></div>
    <script type="text/javascript" src="/assets/scripts/page-init.js"></script>
    <script type="text/javascript" src="/assets/scripts/task-maps.js"></script>
    <script type="text/javascript" src="/assets/scripts/lightbox.js"></script>
</body>
</html>