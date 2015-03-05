package com.thoughtworks.controllers;

import com.thoughtworks.controllers.forms.UserTaskForm;
import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;
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
import java.util.List;
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
            HttpSession httpSession,
            Model model) {

        if(!EMAIL_PATTEN.matcher(email).matches()) {
            model.addAttribute("error", "User email address is not valid.");
            return "login";
        }

        User user = userService.findByEmail(email);
        if(null == user) {
            user = new User(email);
            userService.createUser(user);
            httpSession.setAttribute("userId", user.getId());
        }else {
            httpSession.setAttribute("userId", user.getId());
        }
        List<Task> tasks = taskService.findTask();
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
