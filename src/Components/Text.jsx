import { useState, useEffect } from 'react';

const Text = ({ value, setValue }) => {
    const [error, setError] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="text text-center">
            <textarea
                value={value}
                onChange={handleChange}
                rows={1} // Número de filas del campo de texto
                cols={100} // Número de columnas del campo de texto
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block"
            >
                Enviar
            </button>
        </div>
    )
}

export default Text
