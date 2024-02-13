const admin = require('../Models/DoctorModel')
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const patient = require('../Models/PatientsModel')
const adminMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await admin.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token , Please Login again");
    }
  } else {
    throw new Error("Please Login Doctor");
  }
});
const isCardiologist = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await admin.findOne({ email });
  const patientUser = await patient.findOne({ email });

  if (adminUser && adminUser.department === "Cardiologist") {
    next();
  } else if (patientUser && patientUser.department === "Cardiologist") {
    next();
  } else {
    res.status(403).json({ error: "You are not Cardiologist" });
  }
});

const isNeurologist = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await admin.findOne({ email });
  const patientUser = await patient.findOne({ email });

  if (adminUser && adminUser.department === "Neurologist") {
    next();
  } else if (patientUser && patientUser.department === "Neurologist") {
    next();
  } else {
    res.status(403).json({ error: "You are not Neurologist" });
  }
});

const isDepartment = (department) => async (req, res, next) => {
  const { email } = req.user;

  try {
    const adminUser = await admin.findOne({ email });
    const patientUser = await patient.findOne({ email });

    if ((adminUser && adminUser.department === department) || (patientUser && patientUser.department === department)) {
      next();
    } else {
      res.status(403).json({ error: `You are not a ${department}` });
    }
  } catch (error) {
    // Handle errors, e.g., database query issues
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const isCardiacSurgeon = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await admin.findOne({ email });
  const patientUser = await patient.findOne({ email });

  if (adminUser && adminUser.department === "Cardiac Surgeon") {
    next();
  } else if (patientUser && patientUser.department === "Cardiac Surgeon") {
    next();
  } else {
    res.status(403).json({ error: "You are not Cardiac Surgeon" });
  }
});

const isSpecialist = (department) => asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const user = await admin.findOne({ email }) || await patient.findOne({ email });

  if (user && user.department === department) {
    next();
  } else {
    res.status(403).json({ error: `You are not ${department}` });
  }
});

const checkSpecialization = (req, res, next) => {
  const { specialization } = req.user;
  switch (specialization) {
    case "Cardiologist":
      return isSpecialist("Cardiologist")(req, res, next);
    case "Neurologist":
      return isSpecialist("Neurologist")(req, res, next);
    case "Cardiac Surgeon":
      return isSpecialist("Cardiac Surgeon")(req, res, next);
    default:
      res.status(403).json({ error: "Invalid specialization" });
  }
};

// module.exports = checkSpecialization;


const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await admin.findOne({ email });
  if (adminUser.role !== "doctor") {
    throw new Error("You are not an doctor!!!");
  } else {
    next();
  }
});
module.exports = {
  adminMiddleware,
  isCardiologist,
  isNeurologist,
  isCardiacSurgeon,
  isAdmin,
  isSpecialist,
  checkSpecialization,
  isDepartment
};