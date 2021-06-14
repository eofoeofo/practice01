package com.koreait.practice01.board;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    List<BoardDomain> selBoardList();
    int insBoard(BoardDomain param);
    BoardDomain selBoardDetail(BoardDTO param);
    int delBoard(BoardDTO param);
    int updBoard(BoardDomain param);
}
