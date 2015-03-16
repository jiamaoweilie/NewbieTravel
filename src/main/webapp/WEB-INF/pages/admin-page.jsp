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
        <%--<h3 class="admin_page_subtitle">Create A New Task</h3>--%>
        <a href="/task/add">Create A New Task</a>
    <%--<form id="add-task-form" role="form">--%>
            <%--<h3 class="admin_page_subtitle">Create A New Task</h3>--%>
            <%--<input type="text" name="name" id="input-task-name" placeholder="task name">--%>
            <%--<input type="text" name="guard" id="input-task-guard" placeholder="guard full name">--%>
            <%--<br/><br/>--%>
            <%--<textarea id="input-task-content" name="context" placeholder="task content"></textarea>--%>
            <%--<br/><br/>--%>
            <%--<div id="input-task-type">--%>
                <%--<label for="type-select"><b>Task Type</b></label>--%>
                <%--<select id="type-select" name="type">--%>
                    <%--<option value="client">Client</option>--%>
                    <%--<option value="tech">Technical</option>--%>
                    <%--<option value="process">Process</option>--%>
                    <%--<option value="comm">Communication</option>--%>
                <%--</select>--%>
            <%--</div>--%>
            <%--<br/>--%>
            <%--<div id="input-task-level">--%>
                <%--<label for="level-select"><b>Task level</b></label>--%>
                <%--<select id="level-select" name="level">--%>
                    <%--<option value="level_grad">Graduate</option>--%>
                    <%--<option value="level_junior">Junior</option>--%>
                    <%--<option value="level_senior">Senior</option>--%>
                <%--</select>--%>
            <%--</div><br/>--%>
            <%--<div id="input-task-team">--%>
                <%--<b>Available for Teams: </b>--%>
                <%--<input type="checkbox" name="available_team" id="available-team-swordfish" value="team_swordfish">--%>
                <%--<label for="available-team-swordfish">Swordfish</label>--%>
                <%--<input type="checkbox" name="available_team" id="available-team-terracotta" value="team_terracotta">--%>
                <%--<label for="available-team-terracotta">Terracotta</label>--%>
            <%--</div>--%>
            <%--<br/>--%>
            <%--<div id="input-task-role">--%>
                <%--<b>Available for Roles: </b>--%>
                <%--<input type="checkbox" name="available_role" id="available-role-ba" value="role_ba">--%>
                <%--<label for="available-role-ba">BA</label>--%>
                <%--<input type="checkbox" name="available_role" id="available-role-qa" value="role_qa">--%>
                <%--<label for="available-role-qa">QA</label>--%>
                <%--<input type="checkbox" name="available_role" id="available-role-dev" value="role_dev">--%>
                <%--<label for="available-role-dev">DEV</label>--%>
            <%--</div>--%>
            <%--<br/><br/>--%>
            <%--<button id="btn-add-task" class="task-context">Add Task</button>--%>
        <%--</form>--%>
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
            <tr>
                <td>${user.getEmail()}</td>
                <td>${user.getTeam()}</td>
                <td>${user.getRole()}</td>
                <td>${user.getLevelDetails().get('client')}</td>
                <td>${user.getLevelDetails().get('tech')}</td>
                <td>${user.getLevelDetails().get('process')}</td>
                <td>${user.getLevelDetails().get('comm')}</td>
                <td>
                    <c:forEach items="${user.getInProcess()}" var="inProcessTask">
                        <c:forEach items="${tasks}" var="task">
                            <c:if test="${task.getId().equals(inProcessTask)}">
                                ${task.getName()},
                            </c:if>
                        </c:forEach>
                    </c:forEach>
                </td>
                <td>
                    <c:forEach items="${user.getFinished()}" var="finishedTask">
                        <c:forEach items="${tasks}" var="task">
                            <c:if test="${task.getId().equals(finishedTask)}">
                                ${task.getName()}
                            </c:if>
                        </c:forEach>
                    </c:forEach>
                </td>
            </tr>
        </c:forEach>
    </table>
</section>
<%--<script type="text/javascript">--%>
    <%--admin.initialise();--%>
<%--</script>--%>
</body>
