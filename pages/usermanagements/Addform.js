import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Addform(props) {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent>{props.children}</CardContent>
    </React.Fragment>
  );

  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>{props.children}</CardContent>
          </React.Fragment>
        </Card>
      </Box>
    </div>
  );
}

export default Addform;
