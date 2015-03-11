<%--
  Created by IntelliJ IDEA.
  User: wbzhao
  Date: 3/11/15
  Time: 9:39 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:if test="${showNewUserGuide == true}">
    <div id="guideline-bg"></div>
    <section id="sect-new-user-guide">
        <div id="guideline-body">
            Your Destiny Lies Among the Wind and the Waves. Let the New Adventure Begin!
            <div id="guideline-btns">
                <button id="guideline-btn-skip">Set Sail</button>
            </div>
        </div>
    </section>
    <script type="text/javascript">
        $(document).ready(function() {
            $("#guideline-btn-skip").bind("click", function(e){
                e.preventDefault();
                $("#sect-new-user-guide").hide();
                $("#guideline-bg").hide()
            });
        });
    </script>
</c:if>
