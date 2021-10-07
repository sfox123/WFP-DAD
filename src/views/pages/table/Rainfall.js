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

export default function Rainfall(props) {
  const { id, sheetList, email, rainCheck, tankCheck } = props;
  const classes = useStyles();
  const [load, setLoad] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [rain, setRain] = useState(true);
  const [tank, setTank] = useState(false);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [title, setTitle] = useState("Rainfall");
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

    if (apiData.length === 0) {
      const { data } = await Axios.post("/getRecords", {
        id: id,
        sheetList: sheet,
      });

      const { rainfall, tankwater } = data;

      setApiData(data);

      const tmp = [];
      const arr = [];

      if (rainCheck) {
        rainfall.map((x, i) => {
          if (Object.keys(x).length > 5) {
            Object.keys(x).map((key, index) => {
              if (index > 4) {
                if (email == x[index][3]) {
                  tmp.push({
                    ["rainfall"]: x[index][2],
                    ["dateMeasured"]: x[index][0],
                    ["dateRecorded"]: x[index][1],
                  });
                }
              }
            });
          }
        });

        setRows(tmp);
        if (tankCheck) {
          tankwater.map((x, i) => {
            let length = Object.keys(x).length;
            if (Object.keys(x).length > 5) {
              Object.keys(x).map((key, index) => {
                if (index > 4) {
                  if (email == x[index][4]) {
                    arr.push({
                      ["wLevel"]: x[index][2],
                      ["wCapacity"]: x[index][3],
                      ["dateMeasured"]: x[index][0],
                      ["dateRecorded"]: x[index][1],
                    });
                  }
                }
              });
            }
          });
        }
      }
      setCols(arr);
    }
    setLoad(false);
  }, [apiData]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    const value = e.target.ariaLabel;
    if (value == "rain") {
      setRain(true);
      setTank(false);
      setTitle("Rainfall");
    } else if (value == "tank") {
      setTank(true);
      setRain(false);
      setTitle("Tank-Water");
    }

    setAnchorEl(null);
  };
  function handleDelete() {
    if (rows.length != 0) {
      console.log(rows);
    } else {
      setTimeout(() => {
        console.log(rows);
      }, 2000);
    }
  }
  function handleRemove() {
    var date = new Date();
    var myDate = new Date(cols[0].dateMeasured).setHours(1);
    console.log(myDate);
    console.log(date);
    if (date > myDate) {
      console.log(true);
    }
  }
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
              {title}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {rainCheck && (
                <MenuItem aria-label="rain" onClick={handleClose}>
                  Rainfall
                </MenuItem>
              )}
              {tankCheck && (
                <MenuItem aria-label="tank" onClick={handleClose}>
                  Tankwater
                </MenuItem>
              )}
            </Menu>
          </div>
          {rain && (
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
                    <TableCell align="right">
                      <Button
                        onClick={handleDelete}
                        variant="fill"
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        Delete Last Record
                      </Button>
                    </TableCell>
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
          )}
          {tank && (
            <TableContainer
              className={`${classes.table} ${classes.mLeft} ${classes.mTop}`}
              component={Paper}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Water Level (ft)</TableCell>
                    <TableCell>Water Capacity (Ac.ft)</TableCell>
                    <TableCell align="right">Date Measured</TableCell>
                    <TableCell align="right">Date Recorded</TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button
                        onClick={handleRemove}
                        variant="fill"
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        Delete Last Record
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cols.map((row) => (
                    <TableRow key={uuid()}>
                      <TableCell component="th" scope="row">
                        {row.wLevel}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.wCapacity}
                      </TableCell>
                      <TableCell align="right">{row.dateRecorded}</TableCell>
                      <TableCell align="right">{row.dateMeasured}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </>
  );
}
