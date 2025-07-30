import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import PieChart from "../../components/PieChart";
import axiosInstance from '../../utilis/ApiRequest';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [subscribers, setSubscribers] = useState(0);
  const [employees, setEmployees] = useState(0);
  const [applicants, setApplicants] = useState(0);
  // const [emailCount, setEmailCount] = useState(0);

  useEffect(() => {
    // axiosInstance.get('/email-count')
    //   .then(response => setEmailCount(response.data.count))
    //   .catch(error => console.error('Error fetching email count:', error));

    axiosInstance.get('/subscribers')
      .then(response => setSubscribers(response.data.length))
      .catch(error => console.error('Error fetching subscribers:', error));

    axiosInstance.get('/get_employees')
      .then(response => setEmployees(response.data.length))
      .catch(error => console.error('Error fetching employees:', error));

    axiosInstance.get('/applicants')
      .then(response => setApplicants(response.data.length))
      .catch(error => console.error('Error fetching applicants:', error));
  }, []);

  const generatePDF = () => {
    const input = document.getElementById("dashboard-summary");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("dashboard-report.pdf");
    });
  };

  return (
    <Box m="10px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Button
          onClick={generatePDF}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "10px",
            fontWeight: "bold",
            padding: "10px 20px"
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Report
        </Button>
      </Box>

      {/* DASHBOARD SUMMARY */}
      <Box id="dashboard-summary">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="120px"
          gap="20px"
        >
          {/* Stat Boxes */}
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title={applicants}
              subtitle="Applicants"
              progress={applicants / 10}
              icon={<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>

          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title={employees}
              subtitle="Employees"
              progress={employees / 50}
              icon={<BadgeIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>

          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title={subscribers}
              subtitle="Subscribers"
              progress={subscribers / 25}
              icon={<SubscriptionsIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>

          {/* <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title={emailCount}
              subtitle="Emails"
              progress={emailCount / 100}
              icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box> */}

          {/* Bar Chart */}
          <Box gridColumn="span 7" gridRow="span 3" backgroundColor={colors.primary[400]}>
            <Box mt="25px" p="0 30px">
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Employee Counts Across
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                Departments
              </Typography>
            </Box>
            <Box height="350px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>

          {/* Pie Chart */}
          <Box gridColumn="span 5" gridRow="span 3" backgroundColor={colors.primary[400]}>
            <Box mt="25px" p="0 30px">
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Applied Applicants Counts Across
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                Job Posts
              </Typography>
            </Box>
            <Box height="350px">
              <PieChart isDashboard={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
