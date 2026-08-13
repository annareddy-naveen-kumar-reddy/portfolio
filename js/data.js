/**
 * Portfolio Data Store & Modal Detail Provider
 * ANNAREDDY NAVEEN KUMAR REDDY
 * 
 * Note: All project data, education, and skills are strictly grounded 
 * in real user-supplied data without fabrication.
 */

const PORTFOLIO_DATA = {
  profile: {
    fullName: "ANNAREDDY NAVEEN KUMAR REDDY",
    displayName: "Naveen",
    title: "B.Tech ECE Student | Aspiring Software Engineer",
    location: "Kadapa, Andhra Pradesh, India",
    email: "naveenkumarreddyannareddy@gmail.com",
    phone: "7013998257",
    github: "https://github.com/annareddy-naveen-kumar-reddy",
    linkedin: "https://www.linkedin.com/in/annareddy-naveen-kumar-reddy-037343377/",
    instagram: "https://www.instagram.com/naveen._.redde"
  },

  projects: {
    smartlabtwinai: {
      id: "smartlabtwinai",
      name: "SmartLabTwinAI",
      fullTitle: "SmartLabTwinAI: An AI-Powered Digital Twin for Intelligent Laboratory Monitoring, Predictive Maintenance, and Smart Energy Management",
      badge: "Major IoT + AI Project",
      status: "In Active Development",
      summary: "An intelligent laboratory monitoring system combining IoT microcontrollers, AI algorithms, and a digital twin dashboard to monitor physical laboratory conditions, identify anomalous patterns, and facilitate predictive maintenance and smart energy management.",
      problem: "Traditional academic and research laboratories often lack automated environmental monitoring, leading to undetected equipment thermal throttling, excessive standby power consumption, and unexpected hardware failures without advance warning.",
      solution: "SmartLabTwinAI bridges hardware telemetry and cloud computing by deploying ESP32 microcontrollers with multi-sensor arrays (temperature, humidity, voltage, current) connected to an AI-driven digital twin web dashboard that identifies anomalies in real time and predicts maintenance needs.",
      technologies: [
        "ESP32",
        "IoT",
        "Python",
        "AI Anomaly Detection",
        "Sensors (DHT, Voltage, Current)",
        "Web Dashboard",
        "Temperature Monitoring",
        "Humidity Monitoring",
        "Voltage Monitoring",
        "Current Monitoring",
        "Predictive Maintenance",
        "Smart Energy Management"
      ],
      keyFeatures: [
        "Real-time physical laboratory environmental & electrical telemetry",
        "Multi-sensor precision tracking (temperature, humidity, voltage, and current levels)",
        "AI-based anomaly detection algorithms for early fault identification",
        "Digital Twin interactive web dashboard reflecting physical lab state",
        "Smart threshold alarms and notification triggers",
        "Predictive maintenance analysis for laboratory testbenches",
        "Smart energy optimization reducing standby power dissipation",
        "Modular architecture with optional fire & smoke detection sensors"
      ],
      githubUrl: null, // Private / Coming soon
      demoUrl: null    // Coming soon
    },

    smartattendance: {
      id: "smartattendance",
      name: "AI Smart Attendance System",
      fullTitle: "AI Smart Attendance System: Automated Face Recognition & Cloud Sync",
      badge: "AI + Computer Vision Project",
      status: "In Active Development",
      summary: "A high-performance face-recognition-based automated attendance management system built using Python, OpenCV, Flask, SQLite, and Google Sheets API integration.",
      problem: "Manual attendance marking via paper rolls or manual roll calls is time-consuming, prone to human error, proxy attendance, and tedious manual data entry for faculty.",
      solution: "An end-to-end automated software solution that captures face datasets, performs real-time face detection and feature recognition via OpenCV, logs verified records in an SQLite database, and synchronizes real-time attendance logs directly to Google Sheets and Flask web dashboard.",
      technologies: [
        "Python",
        "Flask",
        "OpenCV",
        "Face Recognition",
        "SQLite",
        "Google Sheets API",
        "Computer Vision",
        "HTML/CSS/JS"
      ],
      keyFeatures: [
        "Student profile registration and automated face dataset collection",
        "Real-time video stream face detection and feature matching",
        "Automated instantaneous attendance timestamping with proxy prevention",
        "Structured SQLite local database for fast query execution",
        "Flask-powered administrative dashboard for student & attendance record management",
        "Attendance search, filtering by date/section, and student profile inspection",
        "Automated real-time cloud backup with Google Sheets API integration",
        "Export capabilities for generating CSV and Excel summary reports"
      ],
      githubUrl: null, // Private / Coming soon
      demoUrl: null    // Coming soon
    }
  },

  // Future Certificates template structure
  certificates: [
    /* To add new certificates, simply add objects here:
    {
      id: "cert-1",
      name: "Certificate Name",
      issuer: "Issuing Organization",
      date: "Month Year",
      verificationUrl: "https://...",
      image: "assets/images/cert-1.jpg"
    }
    */
  ]
};

// Export to window for vanilla JS access
window.PORTFOLIO_DATA = PORTFOLIO_DATA;
