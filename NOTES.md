# CRM Ligero para Agentes Inmobiliarios

Este proyecto es una aplicación CRM ligera diseñada para agentes inmobiliarios, facilitando la gestión de clientes, propiedades y comunicación automatizada con clientes interesados. La arquitectura del proyecto está optimizada para un desarrollo ágil y fácil escalabilidad.

## Estructura del Proyecto

### 1. Frontend
- **Framework**: Next.js con el directorio `app`.
- **Librerías de Estilos**: 
  - **Material UI**: Para componentes de UI, como botones, inputs y modales.
  - **Tailwind CSS**: Para clases de estilo personalizadas y diseño responsivo.
- **Gestión de Formularios**:
  - `react-hook-form` en conjunto con Material UI para el manejo de formularios.
  - Validación usando Yup.
  - Envío de formularios desde el componente padre utilizando `forwardRef` y `useImperativeHandle`.

### 2. Backend
- **Firebase**: Usado para el backend y almacenamiento de datos.
- **Firestore**: Base de datos NoSQL para gestionar los datos de clientes y propiedades, con una estructura organizada por agente.
- **Integración de Mensajería**:
  - **Twilio**: Envío de mensajes SMS desde el número del agente al cliente cuando hay una coincidencia entre una propiedad y un cliente. Cada agente configura su propio número.

### 3. Gestión de Autenticación
- **Google SSO**: Autenticación con Google para que los agentes puedan acceder de forma segura.

### 4. Internacionalización (i18n)
- Usamos `i18next` y `react-i18next` para gestionar los textos de la aplicación en múltiples idiomas.
- Los textos están centralizados en un archivo de idiomas (`langs`), lo que facilita la adición de nuevos idiomas.

### 5. Estructura de Archivos

```plaintext
src/
├── app/                                # Contiene las páginas principales del proyecto.
│   ├── layout.tsx                      # Layout general de la aplicación, incluye componentes comunes (e.g., barra de navegación).
│   ├── globals.css                     # Estilos globales de Tailwind CSS aplicados a toda la aplicación.
│   ├── page.tsx                        # Página de inicio o Dashboard principal.
│   ├── clients/                        # Página y componentes relacionados con la gestión de clientes.
│   │   ├── page.tsx                    # Página principal de clientes, con tabla y botón para agregar clientes.
│   │   └── ClientPage.tsx              # Componente específico para mostrar la tabla y formulario de clientes.
│   ├── properties/                     # Página y componentes relacionados con la gestión de propiedades.
│   │   ├── page.tsx                    # Página principal de propiedades.
│   │   └── PropertyPage.tsx            # Componente específico para mostrar propiedades.
│   └── ...otros archivos de páginas    # Otras secciones o páginas del CRM.
│
├── components/                         # Componentes reutilizables.
│   ├── shared/                         # Componentes comunes utilizados en diferentes partes de la app.
│   │   ├── CustomModal.tsx             # Modal personalizado reutilizable, utilizado en varias secciones.
│   │   ├── CustomTable.tsx             # Tabla reutilizable para mostrar listas de datos como clientes o propiedades.
│   │   └── CustomFormInput.tsx         # Input personalizado para formularios, integra Material UI con react-hook-form.
│   ├── clients/                        # Componentes específicos de clientes.
│   │   ├── ClientForm.tsx              # Formulario de clientes con validación y lógica de envío.
│   │   ├── ClientList.tsx              # Componente para listar clientes en una tabla.
│   │   └── ...otros componentes        # Otros componentes relacionados con clientes.
│   └── properties/                     # Componentes específicos de propiedades.
│       ├── PropertyForm.tsx            # Formulario para agregar o editar propiedades.
│       ├── PropertyList.tsx            # Componente para listar propiedades en una tabla.
│       └── ...otros componentes        # Otros componentes relacionados con propiedades.
│
├── firebaseConfig.ts                   # Configuración de Firebase para inicializar Firestore, Auth y otros servicios de Firebase.
│
├── lib/                                # Lógica de API y servicios para manejar operaciones con Firebase.
│   ├── clientsService.ts               # Funciones de CRUD para clientes en Firestore.
│   ├── propertiesService.ts            # Funciones de CRUD para propiedades en Firestore.
│   └── ...otros servicios              # Otros archivos de servicios según sea necesario.
│
├── hooks/                              # Hooks personalizados para lógica reutilizable.
│   └── useAuth.ts                      # Hook personalizado para manejar la autenticación de usuarios.
│
├── langs/                              # Archivos de idiomas y configuración de internacionalización.
│   ├── en.json                         # Archivo JSON para textos en inglés.
│   ├── es.json                         # Archivo JSON para textos en español.
│   └── i18n.ts                         # Configuración de `i18next` para la internacionalización.
│
└── styles/                             # Estilos adicionales y archivos CSS.
    └── customStyles.css                # Estilos personalizados adicionales para casos específicos.



## Estructura de Formularios en la Aplicación

La aplicación utiliza `react-hook-form` con Material UI y Yup para crear formularios flexibles y controlables desde el componente padre.

### 1. Librerías Utilizadas
- **`react-hook-form`**: Maneja el estado y envío de formularios de forma optimizada.
- **Yup**: Define reglas de validación que aseguran datos correctos antes de enviar.
- **Material UI**: Proporciona componentes visuales para los formularios.

### 2. Configuración de Formularios
Cada formulario se configura con `useForm` de `react-hook-form`, que define los valores iniciales y conecta con Yup para validar:
```typescript
const methods = useForm({
  resolver: yupResolver(schema),
  defaultValues: { name: "", budget: 0, phone: "", characteristics: "" },
});

