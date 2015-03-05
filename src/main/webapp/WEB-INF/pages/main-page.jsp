<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Main Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link href="stylesheets/style.css" type="text/css" rel="stylesheet" >
</head>
<body>
    <div class="banner">
        <div id="newbie-camp-title">Newbie Challenge</div>
        <div id="tw-logo">
            <img src="image/tw_logo_white.png">
        </div>
        <span>${test}
        </span>
    </div>

    <!-- light box -->
    <section id="sect-light-box" class="light_box">
        <div id="lb-task-type"></div>
        <div id="lb-task-img">
            <img src="image/master.jpeg" alt="" class="img_lightbox">
        </div>
        <div id="lb-task-description">
            打倒肉山大魔王指日可待
        </div>
        <br>
        <div id="lb-buttons" class="lightbox_button_box">
            <input type="button" id="btn-lightbox-accept" value="Accept" class="btn_lightbox">
            <input type="button" id="btn-lightbox-back" value="Back" class="btn_lightbox">
        </div>
    </section>
    <div id="light-box-bg"></div>

    <!-- newbie information -->
    <div class="preface"><p>Let us start an amazing newbie journey with the awesome Game</p></div>

    <section id="sect-user-info" class="information">
        <div id="info-avatar" class="avatar">
            <img src="image/sample.jpg" alt="" class="img_avatar"/>
        </div>
        <div id="info-profile" class="profile">
            <p>Name: XXX</p>
            <ul>Honors:<br>
                <li>FIRST BLOOD!</li>
                <li>DOUBLE KILL!!</li>
                <li>TRIBLE KILL!!!</li>
                <li>RAMPAGE!!!!!</li>
            </ul>
        </div>
        <div id="info-tasks-accepted" value="0" class="tasks_accepted">
            <!-- <span id="count-tasks-accepted" style="display: none" value="0"></span> -->
            <div class="accepted_task"></div>
            <div class="accepted_task"></div>
            <div class="accepted_task"></div>
        </div>
    </section>

    <!-- task maps -->
    <section id="sect-task-maps" class="task_maps">
        <section id="sect-client-taskmap" class="task_map client">
            <div class="task_map_header">
                <div class="task_map_title">Client</div>
                <div class="task_map_icon">
                    <img src="image/client.png">
                </div>
            </div>
            <div id="taskcard-client1" class="task_card">
                <div class="mark_in_progress">Task in Progress</div>
                <img src="image/sample.jpg" alt="" class="img_unclicked" value="NOT_ACCEPTED"/>
            </div>
            <div id="taskcard-client2" class="task_card">
                <div class="mark_in_progress">Task in Progress</div>
                <img src="image/sample.jpg" alt="" class="img_unclicked"  value="NOT_ACCEPTED"/>
            </div>
        </section>
        <section id="sect-tech-taskmap"class="task_map technical">
            <div class="task_map_header">
                <div class="task_map_title">Technical</div>
                <div class="task_map_icon">
                    <img src="image/Technical.png">
                </div>
            </div>
            <div id="taskcard-tech1" class="task_card">
                <div class="mark_in_progress">Task in Progress</div>
                <img src="image/sample.jpg" alt="" class="img_unclicked" value="NOT_ACCEPTED"/>
            </div>
            <div id="taskcard-tech2" class="task_card">
                <div class="mark_in_progress">Task in Progress</div>
                <img src="image/sample.jpg" alt="" class="img_unclicked" value="NOT_ACCEPTED"/>
            </div>
        </section>
        <section id="sect-process-taskmap" class="task_map process">
            <div class="task_map_header">
                <div class="task_map_title">Process</div>
                <div class="task_map_icon">
                    <img src="image/process.png">
                </div>
            </div>
            <div id="taskcard-progress1" class="task_card">
                <div class="mark_in_progress">Task in Progress</div>
                <img src="image/jiukun.jpg" alt="" class="img_unclicked" value="NOT_ACCEPTED"/>
            </div>
            <div id="taskcard-progress2" class="task_card">
                <div class="mark_in_progress">Task in Progress</div>
                <img src="image/jiukun.jpg" alt="" class="img_unclicked" value="NOT_ACCEPTED"/>
            </div>
        </section>
        <section id="sec-comm-taskmap" class="task_map communication">
            <div class="task_map_header">
                <div class="task_map_title">Communication</div>
                <div class="task_map_icon">
                    <img src="image/Communication.png">
                </div>
            </div>
            <div id="taskcard-comm1" class="task_card">
                <div class="mark_in_progress">Task in Progress</div>
                <img src="image/sample.jpg" alt="" class="img_unclicked" value="NOT_ACCEPTED"/>
            </div>
            <div id="taskcard-comm2" class="task_card">
                <div class="mark_in_progress">Task in Progress</div>
                <img src="image/sample.jpg" alt="" class="img_unclicked" value="NOT_ACCEPTED"/>
            </div>
        </section>
    </section>

    <div class="footer"></div>
</body>
</html>
