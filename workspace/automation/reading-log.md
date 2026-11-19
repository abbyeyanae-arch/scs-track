# Reading log -- SCS3.5

Script: workspace/automation/sheet-automation.gs
Read to the last line before the first run: yes
Label: AI-assisted, directed by abighael_eyanae

| Line no. | The line, first words | In my own words | Which word |
|---|---|---|---|
| 3 | function checkStock(){ | Starts the checkStock function to check stock levels on the dashboard. | sequence |
| 4 | const ss = SpreadsheetApp.getActiveSpreadsheet(); | Gets the active Google Spreadsheet and stores it in ss. | variable |
| 5 | const dashboard = ss.getSheetByName("DASHBOARD") | Gets the sheet named DASHBOARD from the spreadsheet. | variable |
| 6-7 | const StockData = dashboard.getRange("A12:C15"). | Reads values from cells A12 to C15 on DASHBOARD into StockData. | variable |
| 8-9 | const lowStockItems =StockData.filter ( row => row[2] | Filters StockData to keep rows where column C (index 2) equals "REORDER". | variable |
| 10 | let reminders = ss.getSheetByName("Reminders"); | Looks up a sheet named "Reminders" (note casing difference from line 12). | variable |
| 11-13 | if(!reminders){ | If no "Reminders" sheet exists, creates a new sheet named "REMINDERS". | condition |
| 14 | reminders.clearContents(); | Clears existing cell values from the reminders sheet. | sequence |
| 16-17 | reminders.getRange("A1:C1").setValues([["ITEM", ... | Writes the three column headers into cells A1:C1 of the reminders sheet. | sequence |
| 18-21 | if(lowStockItems.length > 0){ | If any items need reorder, writes matching rows starting at row 2, column 1. | condition |
| 24 | function generateMonthlyReport(){ | Starts the generateMonthlyReport function to build the monthly summary. | sequence |
| 25 | const ss = SpreadsheetApp.getActiveSpreadsheet(); | Gets the active Google Spreadsheet and stores it in ss. | variable |
| 26 | const record = ss.getSheetByName("RECORD"); | Gets the sheet named RECORD. | variable |
| 27 | const data = record.getRange("A2:F1000").getValues(); | Reads rows 2 to 1000 across columns A to F from RECORD. | variable |
| 28 | const reportMonth = 10; | Sets reportMonth to 10 (November in 0-indexed JS months). | variable |
| 29 | const reportYear = 2026; | Sets reportYear to 2026. | variable |
| 31-32 | const monthName = new Date (reportYear, reportMonth). | Formats the month name from the year and month values. | variable |
| 34 | const monthLabel = '${monthname} ${reportyear}'; | Bug: uses single quotes instead of backticks so variables do not interpolate. | variable |
| 36-38 | const monthlySales = data.filter(row => row[0] && ... | Filters rows by date/year and "OUT" status (contains .getmonth typo on line 36). | variable |
| 40 | const totalSales = monthlySales.reduce((sum,row) => ... | Sums column F (index 5) across filtered monthlySales rows. | variable |
| 42 | const unitsSold= monthlySales.reduce((sum,row) => ... | Sums column D (index 3) across filtered monthlySales rows. | variable |
| 44 | let report = ss.getSheetByName("MONTHLY REPORT"); | Gets the sheet named MONTHLY REPORT. | variable |
| 45-47 | if(!report){ | Creates the MONTHLY REPORT sheet if it does not already exist. | condition |
| 48 | report.clearContents(); | Clears previous contents from MONTHLY REPORT. | sequence |
| 50-51 | report.getRange("A1:C1").setValues([["REPORT MONTH", ... | Sets header labels in A1:C1 of MONTHLY REPORT. | sequence |
| 53-54 | report.getRange("A2:C2").setValues([[monthLabel, ... | Writes the report month label, total sales, and units sold into A2:C2. | sequence |
| 57 | function onEdit(e) { | Defines an installable/simple edit trigger handler receiving edit event e. | trigger |
| 59 | const sheet = e.range.getSheet(); | Gets the sheet where the edit happened. | variable |
| 61 | if (sheet.getName() !== "INTAKE") return; | Stops early if the edited sheet is not named "INTAKE". | condition |
| 63 | const row = e.range.getRow(); | Gets the row number of the edited cell. | variable |
| 64 | const column = e.range.getColumn(); | Gets the column number of the edited cell. | variable |
| 66 | if (row === 1 || column > 2) return; | Ignores header row 1 and any column after column B (column 2). | condition |
| 68 | const item = sheet.getRange(row, 1).getValue(); | Reads the item value in column A of the edited row. | variable |
| 69 | const quantity = sheet.getRange(row, 2).getValue(); | Reads the quantity value in column B of the edited row. | variable |
| 71 | if (item === "" || quantity === "") return; | Stops if either item or quantity is blank. | condition |
| 73 | const isValid = typeof quantity === "number" && quantity > 0; | Checks whether quantity is a positive number. | variable |
| 75 | const dateCell = sheet.getRange(row, 3); | Targets column C in the edited row for the entry date. | variable |
| 77-80 | if (dateCell.getValue() === "") { | Sets today's date and dd/MM/yyyy format if column C is currently empty. | condition |
| 82 | const checkCell = sheet.getRange(row, 4); | Targets column D in the edited row for the validation status. | variable |
| 84-88 | if (isValid) { | Writes "OK" if valid, or "INVALID ENTRY" if not. | condition |
