import GalleryContent from "../models/GalleryContent.js";

// Seed default Gallery Content on server start if empty
export const seedGalleryContent = async () => {
  try {
    const exists = await GalleryContent.findOne();
    if (!exists) {
      const defaultData = {
        mediaEyebrow: "Media · Gallery",
        mediaTitle: "Inside our plants",
        videosEyebrow: "Watch",
        videosTitle: "Videos & walkthroughs",
        blogsEyebrow: "Knowledge Center",
        blogsTitle: "Guides, tips & insights",
        items: [
          { title: "Aerial View — Manufacturing Complex", category: "Factory", image: "/images/DJI_0695.jpg", span: true },
          { title: "Rotomoulding Production Floor", category: "Factory", image: "/images/DJI_0629.jpg", span: false },
          { title: "Skilled Workforce on the Line", category: "Team", image: "/images/DSC_1520.jpg", span: false },
          { title: "Pan-India Dispatch Fleet", category: "Dispatch", image: "/images/DSC_1441.jpg", span: true }
        ],
        videos: [
          { title: "Aerial Tour of the Manufacturing Complex", duration: "1:58", image: "/images/DJI_0695.jpg", videoUrl: "" },
          { title: "Inside the Rotomoulding Production Floor", duration: "3:42", image: "/images/DJI_0629.jpg", videoUrl: "" },
          { title: "Skilled Hands — How a Tank Is Built", duration: "2:18", image: "/images/DSC_1520.jpg", videoUrl: "" },
          { title: "Loading & Pan-India Dispatch", duration: "2:05", image: "/images/DSC_1441.jpg", videoUrl: "" }
        ],
        blogs: []
      };
      await GalleryContent.create(defaultData);
      console.log("Default Gallery Content seeded successfully.");
    }
  } catch (error) {
    console.error(`Error seeding gallery content: ${error.message}`);
  }
};

// @desc    Get Gallery Content
// @route   GET /api/gallery
// @access  Public
export const getGalleryContent = async (req, res, next) => {
  try {
    let content = await GalleryContent.findOne();
    if (!content) {
      const defaultData = {
        mediaEyebrow: "Media · Gallery",
        mediaTitle: "Inside our plants",
        videosEyebrow: "Watch",
        videosTitle: "Videos & walkthroughs",
        blogsEyebrow: "Knowledge Center",
        blogsTitle: "Guides, tips & insights",
        items: [
          { title: "Aerial View — Manufacturing Complex", category: "Factory", image: "/images/DJI_0695.jpg", span: true },
          { title: "Rotomoulding Production Floor", category: "Factory", image: "/images/DJI_0629.jpg", span: false },
          { title: "Skilled Workforce on the Line", category: "Team", image: "/images/DSC_1520.jpg", span: false },
          { title: "Pan-India Dispatch Fleet", category: "Dispatch", image: "/images/DSC_1441.jpg", span: true }
        ],
        videos: [
          { title: "Aerial Tour of the Manufacturing Complex", duration: "1:58", image: "/images/DJI_0695.jpg", videoUrl: "" },
          { title: "Inside the Rotomoulding Production Floor", duration: "3:42", image: "/images/DJI_0629.jpg", videoUrl: "" },
          { title: "Skilled Hands — How a Tank Is Built", duration: "2:18", image: "/images/DSC_1520.jpg", videoUrl: "" },
          { title: "Loading & Pan-India Dispatch", duration: "2:05", image: "/images/DSC_1441.jpg", videoUrl: "" }
        ],
        blogs: []
      };
      content = await GalleryContent.create(defaultData);
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Gallery Content
// @route   PUT /api/gallery
// @access  Private (Admin)
export const updateGalleryContent = async (req, res, next) => {
  try {
    let content = await GalleryContent.findOne();
    if (!content) {
      content = new GalleryContent({});
    }

    const fields = [
      "mediaEyebrow",
      "mediaTitle",
      "videosEyebrow",
      "videosTitle",
      "blogsEyebrow",
      "blogsTitle",
      "items",
      "videos",
      "blogs"
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        content[field] = req.body[field];
      }
    });

    const updated = await content.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// YouTube Duration Scraper Helpers
import https from "https";

const extractYoutubeId = (url) => {
  if (!url) return null;
  const simpleReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
  const match = url.match(simpleReg);
  return match ? match[1] : null;
};

const fetchDuration = (videoId) => {
  return new Promise((resolve, reject) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const approxMatch = data.match(/"approxDurationMs"\s*:\s*"(\d+)"/);
        if (approxMatch) {
          const ms = parseInt(approxMatch[1], 10);
          const totalSecs = Math.floor(ms / 1000);
          const mins = Math.floor(totalSecs / 60);
          const secs = totalSecs % 60;
          return resolve(`${mins}:${secs.toString().padStart(2, "0")}`);
        }

        const durationMatch = data.match(/itemprop="duration"\s+content="([^"]+)"/);
        if (durationMatch) {
          const isoDuration = durationMatch[1];
          const timeMatch = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
          if (timeMatch) {
            const hours = parseInt(timeMatch[1] || 0, 10);
            const minutes = parseInt(timeMatch[2] || 0, 10);
            const seconds = parseInt(timeMatch[3] || 0, 10);
            const totalMins = hours * 60 + minutes;
            return resolve(`${totalMins}:${seconds.toString().padStart(2, "0")}`);
          }
        }

        reject(new Error("Duration not found in YouTube response"));
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
};

// @desc    Get YouTube Video Duration
// @route   GET /api/gallery/youtube-duration
// @access  Public
export const getYoutubeDurationApi = async (req, res, next) => {
  try {
    const { url } = req.query;
    if (!url) {
      res.status(400);
      throw new Error("URL is required");
    }

    const videoId = extractYoutubeId(url);
    if (!videoId) {
      res.status(400);
      throw new Error("Invalid YouTube URL");
    }

    const duration = await fetchDuration(videoId);
    res.json({ duration });
  } catch (error) {
    next(error);
  }
};
