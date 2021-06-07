package com.koreait.practice01.user;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("UserEntity")
public class UserEntity {
    private int iuser;
    private String uid;
    private String upw;
    private String unm;
    private int gender;
    private String regdt;
    private String profileImg;
}
