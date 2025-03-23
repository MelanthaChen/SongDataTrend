package com.songlyricstrend.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "abstracted_final")
public class AbstractedFinal {

    @Id
    private Long id;

    @Column(name = "Year_Filled")
    private Double yearFilled;

    @Column(name = "singer")
    private String singer;

    @Column(name = "singerType")
    private String singerType;

    @Column(name = "region")
    private String region;

    @Column(name = "Segmented_Lyric")
    private String segmentedLyric;

    @Column(name = "Removed_Stop_Words")
    private String removedStopWords;

    @Column(name = "Segmented_Lyric_with_Term")
    private String segmentedLyricWithTerm;

    @Column(name = "Removed_Stop_Words_with_Term")
    private String removedStopWordsWithTerm;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getYearFilled() {
        return yearFilled;
    }

    public void setYearFilled(Double yearFilled) {
        this.yearFilled = yearFilled;
    }

    public String getSinger() {
        return singer;
    }

    public void setSinger(String singer) {
        this.singer = singer;
    }

    public String getSingerType() {
        return singerType;
    }

    public void setSingerType(String singerType) {
        this.singerType = singerType;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getSegmentedLyric() {
        return segmentedLyric;
    }

    public void setSegmentedLyric(String segmentedLyric) {
        this.segmentedLyric = segmentedLyric;
    }

    public String getRemovedStopWords() {
        return removedStopWords;
    }

    public void setRemovedStopWords(String removedStopWords) {
        this.removedStopWords = removedStopWords;
    }

    public String getSegmentedLyricWithTerm() {
        return segmentedLyricWithTerm;
    }

    public void setSegmentedLyricWithTerm(String segmentedLyricWithTerm) {
        this.segmentedLyricWithTerm = segmentedLyricWithTerm;
    }

    public String getRemovedStopWordsWithTerm() {
        return removedStopWordsWithTerm;
    }

    public void setRemovedStopWordsWithTerm(String removedStopWordsWithTerm) {
        this.removedStopWordsWithTerm = removedStopWordsWithTerm;
    }
}
