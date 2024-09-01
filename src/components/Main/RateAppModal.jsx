import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Rating,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAlert } from "../../providers/AlertContext"; 
import axios from "axios";
import Cookies from "js-cookie";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1276863325443194971/GdFgWStT8oKMvigY6fXyM8P2EDZasibElw-DMYXl3n5Wsj-f8kgY7NGDF5VqpTmRpAlH";

const RateAppModal = ({ isOpen, onClose, userEmail }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { showAlert } = useAlert(); // Use the hook

  const handleSubmitRating = async () => {
    // Retrieve the last rated timestamp from cookies
    const lastRated = Cookies.get("lastRated");
    const now = new Date().getTime();

    if (lastRated && now - lastRated < 12 * 60 * 60 * 1000) {
      showAlert("يمكنك التقييم مرة واحدة فقط كل 12 ساعة.", "warning");
      return;
    }

    const ratingData = {
      email: userEmail,
      rating,
      comment,
      timestamp: new Date().toISOString(),
    };

    try {
      
      await axios.post(DISCORD_WEBHOOK_URL, {
        content: `تقييم جديد:\nالبريد الإلكتروني: ${ratingData.email}\nالتقييم: ${ratingData.rating}\nالتعليق: ${ratingData.comment}\nالطابع الزمني: ${ratingData.timestamp}`,
      });

      
      if (!Cookies.get("lastRated")) {
        Cookies.set("lastRated", now, { expires: 1 }); 
      }

      
      if (!Cookies.get("rates")) {
        Cookies.set("rates", JSON.stringify(ratingData), { expires: 1 }); 
      } else {
        
        Cookies.set("rates", JSON.stringify(ratingData), { expires: 1 });
      }

      
      showAlert("شكراً لملاحظاتك!", "success");
      onClose(); 
    } catch (error) {
      showAlert(
        "حدث خطأ أثناء إرسال ملاحظاتك. يرجى المحاولة مرة أخرى.",
        "error",
      );
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="rate-app-modal-title"
      aria-describedby="rate-app-modal-description"
    >
      <Box sx={styles.modal} style={{ direction: "ltr" }}>
        <Box sx={styles.header}>
          <Typography variant="h6" id="rate-app-modal-title">
            تقييم التطبيق
          </Typography>
          <IconButton onClick={onClose} sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={styles.body}>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size="large"
            sx={styles.rating}
          />
          <TextField
            label="تعليقك (اختياري)"
            multiline
            rows={4}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
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
            إغلاق
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitRating}
            sx={styles.button}
          >
            إرسال
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
  rating: {
    mb: 2,
  },
  textField: {
    width: "100%",
    mt: 2,
  },
  footer: {
    mt: 2,
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    ml: 1,
  },
};

export default RateAppModal;
