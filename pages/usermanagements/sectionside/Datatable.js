import { react, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Datatable() {

  const [number, setNumber] = useState(1);
  const [message, setMessage] = useState('');
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>        <Paper sx={{ width: "100%" }}>
    <TableContainer component={Paper} sx={{ maxHeight: "200px" }}>
      <Table
        sx={{ minWidth: "80%" }}
        aria-label="simple table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">First name</TableCell>
            <TableCell align="left">Last name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myarray
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.first_name}</TableCell>
                <TableCell align="left">{row.last_name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.gender}</TableCell>
                <TableCell align="left">
                  <Button variant="text" onClick={()=>{
                    setMessage('Row selected: first name '+row.first_name+', last name '+row.last_name);
                  }} size="small">
                    Delete by id: {row.id}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
      rowsPerPageOptions={[10, myarray.length/2, myarray.length]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper></div>
  )
}

export default Datatable

const myarray = [
  {
    id: 1,
    first_name: "Delmore",
    last_name: "Tregear",
    email: "dtregear0@multiply.com",
    gender: "Male",
    ip_address: "9.255.180.125",
  },
  {
    id: 2,
    first_name: "Sarena",
    last_name: "Fadden",
    email: "sfadden1@gnu.org",
    gender: "Agender",
    ip_address: "198.87.243.103",
  },
  {
    id: 3,
    first_name: "Ingeborg",
    last_name: "Chang",
    email: "ichang2@yellowpages.com",
    gender: "Female",
    ip_address: "13.155.240.78",
  },
  {
    id: 4,
    first_name: "Nola",
    last_name: "Flukes",
    email: "nflukes3@github.com",
    gender: "Female",
    ip_address: "62.86.246.121",
  },
  {
    id: 5,
    first_name: "Carol-jean",
    last_name: "Van Arsdall",
    email: "cvanarsdall4@lycos.com",
    gender: "Female",
    ip_address: "137.44.248.47",
  },
  {
    id: 6,
    first_name: "Shandra",
    last_name: "Downage",
    email: "sdownage5@infoseek.co.jp",
    gender: "Female",
    ip_address: "159.33.96.56",
  },
  {
    id: 7,
    first_name: "Devlin",
    last_name: "McPhelimey",
    email: "dmcphelimey6@aboutads.info",
    gender: "Male",
    ip_address: "253.168.12.21",
  },
  {
    id: 8,
    first_name: "Sheree",
    last_name: "Paramore",
    email: "sparamore7@vk.com",
    gender: "Female",
    ip_address: "71.76.140.15",
  },
  {
    id: 9,
    first_name: "Thatch",
    last_name: "Sherringham",
    email: "tsherringham8@seesaa.net",
    gender: "Male",
    ip_address: "228.227.180.33",
  },
  {
    id: 10,
    first_name: "Guillaume",
    last_name: "Fone",
    email: "gfone9@wordpress.com",
    gender: "Male",
    ip_address: "116.197.24.76",
  },
  {
    id: 11,
    first_name: "Isaak",
    last_name: "Harbor",
    email: "iharbora@apple.com",
    gender: "Male",
    ip_address: "58.211.68.227",
  },
  {
    id: 12,
    first_name: "Lemar",
    last_name: "Formoy",
    email: "lformoyb@unblog.fr",
    gender: "Agender",
    ip_address: "91.143.36.80",
  },
  {
    id: 13,
    first_name: "Amery",
    last_name: "Hamprecht",
    email: "ahamprechtc@blogspot.com",
    gender: "Male",
    ip_address: "161.115.187.210",
  },
  {
    id: 14,
    first_name: "Gerry",
    last_name: "Yurchenko",
    email: "gyurchenkod@mayoclinic.com",
    gender: "Male",
    ip_address: "65.168.116.47",
  },
  {
    id: 15,
    first_name: "Ricki",
    last_name: "Lindop",
    email: "rlindope@blogtalkradio.com",
    gender: "Female",
    ip_address: "37.253.37.31",
  },
  {
    id: 16,
    first_name: "Sammy",
    last_name: "Lodeke",
    email: "slodekef@people.com.cn",
    gender: "Polygender",
    ip_address: "5.236.207.208",
  },
  {
    id: 17,
    first_name: "Noble",
    last_name: "Jankovic",
    email: "njankovicg@discuz.net",
    gender: "Male",
    ip_address: "47.139.45.17",
  },
  {
    id: 18,
    first_name: "Mariya",
    last_name: "Priditt",
    email: "mpriditth@theatlantic.com",
    gender: "Female",
    ip_address: "9.156.155.131",
  },
  {
    id: 19,
    first_name: "Linnet",
    last_name: "Netti",
    email: "lnettii@e-recht24.de",
    gender: "Female",
    ip_address: "214.129.158.33",
  },
  {
    id: 20,
    first_name: "Penelope",
    last_name: "Excell",
    email: "pexcellj@dailymail.co.uk",
    gender: "Female",
    ip_address: "143.250.174.89",
  },
  {
    id: 21,
    first_name: "Broddy",
    last_name: "Carslake",
    email: "bcarslakek@usnews.com",
    gender: "Male",
    ip_address: "212.231.215.53",
  },
  {
    id: 22,
    first_name: "Lauryn",
    last_name: "Meni",
    email: "lmenil@tumblr.com",
    gender: "Female",
    ip_address: "51.17.245.6",
  },
  {
    id: 23,
    first_name: "Johnathan",
    last_name: "Brain",
    email: "jbrainm@google.de",
    gender: "Male",
    ip_address: "58.90.119.211",
  },
  {
    id: 24,
    first_name: "Pearline",
    last_name: "Saunderson",
    email: "psaundersonn@tumblr.com",
    gender: "Female",
    ip_address: "169.209.208.254",
  },
  {
    id: 25,
    first_name: "Ernie",
    last_name: "Jurgen",
    email: "ejurgeno@hexun.com",
    gender: "Male",
    ip_address: "191.119.160.34",
  },
  {
    id: 26,
    first_name: "Bowie",
    last_name: "Upston",
    email: "bupstonp@guardian.co.uk",
    gender: "Male",
    ip_address: "247.119.50.71",
  },
  {
    id: 27,
    first_name: "Tyson",
    last_name: "Dargie",
    email: "tdargieq@t.co",
    gender: "Male",
    ip_address: "249.200.35.15",
  },
  {
    id: 28,
    first_name: "Gabrielle",
    last_name: "De la Yglesias",
    email: "gdelayglesiasr@cbc.ca",
    gender: "Female",
    ip_address: "170.254.131.46",
  },
  {
    id: 29,
    first_name: "Davie",
    last_name: "Dicke",
    email: "ddickes@oakley.com",
    gender: "Non-binary",
    ip_address: "119.249.55.230",
  },
  {
    id: 30,
    first_name: "Thadeus",
    last_name: "Bardill",
    email: "tbardillt@nps.gov",
    gender: "Male",
    ip_address: "136.162.163.70",
  },
  {
    id: 31,
    first_name: "Lek",
    last_name: "Montgomery",
    email: "lmontgomeryu@whitehouse.gov",
    gender: "Male",
    ip_address: "162.223.58.183",
  },
  {
    id: 32,
    first_name: "Griffie",
    last_name: "Denyukin",
    email: "gdenyukinv@forbes.com",
    gender: "Male",
    ip_address: "46.210.144.249",
  },
  {
    id: 33,
    first_name: "Brandy",
    last_name: "Jeaycock",
    email: "bjeaycockw@intel.com",
    gender: "Male",
    ip_address: "105.196.114.107",
  },
  {
    id: 34,
    first_name: "Munroe",
    last_name: "Gleder",
    email: "mglederx@imdb.com",
    gender: "Non-binary",
    ip_address: "76.181.51.133",
  },
  {
    id: 35,
    first_name: "Raf",
    last_name: "Barmby",
    email: "rbarmbyy@loc.gov",
    gender: "Female",
    ip_address: "63.22.204.167",
  },
  {
    id: 36,
    first_name: "Nicholas",
    last_name: "Guidoni",
    email: "nguidoniz@pagesperso-orange.fr",
    gender: "Male",
    ip_address: "81.189.163.214",
  },
  {
    id: 37,
    first_name: "Shelby",
    last_name: "Wharin",
    email: "swharin10@free.fr",
    gender: "Female",
    ip_address: "85.192.202.41",
  },
  {
    id: 38,
    first_name: "Eleonore",
    last_name: "Wrought",
    email: "ewrought11@lycos.com",
    gender: "Female",
    ip_address: "194.47.178.16",
  },
  {
    id: 39,
    first_name: "Starla",
    last_name: "Balham",
    email: "sbalham12@qq.com",
    gender: "Female",
    ip_address: "154.39.178.141",
  },
  {
    id: 40,
    first_name: "Ives",
    last_name: "Heinlein",
    email: "iheinlein13@irs.gov",
    gender: "Male",
    ip_address: "136.166.114.88",
  },
  {
    id: 41,
    first_name: "Sharline",
    last_name: "Coulthurst",
    email: "scoulthurst14@umich.edu",
    gender: "Female",
    ip_address: "96.144.197.85",
  },
  {
    id: 42,
    first_name: "Sherri",
    last_name: "Krimmer",
    email: "skrimmer15@adobe.com",
    gender: "Female",
    ip_address: "86.137.187.60",
  },
  {
    id: 43,
    first_name: "Brien",
    last_name: "Wallas",
    email: "bwallas16@comcast.net",
    gender: "Male",
    ip_address: "84.12.185.35",
  },
  {
    id: 44,
    first_name: "Delphinia",
    last_name: "Phebey",
    email: "dphebey17@squarespace.com",
    gender: "Female",
    ip_address: "24.2.63.58",
  },
  {
    id: 45,
    first_name: "Shaun",
    last_name: "Bernardino",
    email: "sbernardino18@blogspot.com",
    gender: "Male",
    ip_address: "108.117.19.35",
  },
  {
    id: 46,
    first_name: "Isa",
    last_name: "Kemwal",
    email: "ikemwal19@imgur.com",
    gender: "Female",
    ip_address: "88.44.57.104",
  },
  {
    id: 47,
    first_name: "Deonne",
    last_name: "Laxston",
    email: "dlaxston1a@prweb.com",
    gender: "Female",
    ip_address: "216.206.183.95",
  },
  {
    id: 48,
    first_name: "Lindon",
    last_name: "Troubridge",
    email: "ltroubridge1b@microsoft.com",
    gender: "Polygender",
    ip_address: "126.52.208.80",
  },
  {
    id: 49,
    first_name: "Nollie",
    last_name: "Ludovico",
    email: "nludovico1c@usgs.gov",
    gender: "Female",
    ip_address: "239.76.88.40",
  },
  {
    id: 50,
    first_name: "Reginauld",
    last_name: "Carrivick",
    email: "rcarrivick1d@ask.com",
    gender: "Male",
    ip_address: "81.215.39.152",
  },
  {
    id: 51,
    first_name: "Reginauld",
    last_name: "Carrivick",
    email: "rcarrivick1d@ask.com",
    gender: "Male",
    ip_address: "81.215.39.152",
  },
  {
    id: 52,
    first_name: "Reginauld",
    last_name: "Carrivick",
    email: "rcarrivick1d@ask.com",
    gender: "Male",
    ip_address: "81.215.39.152",
  },
];