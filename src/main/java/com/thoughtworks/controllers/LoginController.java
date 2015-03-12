package com.thoughtworks.controllers;

import com.thoughtworks.controllers.forms.UserTaskForm;
import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;
import com.thoughtworks.entities.constants.Achievement;
import com.thoughtworks.entities.constants.TaskType;
import com.thoughtworks.services.TaskService;
import com.thoughtworks.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.*;
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
    public String showLoginPage() {
        return "login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(
            @RequestParam(value = "email") String email,
            @RequestParam(value = "team", required = false) String team,
            @RequestParam(value = "role", required = false) String role,
            HttpSession httpSession,
            Model model) {

        if (!EMAIL_PATTEN.matcher(email).matches()) {
            model.addAttribute("error", "User email address is not valid.");
            return "login";
        }

        User user = userService.findByEmail(email);
        if (null == user) {
            if (null == team || null == role) {
                model.addAttribute("isNewUser", true);
                model.addAttribute("email", email);
                return "login";
            }
            user = createNewUser(email, team, role);
            model.addAttribute("showNewUserGuide", true);
            httpSession.setAttribute("userId", user.getId());
        } else {
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

    private User createNewUser(String email, String team, String role) {
        User user;
        Map<String, String> levelDetails = new HashMap<String, String>();

        levelDetails.put(TaskType.CLIENT, "level_grad");
        levelDetails.put(TaskType.TECH, "level_grad");
        levelDetails.put(TaskType.PROCESS, "level_grad");
        levelDetails.put(TaskType.COMM, "level_grad");
        user = new User(email);
        user.setTeam(team);
        user.setRole(role);
        user.setLevelDetails(levelDetails);
        HashSet<String> achievements = new HashSet<String>();
        achievements.add(Achievement.NEW_NEWBIE);
        user.setAchievement(achievements);
        userService.createUser(user);
        return user;
    }

    private String doLogin(User user, Model model) {
        List<Task> processTask = taskService.findProcessTasks(user);
        List<Task> clientTask = taskService.findClientTasks(user);
        List<Task> techTask = taskService.findTechTasks(user);
        List<Task> commTask = taskService.findCommTasks(user);

        model.addAttribute("process", setTaskStatusForUser(processTask, user, TaskType.PROCESS));
        model.addAttribute("client", setTaskStatusForUser(clientTask, user, TaskType.CLIENT));
        model.addAttribute("tech", setTaskStatusForUser(techTask, user, TaskType.TECH));
        model.addAttribute("comm", setTaskStatusForUser(commTask, user, TaskType.COMM));
        model.addAttribute("user", user);
        return "main-page";
    }

    private List<UserTaskForm> setTaskStatusForUser(List<Task> tasks, User user, String type) {
        List<UserTaskForm> taskLists = new ArrayList<UserTaskForm>();
        for (Task task : tasks) {
            taskLists.add(new UserTaskForm(task, ""));
        }
        if (user.getInProcess() != null) {
            for (UserTaskForm taskForm : taskLists) {
                if (user.getInProcess().contains(taskForm.getTask().getId())) {
                    taskForm.setStatus("inProcess");
                }
            }
        }

        if (user.getFinished() != null) {
            for (UserTaskForm taskForm : taskLists) {
                if (user.getFinished().contains(taskForm.getTask().getId())) {
                    taskForm.setStatus("finished");
                }
            }
        }
        return taskLists;
    }
}
