package com.thoughtworks.controllers;

import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;
import com.thoughtworks.services.TaskService;
import com.thoughtworks.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping(value = "/task")
public class TaskController {
    @Autowired
    TaskService taskService;
    @Autowired
    UserService userService;

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String showAddTaskPage() {
        return "task";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addTask(@Valid @ModelAttribute("task") Task task,
                          BindingResult result,
                          Model model) {
        if(result.hasErrors()) {
            model.addAttribute("error", "Please check your input.");
            return "task";
        }
        taskService.addTask(task);
        model.addAttribute("message", "Successful add a task.");
        return "task";
    }
    
    @RequestMapping(value = "/accepted", method = RequestMethod.POST)
    public String acceptTask(String taskId, HttpSession httpSession) {
        String userId = (String) httpSession.getAttribute("userId");
        User user = userService.findById(userId);
        if (null != user) {
            List<String> inProcess = user.getInProcess();
            inProcess.add(taskId);
            user.setInProcess(inProcess);
            userService.updateUser(user);
        }
        return "main-page";
    }

    @RequestMapping(value = "/finished", method = RequestMethod.POST)
    public String finishTask(String taskId, HttpSession httpSession) {
        String userId = (String) httpSession.getAttribute("userId");
        User user = userService.findById(userId);
        if (null != user) {
            List<String> inProcess = user.getInProcess();
            List<String> finished = user.getFinished();
            inProcess.remove(inProcess.indexOf(taskId));
            user.setInProcess(inProcess);
            finished.add(taskId);
            user.setFinished(finished);
            userService.updateUser(user);
        }
        return "main-page";
    }
}
