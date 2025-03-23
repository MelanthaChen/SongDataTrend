package com.songlyricstrend.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class BaseFreqEntity {

    @Column(name = "Word")
    private String word;

    @Column(name = "Year")
    private Integer year;

    @Column(name = "Frequency")
    private Integer freq;

    @Column(name = "Number_of_Song_Used")
    private Integer songUsed;

    @Column(name = "ID_List")
    private String ids;

    @Column(name = "male_Word_Count")
    private Integer mwc;

    @Column(name = "male_Count")
    private Integer mc;

    @Column(name = "male_Unique_singer_Count")
    private Integer musc;

    @Column(name = "female_Word_Count")
    private Integer fwc;

    @Column(name = "female_Count")
    private Integer fc;

    @Column(name = "female_Unique_singer_Count")
    private Integer fusc;

    @Column(name = "group_Word_Count")
    private Integer gwc;

    @Column(name = "group_Count")
    private Integer gc;

    @Column(name = "group_Unique_singer_Count")
    private Integer gusc;

    @Column(name = "nan_Word_Count")
    private Integer nwc;

    @Column(name = "nan_Count")
    private Integer nc;

    @Column(name = "nan_Unique_singer_Count")
    private Integer nusc;

    @Column(name = "Taiwan_Word_Count")
    private Integer twwc;

    @Column(name = "Taiwan_Count")
    private Integer twc;

    @Column(name = "Taiwan_Unique_singer_Count")
    private Integer twusc;

    @Column(name = "China-Main_Word_Count")
    private Integer cnwc;

    @Column(name = "China-Main_Count")
    private Integer cnc;

    @Column(name = "China-Main_Unique_singer_Count")
    private Integer cnusc;

    @Column(name = "Xinjiang_Word_Count")
    private Integer xjwc;

    @Column(name = "Xinjiang_Count")
    private Integer xjc;

    @Column(name = "Xinjiang_Unique_singer_Count")
    private Integer xjusc;

    @Column(name = "Hong_Kong_Word_Count")
    private Integer hkwc;

    @Column(name = "Hong_Kong_Count")
    private Integer hkc;

    @Column(name = "Hong_Kong_Unique_singer_Count")
    private Integer hkusc;

    @Column(name = "Xizang_Word_Count")
    private Integer xzwc;

    @Column(name = "Xizang_Count")
    private Integer xzc;

    @Column(name = "Xizang_Unique_singer_Count")
    private Integer xzusc;

    @Column(name = "Singapore_Word_Count")
    private Integer spwc;

    @Column(name = "Singapore_Count")
    private Integer spc;

    @Column(name = "Singapore_Unique_singer_Count")
    private Integer spusc;

    @Column(name = "Malaysia_Word_Count")
    private Integer mswc;

    @Column(name = "Malaysia_Count")
    private Integer msc;

    @Column(name = "Malaysia_Unique_singer_Count")
    private Integer msusc;

    @Column(name = "Macao_Word_Count")
    private Integer amwc;

    @Column(name = "Macao_Count")
    private Integer amc;

    @Column(name = "Macao_Unique_singer_Count")
    private Integer amusc;

    @Column(name = "Guangdong_Word_Count")
    private Integer gdwc;

    @Column(name = "Guangdong_Count")
    private Integer gdc;

    @Column(name = "Guangdong_Unique_singer_Count")
    private Integer gdusc;

    @Column(name = "Neimeng_Word_Count")
    private Integer nmwc;

    @Column(name = "Neimeng_Count")
    private Integer nmc;

    @Column(name = "Neimeng_Unique_singer_Count")
    private Integer nmusc;

    // 
    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }
    
    public Integer getyear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getFreq() {
        return freq;
    }

    public void setFreq(Integer freq) {
        this.freq = freq;
    }

    public Integer getSongUsed() {
        return songUsed;
    }

    public void setSongUsed(Integer songUsed) {
        this.songUsed = songUsed;
    }

    public String getIDs() {
        return ids;
    }

    public void setIDs(String ids) {
        this.ids = ids;
    }

    public Integer getMaleWordCount() {
        return mwc;
    }

    public void setMaleWordCount(Integer mwc) {
        this.mwc = mwc;
    }

    public Integer getMaleCount() {
        return mc;
    }

    public void setMaleCount(Integer mc) {
        this.mc = mc;
    }

    public Integer getMaleUniquesingerCount() {
        return musc;
    }

    public void setMaleUniquesingerCount(Integer musc) {
        this.musc = musc;
    }

    public Integer getFemaleWordCount() {
        return fwc;
    }

    public void setFemaleWordCount(Integer fwc) {
        this.fwc = fwc;
    }

    public Integer getFemaleCount() {
        return fc;
    }

    public void setFemaleCount(Integer fc) {
        this.fc = fc;
    }

    public Integer getFemaleUniqueSingerCount() {
        return fusc;
    }

    public void setFemaleUniqueSingerCount(Integer fusc) {
        this.fusc = fusc;
    }

    public Integer getGroupWordCount() {
        return gwc;
    }

    public void setGroupWordCount(Integer gwc) {
        this.gwc = gwc;
    }

    public Integer getGroupCount() {
        return gc;
    }

    public void setGroupCount(Integer gc) {
        this.gc = gc;
    }

    public Integer getGroupUniqueSingerCount() {
        return gusc;
    }

    public void setGroupUniqueSingerCount(Integer gusc) {
        this.gusc = gusc;
    }

    public Integer getNanWordCount() {
        return nwc;
    }

    public void setNanWordCount(Integer nwc) {
        this.nwc = nwc;
    }

    public Integer getNanCount() {
        return nc;
    }

    public void setNanCount(Integer nc) {
        this.nc = nc;
    }

    public Integer getNanUniqueSingerCount() {
        return nusc;
    }

    public void setNanUniqueSingerCount(Integer nusc) {
        this.nusc = nusc;
    }

    public Integer getTaiwanWordCount() {
        return twwc;
    }

    public void setTaiwanWordCount(Integer twwc) {
        this.twwc = twwc;
    }

    public Integer getTaiwanCount() {
        return twc;
    }

    public void setTaiwanCount(Integer twc) {
        this.twc = twc;
    }

    public Integer getTaiwanUniqueSingerCount() {
        return twusc;
    }

    public void setTaiwanUniqueSingerCount(Integer twusc) {
        this.twusc = twusc;
    }

    public Integer getChinaMainWordCount() {
        return cnwc;
    }

    public void setChinaMainWordCount(Integer cnwc) {
        this.cnwc = cnwc;
    }

    public Integer getChinaMainCount() {
        return cnc;
    }

    public void setChinaMainCount(Integer cnc) {
        this.cnc = cnc;
    }

    public Integer getChinaMainUniqueSingerCount() {
        return cnusc;
    }

    public void setChinaMainUniqueSingerCount(Integer cnusc) {
        this.cnusc = cnusc;
    }

    public Integer getXinjiangWordCount() {
        return xjwc;
    }

    public void setXinjiangWordCount(Integer xjwc) {
        this.xjwc = xjwc;
    }

    public Integer getXinjiangCount() {
        return xjc;
    }

    public void setXinjiangCount(Integer xjc) {
        this.xjc = xjc;
    }

    public Integer getXinjiangUniqueSingerCount() {
        return xjusc;
    }

    public void setXinjiangUniqueSingerCount(Integer xjusc) {
        this.xjusc = xjusc;
    }

    public Integer getHongKongWordCount() {
        return hkwc;
    }

    public void setHongKongWordCount(Integer hkwc) {
        this.hkwc = hkwc;
    }

    public Integer getHongKongCount() {
        return hkc;
    }

    public void setHongKongCount(Integer hkc) {
        this.hkc = hkc;
    }

    public Integer getHongKongUniqueSingerCount() {
        return hkusc;
    }

    public void setHongKongUniqueSingerCount(Integer hkusc) {
        this.hkusc = hkusc;
    }

    public Integer getXizangWordCount() {
        return xzwc;
    }

    public void setXizangWordCount(Integer xzwc) {
        this.xzwc = xzwc;
    }

    public Integer getXizangCount() {
        return xzc;
    }

    public void setXizangCount(Integer xzc) {
        this.xzc = xzc;
    }

    public Integer getXizangUniqueSingerCount() {
        return xzusc;
    }

    public void setXizangUniqueSingerCount(Integer xzusc) {
        this.xzusc = xzusc;
    }

    public Integer getSingaporeWordCount() {
        return spwc;
    }

    public void setSingaporeWordCount(Integer spwc) {
        this.spwc = spwc;
    }

    public Integer getSingaporeCount() {
        return spc;
    }

    public void setSingaporeCount(Integer spc) {
        this.spc = spc;
    }

    public Integer getSingaporeUniqueSingerCount() {
        return spusc;
    }

    public void setSingaporeUniqueSingerCount(Integer spusc) {
        this.spusc = spusc;
    }

    public Integer getMalaysiaWordCount() {
        return mswc;
    }

    public void setMalaysiaWordCount(Integer mswc) {
        this.mswc = mswc;
    }

    public Integer getMalaysiaCount() {
        return msc;
    }

    public void setMalaysiaCount(Integer msc) {
        this.msc = msc;
    }

    public Integer getMalaysiaUniqueSingerCount() {
        return msusc;
    }

    public void setMalaysiaUniqueSingerCount(Integer msusc) {
        this.msusc = msusc;
    }

    public Integer getMacaoWordCount() {
        return amwc;
    }

    public void setMacaoWordCount(Integer amwc) {
        this.amwc = amwc;
    }

    public Integer getMacaoCount() {
        return amc;
    }

    public void setMacaoCount(Integer amc) {
        this.amc = amc;
    }

    public Integer getMacaoUniqueSingerCount() {
        return amusc;
    }

    public void setMacaoUniqueSingerCount(Integer amusc) {
        this.amusc = amusc;
    }

    public Integer getGuangdongWordCount() {
        return gdwc;
    }

    public void setGuangdongWordCount(Integer gdwc) {
        this.gdwc = gdwc;
    }

    public Integer getGuangdongCount() {
        return gdc;
    }

    public void setGuangdongCount(Integer gdc) {
        this.gdc = gdc;
    }

    public Integer getGuangdongUniqueSingerCount() {
        return gdusc;
    }

    public void setGuangdongUniqueSingerCount(Integer gdusc) {
        this.gdusc = gdusc;
    }

    public Integer getNeimengWordCount() {
        return nmwc;
    }

    public void setNeimengWordCount(Integer nmwc) {
        this.nmwc = nmwc;
    }

    public Integer getNeimengCount() {
        return nmc;
    }

    public void setNeimengCount(Integer nmc) {
        this.nmc = nmc;
    }

    public Integer getNeimengUniqueSingerCount() {
        return nmusc;
    }

    public void setNeimengUniqueSingerCount(Integer nmusc) {
        this.nmusc = nmusc;
    }

}
