/**
 * ------------------------------------------------------------------
 *  PORTFOLIO CONTENT — edit this file to update the site.
 * ------------------------------------------------------------------
 *  Sources used (in priority order):
 *   1. CV (public/assets/cv/Abdallah_Essam_CV.pdf) — dates, titles, education
 *   2. Each project's GitHub README — implementation detail and limitations
 *   3. Supplied certificate / competition images — titles, issuers, results
 *   4. GitHub profile README — supplementary only
 *  Image paths are relative to /public (no leading slash) so the site works
 *  under any GitHub Pages base path.
 * ------------------------------------------------------------------
 */

import type {
  Certification,
  Competition,
  ExperienceItem,
  JourneyItem,
  MiniProject,
  Project,
  SkillGroup,
} from "./types";

const GH = "https://github.com/abdallahhessam";

export const profile = {
  name: "Abdallah Essam",
  headline: "Mechatronics & Robotics Engineer",
  role: "Robotics & AI Specialist at Atlab",
  location: "Dubai, UAE",
  statement:
    "I build robots end to end — the mechanism, the electronics, the firmware and the perception stack — and I teach other engineers how to do the same.",
  email: "esamabdallah683@gmail.com",
  phone: "+971 56 260 7011",
  phoneHref: "tel:+971562607011",
  linkedin: "https://www.linkedin.com/in/abdallah-esam/",
  github: GH,
  cv: "assets/cv/Abdallah_Essam_CV.pdf",
  cvFileName: "Abdallah_Essam_CV.pdf",
};

/** Short facts shown beside the hero. Each is stated in the CV or a supplied document. */
export const heroFacts: { label: string; value: string }[] = [
  { label: "Currently", value: "ROS 2 robotics on Jetson AGX Orin at Atlab" },
  { label: "Platforms", value: "Arms, ground vehicles, humanoid, quadruped, UAVs" },
  { label: "Degree", value: "BSc Automotive Mechatronics, Helwan University" },
];

export const about = {
  paragraphs: [
    "I have 5+ years of hands-on experience in robotics, autonomous systems, embedded computing and AI-based perception. I trained as an automotive mechatronics engineer, which means I was taught to treat a vehicle as one system: mechanics, power electronics, embedded control and software that all have to agree with each other. I still work that way.",
    "At Atlab I develop and integrate robotic systems with ROS 2, RViz and Gazebo — a Niryo Ned2 arm, a Quanser QCar2 autonomous vehicle, Unitree G1 and Go2 robots and UAV platforms — and deploy YOLO/ONNX perception on NVIDIA Jetson AGX Orin. I also design the 3D-printed fixtures and sensor enclosures those robots need.",
    "Before that I spent several years teaching robotics, writing competition rulebooks and coaching teams. That work shaped how I engineer: I document systems so someone else can rebuild them, and I design challenges that test real skills like pick-and-place and autonomous navigation.",
  ],
  pillars: [
    {
      title: "Hardware",
      text: "Mechanical design in SolidWorks and Fusion 360, 3D printing, motor sizing, drivetrains, power and wiring.",
    },
    {
      title: "Embedded and control",
      text: "STM32, ESP32 and Raspberry Pi firmware, PID control, CAN, LIN, UART, SPI, I2C, MQTT and SOME/IP.",
    },
    {
      title: "Autonomy and perception",
      text: "ROS 2, Gazebo and RViz, YOLO and ONNX Runtime, OpenCV, Kalman filtering, Jetson deployment.",
    },
    {
      title: "Teaching and leadership",
      text: "Training for educators and engineers, STEM curricula, competition design for 1,000+ participants.",
    },
  ],
};

/** Engineering journey: grouped milestones, not a copy of the experience list. */
export const journey: JourneyItem[] = [
  {
    period: "2017",
    title: "Berry Energy reaches the ISEF Egypt finals",
    text: "A dye-sensitized solar cell with an Arduino sun tracker, built with a classmate at the Alexandria STEM School.",
    kind: "competition",
    link: "#competitions",
  },
  {
    period: "2018",
    title: "Graduates from the Alexandria STEM School",
    text: "Math branch, with practical courses in engineering electronics and engineering robots.",
    kind: "education",
  },
  {
    period: "2019",
    title: "Starts Automotive Mechatronics at Helwan University",
    text: "The same year, leads team Pegasi to 2nd place at NASA Space Apps Cairo with an ocean-cleanup concept.",
    kind: "education",
    link: "#competitions",
  },
  {
    period: "2021 – 2022",
    title: "Founds the Pegasi robotics team",
    text: "Leads mechanical design of the Scarab combat robot, which takes 4th place at Metal Monsters (4th edition).",
    kind: "competition",
    link: "#case/scarab",
  },
  {
    period: "2022 – 2025",
    title: "Teaches robotics and coaches competition teams",
    text: "Engineeius, then Discovery AST and Rsanh: Arduino, ESP32, Raspberry Pi, PCB design, SolidWorks and curricula for grades 9 and 10.",
    kind: "work",
    link: "#experience",
  },
  {
    period: "2024",
    title: "Graduates with an A+ project",
    text: "Adaptive AUTOSAR communication stack graduation project, graded A+. That summer, builds autonomous-track software for EVER 2024 with team E-Rally.",
    kind: "education",
    link: "#projects",
  },
  {
    period: "2024 – 2025",
    title: "Runs the technical side of the Global Robotics Challenge",
    text: "Designs challenges, rulebooks and arenas for 1,000+ participants in 150 teams.",
    kind: "work",
    link: "#experience",
  },
  {
    period: "2025 – now",
    title: "Robotics & AI Specialist at Atlab, Dubai",
    text: "ROS 2 integration, Jetson-based perception and autonomy, UAVs, humanoid and quadruped robots. Mentors drone teams at the UMEX Drone Challenge, who go on to place 2nd and 3rd.",
    kind: "work",
    link: "#case/umex",
  },
];

