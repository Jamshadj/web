import React, { useState } from "react";
import { editProfile } from "../../axios"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Avatar
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.details.name);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState("");
  const imgURL = "http://localhost:4000/upload_img/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await editProfile(name, file, user.details._id);
      if (!data.err) {
        dispatch({ type: "refresh" });
        navigate("/");
      } else {
        setErr(data.message);
      }
    } catch (error) {
      console.error(error);
      setErr("An error occurred. Please try again later.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box sx={{ p: 3, textAlign: "center", boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        {err && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {err}
          </Alert>
        )}

        <Avatar
          src={
            file
              ? URL.createObjectURL(file)
              : user.details.image !== undefined
              ? imgURL + user.details.image.filename
              : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360"
          }
          alt="User Image"
          sx={{ width: 120, height: 120, mb: 2 }}
        />

        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
              sx={{
                textTransform: "none",
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Select Profile Image
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*"
              />
            </Button>
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default EditProfile;
