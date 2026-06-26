import Inquiry from "../models/Inquiry.js";
import Settings from "../models/Settings.js";
import Product from "../models/Product.js";
import nodemailer from "nodemailer";
import PageVisit from "../models/PageVisit.js";
import Category from "../models/Category.js";
import CareerApplication from "../models/CareerApplication.js";
import ContactApplication from "../models/ContactApplication.js";

// @desc    Submit a new inquiry (Generic or Dealership)
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res, next) => {
  try {
    const {
      type, name, email, phone, subject, message,
      businessName, cityState, existingBusinessType, investmentCapacity,
      city, state, products, visitingCard
    } = req.body;

    if (!name || !phone || (type !== "dealer" && !email)) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }

    const inquiry = await Inquiry.create({
      type, name, email, phone, subject, message,
      businessName, cityState, existingBusinessType, investmentCapacity,
      city, state, products, visitingCard
    });

    // Check notification settings and trigger alert simulation
    try {
      const settings = await Settings.findOne();
      const sendAlert = (type === "dealer" && (!settings || settings.dealerApplicationAlerts)) ||
                        (type !== "dealer" && (!settings || settings.newInquiryAlerts));

      if (sendAlert) {
        console.log("\n--- [EMAIL NOTIFICATION SENT] ---");
        console.log(`To: Admin (${process.env.ADMIN_SEED_EMAIL || "panchalajay717@gmail.com"})`);
        console.log(`Subject: New ${type === "dealer" ? "Dealer Application" : "Contact Inquiry"} Alert`);
        console.log(`From: ${name} <${email || "N/A"}> (${phone})`);
        if (type === "dealer") {
          console.log(`Details: Business: ${businessName || "N/A"}, City/State: ${city || "N/A"}/${state || "N/A"}, Products: ${products || "N/A"}`);
        } else {
          console.log(`Details: Subject: ${subject || "No Subject"}`);
        }
        console.log(`Message: ${message || "No Message content"}`);
        console.log("---------------------------------\n");
      }
    } catch (alertError) {
      console.error("Failed to run inquiry email alert trigger:", alertError.message);
    }

    res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries (with optional type/status filtering)
// @route   GET /api/inquiries
// @access  Private (Admin)
export const getInquiries = async (req, res, next) => {
  try {
    const { type, status } = req.query;
    const filter = {};
    
    if (type) {
      filter.type = type;
    }
    if (status) {
      filter.status = status;
    }

    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private (Admin)
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      res.status(404);
      throw new Error("Inquiry not found");
    }

    const { status } = req.body;
    if (!status) {
      res.status(400);
      throw new Error("Please specify a status");
    }

    inquiry.status = status;
    const updated = await inquiry.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private (Admin)
export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      res.status(404);
      throw new Error("Inquiry not found");
    }

    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Inquiry removed successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/inquiries/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res, next) => {
  try {
    const selectedYear = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();
    const selectedMonth = req.query.month && req.query.month !== "all" ? parseInt(req.query.month) : null;

    let filterStart, filterEnd;
    let prevFilterStart, prevFilterEnd;
    
    if (selectedMonth !== null) {
      filterStart = new Date(Date.UTC(selectedYear, selectedMonth - 1, 1));
      filterEnd = new Date(Date.UTC(selectedYear, selectedMonth, 1));
      
      prevFilterStart = new Date(Date.UTC(selectedYear, selectedMonth - 2, 1));
      prevFilterEnd = new Date(Date.UTC(selectedYear, selectedMonth - 1, 1));
    } else {
      filterStart = new Date(Date.UTC(selectedYear, 0, 1));
      filterEnd = new Date(Date.UTC(selectedYear + 1, 0, 1));
      
      prevFilterStart = new Date(Date.UTC(selectedYear - 1, 0, 1));
      prevFilterEnd = new Date(Date.UTC(selectedYear, 0, 1));
    }

    // Parallel queries to fetch only the required timeframe data or counts
    const [
      products,
      inquiries,
      pageVisits,
      prevVisitsCount,
      careerApplicationsCount,
      contactApplicationsCount,
      totalCategories,
      currentProductsCount,
      prevProductsCount,
      currentActiveDealersAdded,
      prevActiveDealersAdded,
      prevPendingCount,
      currentCareerCount,
      prevCareerCount,
      currentContactCount,
      prevContactCount,
      prevApprovedDealersCount,
      prevShortlistedCount,
      weeklyInquiries,
      recentInquiriesForProducts,
      recentInquiriesForFeed,
      recentProductsForFeed,
      prevEnquiriesCount,
      prevDealersCount,
      prevClosedCount,
      yearsInDB
    ] = await Promise.all([
      Product.find({}), // products catalog
      Inquiry.find({ createdAt: { $gte: filterStart, $lt: filterEnd } }).sort({ createdAt: -1 }), // inquiries this month/year
      PageVisit.find({ createdAt: { $gte: filterStart, $lt: filterEnd } }), // visits this month/year
      PageVisit.countDocuments({ createdAt: { $gte: prevFilterStart, $lt: prevFilterEnd } }), // count previous visits
      CareerApplication.countDocuments({ createdAt: { $gte: filterStart, $lt: filterEnd } }),
      ContactApplication.countDocuments({ createdAt: { $gte: filterStart, $lt: filterEnd } }),
      Category.countDocuments(),
      
      // 1. Current / Prev Products count
      Product.countDocuments({ createdAt: { $gte: filterStart, $lt: filterEnd } }),
      Product.countDocuments({ createdAt: { $gte: prevFilterStart, $lt: prevFilterEnd } }),

      // 2. Active Dealers
      Inquiry.countDocuments({ type: "dealer", status: "Active", updatedAt: { $gte: filterStart, $lt: filterEnd } }),
      Inquiry.countDocuments({ type: "dealer", status: "Active", updatedAt: { $gte: prevFilterStart, $lt: prevFilterEnd } }),

      // 3. Pending inquiries in prev period
      Inquiry.countDocuments({ type: { $ne: "dealer" }, status: { $in: ["New", "Pending"] }, createdAt: { $gte: prevFilterStart, $lt: prevFilterEnd } }),

      // 6. Career additions
      CareerApplication.countDocuments({ createdAt: { $gte: filterStart, $lt: filterEnd } }),
      CareerApplication.countDocuments({ createdAt: { $gte: prevFilterStart, $lt: prevFilterEnd } }),

      // 6. Contact additions
      ContactApplication.countDocuments({ createdAt: { $gte: filterStart, $lt: filterEnd } }),
      ContactApplication.countDocuments({ createdAt: { $gte: prevFilterStart, $lt: prevFilterEnd } }),

      // 7. Approved/Shortlisted Dealers
      Inquiry.countDocuments({ type: "dealer", status: "Active", updatedAt: { $gte: prevFilterStart, $lt: prevFilterEnd } }),
      Inquiry.countDocuments({ type: "dealer", status: "Pending", updatedAt: { $gte: prevFilterStart, $lt: prevFilterEnd } }),

      // Weekly Inquiries count (last 7 days)
      Inquiry.find({ type: { $ne: "dealer" }, createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),

      // Top products (last 30 days inquiries)
      Inquiry.find({ type: "product", subject: { $regex: /^Product inquiry - / }, createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }),

      // Feed - top 5 inquiries
      Inquiry.find({}).sort({ createdAt: -1 }).limit(5),

      // Feed - top 5 products
      Product.find({}).sort({ updatedAt: -1 }).limit(5),

      // Prev enquiries count
      Inquiry.countDocuments({ type: { $ne: "dealer" }, createdAt: { $gte: prevFilterStart, $lt: prevFilterEnd } }),

      // Prev dealers count
      Inquiry.countDocuments({ type: "dealer", createdAt: { $gte: prevFilterStart, $lt: prevFilterEnd } }),

      // Prev closed inquiries
      Inquiry.countDocuments({ type: { $ne: "dealer" }, status: "Closed", updatedAt: { $gte: prevFilterStart, $lt: prevFilterEnd } }),

      // Available years
      PageVisit.aggregate([
        {
          $group: {
            _id: { $year: "$createdAt" }
          }
        },
        { $sort: { _id: -1 } }
      ])
    ]);

    const availableYears = yearsInDB.map(y => y._id).filter(Boolean);
    if (!availableYears.includes(new Date().getFullYear())) {
      availableYears.push(new Date().getFullYear());
    }
    availableYears.sort((a, b) => b - a);

    const totalProducts = products.length;

    const getChangeLabelAndType = (currentCount, prevCount) => {
      const diff = currentCount - prevCount;
      const label = diff >= 0 ? `+${diff}` : `${diff}`;
      const type = diff >= 0 ? "up" : "down";
      return { label, type };
    };

    // 1. Total Products change
    const { label: totalProductsChange, type: totalProductsChangeType } = getChangeLabelAndType(currentProductsCount, prevProductsCount);

    // 2. Active Dealers
    const activeDealers = inquiries.filter(i => i.type === "dealer" && i.status === "Active").length;
    const { label: activeDealersChange, type: activeDealersChangeType } = getChangeLabelAndType(currentActiveDealersAdded, prevActiveDealersAdded);

    // 3. Pending Inquiries
    const pendingInquiries = inquiries.filter(i => i.type !== "dealer" && (i.status === "New" || i.status === "Pending")).length;
    const currentPending = pendingInquiries;
    const { label: pendingInquiriesChange, type: pendingInquiriesChangeType } = getChangeLabelAndType(currentPending, prevPendingCount);

    // 4. Site Visits Pct Change
    const siteVisits = pageVisits.length;
    const currentVisits = pageVisits.length;
    const prevVisits = prevVisitsCount;

    let visitChangePct = 0;
    if (prevVisits > 0) {
      visitChangePct = ((currentVisits - prevVisits) / prevVisits) * 100;
    } else if (currentVisits > 0) {
      visitChangePct = 100.0;
    }
    const siteVisitsChange = `${visitChangePct >= 0 ? "+" : ""}${visitChangePct.toFixed(1)}%`;
    const siteVisitsChangeType = visitChangePct >= 0 ? "up" : "down";

    // 5. Total Categories
    const categories = await Category.find({});
    const currentCategories = categories.filter(c => new Date(c.createdAt) >= filterStart && new Date(c.createdAt) < filterEnd).length;
    const prevCategories = categories.filter(c => new Date(c.createdAt) >= prevFilterStart && new Date(c.createdAt) < prevFilterEnd).length;
    const { label: totalCategoriesChange, type: totalCategoriesChangeType } = getChangeLabelAndType(currentCategories, prevCategories);

    // 6. Career/Contact Application additions
    const { label: totalCareerApplicationsChange, type: totalCareerApplicationsChangeType } = getChangeLabelAndType(currentCareerCount, prevCareerCount);
    const { label: totalContactApplicationsChange, type: totalContactApplicationsChangeType } = getChangeLabelAndType(currentContactCount, prevContactCount);

    // 7. Approved/Shortlisted Dealers additions
    const currentApprovedDealers = inquiries.filter(i => i.type === "dealer" && i.status === "Active").length;
    const { label: approvedDealersChange, type: approvedDealersChangeType } = getChangeLabelAndType(currentApprovedDealers, prevApprovedDealersCount);

    const currentShortlisted = inquiries.filter(i => i.type === "dealer" && i.status === "Pending").length;
    const { label: shortlistedPartnersChange, type: shortlistedPartnersChangeType } = getChangeLabelAndType(currentShortlisted, prevShortlistedCount);

    // Website Traffic chart data
    let visitsLabels = [];
    let visits = [];

    if (selectedMonth !== null) {
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        visitsLabels.push(day.toString());
        visits.push(0);
      }
      pageVisits.forEach(v => {
        const d = new Date(v.createdAt);
        const day = d.getDate();
        if (day <= daysInMonth) {
          visits[day - 1]++;
        }
      });
    } else {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      visitsLabels = monthNames;
      visits = new Array(12).fill(0);
      pageVisits.forEach(v => {
        const d = new Date(v.createdAt);
        const monthIdx = d.getMonth();
        visits[monthIdx]++;
      });
    }

    // Inquiries by Category
    const categoriesMap = {
      "Water Tanks": { count: 0, color: "#1466E6" },
      "PVC Pipes": { count: 0, color: "#00B4F0" },
      "Planters": { count: 0, color: "#1FAE6A" },
      "Cooler": { count: 0, color: "#FFB020" },
      "Unbreakable products": { count: 0, color: "#6BA1FF" },
      "Waste Management": { count: 0, color: "#8B5CF6" },
      "Toilet Seat": { count: 0, color: "#E5484D" },
    };

    inquiries.forEach(inq => {
      const text = `${inq.subject || ''} ${inq.message || ''} ${inq.products || ''}`.toLowerCase();
      if (text.includes("tank")) {
        categoriesMap["Water Tanks"].count++;
      } else if (text.includes("pipe") || text.includes("pvc") || text.includes("fitting")) {
        categoriesMap["PVC Pipes"].count++;
      } else if (text.includes("planter")) {
        categoriesMap["Planters"].count++;
      } else if (text.includes("cooler")) {
        categoriesMap["Cooler"].count++;
      } else if (text.includes("unbreakable")) {
        categoriesMap["Unbreakable products"].count++;
      } else if (text.includes("waste") || text.includes("dustbin") || text.includes("garbage")) {
        categoriesMap["Waste Management"].count++;
      } else if (text.includes("toilet") || text.includes("seat")) {
        categoriesMap["Toilet Seat"].count++;
      } else {
        if (inq.type === "dealer") {
          categoriesMap["PVC Pipes"].count++;
        } else {
          categoriesMap["Water Tanks"].count++;
        }
      }
    });

    const totalInquiries = inquiries.length || 1;
    const categorySplit = Object.keys(categoriesMap).map(label => ({
      label,
      value: Math.round((categoriesMap[label].count / totalInquiries) * 100) || 0,
      color: categoriesMap[label].color
    }));

    // Inquiries This Week (Mon to Sun) - Real-time/latest relative to current Date
    const weeklyInquiriesCounts = [0, 0, 0, 0, 0, 0, 0];
    weeklyInquiries.forEach(inq => {
      const created = new Date(inq.createdAt);
      let dayIdx = created.getDay() - 1;
      if (dayIdx === -1) dayIdx = 6;
      weeklyInquiriesCounts[dayIdx]++;
    });
    
    const weeklyData = weeklyInquiriesCounts;

    // Top Products - Latest month relative to current Date
    const productInquiriesCount = {};
    recentInquiriesForProducts.forEach(inq => {
      if (inq.subject && inq.subject.startsWith("Product inquiry - ")) {
        const prodName = inq.subject.replace("Product inquiry - ", "").trim();
        productInquiriesCount[prodName] = (productInquiriesCount[prodName] || 0) + 1;
      }
    });

    const topProductsList = products.map(prod => {
      const count = productInquiriesCount[prod.name] || 0;
      return {
        name: prod.name,
        inquiries: count,
      };
    });
    
    Object.keys(productInquiriesCount).forEach(name => {
      if (!topProductsList.some(p => p.name === name)) {
        topProductsList.push({ name, inquiries: productInquiriesCount[name] });
      }
    });

    topProductsList.sort((a, b) => b.inquiries - a.inquiries);
    
    const maxInq = Math.max(...topProductsList.map(p => p.inquiries)) || 0;
    const topProducts = topProductsList.slice(0, 5).map(p => ({
      name: p.name,
      inquiries: p.inquiries,
      pct: maxInq > 0 ? Math.round((p.inquiries / maxInq) * 100) : 0
    }));

    // Activity Feed - Latest entries using pre-fetched recent inquiries & recent products (top 5 each, total 10)
    const feed = [];
    recentInquiriesForFeed.forEach(inq => {
      let icon = "mail";
      let text = `New inquiry — ${inq.subject || `from ${inq.name}`}`;
      let color = "var(--signal)";
      
      if (inq.type === "dealer") {
        icon = "user";
        text = `New dealer application from ${inq.name}`;
        color = "var(--blue-600)";
        if (inq.status === "Active") {
          text = `Dealer '${inq.businessName || inq.name}' approved`;
          color = "var(--ok)";
        }
      }
      
      feed.push({
        icon,
        text,
        time: inq.createdAt,
        color
      });
    });

    recentProductsForFeed.forEach(prod => {
      feed.push({
        icon: "box",
        text: `Product '${prod.name}' updated/added`,
        time: prod.updatedAt,
        color: prod.stock < 10 ? "#dc2626" : "var(--ok)"
      });
    });

    feed.sort((a, b) => new Date(b.time) - new Date(a.time));

    const formatTimeAgo = (date) => {
      const seconds = Math.floor((new Date() - new Date(date)) / 1000);
      let interval = seconds / 31536000;
      if (interval > 1) return Math.floor(interval) + " years ago";
      interval = seconds / 2592000;
      if (interval > 1) return Math.floor(interval) + " months ago";
      interval = seconds / 86400;
      if (interval > 1) return Math.floor(interval) + " days ago";
      interval = seconds / 3600;
      if (interval > 1) return Math.floor(interval) + " hr ago";
      interval = seconds / 60;
      if (interval > 1) return Math.floor(interval) + " min ago";
      return "just now";
    };

    const formattedFeed = feed.slice(0, 5).map(f => ({
      icon: f.icon,
      text: f.text,
      time: formatTimeAgo(f.time),
      color: f.color
    }));

    // Standard inquiries count change
    const currentEnquiriesCount = inquiries.filter(i => i.type !== "dealer").length;
    const { label: totalEnquiriesChange, type: totalEnquiriesChangeType } = getChangeLabelAndType(currentEnquiriesCount, prevEnquiriesCount);

    // Dealer applications count change
    const currentDealersCount = inquiries.filter(i => i.type === "dealer").length;
    const { label: totalDealerApplicationsChange, type: totalDealerApplicationsChangeType } = getChangeLabelAndType(currentDealersCount, prevDealersCount);

    // Closed inquiries count change
    const currentClosedCount = inquiries.filter(i => i.type !== "dealer" && i.status === "Closed").length;
    const { label: totalClosedEnquiriesChange, type: totalClosedEnquiriesChangeType } = getChangeLabelAndType(currentClosedCount, prevClosedCount);

    res.json({
      totalProducts,
      totalProductsChange,
      totalProductsChangeType,
      activeDealers,
      activeDealersChange,
      activeDealersChangeType,
      pendingInquiries,
      pendingInquiriesChange,
      pendingInquiriesChangeType,
      siteVisits,
      siteVisitsChange,
      siteVisitsChangeType,
      totalCategories,
      totalCategoriesChange,
      totalCategoriesChangeType,
      totalEnquiries: currentEnquiriesCount,
      totalEnquiriesChange,
      totalEnquiriesChangeType,
      totalDealerApplications: currentDealersCount,
      totalDealerApplicationsChange,
      totalDealerApplicationsChangeType,
      totalCareerApplications: careerApplicationsCount,
      totalCareerApplicationsChange,
      totalCareerApplicationsChangeType,
      totalContactApplications: contactApplicationsCount,
      totalContactApplicationsChange,
      totalContactApplicationsChangeType,
      approvedDealers: currentApprovedDealers,
      approvedDealersChange,
      approvedDealersChangeType,
      shortlistedPartners: currentShortlisted,
      shortlistedPartnersChange,
      shortlistedPartnersChangeType,
      totalClosedEnquiries: currentClosedCount,
      totalClosedEnquiriesChange,
      totalClosedEnquiriesChangeType,
      visitsData: visits,
      visitsLabels: visitsLabels,
      availableYears: availableYears,
      categorySplit,
      weeklyData,
      topProducts,
      activityFeed: formattedFeed,
      recentInquiries: inquiries.filter(i => i.type !== "dealer").slice(0, 4).map(i => ({
        name: i.name,
        subject: i.subject || `Inquiry from ${i.name}`,
        createdAt: i.createdAt,
        status: i.status
      }))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Record a new page visit
// @route   POST /api/inquiries/visit
// @access  Public
export const recordVisit = async (req, res, next) => {
  try {
    const { path, referrer } = req.body;
    if (!path) {
      res.status(400);
      throw new Error("Path is required");
    }
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    await PageVisit.create({
      path,
      ip,
      userAgent,
      referrer
    });
    
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// Seed default simulated page visits if database is empty
export const seedPageVisits = async () => {
  // Page visit seeding disabled to show real data
  return;
};

// @desc    Get recent notifications (dealership requests, inquiries, careers, contacts)
// @route   GET /api/inquiries/notifications
// @access  Private (Admin)
export const getRecentNotifications = async (req, res, next) => {
  try {
    const recentInquiries = await Inquiry.find({}).sort({ createdAt: -1 }).limit(10);
    const recentContacts = await ContactApplication.find({}).sort({ createdAt: -1 }).limit(10);
    const recentCareers = await CareerApplication.find({}).sort({ createdAt: -1 }).limit(10);

    const notifications = [];

    // Map Inquiries (generic, product, dealer)
    recentInquiries.forEach(inq => {
      let msg = "";
      if (inq.type === "dealer") {
        msg = `New dealer application from ${inq.name}`;
      } else if (inq.type === "product") {
        msg = `New product inquiry from ${inq.name}`;
      } else {
        msg = `New inquiry from ${inq.name}`;
      }
      notifications.push({
        id: inq._id,
        type: inq.type === "dealer" ? "dealer" : "inquiry",
        msg,
        status: inq.status,
        dot: inq.status === "New",
        createdAt: inq.createdAt
      });
    });

    // Map Contacts
    recentContacts.forEach(c => {
      notifications.push({
        id: c._id,
        type: "contact",
        msg: `New contact submission from ${c.name}`,
        status: c.status,
        dot: c.status === "New",
        createdAt: c.createdAt
      });
    });

    // Map Careers
    recentCareers.forEach(c => {
      notifications.push({
        id: c._id,
        type: "career",
        msg: `New career application from ${c.name}`,
        status: c.status,
        dot: c.status === "New",
        createdAt: c.createdAt
      });
    });

    // Sort by createdAt descending
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Limit to latest 10 notifications
    res.json(notifications.slice(0, 10));
  } catch (error) {
    next(error);
  }
};

// @desc    Get real-time analytics stats (visitor trends, session duration, bounce rates, conversions)
// @route   GET /api/inquiries/analytics
// @access  Private (Admin)
export const getAnalyticsStats = async (req, res, next) => {
  try {
    const visits = await PageVisit.find({}).sort({ createdAt: 1 });
    const allInquiries = await Inquiry.find({});
    const allContacts = await ContactApplication.find({});
    const allCareers = await CareerApplication.find({});

    const totalInquiries = allInquiries.length;
    const totalContacts = allContacts.length;
    const totalCareers = allCareers.length;
    const totalConversions = totalInquiries + totalContacts + totalCareers;

    // Time ranges for comparison (last 30 days vs preceding 30 days)
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const currentVisits = visits.filter(v => new Date(v.createdAt) >= thirtyDaysAgo);
    const prevVisits = visits.filter(v => new Date(v.createdAt) >= sixtyDaysAgo && new Date(v.createdAt) < thirtyDaysAgo);

    // Helpers to group visits into sessions
    const getSessionsStats = (visitsList) => {
      const groups = {};
      visitsList.forEach(v => {
        const key = `${v.ip || 'unknown'}-${v.userAgent || 'unknown'}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(new Date(v.createdAt).getTime());
      });

      let totalSessionTimeMs = 0;
      let sessionCount = 0;
      let bounceCount = 0;

      Object.values(groups).forEach(times => {
        if (times.length === 0) return;
        times.sort((a, b) => a - b);
        
        let sessionStart = times[0];
        let lastTime = times[0];
        let sessionVisitsCount = 1;

        for (let i = 1; i < times.length; i++) {
          const t = times[i];
          if (t - lastTime > 30 * 60 * 1000) {
            totalSessionTimeMs += (lastTime - sessionStart);
            sessionCount++;
            if (sessionVisitsCount === 1) bounceCount++;
            
            sessionStart = t;
            sessionVisitsCount = 1;
          } else {
            sessionVisitsCount++;
          }
          lastTime = t;
        }
        totalSessionTimeMs += (lastTime - sessionStart);
        sessionCount++;
        if (sessionVisitsCount === 1) bounceCount++;
      });

      const avgSessionSecs = sessionCount > 0 ? Math.round((totalSessionTimeMs / 1000) / sessionCount) : 0;
      const bounceRate = sessionCount > 0 ? (bounceCount / sessionCount) * 100 : 0;

      return { avgSessionSecs, bounceRate, sessionCount };
    };

    const currentSessionStats = getSessionsStats(currentVisits);
    const prevSessionStats = getSessionsStats(prevVisits);

    // 1. STATS CARDS DATA
    // Visitors Card
    const visitorsCount = visits.length;
    const visitorsDiff = currentVisits.length - prevVisits.length;
    const visitorsPct = prevVisits.length > 0 ? (visitorsDiff / prevVisits.length) * 100 : currentVisits.length > 0 ? 100 : 0;
    const visitorsChangeStr = `${visitorsPct >= 0 ? "+" : ""}${visitorsPct.toFixed(1)}%`;
    const visitorsChangeType = visitorsPct >= 0 ? "up" : "down";

    // Avg Session Card
    const currentMin = Math.floor(currentSessionStats.avgSessionSecs / 60);
    const currentSec = currentSessionStats.avgSessionSecs % 60;
    const avgSessionValue = `${currentMin}m ${currentSec}s`;
    const sessionDiff = currentSessionStats.avgSessionSecs - prevSessionStats.avgSessionSecs;
    const sessionChangeStr = `${sessionDiff >= 0 ? "+" : ""}${sessionDiff}s`;
    const sessionChangeType = sessionDiff >= 0 ? "up" : "down";

    // Bounce Rate Card
    const bounceRateValue = `${currentSessionStats.bounceRate.toFixed(1)}%`;
    const bounceDiff = currentSessionStats.bounceRate - prevSessionStats.bounceRate;
    const bounceChangeStr = `${bounceDiff >= 0 ? "+" : ""}${bounceDiff.toFixed(1)}%`;
    const bounceChangeType = bounceDiff <= 0 ? "down" : "up"; // going down is positive but we display direction

    // Conversions Card
    const currentConversions = 
      allInquiries.filter(i => new Date(i.createdAt) >= thirtyDaysAgo).length +
      allContacts.filter(c => new Date(c.createdAt) >= thirtyDaysAgo).length +
      allCareers.filter(c => new Date(c.createdAt) >= thirtyDaysAgo).length;

    const prevConversions = 
      allInquiries.filter(i => new Date(i.createdAt) >= sixtyDaysAgo && new Date(i.createdAt) < thirtyDaysAgo).length +
      allContacts.filter(c => new Date(c.createdAt) >= sixtyDaysAgo && new Date(c.createdAt) < thirtyDaysAgo).length +
      allCareers.filter(c => new Date(c.createdAt) >= sixtyDaysAgo && new Date(c.createdAt) < thirtyDaysAgo).length;

    const convDiff = currentConversions - prevConversions;
    const convPct = prevConversions > 0 ? (convDiff / prevConversions) * 100 : currentConversions > 0 ? 100 : 0;
    const convChangeStr = `${convPct >= 0 ? "+" : ""}${Math.round(convPct)}%`;
    const convChangeType = convPct >= 0 ? "up" : "down";

    // 2. VISITOR TRENDS (Last 14 weeks)
    const weeklyTraffic = new Array(14).fill(0);
    const weeklyLabels = new Array(14).fill("");
    const nowTime = Date.now();

    for (let i = 0; i < 14; i++) {
      const startOfWeek = new Date(nowTime - (14 - i) * 7 * 24 * 60 * 60 * 1000);
      const endOfWeek = new Date(nowTime - (13 - i) * 7 * 24 * 60 * 60 * 1000);
      
      const count = visits.filter(v => {
        const d = new Date(v.createdAt);
        return d >= startOfWeek && d < endOfWeek;
      }).length;
      
      weeklyTraffic[i] = count;
      
      if (i === 13) {
        weeklyLabels[i] = "Now";
      } else if (i % 4 === 0) {
        weeklyLabels[i] = `Wk ${i + 1}`;
      } else {
        weeklyLabels[i] = "";
      }
    }

    // 3. TRAFFIC SOURCES
    const sourceCounts = {
      "Organic Search": 0,
      "Direct": 0,
      "Social": 0,
      "Referral": 0
    };

    visits.forEach(v => {
      const ref = (v.referrer || "").toLowerCase();
      if (!ref || ref === "direct" || ref === "unknown") {
        sourceCounts["Direct"]++;
      } else if (ref.includes("google") || ref.includes("bing") || ref.includes("yahoo") || ref.includes("duckduckgo")) {
        sourceCounts["Organic Search"]++;
      } else if (ref.includes("facebook") || ref.includes("instagram") || ref.includes("twitter") || ref.includes("linkedin") || ref.includes("t.co")) {
        sourceCounts["Social"]++;
      } else {
        sourceCounts["Referral"]++;
      }
    });

    const totalVisitsCount = visits.length || 1;
    const SOURCES_COLORS = ["#1466E6", "#00B4F0", "#6BA1FF", "#FFB020"];
    const trafficSources = Object.keys(sourceCounts).map((label, idx) => ({
      label,
      value: Math.round((sourceCounts[label] / totalVisitsCount) * 100),
      color: SOURCES_COLORS[idx]
    }));

    // 4. TOP PAGES (Page views this month)
    const pathCounts = {};
    currentVisits.forEach(v => {
      let p = v.path || "/";
      let label = p;
      if (p === "/") label = "Home";
      else if (p.startsWith("/products")) label = "Products";
      else if (p.startsWith("/dealership")) label = "Dealer";
      else if (p.startsWith("/about")) label = "About";
      else if (p.startsWith("/careers")) label = "Careers";
      else if (p.startsWith("/contact")) label = "Contact";
      
      pathCounts[label] = (pathCounts[label] || 0) + 1;
    });

    const standardLabels = ["Home", "Products", "Dealer", "About", "Careers", "Contact"];
    standardLabels.forEach(lbl => {
      if (pathCounts[lbl] === undefined) pathCounts[lbl] = 0;
    });

    const sortedPages = Object.keys(pathCounts).map(label => ({
      label,
      count: pathCounts[label]
    })).sort((a, b) => b.count - a.count);

    const pageviews = sortedPages.map(p => p.count);
    const pageLabels = sortedPages.map(p => p.label);

    res.json({
      stats: [
        { label: "Total Visitors", value: currentVisits.length.toLocaleString(), change: visitorsChangeStr, changeType: visitorsChangeType, accent: "var(--blue-600)" },
        { label: "Bounce Rate", value: bounceRateValue, change: bounceChangeStr, changeType: bounceChangeType, accent: "var(--signal)" }
      ],
      trafficData: weeklyTraffic,
      trafficLabels: weeklyLabels,
      sources: trafficSources,
      pageviews,
      pageLabels
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get counts for admin sidebar badges
// @route   GET /api/inquiries/sidebar-counts
// @access  Private (Admin)
export const getSidebarCounts = async (req, res, next) => {
  try {
    const [newInquiries, newDealers, newCareers, newContacts, products] = await Promise.all([
      Inquiry.countDocuments({ status: "New", type: { $ne: "dealer" } }),
      Inquiry.countDocuments({ status: "New", type: "dealer" }),
      CareerApplication.countDocuments({ status: "New" }),
      ContactApplication.countDocuments({ status: "New" }),
      Product.countDocuments({})
    ]);

    res.json({
      newInquiries,
      newDealers,
      newCareers,
      newContacts,
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send custom email to inquirer
// @route   POST /api/inquiries/:id/send-email
// @access  Private (Admin)
export const sendInquiryEmail = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      res.status(404);
      throw new Error("Inquiry not found");
    }

    const { subject, message } = req.body;
    if (!subject || !message) {
      res.status(400);
      throw new Error("Subject and Message body are required");
    }

    if (!inquiry.email) {
      res.status(400);
      throw new Error("This inquiry does not have an email address configured");
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      res.status(400);
      throw new Error("SMTP credentials are not configured in backend/.env. Please configure SMTP_USER and SMTP_PASS.");
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"Supremo Inquiries" <${smtpUser}>`,
      to: inquiry.email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    // Update status to Replied upon successful email delivery if not Active/Rejected/Closed
    if (inquiry.status !== "Active" && inquiry.status !== "Rejected" && inquiry.status !== "Closed") {
      inquiry.status = "Replied";
    }
    const updated = await inquiry.save();

    res.json({
      success: true,
      message: "Email sent successfully",
      inquiry: updated
    });
  } catch (error) {
    next(error);
  }
};




