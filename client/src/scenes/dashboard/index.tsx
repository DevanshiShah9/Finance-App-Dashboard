import { Box, useMediaQuery } from "@mui/material";
import TopRow from "./TopRow";
import MidColumn from "./MidColumn";
import SideColumns from "./SideColumns";

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b c"
  "d e f"
  "d e f"
  "d g f"
  "d g f"
  "d h f"
  "d h f"
  
`;
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "c"
  "e"
  "e"
  "g"
  "g"
  "h"
  "h"
  "d"
  "d"
  "d"
  "d"
  "d"
  "d"
  "f"
  "f"
  "f"
  "f"
  "f"
  "f"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <TopRow />
      <MidColumn />
      <SideColumns />
    </Box>
  );
};

export default Dashboard;