package com.songlyricstrend.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Map;

@Service
public class DataFetchService {

    @Autowired
    private EntityManager entityManager;
    private final List<String> availableFiles = List.of(
            "AbstractedFinal", // Updated to match DB table case
            "FilteredGRermStop",
            "FilteredGRemStop_Synonym",
            "FilteredGRemStopCN",
            "FilteredGRemStopCN_Synonym",
            "FilteredGSegLyric",
            "FilteredGSegLyric_Synonym",
            "FilteredGSeg_LyricCN",
            "FilteredGSegLyricCN_Synonym",
            "RemovedStopWordsFrequency",
            "RemovedStopWordsFrequencyChina",
            "SegmentedLyricFrequency",
            "SegmentedLyricFrequencyChina");

    public List<String> getAvailableFiles() {
        return availableFiles;
    }

    public List<Object> fetchData(String file1, String file2) {
        // Fetch data from file1
        String query1 = "SELECT * FROM " + file1;
        Query nativeQuery1 = entityManager.createNativeQuery(query1);
        @SuppressWarnings("unchecked")
        List<Object> result1 = (List<Object>) nativeQuery1.getResultList();
    
        // Fetch data from file2
        String query2 = "SELECT * FROM " + file2;
        Query nativeQuery2 = entityManager.createNativeQuery(query2);
        @SuppressWarnings("unchecked")
        List<Object> result2 = (List<Object>) nativeQuery2.getResultList();
    
        // Fetch data from AbstractedFinal
        String query3 = "SELECT * FROM AbstractedFinal";
        Query nativeQuery3 = entityManager.createNativeQuery(query3);
        @SuppressWarnings("unchecked")
        List<Object> result3 = (List<Object>) nativeQuery3.getResultList();
    
        // Combine the results
        List<Object> combinedResult = new ArrayList<>();
        combinedResult.addAll(result1);
        combinedResult.addAll(result2);
        combinedResult.addAll(result3);
    
        return combinedResult;
    }

    @SuppressWarnings("unchecked")
    public List<String> getWordByRank(String fileName, int rankStart, int rankEnd) {
        if (rankStart <= 0 || rankEnd < rankStart) {
            throw new IllegalArgumentException("Rank range is invalid.");
        }
        int limit = rankEnd - rankStart + 1;
        int offset = rankStart - 1;

        String query = "SELECT Word FROM " + fileName + " ORDER BY Frequency DESC LIMIT " + limit + " OFFSET " + offset;
        System.out.println("Fetching words from " + rankStart + " to " + rankEnd);
        System.out.println("Fetching words from file: " + fileName);

        Query nativeQuery = entityManager.createNativeQuery(query);
        
        return nativeQuery.getResultList();
    }

