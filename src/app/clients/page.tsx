"use client";
import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import CustomTable from "../components/shared/CustomTable";
import CustomModal from "../components/shared/CustomModal";
import ClientForm from "../components/clients/ClientForm";
import { getClientsRealtime, addClient, Client } from "../lib/clientsService";
import { useTranslation } from "react-i18next";
import { ClientModel } from "../models/ClientModel";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "budget", label: "Budget", minWidth: 100 },
  { id: "phone", label: "Phone", minWidth: 100 },
  { id: "characteristics", label: "Characteristics", minWidth: 150 },
];

export default function ClientsPage() {
    const { t } = useTranslation(); 

    const [clients, setClients] = useState<Client[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);

    // const formRef = useRef<HTMLFormElement>(null);
    const formRef = useRef<{ submitForm: () => void }>(null);

    // REVISAR ESTO!!!
    useEffect(() => {
        const unsubscribe = getClientsRealtime(setClients);
        return () => unsubscribe();
    }, []);

    const handleSave = () => {
        formRef.current?.submitForm(); // Ejecuta el envío desde el formulario
      };
    

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" component="h1">
            {t("clients.title")}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
             {t("shared.create")}
            </Button>
        </Box>
        <CustomTable columns={columns} rows={clients} />
        <CustomModal
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            title={t('clients.modal.title')}
            onSubmit={handleSave} 
        >
            <ClientForm ref={formRef}/>
        </CustomModal>
        </Container>
    );
}
