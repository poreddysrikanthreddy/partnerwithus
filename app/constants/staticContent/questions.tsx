import React from "react";

const questions = [
  {
    id: 1,
    name: "Do you have an online store or selling on any marketplaces?",
    options: [
      "We only sell through our Online Store",
      "We only sell through our Marketplaces",
      "We sell through both",
      "We only sell through our offline store",
    ],
    customAnswer: true,
    optedAnswer: false,
    answer: "",
  },
  {
    id: 2,
    name: "How many retail stores are there in your establishment?",
    options: ["1", "2-5", "6-20", "21-50"],
    customAnswer: true,
    optedAnswer: false,
    answer: "",
  },
  {
    id: 3,
    name: "How many designs (SKUs) are there in store?",
    options: ["300-1000", "1000-2000", "2000-5000", "5000+"],
    customAnswer: false,
    optedAnswer: false,
    answer: "",
  },
  {
    id: 4,
    name: "Average inventory per design?",
    options: ["3-10 Pcs", "11-30 Pcs", "31-60 Pcs", "61-100 Pcs"],
    customAnswer: false,
    optedAnswer: false,
    answer: "",
  },
  {
    id: 5,
    name: "Do you have a Customer loyalty & Marketing Systems?",
    options: ["Yes", "No"],
    customAnswer: false,
    optedAnswer: false,
    answer: "",
  },
  {
    id: 6,
    name: "Your average Monthly turnover",
    options: [
      "INR 10 Lakhs - INR 50 Lakhs",
      "INR 50 Lakhs - INR 1 Crore",
      "INR 1 Crore - INR 5 Crore",
      "INR 5 Crore - INR 20 Crore",
    ],
    customAnswer: true,
    optedAnswer: false,
    answer: "",
  },
];

export default questions;