    @SuppressWarnings({ "unchecked", "null" })
    public List<Map<String, Object>> fetchWordData(String file1, String words, Integer yearStart, Integer yearEnd, String region, String singerType) {
        // Split the words by comma
        String[] wordArray = words.split(",");

        List<String> selectedColumns = new ArrayList<>(List.of(
            "Word", // Always fetch 'Word'
            "Year", // Always fetch 'Year'
            "Frequency", // Always fetch 'Frequency'
            "`Number of Song Used`", // Always fetch 'Number of Song Used'
            "`ID List`" // Always fetch 'ID List'
        ));

        // Handle singer type and region-specific columns
        if (singerType != null && !singerType.isEmpty()) {
            if (singerType.contains("male")) {
                selectedColumns.add("`male Word Count`");
                selectedColumns.add("`male Count`");
                selectedColumns.add("`male Unique Singer Count`");
            }
            if (singerType.contains("female")) {
                selectedColumns.add("`female Word Count`");
                selectedColumns.add("`female Count`");
                selectedColumns.add("`female Unique Singer Count`");
            }
            if (singerType.contains("group")) {
                selectedColumns.add("`group Word Count`");
                selectedColumns.add("`group Count`");
                selectedColumns.add("`group Unique Singer Count`");
            }
        }

        // If "All" is selected or no specific categories, include all singer types
        if (singerType.contains("All") || selectedColumns.isEmpty()) {
            selectedColumns.addAll(List.of(
                "`male Word Count`", "`male Count`", "`male Unique Singer Count`",
                "`female Word Count`", "`female Count`", "`female Unique Singer Count`",
                "`group Word Count`", "`group Count`", "`group Unique Singer Count`"
            ));
        }

        // Handle region-specific columns
        if (region != null && !region.isEmpty()) {
            if (region.contains("taiwan")) {
                selectedColumns.add("`Taiwan Word Count`");
                selectedColumns.add("`Taiwan Count`");
                selectedColumns.add("`Taiwan Unique Singer Count`");
            }
            if (region.contains("china-main")) {
                selectedColumns.add("`China-Main Word Count`");
                selectedColumns.add("`China-Main Count`");
                selectedColumns.add("`China-Main Unique Singer Count`");
            }
            if (region.contains("hongkong")) {
                selectedColumns.add("`Hong Kong Word Count`");
                selectedColumns.add("`Hong Kong Count`");
                selectedColumns.add("`Hong Kong Unique Singer Count`");
            }
            if (region.contains("singapore")) {
                selectedColumns.add("`Singapore Word Count`");
                selectedColumns.add("`Singapore Count`");
                selectedColumns.add("`Singapore Unique Singer Count`");
            }
            if (region.contains("malaysia")) {
                selectedColumns.add("`Malaysia Word Count`");
                selectedColumns.add("`Malaysia Count`");
                selectedColumns.add("`Malaysia Unique Singer Count`");
            }
            if (region.contains("macao")) {
                selectedColumns.add("`Macao Word Count`");
                selectedColumns.add("`Macao Count`");
                selectedColumns.add("`Macao Unique Singer Count`");
            }
            if (region.contains("xinjiang")) {
                selectedColumns.add("`Xinjiang Word Count`");
                selectedColumns.add("`Xinjiang Count`");
                selectedColumns.add("`Xinjiang Unique Singer Count`");
            }
            if (region.contains("xizang")) {
                selectedColumns.add("`Xizang Word Count`");
                selectedColumns.add("`Xizang Count`");
                selectedColumns.add("`Xizang Unique Singer Count`");
            }
            if (region.contains("guangdong")) {
                selectedColumns.add("`Guangdong Word Count`");
                selectedColumns.add("`Guangdong Count`");
                selectedColumns.add("`Guangdong Unique Singer Count`");
            }
            if (region.contains("neimeng")) {
                selectedColumns.add("`Neimeng Word Count`");
                selectedColumns.add("`Neimeng Count`");
                selectedColumns.add("`Neimeng Unique Singer Count`");
            }
        }

        // If "All" is selected or no specific regions, include all regions
        if (region.contains("All")) {
            selectedColumns.addAll(List.of(
                "`Taiwan Word Count`", "`Taiwan Count`", "`Taiwan Unique Singer Count`",
                "`China-Main Word Count`", "`China-Main Count`", "`China-Main Unique Singer Count`",
                "`Hong Kong Word Count`", "`Hong Kong Count`", "`Hong Kong Unique Singer Count`",
                "`Singapore Word Count`", "`Singapore Count`", "`Singapore Unique Singer Count`",
                "`Malaysia Word Count`", "`Malaysia Count`", "`Malaysia Unique Singer Count`",
                "`Macao Word Count`", "`Macao Count`", "`Macao Unique Singer Count`",
                "`Xinjiang Word Count`", "`Xinjiang Count`", "`Xinjiang Unique Singer Count`",
                "`Xizang Word Count`", "`Xizang Count`", "`Xizang Unique Singer Count`",
                "`Guangdong Word Count`", "`Guangdong Count`", "`Guangdong Unique Singer Count`",
                "`Neimeng Word Count`", "`Neimeng Count`", "`Neimeng Unique Singer Count`"
            ));
        }

        // Build the SQL query dynamically
        StringBuilder queryStr = new StringBuilder("SELECT " + String.join(", ", selectedColumns) + " FROM " + file1 + " WHERE Word IN (");
        queryStr.append(Arrays.stream(wordArray).map(word -> "'" + word.trim() + "'").collect(Collectors.joining(",")) + ")");

        // Add year range if provided
        if (yearStart != null && yearEnd != null) {
            queryStr.append(" AND Year >= :yearStart AND Year <= :yearEnd");
        }

        // Print the generated SQL query (for debugging purposes)
        System.out.println("Generated SQL Query: " + queryStr.toString());

        // Create the query
        Query nativeQuery = entityManager.createNativeQuery(queryStr.toString());

        // Set the year parameters if they are provided
        if (yearStart != null && yearEnd != null) {
            nativeQuery.setParameter("yearStart", yearStart);
            nativeQuery.setParameter("yearEnd", yearEnd);
        }

        // Execute the query and retrieve results
        List<Object[]> queryResults = nativeQuery.getResultList();

        // Convert the query result into a list of maps (key-value pairs for each column)
        List<Map<String, Object>> resultList = new ArrayList<>();
        for (Object[] row : queryResults) {
            Map<String, Object> result = new HashMap<>();
            for (int i = 0; i < selectedColumns.size(); i++) {
                result.put(selectedColumns.get(i), row[i]);
            }
            resultList.add(result);
        }

        return resultList;
    }

    // Fetch the song data only, do the calculation at the front-end with js
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> fetchTotalSongByYear(Integer yearStart, Integer yearEnd) {

        // Base query to count the total number of songs
        String query = "SELECT Year_Filled AS Year, COUNT(id) AS TotalSongs FROM AbstractedFinal WHERE 1=1";
    
        if (yearStart != null) {
            query += " AND Year_Filled >= :yearStart";
        }
    
        if (yearEnd != null) {
            query += " AND Year_Filled <= :yearEnd";
        }

        query += " GROUP BY Year_Filled";
    
        // Execute the query
        Query songQuery = entityManager.createNativeQuery(query);
        if (yearStart != null) songQuery.setParameter("yearStart", yearStart);
        if (yearEnd != null) songQuery.setParameter("yearEnd", yearEnd);
    
        List<Object[]> resultList = songQuery.getResultList();

        System.out.println("Generated SQL Query: " + query);
    
        // Return the count as a Long
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] resultRow : resultList) {
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("Year_Filled", resultRow[0]);
            resultMap.put("TotalSongs", resultRow[1]);
            result.add(resultMap);
        }

        return result;
    };

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getAllSongs() {
        String query = "SELECT id, region, singerType FROM AbstractedFinal";
        Query nativeQuery = entityManager.createNativeQuery(query);
        List<Object[]> queryResults = nativeQuery.getResultList();
    
        List<Map<String, Object>> resultList = new ArrayList<>();
        for (Object[] row : queryResults) {
            Map<String, Object> result = new HashMap<>();
            result.put("id", row[0]);
            result.put("region", row[1]);
            result.put("singerType", row[2]);
            resultList.add(result);
        }
        return resultList;
    }
}