import React, { useState } from "react";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import Header from "../../components/Header";
import AttendanceSheet from "../attendanceSheet";
import TodaysAttendance from "../todaysAttendance";

const Attendance = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box m="20px">
      {/* Page Header */}
      <Header title="ATTENDANCE" subtitle="Attendance Sheets" />

      {/* Tabs Navigation */}
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="Attendance Tabs">
        <Tab label="Attendance Sheet" />
        <Tab label="Today's Attendance" />
      </Tabs>

      {/* Attendance Sheet Tab */}
      {tabValue === 0 && <AttendanceSheet />}

      {/* Today's Attendance Tab */}
      {tabValue === 1 && <TodaysAttendance />}
    </Box>
  );
};

export default Attendance;
