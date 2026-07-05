export const stats = [
  { label: "Properties", value: "684", helper: "+12 this month" },
  { label: "Inspections", value: "43", helper: "Due this week" },
  { label: "Issues", value: "2", helper: "Require attention" },
  { label: "Revenue", value: "£3,150", helper: "From inspections" }
];

export const propertyRecords = [
  {
    id: "park-lane",
    address: "12 Park Lane, Hitchin",
    postcode: "SG5 1AA",
    tenant: "Emma Wilson",
    landlord: "Mr James Carter",
    manager: "Sarah Inspector",
    rent: "£1,450 pcm",
    status: "Overdue",
    risk: "Medium",
    nextInspection: "Today, 09:00",
    lastInspection: "14 Nov 2025",
    compliance: { gas: "Valid", eicr: "Valid", epc: "C", smoke: "Action" },
    notes: "First inspection after renewal. Previous report highlighted bathroom ventilation and rear garden maintenance.",
    history: ["Mid-term inspection · 14 Nov 2025", "Maintenance visit · 22 Jan 2026", "Renewal check · 8 May 2026"]
  },
  {
    id: "nightingale-road",
    address: "45 Nightingale Road, Hitchin",
    postcode: "SG5 2BD",
    tenant: "James & Sarah Brown",
    landlord: "Mrs Patel",
    manager: "Vicki Accounts",
    rent: "£1,725 pcm",
    status: "Due Soon",
    risk: "Low",
    nextInspection: "Tomorrow, 11:00",
    lastInspection: "18 Dec 2025",
    compliance: { gas: "Valid", eicr: "Valid", epc: "B", smoke: "Valid" },
    notes: "Well-presented property. Tenant reported minor dripping tap at previous contact.",
    history: ["Interim inspection · 18 Dec 2025", "Contractor visit · 4 Feb 2026", "Rent review · 1 Jun 2026"]
  },
  {
    id: "meadow-way",
    address: "7 Meadow Way, Letchworth",
    postcode: "SG6 3QP",
    tenant: "Tom Andrews",
    landlord: "Northwood Holdings",
    manager: "Steven Knott",
    rent: "£1,300 pcm",
    status: "Upcoming",
    risk: "Low",
    nextInspection: "12 May 2026, 14:00",
    lastInspection: "10 Oct 2025",
    compliance: { gas: "N/A", eicr: "Valid", epc: "C", smoke: "Valid" },
    notes: "Check-out inspection booked. Ensure meter reads, keys and condition photos are captured.",
    history: ["Mid-term inspection · 10 Oct 2025", "Check-out booked · 12 May 2026"]
  },
  {
    id: "orchard-close",
    address: "23 Orchard Close, Hitchin",
    postcode: "SG4 9LX",
    tenant: "Lucy Harper",
    landlord: "Mr & Mrs Reeves",
    manager: "Sarah Inspector",
    rent: "£1,575 pcm",
    status: "Scheduled",
    risk: "Medium",
    nextInspection: "15 May 2026, 10:30",
    lastInspection: "15 Nov 2025",
    compliance: { gas: "Expires soon", eicr: "Valid", epc: "D", smoke: "Valid" },
    notes: "Monitor condensation in bedroom two and confirm trickle vents are being used.",
    history: ["Inspection completed · 15 Nov 2025", "Mould guidance sent · 17 Nov 2025"]
  }
];

export const properties = [
  { address: "12 Park Lane, Hitchin", tenant: "Emma Wilson", landlord: "Mr James Carter", status: "Overdue", time: "09:00", type: "Mid-term" },
  { address: "45 Nightingale Road", tenant: "James & Sarah Brown", landlord: "Mrs Patel", status: "Due Soon", time: "11:00", type: "Interim" },
  { address: "7 Meadow Way", tenant: "Tom Andrews", landlord: "Northwood Holdings", status: "Upcoming", time: "14:00", type: "Check-out" }
];

export const rooms = ["Exterior", "Entrance", "Hallway", "Kitchen", "Lounge", "Bedroom 1", "Bedroom 2", "Bathroom", "Garden", "Compliance"];

export const roomPrompts: Record<string, string[]> = {
  Exterior: ["Brickwork, roofline and gutters appear safe", "Windows and doors secure", "No visible external hazards", "Bins, access and boundaries acceptable"],
  Entrance: ["Front door locks and entry system working", "Flooring and lighting safe", "Smoke alarm present where required", "No obstruction or trip hazard"],
  Hallway: ["Stairs and handrails secure", "Decorative condition acceptable", "No signs of damp or mould", "Escape route clear"],
  Kitchen: ["Appliances visually safe", "Worktops and units in good order", "Sink, taps and waste pipework acceptable", "Ventilation adequate"],
  Lounge: ["Heating source working", "Electrics visually safe", "Windows and ventilation acceptable", "No tenant-related damage visible"],
  "Bedroom 1": ["No signs of damp or mould", "Windows open and close", "Ventilation adequate", "Flooring and walls acceptable"],
  "Bedroom 2": ["No signs of condensation", "Furniture not blocking vents", "Windows and blinds acceptable", "No overcrowding concerns"],
  Bathroom: ["Extractor fan working", "Sealant and grout condition acceptable", "No active leaks", "Sanitaryware secure and usable"],
  Garden: ["Garden reasonably maintained", "Fences and gates safe", "No rubbish accumulation", "Outbuildings visually safe"],
  Compliance: ["Smoke alarms tested", "CO alarm tested if required", "HHSRS hazards considered", "Tenant comments recorded"]
};

export const riskOptions = ["No issue", "Monitor", "Action required", "Urgent"];

export const hhsrsOptions = [
  "No HHSRS hazards observed",
  "Damp and mould growth",
  "Excess cold",
  "Falls on stairs / trip hazard",
  "Electrical hazard",
  "Fire safety concern",
  "Carbon monoxide / fuel combustion concern",
  "Security / entry hazard",
  "Other hazard - manager review required"
];