/* ------------------------------------------------------------------ */
/*  FEATURED PROJECTS                                                   */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    id: "umex",
    title: "UMEX Drone Challenge: autonomous maze missions",
    summary:
      "Reference solutions I built and taught for Hula drones: explore an unknown maze, race it with A*, and find objects with an ONNX YOLO11 detector. Teams I mentored went on to place 2nd and 3rd.",
    titleBlock: {
      context: "UMEX 2026 Drone Challenge, Abu Dhabi (EDGE and UAE Ministry of Defense)",
      role: "Technical mentor (project-based)",
      evidence: "Flown on real drones",
      year: "2025 – 2026",
    },
    result: "Mentored teams placed 2nd and 3rd",
    tags: ["Python", "pyhula SDK", "DFS / BFS / A*", "ONNX Runtime", "YOLO11", "OpenCV", "Tkinter"],
    cover: {
      src: "assets/projects/umex/drone-lab-setup.webp",
      alt: "Drone lab: a small Hula drone on a table between two laptops running Python, with a QR-guided test course and gates behind.",
      w: 1400,
      h: 827,
    },
    repo: `${GH}/UMEX_Drone_Challenge_AUH_2026`,
    caseStudy: {
      problem:
        "Two autonomous missions on a small educational drone. First, reach a target cell in an n × n maze whose walls are unknown, using proximity sensors and a QR-code floor for position. Second, build an operator interface that flies to given cells and identifies objects with an organizer-supplied ONNX model. Code was frozen the evening before the event, and a crash meant restarting from the crash point with the clock running.",
      role: [
        "Mentored university students and graduate engineers, in teams, from November 2025 to January 2026.",
        "Taught Hula drone flight dynamics, autonomous navigation, maze-solving algorithms in Python, and how the ONNX detector runs on the drone camera stream.",
        "Wrote the reference solutions for both challenges and used them to explain each step in the workshop sessions.",
        "Helped teams debug flight code, sensor readings and the detection pipeline under competition constraints.",
      ],
      architecture: [
        "A laptop runs all the logic and sends flight commands through the pyhula SDK.",
        "Sensing: four-direction proximity readings build the wall map; QR tags on the carpet give x, y and z in centimeters to centre the drone in each 60 cm cell; H.264 video arrives over RTP and is decoded with ffmpeg.",
        "The maze is stored as four wall flags per cell in maze.json.",
        "Challenge 2 adds a Tkinter command interface: mission inputs, A* planning, flight, a turn to the look direction, ONNX detection and a snapshot list.",
      ],
      implementation: [
        "Discovery uses depth-first search with physical backtracking. The drone keeps its camera facing north and strafes, so every move is one fixed 60 cm step. On the sample maze it maps 34 cells in 66 moves.",
        "Racing uses A* with a Manhattan-distance heuristic. On the discovered 6 × 6 maze, A* expanded 18 cells, against 30 for BFS and 34 for DFS, for the same 11-move path.",
        "Detection runs a YOLO11s model exported to ONNX (640 × 640 input; House, Tank, Tree) on the CPU with ONNX Runtime, a 0.3 confidence threshold and non-maximum suppression at IoU 0.2.",
        "Each new label saves an annotated snapshot named by cell, which the judges validate.",
      ],
      results: [
        "One team I mentored placed 3rd overall in the MoD Drone Challenge at UMEX 2026: 2nd of 28 teams in Challenge 1 and 3rd of 17 in Challenge 2. Another participant reported his team took 2nd place. These results belong to the teams; I supported them as a mentor.",
        "In flight tests the detector found a tank at 0.75 confidence and a house at 0.78 from only a partial view.",
        "Participant feedback included: “Your guidance and mentorship played a huge part in our performance.”",
      ],
      limitations: [
        "The ONNX model, the video helper and the detector helper were provided by the organizers; the rules required using the model unchanged.",
        "All processing runs on the laptop, not on the drone.",
        "The sample maze has no loops, so DFS, BFS and A* return the same path; in a maze with loops DFS can return a longer one.",
      ],
      video: {
        src: "assets/projects/umex/maze-solving-demo.mp4",
        webm: "assets/projects/umex/maze-solving-demo.webm",
        caption: "Maze solving with the Hula drone (muted, plays only when you press play).",
      },
      gallery: [
        {
          src: "assets/projects/umex/maze-arena.webp",
          alt: "The competition maze at UMEX in Abu Dhabi: rows of white wall panels with object pictures, inside the exhibition hall.",
          caption: "The competition maze at UMEX, Abu Dhabi.",
          w: 1300,
          h: 975,
        },
        {
          src: "assets/projects/umex/maze-solvers-comparison.webp",
          alt: "Four maze panels comparing DFS discovery order with the DFS, BFS and A* paths and expanded cells.",
          caption: "DFS, BFS and A* on the maze the drone discovered.",
          w: 1600,
          h: 433,
          light: true,
        },
        {
          src: "assets/projects/umex/detection-tank.webp",
          alt: "Drone camera frame with a green bounding box labelled Tank 0.75 around a tank picture on the maze wall.",
          caption: "Detection snapshot saved during a mission: Tank, 0.75.",
          w: 1000,
          h: 562,
        },
        {
          src: "assets/projects/umex/system-diagram.svg",
          alt: "System diagram: the laptop sends flight commands through the SDK and receives proximity, QR position and the video stream from the drone.",
          caption: "System diagram from the repository.",
          w: 1000,
          h: 580,
          light: true,
        },
        {
          src: "assets/projects/umex/debugging-session.webp",
          alt: "A participant and a team member reviewing code on a laptop during a workshop session.",
          caption: "Reviewing flight code with a participant.",
          w: 900,
          h: 1200,
        },
      ],
    },
  },
  {
    id: "scarab",
    title: "Scarab combat robot",
    summary:
      "A 2 mm welded steel combat robot with a 350 W spinner weapon and ESP32 control over a Bluetooth PS4 controller.",
    titleBlock: {
      context: "Metal Monsters, 4th edition",
      role: "Founder & mechanical lead, team Pegasi",
      evidence: "Physical build",
      year: "2022",
    },
    result: "4th place",
    tags: ["ESP32", "PlatformIO", "DC motor control", "Chain drive", "Sheet-metal chassis"],
    cover: {
      src: "assets/projects/scarab/front.webp",
      alt: "Scarab combat robot, front view: low black steel chassis with a spinner bar and four exposed wheels.",
      w: 1080,
      h: 1080,
      position: "50% 12%",
    },
    repo: `${GH}/scarab-combat-robot`,
    caseStudy: {
      problem:
        "Build a remotely controlled robot that survives a closed-arena fight, where two robots battle until one can no longer move or fight, and that complies with the competition's build rules.",
      role: [
        "Founded team Pegasi and led the mechanical design, aiming for a robust, efficient structure (CV).",
        "Designed and optimized the motor setup for torque and performance, and selected the materials and design of the weapon system (CV).",
        "Managed manufacturing and assembly against the competition regulations (CV).",
        "The team as a whole designed, built, wired and programmed the robot (repository). Individual authorship of the firmware is not stated in my sources.",
      ],
      architecture: [
        "Chassis: 2 mm welded sheet metal; four wheels driven by two MY1016Z 350 W DC motors through chains, sprockets and bearings.",
        "Weapon: a steel spinner bar driven by a third 350 W motor through a chain. The motors are rated 3200 RPM before a roughly 10.7:1 reduction to 300 RPM.",
        "Control: an ESP32 receives a PS4 controller over Bluetooth and drives two 30 A motor drivers with PWM; a relay gates power to the weapon driver.",
        "Power: three 12 V batteries through an emergency stop, with a 5 V step-down for the logic.",
      ],
      implementation: [
        "Arcade-style mixing: left stick for throttle, right stick for steering, with a slew limit on wheel output to protect the chains and drivers.",
        "The weapon must be armed (OPTIONS) before R2 can spin it; it ramps up over about 1.7 s and down in about 0.3 s to limit current spikes.",
        "Firmware is an Arduino-framework PlatformIO project split into config, a two-input PWM motor class and the control loop.",
      ],
      results: [
        "4th place among all competing teams at Metal Monsters, 4th edition, part of the Alamein Robotics Championship '22 (plaque and certificate).",
        "The welded chassis took hits through the whole competition (repository).",
      ],
      limitations: [
        "Manual control only, by design of the event.",
        "Three motors at rated current draw about 57.6 A, and stall current is higher, which is why weapon ramping and an e-stop on the main line are essential.",
      ],
      safety: [
        "Weapon relay is open at boot and every time the controller connects.",
        "If the controller disconnects, all motors stop and the relay opens.",
        "CIRCLE is an emergency stop for all motors; a physical e-stop sits on the main power line.",
      ],
      gallery: [
        {
          src: "assets/projects/scarab/internals.webp",
          alt: "Inside Scarab's chassis: three motors, chain drive, motor drivers, step-down module and battery tray.",
          caption: "Internals: three MY1016Z motors, chain drive, drivers and battery tray.",
          w: 1091,
          h: 784,
        },
        {
          src: "assets/projects/scarab/top.webp",
          alt: "Scarab seen from above, showing the spinner bar across the front and four wheels.",
          caption: "Top view.",
          w: 1300,
          h: 864,
        },
        {
          src: "assets/projects/scarab/system-diagram.svg",
          alt: "System diagram: PS4 controller to ESP32 over Bluetooth; batteries through e-stop to drivers, relay and 5 V step-down; drivers to left, right and weapon motors.",
          caption: "Power and control system diagram from the repository.",
          w: 900,
          h: 520,
          light: true,
        },
        {
          src: "assets/projects/scarab/team-pegasi.webp",
          alt: "Team Pegasi standing behind Scarab at the Metal Monsters venue.",
          caption: "Team Pegasi at Metal Monsters.",
          w: 1200,
          h: 797,
        },
      ],
    },
  },
  {
    id: "e-rally",
    title: "E-Rally autonomous track",
    summary:
      "A ROS 1 driving stack where YOLO detection, single-camera distance estimation, Kalman-filtered odometry and PID control steer a simulated car through four tracks.",
    titleBlock: {
      context: "EVER 2024, Electric Vehicle Rally, Egypt",
      role: "Autonomous-track sub-team, E-Rally (Helwan University)",
      evidence: "Simulation",
      year: "2024",
    },
    tags: ["ROS 1", "Python", "YOLO", "OpenCV", "Kalman filter", "PID", "CoppeliaSim", "MATLAB"],
    cover: {
      src: "assets/projects/e-rally/custom-track-3d.webp",
      alt: "CoppeliaSim scene of the custom track: a small autonomous car on a dark road with a building, hedge and banner beside it.",
      w: 1039,
      h: 740,
    },
    repo: `${GH}/e-rally-autonomous-track`,
    caseStudy: {
      problem:
        "Drive a simulated electric car through four tracks — linear, lane change, circular and a custom course with corners, cars, cones and pedestrians — using perception rather than scripted positions.",
      role: [
        "Member of the autonomous-track sub-team of E-Rally, representing Helwan University at EVER 2024.",
        "The repository presents the project from my side: the code, system design, test results and Milestone 3 report. The split of individual tasks within the sub-team is not stated in my sources.",
      ],
      architecture: [
        "ObjectDetection subscribes to /image, runs YOLO, estimates distance and raises lane-change and collision-avoidance flags.",
        "Odom_Manager filters /odom through a Kalman filter and unwraps the heading so it keeps counting past 360°.",
        "VehicleController follows the track, applies the flags and publishes /cmd_vel, /SteeringAngle and /brakes; separate PID loops handle path distance, pedestrian distance and steering.",
      ],
      implementation: [
        "Two YOLO models: a car/cone/pedestrian model for the basic tracks, and a 7-class model trained on 384 images (1,513 annotations) for the custom track. Detections are kept above 0.7 confidence.",
        "Only objects whose box corner falls inside a triangular lane region in front of the car get a distance estimate.",
        "Distance comes from bounding-box height and a known object height, using a line calibrated in simulation between 5 m and 10 m.",
        "The Kalman filter uses a 6-state constant-velocity model (0.1 s step). Pedestrians slow the car to a stop at 6.5 m; a car within 12 m triggers a lane change; a cone within 9 m triggers an avoidance maneuver.",
      ],
      results: [
        "Completed all four tracks in simulation; runs were logged and plotted in MATLAB (trajectory, speed, heading, steering, pedestrian distance, raw vs filtered odometry).",
        "Runs shown were recorded between 14 July and 11 August 2024.",
      ],
      limitations: [
        "Simulation only (CoppeliaSim EDU); the stack was not run on a physical vehicle.",
        "The distance fit is calibrated between 5 m and 10 m; values outside that range are extrapolated and clipped at zero.",
        "This is a ROS 1 (rospy) project, with model paths that must be set per machine.",
      ],
      video: {
        src: "assets/projects/e-rally/circular-track.mp4",
        webm: "assets/projects/e-rally/circular-track.webm",
        caption: "Circular track run in CoppeliaSim (muted, plays only when you press play).",
      },
      gallery: [
        {
          src: "assets/projects/e-rally/pedestrian-lane-roi.webp",
          alt: "Camera view with a red triangular lane region and a detected pedestrian box inside it.",
          caption: "Lane region of interest: only objects inside the red triangle get a distance estimate.",
          w: 602,
          h: 304,
        },
        {
          src: "assets/projects/e-rally/system-uml.webp",
          alt: "UML class diagram of the ROS node: ObjectDetection, Odom_Manager, Kalman_Filter, VehicleController and PIDController.",
          caption: "Node class diagram.",
          w: 681,
          h: 621,
          light: true,
        },
        {
          src: "assets/projects/e-rally/custom-track-telemetry.webp",
          alt: "MATLAB telemetry plots for the custom track: trajectory, speed, orientation, steering and odometry.",
          caption: "Custom-track telemetry plotted in MATLAB.",
          w: 948,
          h: 591,
          light: true,
        },
        {
          src: "assets/projects/e-rally/distance-calibration.webp",
          alt: "Plot of distance against pixel height for 1 m and 2 m objects.",
          caption: "Single-camera distance calibration.",
          w: 869,
          h: 501,
          light: true,
        },
      ],
      extraLinks: [{ label: "Milestone 3 report (PDF, in repository)", href: `${GH}/e-rally-autonomous-track/blob/main/docs/report/Milestone_Three_Report.pdf` }],
    },
  },
  {
    id: "agri",
    title: "Agri plant-health robot",
    summary:
      "A Raspberry Pi field robot that classifies leaves as healthy, rust or powdery, measures soil moisture and pH, waters and harvests, and reports each plant over MQTT.",
    titleBlock: {
      context: "Agricultural robotics",
      evidence: "Prototype hardware; software rebuilt and tested in simulation",
      year: "2024",
    },
    tags: ["Raspberry Pi 4", "Python", "TensorFlow Lite", "OpenCV", "MQTT / Mosquitto", "SQLite"],
    cover: {
      src: "assets/projects/agri-plant-health/robot.webp",
      alt: "The agri-robotics platform on artificial grass: a four-wheeled base with a camera, sensor probe and a multi-joint robot arm.",
      w: 1100,
      h: 1166,
      position: "50% 40%",
    },
    repo: `${GH}/agri-plant-health-monitor`,
    caseStudy: {
      problem:
        "Check each plant in a row without a person walking it: spot leaf disease, read the soil, water when needed, harvest when ready, and keep a record on a server.",
      role: [],
      architecture: [
        "Sensing: USB camera, analog soil moisture and pH sensors through an MCP3008 ADC over SPI.",
        "Processing on a Raspberry Pi 4 Model B: OpenCV, a TensorFlow Lite leaf classifier and a data-fusion step.",
        "Transport: paho-mqtt to a Mosquitto broker with telemetry, event, status (last will) and command topics.",
        "Analytics: a server subscriber storing reports in SQLite, with a summary and CSV export script.",
        "Actuation: DC traction motors, a stepper and lever that lower the soil probe, a water pump, and a five-servo harvesting arm.",
      ],
      implementation: [
        "A sensor thread and a CV thread feed separate queues; at each plant the mission controller fuses a sampling window into one report.",
        "Class probabilities are averaged across frames, soil values use the median of valid readings, and readings from a disconnected sensor are discarded. With too little evidence the plant is reported as 'unknown'.",
        "Two-point pH calibration (pH 7 and pH 4 buffers) and dry/wet moisture calibration. Watering repeats in cycles with a hard cap on pump time per plant.",
        "Classifier: MobileNetV2 transfer learning on the Kaggle plant-disease recognition dataset, exported to TensorFlow Lite.",
      ],
      results: [
        "The repository reports about 90% validation accuracy from its training run; retraining produces new numbers.",
        "Unit tests cover calibration, the VARI greenness index, fusion, config overrides, MQTT handling and analysis. The full pipeline has been run in simulation against a real Mosquitto broker, including pause, resume, stop and broker-outage cases.",
      ],
      limitations: [
        "The current repository is a rebuilt version of the robot's software. Pin numbers, calibration voltages and arm poses are placeholders, and behaviour on the physical robot has not been re-verified with this code.",
        "Open-loop driving between plants (no encoders or line following) and a fixed probe depth with no limit switch.",
        "'Ready to harvest' currently means a confident healthy classification rather than a true ripeness check.",
      ],
      gallery: [
        {
          src: "assets/projects/agri-plant-health/system-diagram.webp",
          alt: "System diagram: soil moisture, pH and camera feed the Raspberry Pi, which publishes to a Mosquitto broker and a server.",
          caption: "System overview: sensing, processing, transport and analytics.",
          w: 1400,
          h: 1179,
        },
        {
          src: "assets/projects/agri-plant-health/sensor-cv-pipeline.webp",
          alt: "Software pipeline on the Pi: sensor thread and CV thread feed queues into data fusion and the MQTT client.",
          caption: "On-robot pipeline: two threads, two queues, one fused report.",
          w: 1400,
          h: 1217,
        },
        {
          src: "assets/projects/agri-plant-health/training-accuracy.webp",
          alt: "Training and validation accuracy curves for the leaf classifier.",
          caption: "Training and validation accuracy from the repository's training run.",
          w: 778,
          h: 477,
          light: true,
        },
      ],
    },
  },
  {
    id: "autosar",
    title: "Adaptive AUTOSAR communication stack",
    summary:
      "My A+ graduation project: an infotainment application on Adaptive AUTOSAR concepts, with SOME/IP over Ethernet between distributed components on Raspberry Pi.",
    titleBlock: {
      context: "BSc graduation project, Helwan University",
      role: "Graduation project (team composition to be confirmed)",
      evidence: "Architecture and partial implementation",
      year: "2024",
    },
    result: "Grade A+",
    tags: ["Modern C++", "CMake", "SOME/IP", "Ethernet", "MQTT", "Raspberry Pi", "Embedded Linux"],
    diagram: "autosar",
    repo: `${GH}/Adaptive-AutoSAR-Com-Stack`,
    caseStudy: {
      problem:
        "Model how a modern vehicle's software talks to itself: build a scalable infotainment application where distributed components discover each other and exchange data over Ethernet, as in the Adaptive AUTOSAR platform.",
      role: [
        "Graduation project, graded A+ on the degree certificate (both project courses).",
        "Designed the infotainment application on Adaptive AUTOSAR architecture with SOME/IP inter-process communication on Raspberry Pi, and integrated MQTT for lightweight publish/subscribe messaging (CV).",
      ],
      architecture: [
        "Infotainment application and touchscreen HMI on top of a navigation service.",
        "ara::com communication layer bound to SOME/IP over IPv4 Ethernet: service discovery, remote procedure calls and publish/subscribe events.",
        "ara::exec execution management and ara::sm state management for application lifecycle and machine states; ara::phm health supervision; ara::log logging.",
        "Raspberry Pi hardware with a BSD-socket Ethernet layer.",
      ],
      implementation: [
        "C++ with CMake. The public repository includes the ara::core types (vector, array, map, string, error codes, instance specifier) and the ara::exec cluster (execution client, state client, function groups, deterministic client, worker threads).",
        "A TCP socket client/server test exercises the Ethernet layer, and an ARXML reader parses manifest files.",
        "The CV adds simulated real-time automotive network behaviour across distributed components on embedded Linux.",
      ],
      results: [
        "Graded A+ (degree certificate, May 2024).",
      ],
      limitations: [
        "This is an Adaptive AUTOSAR-inspired academic stack, not a production-certified AUTOSAR platform.",
        "SOME/IP, state management, health management and logging are described in the README, but their source is not yet in the public repository.",
        "Diagnostics, persistency, cryptography and time synchronization are out of scope; signal-based and DDS bindings are not implemented.",
      ],
      gallery: [],
    },
  },
];

