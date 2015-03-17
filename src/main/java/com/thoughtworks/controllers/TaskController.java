package com.thoughtworks.controllers;

import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;
import com.thoughtworks.services.TaskService;
import com.thoughtworks.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.*;

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
                          @RequestParam(value = "available_team") Set<String> availableTeam,
                          @RequestParam(value = "available_role") Set<String> availableRole,
                          @RequestParam(value = "level") String level,
                          BindingResult result,
                          Model model) {
        if (result.hasErrors()) {
            model.addAttribute("error", "Please check your input.");
            return "task";
        }
        task.setAvailableForRole(availableRole);
        task.setAvailableForTeam(availableTeam);
        task.setLevel(level);
        taskService.addTask(task);
        model.addAttribute("message", "Successful add a task.");
        return "task";
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
    @ResponseBody
    public Map<String, Object> finishTask(@PathVariable("id") String taskId,
                           @RequestParam(value = "userId") String userId,
                           HttpSession httpSession, Model model) {
        Map<String, Object> responseMap = new HashMap<String, Object>();
        if (!isTaskExist(taskId)) {
//            model.addAttribute("error", "We can not find this task.");
            responseMap.put("error", "We can not find this task.");
            return responseMap;
        }
        User user = userService.findById(userId);
        Task task = taskService.findTaskById(taskId);
        List<String> inProcess = user.getInProcess() == null ? new ArrayList<String>() : user.getInProcess();
        List<String> finished = user.getFinished() == null ? new ArrayList<String>() : user.getFinished();
        if (!inProcess.contains(taskId)) {
//            model.addAttribute("error", "This task is not in process, we can not move it to finished.");
            responseMap.put("error", "This task is not in process, we can not move it to finished.");
            return responseMap;
        }
        if(finished.contains(taskId)) {
//            model.addAttribute("error", "This task is already finished.");
            responseMap.put("error", "This task is already finished.");
            return responseMap;
        }
        inProcess.remove(inProcess.indexOf(taskId));
        user.setInProcess(inProcess);
        finished.add(taskId);
        user.setFinished(finished);
        userService.updateUser(user);
        responseMap.put("user", user);
        responseMap.put("task", task);

        return responseMap;
    }

    @RequestMapping(value = "/rollback/{id}", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> rollbackTask(@PathVariable("id") String taskId,
                             @RequestParam("userId") String userId,
                             Model model) {
        Map<String, Object> responseMap = new HashMap<String, Object>();
        if (!isTaskExist(taskId)) {
//            model.addAttribute("error", "We can not find this task.");
            responseMap.put("error", "We can not find this task.");
            return responseMap;
        }
        User user = userService.findById(userId);
        Task task = taskService.findTaskById(taskId);
        List<String> inProcess = user.getInProcess() == null ? new ArrayList<String>() : user.getInProcess();
        List<String> finished = user.getFinished() == null ? new ArrayList<String>() : user.getFinished();
        if (!finished.contains(taskId)) {
//            model.addAttribute("error", "This task is not finished, we can not move it to in-progress.");
            responseMap.put("error", "This task is not finished, we can not move it to in-progress.");
            return responseMap;
        }
        if(inProcess.contains(taskId)) {
//            model.addAttribute("error", "This task is still in-progress.");
            responseMap.put("error", "This task is still in-progress.");
            return responseMap;
        }
        if(inProcess.size() >= 3) {
//            model.addAttribute("error", "This user is already working on 3 tasks.");
            responseMap.put("error", "This user is already working on 3 tasks.");
            return responseMap;
        }
        finished.remove(finished.indexOf(taskId));
        user.setFinished(finished);
        inProcess.add(taskId);
        user.setInProcess(inProcess);
        userService.updateUser(user);


        responseMap.put("user", user);
        responseMap.put("task", task);

        return responseMap;
    }
}
