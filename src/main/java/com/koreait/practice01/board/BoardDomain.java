package com.koreait.practice01.board;

import lombok.Data;

@Data
public class BoardDomain extends BoardEntity {
    private String writerNm;
    private String profileImg;
}