export const moreProjects: MiniProject[] = [
  {
    title: "RC car with STM32",
    text: "A remote-controlled car on an STM32 ARM microcontroller, with firmware organized in C++ and motor control.",
    tags: ["STM32", "C++", "Motor control"],
    repo: `${GH}/RC-Car`,
  },
  {
    title: "RGB LED color blending",
    text: "STM32 PWM control of red, green and blue channels to mix colors, flashed with ST-LINK.",
    tags: ["STM32", "Embedded C", "PWM"],
    repo: `${GH}/RGB`,
  },
];

/* ------------------------------------------------------------------ */
/*  COMPETITIONS & INNOVATION                                           */
/* ------------------------------------------------------------------ */

export const competitions: Competition[] = [
  {
    id: "isef",
    event: "ISEF Egypt, national fair (Intel ISEF-affiliated)",
    year: "2017",
    achievement: "National finalist",
    role: "Co-presenter (team of two)",
    project: "Berry Energy: a berry-dye-sensitized solar cell with a sun tracker",
    problem:
      "Dye-sensitized solar cells are cheap and work in diffuse light, but their efficiency is low. Could tracking the sun and focusing more light on the cell help?",
    solution:
      "We made DSSCs on conductive glass with titanium dioxide and natural plant dyes, then mounted the cell on an Arduino Uno and servo tracker geared to follow the sun, with two side mirrors set at an angle to reflect extra light onto it.",
    image: {
      src: "assets/competitions/isef/team-photo.webp",
      alt: "Two students standing in front of their exhibition booth at the science fair.",
      w: 1300,
      h: 974,
    },
    detail: {
      objective:
        "Increase the light a dye-sensitized cell receives by keeping it perpendicular to the sun and adding reflected light, as a low-cost route to better renewable generation in Egypt.",
      approach: [
        "Built the cell: drilled conductive glass, spread titanium dioxide and a platinum catalyst, heated the plates, stained the electrode with the dye, sealed and filled it with electrolyte.",
        "Compared dyes from five plant sources, including berries and beet.",
        "Built the tracker from photo foam, with two gears to set the tracking speed, and programmed the Arduino to drive the servo with the sun's motion.",
        "Mounted east and west mirrors and tested mirror angles to find the best one.",
      ],
      reported:
        "The poster reports higher readings with tracking and mirrors, peaking at a 24° mirror angle. These were the team's own measurements on a student prototype, not independently verified.",
      people: "Poster authors: Abdallah Essam and Ahmed Dawood.",
      gallery: [
        {
          src: "assets/competitions/isef/poster.webp",
          alt: "Berry Energy research poster with abstract, materials, methods, analysis, results and conclusion.",
          caption: "Competition poster for the Egyptian national fair, affiliated with Intel ISEF.",
          w: 2000,
          h: 1400,
          light: true,
        },
      ],
    },
  },
  {
    id: "nasa",
    event: "NASA Space Apps Cairo",
    year: "2019",
    achievement: "2nd place in category",
    secondary: "Nominated for the People's Choice Award",
    role: "Team leader and prototype lead, team Pegasi (five members)",
    project: "Ocean Trap: a passive floating plastic collector",
    problem:
      "Plastic accumulates in the ocean, and active collection systems need power and crews to empty them.",
    solution:
      "A U-shaped floating tube that drifts with the current and gathers plastic without external energy, a gate (servo and ultrasonic sensor) that closes when it is full, and a mobile app that shows where each unit is and when it needs emptying.",
    image: {
      src: "assets/competitions/nasa/prototype.webp",
      alt: "Two team members holding the floating collector prototype in front of a slide with the team name Pegasi.",
      caption: "The collector model at NASA Space Apps Cairo 2019.",
      w: 864,
      h: 1152,
    },
    detail: {
      objective:
        "Design a cleanup system that needs no external energy to collect floating plastic and tells the operator when it is full.",
      approach: [
        "Led a five-person team (mobile app, Arduino, presentation, video and data) and built the prototype.",
        "Modelled a U-shaped floating tube with a skirt underneath, so smaller particles cannot escape below it. The system moves with the current instead of using power.",
        "Added a gate driven by a servo and an ultrasonic level sensor that closes automatically once the collector is full, and a drag parachute to slow the system down.",
        "When full, the unit signals a ship. The team's mobile app lists each unit with its status (empty, collecting, full) and shows it on a map.",
      ],
      reported:
        "Presented as a hackathon concept with a physical model, CAD renders and a working app mock-up. The app screens use sample positions. The system was not deployed or tested at sea.",
      people: "Team Pegasi, five members. My role: prototype and team leader.",
      gallery: [
        {
          src: "assets/competitions/nasa/team.webp",
          alt: "Four members of team Pegasi on stage at NASA Space Apps Cairo holding a Vested Summit invitation board.",
          caption: "Team Pegasi on stage at NASA Space Apps Cairo 2019, holding an invitation to Vested Summit.",
          w: 1150,
          h: 862,
        },
        {
          src: "assets/competitions/nasa/design-renders.webp",
          alt: "Two 3D renders of the collector: a U-shaped floating barrier with a hanging skirt, and a U-shaped tube with a mesh net.",
          caption: "Design renders of the U-shaped collector, from the team's presentation.",
          w: 1300,
          h: 473,
          light: true,
        },
        {
          src: "assets/competitions/nasa/mobile-app.webp",
          alt: "Two phone screens from the Ocean Trap app: a list of prototypes with empty, full and collecting status, and a map with coloured pins.",
          caption: "The Ocean Trap app: unit status and map (sample data).",
          w: 1100,
          h: 686,
          light: true,
        },
      ],
    },
  },
  {
    id: "metal-monsters",
    event: "Metal Monsters, 4th edition",
    year: "2022",
    achievement: "4th place",
    role: "Founder & mechanical lead, team Pegasi",
    project: "Scarab combat robot",
    problem: "Survive one-on-one combat in a closed arena.",
    solution: "Welded steel chassis, chain-driven 350 W spinner, ESP32 control with failsafes.",
    image: {
      src: "assets/competitions/metal-monsters/award-plaque.webp",
      alt: "Glass plaque reading 'Pegasi, 4th place winner' in front of the Metal Monsters participation certificate.",
      w: 1200,
      h: 1016,
    },
    caseStudyId: "scarab",
  },
];

