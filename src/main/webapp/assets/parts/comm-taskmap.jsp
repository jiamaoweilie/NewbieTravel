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
    <div id="${commTask.getTask().getId()}" value="${commTask.getStatus()}" class="task_card">
        <div class="mark_in_progress">In Progress</div>
        <c:choose>
            <c:when test="${commTask.getTask().getGuard().equals('Qiu Juntao')}">
                <c:choose>
                    <c:when test="${commTask.getStatus().equals('finished')}">
                        <img src="/assets/images/sample.jpg" class="img_unclicked" value="NOT_ACCEPTED">
                    </c:when>
                    <c:otherwise>
                        <img src="/assets/images/sample.jpg" class="img_unclicked" value="NOT_ACCEPTED">
                    </c:otherwise>
                </c:choose>
            </c:when>
            <c:otherwise>
                <c:choose>
                    <c:when test="${commTask.getStatus().equals('finished')}">
                        <img src="/assets/images/jiukun_thumb.jpg" class="img_unclicked" value="NOT_ACCEPTED">
                    </c:when>
                    <c:otherwise>
                        <img src="/assets/images/jiukun.jpg" class="img_unclicked" value="NOT_ACCEPTED">
                    </c:otherwise>
                </c:choose>
            </c:otherwise>
        </c:choose>
            <%--<c:if test="${commTask.getStatus().equals('inProcess')}">--%>
            <%--<script type="text/javascript" src="/assets/scripts/libs/jquery-2.1.3.js">--%>
            <%--$(document).ready(function(){--%>
            <%--$(this).siblings(".mark_in_progress").show();--%>
            <%--$(this).parent().css("background-color", "#333");--%>
            <%--});--%>
            <%--</script>--%>
            <%--</c:if>--%>
    </div>
</c:forEach>