<%--
  Created by IntelliJ IDEA.
  User: wbzhao
  Date: 15-3-16
  Time: PM2:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
<head>
    <title>Admin Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <script type="text/javascript" src="/assets/scripts/libs/jquery-2.1.3.js"></script>
    <script type="text/javascript" src="/assets/scripts/libs/jquery.transit.js"></script>
    <script type="text/javascript" src="/assets/scripts/libs/jquery.form.js"></script>
    <script type="text/javascript" src="/assets/scripts/admin.js"></script>
</head>
<body>
<section id="sect-tasks">
    <section id="sect-task-list">
        <h3>Task List</h3>
        <table id="task-list-table" border="1">
            <tr>
                <th>Task Name</th>
                <th>Task Type</th>
                <th>Guard</th>
                <th>Task Content</th>
            </tr>
            <c:forEach items="${tasks}" var="task">
                <tr>
                    <td>${task.getName()}</td>
                    <td>${task.getType()}</td>
                    <td>${task.getGuard()}</td>
                    <td>${task.getContext()}</td>
                </tr>
            </c:forEach>
        </table>
    </section><br/>
    <section id="sect-add-task">
        <a href="/task/add">Create A New Task</a>
    </section><br/>
</section><br/>
<section id="sect-users">
    <%-- TODO: jsp code to list the users return by controller --%>
    <h3>User List</h3>
    <table id="user-table" border="1">
        <tr>
            <th>Email</th>
            <th>Team</th>
            <th>Role</th>
            <th>Client Level</th>
            <th>Tech Level</th>
            <th>Process Level</th>
            <th>Comm Level</th>
            <th>Doing</th>
            <th>Finished</th>
        </tr>
        <c:forEach items="${users}" var="user">
            <tr class="user_entry" id="${user.getId()}">
                <td>${user.getEmail()}</td>
                <td>${user.getTeam()}</td>
                <td>${user.getRole()}</td>
                <td>${user.getLevelDetails().get('client')}</td>
                <td>${user.getLevelDetails().get('tech')}</td>
                <td>${user.getLevelDetails().get('process')}</td>
                <td>${user.getLevelDetails().get('comm')}</td>
                <td class="in_progress_list">
                    <c:forEach items="${user.getInProcess()}" var="inProcessTask">
                        <c:forEach items="${tasks}" var="task">
                            <c:if test="${task.getId().equals(inProcessTask)}">
                                <div class="in_doing_task" id="${inProcessTask}">
                                    ${task.getName()}<input type="button" value="Finish" class="btn_finish_task"><br/>
                                </div>
                            </c:if>
                        </c:forEach>
                    </c:forEach>
                </td>
                <td class="finished_list">
                    <c:forEach items="${user.getFinished()}" var="finishedTask">
                        <c:forEach items="${tasks}" var="task">
                            <c:if test="${task.getId().equals(finishedTask)}">
                                ${task.getName()}<br/>
                            </c:if>
                        </c:forEach>
                    </c:forEach>
                </td>
            </tr>
        </c:forEach>
    </table>
</section>
<script type="text/javascript" src="/assets/scripts/finish-task.js"></script>
</body>
