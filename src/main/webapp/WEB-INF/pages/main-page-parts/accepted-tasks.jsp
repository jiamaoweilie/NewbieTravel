<%--
  Created by IntelliJ IDEA.
  User: wbzhao
  Date: 3/6/15
  Time: 2:59 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<table id="in-doing-tasks">
    <tr class="in_doing_table_head">
        <th>Task Name</th>
        <th>Guard</th>
        <th>Time Spent</th>
        <th>Time Remain</th>
        <th>Deadline</th>
    </tr>
    <c:forEach items="${client}" var="clientTask">
        <c:if test="${clientTask.getStatus().equals('inProcess')}">
            <tr class="in_doing_table_row" type="client">
                <td>${clientTask.getTask().getName()}</td>
                <td>${clientTask.getTask().getGuard()}</td>
                <td>${clientTask.getTask().getDuration()}</td>
            </tr>
        </c:if>
    </c:forEach>
    <c:forEach items="${tech}" var="techTask">
        <c:if test="${techTask.getStatus().equals('inProcess')}">
            <tr class="in_doing_table_row" type="tech">
                <td>${techTask.getTask().getName()}</td>
                <td>${techTask.getTask().getGuard()}</td>
                <td>${techTask.getTask().getDuration()}</td>
            </tr>
        </c:if>
    </c:forEach>
    <c:forEach items="${process}" var="processTask">
        <c:if test="${processTask.getStatus().equals('inProcess')}">
            <tr class="in_doing_table_row" type="process">
                <td>${processTask.getTask().getName()}</td>
                <td>${processTask.getTask().getGuard()}</td>
                <td>${processTask.getTask().getDuration()}</td>
            </tr>
        </c:if>
    </c:forEach>
    <c:forEach items="${comm}" var="commTask">
        <c:if test="${commTask.getStatus().equals('inProcess')}">
            <tr class="in_doing_table_row" type="comm">
                <td>${commTask.getTask().getName()}</td>
                <td>${commTask.getTask().getGuard()}</td>
                <td>${commTask.getTask().getDuration()}</td>
            </tr>
        </c:if>
    </c:forEach>
    <tr></tr>
</table>

<%--<c:forEach items="${client}" var="clientTask">--%>
    <%--<c:if test="${clientTask.getStatus().equals('inProcess')}">--%>
        <%--<div class="accepted_task" id="${clientTask.getTask().getId()}">--%>
            <%--<c:choose>--%>
                <%--<c:when test="${clientTask.getTask().getGuard().equals('Yu Chanchan')}">--%>
                    <%--<img src="/assets/images/chanchan.jpg" class="img_task_accepted">--%>
                <%--</c:when>--%>
                <%--<c:when test="${clientTask.getTask().getGuard().equals('Qiu Juntao')}">--%>
                    <%--<img src="/assets/images/dashi.jpg" class="img_task_accepted">--%>
                <%--</c:when>--%>
            <%--</c:choose>--%>
        <%--</div>--%>
    <%--</c:if>--%>
<%--</c:forEach>--%>
<%--<c:forEach items="${tech}" var="techTask">--%>
    <%--<c:if test="${techTask.getStatus().equals('inProcess')}">--%>
        <%--<div class="accepted_task" id="${techTask.getTask().getId()}">--%>
            <%--<c:choose>--%>
                <%--<c:when test="${techTask.getTask().getGuard().equals('Zhang Jiukun')}">--%>
                    <%--<img src="/assets/images/jiukun.jpg" class="img_task_accepted">--%>
                <%--</c:when>--%>
                <%--<c:when test="${techTask.getTask().getGuard().equals('Qiu Juntao')}">--%>
                    <%--<img src="/assets/images/dashi.jpg" class="img_task_accepted">--%>
                <%--</c:when>--%>
            <%--</c:choose>--%>
        <%--</div>--%>
    <%--</c:if>--%>
<%--</c:forEach>--%>
<%--<c:forEach items="${process}" var="processTask">--%>
    <%--<c:if test="${processTask.getStatus().equals('inProcess')}">--%>
        <%--<div class="accepted_task" id="${processTask.getTask().getId()}">--%>
            <%--<c:choose>--%>
                <%--<c:when test="${processTask.getTask().getGuard().equals('Zhang Jiukun')}">--%>
                    <%--<img src="/assets/images/jiukun.jpg" class="img_task_accepted">--%>
                <%--</c:when>--%>
                <%--<c:when test="${processTask.getTask().getGuard().equals('Qiu Juntao')}">--%>
                    <%--<img src="/assets/images/sample.jpg" class="img_task_accepted">--%>
                <%--</c:when>--%>
            <%--</c:choose>--%>
        <%--</div>--%>
    <%--</c:if>--%>
<%--</c:forEach>--%>
<%--<c:forEach items="${comm}" var="commTask">--%>
    <%--<c:if test="${commTask.getStatus().equals('inProcess')}">--%>
        <%--<div class="accepted_task"  id="${commTask.getTask().getId()}">--%>
            <%--<c:choose>--%>
                <%--<c:when test="${commTask.getTask().getGuard().equals('Jia Wei')}">--%>
                    <%--<img src="/assets/images/jiawei.jpg" class="img_task_accepted">--%>
                <%--</c:when>--%>
                <%--<c:when test="${commTask.getTask().getGuard().equals('Qiu Juntao')}">--%>
                    <%--<img src="/assets/images/sample.jpg" class="img_task_accepted">--%>
                <%--</c:when>--%>
            <%--</c:choose>--%>
        <%--</div>--%>
    <%--</c:if>--%>
<%--</c:forEach>--%>

