<%--
  Created by IntelliJ IDEA.
  User: wbzhao
  Date: 3/11/15
  Time: 9:39 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%--<c:if test="${true}">--%>

<c:if test="${showNewUserGuide == true}">
    <script>
        $(document).ready(function(){
            var userEmail = $("#hello-user").attr("about");
            $("#hello-user").text("Hello " + userEmail.split("@")[0] + "!");
        });
    </script>
    <div id="guideline-bg"></div>
    <section id="sect-new-user-guide">
        <div id="guideline-body">
            <p><b id="hello-user" about="${user.getEmail()}"></b> Welcome to ThoughtWorks Telstra Newbie Challenge. You are starting your ’NEWBIE' adventure to be a ’NIUBEE’.</p>
            <span>TIPS at your start:
                <li>There are 4 categories of tasks. Each category contains 2 task.</li>
                <li>You can flip the task cards to browse the task details in a light box by simply clicking the card.</li>
                <li>You can accept a task by clicking the accept button in the light box, or you can go back and get the task later.</li>
                <li>The guard of each task will give you instructions and helps to complete the task, and also exam whether you can pass the challenge.</li>
            </span>
            <p>May you have an exciting ‘NEWBIE’ journey.</p>
            <br/>
            <div id="guideline-btns">
                <button id="guideline-btn-skip">Start the Adventure</button>
            </div>
        </div>
    </section>
    <script type="text/javascript" src="/assets/scripts/guideline.js"></script>
</c:if>
