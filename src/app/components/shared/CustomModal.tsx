"use client";
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode; 
  onSubmit: () => void;      
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, title, children, onSubmit }) => {
  
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions className="flex justify-end gap-4">
        <Button onClick={onClose} color="secondary">
         {t('shared.cancel')}
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained">
          {t('shared.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
