package com.thoughtworks.controllers;

import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;
import com.thoughtworks.services.TaskService;
import com.thoughtworks.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wbzhao on 15-3-16.
 */
@Controller
@RequestMapping("/")
public class AdminController {

    @Autowired
    UserService userService;
    @Autowired
    TaskService taskService;

    @RequestMapping(value = "/admin-login", method = RequestMethod.GET)
    public String showAdminLogin() {
        return "admin-login";
    }

    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String showAdminPage(Model model) {
        List<User> userList = userService.findAll();
        List<Task> taskList = taskService.findTask(); // find all tasks in the mongoDB
        model.addAttribute("users", userList);
        model.addAttribute("tasks", taskList);
        return "admin-page";
    }

    @RequestMapping(value = "/admin/tasks", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getTasks() {
        Map<String, Object> result = new HashMap<String, Object>();

        List<Task> tasks = taskService.findTask();
        result.put("tasks", tasks);

        return result;
    }

    @RequestMapping(value = "/admin/users", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getUsers() {
        Map<String, Object> result = new HashMap<String, Object>();

        List<User> users = userService.findAll();
        result.put("users", users);

        return result;
    }

//    @RequestMapping(value = "/admin/addtask", method = RequestMethod.GET)
//    public String showAddTaskPage() {
//        return "task";
//    }

//    @RequestMapping(value = "/admin/addtask", method = RequestMethod.POST)
//    public String addTask(@Valid @ModelAttribute("task") Task task,
//                          @RequestParam(value = "available_team") Set<String> availableTeam,
//                          @RequestParam(value = "available_role") Set<String> availableRole,
//                          @RequestParam(value = "level") String level,
//                          BindingResult result,
//                          Model model) {
//        if (result.hasErrors()) {
//            model.addAttribute("error", "Please check your input.");
//            return "task";
//        }
//        task.setAvailableForRole(availableRole);
//        task.setAvailableForTeam(availableTeam);
//        task.setLevel(level);
//        taskService.addTask(task);
//        model.addAttribute("message", "Successful add a task.");
//        List<User> userList = userService.findAll();
//        List<Task> taskList = taskService.findTask(); // find all tasks in the mongoDB
//        model.addAttribute("users", userList);
//        model.addAttribute("tasks", taskList);
//        return "task";
//    }
}
