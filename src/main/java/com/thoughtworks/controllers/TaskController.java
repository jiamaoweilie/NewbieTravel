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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
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
        if (result.hasErrors()) {
            model.addAttribute("error", "Please check your input.");
            return "task";
        }
        taskService.addTask(task);
        model.addAttribute("message", "Successful add a task.");
        return "task";
    }

    @RequestMapping(value = "/details/{id}", method = RequestMethod.GET)
    public String showTaskDetails(@PathVariable("id") String taskId, Model model) {
        if (!isTaskExist(taskId)) {
            model.addAttribute("error", "We can not find this task.");
        }
        model.addAttribute("task", taskService.findTaskById(taskId));
        return "light-box";
    }

    @RequestMapping(value = "/accepted/{id}", method = RequestMethod.POST)
    public String acceptTask(@PathVariable("id") String taskId, HttpSession httpSession, Model model) {
        String userId = (String) httpSession.getAttribute("userId");
        if (!isUserLogin(userId)) {
            model.addAttribute("error", "Please login.");
            return "main-page";
        }
        if (!isTaskExist(taskId)) {
            model.addAttribute("error", "We can not find this task.");
            return "main-page";
        }
        User user = userService.findById(userId);
        List<String> inProcess = user.getInProcess() == null ? new ArrayList<String>() : user.getInProcess();
        List<String> finished = user.getFinished() == null ? new ArrayList<String>() : user.getFinished();
        if (inProcess.contains(taskId)) {
            model.addAttribute("error", "This task is already in process.");
            return "main-page";
        }
        if (finished.contains(taskId)) {
            model.addAttribute("error", "This task is already finished, we can not move it to in process.");
            return "main-page";
        }
        inProcess.add(taskId);
        user.setInProcess(inProcess);
        userService.updateUser(user);
        return "main-page";
    }

    private boolean isTaskExist(String taskId) {
        return null != taskService.findTaskById(taskId);
    }

    private boolean isUserLogin(String userId) {
        return null != userService.findById(userId);
    }

    @RequestMapping(value = "/finished/{id}", method = RequestMethod.POST)
    public String finishTask(@PathVariable("id") String taskId, HttpSession httpSession, Model model) {
        String userId = (String) httpSession.getAttribute("userId");
        if (!isUserLogin(userId)) {
            model.addAttribute("error", "Please login.");
            return "main-page";
        }
        if (!isTaskExist(taskId)) {
            model.addAttribute("error", "We can not find this task.");
            return "main-page";
        }
        User user = userService.findById(userId);
        List<String> inProcess = user.getInProcess() == null ? new ArrayList<String>() : user.getInProcess();
        List<String> finished = user.getFinished() == null ? new ArrayList<String>() : user.getFinished();
        if (!inProcess.contains(taskId)) {
            model.addAttribute("error", "This task is not in process, we can not move it to finished.");
            return "main-page";
        }
        if(finished.contains(taskId)) {
            model.addAttribute("error", "This task is already finished.");
        }
        inProcess.remove(inProcess.indexOf(taskId));
        user.setInProcess(inProcess);
        finished.add(taskId);
        user.setFinished(finished);
        userService.updateUser(user);

        return "main-page";
    }
}
