<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Add Task</title>
</head>
<body>
<form class="form-login" method="post" role="form">
    <h3 class="signin-heading">Create a task for newbie</h3>
    <input class="task-name" name="name" type="text" placeholder="name"/>
    <input class="task-guard" name="guard" type="text" placeholder="guard"/>
    <input class="task-context" name="context" type="text" placeholder="context"/>
    <input class="task-type" name="type" type="text" placeholder="type"/>
    <button class="task-context" type="submit">Add Task</button>
    <p>${error}</p>
    <p>${message}</p>
</form>

</body>
</html>
