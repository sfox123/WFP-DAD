import React, { useEffect, useState } from "react";
import Axios from "../../../api/api";
import uuid from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MenuItem } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
  mTop: {
    marginTop: "4rem",
  },
  mLeft: {
    marginLeft: "2rem",
  },
  ItemCenter: {
    display: "grid",
    placeContent: "center",
    placeItems: "center",
  },
});

function createData(rainfall, dateMeasured, dateRecorded) {
  return { rainfall, dateMeasured, dateRecorded };
}

function createInfo(wLevel, wCapacity, dateMeasured, dateRecorded) {
  return { wLevel, wCapacity, dateMeasured, dateRecorded };
}

export default function Rainfall(props) {
  const { id, sheetList, email, rainCheck, tankCheck } = props;
  const classes = useStyles();
  const [load, setLoad] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sheet, setSheet] = useState({ rain: [], tank: [] });
  const { rainfall } = apiData;

  useEffect(async () => {
    await sheetList.map((x, i) => {
      let value = x.split("-")[1].trim();
      if (value == "rainFall") {
        sheet.rain.push(x.split("-")[0].trim());
      } else if (value == "tankWater") {
        sheet.tank.push(x.split("-")[0].trim());
      }
    });

    const { data } = await Axios.post("/getRecords", {
      id: id,
      sheetList: sheet,
    });

    const { rainfall, tankwater } = data;

    setApiData(data);
    if (rainCheck) {
      rainfall.map((x, i) => {
        if (x[5][3] == email && Object.keys(x).length > 5) {
          rows.push(createData(x[5][2], x[5][0], x[5][1]));
        }
      });

      if (tankCheck) {
        tankwater.map((x, i) => {
          if (x[5][3] == email && Object.keys(x).length > 5) {
            cols.push(createInfo(x[5][2], x[5][1], x[5][1], x[5][0]));
          }
        });
      }
    }
    setLoad(false);
  }, []);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {load ? (
        <div className={classes.ItemCenter}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div
            className="m-top"
            style={{ marginLeft: "2rem", marginTop: "4rem" }}
          >
            <Button
              variant="contained"
              color="primary"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleOpen}
            >
              Rainfall
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Rainfall</MenuItem>
              <MenuItem onClick={handleClose}>Tankwater</MenuItem>
            </Menu>
          </div>
          <TableContainer
            className={`${classes.table} ${classes.mLeft} ${classes.mTop}`}
            component={Paper}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Rainfall (mm)</TableCell>
                  <TableCell align="right">Date Measured</TableCell>
                  <TableCell align="right">Date Recorded</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={uuid()}>
                    <TableCell component="th" scope="row">
                      {row.rainfall}
                    </TableCell>
                    <TableCell align="right">{row.dateRecorded}</TableCell>
                    <TableCell align="right">{row.dateMeasured}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
