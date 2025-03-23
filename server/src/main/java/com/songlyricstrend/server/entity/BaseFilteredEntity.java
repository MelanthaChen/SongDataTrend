package com.songlyricstrend.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseFilteredEntity {

    @Column(name = "Word")
    private String word;

    @Column(name = "Year_Range")
    private String yearRange;

    @Column(name = "Frequency")
    private Integer frequency;

    @Column(name = "ID_List")
    private String idList;

    // Getters and Setters

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getYearRange() {
        return yearRange;
    }

    public void setYearRange(String yearRange) {
        this.yearRange = yearRange;
    }

    public Integer getFrequency() {
        return frequency;
    }

    public void setFrequency(Integer frequency) {
        this.frequency = frequency;
    }

    public String getIdList() {
        return idList;
    }

    public void setIdList(String idList) {
        this.idList = idList;
    }
}
