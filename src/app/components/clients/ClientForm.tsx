// "use client";
// import React, { useState } from "react";
// import { TextField, Button, Box } from "@mui/material";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../../../../firebaseConfig";
// import { useTranslation } from "react-i18next";
// import { addClient } from "@/app/lib/clientsService";

// interface ClientFormProps {
//   // CREATE THE
//   onSubmit: (data: { id: string; name: string; budget: string; phone: string; characteristics: string }) => void;
//   initialData?: { name: string; budget: string; phone: string; characteristics: string };
//   formRef?: any
// }

// const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, initialData, formRef }) => {
//   const { t } = useTranslation(); 
//   const [name, setName] = useState(initialData?.name || "");
//   const [budget, setBudget] = useState(initialData?.budget || "");
//   const [phone, setPhone] = useState(initialData?.phone || "");
//   const [characteristics, setCharacteristics] = useState(initialData?.characteristics || "");
//   const [loading, setLoading] = useState(false);

//   const handleAddClient = async (clientData: { name: string; budget: string; phone: string; characteristics: string }) => {
//     // try {
//     // await addClient(clientData);
//     // setModalOpen(false);
//     // } catch (error) {
//     // console.error("Error adding client:", error);
//     // alert("There was an error adding the client.");
//     // }
//     addClient(clientData)
//     .then((res) => {
//       console.log('THE NEW CLIENT WAS ADDED', res);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// };

//   // const handleSubmit = async () => {
//   //   if (!name || !budget || !phone) {
//   //     alert(t("clients.form.submit"));
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     const docRef = await addDoc(collection(db, "clients"), { name, budget, phone, characteristics });
//   //     onSubmit({ id: docRef.id, name, budget, phone, characteristics });
//   //     setName("");
//   //     setBudget("");
//   //     setPhone("");
//   //     setCharacteristics("");
//   //   } catch (error) {
//   //     console.error("Error adding client:", error);
//   //     alert("An error occurred while adding the client.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <Box ref={formRef} component="form" noValidate autoComplete="off">
//         <TextField
//         fullWidth
//         label={t("clients.form.name")}
//         variant="outlined"
//         margin="normal"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <TextField
//         fullWidth
//         label={t("clients.form.budget")}
//         variant="outlined"
//         margin="normal"
//         value={budget}
//         onChange={(e) => setBudget(e.target.value)}
//       />
//       <TextField
//         fullWidth
//         label={t("clients.form.phone")}
//         variant="outlined"
//         margin="normal"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//       {/* <TextField
//         fullWidth
//         label={t("clients.form.characteristics")}
//         variant="outlined"
//         margin="normal"
//         value={characteristics}
//         onChange={(e) => setCharacteristics(e.target.value)}
//         multiline
//         rows={3}
//       /> */}
//         {/* <Button
//           onClick={handleSubmit}
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//           disabled={loading}
//         >
//           {loading ? t("clients.form.submit") : t("clients.form.submit")}
//         </Button> */}
//     </Box>
//   );
// };

// export default ClientForm;


// ===========================================
// ===========================================
// ===========================================


// import React from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Button, TextField } from "@mui/material";
// import CustomFormInput from "../shared/CustomFormInput";
// import * as yup from "yup";


// // Definición del esquema de Yup
// const schema = yup.object({
//   name: yup.string().required("Name is required"),
//   budget: yup.number().required("Budget is required").min(0, "Budget must be a positive number"),
//   phone: yup.string().required("Phone is required").matches(/^[0-9]+$/, "Phone must contain only digits"),
//   characteristics: yup.string().optional(),
// });

// interface ClientData {
//   name: string;
//   budget: number;
//   phone: string;
//   characteristics?: string;
// }

// const ClientForm: React.FC<{ onSubmit: (data: ClientData) => void, formRef: any }> = ({ onSubmit, formRef }) => {
//   const methods = useForm<ClientData>({
//     resolver: yupResolver(schema), // Usamos el esquema de Yup
//     defaultValues: { name: "", budget: 0, phone: "", characteristics: "" },
//   });

//   return (
//     <FormProvider {...methods}>
//       <form
//         ref={formRef}
//         className="flex flex-col gap-4"
//         onSubmit={methods.handleSubmit(onSubmit)}
//       >
//         <CustomFormInput name="name" label="Name" fullWidth />
//         <CustomFormInput name="budget" label="Budget" fullWidth type="number" />
//         <CustomFormInput name="phone" label="Phone" fullWidth />
//         <CustomFormInput name="characteristics" label="Characteristics" fullWidth multiline rows={4} />
//       </form>
//     </FormProvider>
//   );
// };

// export default ClientForm;


// ===========================================
// ===========================================
// ===========================================

import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomFormInput from "../shared/CustomFormInput";
import * as yup from "yup";
import { ClientModel } from "@/app/models/ClientModel";
import { addClient } from "@/app/lib/clientsService";

// Definición del esquema de Yup
const schema = yup.object({
  name: yup.string().required("Name is required"),
  budget: yup.number().required("Budget is required").min(0, "Budget must be a positive number"),
  phone: yup.string().required("Phone is required").matches(/^[0-9]+$/, "Phone must contain only digits"),
  characteristics: yup.string().optional(),
});

interface ClientData {
  name: string;
  budget: number;
  phone: string;
  characteristics?: string;
}


// Usa `forwardRef` para exponer `submitForm` a través de `ref`
const ClientForm = forwardRef((_, formRef) => {
  const methods = useForm<ClientData>({
    resolver: yupResolver(schema),
    defaultValues: { name: "", budget: 0, phone: "", characteristics: "" },
  });

  useImperativeHandle(formRef, () => ({
    submitForm: () => methods.handleSubmit(handleAddClient)(),
  }));

  const handleAddClient = async (data: ClientModel) => {

    console.log('ADD CLIENT!!!')
    
    addClient(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        console.log('Finally has been executed');
    })
};

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4" onSubmit={methods.handleSubmit(handleAddClient)}>
        <CustomFormInput name="name" label="Name" fullWidth />
        <CustomFormInput name="budget" label="Budget" fullWidth type="number" />
        <CustomFormInput name="phone" label="Phone" fullWidth />
        <CustomFormInput name="characteristics" label="Characteristics" fullWidth multiline rows={4} />
      </form>
    </FormProvider>
  );
});

export default ClientForm;
