<%--
  Created by IntelliJ IDEA.
  User: wbzhao
  Date: 3/6/15
  Time: 2:49 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:forEach items="${client}" var="clientTask">
    <div id="${clientTask.getTask().getId()}" value="${clientTask.getTask().getName()}" class="task_card">
        <div id="task-guard-${clientTask.getTask().getId()}" value="${clientTask.getTask().getGuard()}"></div>
        <div id="task-content-${clientTask.getTask().getId()}" value="${clientTask.getTask().getContext()}"></div>
        <div id="mark-client" class="mark_in_progress">In Progress</div>
        <%--<c:choose>--%>
            <%--<c:when test="${clientTask.getTask().getGuard().equals('Yu Chanchan')}">--%>
        <img src="/assets/images/chanchan_card2.jpg" class="img_cardback">
        <c:choose>
            <c:when test="${clientTask.getStatus().equals('finished')}">
                <img src="/assets/images/chanchan_thumb.jpg" class="img_cardface" value="FINISHED">
            </c:when>
            <c:when test="${clientTask.getStatus().equals('inProcess')}">
                <img src="/assets/images/chanchan.jpg" class="img_cardface" value="ACCEPTED">
            </c:when>
            <c:otherwise>
                <img src="/assets/images/chanchan.jpg" class="img_cardface" value="NOT_ACCEPTED">
                <%--<img src="/assets/images/chanchan.jpg" class="img_unclicked" value="NOT_ACCEPTED">--%>
            </c:otherwise>
        </c:choose>
            <%--</c:when>--%>
        <%--</c:choose>--%>
    </div>
</c:forEach>