/* ------------------------------------------------------------------ */
/*  EXPERIENCE (CV)                                                     */
/* ------------------------------------------------------------------ */

export const experience: ExperienceItem[] = [
  {
    title: "Robotics & AI Specialist",
    org: "Atlab",
    place: "Dubai",
    type: "Full-time",
    period: "Jul 2025 – Present",
    current: true,
    points: [
      "Develop and integrate robotic systems with ROS 2, RViz and Gazebo across a Niryo Ned2 arm and a Quanser QCar2 autonomous vehicle.",
      "Implement path planning, control and perception in Python, C++ and MATLAB/Simulink for deployment on NVIDIA Jetson AGX Orin.",
      "Build YOLO/ONNX object detection for real-time, perception-driven autonomous navigation.",
      "Configure Unitree G1 humanoid and Go2 quadruped robots: ROS 2 packages, SDK integration, URDF models and simulation.",
      "Integrate and evaluate UAV platforms, including flight control, onboard sensors and autonomous programming workflows.",
      "Design 3D-printed components, sensor enclosures and fixtures, and deliver robotics and AI training for educators and engineers.",
    ],
  },
  {
    title: "Technical Mentor",
    org: "UMEX Drone Challenge",
    place: "Abu Dhabi",
    type: "Project-based",
    period: "Nov 2025 – Jan 2026",
    points: [
      "Mentored university students and graduate engineers building autonomous UAVs for competition missions.",
      "Guided teams on flight dynamics, autonomous navigation, maze solving and ONNX object detection, and helped debug flight control and mission planning under competition constraints.",
    ],
    link: "#case/umex",
    linkLabel: "See the UMEX case study",
  },
  {
    title: "Technical Project Manager",
    org: "Global Robotics Challenge (GRC)",
    place: "Cairo",
    type: "Project-based",
    period: "Oct 2024 – Jun 2025",
    points: [
      "Led the technical development of the competition for over 1,000 participants in 150 teams.",
      "Created manipulation, pick-and-place and autonomous-navigation challenges, with a rulebook for each.",
      "Designed the arenas and components in OnShape and SolidWorks, with versioned CAD libraries for the technical team.",
    ],
  },
  {
    title: "STEM & Robotics Instructor",
    org: "Rsanh Educational Consultant",
    place: "Cairo",
    type: "Part-time",
    period: "Dec 2024 – Jul 2025",
    points: [
      "Designed a robotics curriculum and hands-on activities for grades 9 and 10 with partner schools.",
    ],
  },
  {
    title: "Robotics Instructor",
    org: "Discovery AST",
    place: "Cairo",
    type: "Full-time",
    period: "Aug 2023 – Jul 2025",
    points: [
      "Taught Arduino, Raspberry Pi, PCB design and ESP32 IoT, and SolidWorks for robot components and CAD-to-fabrication workflows.",
      "Coached national and international robotics competition teams.",
    ],
  },
  {
    title: "STEM & Robotics Instructor",
    org: "Engineeius",
    place: "Cairo",
    type: "Part-time",
    period: "Oct 2022 – Jul 2023",
    points: ["Taught Arduino, robot design, motors and communication protocols, plus project presentation and business planning."],
  },
  {
    title: "Founder & Mechanical Engineer",
    org: "Pegasi Robotics Team",
    place: "Cairo",
    period: "Dec 2021 – May 2022",
    points: [
      "Led mechanical design, motor optimization and weapon-system design for the Scarab combat robot, and managed manufacturing and assembly.",
    ],
    link: "#case/scarab",
    linkLabel: "See the Scarab case study",
  },
];

