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
    <br/>
    <p>Available for Teams: </p>
    <input type="checkbox" name="available_team" id="available-team-swordfish" value="team_swordfish">
    <label for="available-team-swordfish">Swordfish</label>
    <input type="checkbox" name="available_team" id="available-team-terracotta" value="team_terracotta">
    <label for="available-team-terracotta">Terracotta</label>
    <br/>
    <p>Available for Roles: </p>
    <input type="checkbox" name="available_role" id="available-role-ba" value="role_ba">
    <label for="available-role-ba">BA</label>
    <input type="checkbox" name="available_role" id="available-role-qa" value="role_qa">
    <label for="available-role-qa">QA</label>
    <input type="checkbox" name="available_role" id="available-role-dev" value="role_dev">
    <label for="available-role-dev">DEV</label>
    <button class="task-context" type="submit">Add Task</button>
    <p>${error}</p>
    <p>${message}</p>
</form>

</body>
</html>
