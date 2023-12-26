import React, { useEffect, useState } from "react";
import { fetchUsers } from "./Service";
import CancelIcon from "@mui/icons-material/Cancel";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import UsersTable from "./UsersTable";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [baseUsers, setBaseUser] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  //Loading the user list
  const getUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
      setBaseUser(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //Cancel search button by name or email
  const cancle = () => {
    setUsers(baseUsers);
  };

  // useEffect that calls the function that loads the users 
  // I added that it will wait 3 seconds for it to load the list so we can see the loading indicator
  useEffect(() => {
    setTimeout(() => {
      getUsers().then(setIsLoad(true));
    }, 3000);
  }, []);

  //Search by name or email
  const search = (type) => {
    var arrBySearch;
    if (type === "name") {
      arrBySearch = users.filter((user) =>
        user.name.toLowerCase().includes(nameSearch.toLowerCase())
      );
    }
    if (type === "email") {
      arrBySearch = users.filter((user) =>
        user.email.toLowerCase().includes(emailSearch.toLowerCase())
      );
    }
    setBaseUser(users);
    setUsers(arrBySearch);
  };

  return (
    <div style={{ width: "66.66%", margin: "0 auto" }}>
      <h1>Users Table</h1>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 450 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search By Name"
          onChange={(event) => {
            setNameSearch(event.target.value);
          }}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => search("name")}
        >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search By Email"
          onChange={(event) => {
            setEmailSearch(event.target.value);
          }}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => search("email")}
        >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <CancelIcon onClick={cancle} />
        </IconButton>
      </Paper>

      <UsersTable users={users} isLoad={isLoad} />
    </div>
  );
};

export default Home;
