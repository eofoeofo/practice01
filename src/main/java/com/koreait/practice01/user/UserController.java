package com.koreait.practice01.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @RequestMapping("/join")
    public String join() { return "user/join"; }

    @PostMapping("/join")
    public String join(UserEntity param) {
        service.insUser(param);
        return "redirect:/user/login";
    }

    @GetMapping("/login")
    public String login(@RequestParam(value="err", defaultValue = "0") int err, Model model) {
        switch (err) {
            case 1:
                model.addAttribute("errMsg","아이디를 확인해 주세요.");
                System.out.println("err : " + err);
                break;
            case 2:
                model.addAttribute("errMsg","비밀번호를 확인해 주세요.");
                System.out.println("err : " + err);
                break;
        }
        return "user/login";
    }
    @PostMapping("/login")
    public String login(UserEntity param) { return "redirect:"+service.login(param); }
}
