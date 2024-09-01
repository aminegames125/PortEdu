import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import axios from "axios";
import { useAlert } from "../../providers/AlertContext"; 

const COOLDOWN_PERIOD = 24 * 60 * 60 * 1000; 
const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1276863325443194971/GdFgWStT8oKMvigY6fXyM8P2EDZasibElw-DMYXl3n5Wsj-f8kgY7NGDF5VqpTmRpAlH"; 

const GiveIdeasModal = ({ isOpen, onClose }) => {
  const [idea, setIdea] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert(); // Use the hook for alerts

  useEffect(() => {
    const checkCooldown = () => {
      const lastIdeaTime = Cookies.get("lastIdeaTimestamp");
      const now = new Date().getTime();
      if (lastIdeaTime && now - lastIdeaTime < COOLDOWN_PERIOD) {
        setCooldown(true);
      } else {
        setCooldown(false);
      }
    };

    if (isOpen) {
      checkCooldown();
    }
  }, [isOpen]);

  const handleSubmitIdea = async () => {
    if (cooldown) {
      showAlert("يرجى الانتظار قبل تقديم فكرة جديدة.", "warning");
      return;
    }

    setLoading(true);

    try {
      
      await axios.post(WEBHOOK_URL, {
        embeds: [
          {
            title: "تم تقديم الفكرة",
            description: `الفكرة: ${idea}\nالتوقيت: ${new Date().toISOString()}`,
            color: 0x00ff00, 
            timestamp: new Date().toISOString(),
          },
        ],
      });

      
      Cookies.set("lastIdeaTimestamp", new Date().getTime(), { expires: 1 }); 

      
      showAlert("تم تقديم فكرتك بنجاح!", "success");
    } catch (error) {
      
      showAlert("حدث خطأ أثناء تقديم فكرتك.", "error");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="give-ideas-modal-title"
    >
      <Box
        sx={{
          p: 4,
          maxWidth: 500,
          margin: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          direction: "ltr", 
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" id="give-ideas-modal-title">
            قدم فكرتك
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "text.secondary" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="فكرتك"
            multiline
            rows={4}
            variant="outlined"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="error" onClick={onClose}>
            إغلاق
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="dark:bg-main dark:text-gray-100"
            onClick={handleSubmitIdea}
            sx={{ ml: 1 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "تقديم"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GiveIdeasModal;
