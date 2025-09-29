const PROPERTY_SHEET_ID = "15ByyLNIUF_mz8NKn5DKuzevk66lJ01veIpib4ZqGa6k";
const PROPERTY_SHEET_NAME = "Property_Units";

const TENANT_SHEET_ID = "1bdZWVtQE54KU1YD2spNT2bTJnKMwpEafy1jIP3L5vR4";
const TENANT_SHEET_NAME = "Tenant Data";

function doGet() {
  return HtmlService.createHtmlOutputFromFile('dashboard')
                    .setTitle('LockMyHome');
}


// Add tenant
function addTenant(values) {
  const ss = SpreadsheetApp.openById(TENANT_SHEET_ID).getSheetByName(TENANT_SHEET_NAME);
  const sNo = ss.getLastRow() + 1;

  const row = [
    sNo,                     // 1 S.No
    new Date(),               // 2 Timestamp
    values[0] || "",          // 3 Name
    values[1] || "",          // 4 Phone 1
    values[2] || "",          // 5 Phone 2
    "",                        // 6 Email (no input in form)
    "",                        // 7 Native State
    "",                        // 8 Native City
    values[3] || "",          // 9 Budget
    values[4] || "",          // 10 Shifting Timing
    "",                        // 11 Shifting Date
    values[5] || "",          // 12 Preferred BHK
    "",                        // 13 Preferred Location Type
    "",         // 14 Preferred Location Address
    values[9] || "",          // 15 Pincode
    "", "",                    // 16-17 Pincode 2,3
    values[6] || "",          // 18 Preferred Area Name
    "", "",                    // 19-20 Preferred Area Name 2,3
    "",                        // 21 Purpose
    values[10] || "",         // 22 Members Staying
    values[11] || "",         // 23 Who Will Stay
    "",                        // 24 Currently Staying
    values[7] || "",          // 25 Current Address
    "",                        // 26 Kids Count
    "",                        // 27 Marital Status
    "",                        // 28 Preferred Floor
    values[13] || "",         // 29 Furnishing
    "",                        // 30 Furnished Item Required
    values[14] || "",         // 31 Car Parking
    values[15] || "",         // 32 Bike Parking
    "",                        // 33 House Type
    "",                        // 34 Society Type
    values[12] || "",         // 35 House Facing
    "", "",                    // 36-37 Co-ordinate Person Name, Relation
    "",                        // 38 Notes
    "",                        // 39 Match Status
    ""                         // 40 Building ID
  ];

  ss.appendRow(row);
  return "Tenant added successfully!";
}


function addProperty(values) {
  const ss = SpreadsheetApp.openById(PROPERTY_SHEET_ID)
               .getSheetByName(PROPERTY_SHEET_NAME);
  const nextRow = ss.getLastRow() + 1;

  const buildingID = "Web-BLD-" + Date.now();
  const unitID     = "UNIT-" + Date.now();

  const row = [
    nextRow,                          // S.No.
    new Date(),                        // Timestamp
    buildingID,                        // Building ID
    unitID,                            // Unit ID
    values.PropertyType || "",          // Property Type
    values.FloorNo || "",               // Floor No.
    values.BuiltUpArea || "",           // Built-up Area (sq.ft.)
    values.CarpetArea || "",            // Carpet Area (sq.ft.)
    values.HouseFacing || "",           // House Facing
    values.Status || "",                // Status (Vacant/Occupied)
    "Ready to Move",                    // Availability Type (default for now)
    values.AvailabilityDate || "",      // Availability Date
    values.Rent || "",                  // Rent (₹)
    values.SecurityDeposit || "",       // Security Deposit (₹)
    "",                                 // Maintenance Charges (₹)
    "",                                 // Other Charges
    "",                                 // Lock-in Period (Months)
    values.AcquiredBy || "",            // Property Acquired By
    values.Owner || "",                 // Owner Name
    values.OwnerPhone || "",            // Owner Number 1
    "",                                 // Owner Number 2
    "",                                 // Owner Number 3
    values.OwnerEmail || "",            // Email ID
    "", "", "",                         // Preferred Tenants | Restrictions | Max Members Allowed
    values.CarParking || "",            // Car Parking
    values.BikeParking || "",           // Bike Parking
    "", "", "",                         // Bathroom Count | Bathroom Type | Balconies Count
    values.Furnishing || "",            // Furnishing
    "", "",                             // Furniture Available | Appliances Available
    "", "", "", "", "", "", "", "",     // Lift → Rainwater Harvesting
    "", "", "", "", "", "", "", "",
    "","",                 // Area Type → Auto GPS Location
    values.Address || "",               // Address
    values.AreaName || "",              // Area Name
    values.Pincode || "",               // Pincode
    values.City || "",                  // City
    "", "",                             // State | Note
    ""                                  // Media Links
  ];

  ss.appendRow(row);
  return "✅ Property listed successfully!";
}


function doPost(e) {
  const formData = JSON.parse(e.postData.contents);
  const result = submitEnquiry(formData);
  return ContentService.createTextOutput(result);
}


// Function to save enquiry form
function submitEnquiry(formData) {
  const ss = SpreadsheetApp.openById("1v0j1ArXEchzy1Rav-ON-M3BBhx7Lr6xfQvpkYy1Gsqo");
  const sheet = ss.getSheetByName("Web Aap");
  
  // Get next serial number
  const lastRow = sheet.getLastRow();
  const nextSNo = lastRow > 1 ? sheet.getRange(lastRow, 1).getValue() + 1 : 1;
  
  // Timestamp
  const timestamp = new Date();
  
  // Prepare row data
  const row = [
    nextSNo,
    timestamp,
    formData.Name || "",
    formData.Phone || "",
    formData.Email || "",
    formData.Requirement || "",
    formData.Notes || ""
  ];
  
  sheet.appendRow(row);
  return "Thank you! Our expert will contact you soon.";
}