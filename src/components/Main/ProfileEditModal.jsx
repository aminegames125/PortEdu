import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import usersData from "../../data/users.json";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProfileEditModal = ({ isOpen, onClose, onProfileUpdated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const token = Cookies.get("authToken");
  const userId = token ? parseInt(token, 10) : null;

  useEffect(() => {
    if (isOpen && userId) {
      const user = usersData.find((user) => user.id === userId);
      if (user) {
        setUser(user);
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [isOpen, userId]);

  const handleSave = () => {
    if (!userId || !user) return;

    
    const updatedUsersData = usersData.map((u) =>
      u.id === userId ? { ...u, name, email } : u,
    );

    
    onProfileUpdated(updatedUsersData);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="edit-profile-modal-title"
      aria-describedby="edit-profile-modal-description"
    >
      <Box sx={styles.modal} data-mode="dark" style={{ direction: "ltr" }}>
        <Box sx={styles.header}>
          <Typography variant="h6" id="edit-profile-modal-title">
            تعديل الملف الشخصي
          </Typography>
          <IconButton onClick={onClose} sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={styles.body}>
          <TextField
            label="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={styles.textField}
          />
          <TextField
            label="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={styles.textField}
          />
        </Box>
        <Box sx={styles.footer}>
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={styles.button}
          >
            إلغاء
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={styles.button}
          >
            حفظ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    '&[data-mode="dark"]': {
      bgcolor: "#333", 
      color: "#fff", 
      "& .MuiOutlinedInput-root": {
        bgcolor: "#555",
        color: "#fff",
      },
      "& .MuiInputLabel-root": {
        color: "#fff",
      },
      "& .MuiButton-root": {
        color: "#fff",
        borderColor: "#555",
      },
    },
    '&[data-mode="light"]': {
      bgcolor: "#fff", 
      color: "#000", 
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    color: "text.secondary",
  },
  body: {
    mt: 2,
  },
  textField: {
    width: "100%",
    mt: 2,
  },
  footer: {
    mt: 2,
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    ml: 1,
  },
};

export default ProfileEditModal;
