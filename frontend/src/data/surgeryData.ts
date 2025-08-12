export const surgeries = [
  "Hip Surgery",
  "Knee Replacement",
  "Shoulder Surgery",
  "Cardiac Surgery",
  "Gallbladder Removal",
  "Appendectomy",
  "Cholecystectomy",
  "Hysterectomy",
  "Cataract Surgery",
  "Hip Replacement",
  "Cesarean Section",
  "Coronary Artery Bypass",
  "Mastectomy",
  "Hernia Repair",
  "Tonsillectomy",
  "Thyroidectomy",
  "Spinal Fusion",
  "Gastric Bypass",
  "Angioplasty",
  "Lumpectomy",
  "Arthroscopy",
  "Laparoscopy",
  "Prostatectomy",
  "Craniotomy",
  "Skin Graft",
  "Pacemaker Implantation",
  "Liver Transplant",
  "Kidney Transplant",
  "Bariatric Sleeve Surgery",
  "ACL Reconstruction",
  "Dental Implant Surgery",
  "Sinus Surgery",
  "Vitrectomy"
];

export const reminders = [
  "Take medication at 8:00 AM",
  "Pre-op fasting starts at 10:00 PM",
  "Call your care coordinator",
];

export const getSurgeryDetails = (surgeryType: string) => {
  const details: any = {
    "Cataract Surgery": {
      description: "A procedure to remove the lens of your eye and, in most cases, replace it with an artificial lens.",
      duration: "15-30 minutes per eye",
      anesthesia: "Local anesthesia (eye drops)",
      recovery: "1-3 days initial recovery, 4-6 weeks full recovery",
      preparation: [
        "Stop eating and drinking 12 hours before surgery",
        "Arrange transportation (you cannot drive after surgery)",
        "Use prescribed eye drops as directed",
        "Wear comfortable, loose-fitting clothing",
        "Remove contact lenses and makeup"
      ],
      postCare: [
        "Use prescribed eye drops regularly",
        "Wear protective eye shield while sleeping",
        "Avoid rubbing or pressing on your eye",
        "No heavy lifting for first week",
        "Attend all follow-up appointments"
      ],
      risks: [
        "Infection (rare)",
        "Bleeding (rare)",
        "Increased eye pressure",
        "Retinal detachment (very rare)",
        "Need for glasses or contact lenses"
      ]
    },
    "Hip Surgery": {
      description: "Joint replacement surgery to restore function and relieve pain in your hip joint.",
      duration: "1-2 hours",
      anesthesia: "General or spinal anesthesia",
      recovery: "6-12 weeks",
      preparation: [
        "Stop eating and drinking 8-12 hours before surgery",
        "Complete pre-operative blood tests",
        "Arrange home assistance for 2-4 weeks",
        "Prepare your home for mobility aids"
      ],
      postCare: [
        "Physical therapy as prescribed",
        "Take prescribed medications",
        "Use mobility aids as recommended",
        "Keep incision clean and dry"
      ],
      risks: [
        "Infection",
        "Blood clots",
        "Implant loosening",
        "Nerve damage"
      ]
    },
    "Knee Replacement": {
      description: "Surgical procedure to replace damaged knee joint with artificial components.",
      duration: "1-2 hours",
      anesthesia: "General, spinal, or regional anesthesia",
      recovery: "6-12 weeks",
      preparation: [
        "Pre-operative physical therapy",
        "Blood tests and medical clearance",
        "Arrange post-surgery care",
        "Prepare home environment"
      ],
      postCare: [
        "Physical therapy program",
        "Pain management",
        "Wound care",
        "Gradual return to activities"
      ],
      risks: [
        "Infection",
        "Blood clots",
        "Implant problems",
        "Stiffness"
      ]
    }
  };
  
  return details[surgeryType] || {
    description: "Detailed information for this procedure will be provided by your healthcare team.",
    duration: "Varies",
    anesthesia: "As recommended by anesthesiologist",
    recovery: "Varies by procedure",
    preparation: ["Follow pre-operative instructions"],
    postCare: ["Follow post-operative care plan"],
    risks: ["Discuss with your surgeon"]
  };
};
