import { IconButton } from "@mui/material";
import React, { forwardRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./style.scss";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchClickOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword?.trim()) {
      navigate(`/products/?keyword=${keyword}`);
      setSearchOpen(false);
      setKeyword("");
    } else {
      navigate(`/products`);
      setSearchOpen(false);
      setKeyword("");
    }
  };

  return (
    // <form onSubmit={submitHandler}>
    //   <div className="input-group">
    //     <input
    //       type="text"
    //       id="search_field"
    //       aria-describedby="search_btn"
    //       className="form-control"
    //       placeholder="Enter Product Name ..."
    //       name="keyword"
    //       value={keyword}
    //       onChange={(e) => setKeyword(e.target.value)}
    //     />
    //     <button id="search_btn" className="btn" type="submit">
    //       <i className="fa fa-search" aria-hidden="true"></i>
    //     </button>
    //   </div>
    // </form>
    <>
      <IconButton size="small" onClick={handleSearchClickOpen}>
        <SearchOutlinedIcon sx={{ color: "black", fontSize: 30 }} />
      </IconButton>

      <Dialog
        fullScreen
        open={searchOpen}
        onClose={handleSearchClose}
        TransitionComponent={Transition}
      >
        <Box
          component="form"
          // onSubmit={submitHandler}
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 100, right: 150 }}
            onClick={handleSearchClose}
            aria-label="close"
          >
            <CloseIcon sx={{ color: "black", fontSize: 30 }} id="searchClose" />
          </IconButton>
          <Box
            component="form"
            className="searchContainer"
            sx={{
              marginBottom: 2,
              width: {
                xs: "90%",
                sm: "80%",
                md: "70%",
                lg: "40%",
              },
            }}
          >
            <TextField
                // id="search_field"
    aria-describedby="searchBtn"
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              label="Search Product . . . "
              variant="standard"
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent form submission on Enter
                }
              }}
            />
            <IconButton
              sx={{ position: "absolute", right: 10, background: "none" }}
              size="small" id="searchBtn"
              onClick={submitHandler}
            >
              <SearchOutlinedIcon
                className="searchBtn"
                sx={{ color: "black", fontSize: 25, mt: 1 }}
              />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Search;
