package com.koreait.practice01.board;

import com.koreait.practice01.MyUtils;
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
    @Autowired
    private MyUtils myUtils;

    public List<BoardDomain> selBoardList() {
        return mapper.selBoardList();
    }

    public int insBoard(BoardDomain param) {
        param.setIuser(myUtils.getLoginUserPk());
        return mapper.insBoard(param);
    }

    public BoardDomain selBoardDetail(BoardDTO param) {
        return mapper.selBoardDetail(param);
    }

    public int delBoard(BoardDTO param) {
        param.setIuser(myUtils.getLoginUserPk());
        return mapper.delBoard(param);
    }

    public int updBoard(BoardDomain param) {
        param.setIuser(myUtils.getLoginUserPk());
        return mapper.updBoard(param);
    }
}
