import Posts from "./Posts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
} from "@mui/material";

const UsersTable = ({ users, isLoad }) => (
  <>
    {/* אם עדיין לא טען את המשתמשים שיראה מחוון טעינה */}
    {isLoad === false && (
      <Box sx={{ display: "flex" }} style={{ right: "50%" }}>
        <CircularProgress />
      </Box>
    )}
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>email</TableCell>
          <TableCell>company</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* אם מפעילים סינון על הטבלה ואין אף שם העונה על החיפוש שיביא הודעה למשתמש */}
        {users.length === 0 && isLoad === true && (
          <Alert
            severity="error"
            style={{ backgroundColor: "rgb(255 255 255)" }}
          >
            there is not match users
          </Alert>
        )}
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.company.name}</TableCell>
            <TableCell>
              {/* כפתור טעינת הפוסטים של המשתמש */}
              <Posts userId={user.id}></Posts>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);
export default UsersTable;
