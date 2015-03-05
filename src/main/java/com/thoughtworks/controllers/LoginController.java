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
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
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
        model.addAttribute("user", user);
        model.addAttribute("tasks", tasks);
        model.addAttribute("test", user.getId());
        return "main-page";
    }
}
