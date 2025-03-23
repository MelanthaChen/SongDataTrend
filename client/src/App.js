import React, { useState, useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";

function App() {
  // States for toggling between different modes and filters
  const [isAdvancedMode, setAdvancedMode] = useState(false); // Toggle between regular and advanced modes
  const [removeStopWord, setRemovedStopWord] = useState(false); // Toggle stop word removal filter
  const [chinaRegion, setChinaRegion] = useState(false); // Toggle China region combination filter
  const [synonym, setSynonym] = useState(false); // Toggle synonym inclusion filter

  // States for singer type, region, and year range filters
  const [singerType, setSingerType] = useState(["All"]); // Filter for singer types (default is 'All')
  const [region, setRegion] = useState(["All"]); // Filter for regions (default is 'All')
  const [yearStart, setYearStart] = useState(""); // Starting year filter
  const [yearEnd, setYearEnd] = useState(""); // Ending year filter

  // States for handling word input methods (manual or rank-based) and selected data
  const [wordInputMethod, setInputMethod] = useState("manual"); // Select input method for words (manual or rank)
  const [manualInput, setManualInput] = useState(""); // Store user-entered words manually
  const [rankStart, setRankStart] = useState(""); // Rank start for range-based word input
  const [rankEnd, setRankEnd] = useState(""); // Rank end for range-based word input
  const [displayedWords, setDisplayedWords] = useState([]); // Display words selected for analysis
  const [selectedWord, setSelectedWord] = useState(""); // Store selected word for graph display
  const [processedData, setProcessedData] = useState(null); // Store fetched and processed word data

  // Table data state to display information below the graph
  const [tableData, setTableData] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState([
    "Total Frequency",
    "All Singer Type",
    "All Region",
  ]);

  const [selectedCategory, setSelectedCategory] = useState("Total Frequency");
  const [selectedNumerator, setSelectedNumerator] = useState("total");

  // Function to toggle between advanced and regular filter modes
  const toggleFilterMode = () => {
    setAdvancedMode((prevMode) => !prevMode); // Toggle mode
    if (!isAdvancedMode) {
      // Reset filters when switching back to regular mode
      setSingerType(["All"]);
      setRegion(["All"]);
      setYearStart("");
      setYearEnd("");
    }
  };

  // Function to generate file names dynamically based on filters applied
  const getFileNames = () => {
    let fileName1 = "";
    let fileName2 = "";

    if (!removeStopWord) {
      if (chinaRegion && synonym) {
        fileName1 = "SegmentedLyricFrequencyChina";
        fileName2 = "FilteredGSegLyricCN_Synonym";
      } else if (chinaRegion) {
        fileName1 = "SegmentedLyricFrequencyChina";
        fileName2 = "FilteredGSegLyricCN";
      } else if (synonym) {
        fileName1 = "SegmentedLyricFrequency";
        fileName2 = "FilteredGSegLyric_Synonym";
      } else {
        fileName1 = "SegmentedLyricFrequency";
        fileName2 = "FilteredGSegLyric";
      }
    } else {
      if (chinaRegion && synonym) {
        fileName1 = "RemovedStopWordsFrequencyChina";
        fileName2 = "FilteredGRemStopCN_Synonym";
      } else if (chinaRegion) {
        fileName1 = "RemovedStopWordsFrequencyChina";
        fileName2 = "FilteredGRemStopCN";
      } else if (synonym) {
        fileName1 = "RemovedStopWordsFrequency";
        fileName2 = "FilteredGRemStop_Synonym";
      } else {
        fileName1 = "RemovedStopWordsFrequency";
        fileName2 = "FilteredGRemStop";
      }
    }
    return { fileName1, fileName2 };
  };

  // Handler for word input method change (manual input or rank input)
  const handleInputMethodChange = (e) => {
    setInputMethod(e.target.value); // Update input method state based on user selection
  };

  // Handle the selection of a word from the dropdown
  const handleWordSelection = () => {
    if (!selectedWord) {
      alert("Please select a word.");
      return;
    }
    console.log("Analysis for word: " + selectedWord);

    // Fetch data based on word and other filters, then render the graph
    fetchWordDataForGraph(selectedWord, yearStart, yearEnd);
  };

  useEffect(() => {
    if (singerType.includes("All")) {
      setSingerType(["male", "female", "group"]);
    }
  }, [singerType]);

  useEffect(() => {
    if (region.includes("All")) {
      const allRegions = chinaRegion
        ? ["taiwan", "china-main", "hongkong", "singapore", "malaysia", "macao"]
        : [
            "taiwan",
            "china-main",
            "hongkong",
            "singapore",
            "malaysia",
            "macao",
            "guangdong",
            "neimeng",
            "xinjiang",
            "xizang",
          ];
      setRegion(allRegions);
    }
  }, [region]);

  useEffect(() => {
    const updateCategoryOptions = () => {
      const newOptions = ["Total Frequency", "All Singer Type", "All Region"];
      if (singerType.includes("All") && region.length > 0) {
        newOptions.push(
          "Total Male Frequency",
          "Total Female Frequency",
          "Total Group Frequency"
        );
      } else {
        if (singerType.includes("male") && region.length > 0) {
          newOptions.push("Total Male Frequency");
        }
        if (singerType.includes("female") && region.length > 0) {
          newOptions.push("Total Female Frequency");
        }
        if (singerType.includes("group") && region.length > 0) {
          newOptions.push("Total Group Frequency");
        }
      }

      if (region.includes("All") && singerType.length > 0) {
        newOptions.push(
          "Total Taiwan Frequency",
          "Total China Mainlan Frequency",
          "Total Hong Kong Frequency",
          "Total Singapore Frequency",
          "Total Malaysia Frequency",
          "Total Macao Frequency"
        );
      } else {
        if (region.includes("taiwan") && singerType.length > 0) {
          newOptions.push("Total Taiwan Frequency");
        }
        if (region.includes("china-main") && singerType.length > 0) {
          newOptions.push("Total China Mainland Frequency");
        }
        if (region.includes("hongkong") && singerType.length > 0) {
          newOptions.push("Total Hong Kong Frequency");
        }
        if (region.includes("singapore") && singerType.length > 0) {
          newOptions.push("Total Singapore Frequency");
        }
        if (region.includes("malaysia") && singerType.length > 0) {
          newOptions.push("Total Malaysia Frequency");
        }
        if (region.includes("macao") && singerType.length > 0) {
          newOptions.push("Total Macao Frequency");
        }
        if (!chinaRegion) {
          if (region.includes("guangdong") && singerType.length > 0) {
            newOptions.push("Total Guangdong Frequency");
          }
          if (region.includes("neimeng") && singerType.length > 0) {
            newOptions.push("Total Neimeng Frequency");
          }
          if (region.includes("xinjiang") && singerType.length > 0) {
            newOptions.push("Total Xinjiang Frequency");
          }
          if (region.includes("xizang") && singerType.length > 0) {
            newOptions.push("Total Xizang Frequency");
          }
        }
      }
      setCategoryOptions(newOptions);
    };
    updateCategoryOptions();
  }, [singerType, region, chinaRegion]);

  // Handle singer type selection change
  const handleSingerTypeChange = (e) => {
    const selectedSingerType = e.target.value;

    if (selectedSingerType === "All") {
      // If "All" is selected, select or deselect all singer types
      if (e.target.checked) {
        setSingerType(["male", "female", "group"]);
        updateCategoryOptions(["male", "female", "group"], region);
      } else {
        setSingerType([]); // Deselect all if "All" is unchecked
        updateCategoryOptions([], region);
      }
    } else {
      // Add or remove individual singer types based on user input
      const updatedSingerType = e.target.checked
        ? [...singerType, selectedSingerType]
        : singerType.filter((st) => st !== selectedSingerType);
      setSingerType(updatedSingerType);
      updateCategoryOptions(updatedSingerType, region);
    }
  };

  // Handle region selection change
  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;

    if (selectedRegion === "All") {
      // If "All" is selected, select all regions
      if (e.target.checked) {
        const allRegions = chinaRegion
          ? [
              "taiwan",
              "china-main",
              "hongkong",
              "singapore",
              "malaysia",
              "macao",
            ]
          : [
              "taiwan",
              "china-main",
              "hongkong",
              "singapore",
              "malaysia",
              "macao",
              "guangdong",
              "neimeng",
              "xinjiang",
              "xizang",
            ];
        setRegion(allRegions);
        updateCategoryOptions(singerType, allRegions);
      } else {
        setRegion([]); // Deselect all regions if "All" is unchecked
        updateCategoryOptions(singerType, []);
      }
    } else {
      // Add or remove individual regions based on user input
      const updatedRegion = e.target.checked
        ? [...region, selectedRegion]
        : region.filter((r) => r !== selectedRegion);
      setRegion(updatedRegion);
      updateCategoryOptions(singerType, updatedRegion);
    }
  };

  // Function to select or unselect all options for filters
  const handleSelectAll = (setter, options, e) => {
    const { checked } = e.target;
    setter(checked ? options : []); // Set all or clear all based on checkbox state
  };

  const updateCategoryOptions = (selectedSingerType, selectedRegion) => {
    const newOptions = ["Total Frequency", "All Singer Type", "All Region"]; // Default option
    setCategoryOptions(newOptions);

    // If male is selected, add options related to male
    if (selectedSingerType.includes("male")) {
      newOptions.push("Total Male Frequency");
    }

    // If female is selected, add options related to female
    if (selectedSingerType.includes("female")) {
      newOptions.push("Total Female Frequency");
    }

    // If group is selected, add options related to group
    if (selectedSingerType.includes("group")) {
      newOptions.push("Total Group Frequency");
    }

    // If region is selected without specifying a singer type, show region-only options
    if (selectedRegion.length > 0 && selectedSingerType.length === 0) {
      newOptions.push("Region Frequency");
    }

    setCategoryOptions(newOptions);
  };

  // Fetch ranked words based on file and rank input
  const fetchRankedWords = () => {
    const { fileName2 } = getFileNames(); // Get file names based on filter selections

    console.log("Fetching ranked words from file " + fileName2);

    return fetch(
      `/api/fetch-ranked-words?file2=${encodeURIComponent(
        fileName2
      )}&rankStart=${rankStart}&rankEnd=${rankEnd}`
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Server error: ${text}`);
          });
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching ranked words: ", error.message);
        return []; // Return empty array if error occurs
      });
  };

  const preprocessedData = {
    "China-Main": {
      male: [],
      female: [],
      group: [],
    },
    "Hong Kong": {
      male: [],
      female: [],
      group: [],
    },
    Taiwan: {
      male: [],
      female: [],
      group: [],
    },
    Malaysia: {
      male: [],
      female: [],
      group: [],
    },
    Xinjiang: {
      male: [],
      female: [],
      group: [],
    },
    Xizang: {
      male: [],
      female: [],
      group: [],
    },
    Singapore: {
      male: [],
      female: [],
      group: [],
    },
    Macao: {
      male: [],
      female: [],
      group: [],
    },
    Guangdong: {
      male: [],
      female: [],
      group: [],
    },
    Neimeng: {
      male: [],
      female: [],
      group: [],
    },
    male: {
      Taiwan: [],
      "China-Main": [],
      "Hong Kong": [],
      Singapore: [],
      Malaysia: [],
      Macao: [],
      Guangdong: [],
      Neimeng: [],
      Xinjiang: [],
      Xizang: [],
    },
    female: {
      Taiwan: [],
      "China-Main": [],
      "Hong Kong": [],
      Singapore: [],
      Malaysia: [],
      Macao: [],
      Guangdong: [],
      Neimeng: [],
      Xinjiang: [],
      Xizang: [],
    },
    group: {
      Taiwan: [],
      "China-Main": [],
      "Hong Kong": [],
      Singapore: [],
      Malaysia: [],
      Macao: [],
      Guangdong: [],
      Neimeng: [],
      Xinjiang: [],
      Xizang: [],
    },
  };

  const preprocessData = async () => {
    const response = await fetch(`/api/get-all-songs`);
    const allSongs = await response.json();

    console.log(allSongs);

    allSongs.forEach((song) => {
      const { id, region, singerType } = song;
      if (preprocessedData[region] && preprocessedData[region][singerType]) {
        preprocessedData[region][singerType].push(id);
      }

      if (
        preprocessedData[singerType] &&
        preprocessedData[singerType][region]
      ) {
        preprocessedData[singerType][region].push(id);
      }
    });
    console.log("Preprocessing completed", preprocessedData);
    return preprocessedData;
  };

  // Function to handle fetching word data based on input method
  const fetchWordsData = async () => {
    const { fileName1 } = getFileNames(); // Get file name for fetching word data
    let wordsToSearch = [];

    if (wordInputMethod === "rank") {
      // Fetch ranked words based on rank range
      fetchRankedWords().then((rankedWords) => {
        if (rankedWords.length === 0) {
          alert("No words found for the given rank range.");
          return;
        }
        handleDataFetching(fileName1, rankedWords);
      });
    } else if (manualInput.trim()) {
      // Use manually entered words for search
      wordsToSearch = manualInput.split(",").map((word) => word.trim());
      handleDataFetching(fileName1, wordsToSearch);
    } else {
      alert("Please enter words for search.");
    }

    const preprocessedData = await preprocessData();
    console.log("Data ready for use", preprocessedData);
  };

  // Function to fetch and handle data based on filters
  const handleDataFetching = (fileName1, wordsToSearch) => {
    let url = `/api/fetch-word-data?file1=${encodeURIComponent(
      fileName1
    )}&words=${encodeURIComponent(wordsToSearch.join(","))}`;

    // Append filters to the URL if applicable
    if (yearStart && yearEnd)
      url += `&yearStart=${yearStart}&yearEnd=${yearEnd}`;
    if (region.length > 0 && !region.includes("All"))
      url += `&region=${encodeURIComponent(region.join(","))}`;
    if (singerType.length > 0 && !singerType.includes("All"))
      url += `&singerType=${encodeURIComponent(singerType.join(","))}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data: ", data);
        setDisplayedWords(wordsToSearch);
        setProcessedData(data); // Store fetched data for later use
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log("Selected Category: ", e.target.value);
  };

  const handleNumeratorChange = (e) => {
    setSelectedNumerator(e.target.value);
    console.log("Data Over: ", e.target.value);
  };

  const handleWordChange = (e) => {
    setSelectedWord(e.target.value);
    console.log("Selected Word: ", e.target.value);
  };

  // Fetch word data for graph rendering and table display
  const fetchWordDataForGraph = async (word, yearStart, yearEnd) => {
    console.log("Processing graph for " + word);

    // Filter the word data from cache based on selected word and year range
    const wordDataFromCache = processedData.filter(
      (entry) =>
        entry.Word === word && entry.Year >= yearStart && entry.Year <= yearEnd
    );

    if (wordDataFromCache.length === 0) {
      console.warn(`No cached data found for word ${word} in processedData.`);
      return { wordData: [], totalSongsData: [] };
    }

    console.log("Using cached word data:", wordDataFromCache);

    try {
      const singerTypes = ["male", "female", "group"];
      const regions = chinaRegion
        ? [
            "Taiwan",
            "China-Main",
            "Hong Kong",
            "Singapore",
            "Malaysia",
            "Macao",
          ]
        : [
            "Taiwan",
            "China-Main",
            "Hong Kong",
            "Singapore",
            "Malaysia",
            "Macao",
            "Guangdong",
            "Neimeng",
            "Xinjiang",
            "Xizang",
          ];
      let dataWithRatio = {};

      if (selectedNumerator === "total") {
        if (selectedCategory === "Total Frequency") {
          // Fetch total songs data if the "total" option is selected
          const response = await fetch(
            `/api/fetch-total-songs?yearStart=${yearStart}&yearEnd=${yearEnd}`
          );
          const totalSongsData = await response.json();

          if (totalSongsData.length === 0) {
            console.log("No data found for total songs.");
            return;
          }

          console.log("Fetched total song data: ", totalSongsData);

          // Calculate ratio using total songs
          dataWithRatio = wordDataFromCache.map((wordEntry) => {
            const totalSongsEntry = totalSongsData.find(
              (songEntry) => songEntry.Year_Filled === wordEntry.Year
            );
            const totalSongs = totalSongsEntry ? totalSongsEntry.TotalSongs : 0;
            const totalSongsNumerator = totalSongsEntry
              ? totalSongsEntry.TotalSongs
              : 1; // Avoid division by 0
            const ratio =
              wordEntry.Frequency && totalSongsNumerator
                ? wordEntry.Frequency / totalSongsNumerator
                : 0;

            console.log(`Calculated Ratio for Year ${wordEntry.Year}:`, ratio);

            return {
              ...wordEntry,
              Ratio: ratio,
              TotalSongs: totalSongs,
            };
          });
        } else if (selectedCategory === "All Singer Type") {
          // Logic error, the numerator should be the total song published by that gender in that year, not the total song in tht year
          dataWithRatio = await Promise.all(
            singerTypes.map(async (singerType) => {
              // Fetch total songs for the current singer type
              const response = await fetch(
                `/api/fetch-total-songs?yearStart=${yearStart}&yearEnd=${yearEnd}&singerType=${singerType}`
              );
              const totalSongsData = await response.json();

              if (totalSongsData.length === 0) {
                console.warn(
                  `No total songs data found for singer type: ${singerType}`
                );
                return {
                  label: `${singerType} Word Count / Total ${singerType} Count`,
                  data: [],
                };
              }

              return {
                label: `${singerType} Word Count / Total ${singerType} Count`,
                data: wordDataFromCache.map((wordEntry) => {
                  const wordCount =
                    wordEntry[`\`${singerType} Word Count\``] || 0;

                  // Find the total songs for the corresponding year
                  const totalSongsEntry = totalSongsData.find(
                    (entry) => entry.Year_Filled === wordEntry.Year
                  );
                  const totalSongs = totalSongsEntry
                    ? totalSongsEntry.TotalSongs
                    : 1; // Avoid division by 0
                  const ratio =
                    wordCount && totalSongs ? wordCount / totalSongs : 0;

                  console.log(
                    `Calculated Ratio for ${singerType} in Year ${wordEntry.Year}:`,
                    ratio
                  );

                  return {
                    Year: wordEntry.Year,
                    SingerType: singerType,
                    TypeFreq: wordCount,
                    Ratio: ratio,
                    TotalSongs: totalSongs,
                  };
                }),
              };
            })
          );
        } else if (selectedCategory === "All Region") {
          dataWithRatio = await Promise.all(
            regions.map(async (region) => {
              // Fetch total songs for the current region
              const response = await fetch(
                `/api/fetch-total-songs?yearStart=${yearStart}&yearEnd=${yearEnd}&region=${region}`
              );
              const totalSongsData = await response.json();

              if (totalSongsData.length === 0) {
                console.warn(`No total songs data found for region: ${region}`);
                return {
                  label: `${region} Word Count / Total ${region} Count`,
                  data: [],
                };
              }

              return {
                label: `${region} Word Count / Total ${region} Count`,
                data: wordDataFromCache.map((wordEntry) => {
                  const wordCount = wordEntry[`\`${region} Word Count\``] || 0;

                  // Find the total songs for the corresponding year
                  const totalSongsEntry = totalSongsData.find(
                    (entry) => entry.Year_Filled === wordEntry.Year
                  );
                  const totalSongs = totalSongsEntry
                    ? totalSongsEntry.TotalSongs
                    : 1; // Avoid division by 0
                  const ratio =
                    wordCount && totalSongs ? wordCount / totalSongs : 0;

                  console.log(
                    `Calculated Ratio for ${region} in Year ${wordEntry.Year}:`,
                    ratio
                  );

                  return {
                    Year: wordEntry.Year,
                    Region: region,
                    RegionFreq: wordCount,
                    Ratio: ratio,
                    TotalSongs: totalSongs,
                  };
                }),
              };
            })
          );
        } else {
          // Handle detailed categories for 'total' numerator
          const preprocessedData = await preprocessData();
          console.log("Data ready for detailed categories:", preprocessedData);

          if (
            selectedCategory.includes("Male") ||
            selectedCategory.includes("Female") ||
            selectedCategory.includes("Group")
          ) {
            // For "Total Male Frequency by Region", "Total Female Frequency by Region", etc.
            const selectedSingerType = singerTypes
              .find((type) => selectedCategory.toLowerCase().includes(type))
              ?.toLowerCase(); // Normalize to lowercase

            dataWithRatio = await Promise.all(
              regions.map(async (region) => {
                // Fetch total songs published that year for the region
                const response = await fetch(
                  `/api/fetch-total-songs?yearStart=${yearStart}&yearEnd=${yearEnd}&region=${region}&singerType=${selectedSingerType}`
                );
                const totalSongsData = await response.json();

                if (totalSongsData.length === 0) {
                  console.warn(
                    `No total songs data found for region: ${region}`
                  );
                  return {
                    label: `${selectedSingerType} Word Count / Total ${selectedSingerType} Count in ${region}`,
                    data: [],
                  };
                }

                return {
                  label: `${selectedSingerType} Word Count / Total ${selectedSingerType} Count in ${region}`,
                  data: wordDataFromCache.map((wordEntry) => {
                    const wordCount =
                      wordEntry[`${selectedSingerType} Word Count`] || 0;

                    // Find the total songs for the corresponding year
                    const totalSongsEntry = totalSongsData.find(
                      (entry) => entry.Year_Filled === wordEntry.Year
                    );
                    const totalSongs = totalSongsEntry
                      ? totalSongsEntry.TotalSongs
                      : 1; // Avoid division by 0
                    const ratio =
                      wordCount && totalSongs ? wordCount / totalSongs : 0;

                    console.log(
                      `Calculated Ratio for ${selectedSingerType} in ${region}, Year ${wordEntry.Year}:`,
                      ratio
                    );

                    return {
                      Year: wordEntry.Year,
                      Category: region,
                      SingerType: selectedSingerType,
                      Freq: wordCount,
                      Ratio: ratio,
                      TotalSongs: totalSongs,
                    };
                  }),
                };
              })
            );
          } else {
            // For "Total Region Frequency by Singer Type"
            const selectedRegion = regions
              .find((region) =>
                selectedCategory.toLowerCase().includes(region.toLowerCase())
              )
              ?.toLowerCase(); // Normalize to lowercase
            dataWithRatio = await Promise.all(
              singerTypes.map(async (singerType) => {
                // Fetch total songs published that year for the region
                const response = await fetch(
                  `/api/fetch-total-songs?yearStart=${yearStart}&yearEnd=${yearEnd}&singerType=${singerType}&region=${selectedRegion}`
                );
                const totalSongsData = await response.json();

                if (totalSongsData.length === 0) {
                  console.warn(
                    `No total songs data found for singer type: ${singerType}`
                  );
                  return {
                    label: `${singerType} Word Count / Total ${singerType} Count in ${selectedRegion}`,
                    data: [],
                  };
                }

                return {
                  label: `${singerType} Word Count / Total ${singerType} Count in ${selectedRegion}`,
                  data: wordDataFromCache.map((wordEntry) => {
                    const wordCount =
                      wordEntry[`${singerType} Word Count`] || 0;

                    // Find the total songs for the corresponding year
                    const totalSongsEntry = totalSongsData.find(
                      (entry) => entry.Year_Filled === wordEntry.Year
                    );
                    const totalSongs = totalSongsEntry
                      ? totalSongsEntry.TotalSongs
                      : 1; // Avoid division by 0
                    const ratio =
                      wordCount && totalSongs ? wordCount / totalSongs : 0;

                    console.log(
                      `Calculated Ratio for ${singerType} in ${selectedRegion}, Year ${wordEntry.Year}:`,
                      ratio
                    );

                    return {
                      Year: wordEntry.Year,
                      Region: selectedRegion,
                      Category: singerType,
                      Freq: wordCount,
                      Ratio: ratio,
                      TotalSongs: totalSongs,
                    };
                  }),
                };
              })
            );
          }
        }
      } else if (selectedNumerator === "used") {
        if (selectedCategory === "Total Frequency") {
          // Use existing 'UsedSongs' from wordDataFromCache for the 'used' option
          dataWithRatio = wordDataFromCache.map((wordEntry) => {
            const usedSongs = wordEntry["`Number of Song Used`"];
            const usedSongsNumerator = wordEntry["`Number of Song Used`"] || 1; // Avoid division by 0
            const ratio =
              wordEntry.Frequency && usedSongsNumerator
                ? wordEntry.Frequency / usedSongsNumerator
                : 0;

            console.log(`Calculated Ratio for Year ${wordEntry.Year}:`, ratio);

            return {
              ...wordEntry,
              Ratio: ratio,
              TotalSongs: usedSongs, // In this case, we treat used songs as total for ratio
            };
          });
        } else if (selectedCategory === "All Singer Type") {
          dataWithRatio = singerTypes.map((singerType) => {
            return {
              label: `${singerType} Word Count / ${singerType} Count`,
              data: wordDataFromCache.map((wordEntry) => {
                const wordCount =
                  wordEntry[`\`${singerType} Word Count\``] || 0;
                const songCount = wordEntry[`\`${singerType} Count\``] || 0;
                const songCountNumerator =
                  wordEntry[`\`${singerType} Count\``] || 1;
                const ratio =
                  wordCount && songCountNumerator
                    ? wordCount / songCountNumerator
                    : 0;

                console.log(
                  `Calculated Ratio for singer type ${singerType} Year ${wordEntry}:`,
                  ratio
                );
                return {
                  ...wordEntry,
                  SingerType: singerType,
                  TypeFreq: wordCount,
                  Ratio: ratio,
                  TotalSongs: songCount,
                };
              }),
            };
          });
        } else if (selectedCategory === "All Region") {
          dataWithRatio = regions.map((region) => {
            return {
              label: `${region} Word Count / ${region} Count`,
              data: wordDataFromCache.map((wordEntry) => {
                const wordCount = wordEntry[`\`${region} Word Count\``] || 0;
                const songCount = wordEntry[`\`${region} Count\``] || 0;
                const songCountNumerator =
                  wordEntry[`\`${region} Count\``] || 1;
                const ratio =
                  wordCount && songCountNumerator
                    ? wordCount / songCountNumerator
                    : 0;

                console.log(
                  `Calculated Ratio for region ${region} Year ${wordEntry}:`,
                  ratio
                );
                return {
                  ...wordEntry,
                  Region: region,
                  RegionFreq: wordCount,
                  Ratio: ratio,
                  TotalSongs: songCount,
                };
              }),
            };
          });
        } else {
          // This is for analysis the each category by other type of category. The numerator need to be found by taking ids from the id list in the
          // wordEntry and take id back to the processedData which already sorted the ids in the abstractedFinal files, match the id to the selected category

          // Disdinguish the singer type categories and region categories
          const isSingerTypeAnalysis = singerTypes.some((type) => {
            selectedCategory.includes(type);
          });

          // Fetching all the ids in the total database by categories (region --> singer type)
          const preprocessedData = await preprocessData();
          console.log("Data ready for use", preprocessedData);

          // For "Total ${region} Frequency", the graph should render for different st in this region

          // Analysis the each trend by singer type
          if (isSingerTypeAnalysis) {
            console.log("For Singer Type Analysis");

            // !!! Issue: The singer type start with upper-class so it cannot match to the database categories

            // const selectedSingerType = singerType.find((type) =>
            //   selectedCategory.includes(type)
            // );

            // const dataByRegion = regions.reduce((acc, region) => {
            //   acc[region] = [];
            //   return acc;
            // }, {});

            // console.log("selectedSingerType: ", selectedSingerType);

            // for (const wordEntry of wordDataFromCache) {
            //   const { Year, "`ID List`": idList } = wordEntry;
            //   // console.log("wordEntry", wordEntry); // Each year data for the word (seperately just one year a loop)
            //   // console.log("wordDataFromCache", wordDataFromCache); // Each year data for the selected word (dispalyed together as one)
            //   console.log(preprocessedData); // Fetch total data about the all word

            //   // Logic Error here !!!!!!!!!!!!!!
            //   const ids = getMatchingIDs(
            //     preprocessedData,
            //     wordEntry.region,
            //     selectedSingerType,
            //     idList
            //   );

            //   const usedCount = ids.length;
            //   const wordFreq = ids.refuce(
            //     (acc, id) => acc + wordEntry.Frequency,
            //     0
            //   );

            //   region.forEach((region) => {
            //     const ratio = usedCount > 0 ? wordFreq / usedCount : 0;
            //     dataByRegion[region].push({
            //       Year,
            //       region,
            //       Ratio: ratio,
            //       Category: singerType,
            //       CategoryFreq: wordFreq,
            //       TotalSongs: usedCount,
            //     });
            //   });
            // }

            // dataWithRatio = dataByRegion;
            // For "Total ${st} Frequency", the graph should render different region with this st

            // Analysis the trend by region
          } else {
            console.log("For Region Analysis");
            // const selectedRegion = regions.find((region) =>
            //   selectedCategory.includes(region)
            // );

            // const dataBySingerType = singerType.reduce((acc, singerType) => {
            //   acc[singerType] = [];
            //   return acc;
            // }, {});

            // for (const wordEntry of wordDataFromCache) {
            //   let { Year, "`ID List`": idList } = wordEntry;
            //   console.log(typeof idList);
            //   if (typeof idList === "string") {
            //     // Convert string to array by splitting on commas and trimming each item
            //     idList = idList.split(",").map((id) => id.trim());
            //   }
            //   if (!idList || !Array.isArray(idList)) {
            //     console.error(
            //       "idList is either null or not an array for entry:",
            //       wordEntry
            //     );
            //     continue; // Skip this iteration if idList is invalid
            //   }
            //   console.log("processedData: ", preprocessedData);

            //   singerTypes.forEach((singerType) => {
            //     console.log(singerType);
            //     const ids = getMatchingIDs(
            //       preprocessedData,
            //       selectedRegion,
            //       singerType,
            //       idList
            //     );
            //     console.log(ids);

            //     const usedCount = ids.length;
            //     const wordFreq = ids.reduce(
            //       (acc, id) => acc + wordEntry.Frequency,
            //       0
            //     );

            //     const ratio = usedCount > 0 ? wordFreq / usedCount : 0;

            //     dataBySingerType[singerType].push({
            //       Year,
            //       Region: selectedRegion,
            //       Ratio: ratio,
            //       Category: singerType,
            //       CategoryFreq: wordFreq,
            //       TotalSongs: usedCount,
            //     });
            //   });
            // }

            // dataWithRatio = dataBySingerType;
          }
        }
      }

      console.log("Data with ratio:", dataWithRatio);

      // Render the graph and table with the calculated data
      renderGraph(dataWithRatio, selectedCategory, selectedNumerator);
      renderTable(dataWithRatio, selectedCategory, selectedNumerator);

      return { wordData: wordDataFromCache, totalSongsData: dataWithRatio };
    } catch (error) {
      console.error("Error fetching total songs data:", error);
      return { wordData: wordDataFromCache, totalSongsData: [] };
    }
  };

  function getMatchingIDs(preprocessedData, region, singerType, idList) {
    const theIds = [];
    if (!preprocessedData[region] || !preprocessedData[region][singerType]) {
      console.warn(
        `Missing data for region: ${region} or singerType: ${singerType}`
      );
      return [];
    }
    console.log("Preprocessed Data for Region: ", preprocessedData[region]);
    console.log(
      "Preprocessed Data for Singer Type: ",
      preprocessedData[region]?.[singerType]
    );
    console.log("ID List: ", idList);

    if (preprocessedData[region] && preprocessedData[region][singerType]) {
      const filteredIds = preprocessedData[region][singerType].filter((id) =>
        idList.includes(id)
      );
      console.log("Filtered IDs: ", filteredIds);
      theIds.push(filteredIds);
      return theIds;
    }

    // Additional check if region/singerType are swapped
    if (preprocessedData[singerType] && preprocessedData[singerType][region]) {
      const filteredIds = preprocessedData[singerType][region].filter((id) =>
        idList.includes(id)
      );
      console.log("Filtered IDs from alternative check: ", filteredIds);
      theIds.push(filteredIds);
      return theIds;
    }

    console.log("No matching IDs found.");
    return theIds;
  }

  // Register chart components
  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
  );

  let chartInstance;

  // Reset canvas to clear the old graph and set up a new one
  const resetCanvas = () => {
    const canvas = document.getElementById("wordGraph");
    const parent = canvas.parentNode;
    canvas.remove(); // Remove old canvas
    const newCanvas = document.createElement("canvas"); // Create a new canvas
    newCanvas.id = "wordGraph"; // Set the same ID
    parent.appendChild(newCanvas); // Add the new canvas to the DOM
  };

  // Render the line graph based on the fetched data
  const renderGraph = (data, category, numerator) => {
    resetCanvas(); // Reset the canvas before rendering

    const ctx = document.getElementById("wordGraph").getContext("2d");

    if (!data || data.length === 0) {
      console.warn("No data available for the graph.");
      return;
    }

    let datasets = [];
    let labels = [];

    if (category === "Total Frequency") {
      // If data is an array (for Total Frequency or Used Frequency)
      labels = data.map((item) => item.Year); // X-axis: Years
      const ratioData = data.map((item) =>
        isNaN(item.Ratio) ? 0 : item.Ratio
      ); // Y-axis: Ratio

      datasets.push({
        label: "Word Frequency / Number of Songs Over Time",
        data: ratioData,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      });
    } else if (category === "All Singer Type") {
      // If data contains multiple singer types (for "All Singer Type")
      labels = data[0].data.map((item) => item.Year); // X-axis: Years

      datasets = data.map((singerTypeData, index) => {
        return {
          label: singerTypeData.label, // Label for each singer type (e.g., "Male Word Count / Male Count")
          data: singerTypeData.data.map((item) => item.Ratio), // Y-axis: Ratio
          borderColor: getRandomColor(), // Generate a different color for each line
          borderWidth: 2,
          fill: false,
        };
      });
    } else if (category === "All Region") {
      labels = data[0].data.map((item) => item.Year);
      console.log("Data refers to: ", data);
      console.log("Labels are: ", labels);

      datasets = data.map((regionData, index) => {
        return {
          label: regionData.label,
          data: regionData.data.map((item) => item.Ratio),
          borderColor: getRandomColor(), // Generate a different color for each line
          borderWidth: 2,
          fill: false,
        };
      });
    } else {
      labels = data[0].data.map((item) => item.Year);

      datasets = data.map((categoryData, index) => {
        return {
          label: categoryData.label,
          data: categoryData.data.map((item) => item.Ratio),
          borderColor: getRandomColor(), // Generate a different color for each line
          borderWidth: 2,
          fill: false,
        };
      });
    }

    // Render the line graph with datasets
    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels, // X-axis: Years
        datasets: datasets, // Multiple datasets for multiple lines (if singer type selected)
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: "category",
            title: {
              display: true,
              text: "Year",
            },
          },
          y: {
            type: "linear",
            title: {
              display: true,
              text: "Frequency / Number of Songs",
            },
          },
        },
      },
    });

    setIsTableVisible(true); // Make table visible after rendering the graph
  };

  // Utility function to generate random colors for the lines
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Render the data table for word analysis
  const renderTable = (data, category, numerator) => {
    let formattedData = [];

    if (category === "Total Frequency") {
      // If data is an array (for Total Frequency or Used Frequency)
      formattedData = data.map((item) => ({
        year: item.Year,
        frequency: item.Frequency,
        totalSongs: item.TotalSongs,
        ratio: item.Ratio,
      }));
    } else if (category === "All Singer Type") {
      // If data contains multiple singer types (for "All Singer Type")
      data.forEach((singerTypeData) => {
        singerTypeData.data.forEach((item) => {
          formattedData.push({
            year: item.Year,
            singerType: item.SingerType, // Extract singer type from label
            frequency: item.TypeFreq,
            totalSongs: item.TotalSongs,
            ratio: item.Ratio,
          });
        });
      });
    } else if (category === "All Region") {
      data.forEach((regionData) => {
        regionData.data.forEach((item) => {
          formattedData.push({
            year: item.Year,
            region: item.Region,
            frequency: item.RegionFreq,
            totalSongs: item.TotalSongs,
            ratio: item.Ratio,
          });
        });
      });
    } else {
      data.forEach((categoryData) => {
        categoryData.data.forEach((item) => {
          formattedData.push({
            year: item.Year,
            category: item.Category,
            frequency: item.Freq,
            totalSongs: item.TotalSongs,
            ratio: item.Ratio,
          });
        });
      });
    }

    setTableData(formattedData); // Update table data
  };

  return (
    <div className="main-container">
      {/* Graph and Table Container */}
      <div className="content-container">
        <h1>Analysis Trends</h1>

        <div className="graph-selection">
          {/* Word Selection Dropdown */}
          <div id="word-selection">
            <label>Select Word for Graph: </label>
            {displayedWords.length > 0 ? (
              <select onChange={(e) => handleWordChange(e)}>
                <option value="">-- Select a Word --</option>
                {displayedWords.map((word, index) => (
                  <option key={index} value={word}>
                    {word}
                  </option>
                ))}
              </select>
            ) : (
              <p>No words selected yet.</p>
            )}
          </div>

          {/* Graph Selection Dropdown */}
          <div id="type-selection">
            <label>Select Category for Analysis: </label>
            {displayedWords.length > 0 ? (
              <select
                id="category-selection"
                onChange={(e) => handleCategoryChange(e)}
              >
                {categoryOptions.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            ) : (
              <span>
                <p>--Select Word First--</p>
              </span>
            )}
            <span> Over </span>
            {displayedWords.length > 0 ? (
              <select
                id="numerator-selection"
                onChange={(e) => handleNumeratorChange(e)}
              >
                <option value="total">Total Number</option>
                <option value="used">Used Number</option>
              </select>
            ) : (
              <span>
                <p>--Select Word First--</p>
              </span>
            )}
          </div>
          <div>
            <button onClick={handleWordSelection}>Generate</button>
          </div>
        </div>

        {/* Word Frequency Graph */}
        <canvas id="wordGraph"></canvas>

        {/* Data Table */}
        <table id="dataTable" className={isTableVisible ? "" : "hidden"}>
          <thead>
            <tr id="tableHeader">
              <th colSpan="2">Database: {getFileNames().fileName1}</th>
              <th colSpan="1">Word: {selectedWord}</th>
              <th colSpan="1">
                Year Range: {yearStart} - {yearEnd}
              </th>
              {selectedCategory != "Total Frequency" && (
                <th colSpan="1">
                  Anlysis: {selectedCategory} / {selectedNumerator}
                </th>
              )}
            </tr>
            <tr id="tableContent">
              <th>Year</th>
              {selectedCategory === "All Singer Type" && <th>Singer Type</th>}
              {selectedCategory === "All Region" && <th>Region</th>}
              {(selectedCategory === "Total Male Frequency" ||
                selectedCategory === "Total Female Frequency" ||
                selectedCategory === "Total Group Frequency") && (
                <th>Region</th>
              )}
              {(selectedCategory === "Total Taiwan Frequency" ||
                selectedCategory === "Total China Mainland Frequency" ||
                selectedCategory === "Total Hong Kong Frequency" ||
                selectedCategory === "Total Singapore Frequency" ||
                selectedCategory === "Total Malaysia Frequency" ||
                selectedCategory === "Total Macao Frequency" ||
                selectedCategory === "Total Guangdong Frequency" ||
                selectedCategory === "Total Neimeng Frequency" ||
                selectedCategory === "Total Xinjiang Frequency" ||
                selectedCategory === "Total Xizang Frequency") && (
                <th>Singer Type</th>
              )}
              <th>Frequency</th>
              <th>Number of Songs</th>
              <th>Ratio</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.year}</td>
                {row.singerType && <td>{row.singerType}</td>}
                {row.region && <td>{row.region}</td>}
                {row.category && <td>{row.category}</td>}
                <td>{row.frequency}</td>
                <td>{row.totalSongs}</td>
                <td>{row.ratio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filter Options */}
      <div className="filter-container">
        <h1>Data Filter</h1>

        {/* Toggle Advanced Filter */}
        <div>
          <label>
            Advanced Filter
            <input
              type="checkbox"
              checked={isAdvancedMode}
              onChange={toggleFilterMode}
            />
          </label>
        </div>

        {/* Basic Filters */}
        <h3>Select File to Analyze</h3>
        <label>
          Remove Stop Words
          <input
            type="checkbox"
            checked={removeStopWord}
            onChange={(e) => setRemovedStopWord(e.target.checked)}
          />
        </label>
        <br />
        <label>
          Combine China Region
          <input
            type="checkbox"
            checked={chinaRegion}
            onChange={(e) => setChinaRegion(e.target.checked)}
          />
        </label>
        <br />
        <label>
          Include Synonym
          <input
            type="checkbox"
            checked={synonym}
            onChange={(e) => setSynonym(e.target.checked)}
          />
        </label>
        <br />

        {/* Word Input Method */}
        <h3>Select Word Input Method</h3>
        <label>
          <input
            type="radio"
            value="manual"
            checked={wordInputMethod === "manual"}
            onChange={handleInputMethodChange}
          />
          Input Manually
        </label>
        <label>
          <input
            type="radio"
            value="rank"
            checked={wordInputMethod === "rank"}
            onChange={handleInputMethodChange}
          />
          Choose by Rank
        </label>

        {/* Manual Input or Rank Selection */}
        {wordInputMethod === "manual" && (
          <div>
            <label>Enter Words: </label>
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Enter words for analysis"
              className="word-chose-manual"
            />
          </div>
        )}
        {wordInputMethod === "rank" && (
          <div>
            <label>Rank Range: </label>
            <input
              type="number"
              value={rankStart}
              onChange={(e) => setRankStart(e.target.value)}
              placeholder="From"
              className="word-chose-rank"
            />
            <span>-</span>
            <input
              type="number"
              value={rankEnd}
              onChange={(e) => setRankEnd(e.target.value)}
              placeholder="To"
              className="word-chose-rank"
            />
          </div>
        )}

        <br />

        {/* Advanced Filters (if enabled) */}
        {isAdvancedMode && (
          <>
            {/* Year Range Input */}
            <h3>Enter Year Range</h3>
            <div>
              <label>Year Range: </label>
              <input
                type="number"
                value={yearStart}
                onChange={(e) => setYearStart(e.target.value)}
                placeholder="From"
                className="year-input"
              />
              <span>-</span>
              <input
                type="number"
                value={yearEnd}
                onChange={(e) => setYearEnd(e.target.value)}
                placeholder="To"
                className="year-input"
              />
            </div>

            {/* Singer Type Filter */}
            <h3>Select Singer Type</h3>
            <label>Select Singer Type: </label>
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  value="All"
                  onChange={handleSingerTypeChange}
                  checked={singerType.length === 3}
                />
                All
              </label>
              <label>
                <input
                  type="checkbox"
                  className="singerType"
                  value="male"
                  onChange={handleSingerTypeChange}
                  checked={singerType.includes("male")}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="checkbox"
                  className="singerType"
                  value="female"
                  onChange={handleSingerTypeChange}
                  checked={singerType.includes("female")}
                />{" "}
                Female
              </label>
              <label>
                <input
                  type="checkbox"
                  className="singerType"
                  value="group"
                  onChange={handleSingerTypeChange}
                  checked={singerType.includes("group")}
                />{" "}
                Group
              </label>
            </div>

            <br />

            {/* Region Filter */}
            <label>Select Region: </label>
            {/* If the file type changed after the advanced selected, the region "All" should be called*/}
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleSelectAll(
                      setRegion,
                      chinaRegion
                        ? [
                            "taiwan",
                            "china-main",
                            "hongkong",
                            "singapore",
                            "malaysia",
                            "macao",
                          ]
                        : [
                            "taiwan",
                            "china-main",
                            "hongkong",
                            "singapore",
                            "malaysia",
                            "macao",
                            "guangdong",
                            "neimeng",
                            "xinjiang",
                            "xizang",
                          ],
                      e
                    )
                  }
                  checked={region.length === (chinaRegion ? 6 : 10)}
                />{" "}
                All
              </label>
              {chinaRegion ? (
                <>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="taiwan"
                      onChange={handleRegionChange}
                      checked={region.includes("taiwan")}
                    />{" "}
                    Taiwan
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="china-main"
                      onChange={handleRegionChange}
                      checked={region.includes("china-main")}
                    />{" "}
                    China Mainland
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="hongkong"
                      onChange={handleRegionChange}
                      checked={region.includes("hongkong")}
                    />{" "}
                    Hong Kong
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="singapore"
                      onChange={handleRegionChange}
                      checked={region.includes("singapore")}
                    />{" "}
                    Singapore
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="malaysia"
                      onChange={handleRegionChange}
                      checked={region.includes("malaysia")}
                    />{" "}
                    Malaysia
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="macao"
                      onChange={handleRegionChange}
                      checked={region.includes("macao")}
                    />{" "}
                    Macao
                  </label>
                </>
              ) : (
                <>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="taiwan"
                      onChange={handleRegionChange}
                      checked={region.includes("taiwan")}
                    />{" "}
                    Taiwan
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="china-main"
                      onChange={handleRegionChange}
                      checked={region.includes("china-main")}
                    />{" "}
                    China Mainland
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="hongkong"
                      onChange={handleRegionChange}
                      checked={region.includes("hongkong")}
                    />{" "}
                    Hong Kong
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="singapore"
                      onChange={handleRegionChange}
                      checked={region.includes("singapore")}
                    />{" "}
                    Singapore
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="malaysia"
                      onChange={handleRegionChange}
                      checked={region.includes("malaysia")}
                    />{" "}
                    Malaysia
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="macao"
                      onChange={handleRegionChange}
                      checked={region.includes("macao")}
                    />{" "}
                    Macao
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="guangdong"
                      onChange={handleRegionChange}
                      checked={region.includes("guangdong")}
                    />{" "}
                    Guangdong
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="neimeng"
                      onChange={handleRegionChange}
                      checked={region.includes("neimeng")}
                    />{" "}
                    Neimeng
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="xinjiang"
                      onChange={handleRegionChange}
                      checked={region.includes("xinjiang")}
                    />{" "}
                    Xinjiang
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="region"
                      value="xizang"
                      onChange={handleRegionChange}
                      checked={region.includes("xizang")}
                    />{" "}
                    Xizang
                  </label>
                </>
              )}
            </div>
          </>
        )}
        <br />
        <button onClick={fetchWordsData}>Fetch Words Data</button>
      </div>
    </div>
  );
}

export default App;