/* ------------------------------------------------------------------ */
/*  SKILLS (no proficiency levels — by design)                          */
/* ------------------------------------------------------------------ */

export const skills: SkillGroup[] = [
  {
    title: "Robotics and autonomous systems",
    items: ["ROS 2", "ROS 1", "Gazebo", "RViz", "URDF", "PID control", "Closed-loop real-time control", "UAV flight control", "Robot arms", "Mobile robots", "Humanoid & quadruped (Unitree)"],
  },
  {
    title: "Programming and embedded software",
    items: ["Modern C++ (11/14/17)", "Embedded C", "Python", "Bash", "RTOS", "HAL interfacing", "OOP, SOLID & design patterns"],
  },
  {
    title: "AI and computer vision",
    items: ["OpenCV", "YOLO", "ONNX Runtime", "TensorFlow Lite", "Object detection", "Image processing", "Perception systems"],
  },
  {
    title: "Embedded hardware and electronics",
    items: ["NVIDIA Jetson AGX Orin", "STM32", "ESP32", "AVR", "Arduino", "Raspberry Pi", "PCB design", "DC, stepper & servo motor control", "Cameras & IMUs"],
  },
  {
    title: "Communication and automotive software",
    items: ["Adaptive AUTOSAR concepts", "SOME/IP", "Ethernet", "CAN", "LIN", "MQTT", "UART", "I2C", "SPI"],
  },
  {
    title: "Mechanical CAD and fabrication",
    items: ["SolidWorks", "Fusion 360", "OnShape", "3D printing", "Mechanical prototyping", "Hardware integration"],
  },
  {
    title: "Simulation and engineering tools",
    items: ["MATLAB", "Simulink", "CoppeliaSim", "STM32CubeIDE", "PlatformIO", "Linux (Ubuntu)", "Git", "VS Code"],
  },
];

