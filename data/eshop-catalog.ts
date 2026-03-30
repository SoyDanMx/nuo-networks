/**
 * E-Shop catalog branches (deduplicated from NUO product taxonomy).
 * Display labels for sections live in messages (es/en); lines stay in English as typical SKU/catalog wording.
 */
export type EshopDepartment = { readonly id: string; readonly lines: readonly string[] };

export const ESHOP_DEPARTMENTS: readonly EshopDepartment[] = [
  {
    id: "surveillanceAccessories",
    lines: [
      "Accessories",
      "Microphones",
      "UTP Video Transceivers",
      "Camera Housings",
      "Camera Mounts",
      "CCTV Testers",
      "Extender Kits, Converters, Splitters, HDMI, VGA, DVI",
      "Junction Boxes",
      "PTZ Controllers",
      "Video Wireless Transmitter"
    ]
  },
  {
    id: "cablesAndConnectors",
    lines: [
      "Cables",
      "Power and Electricity",
      "Cat5e",
      "Cat6",
      "Cat6a",
      "Coaxial Cable and Connectors",
      "Coaxial Jumpers",
      "Fiber optic",
      "Network Connectors",
      "VGA / DVI / HDMI",
      "Power Cables",
      "Access Control Cables"
    ]
  },
  {
    id: "videoKitsAndIntercom",
    lines: [
      "Complete Systems (Kits)",
      "16-Channel TurboHD Kit",
      "4-Channel TurboHD Kit",
      "8-Channel TurboHD Kit",
      "IP Megapixel",
      "Door Phones and Door Video Phones",
      "Analog Door Phones",
      "Multi-Unit Apartment Intercom Systems",
      "IP Doorphones",
      "Multi-apartments",
      "TV Door Phone and Interphones",
      "Interphones",
      "Accessories"
    ]
  },
  {
    id: "ipVideoRecording",
    lines: [
      "IP Cameras",
      "4K",
      "Bullet",
      "Cube",
      "Dome",
      "Eyeball / Turret",
      "Hemispheric / Fisheye",
      "Hidden Cameras",
      "Motorized Lens",
      "NVRs Network Video Recorders",
      "PTZ",
      "Video Encoders and Decoders",
      "Mobile DVRs",
      "Video Recorders TurboHD (TVI)"
    ]
  },
  {
    id: "mobileVideoRecording",
    lines: [
      "Mobile Video Recorders",
      "Accessories",
      "Cameras",
      "Portable Video Recorders",
      "Portatil Video Recorders",
      "Motorcycles",
      "Off-Road Vehicles"
    ]
  },
  {
    id: "powerElectrification",
    lines: [
      "Power",
      "Power Supplies",
      "Batteries",
      "Long Reach PoE",
      "PDU",
      "PoE Injectors",
      "PoE Switches",
      "Power Supplies With Backup",
      "UPS - No Break",
      "Voltage Converters",
      "Wall Adapters AC/DC",
      "Solar PoE Converters",
      "Power Supplies — Video Surveillance / Access Control",
      "Surge Protection — AC POWER",
      "Surge Protection — Coaxial",
      "Surge Protection — Network",
      "Surge Protection — Direct Current"
    ]
  },
  {
    id: "serversSoftwareStorage",
    lines: [
      "Servers / Storage / PC",
      "Accessories",
      "Hard Disk Drives (HDD)",
      "NAS / SAN / eSATA Storage",
      "SD Cards",
      "Software VMS and Analytics",
      "Digifort",
      "EPCOM Cloud",
      "Servers and Storage NAS / SAN",
      "Storage NAS / SAN"
    ]
  },
  {
    id: "fieldToolsAndTest",
    lines: [
      "Tools",
      "Electric Tools",
      "For RG59 Cable",
      "For UTP cable (Cat5e, Cat6)",
      "Installation Accessories",
      "Video Testers",
      "Ground Testers",
      "Electric tools (Networking)"
    ]
  },
  {
    id: "turboHdLine",
    lines: [
      "TurboHD Cameras (TVI) / AHD",
      "4K",
      "Bullet",
      "Dome",
      "Eyeball / Turret",
      "Motorized Lens",
      "PTZ"
    ]
  },
  {
    id: "accessControl",
    lines: [
      "Access Control Panels",
      "Licenses and Software",
      "Accessories",
      "Cable Grommets",
      "Cards and Tags",
      "Door Closers",
      "Exit Buttons (REX)",
      "Magnetic Contacts",
      "Relay Cards",
      "Wireless Controls",
      "Access Control — Time and Attendance",
      "USB Readers / Enrollers",
      "Emergency Door Bars",
      "Identification and Credentialing — Accessories",
      "Laminating Printers",
      "Printers",
      "Ribbons"
    ]
  },
  {
    id: "locksAndDoorHardware",
    lines: [
      "Locks",
      "Accessories",
      "Bolt",
      "Door Strikes",
      "Electric",
      "Magnetic Door Lock",
      "Stand Alone",
      "Power Supplies — Locks",
      "Batteries",
      "Transformers",
      "UPS"
    ]
  },
  {
    id: "readersAndBiometrics",
    lines: [
      "Readers — All",
      "Cards",
      "MIFARE / iCLASS",
      "NFC",
      "Proximity",
      "SEOS",
      "UHF / RFID",
      "Biometrics",
      "Standalone Keypads — All Products"
    ]
  },
  {
    id: "pedestrianAndVehicularAccess",
    lines: [
      "Turnstiles and Flap Barriers",
      "Flap Barriers",
      "Full Height Turnstiles",
      "Vehicular Access",
      "Accessories for Gate Operators",
      "Barrier Gates",
      "Gate Operators",
      "Replacement Parts",
      "Sliding Doors"
    ]
  },
  {
    id: "batteriesEnergyLighting",
    lines: [
      "Batteries — All Products",
      "Accessories",
      "Battery Cabinets",
      "Battery Chargers",
      "Emergency Lights",
      "Indoor LED Lighting — All Products",
      "Grounding and lightning system",
      "Grounding kits & lightning protection",
      "Lightning Rod",
      "Energy Plants",
      "UPS / Backup — All Products"
    ]
  },
  {
    id: "solarAndPowerElectronics",
    lines: [
      "Solar Energy",
      "Accessories",
      "Grid-Tie Inverters",
      "Inverter Drives",
      "MPPT Charge Controller",
      "Off-Grid Inverters",
      "PWM Charge Controller",
      "SOLAR KIT Grid-Tie",
      "SOLAR KIT Off-Grid",
      "Solar Panel Mounts",
      "Solar Panels",
      "Submersible Pumps",
      "Inverters and Converters",
      "DC to DC Converters",
      "Inverters",
      "Inverters/Charger"
    ]
  },
  {
    id: "pduRacksPowerDistribution",
    lines: [
      "PDU — Basic",
      "Metered",
      "Monitored",
      "Redundant Power Supply (ATS)",
      "Switched",
      "Racks and Enclosures",
      "Exterior / Interior Cabinets",
      "Mounting Accessories",
      "Mounting Brackets",
      "Multi-Purpose Enclosures",
      "Open Racks",
      "Rack Cabinets",
      "Safety protecting cases",
      "Close Racks",
      "Outdoor cabinets",
      "Rack/Cabinets Accessories",
      "Wall mount cabinets"
    ]
  },
  {
    id: "rfWirelessBackhaul",
    lines: [
      "Antennas — Accessories",
      "Directional",
      "Jumpers",
      "Omnidirectional",
      "Sector",
      "Backhaul Links — 5 GHz / 2.4 GHz",
      "60, 70 and 80 GHz",
      "Other bands",
      "PtP and PtMP Links — 2.4 GHz",
      "5 GHz",
      "60, 70 and 80 GHz",
      "900 MHz",
      "Other bands",
      "Towers and Masts",
      "Guyed Towers (Kits)",
      "Guyed Towers Accessories",
      "Installation Tools",
      "Masts and Accessories",
      "Obstruction Lights",
      "Reusable Anchors",
      "Roof / Wall Brackets",
      "Self-Support Tower Accessories",
      "Self-Support Towers"
    ]
  },
  {
    id: "cellularFtthNetworking",
    lines: [
      "Cellular Coverage for 5G, 4G LTE and Voice",
      "5G / 4G (LTE) Routers",
      "Antennas, Cables and Accessories — Cellular",
      "Cell Signal Boosters",
      "FTTH/PON Networks",
      "Clamps and Fittings",
      "Connectors",
      "Fiber Optic Cable",
      "Jumpers and Pigtails",
      "OLT / ONT / ONU",
      "Splices Closures and Splitters",
      "Tools — Fiber",
      "Networking",
      "Converters",
      "GPON",
      "Industrial",
      "Long Reach PoE",
      "Optic Fiber Transceivers",
      "POE Injectors",
      "PoE Switches",
      "Routers, Firewalls, Load Balancers",
      "Switches"
    ]
  },
  {
    id: "structuredCabling",
    lines: [
      "Category 5e",
      "Category 6",
      "Category 6A",
      "Category 7A",
      "Cable Raceways",
      "Accessories for fixing cable",
      "Cable Pathway",
      "Cable Ties",
      "PVC Pipeline / Boxes",
      "Cable Tray — Accessories",
      "Cable Trays — Mounting / Union",
      "Connectors — Network Connectors",
      "Copper cabling — Faceplates",
      "Jacks / Plugs",
      "Patch Cords",
      "Patch Panels",
      "Surface Mount Boxes",
      "Tools — Copper",
      "Fiber Optic Cables — Cable",
      "Clamps and Fittings",
      "Connectors",
      "Fiber Enclosures",
      "Jumpers y Pigtails",
      "Tools — Fiber (cabling)"
    ]
  },
  {
    id: "wifiAndLan",
    lines: [
      "Wi-Fi Networks",
      "Access Points",
      "Controllers",
      "Hotspots",
      "Signal Repeaters",
      "Wireless Adapters",
      "Wireless Routers, Cable"
    ]
  },
  {
    id: "voip",
    lines: [
      "Voice Over IP - VoIP",
      "Accessories",
      "Audio/Video Conference",
      "Audio/Video IP Doorphones",
      "Gateways and ATAs",
      "Headsets",
      "IP Phones",
      "IP Phones for Hotels",
      "IP Public Address Systems",
      "IP Switches"
    ]
  },
  {
    id: "commercialAudioAv",
    lines: [
      "Audio, Video and Loudmouth Stand-Alone PA Systems",
      "70/100V Amplifiers",
      "Accessories",
      "Audio Cables",
      "Audio Controllers",
      "HDMI Products",
      "Microphones",
      "Monitors, Screens and Videowall",
      "Outdoor Speakers",
      "Screen Mounting",
      "Volume Control"
    ]
  },
  {
    id: "fleetEmergencySpecialty",
    lines: [
      "Auxiliary Lights — Amber / Blue / Light White / Red / Red-Blue / Beacons",
      "Lightbars — Accessories / Parts",
      "Mini Bars",
      "Indoor Bars",
      "Perimeter Lights",
      "Sirens-Speakers-Drivers",
      "Telescopic Lights",
      "Traffic Director Bars",
      "Off-Road Vehicles — Accessories / Spare Parts",
      "Sirens / Speakers / Controllers / Drivers"
    ]
  },
  {
    id: "iotGpsTelematics",
    lines: [
      "IoT, GPS and Telematics",
      "Accessories",
      "Antennas",
      "Software",
      "Trackers GPS"
    ]
  },
  {
    id: "specialsMarketing",
    lines: [
      "Specials and Marketing",
      "Inventory Arrivals",
      "Monthly Specials",
      "Clearance",
      "Marketing Material",
      "All Products (category hubs)"
    ]
  }
] as const;
