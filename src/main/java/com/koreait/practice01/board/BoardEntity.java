package com.koreait.practice01.board;

import lombok.Data;

@Data
public class BoardEntity {
    private int iboard;
    private int iuser;
    private String title;
    private String ctnt;
    private String regdt;
}