/* ------------------------------------------------------------------ */
/*  CREDENTIALS                                                         */
/* ------------------------------------------------------------------ */

export const certifications: Certification[] = [
  {
    title: "ROS 2 Foundations: Architecture, Programming & Core Concepts",
    issuer: "Packt, offered through Coursera",
    date: "May 29, 2026",
    verify: "https://coursera.org/verify/9JO8LP5O1O46",
    image: {
      src: "assets/certificates/ros2-foundations-packt-coursera.webp",
      alt: "Coursera course certificate for ROS 2 Foundations, authorized by Packt.",
      w: 1210,
      h: 935,
    },
  },
  {
    title: "Embedded C++ Diploma",
    issuer: "Robotics Corner",
    topics: "Modern C++, SOLID and design patterns, DevOps, microcontroller interfacing, RTOS",
    image: {
      src: "assets/certificates/embedded-cpp-diploma-robotics-corner.webp",
      alt: "Robotics Corner certificate of completion for the Embedded C++ Diploma.",
      w: 1287,
      h: 910,
    },
  },
  {
    title: "LEGO Education Academy Teacher Trainer",
    issuer: "LEGO Education Academy",
    date: "July 21, 2026",
    topics: "Authorized to deliver LEGO Education Academy teacher training courses",
    image: {
      src: "assets/certificates/lego-education-teacher-trainer.webp",
      alt: "LEGO Education Academy Teacher Trainer Certificate.",
      w: 1300,
      h: 731,
    },
  },
  {
    title: "STEM.org Certified Educational Instructor",
    issuer: "STEM.org",
    date: "August 5, 2025",
    image: {
      src: "assets/certificates/stem-org-certified-educational-instructor.webp",
      alt: "STEM.org Certified Educational Instructor certificate.",
      w: 1210,
      h: 935,
    },
  },
  { title: "AUTOSAR MasterClass", issuer: "SPRINTS" },
  { title: "Robotics Workshop", issuer: "BETA Academy" },
  { title: "Entrepreneurship Program for Youth", issuer: "TIEC – InnovEgypt" },
];

