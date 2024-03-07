import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: "1rem",
  boxShadow: `0.15rem 0.2rem 0.15rem 0.1rem ${
    theme.palette.mode === "dark"
      ? theme.palette.grey[200]
      : theme.palette.grey[600]
  }`,
}));

export default DashboardBox;