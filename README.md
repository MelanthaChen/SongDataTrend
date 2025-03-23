### **SongDataTrend**

📊 **SongDataTrend** is a web-based application designed to analyze and visualize word usage trends in song lyrics. Leveraging powerful data extraction, cleaning, and visualization tools, this project enables users to explore language patterns across different artist categories, genres, and time periods.

---

## 🚀 **Features**
- **Data Extraction & Cleaning**
  - Scraped and parsed over **300,000+ songs** from multiple web sources using **BeautifulSoup** and **Pandas**.
  - Standardized inconsistent formats, handled pagination, and cleaned unstructured data to improve reliability.
  
- **Data Analysis & Visualization**
  - Utilized **HanLP** for Chinese NLP-based lyric segmentation and keyword extraction.
  - Developed interactive dashboards with **React.js** and **Spring Boot** for real-time data visualization.
  - Enabled dynamic filtering for categories such as artist region, genre, and timeframe.

- **Database & Performance Optimization**
  - Consolidated large-scale datasets into a **MySQL** database to improve data structure and retrieval efficiency.
  - Optimized API endpoints with **Spring Boot**, reducing data load time by **30%** and improving analysis preparation by **60%**.

---

## 🛠️ **Tech Stack**
- **Back-end:** Java, Spring Boot, MySQL
- **Front-end:** React.js, Next.js
- **Data Processing:** Python, Pandas, HanLP
- **Visualization:** R, ggplot2, Plotly
- **Web Scraping:** BeautifulSoup
- **Other Tools:** Postman, Swagger, Git

---

## 📂 **Project Structure**
```
.
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   └── utils
│   └── package.json
│
├── server
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   ├── resources
│   │   │   └── application.properties
│   │   └── test
│   ├── pom.xml
│   └── target
│
├── data
│   ├── cleaned_data.csv
│   └── frequency_data.db
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🖥️ **Setup & Installation**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/SongDataTrend.git
   cd SongDataTrend
   ```

2. **Install Dependencies**
   - For Client:
     ```bash
     cd client
     npm install
     ```

   - For Server:
     ```bash
     cd server
     mvn install
     ```

3. **Start the Application**
   - Client:
     ```bash
     npm run dev
     ```
   - Server:
     ```bash
     mvn spring-boot:run
     ```

4. **Access the Application**
   - Visit [http://localhost:3000](http://localhost:3000) to explore the dashboard.

---

## 🧪 **How to Use**
1. Select your desired **artist category**, **region**, or **timeframe** using the dashboard filters.
2. Visualize trends with interactive line charts that update in real-time.
3. Access comprehensive frequency datasets for deeper analysis.

---

## 🏆 **Achievements**
- Improved data reliability by **60%** through robust data cleaning and validation.
- Enhanced dashboard performance, reducing load times by **30%**.
- Enabled the research team to efficiently explore language patterns without manual adjustments in R code.

---

## 👨‍💻 **Contributors**
- **[Your Name]** – Developer, Data Engineer
- **Professor [Advisor's Name]** – Project Advisor  
- Special thanks to the **[University/Department Name]** for supporting this project.

---

## 📄 **License**
This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---

## 🌟 **Future Improvements**
- Expand data sources for broader insights.
- Add sentiment analysis for emotional trends in lyrics.
- Develop additional visualization options for enhanced user experience.

---

If you have any questions, feel free to contact me at [your.email@example.com](mailto:your.email@example.com).

> **Empowering research through data-driven insights.**
