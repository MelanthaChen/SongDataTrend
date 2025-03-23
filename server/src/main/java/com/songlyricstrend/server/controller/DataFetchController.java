package com.songlyricstrend.server.controller;

import java.util.List;
import java.util.Map;
import java.lang.IllegalArgumentException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.songlyricstrend.server.services.DataFetchService;

@RestController
@RequestMapping("/api")
public class DataFetchController {

    @Autowired
    private DataFetchService dataFetchService;

    // Fetch available files
    @GetMapping("/files")
    public ResponseEntity<List<String>> getFiles() {
        List<String> files = dataFetchService.getAvailableFiles();
        return ResponseEntity.ok(files);
    }

    // Fetch data from two files (or more)
    @GetMapping("/fetch-data")
    public ResponseEntity<?> fetchData(
            @RequestParam String file1,
            @RequestParam String file2) {
        try {
            // Fetch data for file1 and file2
            List<?> result = dataFetchService.fetchData(file1, file2);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid file name: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while fetching the data.");
        }
    }

    // Fetch words by rank (for the ranking-based selection in the app)
    @GetMapping("/fetch-ranked-words")
    public ResponseEntity<List<String>> fetchWordsByRank(
            @RequestParam String file2, // file2 refers to the frequency rank table
            @RequestParam int rankStart,
            @RequestParam int rankEnd) {
        try {
            List<String> rankedWords = dataFetchService.getWordByRank(file2, rankStart, rankEnd);
            return ResponseEntity.ok(rankedWords);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Fetch word data based on specific filters (year range, words)
    @GetMapping("/fetch-word-data")
        public ResponseEntity<List<Map<String, Object>>> fetchWordData(
                @RequestParam String file1,
                @RequestParam String words,
                @RequestParam(required = false) Integer yearStart,  // Make yearStart optional
                @RequestParam(required = false) Integer yearEnd,    // Make yearEnd optional
                @RequestParam(required = false) String region,      // Make region optional
                @RequestParam(required = false) String singerType) { // Make singerType optional
            try {
                List<Map<String, Object>> wordData = dataFetchService.fetchWordData(file1, words, yearStart, yearEnd, region, singerType);
                return ResponseEntity.ok(wordData);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(null);
            } catch (Exception e) {
                return ResponseEntity.status(500).body(null);
            }
        }
    
    // New API to fetch total number of songs per year from the `AbstractedFinal` table
    @GetMapping("/fetch-total-songs")
    public ResponseEntity<List<Map<String, Object>>> fetchTotalSongByYear(
        // @RequestParam(required = false) String wordFrequencyData, 
        // Need for fetch the categories with the st and region combined, 
        // tracking the ID List back to the AbstractedFinal to check the categories
        @RequestParam(required = false) Integer yearStart,
        @RequestParam(required = false) Integer yearEnd) {
    try {
        List<Map<String, Object>> songData = dataFetchService.fetchTotalSongByYear(yearStart, yearEnd);
        return ResponseEntity.ok(songData);
    }catch (Exception e) {
        return ResponseEntity.status(500).body(null);
    }
        }

    @GetMapping("/get-all-songs")
    public ResponseEntity<List<Map<String, Object>>> getAllSongs() {
        try {
            List<Map<String, Object>> allSongs = dataFetchService.getAllSongs();
            return ResponseEntity.ok(allSongs);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}