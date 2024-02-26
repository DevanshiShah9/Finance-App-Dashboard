import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";



const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [selected, setSelected] = useState("dashboard");
  const [hoverState, setHoverState] = useState("");

  const handleToggle = () => {
    console.log(theme.palette.background.default, theme.palette.mode);
    colorMode.toggleColorMode();
  }

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={colors.grey[900]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px" >
          Finanseer
        </Typography>
      </FlexBetween>

       {/* CENTER */}
       <FlexBetween gap="1rem">
       <IconButton onClick={handleToggle} sx={{color: colors.grey[900]}}>
          {theme.palette.mode === "light" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
      <Box>
          <Typography variant="h4">
            <Link
              to="/"
              onClick={() => setSelected("dashboard")}
              style={{
                color: selected === "dashboard" || hoverState === "dashboard" ? colors.primary[700] : colors.grey[900],
                textDecoration: "none",
              }}
              onMouseEnter={() => setHoverState("dashboard")}
              onMouseLeave={() => setHoverState("")}
            >
              Dashboard
            </Link>
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4">
            <Link
              to="/predictions"
              onClick={() => setSelected("predictions")}
              style={{
                color: selected === "predictions" || hoverState === "predictions" ? colors.primary[700] : colors.grey[900],
                textDecoration: "none",
              }}
              onMouseEnter={() => setHoverState("predictions")}
              onMouseLeave={() => setHoverState("")}
            >
              Predictions
            </Link>
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;