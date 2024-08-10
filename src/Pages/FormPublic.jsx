import React, { useState } from 'react';
import { Button, Label, TextInput, Select, Card, Textarea } from 'flowbite-react';
import { Link, useParams } from 'react-router-dom';
import InputFile from '../Components/input/InputFile';
import NotFoundQR from './NotFoundQR';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const FormPublic = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombre_solicitante: '',
    mensaje_peticion: '',
    tipo_peticion: 'servicio_tecnico',
    image: null,
  });
  const [validationQR, setValidationQR] = useState(true);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setImagePreviewUrl(null);
    setFormData({ ...formData, image: null });
  };

  if (!validationQR) {
    return <NotFoundQR />;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lfi6SMqAAAAAGXg0pcXSv2MN-rQHzTHRxCtmEXr">
      <RecaptchaForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleRemoveImage={handleRemoveImage}
        imagePreviewUrl={imagePreviewUrl}
        id={id}
      />
    </GoogleReCaptchaProvider>
  );
}

// eslint-disable-next-line react/prop-types
const RecaptchaForm = ({ formData, handleInputChange, handleFileChange, handleRemoveImage, imagePreviewUrl, id }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e) => {
    const url = import.meta.env.VITE_URL_BACKEND
    e.preventDefault();
    console.log('Datos del formulario:', formData);

    if (!executeRecaptcha) {
      console.error("executeRecaptcha no está disponible");
      return;
    }

    const token = await executeRecaptcha('submit_form');
    console.log('Captcha Token:', token);
    
    const response = await fetch(url + '/verificar-captcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Captcha validado exitosamente');
    } else {
      alert('Captcha inválido');
    }
  };

  return (
    <div className="w-[85%] mx-auto mt-10">
      <Card href="#" className="mx-auto">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          RICOH 3027
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Area de Administracion distrital de archivo central
        </p>
      </Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-5">
        <div>
          <Label htmlFor="nombre" value="Nombre y apellido del Solicitante" />
          <TextInput
            id="nombre"
            name="nombre_solicitante"
            type="text"
            className="mt-2"
            required
            minLength={7}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="tipo_peticion" value="Peticion" />
          <Select
            id="tipo_peticion"
            name="tipo_peticion"
            className="mt-2"
            required
            onChange={handleInputChange}
          >
            <option value="servicio_tecnico">Servicio Técnico</option>
            <option value="cambio_toner">Cambio Toner</option>
            <option value="atasco">Atasco</option>
            <option value="otro">Otro</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="comment" value="Mensaje" />
          <Textarea
            id="comment"
            name="mensaje_peticion"
            placeholder="Escribe tu mensaje"
            type="text"
            className="mt-2"
            required
            rows={4}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="image" value="Foto (opcional)" />
          <p className="font-medium text-gray-700 dark:text-gray-400 mb-2">
            {imagePreviewUrl ? formData.image.name : 'No se ha subido ninguna imagen:'}
          </p>
          {!imagePreviewUrl && (
            <div>
              <InputFile
                id="image"
                name="image"
                onChange={handleFileChange}
              />
            </div>
          )}

          {imagePreviewUrl && (
            <div className="mt-4 relative">
              <img
                src={imagePreviewUrl}
                alt="Vista previa de la imagen"
                className="max-w-xs mx-auto"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                style={{ transform: 'translate(50%, -50%)' }}
              >
                X
              </button>
            </div>
          )}
        </div>
        <Button type="submit">Enviar</Button>
        <Link to="/ruta-destino" className="mx-auto my-auto dark:text-white underline">
          Registrar acción de Servicio Técnico (Solo para técnicos)
          {console.log(id)}
        </Link>
      </form>
    </div>
  );
}

export default FormPublic;
