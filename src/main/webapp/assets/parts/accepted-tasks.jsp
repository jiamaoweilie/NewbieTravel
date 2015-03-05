<%--
  Created by IntelliJ IDEA.
  User: wbzhao
  Date: 3/6/15
  Time: 2:59 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:forEach items="${client}" var="clientTask">
    <c:if test="${clientTask.getStatus().equals('inProcess')}">
        <div class="accepted_task">
            <c:choose>
                <c:when test="${clientTask.getTask().getGuard().equals('Zhang Jiukun')}">
                    <img src="/assets/images/jiukun.jpg" class="img_task_accepted">
                </c:when>
                <c:when test="${clientTask.getTask().getGuard().equals('Qiu Juntao')}">
                    <img src="/assets/images/sample.jpg" class="img_task_accepted">
                </c:when>
            </c:choose>
        </div>
    </c:if>
</c:forEach>
<c:forEach items="${tech}" var="techTask">
    <c:if test="${techTask.getStatus().equals('inProcess')}">
        <div class="accepted_task">
            <c:choose>
                <c:when test="${techTask.getTask().getGuard().equals('Zhang Jiukun')}">
                    <img src="/assets/images/jiukun.jpg" class="img_task_accepted">
                </c:when>
                <c:when test="${techTask.getTask().getGuard().equals('Qiu Juntao')}">
                    <img src="/assets/images/sample.jpg" class="img_task_accepted">
                </c:when>
            </c:choose>
        </div>
    </c:if>
</c:forEach>
<c:forEach items="${process}" var="processTask">
    <c:if test="${processTask.getStatus().equals('inProcess')}">
        <div class="accepted_task">
            <c:choose>
                <c:when test="${processTask.getTask().getGuard().equals('Zhang Jiukun')}">
                    <img src="/assets/images/jiukun.jpg" class="img_task_accepted">
                </c:when>
                <c:when test="${processTask.getTask().getGuard().equals('Qiu Juntao')}">
                    <img src="/assets/images/sample.jpg" class="img_task_accepted">
                </c:when>
            </c:choose>
        </div>
    </c:if>
</c:forEach>
<c:forEach items="${comm}" var="commTask">
    <c:if test="${commTask.getStatus().equals('inProcess')}">
        <div class="accepted_task">
            <c:choose>
                <c:when test="${commTask.getTask().getGuard().equals('Zhang Jiukun')}">
                    <img src="/assets/images/jiukun.jpg" class="img_task_accepted">
                </c:when>
                <c:when test="${commTask.getTask().getGuard().equals('Qiu Juntao')}">
                    <img src="/assets/images/sample.jpg" class="img_task_accepted">
                </c:when>
            </c:choose>
        </div>
    </c:if>
</c:forEach>

