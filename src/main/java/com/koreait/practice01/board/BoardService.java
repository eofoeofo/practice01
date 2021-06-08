package com.koreait.practice01.board;

import com.koreait.practice01.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class BoardService {
    @Autowired
    private BoardMapper mapper;
    @Autowired
    private HttpSession session;

    public List<BoardDomain> selBoardList() {
        return mapper.selBoardList();
    }

    public int insBoard(BoardDomain param) {
        UserEntity loginUser = (UserEntity)session.getAttribute("loginUser");
        param.setIuser(loginUser.getIuser());
        return mapper.insBoard(param);
    }
}
