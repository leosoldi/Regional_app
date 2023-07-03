import { useState, useEffect } from 'react';

const defaltCoords = [-25.506822673159075, -49.258103106754035];

export default function  useGetLocation () {
    const [coords, setCoords] = useState<number[] | null>(null);

    useEffect(() => {
        function  onSuccess (position: GeolocationPosition) {
            setCoords([position.coords.latitude, position.coords.longitude])
        }
        function  onErros () {
            setCoords(defaltCoords);
        }
        try {
            navigator.geolocation.getCurrentPosition(onSuccess, onErros)
        } catch (error) {
            console.log('Rota não encontrada');
            setCoords(defaltCoords);
        }
    }, [] )
    return { coords }
}






