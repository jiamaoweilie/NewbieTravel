<%--
  Created by IntelliJ IDEA.
  User: wbzhao
  Date: 3/6/15
  Time: 2:49 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:forEach items="${tech}" var="techTask">
    <div id="${techTask.getTask().getId()}" value="${techTask.getTask().getName()}" class="task_card">
        <div id="task-guard-${techTask.getTask().getId()}" value="${techTask.getTask().getGuard()}"></div>
        <div id="task-content-${techTask.getTask().getId()}" value="${techTask.getTask().getContext()}"></div>
        <div id="task-duration-${techTask.getTask().getId()}" value="${techTask.getTask().getDuration()}"></div>
        <div id="mark-tech" class="mark_in_progress">In Progress</div>
        <%--<c:choose>--%>
            <%--<c:when test="${techTask.getTask().getGuard().equals('Qiu Juntao')}">--%>
        <img src="/assets/images/dashi_card2.jpg" class="img_cardback">
        <c:choose>
            <c:when test="${techTask.getStatus().equals('finished')}">
                <img src="/assets/images/dashi_thumb1.jpg" class="img_cardface" value="FINISHED">
            </c:when>
            <c:when test="${techTask.getStatus().equals('inProcess')}">
                <img src="/assets/images/dashi.jpg" class="img_cardface" value="ACCEPTED">
            </c:when>
            <c:otherwise>
                <img src="/assets/images/dashi.jpg" class="img_cardface" value="NOT_ACCEPTED">
            </c:otherwise>
        </c:choose>
            <%--</c:when>--%>
        <%--</c:choose>--%>
    </div>
</c:forEach>