package com.thoughtworks.controllers;

import com.thoughtworks.controllers.forms.UserTaskForm;
import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;
import com.thoughtworks.entities.util.Constant;
import com.thoughtworks.services.TaskService;
import com.thoughtworks.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@Controller
@RequestMapping(value = "/")
public class LoginController {
    private final Pattern EMAIL_PATTEN = Pattern.compile("^[\\w_-]+@[\\w_-]+(\\.[\\w_-]+)+$");
    @Autowired
    UserService userService;
    @Autowired
    TaskService taskService;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String showLoginPage(){
        return "login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(
            @RequestParam(value = "email") String email,
            @RequestParam(value = "team", required = false) String team,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "clientLevel", required = false) String clientLevel,
            @RequestParam(value = "techLevel", required = false) String techLevel,
            @RequestParam(value = "processLevel", required = false) String processLevel,
            @RequestParam(value = "commLevel", required = false) String commLevel,
            HttpSession httpSession,
            Model model) {

        if(!EMAIL_PATTEN.matcher(email).matches()) {
            model.addAttribute("error", "User email address is not valid.");
            return "login";
        }

        User user = userService.findByEmail(email);
        if(null == user) {
            if (null == team || null == role) {
                model.addAttribute("isNewUser", true);
                model.addAttribute("email", email);
                return "login";
            }
            user = createNewUser(email, team, role, clientLevel, techLevel, processLevel, commLevel);
            model.addAttribute("showNewUserGuide", true);
            httpSession.setAttribute("userId", user.getId());
        }else {
            if (null != team && (!team.equals(user.getTeam()))) {
                model.addAttribute("error", "You chose a different Team with your previous setting.");
                return "login";
            }
            if (null != role && (!role.equals(user.getRole()))) {
                model.addAttribute("error", "You chose a different Role with your previous setting.");
                return "login";
            }
            httpSession.setAttribute("userId", user.getId());
        }
        return doLogin(user, model);
    }

    private User createNewUser(String email, String team, String role, String clientLevel, String techLevel, String processLevel, String commLevel) {
        User user;
        Map<String, String> levelDetails = new HashMap<String, String>();
        levelDetails.put(Constant.CLIENT, clientLevel);
        levelDetails.put(Constant.TECH, techLevel);
        levelDetails.put(Constant.PROCESS, processLevel);
        levelDetails.put(Constant.COMM, commLevel);
        user = new User(email);
        user.setTeam(team);
        user.setRole(role);
        user.setLevelDetails(levelDetails);
        userService.createUser(user);
        return user;
    }

    private String doLogin(User user,
                           Model model) {
        List<Task> tasks = taskService.findTaskForUser(user);
        model.addAttribute("process", getProcessTask(tasks, user));
        model.addAttribute("client", getClientTask(tasks, user));
        model.addAttribute("tech", getTechTask(tasks, user));
        model.addAttribute("comm", getCommTask(tasks, user));
        model.addAttribute("user", user);
        return "main-page";
    }

    private List<UserTaskForm> getProcessTask(List<Task> tasks, User user) {
        List<UserTaskForm> processTasks = getUserTaskForms(tasks, user, "process");
        return processTasks;
    }

    private List<UserTaskForm> getClientTask(List<Task> tasks, User user) {
        List<UserTaskForm> techTasks = getUserTaskForms(tasks, user, "client");
        return techTasks;
    }

    public List<UserTaskForm> getTechTask(List<Task> tasks, User user) {
        List<UserTaskForm> techTasks = getUserTaskForms(tasks, user, "tech");
        return techTasks;
    }

    private List<UserTaskForm> getCommTask(List<Task> tasks, User user) {
        List<UserTaskForm> techTasks = getUserTaskForms(tasks, user, "comm");
        return techTasks;
    }

    private List<UserTaskForm> getUserTaskForms(List<Task> tasks, User user, String type) {
        List<UserTaskForm> processTasks = new ArrayList<UserTaskForm>();
        for (Task task : tasks) {
            if (type.equals(task.getType()))
                processTasks.add(new UserTaskForm(task, ""));
        }
        if (user.getInProcess() != null) {
            for (UserTaskForm taskForm : processTasks) {
                if (user.getInProcess().contains(taskForm.getTask().getId())) {
                    taskForm.setStatus("inProcess");
                }
            }
        }

        if (user.getFinished() != null) {
            for (UserTaskForm taskForm : processTasks) {
                if (user.getFinished().contains(taskForm.getTask().getId())) {
                    taskForm.setStatus("finished");
                }
            }
        }
        return processTasks;
    }
}
