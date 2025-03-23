package com.songlyricstrend.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "filteredgseg_lyriccn_synonym")
public class FilteredGSegLyricCN_Synonym extends BaseFilteredEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 自增主键
    private Long id;  // 主键字段

    // Getters and Setters for the 'id' field
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
