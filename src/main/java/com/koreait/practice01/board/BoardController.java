package com.koreait.practice01.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/board")
public class BoardController {
    @Autowired
    private BoardService service;

    @GetMapping("/list")
    public String selBoardList(Model model) {
        List<BoardDomain> list = service.selBoardList();
        model.addAttribute("list",list);
        return "board/list";
    }

    @GetMapping("/write")
    public String insBoard() {
        return "board/write";
    }

    @PostMapping("/write")
    public String insBoard(BoardDomain param) {
        param.setIuser(param.getIuser());
        service.insBoard(param);
        return "redirect:/board/list";
    }

    @GetMapping("/detail")
    public String detail(BoardDTO param, Model model) {
        model.addAttribute("data",service.selBoardDetail(param));
        return "board/detail";
    }

    @GetMapping("/delete")
    public String delete(BoardDTO param) {
        service.delBoard(param);
        return "redirect:/board/list";
    }

    @GetMapping("/update")
    public String update() {
        return "board/update";
    }
    @PostMapping("/update")
    public String update(BoardDomain param,Model model) {
        model.addAttribute("data",service.updBoard(param));
        return "redirect:/board/list";
    }
}
