import {
    Button,
    ButtonContainer,
    CategoryBox,
    CategoryContainer,
    CategoryImage,
    Container,
    Form,
    FormTitle,
    MapContainer,
    Section,
    LocationContent,
    Footer
} from "./styles";

import Input from "../../components/input";
import { useEffect, useState } from "react";
import { LatLngExpression } from 'leaflet';
import { TileLayer, Marker, useMapEvent } from 'react-leaflet';
import { categories } from './categories';
import useGetLocation from '../../hooks/useGetLocation';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";





export default function New() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        contact: '',
        email: '',
        road: '',
        number: '',
        complement: '',
        Neighborhood: '',
        city: '',
        zipCode: '',
        open: '',
        close: '',
        lat: '',
        lng: '',
        category: '',
        coords: [0, 0],
    });

    const { coords } = useGetLocation();

    useEffect(() => {
        if (coords) {
            setFormValues(prev => ({
                ...prev,
                lat: coords[0].toString(),
                lng: coords[1].toString(),
                coords: coords,
            }));
        }
    }, [coords]);
    
    async function onSubmit() {
        
        
        if (!formValues.category) {
            toast.error('Escolha uma Categoria!', {
                type: 'error',
                autoClose: 2000,
            });
            return false;
        }
        const request = await fetch("http://localhost:3002/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formValues,
                latitude: formValues.coords[0],
                longitude: formValues.coords[1],
            }),
        });

        if(request.ok) {
            toast.success('Estabelecimento Cadastrado com Sucesso', {
                type: 'success',
                autoClose: 2000,
                onClose: () => navigate("/")
            });
        }
    }

    if (!coords) {
        
        return <h1 style={{ textAlign: 'center', fontSize: 40, fontWeight: "bold", color: "rgb(0, 97, 165)"}}>Obtendo Localização ...</h1>;
    }

    const MapClickHandler = () => {
        useMapEvent('click', async (event) => {
            const { lat, lng } = event.latlng;

            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDo2ZQXwf3jHZLSIKi7P7j2MUysCVOK2xc`
                );
                const data = await response.json();

                if (data.results.length > 0) {
                    const addressData = data.results[0];
                    const addressComponents = addressData.address_components;

                    // Extrair informações de endereço do resultado
                    const streetNumber = getAddressComponent(addressComponents, 'street_number');
                    const street = getAddressComponent(addressComponents, 'route');
                    const neighborhood = getAddressComponent(addressComponents, 'neighborhood');
                    const city = getAddressComponent(addressComponents, 'locality');
                    const zipCode = getAddressComponent(addressComponents, 'postal_code');

                    setFormValues((prev) => ({
                        ...prev,
                        road: street,
                        number: streetNumber,
                        complement: '', // Se necessário, você pode preencher outras informações como complemento aqui
                        neighborhood: neighborhood,
                        city: city,
                        zipCode: zipCode,
                        lat: lat.toString(),
                        lng: lng.toString(),
                        coords: [lat, lng],
                    }));
                }
            } catch (error) {
                console.error('Erro ao obter informações de endereço:', error);
            }
        });

        return null;
    };

// Função auxiliar para extrair o valor do componente de endereço com base no tipo
function getAddressComponent(components: any[], type: string) {
  const component = components.find((component: any) => component.types.includes(type));
  return component ? component.long_name : '';
}




    return (
        <Container>
            <Form onSubmit={(ev) =>{
                ev.preventDefault();
                onSubmit();
            } }>
                <FormTitle>
                    Cadastre seu Comércio
                </FormTitle>
                
                <Section>Endereço </Section>
                
                <MapContainer
                    center={{
                        lat: coords[0],
                        lng: coords[1],
                    }}
                    zoom={13}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    <Marker position={formValues.coords as LatLngExpression} />
                    <MapClickHandler />
                </MapContainer>

                <p id="selectmap">Selecione o Local do seu comercio ou preencha o formulário!</p>
                <Input label='Nome Local' name="name" value={formValues.name} onChange={setFormValues} />
                <Input label='Contato' name="contact" value={formValues.contact} onChange={setFormValues} />
                <Input label='Email' name="email" value={formValues.email} onChange={setFormValues} />

                <LocationContent>
                    <Input label='Rua' name="road" value={formValues.road} onChange={setFormValues} />
                    <Input label='Número' name="number" value={formValues.number} onChange={setFormValues} />
                </LocationContent>

                <LocationContent>
                    <Input label='Complemento' name="complement" value={formValues.complement} onChange={setFormValues} />
                    <Input label='Bairro' name="Neighborhood" value={formValues.Neighborhood} onChange={setFormValues} />
                </LocationContent>

                <LocationContent>
                    <Input label='Cidade' name="city" value={formValues.city} onChange={setFormValues} />
                    <Input label='Cep' name="zipCode" value={formValues.zipCode} onChange={setFormValues} />
                </LocationContent>
                
                <LocationContent>
                    <Input label='Latitude' name="lat" value={formValues.lat} onChange={setFormValues} />
                    <Input label='Longitude' name="lng" value={formValues.lng} onChange={setFormValues} />
                </LocationContent>
                <Input label='Descrição' name="description" value={formValues.description} onChange={setFormValues} />

                <Section>Categorias</Section>

                <CategoryContainer>
                    {categories.map(category => (
                        <CategoryBox
                            key={category.key}
                            onClick={() => {
                                setFormValues(prev => ({ ...prev, category: category.key }))
                            }}
                            isActive={formValues.category === category.key}
                        >
                            <CategoryImage src={category.url} />
                            {category.label}
                        </CategoryBox>
                    ))}
                </CategoryContainer>
                <ButtonContainer>
                    <Button type='submit'>Cadastrar</Button>
                </ButtonContainer>
            </Form>
            <Footer>
                <span>©2023. Todos os direitos reservados | Desenvolvido por <a href="#">Leo Soldi</a></span>
            </Footer>
        </Container>
    );
}
