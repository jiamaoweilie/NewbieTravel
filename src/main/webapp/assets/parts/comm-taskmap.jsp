<%--
  Created by IntelliJ IDEA.
  User: wbzhao
  Date: 3/6/15
  Time: 2:49 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:forEach items="${comm}" var="commTask">
    <div id="${commTask.getTask().getId()}" value="${commTask.getTask().getName()}" class="task_card">
        <div id="task-guard-${commTask.getTask().getId()}" value="${commTask.getTask().getGuard()}"></div>
        <div id="task-content-${commTask.getTask().getId()}" value="${commTask.getTask().getContext()}"></div>
        <div class="mark_in_progress">In Progress</div>
        <c:choose>
            <c:when test="${commTask.getTask().getGuard().equals('Jia Wei')}">
                <c:choose>
                    <c:when test="${commTask.getStatus().equals('finished')}">
                        <img src="/assets/images/jiawei_thumb.jpg" class="img_clicked" value="FINISHED">
                    </c:when>
                    <c:when test="${commTask.getStatus().equals('inProcess')}">
                        <img src="/assets/images/jiawei.jpg" class="img_unclicked" value="ACCEPTED">
                    </c:when>
                    <c:otherwise>
                        <img src="/assets/images/jiawei.jpg" class="img_unclicked" value="NOT_ACCEPTED">
                    </c:otherwise>
                </c:choose>
            </c:when>
            <%--<c:otherwise>--%>
                <%--<c:choose>--%>
                    <%--<c:when test="${commTask.getStatus().equals('finished')}">--%>
                        <%--<img src="/assets/images/jiawei_thumb.jpg" class="img_clicked" value="FINISHED">--%>
                    <%--</c:when>--%>
                    <%--<c:when test="${commTask.getStatus().equals('inProcess')}">--%>
                        <%--<img src="/assets/images/jiawei.jpg" class="img_unclicked" value="ACCEPTED">--%>
                    <%--</c:when>--%>
                    <%--<c:otherwise>--%>
                        <%--<img src="/assets/images/jiawei.jpg" class="img_unclicked" value="NOT_ACCEPTED">--%>
                    <%--</c:otherwise>--%>
                <%--</c:choose>--%>
            <%--</c:otherwise>--%>
        </c:choose>
    </div>
</c:forEach>