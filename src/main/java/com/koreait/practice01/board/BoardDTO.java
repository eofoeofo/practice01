package com.koreait.practice01.board;

import lombok.Data;

@Data
public class BoardDTO {
    private int iboard;
    private int startIdx;
    private int recordCnt;
    private int searchType;
    private String searchText;
}
