package com.thoughtworks.controllers;

import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;
import com.thoughtworks.entities.constants.Achievement;
import com.thoughtworks.entities.constants.TaskType;
import com.thoughtworks.services.TaskService;
import com.thoughtworks.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.HashSet;
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

    @RequestMapping(value = "/main-page", method = RequestMethod.GET)
    public String gotoMainPage(@RequestParam(value = "userId", required = false) String userId,
                               HttpSession httpSession) {
        String sessionUid = (String) httpSession.getAttribute("userId");
        if (userId != null && !userId.equals(sessionUid))
            return "login-error-page";
        return "main-page";
    }

    @RequestMapping(value = "main-page/init-info", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getMainPageInfo(HttpSession httpSession) {
        Map<String, Object> result = new HashMap<String, Object>();

        User user = userService.findById((String) httpSession.getAttribute("userId"));
        if (user == null) {
            result.put("errorRedirect", "login");
            return result;
        }
        List<Task> tasks = taskService.findTaskForUser(user);

        result.put("user", user);
        result.put("tasks", tasks);
        result.put("isNewUser", (Boolean)httpSession.getAttribute("isNewUser"));

        return result;
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String showLoginPage() {
        return "login";
    }

    @RequestMapping(value = "/login/new", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> registerNewUser(
            @RequestParam(value = "email") String email,
            @RequestParam(value = "team", required = false) String team,
            @RequestParam(value = "role", required = false) String role,
            HttpSession httpSession) {
        Map<String, Object> result = new HashMap<String, Object>();

        if (!EMAIL_PATTEN.matcher(email).matches()) {
            result.put("error", "User email address is not valid.");
            return result;
        }

        User user = userService.findByEmail(email);
        if (null == user && null != team && null != role) {
            user = createNewUser(email, team, role);
            httpSession.setAttribute("userId", user.getId());
            httpSession.setAttribute("isNewUser", true);
            result.put("goto", "main-page");
            result.put("userId", user.getId());
        }
        return result;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody Map<String, Object> login(
            @RequestParam(value = "email") String email,
            HttpSession httpSession) {
        Map<String, Object> result = new HashMap<String, Object>();

        if (!EMAIL_PATTEN.matcher(email).matches()) {
            result.put("error", "User email address is not valid.");
            return result;
        }

        User user = userService.findByEmail(email);
        if (null == user) {
            result.put("isNewUser", true);
            result.put("email", email);
            return result;
        }
        httpSession.setAttribute("userId", user.getId());
        httpSession.setAttribute("isNewUser", false);

        result.put("goto", "main-page");
        result.put("userId", user.getId());
        return result;
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

}
