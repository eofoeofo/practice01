package com.koreait.practice01.user;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class UserService {

    @Autowired
    private HttpSession session;

    @Autowired
    private UserMapper mapper;

    public int insUser(UserEntity param) {
        String cryptPw = BCrypt.hashpw(param.getUpw(), BCrypt.gensalt());
        param.setUpw(cryptPw);
        return mapper.insUser(param);
    }

    public String login(UserEntity param) {
        UserEntity result = mapper.selUser(param);
        if(result == null) { // 아이디 없음
            return "/user/login?err=1";
        } else if(BCrypt.checkpw(param.getUpw(), result.getUpw())) { // 로그인 성공
            result.setUpw(null); // 로그인 성공 후 비밀번호 NULL 처리
            // session 처리
            session.setAttribute("loginUser",result);
            return "/board/list";
        } else { // 비밀번호 틀림
            return "/user/login?err=2";
        }
    }
}
