"use client";
import { useState } from "react";
import { agregarDatoDePrueba } from "../../firebaseConfig"
import { Container, Typography } from "@mui/material";
import Sidebar from "./components/shared/Sidebar";
import { Dashboard } from "@mui/icons-material";

export default function Home() {
    return (
        <Container maxWidth="lg" sx={{ display: "flex" }}>
            {/* <Sidebar /> */}
            <Container sx={{ flexGrow: 1, padding: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>
            <Dashboard />
            </Container>
        </Container>
    );
}
