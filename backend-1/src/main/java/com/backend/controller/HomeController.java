package com.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class HomeController {

	@RequestMapping("auth/login/form")
	public String login() {
		
		return "auth/login";
	}
	
	@RequestMapping("auth/login/success")
	public String success(Model model) {
		model.addAttribute("message","đăng nhập thành công");
		return "forward:/auth/login/form";
	}
	@RequestMapping("auth/login/error")
	public String error(Model model) {
		model.addAttribute("message","đăng nhập ko thành công");
		return "forward:/auth/login/form";
	}
	@RequestMapping("auth/logoff/success")
	public String logoff(Model model) {
		model.addAttribute("message","đăng xuất thành công");
		return "forward:/auth/login/form";
	}
	
	
    @RequestMapping("home/index")
    public String index(Model model, HttpServletRequest request) {
        model.addAttribute("message", "this is home page");
        model.addAttribute("request", request); // Add request to the model
        return "home/index";
    }

    @RequestMapping("home/about")
    public String about(Model model, HttpServletRequest request) {
        model.addAttribute("message", "this is introduction page");
        model.addAttribute("request", request); // Add request to the model
        return "home/index";
    }
}