export const english = {
  test: "IELTS Academic",
  date: "4 October 2026",
  overall: "7.0",
  cefr: "C1",
  bands: [
    { skill: "Listening", score: "7.5" },
    { skill: "Reading", score: "7.0" },
    { skill: "Writing", score: "6.0" },
    { skill: "Speaking", score: "7.5" },
  ],
  note: "Results can be verified by recognising organisations at ielts.org/verify. Native language: Arabic.",
};

export const education = [
  {
    degree: "BSc Automotive Mechatronics Engineering",
    org: "Helwan University, Faculty of Engineering – Mataria",
    period: "2019 – 2024",
    details: [
      "GPA 3.11 / 4.0, graduated May 2024 (Very Good).",
      "Graduation project: Adaptive AUTOSAR Communication Stack for Infotainment Systems, grade A+.",
    ],
  },
  {
    degree: "Secondary school, math branch",
    org: "Alexandria STEM School",
    period: "Graduated 2018",
    details: ["Practical courses in engineering electronics and engineering robots."],
  },
];

export const awards = [
  { title: "National finalist", event: "ISEF Egypt (Intel ISEF-affiliated)", year: "2017", link: "#competitions" },
  { title: "2nd place in category; People's Choice nominee", event: "NASA Space Apps Cairo", year: "2019", link: "#competitions" },
  { title: "4th place", event: "Metal Monsters, 4th edition", year: "2022", link: "#case/scarab" },
];

export const leadership = ["Logistics Director, TEDx", "PR Member, YLY", "Events Planner, Astronomy Club – ASU", "Entrepreneurship Trainee, SCCI"];

export const nav = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "competitions", label: "Competitions" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];
