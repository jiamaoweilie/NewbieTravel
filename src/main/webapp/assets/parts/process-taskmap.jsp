<%--
  Created by IntelliJ IDEA.
  User: wbzhao
  Date: 3/6/15
  Time: 2:49 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:forEach items="${process}" var="processTask">
    <div id="${processTask.getTask().getId()}" value="${processTask.getTask().getName()}" class="task_card">
        <div id="task-guard-${processTask.getTask().getId()}" value="${processTask.getTask().getGuard()}"></div>
        <div id="task-content-${processTask.getTask().getId()}" value="${processTask.getTask().getContext()}"></div>
        <div id="mark-process" class="mark_in_progress">In Progress</div>
        <%--<c:choose>--%>
            <%--<c:otherwise>--%>
        <img src="/assets/images/jiukun_card2.jpg" class="img_cardback">
        <c:choose>
            <c:when test="${processTask.getStatus().equals('finished')}">
                <img src="/assets/images/jiukun_thumb.jpg" class="img_cardface" value="FINISHED">
            </c:when>
            <c:when test="${processTask.getStatus().equals('inProcess')}">
                <img src="/assets/images/jiukun.jpg" class="img_cardface" value="ACCEPTED">
            </c:when>
            <c:otherwise>
                <img src="/assets/images/jiukun.jpg" class="img_cardface" value="NOT_ACCEPTED">
            </c:otherwise>
        </c:choose>
            <%--</c:otherwise>--%>
        <%--</c:choose>--%>
    </div>
</c:forEach>